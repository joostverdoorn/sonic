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

  first(): Promise<V> {
    return List.first(this);
  }

  last(): Promise<V> {
    return List.last(this);
  }

  every(predicate: (value: V, key?: Key) => boolean): Promise<boolean> {
    return List.every(this, predicate);
  }

  some(predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean> {
    return List.some(this, predicate);
  }

  forEach(fn: (value: V, key?: Key) => void, range?: Range): Promise<void> {
    return List.forEach(this, fn, range);
  }

  reduce<W>(fn: (memo: W, value: V, key?: Key) => W, memo?: W, range?: Range): Promise<W> {
    return List.reduce(this, fn, memo, range);
  }

  toArray(range?: Range): Promise<V[]> {
    return List.toArray(this, range);
  }

  findKey(fn: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<Key> {
    return List.findKey(this, fn, range);
  }

  find(fn: (value: V, key?: Key) => boolean, range?: Range): Promise<V> {
    return List.find(this, fn, range);
  }

  keyOf(value: V, range?: Range): Promise<Key> {
    return List.keyOf(this, value, range);
  }

  indexOf(value: V, range?: Range): Promise<Key> {
    return List.indexOf(this, value, range);
  }

  keyAt(index: number, range?: Range): Promise<Key> {
    return List.keyAt(this, index, range);
  }

  at(index: number, range?: Range): Promise<V> {
    return List.at(this, index, range);
  }

  contains(value: V, range?: Range): Promise<boolean> {
    return List.contains(this, value, range);
  }

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

  static every<V>(list: IList<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<boolean> {
    var next: Key,
        last: Key;

    if(Array.isArray(range)) {
      next = range[1];
    } else {
      last = range;
    }

    var loop = (key: Key): Promise<boolean> => {
      if(key == null) return Promise.resolve(true);
      return list.get(key)
        .then(value => predicate(value, key))
        .then(res => res === false ? false : key == last ? true : list.next(key).then(key => key == next ? true : loop(key)));
    }

    return Range.first(list, range).then(loop);
  }

  static some<V>(list: IList<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<boolean> {
    return List.every(list, (value: V, key: Key) => Promise.resolve(predicate(value, key)).then(result => !result), range).then(result => !result);
  }

  static forEach<V>(list: IList<V>, fn: (value: V, key?: Key) => void | Promise<void>, range?: Range): Promise<void> {
    return List.every(list, (value: V, key: Key) => Promise.resolve(fn(value, key)).then(() => true), range).then(() => {})
  }

  static reduce<V, W>(list: IList<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W, range?: Range): Promise<W> {
    return List.forEach(list, (value: V, key: Key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value }), range).then(() => memo);
  }

  static toArray<V>(list: IList<V>, range?: Range): Promise<V[]> {
    return List.reduce<V, V[]>(list, (memo: V[], value: V) => (memo.push(value), memo), [], range);
  }

  static findKey<V>(list: IList<V>, fn: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<Key> {
    var key: Key;
    return List.some(list, (v: V, k: Key) => Promise.resolve(fn(v, k)).then(res => res ? (!!(key = k) || true) : false), range).then(found => found ? key : null);
  }

  static find<V>(list: IList<V>, fn: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<V> {
    return List.findKey(list, fn, range).then(list.get);
  }

  static keyOf<V>(list: IList<V>, value: V, range?: Range): Promise<Key> {
    return List.findKey(list, v => v === value, range);
  }

  static indexOf<V>(list: IList<V>, value: V, range?: Range): Promise<number> {
    var index = -1;
    return List.some(list, (v: V, k: Key) => value == v ? (!!(index++) || true) : false, range).then((found) => {if (found) {return index} else {throw new Error()}});
  }

  static keyAt<V>(list: IList<V>, index: number, range?: Range): Promise<Key> {
    return List.findKey(list, () => 0 === index--);
  }

  static at<V>(list: IList<V>, index: number, range?: Range): Promise<V> {
    return List.keyAt(list, index, range).then(list.get);
  }

  static contains<V>(list: IList<V>, value: V, range?: Range): Promise<boolean> {
    return List.some(list, v => v === value, range);
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
