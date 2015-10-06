import Key from './key';
import State from './state';

export type Entry<V> = {
  key: Key
  state: State<V>
  get: Promise<V>
  prev: Promise<Entry<V>>
  next: Promise<Entry<V>>
}

function makeEntry<V>(state: State<V>, key: Key): Entry<V> {
  return {
    key: key,
    state: state,

    get get(): Promise<V> {
      return state.get(key)
    },

    get prev(): Promise<Entry<V>> {
      return state.prev(key).then(prev => prev != null ? makeEntry(state, prev) : null);
    },

    get next(): Promise<Entry<V>>{
      return state.next(key).then(next => next != null ? makeEntry(state, next) : null);
    }
  }
}
