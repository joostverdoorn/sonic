var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
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
            var stringifiedKey = JSON.stringify(key);
            return stringifiedKey in cache.get ? cache.get[stringifiedKey] : cache.get[stringifiedKey] = state.get(key);
        }
        function prev(key = Key.SENTINEL) {
            var stringifiedKey = JSON.stringify(key);
            return stringifiedKey in cache.prev ? cache.prev[stringifiedKey] : cache.prev[stringifiedKey] = state.prev(key).then(prev => { cache.next[JSON.stringify(prev)] = Promise.resolve(key); return prev; });
        }
        function next(key = Key.SENTINEL) {
            var stringifiedKey = JSON.stringify(key);
            return stringifiedKey in cache.next ? cache.next[stringifiedKey] : cache.next[stringifiedKey] = state.next(key).then(next => { cache.prev[JSON.stringify(next)] = Promise.resolve(key); return next; });
        }
        return { get, prev, next };
    }
    Cache.apply = apply;
})(Cache || (Cache = {}));
export default Cache;
//# sourceMappingURL=cache.js.map