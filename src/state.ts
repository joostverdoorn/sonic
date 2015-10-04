import Key           from './key';
import Range         from './range';
import StateIterator from './state_iterator';

export interface State<V> {
  get:  (key: Key)  => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export module State {
  export function fromArray<V>(values: V[]): State<V> {
    return {
      get: (key: Key): Promise<V> => {
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
      indexByKey = {
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

    state.prev = old.next;
    state.next = old.prev;

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
