import Key from './key';
import { ObservableList, IObservableList } from './observable_list';
import MutableCache from './mutable_cache';

export interface IMutableList<V> extends IObservableList<V> {
  set(key: Key, value: V): Promise<void>;
  splice(prev: Key, next: Key, ...values: V[]): Promise<void>;
}

export class MutableList<V> extends ObservableList<V> implements IMutableList<V> {

  constructor(list?: IMutableList<V>) {
    super(list);

    if(list != null) {
      this.set     = list.set;
      this.splice  = list.splice;
    }
  }

  set = (key: Key, value: V): Promise<void> => {
    throw new Error("Not implemented");
  }

  splice = (prev: Key, next: Key, ...values: V[]): Promise<void> => {
    throw new Error("Not implemented");
  }

  addBefore = (key: Key, value: V) => {
    return MutableList.addBefore(this, key, value);
  }

  addAfter = (key: Key, value: V) => {
    return MutableList.addAfter(this, key, value);
  }

  push = (value: V) => {
    return MutableList.push(this, value);
  }

  unshift = (value: V) => {
    return MutableList.unshift(this, value);
  }

  delete = (key: Key) => {
    return MutableList.delete(this, key);
  }

  deleteBefore = (key: Key) => {
    return MutableList.deleteBefore(this, key);
  }

  deleteAfter = (key: Key) => {
    return MutableList.deleteAfter(this, key);
  }

  pop = () => {
    return MutableList.pop(this);
  }

  shift = () => {
    return MutableList.shift(this);
  }

  remove = (value: V) => {
    return MutableList.remove(this, value);
  }

  cache = () => {
    return MutableList.create(MutableList.cache(this));
  }

  map = <W>(getFn: (value: V, key: Key) => W, setFn?: (value: W, key?: Key) => V): MutableList<W> => {
    return MutableList.create(MutableList.map(this, getFn, setFn));
  }

  static isMutableList(obj: any): boolean {
    return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
  }

  static create<V>(list: IMutableList<V>): MutableList<V> {
    return new MutableList<V>({
      get:     list.get,
      prev:    list.prev,
      next:    list.next,
      observe: list.observe,
      set:     list.set,
      splice:  list.splice
    });
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

  static map<V,W>(list: IMutableList<V>, getFn: (value: V, key: Key) => W, setFn?: (value: W, key?: Key) => V): IMutableList<W> {
    var { get, prev, next, observe } = ObservableList.map(list, getFn);

    function set(key: Key, value: W): Promise<void> {
      return list.set(key, setFn(value, key));
    }

    function splice(prev: Key, next: Key, ...values: W[]): Promise<void> {
      return list.splice(prev, next, ...values.map(setFn));
    }

    return { get, prev, next, observe, set, splice };
  }
}

export default MutableList
