import Key from './key';
import { Subject } from './observable';
import { MutableList } from './mutable_list';
export default class LinkedList extends MutableList {
    constructor(values, keyFn) {
        super();
        this._keyFn = Key.create;
        this.has = (key) => {
            return key in this._byKey;
        };
        this.get = (key) => {
            return this._byKey[key];
        };
        this.prev = (key = null) => {
            var prev = this._prev[key];
            return prev == null ? null : prev;
        };
        this.next = (key = null) => {
            var next = this._next[key];
            return next == null ? null : next;
        };
        this.set = (key, value) => {
            if (!this.has(key))
                return null;
            this._byKey[key] = value;
            this._invalidate(this._prev[key], this._next[key]);
            return key;
        };
        this.splice = (prev = null, next = null, ...values) => {
            var key, value;
            key = prev;
            while ((key = this._next[key]) != null) {
                delete this._next[this._prev[key]];
                delete this._prev[key];
                if (key == next)
                    break;
                delete this._byKey[key];
            }
            key = next;
            while ((key = this._prev[key]) != null) {
                delete this._prev[this._next[key]];
                delete this._next[key];
                if (key == prev)
                    break;
                delete this._byKey[key];
            }
            var _key = prev;
            for (value of values) {
                key = this._keyFn(value);
                this._byKey[key] = value;
                this._prev[key] = _key;
                this._next[_key] = key;
                _key = key;
            }
            this._prev[next] = _key;
            this._next[_key] = next;
            this._invalidate(prev, next);
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this._invalidate = (prev, next) => {
            if (!this.has(prev))
                prev = null;
            if (!this.has(next))
                next = null;
            this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        if (keyFn)
            this._keyFn = keyFn;
        this._subject = new Subject();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice(null, null, ...values);
    }
}
