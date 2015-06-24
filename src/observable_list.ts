import Key       from './key';
import { List, IList } from './list';
import { Tree, Path }  from './tree';
import { Subject, IObservable, ISubscription, INotifier } from './observable';
import Cache from './cache';
import ObservableCache from './observable_cache';
import ObservableIndex from './observable_index';

export interface IListObserver {
  onInvalidate: (prev: Key, next: Key) => void;
}

export class ListSubject extends Subject<IListObserver> {
  onInvalidate = (prev: Key, next: Key) => {
    this.notify(observer => { observer.onInvalidate(prev, next) });
  }
}

export interface IObservableList<V> extends IList<V>, IObservable<IListObserver> {};

export class ObservableList<V> extends List<V> implements IObservableList<V> {

  constructor(list?: IObservableList<V>) {
    super(list);
    if(list != null) this.observe = list.observe;
  }

  observe = (observer: IListObserver): ISubscription => {
    throw new Error("Not implemented");
  }

  reverse = (): ObservableList<V> => {
    return ObservableList.create(ObservableList.reverse(this));
  }

  map = <W>(mapFn: (value: V, key?: Key) => W): ObservableList<W> => {
    return ObservableList.create(ObservableList.map(this, mapFn));
  }

  filter = (filterFn: (value: V, key?: Key) => boolean): ObservableList<V> => {
    return ObservableList.create(ObservableList.filter(this, filterFn));
  }

  flatten = (): ObservableList<any> => {
    return ObservableList.create(ObservableList.flatten(this));
  }

  flatMap = <W>(flatMapFn:(value: V, key?: Key) => IObservableList<W>): ObservableList<W> => {
    return ObservableList.create(ObservableList.flatMap(this, flatMapFn));
  }

  cache = (): ObservableList<V> => {
    return ObservableList.create(ObservableList.cache(this));
  }

  index = (): ObservableList<V> => {
    return ObservableList.create(ObservableList.index(this));
  }

  zip = <W, U>(other: IObservableList<W>, zipFn: (v: V, w: W) => U): ObservableList<U> => {
    return ObservableList.create(ObservableList.zip(this, other, zipFn));
  }

  skip = (k: number): IObservableList<V> => {
    return ObservableList.create(ObservableList.skip(this, k));
  }

  take = (n: number): IObservableList<V> => {
    return ObservableList.create(ObservableList.take(this, n));
  }

  range = (k: number, n: number): IObservableList<V> => {
    return ObservableList.create(ObservableList.range(this, k, n));
  }

  scan = <W>(scanFn: (memo: W, value: V) => W, memo?: W): ObservableList<W> => {
    return ObservableList.create(ObservableList.scan(this, scanFn, memo));
  }

  static isObservableList(obj: any): boolean {
    return List.isList(obj) && !!obj['observe'];
  }

  static create<V>(list: IObservableList<V>): ObservableList<V> {
    return new ObservableList<V>({
      get:     list.get,
      prev:    list.prev,
      next:    list.next,
      observe: list.observe
    });
  }

  static reverse<V>(list: IObservableList<V>): IObservableList<V> {
    var { get, prev, next } = List.reverse(list);

    function observe(observer: IListObserver) {
      return list.observe({
        onInvalidate: function(prev, next) {
          observer.onInvalidate(next, prev);
        }
      });
    }

    return { get, prev, next, observe };
  }

  static map<V, W>(list: IObservableList<V>, mapFn: (value: V, key?: Key) => W): IObservableList<W> {
    var { get, prev, next } = List.map(list, mapFn);
    return { get, prev, next, observe: list.observe };
  }

  static filter<V>(list: IObservableList<V>, filterFn: (value: V, key?: Key) => boolean): IObservableList<V> {
    var { get, prev, next } = List.filter(list, filterFn);
    var subject = new ListSubject();

    list.observe({
      onInvalidate: function(p: Key, n: Key) {
        prev(p).then(p => next(n).then(n => subject.onInvalidate(p, n)));
      }
    });

    return { get, prev, next, observe: subject.observe };
  }

