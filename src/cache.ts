import   Key          from './key';
import   State        from './state';
import   Patch        from './patch';

export type Cache<V> = {
  get : {[key: string]: V}
  prev: {[key: string]: Key}
  next: {[key: string]: Key}
}

export module Cache {
  export const DELETED: any = {};

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

  export function patch<V>(cache: Cache<V>, patch: Patch<V>): Cache<V> {
    cache = extend(cache);

    if (Patch.isSetPatch(patch)) {
      cache.get[patch.key] = patch.value;

      var next = patch.before;
      if (next !== undefined) {
        var prev = cache.prev[next];
        if (prev !== undefined) {
          cache.prev[patch.key] = prev;
          cache.next[prev] = patch.key;
        }

        cache.prev[next] = patch.key;
        cache.next[patch.key] = next;
      }
    }

    if (Patch.isDeletePatch(patch)) {
      var next = cache.next[patch.key],
          prev = cache.prev[patch.key];

      if (prev !== undefined) cache.next[prev] = next;
      if (next !== undefined) cache.prev[next] = prev;

      cache.get[patch.key] = DELETED;
      cache.prev[patch.key] = DELETED;
      cache.next[patch.key] = DELETED;
    }

    return cache;
  }

  export function apply<V>(cache: Cache<V>, state: State<V>): State<V> {
    function get(key: Key): Promise<V> {
      if (cache.get[key] === DELETED) return State.NOT_FOUND;
      return key in cache.get ? Promise.resolve(cache.get[key]) : state.get(key).then(res => cache.get[key] = res);
    }

    function prev(key: Key): Promise<Key> {
      if (cache.prev[key] === DELETED) return State.NOT_FOUND;
      return key in cache.prev ? Promise.resolve(cache.prev[key]) : state.prev(key).then(res => cache.prev[cache.next[res] = key] = res);
    }

    function next(key: Key): Promise<Key> {
      if (cache.next[key] === DELETED) return State.NOT_FOUND;
      return key in cache.next ? Promise.resolve(cache.next[key]) : state.next(key).then(res => cache.next[cache.prev[res] = key] = res);
    }

    return {get, prev, next};
  }
}

export default Cache;
