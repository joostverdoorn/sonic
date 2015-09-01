import   Key             from './key';
import { ObservableList,
         IObservableList,
         IListObserver } from './observable_list';
import { ISubscription } from './observable';
import   MutableCache    from './mutable_cache';

export interface IMutableList<V> extends IObservableList<V> {
  set(key: Key, value: V): Promise<void>;
  splice(prev: Key, next: Key, ...values: V[]): Promise<void>;
}

export abstract class MutableList<V> extends ObservableList<V> implements IMutableList<V> {

  abstract set(key: Key, value: V): Promise<void>;
  abstract splice(prev: Key, next: Key, ...values: V[]): Promise<void>;

  static create<V>(list: IMutableList<V>): MutableList<V> {
    return new class extends MutableList<V> {
      get(key: Key): Promise<V> { return list.get(key); }
      prev(key?: Key): Promise<Key> { return list.prev(key); }
      next(key?: Key): Promise<Key> { return list.next(key); }
      observe(observer: IListObserver): ISubscription { return list.observe(observer); }
      set(key: Key, value: V): Promise<void> { return list.set(key, value); }
      splice(prev: Key, next: Key, ...values: V[]): Promise<void> { return list.splice(prev, next, ...values); }
    }
  }

  addBefore(key: Key, value: V) {
    return MutableList.addBefore(this, key, value);
  }

  addAfter(key: Key, value: V) {
    return MutableList.addAfter(this, key, value);
  }

  push(value: V) {
    return MutableList.push(this, value);
  }

  unshift(value: V) {
    return MutableList.unshift(this, value);
  }

  delete(key: Key) {
    return MutableList.delete(this, key);
  }

  deleteBefore(key: Key) {
    return MutableList.deleteBefore(this, key);
  }

  deleteAfter(key: Key) {
    return MutableList.deleteAfter(this, key);
  }

  pop() {
    return MutableList.pop(this);
  }

  shift() {
    return MutableList.shift(this);
  }

  remove(value: V) {
    return MutableList.remove(this, value);
  }

  cache() {
    return MutableList.create(MutableList.cache(this));
  }

  map<W>(getFn: (value: V, key: Key) => W, setFn?: (value: W, key?: Key) => V): MutableList<W> {
    return MutableList.create(MutableList.map(this, getFn, setFn));
  }

  static isMutableList(obj: any): boolean {
    return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
  }

  static addBefore<V>(list: IMutableList<V>, key: Key, value: V): Promise<Key> {
    return list.prev(key).then(prev => list.splice(prev, key, value)).then(() => list.prev(key));
  }

  static addAfter<V>(list: IMutableList<V>, key: Key, value: V): Promise<Key> {
    return list.next(key).then(next => list.splice(key, next, value)).then(() => list.next(key));
  }

  static push<V>(list: IMutableList<V>, value: V): Promise<Key> {
    return MutableList.addBefore(list, null, value);
  }

  static unshift<V>(list: IMutableList<V>, value: V): Promise<Key> {
    return MutableList.addAfter(list, null, value);
  }

  static delete<V>(list: IMutableList<V>, key: Key): Promise<V> {
    return list.get(key).then(value => {
      return Promise.all([list.prev(key), list.next(key)]).then(([prev, next]) => list.splice(prev, next)).then(() => value);
    });
  }

  static deleteBefore<V>(list: IMutableList<V>, key: Key): Promise<V> {
    return list.prev(key).then(prev => MutableList.delete(list, prev));
  }

  static deleteAfter<V>(list: IMutableList<V>, key: Key): Promise<V> {
    return list.next(key).then(next => MutableList.delete(list, next));
  }

  static pop<V>(list: IMutableList<V>): Promise<V> {
    return MutableList.deleteBefore(list, null);
  }

  static shift<V>(list: IMutableList<V>): Promise<V> {
    return MutableList.deleteAfter(list, null);
  }

  static remove<V>(list: IMutableList<V>, value: V): Promise<void> {
    return MutableList.keyOf(list, value).then(key => { MutableList.delete(list, key) });
  }

  static cache<V>(list: IMutableList<V>): IMutableList<V> {
    return new MutableCache<V>(list);
  }

  static map<V,W>(list: IMutableList<V>, getFn: (value: V, key?: Key) => W | Promise<W>, setFn?: (value: W, key?: Key) => V | Promise<V>): IMutableList<W> {
    var { get, prev, next, observe } = ObservableList.map(list, getFn);

    function set(key: Key, value: W): Promise<void> {
      return Promise.resolve(setFn(value, key)).then(value => list.set(key, value))
    }

    function splice(prev: Key, next: Key, ...values: W[]): Promise<void> {
      return Promise.all(values.map((value: W) => setFn(value))).then(values => list.splice(prev, next, ...values));
    }

    return { get, prev, next, observe, set, splice };
  }
}

export default MutableList
