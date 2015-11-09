import Key from './key';
import Entry from './entry';
import { Position, Range } from './range';
import Cache from './cache';
import AsyncIterator from './async_iterator';
import { Tree, Path } from './tree';
export var State;
(function (State) {
    State.Empty = {
        get: (key) => Key.NOT_FOUND,
        prev: (key = Key.sentinel) => key == Key.sentinel ? Promise.resolve(Key.sentinel) : Key.NOT_FOUND,
        next: (key = Key.sentinel) => key == Key.sentinel ? Promise.resolve(Key.sentinel) : Key.NOT_FOUND
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
    function first(state) {
        return state.next().then(key => state.get(key));
    }
    State.first = first;
    function last(state) {
        return state.prev().then(key => state.get(key));
    }
    State.last = last;
    function has(state, key) {
        return state.get(key).then(() => true, reason => reason === Key.NOT_FOUND_ERROR ? false : Promise.reject(reason));
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
    function isEmpty(state) {
        return state.next().then(next => next === Key.sentinel);
    }
    State.isEmpty = isEmpty;
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
                return has(deleted, prev).then(res => res ? Key.NOT_FOUND : prev);
            }),
            next: key => parent.next(key).then(next => {
                if (Position.isPrevPosition(from) && next === from.prev)
                    return bridgedChild.next(Key.sentinel);
                return has(deleted, next).then(res => res ? Key.NOT_FOUND : next);
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
        return extend(parent, {
            get: key => parent.get(key).then(value => mapFn(value, key))
        });
    }
    State.map = map;
    function filter(parent, filterFn) {
        var cache = Object.create(null);
        function have(key) {
            return key in cache ? cache[key] : cache[key] = parent.get(key).then(value => filterFn(value, key));
        }
        function get(key) {
            return have(key).then(res => res ? parent.get(key) : Key.NOT_FOUND);
        }
        function prev(key) {
            return parent.prev(key).then(p => p === null ? null : have(p).then(res => res ? p : prev(p)));
        }
        function next(key) {
            return parent.next(key).then(n => n === null ? null : have(n).then(res => res ? n : next(n)));
        }
        return extend(parent, { get, prev, next });
    }
    State.filter = filter;
    function zoom(parent, key) {
        const next = (k) => k == null ? parent.get(key).then(() => key, reason => reason === Key.NOT_FOUND_ERROR ? null : Promise.reject(reason)) : (key === k ? Promise.resolve(null) : Key.NOT_FOUND);
        return extend(parent, {
            get: k => k === key ? parent.get(key) : Key.NOT_FOUND,
            prev: next,
            next: next
        });
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
    function cache(parent) {
        return Cache.apply(parent, Cache.create());
    }
    State.cache = cache;
    function keyBy(parent, keyFn) {
        return fromEntries(AsyncIterator.map(entries(parent), entry => {
            return Promise.resolve(keyFn(entry[1], entry[0])).then(key => [key, entry[1]]);
        }));
    }
    State.keyBy = keyBy;
    function fromArray(values) {
        return fromEntries(AsyncIterator.fromArray(values.map((value, key) => [key, value])));
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromEntries(AsyncIterator.fromObject(values));
    }
    State.fromObject = fromObject;
    function fromEntries(iterator) {
        var cache = Cache.create(), exhausted = false, currentKey = null, queue = Promise.resolve(null);
        var cachingIterator = {
            next: () => iterator.next().then(({ done, value: entry }) => {
                if (done) {
                    exhausted = true;
                    cache.prev[Key.sentinel] = Promise.resolve(currentKey);
                    cache.next[currentKey] = Promise.resolve(Key.sentinel);
                    return AsyncIterator.sentinel;
                }
                cache.prev[entry[0]] = Promise.resolve(currentKey);
                cache.next[currentKey] = Promise.resolve(entry[0]);
                cache.get[entry[0]] = Promise.resolve(entry[1]);
                currentKey = entry[0];
                return { done, value: entry };
            })
        };
        function get(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(Entry.value);
        }
        function prev(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            return AsyncIterator.some(cachingIterator, entry => entry[0] === key).then(() => key in cache.prev ? cache.prev[key] : Key.NOT_FOUND);
        }
        function next(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            if (key === currentKey)
                return cachingIterator.next().then(result => result.done ? Key.sentinel : result.value[0]);
            return AsyncIterator.find(cachingIterator, entry => entry[0] === key).then(() => cachingIterator.next()).then(result => result.done ? Key.sentinel : result.value[0]);
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    State.fromEntries = fromEntries;
    function entries(state, range = Range.all) {
        var current = Key.sentinel, done = false, from = range[0], to = range[1];
        return {
            next: () => {
                function get(key) {
                    if (key === Key.sentinel)
                        return (done = true, Promise.resolve(AsyncIterator.sentinel));
                    return state.get(key).then(value => (current = key, { done: false, value: [key, value] }));
                }
                function iterate(key) {
                    return state.next(key).then(next => {
                        if (Position.isPrevPosition(to) && to.prev === next)
                            return get(Key.sentinel);
                        return get(next);
                    });
                }
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
        };
    }
    State.entries = entries;
})(State || (State = {}));
export default State;

//# sourceMappingURL=state.js.map
