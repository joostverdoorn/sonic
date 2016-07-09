"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const key_1 = require('./key');
const entry_1 = require('./entry');
const range_1 = require('./range');
const cache_1 = require('./cache');
const async_iterator_1 = require('./async_iterator');
const tree_1 = require('./tree');
const exceptions_1 = require('./exceptions');
var State;
(function (State) {
    State.Empty = {
        get: (key) => Promise.reject(new exceptions_1.NotFound),
        prev: (key = key_1.default.SENTINEL) => key === key_1.default.SENTINEL ? Promise.resolve(key_1.default.SENTINEL) : Promise.reject(new exceptions_1.NotFound),
        next: (key = key_1.default.SENTINEL) => key === key_1.default.SENTINEL ? Promise.resolve(key_1.default.SENTINEL) : Promise.reject(new exceptions_1.NotFound)
    };
    function extend(parent, { get, prev, next }) {
        var state = Object.create(parent);
        if (get)
            state.get = get;
        if (prev)
            state.prev = prev;
        if (next)
            state.next = next;
        return state;
    }
    State.extend = extend;
    function first(state, [from, to] = range_1.Range.all) {
        return __awaiter(this, void 0, void 0, function* () {
            return range_1.Position.isPrevPosition(from) ? from.prev : state.next(from.next);
        });
    }
    State.first = first;
    function last(state, [from, to] = range_1.Range.all) {
        return __awaiter(this, void 0, void 0, function* () {
            return range_1.Position.isNextPosition(to) ? to.next : state.prev(to.prev);
        });
    }
    State.last = last;
    function has(state, key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield state.get(key);
                return true;
            }
            catch (error) {
                if (error instanceof exceptions_1.NotFound)
                    return false;
                throw error;
            }
        });
    }
    State.has = has;
    function is(state, other) {
        var iterator = entries(state), otherIterator = entries(other);
        return async_iterator_1.default.is(iterator, otherIterator, entry_1.default.is);
    }
    State.is = is;
    function contains(state, value) {
        return async_iterator_1.default.some(entries(state), entry => entry[1] === value);
    }
    State.contains = contains;
    function empty(state) {
        return state.next().then(next => next === key_1.default.SENTINEL);
    }
    State.empty = empty;
    function any(state) {
        return state.next().then(next => next !== key_1.default.SENTINEL);
    }
    State.any = any;
    function size(state) {
        return async_iterator_1.default.size(keys(state));
    }
    State.size = size;
    function slice(parent, range = range_1.Range.all) {
        return fromEntries(entries(parent, range));
    }
    State.slice = slice;
    function splice(parent, range, child) {
        const deleted = slice(parent, range), filtered = filter(parent, (value, key) => deleted.get(key).then(() => false, () => true));
        if (child == null)
            return filtered;
        var bridgedChild, bridgedParent, from = range[0], to = range[1];
        bridgedChild = extend(child, {
            prev: key => child.prev(key).then(prev => {
                if (prev !== key_1.default.SENTINEL)
                    return prev;
                return range_1.Position.isNextPosition(from) ? from.next : parent.prev(from.prev);
            }),
            next: key => child.next(key).then(next => {
                if (next !== key_1.default.SENTINEL)
                    return next;
                return range_1.Position.isPrevPosition(to) ? to.prev : parent.next(to.next);
            })
        });
        bridgedParent = extend(filtered, {
            prev: key => parent.prev(key).then(prev => {
                if (range_1.Position.isNextPosition(to) && prev === to.next)
                    return bridgedChild.prev(key_1.default.SENTINEL);
                return has(deleted, prev).then(res => {
                    if (res)
                        throw new exceptions_1.NotFound;
                    return prev;
                });
            }),
            next: key => parent.next(key).then(next => {
                if (range_1.Position.isPrevPosition(from) && next === from.prev)
                    return bridgedChild.next(key_1.default.SENTINEL);
                return has(deleted, next).then(res => {
                    if (res)
                        throw new exceptions_1.NotFound;
                    return next;
                });
            })
        });
        function get(key) {
            return bridgedChild.get(key).catch(reason => {
                if (!(reason instanceof exceptions_1.NotFound))
                    throw reason;
                return bridgedParent.get(key);
            });
        }
        function prev(key = key_1.default.SENTINEL) {
            if (range_1.Position.isPrevPosition(to) && key === to.prev)
                return bridgedChild.prev(key_1.default.SENTINEL);
            return has(bridgedChild, key).then(res => res ? bridgedChild.prev(key) : bridgedParent.prev(key));
        }
        function next(key = key_1.default.SENTINEL) {
            if (range_1.Position.isNextPosition(from) && key === from.next)
                return bridgedChild.next(key_1.default.SENTINEL);
            return has(bridgedChild, key).then(res => res ? bridgedChild.next(key) : bridgedParent.next(key));
        }
        return { get, prev, next };
    }
    State.splice = splice;
    function reverse(parent) {
        return extend(parent, {
            prev: parent.next,
            next: parent.prev
        });
    }
    State.reverse = reverse;
    function map(parent, mapFn) {
        function get(key) {
            return parent.get(key).then(value => mapFn(value, key));
        }
        return extend(parent, { get });
    }
    State.map = map;
    function filter(parent, filterFn) {
        var cache = Object.create(null);
        function have(key) {
            var label = JSON.stringify(key);
            return label in cache ? cache[label] : cache[label] = parent.get(key).then(value => filterFn(value, key));
        }
        function find(state, from) {
            return async_iterator_1.default.filter(keys(state, [{ next: from }, { prev: null }]), have)
                .next().then(result => result.done ? key_1.default.SENTINEL : result.value);
        }
        function get(key) {
            return have(key).then(res => {
                if (!res)
                    throw new exceptions_1.NotFound;
                return parent.get(key);
            });
        }
        function prev(key = key_1.default.SENTINEL) {
            if (key === key_1.default.SENTINEL)
                return find(reverse(parent), key);
            return have(key).then(res => {
                if (!res)
                    throw new exceptions_1.NotFound;
            }).then(() => find(reverse(parent), key));
        }
        function next(key = key_1.default.SENTINEL) {
            if (key === key_1.default.SENTINEL)
                return find(parent, key);
            return have(key).then(res => {
                if (!res)
                    throw new exceptions_1.NotFound;
            }).then(() => find(parent, key));
        }
        return extend(parent, { get, prev, next });
    }
    State.filter = filter;
    function scan(parent, scanFn, memo) {
        return fromEntries(async_iterator_1.default.scan(entries(parent), (memoEntry, entry) => {
            return Promise.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(result => [entry[0], result]);
        }, [key_1.default.SENTINEL, memo]));
    }
    State.scan = scan;
    function pick(parent, picked) {
        return filter(parent, (value, key) => has(picked, key));
    }
    State.pick = pick;
    function omit(parent, omitted) {
        return filter(parent, (value, key) => __awaiter(this, void 0, void 0, function* () { return !(yield has(omitted, key)); }));
    }
    State.omit = omit;
    function zip(parent, other) {
        return fromEntries(async_iterator_1.default.zip(async_iterator_1.default.zip(keys(parent), keys(other)), async_iterator_1.default.zip(values(parent), values(other))));
    }
    State.zip = zip;
    function zoom(parent, key) {
        var have;
        function get(k) {
            if (k === key)
                return parent.get(key);
            return Promise.reject(new exceptions_1.NotFound);
        }
        function next(k = key_1.default.SENTINEL) {
            if (k !== key && k !== key_1.default.SENTINEL)
                return Promise.reject(new exceptions_1.NotFound);
            if (k === key)
                return Promise.resolve(key_1.default.SENTINEL);
            if (have !== undefined)
                return Promise.resolve(have ? key : key_1.default.SENTINEL);
            return has(parent, key).then(res => (have = res) ? key : key_1.default.SENTINEL);
        }
        return { get, prev: next, next };
    }
    State.zoom = zoom;
    function flatten(parent) {
        return extend(parent, {
            get: key => tree_1.Tree.get(parent, key),
            prev: key => tree_1.Tree.prev(parent, key),
            next: key => tree_1.Tree.next(parent, key)
        });
    }
    State.flatten = flatten;
    function flatMap(parent, mapFn) {
        return State.flatten(State.map(parent, mapFn));
    }
    State.flatMap = flatMap;
    function groupBy(parent, groupFn) {
        var states = {};
        var it = entries(parent);
        var groupKeyed = async_iterator_1.default.map(it, ([key, value]) => { return Promise.resolve(groupFn(value, key)).then(groupKey => [groupKey, value]); });
        var filtered = async_iterator_1.default.filter(groupKeyed, ([groupKey, value]) => !(JSON.stringify(groupKey) in states));
        var mapped = async_iterator_1.default.map(filtered, ([groupKey, value]) => {
            var state = filter(parent, (value, key) => Promise.resolve(groupFn(value, key)).then(gk => gk === groupKey));
            return [groupKey, states[JSON.stringify(groupKey)] = state];
        });
        return fromEntries(mapped);
    }
    State.groupBy = groupBy;
    function unique(parent, uniqueFn) {
        return fromEntries(async_iterator_1.default.unique(entries(parent), ([key, value]) => __awaiter(this, void 0, void 0, function* () { return uniqueFn(value, key); })));
    }
    State.unique = unique;
    function union(state, other, uniqueFn) {
        return fromEntries(async_iterator_1.default.unique(async_iterator_1.default.concat(entries(state), entries(other)), ([key, value]) => __awaiter(this, void 0, void 0, function* () { return uniqueFn(value, key); })));
    }
    State.union = union;
    function keyBy(parent, keyFn, reverseKeyFn) {
        if (!reverseKeyFn)
            return fromEntries(async_iterator_1.default.map(entries(parent), entry => {
                return Promise.resolve(keyFn(entry[1], entry[0])).then(key => [key, entry[1]]);
            }));
        return {
            get(key) {
                return __awaiter(this, void 0, void 0, function* () {
                    return parent.get(yield reverseKeyFn(key));
                });
            },
            prev(key) {
                return __awaiter(this, void 0, void 0, function* () {
                    var prev = yield parent.prev(yield reverseKeyFn(key));
                    return keyFn(yield parent.get(prev), prev);
                });
            },
            next(key) {
                return __awaiter(this, void 0, void 0, function* () {
                    var next = yield parent.next(yield reverseKeyFn(key));
                    return keyFn(yield parent.get(next), next);
                });
            }
        };
    }
    State.keyBy = keyBy;
    function take(parent, count) {
        return fromEntries(async_iterator_1.default.take(entries(parent), count));
    }
    State.take = take;
    function skip(parent, count) {
        return fromEntries(async_iterator_1.default.skip(entries(parent), count));
    }
    State.skip = skip;
    function cache(parent) {
        return cache_1.default.apply(parent, cache_1.default.create());
    }
    State.cache = cache;
    function unit(value, key = key_1.default.unique()) {
        return {
            get: k => k === key ? Promise.resolve(value) : Promise.reject(new exceptions_1.NotFound),
            prev: (k = key_1.default.SENTINEL) => Promise.resolve(k === key_1.default.SENTINEL ? key : key_1.default.SENTINEL),
            next: (k = key_1.default.SENTINEL) => Promise.resolve(k === key_1.default.SENTINEL ? key : key_1.default.SENTINEL)
        };
    }
    State.unit = unit;
    function entries(state, range = range_1.Range.all) {
        var current = key_1.default.SENTINEL, done = false, [from, to] = range;
        function get(key) {
            if (key === key_1.default.SENTINEL)
                return (done = true, Promise.resolve(async_iterator_1.default.done));
            return state.get(key).then(value => (current = key, { done: false, value: [key, value] }));
        }
        function iterate(key) {
            return state.next(key).then(next => {
                if (range_1.Position.isPrevPosition(to) && to.prev === next)
                    return get(key_1.default.SENTINEL);
                return get(next);
            });
        }
        function next() {
            if (range_1.Position.isPrevPosition(from) && range_1.Position.isPrevPosition(to) && from.prev === to.prev)
                return get(key_1.default.SENTINEL);
            if (range_1.Position.isNextPosition(from) && range_1.Position.isNextPosition(to) && from.next === to.next)
                return get(key_1.default.SENTINEL);
            if (current === key_1.default.SENTINEL)
                return range_1.Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
            if (range_1.Position.isNextPosition(to) && to.next === current)
                return get(key_1.default.SENTINEL);
            return iterate(current);
        }
        return async_iterator_1.default.create(next);
    }
    State.entries = entries;
    function keys(state, range = range_1.Range.all) {
        return async_iterator_1.default.map(entries(state, range), entry_1.default.key);
    }
    State.keys = keys;
    function values(state, range = range_1.Range.all) {
        return async_iterator_1.default.map(entries(state, range), entry_1.default.value);
    }
    State.values = values;
    function fromEntries(iterator) {
        var cache = cache_1.default.create(), exhausted = false, currentKey = key_1.default.SENTINEL, queue = Promise.resolve(null);
        var cachingIterator = async_iterator_1.default.create(() => __awaiter(this, void 0, void 0, function* () {
            var result = yield iterator.next();
            if (result.done) {
                exhausted = true;
                cache.prev(key_1.default.SENTINEL, currentKey);
                cache.next(currentKey, key_1.default.SENTINEL);
                return async_iterator_1.default.done;
            }
            var [key, value] = result.value;
            cache.prev(key, currentKey);
            cache.next(currentKey, key);
            cache.get(key, value);
            currentKey = key;
            return { done: false, value: [key, value] };
        }));
        function get(key) {
            if (exhausted)
                return Promise.reject(new exceptions_1.NotFound);
            return async_iterator_1.default.find(cachingIterator, entry => entry[0] === key).then(entry_1.default.value);
        }
        function prev(key = key_1.default.SENTINEL) {
            return __awaiter(this, void 0, void 0, function* () {
                if (exhausted)
                    return Promise.reject(new exceptions_1.NotFound);
                yield async_iterator_1.default.some(cachingIterator, entry => entry[0] === key);
                return cache.prev(key);
            });
        }
        function next(key = key_1.default.SENTINEL) {
            if (exhausted)
                return Promise.reject(new exceptions_1.NotFound);
            if (key === currentKey)
                return cachingIterator.next().then(result => result.done ? key_1.default.SENTINEL : result.value[0]);
            return async_iterator_1.default.find(cachingIterator, entry => entry[0] === key).then(() => cachingIterator.next()).then(result => result.done ? key_1.default.SENTINEL : result.value[0]);
        }
        return cache_1.default.apply({ get, prev, next }, cache);
    }
    State.fromEntries = fromEntries;
    function fromKeys(iterator) {
        return fromEntries(async_iterator_1.default.map(iterator, key => [key, null]));
    }
    State.fromKeys = fromKeys;
    function fromValues(iterator) {
        return fromEntries(async_iterator_1.default.scan(iterator, (prev, value) => [prev[0] + 1, value], [-1, null]));
    }
    State.fromValues = fromValues;
    function fromArray(values) {
        return fromValues(async_iterator_1.default.fromArray(values));
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromEntries(async_iterator_1.default.fromObject(values));
    }
    State.fromObject = fromObject;
    function lazy(fn) {
        var state, queue = Promise.resolve();
        function createState() {
            return __awaiter(this, void 0, void 0, function* () {
                return state ? state : state = yield fn();
            });
        }
        function get(key) {
            return state ? state.get(key) : queue.then(createState).then(s => s.get(key));
        }
        function prev(key) {
            return state ? state.prev(key) : queue.then(createState).then(s => s.prev(key));
        }
        function next(key) {
            return state ? state.next(key) : queue.then(createState).then(s => s.next(key));
        }
        return { get, prev, next };
    }
    State.lazy = lazy;
    function toObject(state, range = range_1.Range.all) {
        return async_iterator_1.default.toObject(entries(state, range));
    }
    State.toObject = toObject;
    function toArray(state, range = range_1.Range.all) {
        return async_iterator_1.default.toArray(values(state, range));
    }
    State.toArray = toArray;
})(State = exports.State || (exports.State = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = State;
//# sourceMappingURL=state.js.map