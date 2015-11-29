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
import { NotFound } from './exceptions';
export var Cache;
(function (Cache) {
    const NONE = {};
    function create() {
        var cache = {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        };
        function get(key, value = NONE) {
            return __awaiter(this, void 0, Promise, function* () {
                var string = JSON.stringify(key);
                if (value === NONE) {
                    if (!(string in cache.get))
                        throw new NotFound;
                    return cache.get[string];
                }
                return cache.get[string] = Promise.resolve(value);
            });
        }
        function prev(key = Key.SENTINEL, p = NONE) {
            return __awaiter(this, void 0, Promise, function* () {
                var string = JSON.stringify(key);
                if (p === NONE) {
                    if (!(string in cache.prev))
                        throw new NotFound;
                    return cache.prev[string];
                }
                return cache.prev[string] = Promise.resolve(p);
            });
        }
        function next(key = Key.SENTINEL, n = NONE) {
            return __awaiter(this, void 0, Promise, function* () {
                var string = JSON.stringify(key);
                if (n === NONE) {
                    if (!(string in cache.next))
                        return Promise.reject(new NotFound);
                    return cache.next[string];
                }
                return cache.next[string] = Promise.resolve(n);
            });
        }
        return { get, prev, next };
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
            return __awaiter(this, void 0, Promise, function* () {
                return cache.get(key).catch(reason => {
                    if (reason instanceof NotFound)
                        return cache.get(key, state.get(key));
                    throw reason;
                });
            });
        }
        function prev(key = Key.SENTINEL) {
            return __awaiter(this, void 0, Promise, function* () {
                return cache.prev(key).catch(reason => {
                    if (reason instanceof NotFound)
                        return cache.prev(key, state.prev(key));
                    throw reason;
                });
            });
        }
        function next(key = Key.SENTINEL) {
            return __awaiter(this, void 0, Promise, function* () {
                return cache.next(key).catch(reason => {
                    if (reason instanceof NotFound)
                        return cache.next(key, state.next(key));
                    throw reason;
                });
            });
        }
        return { get, prev, next };
    }
    Cache.apply = apply;
})(Cache || (Cache = {}));
export default Cache;
//# sourceMappingURL=cache.js.map