import { Subject } from './observable';
import { MutableList } from './mutable_list';
export default class ArrayList extends MutableList {
    constructor(array = []) {
        super();
        this.has = (key) => {
            return key != null && -1 < key && key < this._array.length;
        };
        this.get = (key) => {
            if (this.has(key))
                return this._array[key];
            return;
        };
        this.prev = (key) => {
            if (key == null && this._array.length)
                return this._array.length - 1;
            if (this._array.length > 0 && key != null && this.has(key) && this.has(key - 1))
                return key - 1;
            return null;
        };
        this.next = (key) => {
            if (key == null && this._array.length)
                return 0;
            if (this._array.length > 0 && key != null && this.has(key) && this.has(key + 1))
                return key + 1;
            return null;
        };
        this.set = (key, value) => {
            if (!this.has(key))
                return null;
            this._array[key] = value;
            return key;
        };
        this.splice = (prev, next, ...values) => {
            if (prev == null)
                prev = -1;
            else if (!this.has(prev))
                return;
            if (next == null)
                next = this._array.length;
            else if (!this.has(next))
                return;
            this._array.splice(prev + 1, next - (prev + 1), ...values);
            this._invalidate(prev, null);
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
        this._subject = new Subject();
        this._array = array;
    }
}
