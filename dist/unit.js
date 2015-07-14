import Key from './key';
import { ListSubject } from './observable_list';
import { MutableList } from './mutable_list';
export default class Unit extends MutableList {
    constructor(value) {
        super();
        this.get = (key) => {
            if (key === this._key)
                return Promise.resolve(this._value);
            Promise.reject(new Error);
        };
        this.prev = (key) => {
            if (key == null)
                return Promise.resolve(this._key);
            if (key === this._key)
                return Promise.resolve(null);
            return Promise.reject(new Error);
        };
        this.next = (key) => {
            if (key == null)
                return Promise.resolve(this._key);
            if (key === this._key)
                return Promise.resolve(null);
            return Promise.reject(new Error);
        };
        this.set = (key, value) => {
            this._key = key;
            this._value = value;
            this._subject.onInvalidate([null, null]);
            return Promise.resolve();
        };
        this.splice = (prev, next, ...values) => {
            if (values.length)
                return this.set(Key.create(), values[0]);
            delete this._key;
            delete this._value;
            this._subject.onInvalidate([null, null]);
            return Promise.resolve();
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this._subject = new ListSubject();
        if (arguments.length)
            this.splice(null, null, value);
    }
}
