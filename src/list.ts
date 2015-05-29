import Key from './key';
import { Tree, ITree, Path } from './tree';
import ArrayList from './array_list';
import Cache from './cache';

export interface IList<V> {
  has: (key: Key) => boolean;
  get: (key: Key) => V;
  prev: (key?: Key) => Key;
  next: (key?: Key) => Key;
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

  has = (key: Key): boolean => {
    throw new Error("Not implemented");
  }

  get = (key: Key): V => {
    throw new Error("Not implemented");
  }

  prev = (key: Key): Key => {
    throw new Error("Not implemented");
  }

  next = (key: Key): Key => {
    throw new Error("Not implemented");
  }

  first = (): V => {
    return List.first(this);
  }

  last = (): V => {
    return List.last(this);
  }

  forEach = (fn: (value: V, key?: Key) => void) => {
    return List.forEach(this, fn);
  }

  reduce = <W>(fn: (memo: W, value: V, key?: Key) => W, memo?: W): W => {
    return List.reduce(this, fn);
  }

  toArray = (): V[] => {
    return List.toArray(this);
  }

  findKey = (fn: (value: V, key?: Key) => boolean): Key => {
    return List.findKey(this, fn);
  }

  find = (fn: (value: V, key?: Key) => boolean): V => {
    return List.find(this, fn);
  }

  keyOf = (value: V): Key => {
    return List.keyOf(this, value);
  }

  indexOf = (value: V): Key => {
    return List.indexOf(this, value);
  }

  keyAt = (index: number): Key => {
    return List.keyAt(this, index);
  }

  at = (index: number): V => {
    return List.at(this, index);
  }

  every = (predicate: (value: V, key?: Key) => boolean): boolean => {
    return List.every(this, predicate);
  }

  some = (predicate: (value: V, key?: Key) => boolean): boolean => {
    return List.some(this, predicate);
  }

  contains = (value: V): boolean => {
    return List.contains(this, value);
  }

  reverse = (): List<V> => {
    return List.create(List.reverse(this));
  }

  map = <W>(mapFn: (value: V, key?: Key) => W): List<W> => {
    return List.create(List.map(this, mapFn));
  }

  filter = (filterFn: (value: V, key?: Key) => boolean): List<V> => {
    return List.create(List.filter(this, filterFn));
  }

  flatten = (): List<any> => {
    return List.create(List.flatten(this));
  }

  flatMap = <W>(flatMapFn:(value: V, key?: Key) => IList<W>): List<W> => {
    return List.create(List.flatMap(this, flatMapFn));
  }

  cache = (): List<V> => {
    return List.create(List.cache(this));
  }

  // index = (): List<V> => {
  //   return List.create(List.index(this));
  // }
  // 
  // zip = <W, U>(other: IList<W>, zipFn: (v: V, w: W) => U): List<U> => {
  //   return List.create(List.zip(this, other, zipFn));
  // }

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

  static forEach<V>(list: IList<V>, fn: (value: V, key?: Key) => void): void {
    var key: Key;
    while((key = list.next(key)) != null) fn(list.get(key), key);
  }

  static reduce<V, W>(list: IList<V>, fn: (memo: W, value: V, key?: Key) => W, memo?: W): W {
    var key: Key;
    while((key = list.next(key)) != null) memo = fn(memo, list.get(key), key);
    return memo;
  }

  static toArray<V>(list: IList<V>): V[] {
    return List.reduce(list, function(memo, v) { memo.push(v); return memo }, []);
  }

  static findKey<V>(list: IList<V>, fn: (value: V, key?: Key) => boolean): Key {
    var key: Key;
    while((key = list.next(key)) != null) if(fn(list.get(key), key)) return key;
  }

  static find<V>(list: IList<V>, fn: (value: V, key?: Key) => boolean): V {
    return list.get(List.findKey(list, fn));
  }

  static keyOf<V>(list: IList<V>, value: V): Key {
    return List.findKey(list, v => v === value);
  }

  static indexOf<V>(list: IList<V>, value: V): number {
    var key: Key, i = 0;
    while((key = list.next(key)) != null) {
      if(list.get(key) === value) return i;
      i++;
    }
  }

  static keyAt<V>(list: IList<V>, index: number): Key {
    var key: Key, i = 0;
    while((key = list.next(key)) != null) if(i++ == index) return key;
    return null;
  }

  static at<V>(list: IList<V>, index: number): V {
    return list.get(List.keyAt(list, index));
  }

  static every<V>(list: IList<V>, predicate: (value: V, key?: Key) => boolean): boolean {
    var key: Key;
    while((key = list.next(key)) != null) if(!predicate(list.get(key), key)) return false;
    return true;
  }

  static some<V>(list: IList<V>, predicate: (value: V, key?: Key) => boolean): boolean {
    var key: Key;
    while((key = list.next(key)) != null) if(predicate(list.get(key), key)) return true;
    return false;
  }

  static contains<V>(list: IList<V>, value: V): boolean {
    return List.some(list, v => v === value);
  }

  static reverse<V>(list: IList<V>): IList<V> {
    var { has, get } = list;

    function prev(key: Key) {
      return list.next(key);
    }

    function next(key: Key) {
      return list.prev(key);
    }

    return {has, get, prev, next};
  }

  static map<V, W>(list: IList<V>, mapFn: (value: V, key?: Key) => W): IList<W> {
    var { has, prev, next } = list;

    function get(key: Key) {
      return has(key) ? mapFn(list.get(key), key) : undefined;
    }

    return { has, get, prev, next };
  }

