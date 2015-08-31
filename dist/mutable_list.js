import { ObservableList } from './observable_list';
import MutableCache from './mutable_cache';
export class MutableList extends ObservableList {
    static create(list) {
        return new class class_1 extends MutableList {
            get(key) { return list.get(key); }
            prev(key) { return list.prev(key); }
            next(key) { return list.next(key); }
            observe(observer) { return list.observe(observer); }
            set(key, value) { return list.set(key, value); }
            splice(prev, next, ...values) { return list.splice(prev, next, ...values); }
        }
        ;
    }
    addBefore(key, value) {
        return MutableList.addBefore(this, key, value);
    }
    addAfter(key, value) {
        return MutableList.addAfter(this, key, value);
    }
    push(value) {
        return MutableList.push(this, value);
    }
    unshift(value) {
        return MutableList.unshift(this, value);
    }
    delete(key) {
        return MutableList.delete(this, key);
    }
    deleteBefore(key) {
        return MutableList.deleteBefore(this, key);
    }
    deleteAfter(key) {
        return MutableList.deleteAfter(this, key);
    }
    pop() {
        return MutableList.pop(this);
    }
    shift() {
        return MutableList.shift(this);
    }
    remove(value) {
        return MutableList.remove(this, value);
    }
    cache() {
        return MutableList.create(MutableList.cache(this));
    }
    // map<W>(getFn: (value: V, key: Key) => W, setFn?: (value: W, key?: Key) => V): MutableList<W> {
    //   return MutableList.create(MutableList.map(this, getFn, setFn));
    // }
    static isMutableList(obj) {
        return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
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
}
export default MutableList;
