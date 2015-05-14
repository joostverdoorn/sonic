import Id         from './id';
import uniqueId   from './unique_id';
import Observable from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';

export default class Unit<V> extends MutableList<V> {

  private _id: Id;
  private _value: V;
  private _invalidate: (prev?: Id, next?: Id) => void;

  constructor(value: V) {
    super();
    if(arguments.length > 2) this.splice(null, null, value);

    new Observable((notifier) => {
      this._invalidate = function(prev: Id, next: Id) {
        notifier(function(observer: IListObserver) {
          observer.onInvalidate(prev, next)
        });
      }
    });
  }

  has(id: Id) {
    return this._id == id;
  }

  get(id: Id) {
    if(this.has(id)) return this._value ;
  }

  prev(id: Id) {
    if(id == null) return this._id;
    return null;
  }

  next(id: Id) {
    if(id == null) return this._id;
    return null;
  }

  set(id: Id, value: V) {
    this._id = id;
    this._value = value;
    this._invalidate();

    return true;
  }

  splice(prev: Id, next: Id, ...values: V[]) {
    if(values.length) return this.set(uniqueId(), values[0]);

    delete this._id;
    delete this._value;
    this._invalidate();

    return true;
  }
}
