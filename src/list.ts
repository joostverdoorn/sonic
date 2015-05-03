export interface IList<V,I> {
  has(id: I): boolean;
  get(id: I): V;
  prev(id?: I): I;
  next(id?: I): I;
}

export function isList(obj: Object): boolean {
  return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
}

export module utilities {

  export function forEach<V,I>(list: IList<V,I>, fn: (V,I?) => void): void {
    var id;
    while((id = list.next(id)) != null) fn(list.get(id), id);
  }

  export function reduce<V,I,T>(list: IList<V,I>, fn: (T,V,I?) => T, memo?: T): T {
    var id;
    while((id = list.next(id)) != null) memo = fn(memo, list.get(id), id);
    return memo;
  }

  export function findId<V,I>(list: IList<V,I>, fn: (V,I?) => boolean): I {
    var id;
    while((id = list.next(id)) != null) if(fn(list.get(id), id)) return id;
  }

  export function find<V,I>(list: IList<V,I>, fn: (V, I?) => boolean): V {
    return list.get(findId(list, fn));
  }

  export function idOf<V,I>(list: IList<V,I>, value: V): I {
    var id;
    return findId(list, v => v === value);
  }

  export function indexOf<V,I>(list: IList<V,I>, value: V): number {
    var id, i = 0;
    while((id = list.next(id)) != null) {
      if(list.get(id) === value) return i;
      i++;
    }
  }

  export function idAt<V,I>(list: IList<V,I>, index: number): I {
    var id, i = 0;
    while((id = list.next(id)) != null) if(i++ == index) return id;
    return null;
  }

  export function at<V,I>(list: IList<V,I>, index: number): V {
    return list.get(idAt(list, index));
  }

  export function every<V,I>(list: IList<V,I>, predicate: (V,I?) => boolean): boolean {
    var id;
    while((id = list.next(id)) != null) if(!predicate(list.get(id), id)) return false;
    return true;
  }

  export function some<V,I>(list: IList<V,I>, predicate: (V,I?) => boolean): boolean {
    var id;
    while((id = list.next(id)) != null) if(predicate(list.get(id), id)) return true;
    return false;
  }

  export function contains<V,I>(list: IList<V,I>, value: V): boolean {
    return some(list, v => v === value);
  }

  export function first<V,I>(list: IList<V,I>): V {
    return list.get(list.next());
  }

  export function last<V,I>(list: IList<V,I>): V {
    return list.get(list.prev());
  }

  export function flatMap<V,I,W,J>(list: IList<V,I>, getFn: (V,I?) => IList<W,J>): IList<W,J> {
    return null;
  }

  export function map<V,I,W>(list: IList<V,I>, getFn: (V,I?) => W): IList<W,I> {
    return null;
  }

}
