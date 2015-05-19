import Id from './id';
import { ObservableList, IObservableList } from './observable_list';


export interface IMutableList<V> extends IObservableList<V> {
  set(id: Id, value: V): Id;
  splice(prev: Id, next: Id, ...values: V[]): void;
}

export class MutableList<V> extends ObservableList<V> implements IMutableList<V> {

  constructor(list?: IMutableList<V>) {
    super(list);

    if(list != null) {
      this.has     = list.has;
      this.get     = list.get;
      this.prev    = list.prev;
      this.next    = list.next;
      this.observe = list.observe;
      this.set     = list.set;
      this.splice  = list.splice;
    }
  }

  set = (id: Id, value: V): Id => {
    throw new Error("Not implemented");
  }

  splice = (prev: Id, next: Id, ...values: V[]): void => {
    throw new Error("Not implemented");
  }

  addBefore = (id: Id, value: V) => {
    return MutableList.addBefore(this, id, value);
  }

  addAfter = (id: Id, value: V) => {
    return MutableList.addAfter(this, id, value);
  }

  push = (value: V) => {
    return MutableList.push(this, value);
  }

  unshift = (value: V) => {
    return MutableList.unshift(this, value);
  }

  delete = (id: Id) => {
    return MutableList.delete(this, id);
  }

  deleteBefore = (id: Id) => {
    return MutableList.deleteBefore(this, id);
  }

  deleteAfter = (id: Id) => {
    return MutableList.deleteAfter(this, id);
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

  static addBefore<V>(list: IMutableList<V>, id: Id, value: V): Id {
    list.splice(list.prev(id), id, value);
    return list.prev(id);
  }

  static addAfter<V>(list: IMutableList<V>, id: Id, value: V): Id {
    list.splice(id, list.next(id), value);
    return list.next(id);
  }

  static push<V>(list: IMutableList<V>, value: V): Id {
    return MutableList.addAfter(list, null, value);
  }

  static unshift<V>(list: IMutableList<V>, value: V): Id {
    return MutableList.addBefore(list, null, value);
  }

  static delete<V>(list: IMutableList<V>, id: Id): V {
    if(!list.has(id)) return;
    var value = list.get(id);
    list.splice(list.prev(id), list.next(id));
    return value;
  }

  static deleteBefore<V>(list: IMutableList<V>, id: Id): V {
    return MutableList.delete(list, list.prev(id));
  }

  static deleteAfter<V>(list: IMutableList<V>, id: Id): V {
    return MutableList.delete(list, list.next(id));
  }

  static pop<V>(list: IMutableList<V>): V {
    return MutableList.deleteBefore(list, null);
  }

  static shift<V>(list: IMutableList<V>): V {
    return MutableList.deleteAfter(list, null);
  }

  static remove<V>(list: IMutableList<V>, value: V): boolean {
    var id = MutableList.idOf(list, value);
    if(id == null) return false;

    delete(list, id);
    return true;
  }
}

export default MutableList;
