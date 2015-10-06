import StateIterator from './state_iterator';
export var State;
(function (State) {
    function add(old, key, value) {
        var state = Object.create(old);
        state.prev = (k) => {
            if (k == null)
                return Promise.resolve(key);
            else if (k == key)
                return old.prev(null);
            return old.prev(k);
        };
        state.next = (k) => {
            if (k == key)
                return Promise.resolve(null);
            return old.next(k).then((n) => n == null ? key : n);
        };
        return State.replace(state, key, value);
    }
    State.add = add;
    function replace(old, key, value) {
        var state = Object.create(old);
        state.get = (k) => {
            if (k == key)
                return Promise.resolve(value);
            return old.get(k);
        };
        return state;
    }
    State.replace = replace;
    function remove(old, key) {
        var state = Object.create(old);
        state.get = (k) => {
            if (k == key)
                return Promise.reject(new Error);
            return old.get(k);
        };
        state.prev = (k) => {
            return old.prev(k).then((p) => p == key ? old.prev(p) : p);
        };
        state.next = (k) => {
            return old.next(k).then((n) => n == key ? old.next(n) : n);
        };
        return state;
    }
    State.remove = remove;
    function reverse(old) {
        var state = Object.create(old);
        state.prev = (key) => old.next(key);
        state.next = (key) => old.prev(key);
        return state;
    }
    State.reverse = reverse;
    function map(old, mapFn) {
        var state = Object.create(old);
        state.get = (key) => {
            return old.get(key).then(value => mapFn(value, key));
        };
        return state;
    }
    State.map = map;
    function filter(old, filterFn) {
        var state = Object.create(old);
        state.get = (key) => {
            return old.get(key).then(value => {
                if (filterFn(value))
                    return value;
                throw new Error();
            });
        };
        state.prev = (key) => {
            return StateIterator.findKey(State.reverse(old), filterFn, [key, null]);
        };
        state.next = (key) => {
            return StateIterator.findKey(old, filterFn, [key, null]);
        };
        return state;
    }
    State.filter = filter;
})(State || (State = {}));
export default State;
