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
var AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.done = { done: true };
    AsyncIterator.Empty = {
        next: () => Promise.resolve(AsyncIterator.done)
    };
    function every(iterator, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            var result;
            while ((result = yield iterator.next()) && !result.done) {
                if (!(yield predicate(result.value)))
                    return false;
            }
            return true;
        });
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            return !(yield every(iterator, (value) => __awaiter(this, void 0, void 0, function* () { return !(yield predicate(value)); })));
        });
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield every(iterator, (value) => __awaiter(this, void 0, void 0, function* () { yield fn(value); return true; }));
        });
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield forEach(iterator, (value) => __awaiter(this, void 0, void 0, function* () { memo = yield fn(memo, value); }));
            return memo;
        });
    }
    AsyncIterator.reduce = reduce;
    function find(iterator, predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            var result;
            if (yield some(iterator, (value) => __awaiter(this, void 0, void 0, function* () { return !(yield predicate(value)) ? false : (result = value, true); }))) {
                return result;
            }
            else {
                throw new exceptions_1.NotFound;
            }
        });
    }
    AsyncIterator.find = find;
    function indexOf(iterator, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var index = -1;
            if (yield some(iterator, v => (index++, value == v))) {
                return index;
            }
            else {
                throw new exceptions_1.NotFound;
            }
        });
    }
    AsyncIterator.indexOf = indexOf;
    function at(iterator, index) {
        return find(iterator, () => 0 === index--);
    }
    AsyncIterator.at = at;
    function size(iterator) {
        var count = -1;
        return forEach(iterator, () => { count++; }).then(() => count);
    }
    AsyncIterator.size = size;
    function contains(iterator, value) {
        return some(iterator, v => v === value);
    }
    AsyncIterator.contains = contains;
    function is(iterator, other, equals = (a, b) => a === b) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield every(iterator, (value) => __awaiter(this, void 0, void 0, function* () {
                var result = yield other.next();
                return !result.done && equals(value, result.value);
            }))) && (yield other.next()).done;
        });
    }
    AsyncIterator.is = is;
    function map(iterator, mapFn) {
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                var result = yield iterator.next();
                return result.done ? AsyncIterator.done : { done: false, value: yield mapFn(result.value) };
            });
        }
        return create(next);
    }
    AsyncIterator.map = map;
    function filter(iterator, filterFn) {
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                var result = yield iterator.next();
                if (result.done)
                    return AsyncIterator.done;
                if (yield filterFn(result.value))
                    return result;
                return next();
            });
        }
        return create(next);
    }
    AsyncIterator.filter = filter;
    function scan(iterator, scanFn, memo) {
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                var result = yield iterator.next();
                if (result.done)
                    return AsyncIterator.done;
                memo = yield scanFn(memo, result.value);
                return { done: false, value: memo };
            });
        }
        return create(next);
    }
    AsyncIterator.scan = scan;
    function zip(iterator, other, zipFn = (t, u) => [t, u]) {
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                var result = yield iterator.next();
                if (result.done)
                    return AsyncIterator.done;
                var otherResult = yield other.next();
                if (otherResult.done)
                    return AsyncIterator.done;
                return { done: false, value: yield zipFn(result.value, otherResult.value) };
            });
        }
        return create(next);
    }
    AsyncIterator.zip = zip;
    function take(iterator, count) {
        var i = 0;
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                return ++i > count ? AsyncIterator.done : iterator.next();
            });
        }
        return create(next);
    }
    AsyncIterator.take = take;
    function skip(iterator, count) {
        var i = 0;
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                if (i < count)
                    yield some(iterator, () => ++i >= count);
                return iterator.next();
            });
        }
        return create(next);
    }
    AsyncIterator.skip = skip;
    function unique(iterator, uniqueFn) {
        var cache = Object.create(null);
        return AsyncIterator.filter(iterator, (value) => __awaiter(this, void 0, void 0, function* () {
            var u = JSON.stringify(yield uniqueFn(value));
            return (!cache[u]) || (cache[u] = true);
        }));
    }
    AsyncIterator.unique = unique;
    function concat(...iterators) {
        return iterators.reduce((memo, iterator) => {
            var iterated = false, queue = Promise.resolve(null);
            function next() {
                return __awaiter(this, void 0, void 0, function* () {
                    if (iterated)
                        return iterator.next();
                    var result = yield memo.next();
                    if (!result.done)
                        return result;
                    iterated = true;
                    return iterator.next();
                });
            }
            return create(next);
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromArray(array) {
        var current = -1, queue = Promise.resolve(null);
        function next() {
            return __awaiter(this, void 0, void 0, function* () {
                return ++current >= array.length ? AsyncIterator.done : { done: false, value: array[current] };
            });
        }
        return create(next);
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromArray(Object.keys(object).map(key => [key, object[key]]));
    }
    AsyncIterator.fromObject = fromObject;
    function toArray(iterator) {
        return reduce(iterator, (memo, value) => (memo.push(value), memo), []);
    }
    AsyncIterator.toArray = toArray;
    function toObject(iterator) {
        return reduce(iterator, (memo, [key, value]) => (memo[key] = value, memo), Object.create(null));
    }
    AsyncIterator.toObject = toObject;
    function create(next) {
        var queue = Promise.resolve(null);
        return {
            next() {
                return queue = queue.then(next);
            }
        };
    }
    AsyncIterator.create = create;
})(AsyncIterator = exports.AsyncIterator || (exports.AsyncIterator = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AsyncIterator;
//# sourceMappingURL=async_iterator.js.map