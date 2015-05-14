import compose  from './compose'
import Id       from './id';
import uniqueId from './unique_id';
import { List, IList } from './list';
import { Observable, IObservable, ISubscription, INotifier } from './observable';

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

  observe(observer: IListObserver): ISubscription {
    throw new Error("Not implemented");
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

  static reverse<V>(list: IObservableList<V>): ObservableList<V> {
    var { has, get, prev, next } = List.reverse(list);

    function observe(observer: IListObserver) {
      return list.observe(observer);
    }

    return ObservableList.create({has, get, prev, next, observe});
  }

  static map<V, W>(list: IObservableList<V>, mapFn: (value: V, id?: Id) => W): ObservableList<W> {
    var { has, prev, next, observe }  = list;
    function get(id: Id) {
      return mapFn(list.get(id), id);
    }
    return ObservableList.create({has, get, prev, next, observe});
  }

  static filter<V>(list: IObservableList<V>, filterFn: (value: V, id?: Id) => boolean): ObservableList<V> {
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

    return ObservableList.create({has, get, prev, next, observe});
  }

  static flatten<V>(list: IObservableList<IObservableList<V>>): IObservableList<V>;
  static flatten(list: IObservableList<any>): IObservableList<any> {
    var cache: IObservableList<any>;
    var subscriptions = Object.create(null);
    var notify: (notifier: INotifier<IListObserver>) => void;
    var observable = new Observable(function(n) { notify = n; })

    list.observe({
      onInvalidate: function(prev, next) {
        var id: Id;

        id = prev;
        while((id = cache.next(id)) != null && id != next) {
          var subscription = subscriptions[id.toString()];
          if (subscription) {
            subscription.unsubscribe();
            delete subscriptions[id.toString()];
          }
        }

        id = next;
        while((id = cache.prev(id)) != null && id != prev) {
          var subscription = subscriptions[id.toString()];
          if (subscription) {
            subscription.unsubscribe();
            delete subscriptions[id.toString()];
          }
        }
      }
    });

    cache = ObservableList.cache(ObservableList.map(list, function(value, id) {
      subscriptions[id.toString()] = value.observe({
        onInvalidate: function(prev: Id, next: Id) {
          notify(function(observer: IListObserver) {
            var p = [].concat(id).concat(prev),
                n = [].concat(id).concat(next);

            observer.onInvalidate(p, n);
          });
        }
      })
      return value;
    }));

    cache.observe({
      onInvalidate: function(prev, next) {
        var _prev = cache.get(prev).prev(),
            _next = cache.get(next).next();

        notify(function(observer: IListObserver) {
          var p = [].concat(prev).concat(_prev),
              n = [].concat(next).concat(_next);

          observer.onInvalidate(p, n);
        })
      }
    });

    var { has, get, next, prev } = List.flatten(cache)
    return { has, get, next, prev, observe: observable.observe }
  }

  static cache<V>(list: IObservableList<V>): IObservableList<V> {
    var _get = Object.create(null),
        _next = Object.create(null),
        _prev = Object.create(null);

    function has(id: Id) : boolean {
      if (id == null) return false;
      return id.toString() in _get || list.has(id);
    }

    function get(id: Id) : V {
      if (id == null) return undefined;
      var idString = id.toString();

      if(idString in _get) {
        return _get[idString]
      }

      if(list.has(id)) {
        return _get[idString] = list.get(id);
      }
    }

    function prev(id: Id): Id {
      if (id == null) return list.prev();
      var idString = id.toString();

      if(idString in _prev) {
        return _prev[idString];
      }

      if(list.prev(id) != null) {
        var prevId = _prev[idString] = list.prev(id);
        _next[prevId.toString()] = id;
        return prevId
      }
    }

    function next(id: Id): Id {
      if (id == null) return list.next();
      var idString = id.toString();

      if(idString in _next) {
        return _next[idString];
      }

      if(list.next(id) != null) {
        var nextId = _next[idString] = list.next(id);
        _prev[nextId.toString()] = id;
        return nextId
      }
    }

    list.observe({
      onInvalidate: function(prev, next) {
        var nextId: Id = prev,
          prevId: Id = next;

        while (nextId != null && (nextId = _next[nextId.toString()])) {
          delete _next[_prev[nextId.toString()]];
          delete _prev[nextId.toString()];
          if (next != null && nextId.toString() == next.toString()) break;
          delete _get[nextId.toString()];
        }

        while (prevId != null && (prevId = _prev[prevId.toString()])) {
          delete _prev[_next[prevId.toString()]];
          delete _next[prevId.toString()];
          if (prev != null && prevId.toString() == prev.toString()) break;
          delete _get[prevId.toString()];
        }
      }
    })

    return {has, get, prev, next, observe: list.observe};
  }
}

export default ObservableList;
