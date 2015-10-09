import State from './state';
import Patch from './patch';
export var Cache;
(function (Cache) {
    Cache.DELETED = {};
    function create() {
        return {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        };
    }
    Cache.create = create;
    function extend(cache) {
        return {
            get: Object.create(cache.get),
            prev: Object.create(cache.prev),
            next: Object.create(cache.next)
        };
    }
    Cache.extend = extend;
    function patch(cache, patch) {
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
            var next = cache.next[patch.key], prev = cache.prev[patch.key];
            if (prev !== undefined)
                cache.next[prev] = next;
            if (next !== undefined)
                cache.prev[next] = prev;
            cache.get[patch.key] = Cache.DELETED;
            cache.prev[patch.key] = Cache.DELETED;
            cache.next[patch.key] = Cache.DELETED;
        }
        return cache;
    }
    Cache.patch = patch;
    function apply(cache, state) {
        function get(key) {
            if (cache.get[key] === Cache.DELETED)
                return State.NOT_FOUND;
            return key in cache.get ? Promise.resolve(cache.get[key]) : state.get(key).then(res => cache.get[key] = res);
        }
        function prev(key) {
            if (cache.prev[key] === Cache.DELETED)
                return State.NOT_FOUND;
            return key in cache.prev ? Promise.resolve(cache.prev[key]) : state.prev(key).then(res => cache.prev[cache.next[res] = key] = res);
        }
        function next(key) {
            if (cache.next[key] === Cache.DELETED)
                return State.NOT_FOUND;
            return key in cache.next ? Promise.resolve(cache.next[key]) : state.next(key).then(res => cache.next[cache.prev[res] = key] = res);
        }
        return { get, prev, next };
    }
    Cache.apply = apply;
})(Cache || (Cache = {}));
export default Cache;
