import Key from './key';
import List from './list';
import { Subject } from './observable';
import { Operation } from './patch';
export default class KeyedList extends List {
    constructor(values, keyFn) {
        super();
        this._keyFn = keyFn || Key.create;
        this._subject = new Subject();
        this._pseudoState = Object.keys(values).reduce((state, key, index, keys) => {
            state.get[key] = values[key];
            if (index == 0)
                state.next['null'] = key;
            if (index == keys.length - 1)
                state.prev['null'] = key;
            state.prev[key] = keys[index - 1] != null ? keys[index - 1] : null;
            state.next[key] = keys[index + 1] != null ? keys[index + 1] : null;
            return state;
        }, {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        });
    }
    getState() {
        var pseudoState = this._pseudoState;
        return {
            get: (key) => {
                if (key in pseudoState.get && pseudoState.get[key] != KeyedList.DELETED)
                    return Promise.resolve(pseudoState.get[key]);
                return Promise.reject(new Error);
            },
            prev: (key = null) => {
                if (key in pseudoState.prev)
                    return Promise.resolve(pseudoState.prev[key]);
                return Promise.reject(new Error);
            },
            next: (key = null) => {
                if (key in pseudoState.next)
                    return Promise.resolve(pseudoState.next[key]);
                return Promise.reject(new Error);
            }
        };
    }
    add(value) {
        var key = this._keyFn(value);
        if (key in this._pseudoState.get)
            return this.replace(key, value);
        var pseudoState = Object.create(this._pseudoState);
        pseudoState.get[key] = value;
        var prev = pseudoState.prev['null'], next = null;
        pseudoState.prev[next] = key;
        pseudoState.next[key] = next;
        pseudoState.prev[key] = prev;
        pseudoState.next[prev] = key;
        this._pseudoState = pseudoState;
        this._subject.onInvalidate([{ op: Operation[Operation.add], key, value: Promise.resolve(value) }]);
        return Promise.resolve();
    }
    replace(key, value) {
        if (!(key in this._pseudoState.get))
            return Promise.reject(new Error);
        var pseudoState = Object.create(this._pseudoState);
        pseudoState.get[key] = value;
        this._pseudoState = pseudoState;
        this._subject.onInvalidate([{ op: Operation[Operation.replace], key, value: Promise.resolve(value) }]);
        return Promise.resolve();
    }
    remove(key) {
        if (!(key in this._pseudoState.get))
            return Promise.reject(new Error);
        var pseudoState = Object.create(this._pseudoState);
        pseudoState.get[key] = KeyedList.DELETED;
        var prev = pseudoState.prev[key], next = pseudoState.next[key];
        pseudoState.prev[next] = prev;
        pseudoState.next[prev] = next;
        this._pseudoState = pseudoState;
        this._subject.onInvalidate([{ op: Operation[Operation.remove], key }]);
        return Promise.resolve();
    }
    observe(observer) {
        return this._subject.observe(observer);
    }
}
KeyedList.DELETED = {};
