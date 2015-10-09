import Key           from './key';
import Range         from './range';
import StateIterator from './state_iterator';
import { Patch }     from './patch';

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
    var state: State<V> = parent;
    if (Patch.isSetPatch(patch)) state = extend(state, set(state, patch.key, patch.value, patch.before));
    if (Patch.isDeletePatch(patch)) state = extend(state, del(state, patch.key));
    return state;
  }

  export function patches<V>(parent: State<V>, patches: Patch<V>[]): State<V> {
    return patches.reduce((state, ptch) => patch(state, ptch), parent);
  }

  export function set<V>(parent: State<V>, key: Key, value: V, before?: Key): State<V> {
    var state: PartialState<V> = {
      get: k => k === key ? Promise.resolve(value) : parent.get(k)
    }

    if(before !== undefined) {
      state.prev = (k: Key = null): Promise<Key> => {
        if (k === before) return Promise.resolve(key);
        else if (k == key) return parent.prev(before);
        return parent.prev(k);
      };

      state.next = (k: Key = null): Promise<Key> => {
        if (k === key) return Promise.resolve(before);
        return parent.next(k).then(n => n == before ? key : n);
      };
    }

    return extend(parent, state);
  }

  export function del<V>(parent: State<V>, key: Key): State<V> {
    return extend(parent, {
      get:  k => k !== key ? parent.get(k) : NOT_FOUND,
      prev: (k = null) => parent.prev(k).then(p => p === key ? parent.prev(p) : p),
      next: (k = null) => parent.next(k).then(n => n === key ? parent.next(n) : n)
    });
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

  const DELETED: any = Promise.resolve({});

  export function cache<V>(parent: State<V>): State<V> {
    var _get:  {[key: string]: Promise<V>} = Object.create(null),
        _prev: {[key: string]: Key}        = Object.create(null),
        _next: {[key: string]: Key}        = Object.create(null);

    return {
      get: (key: Key): Promise<V> => {
        if (_get[key] == DELETED) return Promise.reject<V>(new Error);
        return _get[key] === undefined ? (_get[key] = parent.get(key)): _get[key];
      },
      prev: (key: Key): Promise<Key> => {
        return _prev[key] === undefined ? (parent.prev(key).then((res) => (_next[res] = key, _prev[key] = res))) : Promise.resolve(_prev[key]);
      },
      next: (key: Key): Promise<Key> => {
        return _next[key] === undefined ? (parent.next(key).then((res) => (_prev[res] = key, _next[key] = res))) : Promise.resolve(_next[key]);
      }
    }
  }

  export function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V> {
    var state: State<V>;

    return state = cache({
      get: k => StateIterator.find(parent, (value, key) => Promise.resolve(keyFn(value, key)).then(res => res == k)),
      prev: k => Promise.resolve(k == null ? parent.prev() : state.get(k).then(value => StateIterator.keyOf(parent, value)).then(parent.prev))
        .then(p => p == null ? null : parent.get(p).then(value => keyFn(value, p))),
      next: k => Promise.resolve(k == null ? parent.next() : state.get(k).then(value => StateIterator.keyOf(parent, value)).then(parent.next))
        .then(n => n == null ? null : parent.get(n).then(value => keyFn(value, n)))
    });
  }

  export function fromArray<V>(values: V[]): State<V> {
    return {
      get: (key: number): Promise<V> => {
        if (key in values) return Promise.resolve(values[key])
        return Promise.reject<V>(new Error);
      },
      prev: (key: number): Promise<Key> => {
        var index = key == null ? values.length - 1 : key - 1;

        return Promise.resolve(index == -1 ? null : index);
      },
      next: (key: number): Promise<Key> => {
        var index = key == null ? 0 : key + 1;

        return Promise.resolve(index == values.length ? null : index);
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
