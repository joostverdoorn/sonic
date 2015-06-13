import Key from './key';
import { ObservableList, IObservableList } from './observable_list';

export interface IMutableList<V> extends IObservableList<V> {
  set(key: Key, value: V): void;
  splice(prev: Key, next: Key, ...values: V[]): void;
}

export class MutableList<V> extends ObservableList<V> implements IMutableList<V> {

  constructor(list?: IMutableList<V>) {
    super(list);

    if(list != null) {
      this.set     = list.set;
      this.splice  = list.splice;
    }
  }

  set = (key: Key, value: V): void => {
    throw new Error("Not implemented");
  }

  splice = (prev: Key, next: Key, ...values: V[]): void => {
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

  static isMutableList(obj: any): boolean {
    return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
  }

  static create<V>(list: IMutableList<V>): MutableList<V> {
    return new MutableList<V>({
      has:     list.has,
      get:     list.get,
      prev:    list.prev,
      next:    list.next,
      observe: list.observe,
      set:     list.set,
      splice:  list.splice
    });
  }

  static addBefore<V>(list: IMutableList<V>, key: Key, value: V): Key {
    list.splice(list.prev(key), key, value);
    return list.prev(key);
  }

  static addAfter<V>(list: IMutableList<V>, key: Key, value: V): Key {
    list.splice(key, list.next(key), value);
    return list.next(key);
  }

  static push<V>(list: IMutableList<V>, value: V): Key {
    return MutableList.addBefore(list, null, value);
  }

  static unshift<V>(list: IMutableList<V>, value: V): Key {
    return MutableList.addAfter(list, null, value);
  }

  static delete<V>(list: IMutableList<V>, key: Key): V {
    if(!list.has(key)) return;
    var value = list.get(key);
    list.splice(list.prev(key), list.next(key));
    return value;
  }

  static deleteBefore<V>(list: IMutableList<V>, key: Key): V {
    return MutableList.delete(list, list.prev(key));
  }

  static deleteAfter<V>(list: IMutableList<V>, key: Key): V {
    return MutableList.delete(list, list.next(key));
  }

  static pop<V>(list: IMutableList<V>): V {
    return MutableList.deleteBefore(list, null);
  }

  static shift<V>(list: IMutableList<V>): V {
    return MutableList.deleteAfter(list, null);
  }

  static remove<V>(list: IMutableList<V>, value: V): boolean {
    var key = MutableList.keyOf(list, value);
    if(key == null) return false;

    delete(list, key);
    return true;
  }
}

export default MutableList
