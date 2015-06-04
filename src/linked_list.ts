import Key                                  from './key';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver }                    from './observable_list';
import { MutableList }                      from './mutable_list';

export default class LinkedList<V> extends MutableList<V> {
  private _byKey: {[key: string]: V};
  private _next: {[key: string]: Key};
  private _prev: {[key: string]: Key};
  private _subject: ISubject<IListObserver>;
  private _keyFn: (value: V) => Key  = Key.create;

  constructor(values: V[], keyFn?: (value: V) => Key) {
    super();

    if(keyFn) this._keyFn = keyFn;
    this._subject = new Subject();
    this._byKey = Object.create(null);
    this._prev = Object.create(null);
    this._next = Object.create(null);

    this._prev[<Key> null] = null;
    this._next[<Key> null] = null;

    this.splice(null, null, ...values);
  }

  has = (key: Key) => {
    return key in this._byKey;
  }

  get = (key: Key) => {
    return this._byKey[key];
  }

  prev = (key: Key = null) => {
    var prev = this._prev[key];
    return prev == null ? null : prev;
  }

  next = (key: Key = null) => {
    var next = this._next[key];
    return next == null ? null : next;
  }

  set = (key: Key, value: V): Key => {
    if(!this.has(key)) return null;

    this._byKey[key] = value;
    this._invalidate(this._prev[key], this._next[key])
    return key;
  }

  splice = (prev: Key = null, next: Key = null, ...values: V[]): void => {
    var key: Key,
        value: V;

    key = prev;
    while((key = this._next[key]) != null) {
      delete this._next[this._prev[key]];
      delete this._prev[key];
      if(key == next) break;
      delete this._byKey[key];
    }

    key = next;
    while((key = this._prev[key]) != null) {
      delete this._prev[this._next[key]];
      delete this._next[key];
      if(key == prev) break;
      delete this._byKey[key];
    }

    var _key = prev;
    for(value of values) {
      key = this._keyFn(value);
      this._byKey[key] = value;
      this._prev[key] = _key;
      this._next[_key] = key;
      _key = key;
    }

    this._prev[next] = _key;
    this._next[_key] = next;

    this._invalidate(prev, next);
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  private _invalidate = (prev?: Key, next?: Key) => {
    if(!this.has(prev)) prev = null;
    if(!this.has(next)) next = null;
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prev, next);
    })
  }
}
