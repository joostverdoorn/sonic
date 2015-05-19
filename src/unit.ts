import Id from './id';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';


export class Unit<V> extends MutableList<V> {
  private _id: Id;
  private _value: V;
  private _subject: ISubject<IListObserver>;

  constructor(value?: V) {
    super();

    this._subject = new Subject();
    if(arguments.length) this.splice(null, null, value);
  }

  has = (id: Id) => {
    return this._id == id;
  }

  get = (id: Id) => {
    if(this.has(id)) return this._value ;
  }

  prev = (id: Id) => {
    if(id == null) return this._id;
    return null;
  }

  next = (id: Id) => {
    if(id == null) return this._id;
    return null;
  }

  set = (id: Id, value: V): Id => {
    this._id = id;
    this._value = value;
    this._invalidate();

    return id;
  }

  splice = (prev: Id, next: Id, ...values: V[]): void => {
    if(values.length) this.set(Id.create(), values[0]); return;

    delete this._id;
    delete this._value;
    this._invalidate();
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  private _invalidate = (prev?: Id, next?: Id) => {
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    })
  }
}

export default Unit;
