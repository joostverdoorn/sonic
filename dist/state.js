import StateIterator from './state_iterator';
import { Patch } from './patch';
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
        var state = parent;
        if (Patch.isSetPatch(patch))
            state = extend(state, set(state, patch.key, patch.value, patch.before));
        if (Patch.isDeletePatch(patch))
            state = extend(state, del(state, patch.key));
        return state;
    }
    State.patch = patch;
    function patches(parent, patches) {
        return patches.reduce((state, ptch) => patch(state, ptch), parent);
    }
    State.patches = patches;
    function set(parent, key, value, before) {
        var state = {
            get: k => k === key ? Promise.resolve(value) : parent.get(k)
        };
        if (before !== undefined) {
            state.prev = (k = null) => {
                if (k === before)
                    return Promise.resolve(key);
                else if (k == key)
                    return parent.prev(before);
                return parent.prev(k);
            };
            state.next = (k = null) => {
                if (k === key)
                    return Promise.resolve(before);
                return parent.next(k).then(n => n == before ? key : n);
            };
        }
        return extend(parent, state);
    }
    State.set = set;
    function del(parent, key) {
        return extend(parent, {
            get: k => k !== key ? parent.get(k) : State.NOT_FOUND,
            prev: (k = null) => parent.prev(k).then(p => p === key ? parent.prev(p) : p),
            next: (k = null) => parent.next(k).then(n => n === key ? parent.next(n) : n)
        });
    }
    State.del = del;
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
    const DELETED = Promise.resolve({});
    function cache(parent) {
        var _get = Object.create(null), _prev = Object.create(null), _next = Object.create(null);
        return {
            get: (key) => {
                if (_get[key] == DELETED)
                    return Promise.reject(new Error);
                return _get[key] === undefined ? (_get[key] = parent.get(key)) : _get[key];
            },
            prev: (key) => {
                return _prev[key] === undefined ? (parent.prev(key).then((res) => (_next[res] = key, _prev[key] = res))) : Promise.resolve(_prev[key]);
            },
            next: (key) => {
                return _next[key] === undefined ? (parent.next(key).then((res) => (_prev[res] = key, _next[key] = res))) : Promise.resolve(_next[key]);
            }
        };
    }
    State.cache = cache;
    function keyBy(parent, keyFn) {
        var state;
        return state = cache({
            get: k => StateIterator.find(parent, (value, key) => Promise.resolve(keyFn(value, key)).then(res => res == k)),
            prev: k => Promise.resolve(k == null ? parent.prev() : state.get(k).then(value => StateIterator.keyOf(parent, value)).then(parent.prev))
                .then(p => p == null ? null : parent.get(p).then(value => keyFn(value, p))),
            next: k => Promise.resolve(k == null ? parent.next() : state.get(k).then(value => StateIterator.keyOf(parent, value)).then(parent.next))
                .then(n => n == null ? null : parent.get(n).then(value => keyFn(value, n)))
        });
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
                return Promise.resolve(index == -1 ? null : index);
            },
            next: (key) => {
                var index = key == null ? 0 : key + 1;
                return Promise.resolve(index == values.length ? null : index);
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
