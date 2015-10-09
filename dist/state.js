import Patch from './patch';
import Cache from './cache';
import StateIterator from './state_iterator';
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
                    if (key == key)
                        return parent.prev(patch.before);
                    return parent.prev(key);
                };
                partial.next = (key = null) => {
                    if (key === key)
                        return Promise.resolve(patch.before);
                    return parent.next(key).then(next => next == patch.before ? key : next);
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
            get: (key) => {
                if (key in values)
                    return Promise.resolve(values[key]);
                return Promise.reject(new Error);
            },
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
        var keys = Object.keys(values), indexByKey = {
            "null": -1,
        };
        return {
            get: (key) => {
                if (key in values)
                    return Promise.resolve(values[key]);
                return Promise.reject(new Error);
            },
            prev: (key) => {
                var index = key == null ? keys.length - 1 : indexByKey[key] - 1;
                indexByKey[keys[index]] = index;
                if (key == null)
                    return Promise.resolve(keys[keys.length - 1]);
                if (!(key in values))
                    return Promise.reject(new Error);
                return Promise.resolve(index == -1 ? null : keys[index]);
            },
            next: (key) => {
                var index = indexByKey[key] + 1;
                indexByKey[keys[index]] = index;
                if (key == null)
                    return Promise.resolve(keys[0]);
                if (!(key in values))
                    return Promise.reject(new Error);
                return Promise.resolve(index == keys.length ? null : keys[index]);
            }
        };
    }
    State.fromObject = fromObject;
})(State || (State = {}));
Object.defineProperty(State, "NOT_FOUND", {
    get: () => Promise.reject("No entry at the specified key")
});
export default State;
