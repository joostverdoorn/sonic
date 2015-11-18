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
import Entry from './entry';
import { Position, Range } from './range';
import Cache from './cache';
import AsyncIterator from './async_iterator';
import { Tree, Path } from './tree';
import { NotFound } from './exceptions';
export var State;
(function (State) {
    State.Empty = {
        get: (key) => Promise.reject(new NotFound),
        prev: (key = Key.sentinel) => key === Key.sentinel ? Promise.resolve(Key.sentinel) : Promise.reject(new NotFound),
        next: (key = Key.sentinel) => key === Key.sentinel ? Promise.resolve(Key.sentinel) : Promise.reject(new NotFound)
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
        return Position.isPrevPosition(from) ? state.get(from.prev) : state.next(from.next).then(state.get);
    }
    State.first = first;
    function last(state, [from, to] = Range.all) {
        return Position.isNextPosition(to) ? state.get(to.next) : state.prev(to.prev).then(state.get);
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
        return state.next().then(next => next === Key.sentinel);
    }
    State.empty = empty;
    function any(state) {
        return state.next().then(next => next !== Key.sentinel);
    }
    State.any = any;
    function slice(parent, range = Range.all) {
        return fromEntries(entries(parent, range));
    }
    State.slice = slice;
    function splice(parent, range, child) {
        var deleted = slice(parent, range), filtered = filter(parent, (value, key) => deleted.get(key).then(() => false, () => true));
        if (child == null)
            return filtered;
        var bridgedChild, bridgedParent, from = range[0], to = range[1];
        bridgedChild = extend(child, {
            prev: key => child.prev(key).then(prev => {
                if (prev !== Key.sentinel)
                    return Promise.resolve(prev);
                return Position.isNextPosition(from) ? Promise.resolve(from.next) : parent.prev(from.prev);
            }),
            next: key => child.next(key).then(next => {
                if (next !== Key.sentinel)
                    return Promise.resolve(next);
                return Position.isPrevPosition(to) ? Promise.resolve(to.prev) : parent.next(to.next);
            })
        });
        bridgedParent = extend(filtered, {
            prev: key => parent.prev(key).then(prev => {
                if (Position.isNextPosition(to) && prev === to.next)
                    return bridgedChild.prev(Key.sentinel);
                return has(deleted, prev).then(res => res ? Promise.reject(new NotFound) : prev);
            }),
            next: key => parent.next(key).then(next => {
                if (Position.isPrevPosition(from) && next === from.prev)
                    return bridgedChild.next(Key.sentinel);
                return has(deleted, next).then(res => res ? Promise.reject(new NotFound) : next);
            })
        });
        function get(key) {
            return has(child, key).then(res => res ? bridgedChild.get(key) : bridgedParent.get(key));
        }
        function prev(key = Key.sentinel) {
            if (Position.isPrevPosition(to) && key === to.prev)
                return bridgedChild.prev(Key.sentinel);
            return has(bridgedChild, key).then(res => res ? bridgedChild.prev(key) : bridgedParent.prev(key));
        }
        function next(key = Key.sentinel) {
            if (Position.isNextPosition(from) && key === from.next)
                return bridgedChild.next(Key.sentinel);
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
            return __awaiter(this, void 0, Promise, function* () {
                return mapFn(yield parent.get(key), key);
            });
        }
        return extend(parent, { get });
    }
    State.map = map;
    function filter(parent, filterFn) {
        var cache = Object.create(null);
        function have(key) {
            return key in cache ? cache[key] : cache[key] = parent.get(key).then(value => filterFn(value, key));
        }
        function get(key) {
            return have(key).then(res => res ? parent.get(key) : Promise.reject(new NotFound));
        }
        function prev(key) {
            return parent.prev(key).then(p => p === Key.sentinel ? Key.sentinel : have(p).then(res => res ? p : prev(p)));
        }
        function next(key) {
            return parent.next(key).then(n => n === Key.sentinel ? Key.sentinel : have(n).then(res => res ? n : next(n)));
        }
        return extend(parent, { get, prev, next });
    }
    State.filter = filter;
    function scan(parent, scanFn, memo) {
        return fromEntries(AsyncIterator.scan(entries(parent), (memoEntry, entry) => {
            return Promise.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(result => [entry[0], result]);
        }, [Key.sentinel, memo]));
    }
    State.scan = scan;
    function zip(parent, other) {
        return fromValues(AsyncIterator.zip(values(parent), values(other)));
    }
    State.zip = zip;
    function zoom(parent, key) {
        var have;
        function get(k) {
            return __awaiter(this, void 0, Promise, function* () {
                if (k === key)
                    return parent.get(key);
                throw new NotFound;
            });
        }
        function next(k = Key.sentinel) {
            return __awaiter(this, void 0, Promise, function* () {
                if (k !== key && k !== Key.sentinel)
                    throw new NotFound;
                if (!(yield has(parent, key)))
                    throw new NotFound;
                if (k === Key.sentinel)
                    return key;
                if (k === key)
                    return Key.sentinel;
            });
        }
        return { get, prev: next, next };
    }
    State.zoom = zoom;
    function flatten(parent) {
        return extend(parent, {
            get: key => Tree.get(parent, Path.fromKey(key)),
            prev: key => Tree.prev(parent, Path.fromKey(key)).then(Path.toKey),
            next: key => Tree.next(parent, Path.fromKey(key)).then(Path.toKey)
        });
    }
    State.flatten = flatten;
    function groupBy(parent, groupFn) {
        var states = {};
        var it = entries(parent);
        var groupKeyed = AsyncIterator.map(it, ([key, value]) => { return Promise.resolve(groupFn(value, key)).then(groupKey => [groupKey, value]); });
        var filtered = AsyncIterator.filter(groupKeyed, ([groupKey, value]) => !(groupKey in states));
        var mapped = AsyncIterator.map(filtered, ([groupKey, value]) => {
            var state = filter(parent, (value, key) => Promise.resolve(groupFn(value, key)).then(gk => gk === groupKey));
            return [groupKey, states[groupKey] = state];
        });
        return fromEntries(mapped);
    }
    State.groupBy = groupBy;
    function unique(parent, uniqueFn = String) {
        return map(groupBy(parent, uniqueFn), s => first(s));
    }
    State.unique = unique;
    function union(state, other, uniqueFn) {
        return unique(flatten(fromArray([state, other])), uniqueFn);
    }
    State.union = union;
    function keyBy(parent, keyFn) {
        return fromEntries(AsyncIterator.map(entries(parent), entry => {
            return Promise.resolve(keyFn(entry[1], entry[0])).then(key => [key, entry[1]]);
        }));
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
    function unit(value, key = Key.create()) {
        return {
            get: k => k === key ? Promise.resolve(value) : Promise.reject(new NotFound),
            prev: (k = Key.sentinel) => Promise.resolve(k === Key.sentinel ? key : Key.sentinel),
            next: (k = Key.sentinel) => Promise.resolve(k === Key.sentinel ? key : Key.sentinel)
        };
    }
    State.unit = unit;
    function entries(state, range = Range.all) {
        var current = Key.sentinel, done = false, from = range[0], to = range[1];
        function get(key) {
            if (key === Key.sentinel)
                return (done = true, Promise.resolve(AsyncIterator.done));
            return state.get(key).then(value => (current = key, { done: false, value: [key, value] }));
        }
        function iterate(key) {
            return state.next(key).then(next => {
                if (Position.isPrevPosition(to) && to.prev === next)
                    return get(Key.sentinel);
                return get(next);
            });
        }
        function next() {
            if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev)
                return get(Key.sentinel);
            if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next)
                return get(Key.sentinel);
            if (current === Key.sentinel)
                return Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
            if (Position.isNextPosition(to) && to.next === current)
                return get(Key.sentinel);
            return iterate(current);
        }
        return { next };
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
        var cache = Cache.create(), exhausted = false, currentKey = null, queue = Promise.resolve(null);
        var cachingIterator = {
            next() {
                return __awaiter(this, void 0, Promise, function* () {
                    var result = yield iterator.next();
                    if (result.done) {
                        exhausted = true;
                        cache.prev[Key.sentinel] = Promise.resolve(currentKey);
                        cache.next[currentKey] = Promise.resolve(Key.sentinel);
                        return AsyncIterator.done;
                    }
                    var [key, value] = result.value;
                    cache.prev[key] = Promise.resolve(currentKey);
                    cache.next[currentKey] = Promise.resolve(key);
                    cache.get[key] = Promise.resolve(value);
                    currentKey = key;
                    return { done: false, value: [key, value] };
                });
            }
        };
        function get(key) {
            if (exhausted)
                return Promise.reject(new NotFound);
            return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(Entry.value);
        }
        function prev(key) {
            if (exhausted)
                return Promise.reject(new NotFound);
            return AsyncIterator.some(cachingIterator, entry => entry[0] === key).then(() => key in cache.prev ? cache.prev[key] : Promise.resolve(new NotFound));
        }
        function next(key) {
            if (exhausted)
                return Promise.reject(new NotFound);
            if (key === currentKey)
                return cachingIterator.next().then(result => result.done ? Key.sentinel : result.value[0]);
            return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(() => cachingIterator.next()).then(result => result.done ? Key.sentinel : result.value[0]);
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    State.fromEntries = fromEntries;
    function fromKeys(iterator) {
        return fromEntries(AsyncIterator.map(iterator, key => [key, null]));
    }
    State.fromKeys = fromKeys;
    function fromValues(iterator) {
        return fromEntries(AsyncIterator.map(AsyncIterator.scan(iterator, (prev, value) => [prev[0] + 1, value], [-1, null]), ([n, value]) => [n.toString(), value]));
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
            return __awaiter(this, void 0, Promise, function* () {
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