  static flatten<V>(list: IObservableList<IObservableList<V> | V | any>): IObservableList<V> {
    var flat = <List<V>> List.flatten(list),
        subject = new ListSubject(),
        subscriptions: {[key: string]: ISubscription} = Object.create(null);

    var cache = new ObservableCache({
          get: list.get,
          prev: list.prev,
          next: list.next,
          observe: (observer: IListObserver) => null
        });

    function createObserver(head: Key): IListObserver {
      var onInvalidate = (prev: Key, next: Key) => {
        Promise.all([
          prev == null ? Tree.prev(list, [head]) : Path.append(head, prev),
          next == null ? Tree.next(list, [head]) : Path.append(head, next)
        ]).then(([prev, next]) => {
          subject.onInvalidate(Path.toKey(prev), Path.toKey(next));
        })
      }

      return { onInvalidate };
    }

    function prev(key: Key): Promise<Key> {
      return flat.prev(key).then(prev => {
        var path = Path.fromKey(prev),
            head = Path.head(path);

        if (head != null && !subscriptions[head]) {
          list.get(head).then(list => subscriptions[head] = list.observe(createObserver(head)));
        }

        return prev;
      });
    }

    function next(key: Key): Promise<Key> {
      return flat.next(key).then(next => {
        var path = Path.fromKey(next),
            head = Path.head(path);

        if (head != null && !subscriptions[head]) {
          list.get(head).then(list => subscriptions[head] = list.observe(createObserver(head)));
        }

        return next;
      });
    }

    list.observe({
      onInvalidate: (prev, next) => {
        // Unsubscribe from all lists in the range
        List.forEach(cache, (value: V, key: Key) => {
          if (!subscriptions[key]) return;
          subscriptions[key].unsubscribe();
          delete subscriptions[key];
        }, prev, next);

        // Find the prev and next paths, and invalidate
        Promise.all([
          prev == null ? null : Tree.prev(list, [prev, null], 1),
          next == null ? null : Tree.next(list, [next, null], 1)
        ]).then(([prev, next]) => {
          subject.onInvalidate(Path.toKey(prev), Path.toKey(next));
        })

        // Invalidate cache
        cache.onInvalidate(prev, next);
      }
    });

    return { get: flat.get, prev, next, observe: subject.observe };
  }

  static flatMap<V, W>(list: IObservableList<V>, flatMapFn:(value: V, key?: Key) => IObservableList<W>): IObservableList<W> {
    return ObservableList.flatten<W>(ObservableList.map(list, flatMapFn));
  }

  static cache<V>(list: IObservableList<V>): IObservableList<V> {
    return new ObservableCache<V>(list);
  }

  static index<V>(list: IObservableList<V>): IObservableList<V> {
    return new ObservableIndex<V>(list);
  }

  static zip<V, W, U>(list: IObservableList<V>, other: IObservableList<W>, zipFn: (v: V, w: W) => U): IObservableList<U> {
    list = ObservableList.index(list);
    other = ObservableList.index(other);

    function get(key: number): Promise<U> {
      return list.get(key).then(v => other.get(key).then(w => zipFn(v, w)));
    }

    function prev(key?: number): Promise<number> {
      return list.prev(key).then(() => other.prev(key));
    }

    function next(key?: number): Promise<number> {
      return list.next(key).then(() => other.next(key));
    }

    var subject = new ListSubject();
    list.observe(subject);
    other.observe(subject);

    return { get, prev, next, observe: subject.observe };
  }

  static skip<V>(list: IObservableList<V>, k: number): IObservableList<V> {
    return ObservableList.filter(ObservableList.index(list), function(value, key) {
      return key >= k;
    });
  }

  static take<V>(list: IObservableList<V>, n: number): IObservableList<V> {
    return ObservableList.filter(ObservableList.index(list), function(value, key) {
      return key < n;
    });
  }

  static range<V>(list: IObservableList<V>, k: number, n: number): IObservableList<V> {
    return ObservableList.filter(ObservableList.index(list), function(value, key) {
      return key >= k && key < n + k;
    });
  }

  static scan<V, W>(list: IObservableList<V>, scanFn: (memo: W, value: V) => W, memo?: W): IObservableList<W> {
    var { prev, next } = list,
        scanList: IObservableList<W>;

    function get(key: Key): Promise<W> {
      return scanList.prev(key).then(p => p == null ? memo : scanList.get(p)).then(memo => list.get(key).then(value => scanFn(memo, value)));
    }

    function observe(observer: IListObserver) {
      return list.observe({
        onInvalidate: function(prev, next) {
          observer.onInvalidate(prev, null);
        }
      });
    }

    scanList = ObservableList.cache({ get, prev, next, observe });
    return scanList;
  }
}

export default ObservableList;
