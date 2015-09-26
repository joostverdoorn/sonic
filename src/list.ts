import   bind   from './bind';
import   Key    from './key';
import   Range  from './range';
import { Tree,
         ITree,
         Path } from './tree';
import   Cache  from './cache';
import   Index  from './index';

export interface IList<V> {
  get: (key: Key) => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export abstract class List<V> implements IList<V> {

  abstract get(key: Key): Promise<V>
  abstract prev(key?: Key): Promise<Key>
  abstract next(key?: Key): Promise<Key>

  static create<V>(list: IList<V>): List<V> {
    return new class extends List<V> {
      get(key: Key): Promise<V> { return list.get(key); }
      prev(key?: Key): Promise<Key> { return list.prev(key); }
      next(key?: Key): Promise<Key> { return list.next(key); }
    }
  }

  static _add<V>(list: IList<V>, key: Key, value: V): IList<V> {
    function get(k: Key): Promise<V> {
      if(k == key) return Promise.resolve(value);
      return list.get(k);
    }

    function prev(k: Key): Promise<Key> {
      if(k == null) return Promise.resolve(key);
      if(k == key) return list.prev();
      return list.prev(k);
    }

    function next(k: Key): Promise<Key> {
      if(k == key) return Promise.resolve(null);
      return list.next(k).then(n => n == null ? key : n);
    }

    return { get, prev, next };
  }

  static _remove<V>(list: IList<V>, key: Key): IList<V> {
    function get(k: Key): Promise<V> {
      if(k == key) return Promise.reject<V>(new Error);
      return list.get(k);
    }

    function prev(k: Key): Promise<Key> {
      if(k == key) return Promise.reject<Key>(new Error);
      return list.prev(k).then(p => p == key ? list.prev(p) : p);
    }

    function next(k: Key): Promise<Key> {
      if(k == key) return Promise.reject<Key>(new Error);
      return list.next(k).then(n => n == key ? list.next(n) : n);
    }

    return { get, prev, next };
  }

  _add(key: Key, value: V): List<V> {
    return List.create(List._add(this, key, value));
  }

  _remove(key: Key): List<V> {
    return List.create(List._remove(this, key));
  }





  // 
  // first(): Promise<V> {
  //   return List.first(this);
  // }
  //
  // last(): Promise<V> {
  //   return List.last(this);
  // }


  reverse(): List<V> {
    return List.create(List.reverse(this));
  }

  map<W>(mapFn: (value: V, key?: Key) => W): List<W> {
    return List.create(List.map(this, mapFn));
  }

  filter(filterFn: (value: V, key?: Key) => boolean): List<V> {
    return List.create(List.filter(this, filterFn));
  }

  flatten(): List<any> {
    return List.create(List.flatten(this));
  }

  flatMap<W>(flatMapFn:(value: V, key?: Key) => IList<W>): List<W> {
    return List.create(List.flatMap(this, flatMapFn));
  }

  cache(): List<V> {
    return List.create(List.cache(this));
  }

  group(groupFn: (value: V, key: Key) => Key): List<List<V>> {
    return List.create(List.group(this, groupFn)).map(List.create).cache();
  }

  index(): List<V> {
    return List.create(List.index(this));
  }

  zip<W, U>(other: IList<W>, zipFn: (v: V, w: W) => U): List<U> {
    return List.create(List.zip(this, other, zipFn));
  }

  skip(k: number): IList<V> {
    return List.create(List.skip(this, k));
  }

  take(n: number): IList<V> {
    return List.create(List.take(this, n));
  }

  range(k: number, n: number): IList<V> {
    return List.create(List.range(this, k, n));
  }

  scan<W>(scanFn: (memo: W, value: V) => W, memo?: W): IList<W> {
    return List.create(List.scan(this, scanFn, memo));
  }

  static isList(obj: any): boolean {
    return obj != null && !!obj['get'] && !!obj['prev'] && !!obj['next'];
  }

  static first<V>(list: IList<V>): Promise<V> {
    var get = bind(list.get, list);
    return list.next().then(get);
  }

  static last<V>(list: IList<V>): Promise<V> {
    var get = bind(list.get, list);
    return list.prev().then(get);
  }

  static reverse<V>(list: IList<V>): IList<V> {
    var get  = bind(list.get, list),
        prev = bind(list.next, list),
        next = bind(list.prev, list);

    return { get, prev, next };
  }

  static map<V, W>(list: IList<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): IList<W> {
    var prev = bind(list.prev, list),
        next = bind(list.next, list);

    function get(key: Key) {
      return list.get(key).then(value => mapFn(value, key));
    }

    return { get, prev, next };
  }

  static filter<V>(list: IList<V>, filterFn: (value: V, key?: Key) => boolean): IList<V> {
    function get(key: Key) {
      return list.get(key).then(value => {
        if(filterFn(value)) return value;
        throw new Error();
      });
    }

    function prev(key: Key) {
      return List.findKey(List.reverse(list), filterFn, [key, null]);
    }

    function next(key: Key) {
      return List.findKey(list, filterFn, [key, null]);
    }

    return { get, prev, next };
  }

  static flatten<V>(list: ITree<V>): ITree<V> {
    function get(key: Key): Promise<V | ITree<V>> {
      var path = Path.fromKey(key);
      return Tree.get(list, path, 1);
    }

    function prev(key: Key): Promise<Key> {
      var path = Path.fromKey(key);
      return Tree.prev(list, path, 1).then(Path.toKey);
    }

    function next(key: Key): Promise<Key> {
      var path = Path.fromKey(key);
      return Tree.next(list, path, 1).then(Path.toKey);
    }

    return { get, prev, next };
  }


  static flatMap<V, W>(list: IList<V>, flatMapFn:(value: V, key?: Key) => IList<W>): IList<W> {
    return <IList<W>> List.flatten<W>(List.map(list, flatMapFn));
  }

  static cache<V>(list: IList<V>): IList<V> {
    return new Cache<V>(list);
  }

  static group<V>(list: IList<V>, groupFn: (value: V, key: Key) => Key): IList<IList<V>> {
    var groups: {[key: string]: IList<V>} = Object.create(null);

    function get(groupKey: Key): Promise<IList<V>> {
      return List.findKey(list, (value: V, key: Key) => groupFn(value, key) === groupKey)
                 .then(() => groups[groupKey] = List.filter(list, (value: V, key: Key) => groupKey === groupFn(value, key)));
    }

    function prev(groupKey: Key): Promise<Key> {
      return List.findKey(List.reverse(list), (value, key) => {
        var _groupKey = groupFn(value, key);
        return _groupKey !== groupKey && !groups[_groupKey];
      }).then(key => key == null ? null : list.get(key).then(value => groupFn(value, key)));
    }

    function next(groupKey: Key): Promise<Key> {
      return List.findKey(list, (value, key) => {
        var _groupKey = groupFn(value, key);
        return _groupKey !== groupKey && !groups[_groupKey];
      }).then(key => key == null ? null : list.get(key).then(value => groupFn(value, key)));
    }

    return new Cache({ get, prev, next });
  }

  static index<V>(list: IList<V>): IList<V> {
    return new Index<V>(list);
  }

  static zip<V, W, U>(list: IList<V>, other: IList<W>, zipFn: (v: V, w: W) => U): IList<U> {
    list = List.index(list);
    other = List.index(other);

    function get(key: number): Promise<U> {
      return list.get(key).then(v => other.get(key).then(w => zipFn(v, w)));
    }

    function prev(key?: number): Promise<number> {
      return list.prev(key).then(() => other.prev(key));
    }

    function next(key?: number): Promise<number> {
      return list.next(key).then(() => other.next(key));
    }

    return { get, prev, next };
  }

  static skip<V>(list: IList<V>, k: number): IList<V> {
    return List.filter(List.index(list), function(value, key) {
      return key >= k;
    });
  }

  static take<V>(list: IList<V>, n: number): IList<V> {
    return List.filter(List.index(list), function(value, key) {
      return key < n;
    });
  }

  static range<V>(list: IList<V>, k: number, n: number): IList<V> {
    return List.filter(List.index(list), function(value, key) {
      return key >= k && key < n + k;
    });
  }

  static scan<V, W>(list: IList<V>, scanFn: (memo: W, value: V, key?: Key) => W, memo?: W): IList<W> {
    var { prev, next } = list,
        scanList: IList<W>;

    function get(key: Key): Promise<W> {
      return scanList.prev(key).then(p => p == null ? memo : scanList.get(p)).then(memo => list.get(key).then(value => scanFn(memo, value, key)));
    }

    scanList = List.cache({ get, prev, next });
    return scanList;
  }

}

export default List;
