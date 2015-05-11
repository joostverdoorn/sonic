import compose  from './compose'
import Id       from './id';
import uniqueId from './unique_id';
import { List,       IList } from './list';
import { IObservable, ISubscription, INotifier } from './observable';

export interface IListObserver {
  onInvalidate: (prev: Id, next: Id) => void;
}

export interface IObservableList<V> extends IList<V>, IObservable<IListObserver> {};

export class ObservableList<V> extends List<V> implements IObservableList<V> {
  private _observers: Object;

  static isObservableList(obj: any) {
    return List.isList(obj) && !!obj['observe'];
  }

  constructor() {
    super()
    this._observers = Object.create(null);
  }

  observe = (observer: IListObserver): ISubscription => {
    var observerId = uniqueId();
    var observers = this._observers;
    observers[observerId] = observer;

    return {
      unsubscribe: function() { delete observers[observerId]; }
    };
  }

  protected _notify(notifier: INotifier<IListObserver>) {
    for(var observerId in this._observers) notifier(this._observers[observerId]);
  }

  protected _invalidate = (prev?: Id, next?: Id) => {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    this._notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    });
  }

  static create<V>(list: IObservableList<V>): ObservableList<V> {
    var obj = {
      has: list.has,
      get: list.get,
      prev: list.prev,
      next: list.next,
      observe: list.observe
    };

    return <ObservableList<V>> ObservableList.call(obj);
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
    return ObservableList.create({has, get: compose(mapFn, list.get), prev, next, observe});
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
}
