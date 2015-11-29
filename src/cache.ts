import Key   from './key';
import State from './state';
import Patch from './patch';

export type Cache<K, V> = {
  get : {[key: string]: Promise<V>}
  prev: {[key: string]: Promise<K>}
  next: {[key: string]: Promise<K>}
}

export module Cache {
  export function create<K, V>(): Cache<K, V> {
    return {
      get : Object.create(null),
      prev: Object.create(null),
      next: Object.create(null)
    }
  }

  export function extend<K, V>(cache: Cache<K, V>): Cache<K, V> {
    return {
      get:  Object.create(cache.get),
      prev: Object.create(cache.prev),
      next: Object.create(cache.next)
    }
  }

  export function apply<K, V>(state: State<K, V>, cache: Cache<K, V>): State<K, V> {
    function get(key: K): Promise<V> {
      var stringifiedKey = JSON.stringify(key);
      return stringifiedKey in cache.get ? cache.get[stringifiedKey] : cache.get[stringifiedKey] = state.get(key);
    }

    function prev(key: K = Key.SENTINEL): Promise<K> {
      var stringifiedKey = JSON.stringify(key);
      return stringifiedKey in cache.prev ? cache.prev[stringifiedKey] : cache.prev[stringifiedKey] = state.prev(key).then(prev => {cache.next[JSON.stringify(prev)] = Promise.resolve(key); return prev});
    }

    function next(key: K = Key.SENTINEL): Promise<K> {
      var stringifiedKey = JSON.stringify(key);
      return stringifiedKey in cache.next ? cache.next[stringifiedKey] : cache.next[stringifiedKey] = state.next(key).then(next => {cache.prev[JSON.stringify(next)] = Promise.resolve(key); return next});
    }

    return {get, prev, next};
  }
}

export default Cache;
