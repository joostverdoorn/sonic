import Patch from './patch';
import Cache from './cache';
import StateIterator from './state_iterator';
import { Tree, Path } from './tree';
export var State;
(function (State) {
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
    function patch(parent, patch) {
        var partial;
        if (Patch.isSetPatch(patch)) {
            partial = {
                get: key => key === patch.key ? Promise.resolve(patch.value) : parent.get(key)
            };
            if (patch.before !== undefined) {
                partial.prev = (key = null) => {
                    if (key === patch.before)
                        return Promise.resolve(key);
                    if (key === patch.key)
                        return parent.prev(patch.before);
                    return parent.prev(key);
                };
                partial.next = (key = null) => {
                    if (key === patch.key)
                        return Promise.resolve(patch.before);
                    return parent.next(key).then(next => next == patch.before ? patch.key : next);
                };
            }
        }
        if (Patch.isDeletePatch(patch)) {
            partial = {
                get: key => key !== patch.key ? parent.get(key) : State.NOT_FOUND,
                prev: (key = null) => parent.prev(key).then(prev => prev === patch.key ? parent.prev(prev) : prev),
                next: (key = null) => parent.next(key).then(next => next === patch.key ? parent.next(next) : next)
            };
        }
        return extend(parent, partial);
        ;
    }
    State.patch = patch;
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
        return extend(parent, {
            get: key => parent.get(key).then(value => filterFn(value) ? value : State.NOT_FOUND),
            prev: key => StateIterator.findKey(State.reverse(parent), filterFn, [key, null]),
            next: key => StateIterator.findKey(parent, filterFn, [key, null])
        });
    }
    State.filter = filter;
    function zoom(parent, key) {
        const next = (k) => k == null ? Promise.resolve(key) : k === key ? Promise.resolve(null) : State.NOT_FOUND;
        return extend(parent, {
            get: k => k === key ? parent.get(key) : State.NOT_FOUND,
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
            get: key => StateIterator.keyOf(keyMap, key),
            prev: key => reverseKeyMap.get(key).then(keyMap.prev).then(keyMap.get),
            next: key => reverseKeyMap.get(key).then(keyMap.next).then(keyMap.get)
        });
        return extend(reverseKeyMap, { get: key => reverseKeyMap.get(key).then(parent.get) });
    }
    State.keyBy = keyBy;
    function fromArray(values) {
        return {
            get: (key) => key in values ? Promise.resolve(values[key]) : State.NOT_FOUND,
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
                return key in values ? Promise.resolve(values[key]) : State.NOT_FOUND;
            },
            prev: (key) => {
                if (key == null)
                    return Promise.resolve(keys[keys.length - 1]);
                if (!(key in indexByKey))
                    return State.NOT_FOUND;
                var index = indexByKey[key];
                if (index === 0)
                    return Promise.resolve(null);
                return Promise.resolve(keys[index - 1]);
            },
            next: (key) => {
                if (key == null)
                    return Promise.resolve(keys[0]);
                if (!(key in indexByKey))
                    return State.NOT_FOUND;
                var index = indexByKey[key];
                if (index === keys.length - 1)
                    return Promise.resolve(null);
                return Promise.resolve(keys[index + 1]);
            }
        };
    }
    State.fromObject = fromObject;
})(State || (State = {}));
Object.defineProperty(State, "NOT_FOUND", {
    get: () => Promise.reject("No entry at the specified key")
});
export default State;
