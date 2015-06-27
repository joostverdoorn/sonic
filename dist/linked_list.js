import Key from './key';
import { ListSubject } from './observable_list';
import { MutableList } from './mutable_list';
export default class LinkedList extends MutableList {
    constructor(values, keyFn) {
        super();
        this._keyFn = Key.create;
        this.get = (key) => {
            if (!(key in this._byKey))
                return Promise.reject(new Error);
            return Promise.resolve(this._byKey[key]);
        };
        this.prev = (key = null) => {
            if (!(key in this._prev))
                return Promise.reject(new Error);
            return Promise.resolve(this._prev[key]);
        };
        this.next = (key = null) => {
            if (!(key in this._next))
                return Promise.reject(new Error);
            return Promise.resolve(this._next[key]);
        };
        this.set = (key, value) => {
            if (!(key in this._byKey))
                return Promise.reject(new Error);
            this._byKey[key] = value;
            this._subject.onInvalidate(this._prev[key], this._next[key]);
            return Promise.resolve();
        };
        this.splice = (prev = null, next = null, ...values) => {
            var key = prev, value;
            while ((key = this._next[key]) != null) {
                delete this._next[this._prev[key]];
                delete this._prev[key];
                if (key == next)
                    break;
                delete this._byKey[key];
            }
            var _key = next;
            for (value of values) {
                key = this._keyFn(value);
                if (key in this._byKey)
                    this.splice(this._prev[key], this._next[key]);
                this._byKey[key] = value;
                this._prev[key] = _key;
                this._next[_key] = key;
                _key = key;
            }
            this._prev[next] = _key;
            this._next[_key] = next;
            this._subject.onInvalidate(prev, next);
            return Promise.resolve();
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        if (keyFn)
            this._keyFn = keyFn;
        this._subject = new ListSubject();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice(null, null, ...values);
    }
}
