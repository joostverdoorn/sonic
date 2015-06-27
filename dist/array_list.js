import { ListSubject } from './observable_list';
import { MutableList } from './mutable_list';
export default class ArrayList extends MutableList {
    constructor(array = []) {
        super();
        this.get = (key) => {
            if (key != null && 0 <= key && key < this._array.length)
                return Promise.resolve(this._array[key]);
            return Promise.reject(new Error);
        };
        this.prev = (key) => {
            if (key == null)
                return Promise.resolve(this._array.length ? this._array.length - 1 : null);
            if (key == 0)
                return Promise.resolve(null);
            if (0 <= key - 1 && key < this._array.length)
                return Promise.resolve(key - 1);
            Promise.reject(new Error);
        };
        this.next = (key) => {
            if (key == null)
                return Promise.resolve(this._array.length ? 0 : null);
            if (key == this._array.length - 1)
                return Promise.resolve(null);
            if (0 <= key && key + 1 < this._array.length)
                return Promise.resolve(key + 1);
            Promise.reject(new Error);
        };
        this.set = (key, value) => {
            return this.splice(key > 0 ? key - 1 : null, key < this._array.length - 1 ? key + 1 : null, value);
        };
        this.splice = (prev, next, ...values) => {
            if (prev != null && (0 > prev || prev >= this._array.length))
                return Promise.reject(new Error);
            if (prev != null && (0 > next || next >= this._array.length))
                return Promise.reject(new Error);
            this._array.splice(prev == null ? 0 : prev + 1, (next == null ? this._array.length : next) - (prev == null ? 0 : prev + 1), ...values);
            this._subject.onInvalidate(prev, null);
            return Promise.resolve();
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this._subject = new ListSubject();
        this._array = array;
    }
}
