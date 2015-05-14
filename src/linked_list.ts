import Id       from './id';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';


export default class LinkedList<V> extends MutableList<V> {
  private _byId: Object;
  private _next: Object;
  private _prev: Object;
  private _subject: ISubject<IListObserver>;

  constructor(array: V[]) {
    super();

    this._subject = new Subject();
    this._byId = Object.create(null);
    this._prev = Object.create(null);
    this._next = Object.create(null);

    this._prev[<number> null] = null;
    this._next[<number> null] = null;

    this.splice(null, null, ...array);
  }

  has = (id: number) => {
    return id in this._byId;
  }

  get = (id: number) => {
    return this._byId[id];
  }

  prev = (id: number = null) => {
    var prev = this._prev[id];
    return prev == null ? null : prev;
  }

  next = (id: number = null) => {
    var next = this._next[id];
    return next == null ? null : next;
  }

  set = (id: number, value: V) => {
    if(!this.has(id)) return false;

    this._byId[id] = value;
    this._invalidate(this._prev[id], this._next[id])
    return true;
  }

  splice = (prev: number = null, next: number = null, ...values: V[]) => {
    var id: number,
        value: V;

    id = prev;
    while((id = this._next[id]) != null) {
      delete this._next[this._prev[id]];
      delete this._prev[id];
      if(id == next) break;
      delete this._byId[id];
    }

    id = next;
    while((id = this._prev[id]) != null) {
      delete this._prev[this._next[id]];
      delete this._next[id];
      if(id == prev) break;
      delete this._byId[id];
    }

    var _id = prev;
    for(value of values) {
      id = Id.create();
      this._byId[id] = value;
      this._prev[id] = _id;
      this._next[_id] = id;
      _id = id;
    }

    this._prev[next] = _id;
    this._next[_id] = next;

    this._invalidate(prev, next);
    return true;
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  private _invalidate = (prev?: number, next?: number) => {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    })
  }
}
