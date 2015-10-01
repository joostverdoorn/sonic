import Key           from './key';
import Range         from './range';
import StateIterator from './state_iterator';

export interface State<V> {
  get:  (key: Key)  => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export module State {

  export function reverse<V>(list: State<V>): State<V> {
    var { get, next: prev, prev: next } = list;
    return { get, prev, next };
  }

  export function map<V, W>(list: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W> {
    var { prev, next } = list;

    function get(key: Key) {
      return list.get(key).then(value => mapFn(value, key));
    }

    return { get, prev, next };
  }

  export function filter<V>(list: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V> {
    function get(key: Key) {
      return list.get(key).then(value => {
        if(filterFn(value)) return value;
        throw new Error();
      });
    }

    function prev(key: Key) {
      return StateIterator.findKey(State.reverse(list), filterFn, [key, null]);
    }

    function next(key: Key) {
      return StateIterator.findKey(list, filterFn, [key, null]);
    }

    return { get, prev, next };
  }
}

export default State;
