import Key           from './key';
import Range         from './range';
import Patch         from './patch';
import Cache         from './cache';
import StateIterator from './state_iterator';

export interface State<V> {
  get:  (key: Key)  => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export interface PartialState<V> {
  get?:  (key: Key)  => Promise<V>;
  prev?: (key?: Key) => Promise<Key>;
  next?: (key?: Key) => Promise<Key>;
}

export module State {

  export declare const NOT_FOUND: Promise<any>;

  export function extend<V, W>(parent: State<V>, { get, prev, next }: PartialState<W>): State<W> {
    var state = Object.create(parent);
    if (get)  state.get  = get;
    if (prev) state.prev = prev;
    if (next) state.next = next;
    return state;
  }

  export function patch<V>(parent: State<V>, patch: Patch<V>): State<V> {
    var partial: PartialState<V>;

    if (Patch.isSetPatch(patch)) {
      partial = {
        get: key => key === patch.key ? Promise.resolve(patch.value) : parent.get(key)
      };

      if (patch.before !== undefined) {
        partial.prev = (key: Key = null): Promise<Key> => {
          if (key === patch.before) return Promise.resolve(key);
          if (key == key) return parent.prev(patch.before);
          return parent.prev(key);
        };

        partial.next = (key: Key = null): Promise<Key> => {
          if (key === key) return Promise.resolve(patch.before);
          return parent.next(key).then(next => next == patch.before ? key : next);
        };
      }
    }

    if (Patch.isDeletePatch(patch)) {
      partial = {
        get:  key => key !== patch.key ? parent.get(key) : NOT_FOUND,
        prev: (key = null) => parent.prev(key).then(prev => prev === patch.key ? parent.prev(prev) : prev),
        next: (key = null) => parent.next(key).then(next => next === patch.key ? parent.next(next) : next)
      };
    }
    return extend(parent, partial);;
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

  export function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V> {
    return extend(parent, {
      get:  key => parent.get(key).then(value => filterFn(value) ? value : NOT_FOUND),
      prev: key => StateIterator.findKey(State.reverse(parent), filterFn, [key, null]),
      next: key => StateIterator.findKey(parent, filterFn, [key, null])
    });
  }

  export function zoom<V>(parent: State<V>, key: Key): State<V> {
    const next = (k: Key) => k == null ? Promise.resolve(key) : k === key ? Promise.resolve(null) : NOT_FOUND;

    return extend(parent, {
      get:  k => k === key ? parent.get(key) : NOT_FOUND,
      prev: next,
      next: next
    });
  }

  export function cache<V>(parent: State<V>): State<V> {
    return Cache.apply(Cache.create(), parent);
  }

  export function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V> {
    var keyMap: State<Key> = cache(State.map(parent, keyFn));
    var reverseKeyMap: State<Key> = cache({
      get:  key => StateIterator.keyOf(keyMap, key),
      prev: key => reverseKeyMap.get(key).then(keyMap.prev).then(keyMap.get),
      next: key => reverseKeyMap.get(key).then(keyMap.next).then(keyMap.get)
    });

    return extend(reverseKeyMap, { get: key => reverseKeyMap.get(key).then(parent.get) });
  }

  export function fromArray<V>(values: V[]): State<V> {
    return {
      get: (key: number): Promise<V> => {
        if (key in values) return Promise.resolve(values[key])
        return Promise.reject<V>(new Error);
      },
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
        indexByKey: {[key: string]: number} = {
          "null": -1,
        };

    return {
      get: (key: Key): Promise<V> => {
        if (key in values) return Promise.resolve(values[key])
        return Promise.reject<V>(new Error);
      },
      prev: (key: Key): Promise<Key> => {
        var index = key == null ? keys.length - 1 : indexByKey[key] - 1;
        indexByKey[keys[index]] = index;

        if (key == null) return Promise.resolve(keys[keys.length - 1]);
        if (!(key in values)) return Promise.reject<Key>(new Error);

        return Promise.resolve(index == -1 ? null : keys[index]);
      },
      next: (key: Key): Promise<Key> => {
        var index = indexByKey[key] + 1;
        indexByKey[keys[index]] = index;

        if (key == null) return Promise.resolve(keys[0]);
        if (!(key in values)) return Promise.reject<Key>(new Error);

        return Promise.resolve(index == keys.length ? null : keys[index]);
      }
    }
  }
}

Object.defineProperty(State, "NOT_FOUND", {
  get: () => Promise.reject<any>("No entry at the specified key")
});

export default State;
