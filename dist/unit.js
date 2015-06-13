import Key from './key';
import { Subject } from './observable';
import { MutableList } from './mutable_list';
export default class Unit extends MutableList {
    constructor(value) {
        super();
        this.has = (key) => {
            return this._key == key;
        };
        this.get = (key) => {
            if (this.has(key))
                return this._value;
        };
        this.prev = (key) => {
            if (key == null)
                return this._key;
            return null;
        };
        this.next = (key) => {
            if (key == null)
                return this._key;
            return null;
        };
        this.set = (key, value) => {
            this._key = key;
            this._value = value;
            this._invalidate();
        };
        this.splice = (prev, next, ...values) => {
            if (values.length)
                return this.set(Key.create(), values[0]);
            delete this._key;
            delete this._value;
            this._invalidate();
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this._invalidate = (prev, next) => {
            this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new Subject();
        if (arguments.length)
            this.splice(null, null, value);
    }
}
