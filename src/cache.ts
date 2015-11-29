import Key   from './key';
import State from './state';
import Patch from './patch';
import { NotFound } from './exceptions';
// export type Cache<K, V> = {
//   get : {[key: string]: Promise<V>}
//   prev: {[key: string]: Promise<K>}
//   next: {[key: string]: Promise<K>}
// }
export type Cache<K, V> = {
  get : (key: K, value?: V | Promise<V>) => Promise<V>,
  prev: (key: K, p?: K | Promise<K>) => Promise<K>,
  next: (key: K, n?: K | Promise<K>) => Promise<K>
};

export module Cache {
  const NONE: any = {};

  export function create<K, V>(): Cache<K, V> {

    var cache = {
      get : Object.create(null),
      prev: Object.create(null),
      next: Object.create(null)
    };

    async function get(key: K, value: V | Promise<V> = NONE): Promise<V> {
      var string = JSON.stringify(key);

      if (value === NONE) {
        if (!(string in cache.get)) throw new NotFound;
        return cache.get[string];
      }

      return cache.get[string] = Promise.resolve(value);
    }

    async function prev(key: K = Key.SENTINEL, p: K | Promise<K> = NONE): Promise<K> {
      var string = JSON.stringify(key);

      if (p === NONE) {
        if (!(string in cache.prev)) throw new NotFound;
        return cache.prev[string];
      }

      return cache.prev[string] = Promise.resolve(p);
    }

    async function next(key: K = Key.SENTINEL, n: K | Promise<K> = NONE): Promise<K> {
      var string = JSON.stringify(key);

      if (n === NONE) {
        if (!(string in cache.next)) return Promise.reject<any>(new NotFound);
        return cache.next[string];
      }

      return cache.next[string] = Promise.resolve(n);
    }

    return {get, prev, next}

  }

  export function extend<K, V>(cache: Cache<K, V>): Cache<K, V> {
    return {
      get:  Object.create(cache.get),
      prev: Object.create(cache.prev),
      next: Object.create(cache.next)
    }
  }

  export function apply<K, V>(state: State<K, V>, cache: Cache<K, V>): State<K, V> {

    async function get(key: K): Promise<V> {
      return cache.get(key).catch(reason => {
        if (reason instanceof NotFound) return cache.get(key, state.get(key));
        throw reason;
      });
    }

    async function prev(key: K = Key.SENTINEL): Promise<K> {
      return cache.prev(key).catch(reason => {
        if (reason instanceof NotFound) return cache.prev(key, state.prev(key));
        throw reason;
      });
    }

    async function next(key: K = Key.SENTINEL): Promise<K> {
      return cache.next(key).catch(reason => {
        if (reason instanceof NotFound) return cache.next(key, state.next(key));
        throw reason;
      });
    }

    return {get, prev, next};
  }
}

export default Cache;
