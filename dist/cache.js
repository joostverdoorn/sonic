"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const exceptions_1 = require('./exceptions');
var Cache;
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
                throw new exceptions_1.NotFound();
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
            return (t) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return cacher(t);
                }
                catch (reason) {
                    if (reason instanceof exceptions_1.NotFound)
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
})(Cache = exports.Cache || (exports.Cache = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Cache;
//# sourceMappingURL=cache.js.map