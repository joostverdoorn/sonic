import { List, IList } from './list';

export interface IMutableList<V,I> extends IList<V,I> {
  set(id: I, value: V): boolean;
  splice(prev: I, next: I, ...values: V[]): boolean;
}

export class MutableList<V, I> extends List<V, I> implements IMutableList<V, I> {
  protected _source: IMutableList<V, I>;

  constructor(source?: IMutableList<V, I>) {
    super(source);
  }

  set(id, value) { return this._source.set(id, value); }
  splice(prev, next, ...values) { return this._source.splice(prev, next, ...values); }
}

export module MutableList {
  export function isMutableList(obj: Object): boolean {
    return List.isList(obj) && !!obj['set'] && !!obj['splice'];
  }

  export function create<V,I>(list: IMutableList<V,I>): MutableList<V,I> {
    return new MutableList(list);
  }

  export function push<V,I>(list: IMutableList<V,I>, value: V): I {
    list.splice(list.prev(), null, value);
    return list.prev();
  }

  export function unshift<V,I>(list: IMutableList<V,I>, value: V): I {
    list.splice(list.next(), null, value);
    return list.next();
  }

  export function pop<V,I>(list: IMutableList<V,I>): V {
    var value = list.get(list.prev());
    list.splice(list.prev(list.prev()), null);
    return value;
  }

  export function shift<V,I>(list: IMutableList<V,I>): V {
    var value = list.get(list.next());
    list.splice(list.next(list.next()), null);
    return value;
  }

  export function del<V,I>(list: IMutableList<V,I>, id: I): boolean {
    if(!list.has(id)) return false;
    return list.splice(list.prev(id), list.next(id));
  }

  export function remove<V,I>(list: IMutableList<V,I>, value: V): boolean {
    var id = List.idOf(list, value);
    return delete(list, id);
  }
}

Object.keys(MutableList).forEach(function(key) {
  MutableList.prototype[key] = function(...args) { MutableList[key](this, ...args)};
});

export default MutableList;
