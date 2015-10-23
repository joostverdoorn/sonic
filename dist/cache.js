import Key from './key';
export var Cache;
(function (Cache) {
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
    function apply(state, cache) {
        function get(key) {
            return key in cache.get ? cache.get[key] : cache.get[key] = state.get(key);
        }
        function prev(key = Key.sentinel) {
            return key in cache.prev ? cache.prev[key] : cache.prev[key] = state.prev(key).then(prev => { cache.next[prev] = Promise.resolve(key); return prev; });
        }
        function next(key = Key.sentinel) {
            return key in cache.next ? cache.next[key] : cache.next[key] = state.next(key).then(next => { cache.prev[next] = Promise.resolve(key); return next; });
        }
        return { get, prev, next };
    }
    Cache.apply = apply;
})(Cache || (Cache = {}));
export default Cache;
