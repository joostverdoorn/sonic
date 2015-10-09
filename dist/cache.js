import State from './state';
import List from './list';
import Patch from './patch';
const DELETED = {};
export function cache(parent, patches) {
    function getState(cache) {
        function get(key) {
            if (cache.get[key] === DELETED)
                return State.NOT_FOUND;
            return key in cache.get ? Promise.resolve(cache.get[key]) : parent.get(key).then(res => cache.get[key] = res);
        }
        function prev(key) {
            if (cache.prev[key] === DELETED)
                return State.NOT_FOUND;
            return key in cache.prev ? Promise.resolve(cache.prev[key]) : parent.prev(key).then(res => cache.prev[cache.next[res] = key] = res);
        }
        function next(key) {
            if (cache.next[key] === DELETED)
                return State.NOT_FOUND;
            return key in cache.next ? Promise.resolve(cache.next[key]) : parent.next(key).then(res => cache.next[cache.prev[res] = key] = res);
        }
        return { get, prev, next };
    }
    var cache = {
        get: Object.create(null),
        prev: Object.create(null),
        next: Object.create(null)
    };
    function reducer(state, patch) {
        cache = {
            get: Object.create(cache.get),
            prev: Object.create(cache.prev),
            next: Object.create(cache.next)
        };
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
            cache.get[patch.key] = DELETED;
            cache.prev[patch.key] = DELETED;
            cache.next[patch.key] = DELETED;
        }
        return getState(cache);
    }
    return List.create(getState(cache), patches, reducer);
}
export default cache;
