import Key from './key';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';

export default class Unit<V> extends MutableList<V> {
  private _key: Key;
  private _value: V;
  private _subject: ISubject<IListObserver>;

  constructor(value?: V) {
    super();

    this._subject = new Subject();
    if(arguments.length) this.splice(null, null, value);
  }

  has = (key: Key) => {
    return this._key == key;
  }

  get = (key: Key) => {
    if(this.has(key)) return this._value ;
  }

  prev = (key: Key) => {
    if(key == null) return this._key;
    return null;
  }

  next = (key: Key) => {
    if(key == null) return this._key;
    return null;
  }

  set = (key: Key, value: V): void => {
    this._key = key;
    this._value = value;
    this._invalidate();
  }

  splice = (prev: Key, next: Key, ...values: V[]): void => {
    if(values.length) return this.set(Key.create(), values[0]);

    delete this._key;
    delete this._value;
    this._invalidate();
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  private _invalidate = (prev?: Key, next?: Key) => {
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    })
  }
}
