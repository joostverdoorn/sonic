import Id from './id';
import { ObservableList, IObservableList } from './observable_list';

export interface IMutableList<V> extends IObservableList<V> {
  set(id: Id, value: V): boolean;
  splice(prev: Id, next: Id, ...values: V[]): boolean;
}

export class MutableList<V> extends ObservableList<V> implements IMutableList<V> {

  constructor(list?: IMutableList<V>) {
    super(list);

    if(list != null) {
      this.has     = list.has
      this.get     = list.get
      this.prev    = list.prev
      this.next    = list.next
      this.observe = list.observe
      this.set     = list.set
      this.splice  = list.splice
    }
  }

  set(id: Id, value: V): boolean {
    throw new Error("Not implemented");
  }

  splice(prev: Id, next: Id, ...values: V[]): boolean {
    throw new Error("Not implemented");
  }

  push(value: V) {
    return MutableList.push(this, value);
  }

  unshift(value: V) {
    return MutableList.unshift(this, value);
  }

  pop() {
    return MutableList.pop(this);
  }

  shift() {
    return MutableList.shift(this);
  }

  delete(id: Id) {
    return MutableList.delete(this, id);
  }

  remove(value: V) {
    return MutableList.remove(this, value);
  }

  static isMutableList(obj: Object): boolean {
    return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
  }

  static create<V>(list: IMutableList<V>): MutableList<V> {
    return new MutableList<V>({
      has:     list.has.bind(list),
      get:     list.get.bind(list),
      prev:    list.prev.bind(list),
      next:    list.next.bind(list),
      observe: list.observe.bind(list),
      set:     list.set.bind(list),
      splice:  list.splice.bind(list)
    });
  }

  static push<V>(list: IMutableList<V>, value: V): Id {
    list.splice(list.prev(), null, value);
    return list.prev();
  }


  static unshift<V>(list: IMutableList<V>, value: V): Id {
    list.splice(list.next(), null, value);
    return list.next();
  }


  static pop<V>(list: IMutableList<V>): V {
    var value = list.get(list.prev());
    list.splice(list.prev(list.prev()), null);
    return value;
  }

  static shift<V>(list: IMutableList<V>): V {
    var value = list.get(list.next());
    list.splice(list.next(list.next()), null);
    return value;
  }

  static delete<V>(list: IMutableList<V>, id: Id): boolean {
    if(!list.has(id)) return false;
    return list.splice(list.prev(id), list.next(id));
  }


  static remove<V>(list: IMutableList<V>, value: V): boolean {
    var id = MutableList.idOf(list, value);
    return delete(list, id);
  }
}

export default MutableList;
