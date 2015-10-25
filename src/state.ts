import   Key           from './key';
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

  export function contains<V>(state: State<V>, value: V): Promise<boolean> {
    return AsyncIterator.some(toIterator(state), (v, k) => v === value);
  }

  export function isEmpty<V>(state: State<V>): Promise<boolean> {
    return state.next().then(next => next === Key.sentinel);
  }

  export function slice<V>(parent: State<V>, range: Range = Range.all): State<V> {
    return fromIterator(toIterator(parent, range));
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
      return child.get(key).catch(reason => reason === Key.NOT_FOUND_ERROR ? bridgedParent.get(key) : Promise.reject(reason));
    }

    function prev(key: Key = Key.sentinel): Promise<Key> {
      if (Position.isPrevPosition(to) && key === to.prev) return bridgedParent.next(Key.sentinel);
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
    function get(key: Key): Promise<V> {
      return parent.get(key).then(value => Promise.resolve(filterFn(value, key)).then(res => res ? value : Key.NOT_FOUND));
    }

    function prev(key: Key): Promise<Key> {
      return parent.prev(key).then(p => p === null ? null : parent.get(p).then(value => filterFn(value, p)).then(result => result ? p : prev(p)));
    }

    function next(key: Key): Promise<Key> {
      return parent.next(key).then(n => n === null ? null : parent.get(n).then(value => filterFn(value, n)).then(result => result ? n : next(n)));
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
      get:  key => AsyncIterator.keyOf(State.toIterator(keyMap), key),
      prev: key => reverseKeyMap.get(key).then(keyMap.prev).then(prev => prev === Key.sentinel ? prev : keyMap.get(prev)),
      next: key => reverseKeyMap.get(key).then(keyMap.next).then(next => next === Key.sentinel ? next : keyMap.get(next))
    });

    return extend(reverseKeyMap, { get: key => reverseKeyMap.get(key).then(parent.get) });
  }

  export function fromArray<V>(values: V[]): State<V> {
    return {
      get: (key: number): Promise<V> => key in values ? Promise.resolve(values[key]) : Key.NOT_FOUND,
      prev: (key: number): Promise<Key> => {
        var index = key == null ? values.length - 1 : key - 1;
        return Promise.resolve(index === -1 ? null : index);
      },
      next: (key: number): Promise<Key> => {
        var index = key == null ? 0 : key + 1;
        return Promise.resolve(index === values.length ? null : index);
      }
    }
  }

  export function fromObject<V>(values: {[key: string]: V}): State<V> {
    var keys = Object.keys(values),
        indexByKey: {[key: string]: number} = keys.reduce((memo, key, index) => {
          memo[key] = index;
          return memo;
        },  Object.create(null));

    return {
      get: (key: Key): Promise<V> => {
        return key in values ? Promise.resolve(values[key]) : Key.NOT_FOUND;
      },

      prev: (key: Key): Promise<Key> => {
        if (key == null) return Promise.resolve(keys[keys.length - 1]);
        if (!(key in indexByKey)) return Key.NOT_FOUND;

        var index = indexByKey[key];
        if (index === 0) return Promise.resolve(null);

        return Promise.resolve(keys[index - 1]);
      },

      next: (key: Key): Promise<Key> => {
        if (key == null) return Promise.resolve(keys[0]);
        if (!(key in indexByKey)) return Key.NOT_FOUND;

        var index = indexByKey[key];
        if (index === keys.length - 1) return Promise.resolve(null);

        return Promise.resolve(keys[index + 1]);
      }
    }
  }

  export function fromIterator<V>(iterator: AsyncIterator<V>): State<V> {
    var cache = Cache.create(),
        exhausted = false,
        currentKey: Key = null;

    var cachingIterator = AsyncIterator.extend(iterator, {
      get:  () => cache.get[currentKey] = iterator.get(),
      next: () => cache.next[currentKey] = iterator.next().then(key => {
        cache.prev[key] = Promise.resolve(currentKey);
        exhausted = key === null;
        return currentKey = key;
      }),
    });

    function get(key: Key): Promise<V> {
      if (exhausted) return Key.NOT_FOUND;
      if (key === currentKey) return cachingIterator.get();
      return AsyncIterator.find(cachingIterator, (value, k) => k === key);
    }

    function prev(key: Key): Promise<Key> {
      if (exhausted) return Key.NOT_FOUND;
      return AsyncIterator.some(cachingIterator, (value, k) => k === key).then(() => cache.prev[key]);
    }

    function next(key: Key): Promise<Key> {
      if (exhausted) return Key.NOT_FOUND;
      if (key === currentKey) return cachingIterator.next()
      return AsyncIterator.findKey(cachingIterator, (value, k) => k === key).then(() => cachingIterator.next());
    }

    return Cache.apply({get, prev, next}, cache);
  }

  export function toIterator<V>(state: State<V>, range: Range = Range.all): AsyncIterator<V> {
    var current: Key = Key.sentinel;

    function get(): Promise<V> {
      return state.get(current);
    }

    function next(): Promise<Key> {
      var from = range[0],
          to   = range[1];




      function iterate(key: Key) {
        return state.next(key).then(next => Position.isPrevPosition(to) && to.prev === next ? current = Key.sentinel : current = next);
      }

      if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev) return Promise.resolve(Key.sentinel);
      if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next) return Promise.resolve(Key.sentinel);
      if (current === Key.sentinel) return Position.isPrevPosition(from) ? Promise.resolve(current = from.prev) : iterate(from.next);
      if (Position.isNextPosition(to) && to.next === current) return Promise.resolve(current = Key.sentinel);
      return iterate(current);
    }

    return {get, next};
  }
}

export default State;
