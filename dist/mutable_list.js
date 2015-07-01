import { ObservableList } from './observable_list';
import MutableCache from './mutable_cache';
export class MutableList extends ObservableList {
    constructor(list) {
        super(list);
        this.set = (key, value) => {
            throw new Error("Not implemented");
        };
        this.splice = (prev, next, ...values) => {
            throw new Error("Not implemented");
        };
        this.addBefore = (key, value) => {
            return MutableList.addBefore(this, key, value);
        };
        this.addAfter = (key, value) => {
            return MutableList.addAfter(this, key, value);
        };
        this.push = (value) => {
            return MutableList.push(this, value);
        };
        this.unshift = (value) => {
            return MutableList.unshift(this, value);
        };
        this.delete = (key) => {
            return MutableList.delete(this, key);
        };
        this.deleteBefore = (key) => {
            return MutableList.deleteBefore(this, key);
        };
        this.deleteAfter = (key) => {
            return MutableList.deleteAfter(this, key);
        };
        this.pop = () => {
            return MutableList.pop(this);
        };
        this.shift = () => {
            return MutableList.shift(this);
        };
        this.remove = (value) => {
            return MutableList.remove(this, value);
        };
        this.cache = () => {
            return MutableList.create(MutableList.cache(this));
        };
        this.map = (getFn, setFn) => {
            return MutableList.create(MutableList.map(this, getFn, setFn));
        };
        if (list != null) {
            this.set = list.set;
            this.splice = list.splice;
        }
    }
    static isMutableList(obj) {
        return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    }
    static create(list) {
        return new MutableList({
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe,
            set: list.set,
            splice: list.splice
        });
    }
    static addBefore(list, key, value) {
        return list.prev(key).then(prev => list.splice(prev, key, value)).then(() => list.prev(key));
    }
    static addAfter(list, key, value) {
        return list.next(key).then(next => list.splice(key, next, value)).then(() => list.next(key));
    }
    static push(list, value) {
        return MutableList.addBefore(list, null, value);
    }
    static unshift(list, value) {
        return MutableList.addAfter(list, null, value);
    }
    static delete(list, key) {
        return list.get(key).then(value => {
            return Promise.all([list.prev(key), list.next(key)]).then(([prev, next]) => list.splice(prev, next)).then(() => value);
        });
    }
    static deleteBefore(list, key) {
        return list.prev(key).then(prev => MutableList.delete(list, prev));
    }
    static deleteAfter(list, key) {
        return list.next(key).then(next => MutableList.delete(list, next));
    }
    static pop(list) {
        return MutableList.deleteBefore(list, null);
    }
    static shift(list) {
        return MutableList.deleteAfter(list, null);
    }
    static remove(list, value) {
        return MutableList.keyOf(list, value).then(key => { MutableList.delete(list, key); });
    }
    static cache(list) {
        return new MutableCache(list);
    }
    static map(list, getFn, setFn) {
        var { get, prev, next, observe } = ObservableList.map(list, getFn);
        function set(key, value) {
            return list.set(key, setFn(value, key));
        }
        function splice(prev, next, ...values) {
            return list.splice(prev, next, ...values.map(setFn));
        }
        return { get, prev, next, observe, set, splice };
    }
}
export default MutableList;
