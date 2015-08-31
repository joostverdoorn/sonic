import Key from './key';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver, ListSubject } from './observable_list';
import { MutableList } from './mutable_list';

export default class Unit<V> extends MutableList<V> {
  private _key: Key;
  private _value: V;
  private _subject: ListSubject;

  constructor(value?: V) {
    super();

    this._subject = new ListSubject();
    if(arguments.length) this.splice(null, null, value);
  }

  get(key: Key): Promise<V> {
    if(key === this._key) return Promise.resolve(this._value);
    Promise.reject<V>(new Error);
  }

  prev(key: Key): Promise<Key> {
    if(key == null) return Promise.resolve(this._key);
    if(key === this._key) return Promise.resolve(null);
    return Promise.reject<Key>(new Error);
  }

  next(key: Key) {
    if(key == null) return Promise.resolve(this._key);
    if(key === this._key) return Promise.resolve(null);
    return Promise.reject<Key>(new Error);
  }

  set(key: Key, value: V): Promise<void> {
    this._key = key;
    this._value = value;
    this._subject.onInvalidate([null, null]);

    return Promise.resolve();
  }

  splice(prev: Key, next: Key, ...values: V[]): Promise<void> {
    if(values.length) return this.set(Key.create(), values[0]);

    delete this._key;
    delete this._value;
    this._subject.onInvalidate([null, null]);

    return Promise.resolve();
  }

  observe(observer: IListObserver): ISubscription {
    return this._subject.observe(observer);
  }
}
