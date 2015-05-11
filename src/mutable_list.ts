import Id from './id';
import { ObservableList, IObservableList } from './observable_list';

export interface IMutableList<V> extends IObservableList<V> {
  set(id: Id, value: V): boolean;
  splice(prev: Id, next: Id, ...values: V[]): boolean;
}

export class MutableList<V> extends ObservableList<V> implements IMutableList<V> {
  set: (id: Id, value: V) => boolean;
  splice: (prev: Id, next: Id, ...values: V[]) => boolean;

  static isMutableList(obj: Object): boolean {
    return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
  }

  constructor() {
    super();
  }

  static create<V>(list: IMutableList<V>): MutableList<V> {
    var obj = {
      has: list.has,
      get: list.get,
      prev: list.prev,
      next: list.next,
      observe: list.observe,
      set: list.set,
      splice: list.splice
    }

    return <MutableList<V>> MutableList.call(list);
  }

  push = (value: V) => MutableList.push(this, value);
  static push<V>(list: IMutableList<V>, value: V): Id {
    list.splice(list.prev(), null, value);
    return list.prev();
  }

  unshift = (value: V) => MutableList.unshift(this, value);
  static unshift<V>(list: IMutableList<V>, value: V): Id {
    list.splice(list.next(), null, value);
    return list.next();
  }

  pop = () => MutableList.pop(this);
  static pop<V>(list: IMutableList<V>): V {
    var value = list.get(list.prev());
    list.splice(list.prev(list.prev()), null);
    return value;
  }

  shift = () => MutableList.shift(this);
  static shift<V>(list: IMutableList<V>): V {
    var value = list.get(list.next());
    list.splice(list.next(list.next()), null);
    return value;
  }

  delete = (id: Id) => MutableList.delete(this, id);
  static delete<V>(list: IMutableList<V>, id: Id): boolean {
    if(!list.has(id)) return false;
    return list.splice(list.prev(id), list.next(id));
  }

  remove = (value: V) => MutableList.remove(this, value);
  static remove<V>(list: IMutableList<V>, value: V): boolean {
    var id = MutableList.idOf(list, value);
    return delete(list, id);
  }

  // static cache<V>(list: IMutableList<V>): MutableList<V> {
  //   var {has, get, prev, next, observe } = list;
  //
  //   function set() {
  //
  //   }
  //
  //   function splice() {
  //
  //   }
  //
  //   return MutableList.create({has, get, prev, next, observe, set, splice});
  // }
}

Object.keys(MutableList).forEach(function(key) {
  MutableList.prototype[key] = function(...args: any[]) { MutableList[key](this, ...args)};
});

export default MutableList;
