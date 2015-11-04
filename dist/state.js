import Key from './key';
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
        var iterator = toIterator(state), otherIterator = toIterator(other);
        return AsyncIterator.every(iterator, (value, key) => {
            return otherIterator.next().then(k => k !== key ? false : otherIterator.get().then(v => v === value));
        }).then(res => res ? otherIterator.next().then(k => k === Key.sentinel) : false);
    }
    State.is = is;
    function contains(state, value) {
        return AsyncIterator.some(toIterator(state), (v, k) => v === value);
    }
    State.contains = contains;
    function isEmpty(state) {
        return state.next().then(next => next === Key.sentinel);
    }
    State.isEmpty = isEmpty;
    function slice(parent, range = Range.all) {
        return fromIterator(toIterator(parent, range));
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
            return child.get(key).catch(reason => reason === Key.NOT_FOUND_ERROR ? bridgedParent.get(key) : Promise.reject(reason));
        }
        function prev(key = Key.sentinel) {
            if (Position.isPrevPosition(to) && key === to.prev)
                return bridgedParent.next(Key.sentinel);
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
        var keyMap = cache(State.map(parent, keyFn));
        var reverseKeyMap = cache({
            get: key => AsyncIterator.keyOf(State.toIterator(keyMap), key),
            prev: (key = Key.sentinel) => {
                return Promise.resolve(key === Key.sentinel ? Key.sentinel : reverseKeyMap.get(key))
                    .then(keyMap.prev).then(prev => prev === Key.sentinel ? prev : keyMap.get(prev));
            },
            next: (key = Key.sentinel) => {
                return Promise.resolve(key === Key.sentinel ? Key.sentinel : reverseKeyMap.get(key))
                    .then(keyMap.next).then(next => next === Key.sentinel ? next : keyMap.get(next));
            }
        });
        return extend(reverseKeyMap, { get: key => reverseKeyMap.get(key).then(key => key === Key.sentinel ? Key.NOT_FOUND : parent.get(key)) });
    }
    State.keyBy = keyBy;
    function keys(parent) {
        return map(parent, (value, key) => key);
    }
    State.keys = keys;
    function fromArray(values) {
        return {
            get: (key) => key in values ? Promise.resolve(values[key]) : Key.NOT_FOUND,
            prev: (key) => {
                var index = key == null ? values.length - 1 : key - 1;
                return Promise.resolve(index === -1 ? null : index);
            },
            next: (key) => {
                var index = key == null ? 0 : key + 1;
                return Promise.resolve(index === values.length ? null : index);
            }
        };
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromIterator(AsyncIterator.fromObject(values));
    }
    State.fromObject = fromObject;
    function fromIterator(iterator) {
        var cache = Cache.create(), exhausted = false, currentKey = null, queue = Promise.resolve(null);
        var cachingIterator = AsyncIterator.extend(iterator, {
            get: () => cache.get[currentKey] = iterator.get(),
            next: () => cache.next[currentKey] = iterator.next().then(key => {
                cache.prev[key] = Promise.resolve(currentKey);
                exhausted = key === null;
                return currentKey = key;
            }),
        });
        function get(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            return queue = queue.then(() => {
                if (key === currentKey)
                    return cachingIterator.get();
                return AsyncIterator.find(cachingIterator, (value, k) => k === key);
            });
        }
        function prev(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            return queue = queue.then(() => {
                return AsyncIterator.some(cachingIterator, (value, k) => k === key).then(() => cache.prev[key]);
            });
        }
        function next(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            return queue = queue.then(() => {
                if (key === currentKey)
                    return cachingIterator.next();
                return AsyncIterator.findKey(cachingIterator, (value, k) => k === key).then(() => cachingIterator.next());
            });
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    State.fromIterator = fromIterator;
    function toIterator(state, range = Range.all) {
        var current = Key.sentinel, queue = Promise.resolve(null);
        function get() {
            return queue = queue.then(() => state.get(current));
        }
        function next() {
            return queue = queue.then(() => {
                var from = range[0], to = range[1];
                function iterate(key) {
                    return state.next(key).then(next => Position.isPrevPosition(to) && to.prev === next ? current = Key.sentinel : current = next);
                }
                if (Position.isPrevPosition(from) && Position.isPrevPosition(to) && from.prev === to.prev)
                    return Promise.resolve(Key.sentinel);
                if (Position.isNextPosition(from) && Position.isNextPosition(to) && from.next === to.next)
                    return Promise.resolve(Key.sentinel);
                if (current === Key.sentinel)
                    return Position.isPrevPosition(from) ? Promise.resolve(current = from.prev) : iterate(from.next);
                if (Position.isNextPosition(to) && to.next === current)
                    return Promise.resolve(current = Key.sentinel);
                return iterate(current);
            });
        }
        return { get, next };
    }
    State.toIterator = toIterator;
})(State || (State = {}));
export default State;

//# sourceMappingURL=state.js.map
