import Id from './id';
import { Tree, ITree, Path } from './tree';
import ArrayList from './array_list';

export interface IList<V> {
  has: (id: Id) => boolean;
  get: (id: Id) => V;
  prev: (id?: Id) => Id;
  next: (id?: Id) => Id;
}

export class List<V> implements IList<V> {

  constructor(list?: IList<V>) {
    if(list != null) {
      this.has  = list.has;
      this.get  = list.get;
      this.prev = list.prev;
      this.next = list.next;
    }
  };

  has = (id: Id): boolean => {
    throw new Error("Not implemented");
  }

  get = (id: Id): V => {
    throw new Error("Not implemented");
  }

  prev = (id: Id): Id => {
    throw new Error("Not implemented");
  }

  next = (id: Id): Id => {
    throw new Error("Not implemented");
  }

  first = (): V => {
    return List.first(this);
  }

  last = (): V => {
    return List.last(this);
  }

  forEach = (fn: (value: V, id?: Id) => void) => {
    return List.forEach(this, fn);
  }

  reduce = <W>(fn: (memo: W, value: V, id?: Id) => W, memo?: W): W => {
    return List.reduce(this, fn);
  }

  toArray = (): V[] => {
    return List.toArray(this);
  }

  findId = (fn: (value: V, id?: Id) => boolean): Id => {
    return List.findId(this, fn);
  }

  find = (fn: (value: V, id?: Id) => boolean): V => {
    return List.find(this, fn);
  }

  idOf = (value: V): Id => {
    return List.idOf(this, value);
  }

  indexOf = (value: V): Id => {
    return List.indexOf(this, value);
  }

  idAt = (index: number): Id => {
    return List.idAt(this, index);
  }

  at = (index: number): V => {
    return List.at(this, index);
  }

  every = (predicate: (value: V, id?: Id) => boolean): boolean => {
    return List.every(this, predicate);
  }

  some = (predicate: (value: V, id?: Id) => boolean): boolean => {
    return List.some(this, predicate);
  }

  contains = (value: V): boolean => {
    return List.contains(this, value);
  }

  reverse = (): List<V> => {
    return List.create(List.reverse(this));
  }

  map = <W>(mapFn: (value: V, id?: Id) => W): List<W> => {
    return List.create(List.map(this, mapFn));
  }

  filter = (filterFn: (value: V, id?: Id) => boolean): List<V> => {
    return List.create(List.filter(this, filterFn));
  }

  flatten = (): List<any> => {
    return List.create(List.flatten(this));
  }

  flatMap = <W>(flatMapFn:(value: V, id?: Id) => IList<W>): List<W> => {
    return List.create(List.flatMap(this, flatMapFn));
  }

  cache = (): List<V> => {
    return List.create(List.cache(this));
  }

  index = (): List<V> => {
    return List.create(List.index(this));
  }

  zip = <W, U>(other: IList<W>, zipFn: (v: V, w: W) => U): List<U> => {
    return List.create(List.zip(this, other, zipFn));
  }

  static isList(obj: any): boolean {
    return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
  }

  static create<V>(list: IList<V>): List<V> {
    return new List<V>({
      has:  list.has,
      get:  list.get,
      prev: list.prev,
      next: list.next
    });
  }

  static first<V>(list: IList<V>): V {
    return list.get(list.next());
  }

  static last<V>(list: IList<V>): V {
    return list.get(list.prev());
  }

  static forEach<V>(list: IList<V>, fn: (value: V, id?: Id) => void): void {
    var id: Id;
    while((id = list.next(id)) != null) fn(list.get(id), id);
  }

  static reduce<V, W>(list: IList<V>, fn: (memo: W, value: V, id?: Id) => W, memo?: W): W {
    var id: Id;
    while((id = list.next(id)) != null) memo = fn(memo, list.get(id), id);
    return memo;
  }

  static toArray<V>(list: IList<V>): V[] {
    return List.reduce(list, function(memo, v) { memo.push(v); return memo }, []);
  }

  static findId<V>(list: IList<V>, fn: (value: V, id?: Id) => boolean): Id {
    var id: Id;
    while((id = list.next(id)) != null) if(fn(list.get(id), id)) return id;
  }

  static find<V>(list: IList<V>, fn: (value: V, id?: Id) => boolean): V {
    return list.get(List.findId(list, fn));
  }

  static idOf<V>(list: IList<V>, value: V): Id {
    return List.findId(list, v => v === value);
  }

  static indexOf<V>(list: IList<V>, value: V): number {
    var id: Id, i = 0;
    while((id = list.next(id)) != null) {
      if(list.get(id) === value) return i;
      i++;
    }
  }

  static idAt<V>(list: IList<V>, index: number): Id {
    var id: Id, i = 0;
    while((id = list.next(id)) != null) if(i++ == index) return id;
    return null;
  }

  static at<V>(list: IList<V>, index: number): V {
    return list.get(List.idAt(list, index));
  }

  static every<V>(list: IList<V>, predicate: (value: V, id?: Id) => boolean): boolean {
    var id: Id;
    while((id = list.next(id)) != null) if(!predicate(list.get(id), id)) return false;
    return true;
  }

  static some<V>(list: IList<V>, predicate: (value: V, id?: Id) => boolean): boolean {
    var id: Id;
    while((id = list.next(id)) != null) if(predicate(list.get(id), id)) return true;
    return false;
  }

  static contains<V>(list: IList<V>, value: V): boolean {
    return List.some(list, v => v === value);
  }

