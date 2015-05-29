import compose  from './compose'
import Key       from './key';
import { List, IList } from './list';
import { Tree, Path }  from './tree';
import { Subject, IObservable, ISubscription, INotifier } from './observable';
import ObservableCache from './observable_cache';

export interface IListObserver {
  onInvalidate: (prev: Key, next: Key) => void;
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

  cache = (): List<V> => {
    return ObservableList.create(ObservableList.cache(this));
  }

  static isObservableList(obj: any) {
    return List.isList(obj) && !!obj['observe'];
  }

  static create<V>(list: IObservableList<V>): ObservableList<V> {
    return new ObservableList<V>({
      has:     list.has.bind(list),
      get:     list.get.bind(list),
      prev:    list.prev.bind(list),
      next:    list.next.bind(list),
      observe: list.observe.bind(list)
    });
  }

  static reverse<V>(list: IObservableList<V>): IObservableList<V> {
    var { has, get, prev, next } = List.reverse(list);

    function observe(observer: IListObserver) {
      return list.observe(observer);
    }

    return {has, get, prev, next, observe};
  }

  static map<V, W>(list: IObservableList<V>, mapFn: (value: V, key?: Key) => W): IObservableList<W> {
    var { has, get, prev, next } = List.map(list, mapFn);
    return { has, get, prev, next, observe: list.observe };
  }

  static filter<V>(list: IObservableList<V>, filterFn: (value: V, key?: Key) => boolean): IObservableList<V> {
    var { has, get, prev, next } = List.filter(list, filterFn);

    function observe(observer: IListObserver) {
      return list.observe({
        onInvalidate: function(p: Key, n: Key) {
          p = has(p) ? p : prev(p);
          n = has(n) ? n : next(n)
          observer.onInvalidate(p, n)
        }
      });
    }

    return { has, get, prev, next, observe };
  }

  static flatten<V>(list: IObservableList<IObservableList<V> | V | any>): IObservableList<V> {
    var cache: IObservableList<any>;
    var subscriptions = Object.create(null);
    var subject = new Subject();

    list.observe({
      onInvalidate: function(prev, next) {
        var key: Key;

        key = prev;
        while((key = cache.next(key)) != null && key != next) {
          var subscription = subscriptions[key];
          if(subscription) {
            subscription.unsubscribe();
            delete subscriptions[key];
          }
        }

        key = next;
        while((key = cache.prev(key)) != null && key != prev) {
          var subscription = subscriptions[key];
          if(subscription) {
            subscription.unsubscribe();
            delete subscriptions[key];
          }
        }
      }
    });

    cache = ObservableList.cache(ObservableList.map(list, function(value, key) {
      subscriptions[key] = value.observe({
        onInvalidate: function(prev: Key, next: Key) {
          var prevKey: Key,
              nextKey: Key,
              prevPath = Path.append(key, prev),
              nextPath = Path.append(key, next);

          if(prev == null) prevPath = Tree.prev(list, Tree.next(list, prevPath));
          if(next == null) nextPath = Tree.next(list, Tree.prev(list, nextPath));

          prevKey = Path.key(prevPath);
          nextKey = Path.key(nextPath);

          subject.notify(function(observer: IListObserver) {
            observer.onInvalidate(prevKey, nextKey);
          });
        }
      });
      return value;
    }));

    cache.observe({
      onInvalidate: function(prev, next) {
        var prevKey = Path.key(Tree.prev(list, [prev])),
            nextKey = Path.key(Tree.next(list, [next]));

        subject.notify(function(observer: IListObserver) {
          observer.onInvalidate(prevKey, nextKey);
        })
      }
    });

    var { has, get, next, prev } = <IList<V>> List.flatten<V>(cache)
    return { has, get, next, prev, observe: subject.observe }
  }

  static flatMap<V, W>(list: IObservableList<V>, flatMapFn:(value: V, key?: Key) => IObservableList<W>): IObservableList<W> {
    return ObservableList.flatten<W>(ObservableList.map(list, flatMapFn));
  }

  static cache<V>(list: IObservableList<V>): IObservableList<V> {
    return new ObservableCache<V>(list);
  }
}

export default ObservableList;
