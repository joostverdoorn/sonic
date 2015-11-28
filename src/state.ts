import   Key           from './key';
import   Entry         from './entry';
import { Position,
         Range }       from './range';
import   Patch         from './patch';
import   Cache         from './cache';
import   AsyncIterator from './async_iterator';
import { Tree,
         Path }        from './tree'
import   PromiseUtils  from './promise_utils';
import  { NotFound }   from './exceptions';

export interface State<V> {
  get:  (key: Key)  => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export module State {
  export interface Partial<V> {
    get?:  (key: Key)  => Promise<V>;
    prev?: (key?: Key) => Promise<Key>;
    next?: (key?: Key) => Promise<Key>;
  }

  export const Empty = {
    get:  (key: Key) => Promise.reject<any>(new NotFound),
    prev: (key = Key.sentinel) => key === Key.sentinel ? Promise.resolve(Key.sentinel) : Promise.reject(new NotFound),
    next: (key = Key.sentinel) => key === Key.sentinel ? Promise.resolve(Key.sentinel) : Promise.reject(new NotFound)
  }

  export function extend<V, W>(parent: State<V>, { get, prev, next }: Partial<W>): State<W> {
    var state = Object.create(parent);
    if (get)  state.get  = get;
    if (prev) state.prev = prev;
    if (next) state.next = next;
    return state;
  }

  export async function first<V>(state: State<V>, [from, to]: Range = Range.all): Promise<Key> {
    return Position.isPrevPosition(from) ? from.prev : state.next(from.next)
  }

  export async function last<V>(state: State<V>, [from, to]: Range = Range.all): Promise<Key> {
    return Position.isNextPosition(to) ? to.next : state.prev(to.prev)
  }

  export async function has<V>(state: State<V>, key: Key): Promise<boolean> {
    try {
      await state.get(key);
      return true;
    } catch (error) {
      if (error instanceof NotFound) return false;
      throw error;
    }
  }

  export function is<V>(state: State<V>, other: State<V>): Promise<boolean> {
    var iterator = entries(state),
        otherIterator = entries(other);

    return AsyncIterator.is(iterator, otherIterator, Entry.is);
  }

  export function contains<V>(state: State<V>, value: V): Promise<boolean> {
    return AsyncIterator.some(entries(state), entry => entry[1] === value);
  }

  export function empty<V>(state: State<V>): Promise<boolean> {
    return state.next().then(next => next === Key.sentinel);
  }

  export function any<V>(state: State<V>): Promise<boolean> {
    return state.next().then(next => next !== Key.sentinel);
  }

  export function size<V>(state: State<V>): Promise<number> {
    return AsyncIterator.size(keys(state));
  }

  export function slice<V>(parent: State<V>, range: Range = Range.all): State<V> {
    return fromEntries(entries(parent, range));
  }

  export function splice<V>(parent: State<V>, range: Range, child?: State<V>): State<V> {
    var deleted = slice(parent, range),
        filtered = filter(parent, (value, key) => deleted.get(key).then(() => false, () => true));

    if (child == null) return filtered;

    var bridgedChild: State<V>,
        bridgedParent: State<V>,
        from = range[0],
        to   = range[1];

    bridgedChild = extend(child, {
      prev: key => child.prev(key).then(prev => {
        if (prev !== Key.sentinel) return Promise.resolve(prev);
        return Position.isNextPosition(from) ? Promise.resolve(from.next) : parent.prev(from.prev);
      }),

      next: key => child.next(key).then(next => {
        if (next !== Key.sentinel) return Promise.resolve(next);
        return Position.isPrevPosition(to) ? Promise.resolve(to.prev) : parent.next(to.next);
      })
    });

    bridgedParent = extend(filtered, {
      prev: key => parent.prev(key).then(prev => {
        if (Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(Key.sentinel);
        return has(deleted, prev).then(res => res ? Promise.reject<any>(new NotFound) : prev);
      }),

      next: key => parent.next(key).then(next => {
        if (Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(Key.sentinel);
        return has(deleted, next).then(res => res ? Promise.reject<any>(new NotFound) : next);
      })
    });

    function get(key: Key): Promise<V> {
      return has(child, key).then(res => res ? bridgedChild.get(key) : bridgedParent.get(key));
    }

    function prev(key: Key = Key.sentinel): Promise<Key> {
      if (Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(Key.sentinel);
      return has(bridgedChild, key).then(res => res ? bridgedChild.prev(key) : bridgedParent.prev(key));
    }

    function next(key = Key.sentinel): Promise<Key> {
      if (Position.isNextPosition(from) && key === from.next) return bridgedChild.next(Key.sentinel);
      return has(bridgedChild, key).then(res => res ? bridgedChild.next(key) : bridgedParent.next(key));
    }

    return {get, prev, next};
  }

  export function reverse<V>(parent: State<V>): State<V> {
    return extend(parent, {
      prev: parent.next,
      next: parent.prev
    });
  }

  export function map<V, W>(parent: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W> {
    async function get(key: Key) {
      return mapFn(await parent.get(key), key);
    }

    return extend(parent, {get});
  }

  export function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean| Promise<boolean>): State<V> {
    var cache: {[key: string]: Promise<boolean>} = Object.create(null);

    function have(key: Key): Promise<boolean> {
      return key in cache ? cache[key] : cache[key] = parent.get(key).then(value => filterFn(value, key));
    }

    async function get(key: Key): Promise<V> {
      if (await(have(key))) return parent.get(key);
      throw new NotFound;
    }

    function prev(key: Key): Promise<Key> {
      return parent.prev(key).then(p => p === Key.sentinel ? Key.sentinel : have(p).then(res => res ? p : prev(p)));
    }

    function next(key: Key): Promise<Key> {
      return parent.next(key).then(n => n === Key.sentinel ? Key.sentinel : have(n).then(res => res ? n : next(n)));
    }

    return extend(parent, { get, prev, next });
  }

  export function scan<V, W>(parent: State<V>, scanFn: (memo: W, value: V, key: Key) => W | Promise<W>, memo?: W): State<W> {
    return fromEntries(AsyncIterator.scan(entries(parent), (memoEntry, entry) =>  {
      return Promise.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(result => [entry[0], result]);
    }, <Entry<W>>[Key.sentinel, memo]));
  }

  export function pick<V>(parent: State<V>, picked: State<V>): State<V> {
    return filter(parent, (value, key) => has(picked, key))
  }

  export function omit<V>(parent: State<V>, omitted: State<V>): State<V> {
    return filter(parent, async (value, key) => !(await has(omitted, key)));
  }

  export function zip<V, W>(parent: State<V>, other: State<W>): State<[V, W]> {
    return fromValues(AsyncIterator.zip(values(parent), values(other)));
  }

  export function zoom<V>(parent: State<V>, key: Key): State<V> {
    var have: boolean;

    async function get(k: Key) {
      if (k === key) return parent.get(key);
      throw new NotFound;
    }

    async function next(k: Key = Key.sentinel) {
      if (k !== key && k !== Key.sentinel) throw new NotFound;
      if (!(await has(parent, key))) throw new NotFound;
      if (k === Key.sentinel) return key;
      if (k === key) return Key.sentinel;
    }

    return { get, prev: next, next }
  }

  export function flatten<V>(parent: Tree<V>): State<V> {
    return extend(parent, {
      get:  key => Tree.get(parent, Path.fromKey(key)),
      prev: key => Tree.prev(parent, Path.fromKey(key)).then(Path.toKey),
      next: key => Tree.next(parent, Path.fromKey(key)).then(Path.toKey)
    });
  }

  export function flatMap<V, W>(parent: State<V>, mapFn: (value: V, key: Key) => State<W>): State<W> {
    return State.flatten(State.map(parent, mapFn));
  }

  export function groupBy<V>(parent: State<V>, groupFn: (value: V, key: Key) => Key | Promise<Key>): Tree<V> {
    var states: {[key: string]: State<V>} = {};

    var it = entries(parent);

    var groupKeyed = AsyncIterator.map(it, ([key, value]) => { return Promise.resolve(groupFn(value, key)).then(groupKey => <Entry<V>> [groupKey, value]) });
    var filtered = AsyncIterator.filter(groupKeyed, ([groupKey, value]) => !(groupKey in states));
    var mapped = AsyncIterator.map(filtered, ([groupKey, value]) => {
      var state = filter(parent, (value, key) => Promise.resolve(groupFn(value, key)).then(gk => gk === groupKey));
      return <Entry<State<V>>>[groupKey, states[groupKey] = state];
    });

    return fromEntries(mapped);
  }

  export function unique<V>(parent: State<V>, uniqueFn: (value: V, key: Key) => Key | Promise<Key> = String): State<V> {
    return map(groupBy(parent, uniqueFn), s => first(s).then(s.get));
  }

  export function union<V>(state: State<V>, other: State<V>, uniqueFn?: (value: V, key: Key) => Key | Promise<Key>): State<V> {
    return unique(flatten(fromArray([state, other])), uniqueFn);
  }

  export function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V> {
    return fromEntries(AsyncIterator.map(entries(parent), entry => {
      return Promise.resolve(keyFn(entry[1], entry[0])).then(key => <Entry<V>>[key, entry[1]]);
    }));
  }

  export function take<V>(parent: State<V>, count: number): State<V> {
    return fromEntries(AsyncIterator.take(entries(parent), count));
  }

  export function skip<V>(parent: State<V>, count: number): State<V> {
    return fromEntries(AsyncIterator.skip(entries(parent), count));
  }

  export function cache<V>(parent: State<V>): State<V> {
    return Cache.apply(parent, Cache.create());
  }

  export function unit<V>(value: V, key: Key = Key.create()): State<V> {
    return {
      get:  k => k === key ? Promise.resolve(value) : Promise.reject<any>(new NotFound),
      prev: (k = Key.sentinel) => Promise.resolve(k === Key.sentinel ? key : Key.sentinel),
      next: (k = Key.sentinel) => Promise.resolve(k === Key.sentinel ? key : Key.sentinel)
    };
  }

  export function entries<V>(state: State<V>, range: Range = Range.all): AsyncIterator<Entry<V>> {
    var current = Key.sentinel,
        done = false,
        from = range[0],
        to   = range[1];

    function get(key: Key) {
      if (key === Key.sentinel) return (done = true, Promise.resolve(AsyncIterator.done));
      return state.get(key).then( value => (current = key, {done: false, value: [key, value]}));
    }

    function iterate(key: Key) {
      return state.next(key).then(next => {
        if(Position.isPrevPosition(to) && to.prev === next) return get(Key.sentinel);
        return get(next);
      });
    }

    function next() {
      if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev) return get(Key.sentinel);
      if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next) return get(Key.sentinel);
      if (current === Key.sentinel) return Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
      if (Position.isNextPosition(to) && to.next === current) return get(Key.sentinel);
      return iterate(current);
    }

    return AsyncIterator.create(next);
  }

  export function keys<V>(state: State<V>, range: Range = Range.all): AsyncIterator<Key> {
    return AsyncIterator.map(entries(state, range), Entry.key);
  }

  export function values<V>(state: State<V>, range: Range = Range.all): AsyncIterator<V> {
    return AsyncIterator.map(entries(state, range), Entry.value);
  }

  export function fromEntries<V>(iterator: Iterator<Entry<V>> | AsyncIterator<Entry<V>>): State<V> {
    var cache = Cache.create(),
        exhausted = false,
        currentKey: Key = null,
        queue = Promise.resolve(null);

    var cachingIterator = {
      async next() {
        var result = await iterator.next();

        if (result.done) {
          exhausted = true;
          cache.prev[Key.sentinel] = Promise.resolve(currentKey);
          cache.next[currentKey] = Promise.resolve(Key.sentinel);
          return AsyncIterator.done;
        }

        var [key, value] = result.value;

        cache.prev[key] = Promise.resolve(currentKey);
        cache.next[currentKey] = Promise.resolve(key);
        cache.get[key] = Promise.resolve(value);
        currentKey = key;

        return {done: false, value: [key, value]};
      }
    };

    function get(key: Key): Promise<V> {
      if (exhausted) return Promise.reject<any>(new NotFound);
      return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(Entry.value);
    }

    function prev(key: Key): Promise<Key> {
      if (exhausted) return Promise.reject<any>(new NotFound);
      return AsyncIterator.some(cachingIterator, entry => entry[0] === key).then(() => key in cache.prev ? cache.prev[key] : Promise.resolve<any>(new NotFound));
    }

    function next(key: Key): Promise<Key> {
      if (exhausted) return Promise.reject<any>(new NotFound);
      if (key === currentKey) return cachingIterator.next().then(result => result.done ? Key.sentinel : result.value[0])
      return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(() => cachingIterator.next()).then(result => result.done ? Key.sentinel : result.value[0]);
    }

    return Cache.apply({get, prev, next}, cache);
  }

  export function fromKeys(iterator: Iterator<Key> | AsyncIterator<Key>): State<void> {
    return fromEntries(AsyncIterator.map(iterator, key => <Entry<void>>[key, null]));
  }

  export function fromValues<V>(iterator: Iterator<V> | AsyncIterator<V>): State<V> {
    return fromEntries(AsyncIterator.map(AsyncIterator.scan(iterator, (prev, value) => <[number, V]>[prev[0] + 1, value], <[number, V]>[-1, null]), ([n, value]) => <Entry<V>>[n.toString(), value]));
  }

  export function fromArray<V>(values: V[]): State<V> {
    return fromValues(AsyncIterator.fromArray(values));
  }

  export function fromObject<V>(values: {[key: string]: V}): State<V> {
    return fromEntries(AsyncIterator.fromObject(values));
  }

  export function lazy<V>(fn: () => State<V> | Promise<State<V>>): State<V> {
    var state: State<V>,
        queue = Promise.resolve();

    async function createState() {
      return state ? state : state = await fn();
    }

    function get(key: Key): Promise<V> {
      return state ? state.get(key) : queue.then(createState).then(s => s.get(key));
    }

    function prev(key: Key): Promise<Key> {
      return state ? state.prev(key) : queue.then(createState).then(s => s.prev(key));
    }

    function next(key: Key): Promise<Key> {
      return state ? state.next(key) : queue.then(createState).then(s => s.next(key));
    }

    return {get, prev, next};
  }

  export function toObject<V>(state: State<V>, range: Range = Range.all): Promise<{[key: string]: V}> {
    return AsyncIterator.toObject(entries(state, range));
  }

  export function toArray<V>(state: State<V>, range: Range = Range.all): Promise<V[]> {
    return AsyncIterator.toArray(values(state, range));
  }
}

export default State;
