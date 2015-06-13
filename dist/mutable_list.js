import { ObservableList } from './observable_list';
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
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe,
            set: list.set,
            splice: list.splice
        });
    }
    static addBefore(list, key, value) {
        list.splice(list.prev(key), key, value);
        return list.prev(key);
    }
    static addAfter(list, key, value) {
        list.splice(key, list.next(key), value);
        return list.next(key);
    }
    static push(list, value) {
        return MutableList.addBefore(list, null, value);
    }
    static unshift(list, value) {
        return MutableList.addAfter(list, null, value);
    }
    static delete(list, key) {
        if (!list.has(key))
            return;
        var value = list.get(key);
        list.splice(list.prev(key), list.next(key));
        return value;
    }
    static deleteBefore(list, key) {
        return MutableList.delete(list, list.prev(key));
    }
    static deleteAfter(list, key) {
        return MutableList.delete(list, list.next(key));
    }
    static pop(list) {
        return MutableList.deleteBefore(list, null);
    }
    static shift(list) {
        return MutableList.deleteAfter(list, null);
    }
    static remove(list, value) {
        var key = MutableList.keyOf(list, value);
        if (key == null)
            return false;
        delete (list, key);
        return true;
    }
}
export default MutableList;
