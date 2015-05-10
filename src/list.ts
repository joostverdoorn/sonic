import factory    from './factory';
import Observable from './observable';

export interface IList<V, I> {
  has(id: I): boolean;
  get(id: I): V;
  prev(id?: I): I;
  next(id?: I): I;
}

export class List<V, I> extends Observable<I> implements IList<V, I> {
  protected _source: IList<V, I>

  constructor(source?: IList<V, I>) {
    super();
    this._source = source;
  }

  has(id)  { return this._source.has(id);  }
  get(id)  { return this._source.get(id);  }
  prev(id) { return this._source.prev(id); }
  next(id) { return this._source.next(id); }

  protected _invalidate(prev?, next?) {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    super._invalidate(prev, next);
  }
}

export module List {
  export function isList(obj: any): boolean {
    return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
  }

  export function create<V,I>(list: IList<V,I>): List<V,I> {
    return new List(list);
  }

  // export function values<V>(): IIterator<V> {
  //
  // }

  export function forEach<V, I>(list: IList<V, I>, fn: (value: V, id?: I) => void): void {
    var id;
    while((id = list.next(id)) != null) fn(list.get(id), id);
  }

  export function reduce<V, I, T>(list: IList<V, I>, fn: (memo: T, value: V, id?: I) => T, memo?: T): T {
    var id;
    while((id = list.next(id)) != null) memo = fn(memo, list.get(id), id);
    return memo;
  }

  export function toArray<V, I>(list: IList<V,I>): V[] {
    return reduce(list, function(memo, v) { memo.push(v); return memo }, []);
  }

  export function findId<V, I>(list: IList<V, I>, fn: (value: V, id?: I) => boolean): I {
    var id;
    while((id = list.next(id)) != null) if(fn(list.get(id), id)) return id;
  }

  export function find<V, I>(list: IList<V, I>, fn: (value: V, id?: I) => boolean): V {
    return list.get(findId(list, fn));
  }

  export function idOf<V, I>(list: IList<V, I>, value: V): I {
    var id;
    return findId(list, v => v === value);
  }

  export function indexOf<V, I>(list: IList<V, I>, value: V): number {
    var id, i = 0;
    while((id = list.next(id)) != null) {
      if(list.get(id) === value) return i;
      i++;
    }
  }

  export function idAt<V, I>(list: IList<V, I>, index: number): I {
    var id, i = 0;
    while((id = list.next(id)) != null) if(i++ == index) return id;
    return null;
  }

  export function at<V, I>(list: IList<V, I>, index: number): V {
    return list.get(idAt(list, index));
  }

  export function every<V, I>(list: IList<V, I>, predicate: (value: V, id?: I) => boolean): boolean {
    var id;
    while((id = list.next(id)) != null) if(!predicate(list.get(id), id)) return false;
    return true;
  }

  export function some<V, I>(list: IList<V, I>, predicate: (value: V, id?: I) => boolean): boolean {
    var id;
    while((id = list.next(id)) != null) if(predicate(list.get(id), id)) return true;
    return false;
  }

  export function contains<V, I>(list: IList<V, I>, value: V): boolean {
    return some(list, v => v === value);
  }

  export function first<V, I>(list: IList<V, I>): V {
    return list.get(list.next());
  }

  export function last<V, I>(list: IList<V, I>): V {
    return list.get(list.prev());
  }

  export function reverse<V, I>(list: IList<V, I>): List<V, I> {
    function has(id) {
      return list.has(id);
    }

    function get(id) {
      return list.get(id);
    }

    function prev(id) {
      return list.next(id);
    }

    function next(id) {
      return list.prev(id);
    }

    return create({has, get, prev, next });
  }

  export function map<V, I, W>(list: IList<V, I>, mapFn: (value: V, id?: I) => W): List<W, I> {
    function has(id) {
      return list.has(id);
    }

    function get(id) {
      return mapFn(list.get(id));
    }

    function prev(id) {
      return list.prev(id);
    }

    function next(id) {
      return list.next(id);
    }

    return create({has, get, prev, next });
  }

  export function filter<V, I>(list: IList<V, I>, filterFn: (value: V, id?: I) => boolean): List<V, I> {
    function has(id) {
      return list.has(id) && filterFn(list.get(id));
    }

    function get(id) {
      if(has(id)) return list.get(id);
      return;
    }

    function prev(id) {
      var prev = id;
      while((prev = list.prev(prev)) != null) if(has(prev)) return prev;
      return null;
    }

    function next(id) {
      var next = id;
      while((next = list.next(next)) != null) if(has(next)) return next;
      return null;
    }

    return create({has, get, prev, next});
  }

  export function flatten<V, I, J>(list: IList<IList<V, J>, I>): List<V, [I, J]> {
    function has(id) {
      if(list.has(id[0])) return list.get(id[0]).has(id[1]);
      return false;
    }

    function get(id) {
      if(list.has(id[0])) return list.get(id[0]).get(id[1]);
      return;
    }

    function prev(id: [I, J]): [I, J] {
      if(id == null) return [list.prev(), last(list).prev()];
      var prev, listId = id[0];

      if(list.has(listId)) {
        prev = list.get(listId).prev(id[1])
        if(prev != null) return [listId, prev];

        while((listId = list.prev(listId)) != null) {
          if((prev = list.get(listId).prev()) != null) return [listId, prev];
        }
      }

      return null;
    }

    function next(id: [I, J]): [I, J] {
      if(id == null) return [list.next(), first(list).next()];
      var next, listId = id[0];

      if(list.has(listId)) {
        if((next = list.get(listId).next(id[1])) != null) return [listId, next];

        while((listId = list.next(listId)) != null) {
          if((next = list.get(listId).next()) != null) return [listId, next];
        }
      }

      return null;
    }

    return create({has, get, prev, next});
  }

  export function flatMap<V, I, W, J>(list: IList<V, I>, flatMapFn:(value: V, id?:I) => IList<W, J>): List<W, [I, J]> {
    return flatten(map(list, flatMapFn));
  }
}

Object.keys(List).forEach(function(key) {
  List.prototype[key] = function(...args) { List[key](this, ...args)};
});

export default List;
