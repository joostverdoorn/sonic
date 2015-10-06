import Key           from './key';
import Range         from './range';
import StateIterator from './state_iterator';

export interface State<V> {
  get:  (key: Key)  => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export module State {
  export function add<V>(old: State<V>, key: Key, value: V): State<V> {
    var state = Object.create(old);

    state.prev = (k: Key): Promise<Key> => {
      if (k == null) return Promise.resolve(key);
      else if (k == key) return old.prev(null);
      return old.prev(k);
    }

    state.next = (k: Key): Promise<Key> => {
      if (k == key) return Promise.resolve(null);
      return old.next(k).then( (n: Key) => n == null ? key : n);
    }

    return State.replace(state, key, value);
  }

  export function replace<V>(old: State<V>, key: Key, value: V): State<V> {
    var state = Object.create(old);

    state.get = (k: Key) => {
      if (k == key) return Promise.resolve(value);
      return old.get(k);
    }

    return state;
  }

  export function remove<V>(old: State<V>, key: Key): State<V> {
    var state = Object.create(old);

    state.get = (k: Key): Promise<V> => {
      if (k == key) return Promise.reject<V>(new Error);
      return old.get(k)
    }
    state.prev = (k: Key): Promise<Key> => {
      return old.prev(k).then((p) => p == key ? old.prev(p) : p )
    }

    state.next = (k: Key): Promise<Key> => {
      return old.next(k).then((n) => n == key ? old.next(n) : n )
    }

    return state;
  }

  export function reverse<V>(old: State<V>): State<V> {
    var state = Object.create(old);

    state.prev = (key: Key) => old.next(key);
    state.next = (key: Key) => old.prev(key);

    return state;
  }

  export function map<V, W>(old: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W> {
    var state = Object.create(old);

    state.get = (key: Key) => {
      return old.get(key).then(value => mapFn(value, key));
    }

    return state;
  }

  export function filter<V>(old: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V> {
    var state = Object.create(old);

    state.get = (key: Key) => {
      return old.get(key).then(value => {
        if(filterFn(value)) return value;
        throw new Error();
      });
    }

    state.prev = (key: Key) => {
      return StateIterator.findKey(State.reverse(old), filterFn, [key, null]);
    }

    state.next = (key: Key) => {
      return StateIterator.findKey(old, filterFn, [key, null]);
    }

    return state;
  }

}

export default State;
