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
import { NotFound }    from './exceptions';

export interface State<K, V> {
  get:  (key: K)  => Promise<V>;
  prev: (key?: K) => Promise<K>;
  next: (key?: K) => Promise<K>;
}

export module State {
  export interface Partial<K, V> {
    get?:  (key: K)  => Promise<V>;
    prev?: (key?: K) => Promise<K>;
    next?: (key?: K) => Promise<K>;
  }

  export const Empty = {
    get:  (key: any) => Promise.reject<any>(new NotFound),
    prev: (key = Key.SENTINEL) => key === Key.SENTINEL ? Promise.resolve(Key.SENTINEL) : Promise.reject(new NotFound),
    next: (key = Key.SENTINEL) => key === Key.SENTINEL ? Promise.resolve(Key.SENTINEL) : Promise.reject(new NotFound)
  }

  export function extend<K, V, L, W>(parent: State<K, V>, { get, prev, next }: Partial<L, W>): State<K | L, V | W> {
    var state = Object.create(parent);
    if (get)  state.get  = get;
    if (prev) state.prev = prev;
    if (next) state.next = next;
    return state;
  }

  export async function first<K, V>(state: State<K, V>, [from, to]: Range<K> = Range.all): Promise<K> {
    return Position.isPrevPosition(from) ? from.prev : state.next(from.next)
  }

  export async function last<K, V>(state: State<K, V>, [from, to]: Range<K> = Range.all): Promise<K> {
    return Position.isNextPosition(to) ? to.next : state.prev(to.prev)
  }

  export async function has<K, V>(state: State<K, V>, key: K): Promise<boolean> {
    try {
      await state.get(key);
      return true;
    } catch (error) {
      if (error instanceof NotFound) return false;
      throw error;
    }
  }

  export function is<K, V>(state: State<K, V>, other: State<K, V>): Promise<boolean> {
    var iterator = entries(state),
        otherIterator = entries(other);

    return AsyncIterator.is(iterator, otherIterator, Entry.is);
  }

  export function contains<K, V>(state: State<K, V>, value: V): Promise<boolean> {
    return AsyncIterator.some(entries(state), entry => entry[1] === value);
  }

  export function empty<K, V>(state: State<K, V>): Promise<boolean> {
    return state.next().then(next => next === Key.SENTINEL);
  }

  export function any<K, V>(state: State<K, V>): Promise<boolean> {
    return state.next().then(next => next !== Key.SENTINEL);
  }

  export function size<K, V>(state: State<K, V>): Promise<number> {
    return AsyncIterator.size(keys(state));
  }

  export function slice<K, V>(parent: State<K, V>, range: Range<K> = Range.all): State<K, V> {
    return fromEntries(entries(parent, range));
  }