  static reverse<V>(list: IList<V>): IList<V> {
    var { has, get } = list;

    function prev(id: Id) {
      return list.next(id);
    }

    function next(id: Id) {
      return list.prev(id);
    }

    return {has, get, prev, next};
  }

  static map<V, W>(list: IList<V>, mapFn: (value: V, id?: Id) => W): IList<W> {
    var { has, prev, next } = list;

    function get(id: Id) {
      return has(id) ? mapFn(list.get(id), id) : undefined;
    }

    return { has, get, prev, next };
  }

  static filter<V>(list: IList<V>, filterFn: (value: V, id?: Id) => boolean): IList<V> {
    function has(id: Id) {
      return list.has(id) && filterFn(list.get(id), id);
    }

    function get(id: Id) {
      if(has(id)) return list.get(id);
      return;
    }

    function prev(id: Id) {
      var prev = id;
      while((prev = list.prev(prev)) != null) if(has(prev)) return prev;
      return null;
    }

    function next(id: Id) {
      var next = id;
      while((next = list.next(next)) != null) if(has(next)) return next;
      return null;
    }

    return { has, get, prev, next };
  }

  static flatten<V>(list: IList<IList<V> | V | any>): IList<V> {
    function has(id: Id): boolean {
      var path = Path.create(id);
      return Tree.has(list, path, 1);
    }

    function get(id: Id): V {
      var path = Path.create(id);
      return Tree.get(list, path, 1);
    }

    function prev(id: Id): Id {
      var path = Path.create(id);
      return Path.id(Tree.prev(list, path, 1));
    }

    function next(id: Id): Id {
      var path = Path.create(id);
      return Path.id(Tree.next(list, path, 1));
    }

    return { has, get, prev, next };
  }

  static flatMap<V, W>(list: IList<V>, flatMapFn:(value: V, id?: Id) => IList<W>): IList<W> {
    return List.flatten<W>(List.map(list, flatMapFn));
  }

  static cache<V>(list: IList<V>): IList<V> {
    var valueCache = Object.create(null),
        nextCache  = Object.create(null),
        prevCache  = Object.create(null);

    function has(id: Id): boolean {
      return id in valueCache || list.has(id);
    }

    function get(id: Id): V {
      if(id in valueCache) return valueCache[id];
      if(list.has(id)) return valueCache[id] = list.get(id);
      return;
    }

    function prev(id: Id): Id {
      if(id in prevCache) return prevCache[id];

      var prevId = list.prev(id);
      if(prevId != null) {
        prevCache[id] = prevId;
        nextCache[prevId] = id;
      }

      return prevId;
    }

    function next(id: Id): Id {
      if(id in nextCache) return nextCache[id];

      var nextId = list.next(id);
      if(nextId != null) {
        nextCache[id] = nextId;
        prevCache[nextId] = id;
      }

      return nextId;
    }

    return { has, get, prev, next };
  }

  static index<V>(list: IList<V>) {
    var ids: Id[] = [];

    function has(id: number): boolean {
      if(0 <= id && id < ids.length) return true;

      var last = ids.length - 1;
      while((last = next(last)) != null) if(last ==  id) return true;
      return false;
    }

    function get(id: number): V {
      return has(id) ? list.get(ids[id]) : undefined;
    }

    function prev(id: number): number {
      if (has(id)) return id ? id - 1 : null;
      else if (id == null) return ids.length ? ids.length - 1 : null;
    }

    function next(id: number): number {
      if(id == null && ids.length) return 0;
      if(0 <= id && id < ids.length - 1) return id + 1;


      var next: number,
          last = ids.length ? ids[ids.length - 1]: null;

      while((last = list.next(last)) != null) {
        var next = ids.push(last) - 1;
        if(next == (id != null ? id + 1 : 0)) return next;
      }

      return null;
    }

    return { has, get, prev, next };
  }

  static zip<V, W, U>(list: IList<V>, other: IList<W>, zipFn: (v: V, w: W) => U): IList<U> {
    list = List.index(list);
    other = List.index(other);

    function has(id: number): boolean {
      return list.has(id) && other.has(id);
    }

    function get(id: number): U {
      return has(id) ? zipFn(list.get(id), other.get(id)): undefined;
    }

    function prev(id?: number): number {
      var prev = list.prev(id);
      return prev != null && prev == other.prev(id) ? <number> prev : null
    }

    function next(id?: number): number {
      var next = list.next(id);
      return next != null && next == other.next(id) ? <number> next : null
    }

    return { has, get, prev, next };
  }

  static skip<V>(list: IList<V>, k: number): IList<V> {
    return List.filter(List.index(list), function(value, id) {
      return id >= k;
    });
  }

  static take<V>(list: IList<V>, n: number): IList<V> {
    return List.filter(List.index(list), function(value, id) {
      return id < n;
    });
  }

  static range<V>(list: IList<V>, k: number, n: number): IList<V> {
    return List.filter(List.index(list), function(value, id) {
      return id >= k && id < n + k;
    });
  }

  static scan<V, W>(list: IList<V>, scanFn: (memo: W, value: V) => W, memo?: W): IList<W> {
    list = List.index(list);

    var memoCache = [memo];

    function get(id: number): W {
      if (!list.has(id)) return;

      var memo = memoCache[id];

      while(id + 1 >= memoCache.length) {
        memoCache.push(memo = scanFn(memo, list.get(id)));
      }

      return memoCache[id + 1];
    }

    return {has: list.has, get, prev: list.prev, next: list.next}
  }

}

export default List;
