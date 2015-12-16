import Key   from './key';
import State from './state';
import Patch from './patch';
import { NotFound } from './exceptions';

export type Cache<K, V> = {
  get : (key: K, value?:   V) => V,
  prev: (key: K, prevKey?: K) => K,
  next: (key: K, nextKey?: K) => K
};

export module Cache {
  const NONE: any = {};

  export function create<K, V>(): Cache<K, V> {

    const cache = {
      get : Object.create(null),
      prev: Object.create(null),
      next: Object.create(null)
    };

    function createCache<T, U>(c: {[key: string]: U}): (t: T, u?: U) => U {
      return function(t: T, u?: U): U {
        const label = JSON.stringify(t);
        if (arguments.length > 1) return c[label] = u;
        if (label in c) return c[label];
        throw new NotFound();
      }
    }

    return {
      get:  createCache<K, V>(cache.get),
      prev: createCache<K, K>(cache.prev),
      next: createCache<K, K>(cache.next)
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

    function cacheFn<T, U>(fn: (t: T) => U | Promise<U>, cacher: (t: T, u?: U) => U): (t: T) => Promise<U> {
      return async (t: T): Promise<U> => {
        try {
          return cacher(t)
        }
        catch (reason) {
          if (reason instanceof NotFound) return cacher(t, await fn(t));
          throw reason;
        }
      }
    }

    return {
      get:  cacheFn<K, V>(state.get, cache.get),
      prev: cacheFn<K, K>(state.prev, cache.prev),
      next: cacheFn<K, K>(state.next, cache.next)
    };
  }
}

export default Cache;
