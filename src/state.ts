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
    get: (key: Key) => Key.NOT_FOUND,
    prev: (key = Key.sentinel) => key == Key.sentinel ? Promise.resolve(Key.sentinel) : Key.NOT_FOUND,
    next: (key = Key.sentinel) => key == Key.sentinel ? Promise.resolve(Key.sentinel) : Key.NOT_FOUND
  }

  export function extend<V, W>(parent: State<V>, { get, prev, next }: Partial<W>): State<W> {
    var state = Object.create(parent);
    if (get)  state.get  = get;
    if (prev) state.prev = prev;
    if (next) state.next = next;
    return state;
  }

  export function first<V>(state: State<V>): Promise<V> {
    return state.next().then(key => state.get(key));
  }

  export function last<V>(state: State<V>): Promise<V> {
    return state.prev().then(key => state.get(key));
  }

  export function has<V>(state: State<V>, key: Key): Promise<boolean> {
    return state.get(key).then(() => true, reason => reason === Key.NOT_FOUND_ERROR ? false : Promise.reject(reason));
  }

  export function is<V>(state: State<V>, other: State<V>): Promise<boolean> {
    var iterator = entries(state),
        otherIterator = entries(other);

    return AsyncIterator.is(iterator, otherIterator, Entry.is);
  }

  export function contains<V>(state: State<V>, value: V): Promise<boolean> {
    return AsyncIterator.some(entries(state), ([k, v]) => v === value);
  }

  export function isEmpty<V>(state: State<V>): Promise<boolean> {
    return state.next().then(next => next === Key.sentinel);
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
        return has(deleted, prev).then(res => res ? Key.NOT_FOUND : prev);
      }),

      next: key => parent.next(key).then(next => {
        if (Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(Key.sentinel);
        return has(deleted, next).then(res => res ? Key.NOT_FOUND : next);
      })
    });

    function get(key: Key): Promise<V> {
      return has(child, key).then(res => res ? bridgedChild.get(key) : bridgedParent.get(key));
      // return child.get(key).catch(reason => reason === Key.NOT_FOUND_ERROR ? bridgedParent.get(key) : Promise.reject(reason));
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
    return extend(parent, {
      get: key => parent.get(key).then(value => mapFn(value, key))
    });
  }

  export function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean| Promise<boolean>): State<V> {
    var cache: {[key: string]: Promise<boolean>} = Object.create(null);

    function have(key: Key) {
      return key in cache ? cache[key] : cache[key] = parent.get(key).then(value => filterFn(value, key));
    }

    function get(key: Key): Promise<V> {
      return have(key).then(res => res ? parent.get(key) : Key.NOT_FOUND);
    }

    function prev(key: Key): Promise<Key> {
      return parent.prev(key).then(p => p === null ? null : have(p).then(res => res ? p : prev(p)));
    }

    function next(key: Key): Promise<Key> {
      return parent.next(key).then(n => n === null ? null : have(n).then(res => res ? n : next(n)));
    }

    return extend(parent, { get, prev, next });
  }

  export function zoom<V>(parent: State<V>, key: Key): State<V> {
    const next = (k: Key) => k == null ? parent.get(key).then(() => key, reason => reason === Key.NOT_FOUND_ERROR ? null : Promise.reject(reason)) : (key === k ? Promise.resolve(null) : Key.NOT_FOUND);

    return extend(parent, {
      get:  k => k === key ? parent.get(key) : Key.NOT_FOUND,
      prev: next,
      next: next
    });
  }

  export function flatten<V>(parent: Tree<V>): State<V> {
    return extend(parent, {
      get:  key => Tree.get(parent, Path.fromKey(key)),
      prev: key => Tree.prev(parent, Path.fromKey(key)).then(Path.toKey),
      next: key => Tree.next(parent, Path.fromKey(key)).then(Path.toKey)
    });
  }

  export function cache<V>(parent: State<V>): State<V> {
    return Cache.apply(parent, Cache.create());
  }

  export function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V> {
    var keyMap: State<Key> = cache(State.map(parent, keyFn));
    var reverseKeyMap: State<Key> = cache({
      get:  key => AsyncIterator.find(entries(keyMap), ([k, v]) => v === key).then(Entry.key),
      prev: (key = Key.sentinel) => {
        return Promise.resolve(key === Key.sentinel ? Key.sentinel : reverseKeyMap.get(key))
          .then(keyMap.prev).then(prev => prev === Key.sentinel ? prev : keyMap.get(prev))
      },
      next: (key = Key.sentinel) => {
        return Promise.resolve(key === Key.sentinel ? Key.sentinel : reverseKeyMap.get(key))
          .then(keyMap.next).then(next => next === Key.sentinel ? next : keyMap.get(next))
      }
    });

    return extend(reverseKeyMap, { get: key => reverseKeyMap.get(key).then(key => key === Key.sentinel ? Key.NOT_FOUND : parent.get(key)) });
  }

  export function keys(parent: State<any>): State<Key> {
    return map(parent, (value, key) => key);
  }

  export function fromArray<V>(values: V[]): State<V> {
    return fromEntries(AsyncIterator.fromArray(values.map((value, key) => <Entry<V>> [key, value])));
  }

  export function fromObject<V>(values: {[key: string]: V}): State<V> {
    return fromEntries(AsyncIterator.fromObject(values));
  }

  export function fromEntries<V>(iterator: AsyncIterator<Entry<V>>): State<V> {
    var cache = Cache.create(),
        exhausted = false,
        currentKey: Key = null,
        queue = Promise.resolve(null);

    var cachingIterator = {
      next: () => iterator.next().then(({done, value: entry}) => {
        if (done) {
          exhausted = true;
          cache.prev[Key.sentinel] = Promise.resolve(currentKey);
          cache.next[currentKey] = Promise.resolve(Key.sentinel);
          return AsyncIterator.sentinel;
        }

        cache.prev[entry[0]] = Promise.resolve(currentKey);
        cache.next[currentKey] = Promise.resolve(entry[0]);
        cache.get[entry[0]] = Promise.resolve(entry[1]);
        currentKey = entry[0];

        return {done, value: entry};
      })
    };

    function get(key: Key): Promise<V> {
      if (exhausted) return Key.NOT_FOUND;
      return AsyncIterator.find(cachingIterator, ([k, v]) => k === key).then(Entry.value);
    }

    function prev(key: Key): Promise<Key> {
      if (exhausted) return Key.NOT_FOUND;
      return AsyncIterator.some(cachingIterator, ([k, v]) => k === key).then(() => key in cache.prev ? cache.prev[key] : Key.NOT_FOUND);
    }

    function next(key: Key): Promise<Key> {
      if (exhausted) return Key.NOT_FOUND;
      if (key === currentKey) return cachingIterator.next().then(result => result.done ? Key.sentinel : result.value[0])
      return AsyncIterator.find(cachingIterator, ([k, v]) => k === key).then(() => cachingIterator.next()).then(result => result.done ? Key.sentinel : result.value[0]);
    }

    return Cache.apply({get, prev, next}, cache);
  }

  export function entries<V>(state: State<V>, range: Range = Range.all): AsyncIterator<Entry<V>> {
    var current = Key.sentinel,
        done = false,
        from = range[0],
        to   = range[1];


    return {
      next: () => {
        function get(key: Key) {
          if (key === Key.sentinel) return (done = true, Promise.resolve(AsyncIterator.sentinel));
          return state.get(key).then( value => (current = key, {done: false, value: [key, value]}));
        }
        function iterate(key: Key) {
          return state.next(key).then(next => {
            if(Position.isPrevPosition(to) && to.prev === next) return get(Key.sentinel);
            return get(next);
          });
        }

        if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev) return get(Key.sentinel);
        if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next) return get(Key.sentinel);
        if (current === Key.sentinel) return Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
        if (Position.isNextPosition(to) && to.next === current) return get(Key.sentinel);
        return iterate(current);
      }
    }
  }
  // export function toIterator<V>(state: State<V>, range: Range = Range.all): AsyncIterator<V> {
  //   var current: Key = Key.sentinel,
  //       queue = Promise.resolve(null);
  //
  //   function get(): Promise<V> {
  //     return queue = queue.then(() => {}, () => {}).then(() => state.get(current));
  //   }
  //
  //   function next(): Promise<Key> {
  //     return queue = queue.then(() => {}, () => {}).then(() => {
  //       var from = range[0],
  //           to   = range[1];
  //
  //       function iterate(key: Key) {
  //         return state.next(key).then(next => Position.isPrevPosition(to) && to.prev === next ? current = Key.sentinel : current = next);
  //       }
  //
  //       if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev) return Promise.resolve(Key.sentinel);
  //       if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next) return Promise.resolve(Key.sentinel);
  //       if (current === Key.sentinel) return Position.isPrevPosition(from) ? Promise.resolve(current = from.prev) : iterate(from.next);
  //       if (Position.isNextPosition(to) && to.next === current) return Promise.resolve(current = Key.sentinel);
  //       return iterate(current);
  //     });
  //   }
  //
  //   return {get, next};
  // }
}

export default State;
