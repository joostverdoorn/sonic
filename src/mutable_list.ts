import { IList, utilities as listUtilities } from 'list';

export interface IMutableList<V,I> extends IList<V,I> {
  set(id: I, value: V): boolean;
  splice(prev: I, next: I, ...values: V[]): boolean;
}

export module utilities {

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
    var id = listUtilities.idOf(list, value);
    return delete(list, id);
  }

  export function flatMap<V,I,W,J>(
    list: IMutableList<V,I>,
    getFn: (V) => IList<W,J>,
    setFn: (list: IList<W,J>) => V
  ): IMutableList<W,J> {
    return null;
  }

  export function map<V,I,W>(
    list: IMutableList<V,I>,
    getFn: (V,I?) => W,
    setFn: (W,I?) => V
  ): IMutableList<W,I> {
    return null;
  }
}
