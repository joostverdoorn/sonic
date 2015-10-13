import   Key           from './key';
import   Range         from './range';
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
    prev: (key?: Key) => key == null ? Promise.resolve(Key.None) : Key.NOT_FOUND,
    next: (key?: Key) => key == null ? Promise.resolve(Key.None) : Key.NOT_FOUND
  }

  export function first<V>(state: State<V>): Promise<V> {
    return state.next().then(key => state.get(key));
  }

  export function last<V>(state: State<V>): Promise<V> {
    return state.prev().then(key => state.get(key));
  }

  export function extend<V, W>(parent: State<V>, { get, prev, next }: Partial<W>): State<W> {
    var state = Object.create(parent);
    if (get)  state.get  = get;
    if (prev) state.prev = prev;
    if (next) state.next = next;
    return state;
  }

  export function slice<V>(parent: State<V>, range: Range = [null, null]): State<V> {
    return fromIterator(toIterator(parent, range));
  }


  export function splice<V>(parent: State<V>, range: Range, child: State<V> = Empty): State<V> {
    if (range[0] === range[1] && range[0] != null) return parent;

    const deleted = slice(parent, range),
          filtered = filter(parent, (value, key) => deleted.get(key).then(() => false, () => true));

    if (child === Empty) return filtered;

    function get(key: Key): Promise<V> {
      return child.get(key).catch(reason => reason === Key.NOT_FOUND_ERROR ? parent.get(key) : Promise.reject(reason));
    }

    function prev(key: Key = null): Promise<Key> {
      if (key == range[0]) return child.prev();
      if (key == null) return filtered.prev();
      return child.prev(key).then(
        prev => prev == null ? range[1] : prev,
        reason => reason === Key.NOT_FOUND_ERROR ? filtered.next(key) : Promise.reject(reason)
      );
    }

    function next(key: Key = null): Promise<Key> {
      if (key == range[0]) return child.next();
      if (key == null) return filtered.next();
      return child.next(key).then(
        next => next == null ? range[1] : next,
        reason => reason === Key.NOT_FOUND_ERROR ? filtered.next(key) : Promise.reject(reason)
      );
    }

    return {get, prev, next};
  }

  export function patch<V>(parent: State<V>, patch: Patch<V>): State<V> {
    return splice(parent, patch.range, patch.added);
  }

  export function toIterator<V>(state: State<V>, range: Range = Range.all): AsyncIterator<V> {
    var current: Key = null;

    function get(): Promise<V> {
      return state.get(current);
    }

    function next(): Promise<Key> {
      return state.next(current === null ? range[0] : current).then(next => current = (next == range[1] ? null : next));
    }

    return {get, next};
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
      return parent.get(key).then(value => Promise.resolve(filterFn(value)).then(res => res ? value : Key.NOT_FOUND));
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
    const next = (k: Key) => k == null ? Promise.resolve(key) : k === key ? Promise.resolve(null) : Key.NOT_FOUND;

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
    return Cache.apply(Cache.create(), parent);
  }

  export function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V> {
    var keyMap: State<Key> = cache(State.map(parent, keyFn));
    var reverseKeyMap: State<Key> = cache({
      get:  key => AsyncIterator.keyOf(State.toIterator(keyMap), key),
      prev: key => reverseKeyMap.get(key).then(keyMap.prev).then(keyMap.get),
      next: key => reverseKeyMap.get(key).then(keyMap.next).then(keyMap.get)
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

    return Cache.apply(cache, {get, prev, next});
  }
}

export default State;
