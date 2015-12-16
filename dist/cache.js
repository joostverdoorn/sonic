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
import { NotFound } from './exceptions';
export var Cache;
(function (Cache) {
    const NONE = {};
    function create() {
        const cache = {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        };
        function createCache(c) {
            return function (t, u) {
                const label = JSON.stringify(t);
                if (arguments.length > 1)
                    return c[label] = u;
                if (label in c)
                    return c[label];
                throw new NotFound();
            };
        }
        return {
            get: createCache(cache.get),
            prev: createCache(cache.prev),
            next: createCache(cache.next)
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
        function cacheFn(fn, cacher) {
            return (t) => __awaiter(this, void 0, Promise, function* () {
                try {
                    return cacher(t);
                }
                catch (reason) {
                    if (reason instanceof NotFound)
                        return cacher(t, yield fn(t));
                    throw reason;
                }
            });
        }
        return {
            get: cacheFn(state.get, cache.get),
            prev: cacheFn(state.prev, cache.prev),
            next: cacheFn(state.next, cache.next)
        };
    }
    Cache.apply = apply;
})(Cache || (Cache = {}));
export default Cache;
//# sourceMappingURL=cache.js.map