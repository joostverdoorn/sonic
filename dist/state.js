import StateIterator from './state_iterator';
export var State;
(function (State) {
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
        state.prev = old.next;
        state.next = old.prev;
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
