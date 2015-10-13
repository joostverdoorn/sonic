import Key from './key';
import Range from './range';
import Cache from './cache';
import AsyncIterator from './async_iterator';
import { Tree, Path } from './tree';
export var State;
(function (State) {
    State.Empty = {
        get: (key) => Key.NOT_FOUND,
        prev: (key) => key == null ? Promise.resolve(Key.None) : Key.NOT_FOUND,
        next: (key) => key == null ? Promise.resolve(Key.None) : Key.NOT_FOUND
    };
    function first(state) {
        return state.next().then(key => state.get(key));
    }
    State.first = first;
    function last(state) {
        return state.prev().then(key => state.get(key));
    }
    State.last = last;
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
    function slice(parent, range = [null, null]) {
        return fromIterator(toIterator(parent, range));
    }
    State.slice = slice;
    function splice(parent, range, child = State.Empty) {
        if (range[0] === range[1] && range[0] != null)
            return parent;
        const deleted = slice(parent, range), filtered = filter(parent, (value, key) => deleted.get(key).then(() => false, () => true));
        if (child === State.Empty)
            return filtered;
        function get(key) {
            return child.get(key).catch(reason => reason === Key.NOT_FOUND_ERROR ? parent.get(key) : Promise.reject(reason));
        }
        function prev(key = null) {
            if (key == range[0])
                return child.prev();
            if (key == null)
                return filtered.prev();
            return child.prev(key).then(prev => prev == null ? range[1] : prev, reason => reason === Key.NOT_FOUND_ERROR ? filtered.next(key) : Promise.reject(reason));
        }
        function next(key = null) {
            if (key == range[0])
                return child.next();
            if (key == null)
                return filtered.next();
            return child.next(key).then(next => next == null ? range[1] : next, reason => reason === Key.NOT_FOUND_ERROR ? filtered.next(key) : Promise.reject(reason));
        }
        return { get, prev, next };
    }
    State.splice = splice;
    function patch(parent, patch) {
        return splice(parent, patch.range, patch.added);
    }
    State.patch = patch;
    function toIterator(state, range = Range.all) {
        var current = null;
        function get() {
            return state.get(current);
        }
        function next() {
            return state.next(current === null ? range[0] : current).then(next => current = (next == range[1] ? null : next));
        }
        return { get, next };
    }
    State.toIterator = toIterator;
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
        function get(key) {
            return parent.get(key).then(value => Promise.resolve(filterFn(value)).then(res => res ? value : Key.NOT_FOUND));
        }
        function prev(key) {
            return parent.prev(key).then(p => p === null ? null : parent.get(p).then(value => filterFn(value, p)).then(result => result ? p : prev(p)));
        }
        function next(key) {
            return parent.next(key).then(n => n === null ? null : parent.get(n).then(value => filterFn(value, n)).then(result => result ? n : next(n)));
        }
        return extend(parent, { get, prev, next });
    }
    State.filter = filter;
    function zoom(parent, key) {
        const next = (k) => k == null ? Promise.resolve(key) : k === key ? Promise.resolve(null) : Key.NOT_FOUND;
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
        return Cache.apply(Cache.create(), parent);
    }
    State.cache = cache;
    function keyBy(parent, keyFn) {
        var keyMap = cache(State.map(parent, keyFn));
        var reverseKeyMap = cache({
            get: key => AsyncIterator.keyOf(State.toIterator(keyMap), key),
            prev: key => reverseKeyMap.get(key).then(keyMap.prev).then(keyMap.get),
            next: key => reverseKeyMap.get(key).then(keyMap.next).then(keyMap.get)
        });
        return extend(reverseKeyMap, { get: key => reverseKeyMap.get(key).then(parent.get) });
    }
    State.keyBy = keyBy;
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
        var keys = Object.keys(values), indexByKey = keys.reduce((memo, key, index) => {
            memo[key] = index;
            return memo;
        }, Object.create(null));
        return {
            get: (key) => {
                return key in values ? Promise.resolve(values[key]) : Key.NOT_FOUND;
            },
            prev: (key) => {
                if (key == null)
                    return Promise.resolve(keys[keys.length - 1]);
                if (!(key in indexByKey))
                    return Key.NOT_FOUND;
                var index = indexByKey[key];
                if (index === 0)
                    return Promise.resolve(null);
                return Promise.resolve(keys[index - 1]);
            },
            next: (key) => {
                if (key == null)
                    return Promise.resolve(keys[0]);
                if (!(key in indexByKey))
                    return Key.NOT_FOUND;
                var index = indexByKey[key];
                if (index === keys.length - 1)
                    return Promise.resolve(null);
                return Promise.resolve(keys[index + 1]);
            }
        };
    }
    State.fromObject = fromObject;
    function fromIterator(iterator) {
        var cache = Cache.create(), exhausted = false, currentKey = null;
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
            if (key === currentKey)
                return cachingIterator.get();
            return AsyncIterator.find(cachingIterator, (value, k) => k === key);
        }
        function prev(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            return AsyncIterator.some(cachingIterator, (value, k) => k === key).then(() => cache.prev[key]);
        }
        function next(key) {
            if (exhausted)
                return Key.NOT_FOUND;
            if (key === currentKey)
                return cachingIterator.next();
            return AsyncIterator.findKey(cachingIterator, (value, k) => k === key).then(() => cachingIterator.next());
        }
        return Cache.apply(cache, { get, prev, next });
    }
    State.fromIterator = fromIterator;
})(State || (State = {}));
export default State;
