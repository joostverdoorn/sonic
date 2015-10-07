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
        var state = parent;
        if (patch.set)
            state = extend(state, set(state, patch.set.key, patch.set.value, patch.set.before));
        if (patch.delete)
            state = extend(state, del(state, patch.delete.key));
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
})(State || (State = {}));
Object.defineProperty(State, "NOT_FOUND", {
    get: () => Promise.reject("No entry at the specified key")
});
export default State;
