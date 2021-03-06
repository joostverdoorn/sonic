var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import Key from './key';
import Entry from './entry';
import { Position, Range } from './range';
import Cache from './cache';
import AsyncIterator from './async_iterator';
import { Tree } from './tree';
import { NotFound } from './exceptions';
export var State;
(function (State) {
    State.Empty = {
        get: (key) => Promise.reject(new NotFound),
        prev: (key = Key.SENTINEL) => key === Key.SENTINEL ? Promise.resolve(Key.SENTINEL) : Promise.reject(new NotFound),
        next: (key = Key.SENTINEL) => key === Key.SENTINEL ? Promise.resolve(Key.SENTINEL) : Promise.reject(new NotFound)
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
    function first(state, [from, to] = Range.all) {
        return __awaiter(this, void 0, Promise, function* () {
            return Position.isPrevPosition(from) ? from.prev : state.next(from.next);
        });
    }
    State.first = first;
    function last(state, [from, to] = Range.all) {
        return __awaiter(this, void 0, Promise, function* () {
            return Position.isNextPosition(to) ? to.next : state.prev(to.prev);
        });
    }
    State.last = last;
    function has(state, key) {
        return __awaiter(this, void 0, Promise, function* () {
            try {
                yield state.get(key);
                return true;
            }
            catch (error) {
                if (error instanceof NotFound)
                    return false;
                throw error;
            }
        });
    }
    State.has = has;
    function is(state, other) {
        var iterator = entries(state), otherIterator = entries(other);
        return AsyncIterator.is(iterator, otherIterator, Entry.is);
    }
    State.is = is;
    function contains(state, value) {
        return AsyncIterator.some(entries(state), entry => entry[1] === value);
    }
    State.contains = contains;
    function empty(state) {
        return state.next().then(next => next === Key.SENTINEL);
    }
    State.empty = empty;
    function any(state) {
        return state.next().then(next => next !== Key.SENTINEL);
    }
    State.any = any;
    function size(state) {
        return AsyncIterator.size(keys(state));
    }
    State.size = size;
    function slice(parent, range = Range.all) {
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
                if (prev !== Key.SENTINEL)
                    return prev;
                return Position.isNextPosition(from) ? from.next : parent.prev(from.prev);
            }),
            next: key => child.next(key).then(next => {
                if (next !== Key.SENTINEL)
                    return next;
                return Position.isPrevPosition(to) ? to.prev : parent.next(to.next);
            })
        });
        bridgedParent = extend(filtered, {
            prev: key => parent.prev(key).then(prev => {
                if (Position.isNextPosition(to) && prev === to.next)
                    return bridgedChild.prev(Key.SENTINEL);
                return has(deleted, prev).then(res => {
                    if (res)
                        throw new NotFound;
                    return prev;
                });
            }),
            next: key => parent.next(key).then(next => {
                if (Position.isPrevPosition(from) && next === from.prev)
                    return bridgedChild.next(Key.SENTINEL);
                return has(deleted, next).then(res => {
                    if (res)
                        throw new NotFound;
                    return next;
                });
            })
        });
        function get(key) {
            return bridgedChild.get(key).catch(reason => {
                if (!(reason instanceof NotFound))
                    throw reason;
                return bridgedParent.get(key);
            });
        }
        function prev(key = Key.SENTINEL) {
            if (Position.isPrevPosition(to) && key === to.prev)
                return bridgedChild.prev(Key.SENTINEL);
            return has(bridgedChild, key).then(res => res ? bridgedChild.prev(key) : bridgedParent.prev(key));
        }
        function next(key = Key.SENTINEL) {
            if (Position.isNextPosition(from) && key === from.next)
                return bridgedChild.next(Key.SENTINEL);
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
            return AsyncIterator.filter(keys(state, [{ next: from }, { prev: null }]), have)
                .next().then(result => result.done ? Key.SENTINEL : result.value);
        }
        function get(key) {
            return have(key).then(res => {
                if (!res)
                    throw new NotFound;
                return parent.get(key);
            });
        }
        function prev(key = Key.SENTINEL) {
            if (key === Key.SENTINEL)
                return find(reverse(parent), key);
            return have(key).then(res => {
                if (!res)
                    throw new NotFound;
            }).then(() => find(reverse(parent), key));
        }
        function next(key = Key.SENTINEL) {
            if (key === Key.SENTINEL)
                return find(parent, key);
            return have(key).then(res => {
                if (!res)
                    throw new NotFound;
            }).then(() => find(parent, key));
        }
        return extend(parent, { get, prev, next });
    }
    State.filter = filter;
    function scan(parent, scanFn, memo) {
        return fromEntries(AsyncIterator.scan(entries(parent), (memoEntry, entry) => {
            return Promise.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(result => [entry[0], result]);
        }, [Key.SENTINEL, memo]));
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
        return fromEntries(AsyncIterator.zip(AsyncIterator.zip(keys(parent), keys(other)), AsyncIterator.zip(values(parent), values(other))));
    }
    State.zip = zip;
    function zoom(parent, key) {
        var have;
        function get(k) {
            if (k === key)
                return parent.get(key);
            return Promise.reject(new NotFound);
        }
        function next(k = Key.SENTINEL) {
            if (k !== key && k !== Key.SENTINEL)
                return Promise.reject(new NotFound);
            if (k === key)
                return Promise.resolve(Key.SENTINEL);
            if (have !== undefined)
                return Promise.resolve(have ? key : Key.SENTINEL);
            return has(parent, key).then(res => (have = res) ? key : Key.SENTINEL);
        }
        return { get, prev: next, next };
    }
    State.zoom = zoom;
    function flatten(parent) {
        return extend(parent, {
            get: key => Tree.get(parent, key),
            prev: key => Tree.prev(parent, key),
            next: key => Tree.next(parent, key)
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
        var groupKeyed = AsyncIterator.map(it, ([key, value]) => { return Promise.resolve(groupFn(value, key)).then(groupKey => [groupKey, value]); });
        var filtered = AsyncIterator.filter(groupKeyed, ([groupKey, value]) => !(JSON.stringify(groupKey) in states));
        var mapped = AsyncIterator.map(filtered, ([groupKey, value]) => {
            var state = filter(parent, (value, key) => Promise.resolve(groupFn(value, key)).then(gk => gk === groupKey));
            return [groupKey, states[JSON.stringify(groupKey)] = state];
        });
        return fromEntries(mapped);
    }
    State.groupBy = groupBy;
    function unique(parent, uniqueFn) {
        return fromEntries(AsyncIterator.unique(entries(parent), ([key, value]) => __awaiter(this, void 0, void 0, function* () { return uniqueFn(value, key); })));
    }
    State.unique = unique;
    function union(state, other, uniqueFn) {
        return fromEntries(AsyncIterator.unique(AsyncIterator.concat(entries(state), entries(other)), ([key, value]) => __awaiter(this, void 0, void 0, function* () { return uniqueFn(value, key); })));
    }
    State.union = union;
    function keyBy(parent, keyFn, reverseKeyFn) {
        if (!reverseKeyFn)
            return fromEntries(AsyncIterator.map(entries(parent), entry => {
                return Promise.resolve(keyFn(entry[1], entry[0])).then(key => [key, entry[1]]);
            }));
        return {
            get(key) {
                return __awaiter(this, void 0, Promise, function* () {
                    return parent.get(yield reverseKeyFn(key));
                });
            },
            prev(key) {
                return __awaiter(this, void 0, Promise, function* () {
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
        return fromEntries(AsyncIterator.take(entries(parent), count));
    }
    State.take = take;
    function skip(parent, count) {
        return fromEntries(AsyncIterator.skip(entries(parent), count));
    }
    State.skip = skip;
    function cache(parent) {
        return Cache.apply(parent, Cache.create());
    }
    State.cache = cache;
    function unit(value, key = Key.unique()) {
        return {
            get: k => k === key ? Promise.resolve(value) : Promise.reject(new NotFound),
            prev: (k = Key.SENTINEL) => Promise.resolve(k === Key.SENTINEL ? key : Key.SENTINEL),
            next: (k = Key.SENTINEL) => Promise.resolve(k === Key.SENTINEL ? key : Key.SENTINEL)
        };
    }
    State.unit = unit;
    function entries(state, range = Range.all) {
        var current = Key.SENTINEL, done = false, [from, to] = range;
        function get(key) {
            if (key === Key.SENTINEL)
                return (done = true, Promise.resolve(AsyncIterator.done));
            return state.get(key).then(value => (current = key, { done: false, value: [key, value] }));
        }
        function iterate(key) {
            return state.next(key).then(next => {
                if (Position.isPrevPosition(to) && to.prev === next)
                    return get(Key.SENTINEL);
                return get(next);
            });
        }
        function next() {
            if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev)
                return get(Key.SENTINEL);
            if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next)
                return get(Key.SENTINEL);
            if (current === Key.SENTINEL)
                return Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
            if (Position.isNextPosition(to) && to.next === current)
                return get(Key.SENTINEL);
            return iterate(current);
        }
        return AsyncIterator.create(next);
    }
    State.entries = entries;
    function keys(state, range = Range.all) {
        return AsyncIterator.map(entries(state, range), Entry.key);
    }
    State.keys = keys;
    function values(state, range = Range.all) {
        return AsyncIterator.map(entries(state, range), Entry.value);
    }
    State.values = values;
    function fromEntries(iterator) {
        var cache = Cache.create(), exhausted = false, currentKey = Key.SENTINEL, queue = Promise.resolve(null);
        var cachingIterator = AsyncIterator.create(() => __awaiter(this, void 0, void 0, function* () {
            var result = yield iterator.next();
            if (result.done) {
                exhausted = true;
                cache.prev(Key.SENTINEL, currentKey);
                cache.next(currentKey, Key.SENTINEL);
                return AsyncIterator.done;
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
                return Promise.reject(new NotFound);
            return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(Entry.value);
        }
        function prev(key = Key.SENTINEL) {
            return __awaiter(this, void 0, Promise, function* () {
                if (exhausted)
                    return Promise.reject(new NotFound);
                yield AsyncIterator.some(cachingIterator, entry => entry[0] === key);
                return cache.prev(key);
            });
        }
        function next(key = Key.SENTINEL) {
            if (exhausted)
                return Promise.reject(new NotFound);
            if (key === currentKey)
                return cachingIterator.next().then(result => result.done ? Key.SENTINEL : result.value[0]);
            return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(() => cachingIterator.next()).then(result => result.done ? Key.SENTINEL : result.value[0]);
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    State.fromEntries = fromEntries;
    function fromKeys(iterator) {
        return fromEntries(AsyncIterator.map(iterator, key => [key, null]));
    }
    State.fromKeys = fromKeys;
    function fromValues(iterator) {
        return fromEntries(AsyncIterator.scan(iterator, (prev, value) => [prev[0] + 1, value], [-1, null]));
    }
    State.fromValues = fromValues;
    function fromArray(values) {
        return fromValues(AsyncIterator.fromArray(values));
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromEntries(AsyncIterator.fromObject(values));
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
    function toObject(state, range = Range.all) {
        return AsyncIterator.toObject(entries(state, range));
    }
    State.toObject = toObject;
    function toArray(state, range = Range.all) {
        return AsyncIterator.toArray(values(state, range));
    }
    State.toArray = toArray;
})(State || (State = {}));
export default State;
//# sourceMappingURL=state.js.map