  static filter<V>(list: IList<V>, filterFn: (value: V, key?: Key) => boolean): IList<V> {
    function has(key: Key) {
      return list.has(key) && filterFn(list.get(key), key);
    }

    function get(key: Key) {
      if(has(key)) return list.get(key);
      return;
    }

    function prev(key: Key) {
      var prev = key;
      while((prev = list.prev(prev)) != null) if(has(prev)) return prev;
      return null;
    }

    function next(key: Key) {
      var next = key;
      while((next = list.next(next)) != null) if(has(next)) return next;
      return null;
    }

    return { has, get, prev, next };
  }

  static flatten<V>(list: ITree<V>): ITree<V> {
    function has(key: Key): boolean {
      var path = Path.create(key);
      return Tree.has(list, path, 1);
    }

    function get(key: Key): V | ITree<V> {
      var path = Path.create(key);
      return Tree.get(list, path, 1);
    }

    function prev(key: Key): Key {
      var path = Path.create(key);
      return Path.key(Tree.prev(list, path, 1));
    }

    function next(key: Key): Key {
      var path = Path.create(key);
      return Path.key(Tree.next(list, path, 1));
    }

    return { has, get, prev, next };
  }

  static flatMap<V, W>(list: IList<V>, flatMapFn:(value: V, key?: Key) => IList<W>): IList<W> {
    return <IList<W>> List.flatten<W>(List.map(list, flatMapFn));
  }

  static cache<V>(list: IList<V>): IList<V> {
    return new Cache<V>(list);
  }

  // static index<V>(list: IList<V>): IList<V> {
  //   var keys : Key[] = [];
  //   return List.keyBy(list, (value: V, key: Key): Key => {
  //
  //     if (key == null) return keys.length;
  //     else if (keys[key]) return keys[key];
  //     else {
  //       keys[key] = ++keys.length;
  //     }
  //
  //     return keys.length - 1;
  //   });
  // }
  //
  // static keyBy<V>(list: IList<V>, keyFn: (value: V, key?: Key) => Key) {
  //   var sourceKeyByKey: {[key: string]: Key} = Object.create(null),
  //       keyBySourceKey: {[key: string]: Key} = Object.create(null);
  //
  //   function has(key: Key): boolean {
  //     if(key in sourceKeyByKey) return true;
  //
  //     var last: Key = null;
  //     while((last = next(last)) != null) if(last == key) return true;
  //     return false;
  //   }
  //
  //   function get(key: Key): V {
  //     return has(key) ? list.get(sourceKeyByKey[key]) : undefined;
  //   }
  //
  //   function prev(key: Key): Key {
  //     if(has(key) || key == null) return keyBySourceKey[list.prev(sourceKeyByKey[key])];
  //   }
  //
  //   function next(key: Key = null): Key {
  //     var sourceKey: Key, sourceNext: Key, res: Key;
  //
  //     if(key in sourceKeyByKey) sourceKey = sourceKeyByKey[key];
  //     else sourceKey = null;
  //
  //     while(key != null && !(key in sourceKeyByKey)) {
  //       sourceKey = list.next(sourceKey);
  //
  //       if (!(sourceKey in keyBySourceKey)) {
  //         if (sourceKey == null) return null;
  //         res = keyFn(list.get(sourceKey), sourceKey);
  //         keyBySourceKey[sourceKey] = res;
  //         sourceKeyByKey[res] = sourceKey;
  //
  //         if (res == key) break;
  //       }
  //     }
  //
  //     sourceKey = list.next(sourceKey);
  //     if (sourceKey == null) return null;
  //     res = keyFn(list.get(sourceKey), sourceKey);
  //     keyBySourceKey[sourceKey] = res;
  //     sourceKeyByKey[res] = sourceKey;
  //
  //     return res;
  //   }
  //
  //   return { has, get, prev, next };
  // }
  //
  // static zip<V, W, U>(list: IList<V>, other: IList<W>, zipFn: (v: V, w: W) => U): IList<U> {
  //   list = List.index(list);
  //   other = List.index(other);
  //
  //   function has(key: number): boolean {
  //     return list.has(key) && other.has(key);
  //   }
  //
  //   function get(key: number): U {
  //     return has(key) ? zipFn(list.get(key), other.get(key)): undefined;
  //   }
  //
  //   function prev(key?: number): number {
  //     var prev = list.prev(key);
  //     return prev != null && prev == other.prev(key) ? <number> prev : null
  //   }
  //
  //   function next(key?: number): number {
  //     var next = list.next(key);
  //     return next != null && next == other.next(key) ? <number> next : null
  //   }
  //
  //   return { has, get, prev, next };
  // }
  //
  // static skip<V>(list: IList<V>, k: number): IList<V> {
  //   return List.filter(List.index(list), function(value, key) {
  //     return key >= k;
  //   });
  // }
  //
  // static take<V>(list: IList<V>, n: number): IList<V> {
  //   return List.filter(List.index(list), function(value, key) {
  //     return key < n;
  //   });
  // }
  //
  // static range<V>(list: IList<V>, k: number, n: number): IList<V> {
  //   return List.filter(List.index(list), function(value, key) {
  //     return key >= k && key < n + k;
  //   });
  // }
  //
  // static scan<V, W>(list: IList<V>, scanFn: (memo: W, value: V) => W, memo?: W): IList<W> {
  //   var { has, prev, next } = list = List.index(list);
  //
  //   var memoCache = [memo];
  //
  //   function get(key: number): W {
  //     if (!list.has(key)) return;
  //
  //     var memo = memoCache[key];
  //
  //     while(key + 1 >= memoCache.length) {
  //       memoCache.push(memo = scanFn(memo, list.get(key)));
  //     }
  //
  //     return memoCache[key + 1];
  //   }
  //
  //   return {has, get, prev, next}
  // }

}

export default List;
