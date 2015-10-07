import Key           from './key';
import Range         from './range';
import StateIterator from './state_iterator';
import Patch         from './patch';

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

  export declare var NOT_FOUND: Promise<any>;

  export function extend<V, W>(parent: State<V>, { get, prev, next }: PartialState<W>): State<W> {
    var state = Object.create(parent);
    if (get)  state.get  = get;
    if (prev) state.prev = prev;
    if (next) state.next = next;
    return state;
  }

  export function patch<V>(parent: State<V>, patch: Patch<V>): State<V> {
    var state: State<V> = parent;
    if (patch.set)    state = extend(state, set(state, patch.set.key, patch.set.value, patch.set.before));
    if (patch.delete) state = extend(state, del(state, patch.delete.key));
    return state;
  }

  export function patches<V>(parent: State<V>, patches: Patch<V>[]): State<V> {
    return patches.reduce((state, ptch) => patch(state, ptch), parent);
  }

  export function set<V>(parent: State<V>, key: Key, value: V | Promise<V>, before?: Key): State<V> {
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

}

Object.defineProperty(State, "NOT_FOUND", {
  get: () => Promise.reject<any>("No entry at the specified key")
});

export default State;
