import compose  from './compose'
import Id       from './id';
import { List, IList } from './list';
import { Tree, Path }  from './tree';
import { Subject, IObservable, ISubscription, INotifier } from './observable';

export interface IListObserver {
  onInvalidate: (prev: Id, next: Id) => void;
}

export interface IObservableList<V> extends IList<V>, IObservable<IListObserver> {};

export class ObservableList<V> extends List<V> implements IObservableList<V> {
  constructor(list?: IObservableList<V>) {
    super(list);

    if(list != null) {
      this.observe = list.observe;
    }
  }

  observe = (observer: IListObserver): ISubscription => {
    throw new Error("Not implemented");
  }

  reverse = (): ObservableList<V> => {
    return ObservableList.create(ObservableList.reverse(this));
  }

  map = <W>(mapFn: (value: V, id?: Id) => W): ObservableList<W> => {
    return ObservableList.create(ObservableList.map(this, mapFn));
  }

  filter = (filterFn: (value: V, id?: Id) => boolean): ObservableList<V> => {
    return ObservableList.create(ObservableList.filter(this, filterFn));
  }

  flatten = (): ObservableList<any> => {
    return ObservableList.create(ObservableList.flatten(this));
  }

  flatMap = <W>(flatMapFn:(value: V, id?: Id) => IObservableList<W>): ObservableList<W> => {
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

  static map<V, W>(list: IObservableList<V>, mapFn: (value: V, id?: Id) => W): IObservableList<W> {
    var { has, get, prev, next } = List.map(list, mapFn);
    return { has, get, prev, next, observe: list.observe };
  }

  static filter<V>(list: IObservableList<V>, filterFn: (value: V, id?: Id) => boolean): IObservableList<V> {
    var { has, get, prev, next } = List.filter(list, filterFn);

    function observe(observer: IListObserver) {
      return list.observe({
        onInvalidate: function(p: Id, n: Id) {
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
        var id: Id;

        id = prev;
        while((id = cache.next(id)) != null && id != next) {
          var subscription = subscriptions[id];
          if(subscription) {
            subscription.unsubscribe();
            delete subscriptions[id];
          }
        }

        id = next;
        while((id = cache.prev(id)) != null && id != prev) {
          var subscription = subscriptions[id];
          if(subscription) {
            subscription.unsubscribe();
            delete subscriptions[id];
          }
        }
      }
    });

    cache = ObservableList.cache(ObservableList.map(list, function(value, id) {
      subscriptions[id] = value.observe({
        onInvalidate: function(prev: Id, next: Id) {
          var prevId: Id,
              nextId: Id,
              prevPath = Path.append(id, prev),
              nextPath = Path.append(id, next);

          if(prev == null) prevPath = Tree.prev(list, Tree.next(list, prevPath));
          if(next == null) nextPath = Tree.next(list, Tree.prev(list, nextPath));

          prevId = Path.id(prevPath);
          nextId = Path.id(nextPath);

          subject.notify(function(observer: IListObserver) {
            observer.onInvalidate(prevId, nextId);
          });
        }
      });
      return value;
    }));

    cache.observe({
      onInvalidate: function(prev, next) {
        var prevId = Path.id(Tree.prev(list, [prev])),
            nextId = Path.id(Tree.next(list, [next]));

        subject.notify(function(observer: IListObserver) {
          observer.onInvalidate(prevId, nextId);
        })
      }
    });

    var { has, get, next, prev } = List.flatten<V>(cache)
    return { has, get, next, prev, observe: subject.observe }
  }

  static flatMap<V, W>(list: IObservableList<V>, flatMapFn:(value: V, id?: Id) => IObservableList<W>): IObservableList<W> {
    return ObservableList.flatten<W>(ObservableList.map(list, flatMapFn));
  }

  static cache<V>(list: IObservableList<V>): IObservableList<V> {
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

    list.observe({
      onInvalidate: function(prev: Id, next: Id) {
        var id: Id;

        id = prev;
        while((id = nextCache[id]) != null) {
          delete nextCache[prevCache[id]];
          delete prevCache[id];
          if(id == next) break;
          delete valueCache[id];
        }

        while((id = prevCache[id]) != null) {
          delete prevCache[nextCache[id]];
          delete nextCache[id];
          if(id == prev) break;
          delete valueCache[id];
        }
      }
    });

    return {has, get, prev, next, observe: list.observe};
  }
}

export default ObservableList;
