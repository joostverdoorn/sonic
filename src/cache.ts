import Key   from './key';
import State from './state';
import Patch from './patch';

export type Cache<V> = {
  get : {[key: string]: Promise<V>}
  prev: {[key: string]: Promise<Key>}
  next: {[key: string]: Promise<Key>}
}

export module Cache {
  export function create<V>(): Cache<V> {
    return {
      get : Object.create(null),
      prev: Object.create(null),
      next: Object.create(null)
    }
  }

  export function extend<V>(cache: Cache<V>): Cache<V> {
    return {
      get:  Object.create(cache.get),
      prev: Object.create(cache.prev),
      next: Object.create(cache.next)
    }
  }

  export function apply<V>(cache: Cache<V>, state: State<V>): State<V> {
    function get(key: Key): Promise<V> {
      return key in cache.get ? cache.get[key] : cache.get[key] = state.get(key);
    }

    function prev(key: Key = Key.None): Promise<Key> {
      return key in cache.prev ? cache.prev[key] : cache.prev[key] = state.prev(key).then(prev => {cache.next[prev] = Promise.resolve(key); return prev});
    }

    function next(key: Key = Key.None): Promise<Key> {
      return key in cache.next ? cache.next[key] : cache.next[key] = state.next(key).then(next => {cache.prev[next] = Promise.resolve(key); return next});
    }

    return {get, prev, next};
  }
}

export default Cache;