  export function splice<K, V>(parent: State<K, V>, range: Range<K>, child?: State<K, V>): State<K, V> {
    var deleted = slice(parent, range),
        filtered = filter(parent, (value, key) => deleted.get(key).then(() => false, () => true));

    if (child == null) return filtered;

    var bridgedChild: State<K, V>,
        bridgedParent: State<K, V>,
        from = range[0],
        to   = range[1];

    bridgedChild = extend(child, <Partial<K, V>>{
      prev: key => child.prev(key).then(prev => {
        if (prev !== Key.SENTINEL) return Promise.resolve(prev);
        return Position.isNextPosition(from) ? Promise.resolve(from.next) : parent.prev(from.prev);
      }),

      next: key => child.next(key).then(next => {
        if (next !== Key.SENTINEL) return Promise.resolve(next);
        return Position.isPrevPosition(to) ? Promise.resolve(to.prev) : parent.next(to.next);
      })
    });

    bridgedParent = extend(filtered, <Partial<K, V>>{
      prev: key => parent.prev(key).then(prev => {
        if (Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(Key.SENTINEL);
        return has(deleted, prev).then(res => res ? Promise.reject<any>(new NotFound) : prev);
      }),

      next: key => parent.next(key).then(next => {
        if (Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(Key.SENTINEL);
        return has(deleted, next).then(res => res ? Promise.reject<any>(new NotFound) : next);
      })
    });

    function get(key: K): Promise<V> {
      return has(child, key).then(res => res ? bridgedChild.get(key) : bridgedParent.get(key));
    }

    function prev(key: K = Key.SENTINEL): Promise<K> {
      if (Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(Key.SENTINEL);
      return has(bridgedChild, key).then(res => res ? bridgedChild.prev(key) : bridgedParent.prev(key));
    }

    function next(key = Key.SENTINEL): Promise<K> {
      if (Position.isNextPosition(from) && key === from.next) return bridgedChild.next(Key.SENTINEL);
      return has(bridgedChild, key).then(res => res ? bridgedChild.next(key) : bridgedParent.next(key));
    }

    return {get, prev, next};
  }

  export function reverse<K, V>(parent: State<K, V>): State<K, V> {
    return extend(parent, {
      prev: parent.next,
      next: parent.prev
    });
  }

  export function map<K, V, W>(parent: State<K, V>, mapFn: (value: V, key?: K) => W | Promise<W>): State<K, W> {
    async function get(key: K) {
      return mapFn(await parent.get(key), key);
    }

    return extend(parent, {get});
  }

  export function filter<K, V>(parent: State<K, V>, filterFn: (value: V, key?: K) => boolean| Promise<boolean>): State<K, V> {
    var cache: {[key: string]: Promise<boolean>} = Object.create(null);

    function have(key: K): Promise<boolean> {
      var stringifiedKey = JSON.stringify(key);
      return stringifiedKey in cache ? cache[stringifiedKey] : cache[stringifiedKey] = parent.get(key).then(value => filterFn(value, key));
    }

    async function get(key: K): Promise<V> {
      if (await(have(key))) return parent.get(key);
      throw new NotFound;
    }

    function prev(key: K): Promise<K> {
      return parent.prev(key).then(p => p === Key.SENTINEL ? Key.SENTINEL : have(p).then(res => res ? p : prev(p)));
    }

    function next(key: K): Promise<K> {
      return parent.next(key).then(n => n === Key.SENTINEL ? Key.SENTINEL : have(n).then(res => res ? n : next(n)));
    }

    return extend(parent, { get, prev, next });
  }

  export function scan<K, V, W>(parent: State<K, V>, scanFn: (memo: W, value: V, key: K) => W | Promise<W>, memo?: W): State<K, W> {
    return fromEntries(AsyncIterator.scan(entries(parent), (memoEntry, entry) =>  {
      return Promise.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(result => [entry[0], result]);
    }, <Entry<K, W>>[Key.SENTINEL, memo]));
  }

  export function pick<K, V>(parent: State<K, V>, picked: State<K, V>): State<K, V> {
    return filter(parent, (value, key) => has(picked, key))
  }

  export function omit<K, V>(parent: State<K, V>, omitted: State<K, V>): State<K, V> {
    return filter(parent, async (value, key) => !(await has(omitted, key)));
  }

  export function zip<K, L, V, W>(parent: State<K, V>, other: State<L, W>): State<[K, L], [V, W]> {
    return fromEntries(
      AsyncIterator.zip(
        AsyncIterator.zip(keys(parent), keys(other)),
        AsyncIterator.zip(values(parent), values(other))
      )
    );
  }

  export function zoom<K, V>(parent: State<K, V>, key: K): State<K, V> {
    var have: boolean;

    async function get(k: K) {
      if (k === Key.SENTINEL) return parent.get(key);
      throw new NotFound;
    }

    async function next(k: K = Key.SENTINEL) {
      if (k !== key && k !== Key.SENTINEL) throw new NotFound;
      if (!(await has(parent, key))) throw new NotFound;
      if (k === Key.SENTINEL) return key;
      if (k === key) return Key.SENTINEL;
    }

    return { get, prev: next, next }
  }

  export function flatten<K, L, V>(parent: Tree<K, L, V>): State<Path<K, L>, V> {
    return extend(parent, <Partial<Path<K, L>, V>>{
      get:  key => Tree.get(parent, key),
      prev: key => Tree.prev(parent, key),
      next: key => Tree.next(parent, key)
    });
  }

  export function flatMap<K, L, V, W>(parent: State<K, V>, mapFn: (value: V, key: K) => State<L, W> | Promise<State<L, W>>): State<Path<K, L>, W> {
    return State.flatten(State.map(parent, mapFn));
  }

  export function groupBy<K, L, V>(parent: State<K, V>, groupFn: (value: V, key: K) => L | Promise<L>): Tree<L, K, V> {
    var states: {[key: string]: State<K, V>} = {};

    var it = entries(parent);

    var groupKeyed = AsyncIterator.map(it, ([key, value]) => { return Promise.resolve(groupFn(value, key)).then(groupKey => <Entry<L, V>>[groupKey, value]) });
    var filtered = AsyncIterator.filter(groupKeyed, ([groupKey, value]) => !(JSON.stringify(groupKey) in states));
    var mapped = AsyncIterator.map(filtered, ([groupKey, value]) => {
      var state = filter(parent, (value, key) => Promise.resolve(groupFn(value, key)).then(gk => gk === groupKey));
      return <Entry<L, State<K, V>>>[groupKey, states[JSON.stringify(groupKey)] = state];
    });

    return fromEntries(mapped);
  }

  export function unique<K, L, V>(parent: State<K, V>, uniqueFn: (value: V, key: K) => L | Promise<L>): State<K, V> {
    return fromEntries(AsyncIterator.unique(entries(parent), async ([key, value]) => uniqueFn(value, key)));
  }

  export function union<K, V>(state: State<K, V>, other: State<K, V>, uniqueFn?: (value: V, key: K) => K | Promise<K>): State<K, V> {
    return fromEntries(AsyncIterator.unique(AsyncIterator.concat(entries(state), entries(other)), async ([key, value]) => uniqueFn(value, key)));
  }

  export function keyBy<K, L, V>(parent: State<K, V>, keyFn: (value: V, key?: K) => L | Promise<L>, reverseKeyFn?: (key: L) => K | Promise<K>): State<L, V> {
    if (!reverseKeyFn) return fromEntries(AsyncIterator.map(entries(parent), entry => {
      return Promise.resolve(keyFn(entry[1], entry[0])).then(key => <Entry<L, V>>[key, entry[1]]);
    }));

    return {
      async get(key: L): Promise<V> {
        return parent.get(await reverseKeyFn(key));
      },

      async prev(key: L): Promise<L> {
        var prev = await parent.prev(await reverseKeyFn(key));
        return keyFn(await parent.get(prev), prev);
      },

      async next(key: L) {
        var next = await parent.next(await reverseKeyFn(key));
        return keyFn(await parent.get(next), next);
      }
    }
  }

  export function take<K, V>(parent: State<K, V>, count: number): State<K, V> {
    return fromEntries(AsyncIterator.take(entries(parent), count));
  }

  export function skip<K, V>(parent: State<K, V>, count: number): State<K, V> {
    return fromEntries(AsyncIterator.skip(entries(parent), count));
  }

  export function cache<K, V>(parent: State<K, V>): State<K, V> {
    return Cache.apply(parent, Cache.create());
  }
  export function unit<K, V>(value: V, key: K): State<K, V>;
  export function unit<V>(value: V, key = Key.unique()): State<string, V> {
    return {
      get:  k => k === key ? Promise.resolve(value) : Promise.reject<any>(new NotFound),
      prev: (k = Key.SENTINEL) => Promise.resolve(k === Key.SENTINEL ? key : Key.SENTINEL),
      next: (k = Key.SENTINEL) => Promise.resolve(k === Key.SENTINEL ? key : Key.SENTINEL)
    };
  }

  export function entries<K, V>(state: State<K, V>, range: Range<K> = Range.all): AsyncIterator<Entry<K, V>> {
    var current = Key.SENTINEL,
        done = false,
        [from, to] = range;

    function get(key: K) {
      if (key === Key.SENTINEL) return (done = true, Promise.resolve(AsyncIterator.done));
      return state.get(key).then( value => (current = key, {done: false, value: [key, value]}));
    }

    function iterate(key: K) {
      return state.next(key).then(next => {
        if(Position.isPrevPosition(to) && to.prev === next) return get(Key.SENTINEL);
        return get(next);
      });
    }

    function next() {
      if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev) return get(Key.SENTINEL);
      if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next) return get(Key.SENTINEL);
      if (current === Key.SENTINEL) return Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
      if (Position.isNextPosition(to) && to.next === current) return get(Key.SENTINEL);
      return iterate(current);
    }

    return AsyncIterator.create(next);
  }

  export function keys<K, V>(state: State<K, V>, range: Range<K> = Range.all): AsyncIterator<K> {
    return AsyncIterator.map(entries(state, range), Entry.key);
  }

  export function values<K, V>(state: State<K, V>, range: Range<K> = Range.all): AsyncIterator<V> {
    return AsyncIterator.map(entries(state, range), Entry.value);
  }

  export function fromEntries<K, V>(iterator: Iterator<Entry<K, V>> | AsyncIterator<Entry<K, V>>): State<K, V> {
    var cache = Cache.create<K, V>(),
        exhausted = false,
        currentKey: K = Key.SENTINEL,
        queue = Promise.resolve(null);

    var cachingIterator = {
      async next() {
        var result = await iterator.next();

        if (result.done) {
          exhausted = true;
          await cache.prev(Key.SENTINEL, currentKey);
          await cache.next(currentKey, Key.SENTINEL);
          return AsyncIterator.done;
        }

        var [key, value] = result.value;

        await cache.prev(key, currentKey);
        await cache.next(currentKey, key);
        await cache.get(key, value);
        currentKey = key;

        return {done: false, value: [key, value]};
      }
    };

    function get(key: K): Promise<V> {
      if (exhausted) return Promise.reject<any>(new NotFound);
      return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(Entry.value);
    }

    async function prev(key: K = Key.SENTINEL): Promise<K> {
      if (exhausted) return Promise.reject<any>(new NotFound);
      await AsyncIterator.some(cachingIterator, entry => entry[0] === key);
      return cache.prev(key);
    }

    function next(key: K = Key.SENTINEL): Promise<K> {
      if (exhausted) return Promise.reject<any>(new NotFound);
      if (key === currentKey) return cachingIterator.next().then(result => result.done ? Key.SENTINEL : result.value[0])
      return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(() => cachingIterator.next()).then(result => result.done ? Key.SENTINEL : result.value[0]);
    }

    return Cache.apply({get, prev, next}, cache);
  }

  export function fromKeys<K>(iterator: Iterator<K> | AsyncIterator<K>): State<K, void> {
    return fromEntries(AsyncIterator.map(iterator, key => <Entry<K, void>>[key, null]));
  }

  export function fromValues<V>(iterator: Iterator<V> | AsyncIterator<V>): State<number, V> {
    return fromEntries(AsyncIterator.scan(iterator, (prev, value) => <[number, V]>[prev[0] + 1, value], <[number, V]>[-1, null]));
  }

  export function fromArray<V>(values: V[]): State<number, V> {
    return fromValues(AsyncIterator.fromArray(values));
  }

  export function fromObject<V>(values: {[key: string]: V}): State<string, V> {
    return fromEntries(AsyncIterator.fromObject(values));
  }

  export function lazy<K, V>(fn: () => State<K, V> | Promise<State<K, V>>): State<K, V> {
    var state: State<K, V>,
        queue = Promise.resolve();

    async function createState() {
      return state ? state : state = await fn();
    }

    function get(key: K): Promise<V> {
      return state ? state.get(key) : queue.then(createState).then(s => s.get(key));
    }

    function prev(key: K): Promise<K> {
      return state ? state.prev(key) : queue.then(createState).then(s => s.prev(key));
    }

    function next(key: K): Promise<K> {
      return state ? state.next(key) : queue.then(createState).then(s => s.next(key));
    }

    return {get, prev, next};
  }

  export function toObject<V>(state: State<string, V>, range: Range<string> = Range.all): Promise<{[key: string]: V}> {
    return AsyncIterator.toObject(entries(state, range));
  }

  export function toArray<K, V>(state: State<K, V>, range: Range<K> = Range.all): Promise<V[]> {
    return AsyncIterator.toArray(values(state, range));
  }
}

export default State;
