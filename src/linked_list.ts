import Key                                  from './key';
import { Subject, ISubject, ISubscription } from './observable';
import { IListObserver, ListSubject }       from './observable_list';
import { MutableList }                      from './mutable_list';

export default class LinkedList<V> extends MutableList<V> {
  private _byKey: {[key: string]: V};
  private _next: {[key: string]: Key};
  private _prev: {[key: string]: Key};
  private _subject: ListSubject;
  private _keyFn: (value: V) => Key  = Key.create;

  constructor(values: V[], keyFn?: (value: V) => Key) {
    super();

    if(keyFn) this._keyFn = keyFn;
    this._subject = new ListSubject();
    this._byKey = Object.create(null);
    this._prev = Object.create(null);
    this._next = Object.create(null);

    this._prev[<Key> null] = null;
    this._next[<Key> null] = null;

    this.splice(null, null, ...values);
  }

  get = (key: Key): Promise<V> => {
    if(!(key in this._byKey)) return Promise.reject<V>(new Error);
    return Promise.resolve(this._byKey[key]);
  }

  prev = (key: Key = null): Promise<Key> => {
    if(!(key in this._prev)) return Promise.reject<Key>(new Error);
    return Promise.resolve(this._prev[key]);
  }

  next = (key: Key = null) => {
    if(!(key in this._next)) return Promise.reject<Key>(new Error);
    return Promise.resolve(this._next[key]);
  }

  set = (key: Key, value: V): Promise<void> => {
    if(!(key in this._byKey)) return Promise.reject(new Error);

    this._byKey[key] = value;
    this._subject.onInvalidate(this._prev[key], this._next[key])
    return Promise.resolve();
  }

  splice = (prev: Key = null, next: Key = null, ...values: V[]): Promise<void> => {
    var key = prev,
        value: V;

    while((key = this._next[key]) != null) {
      delete this._next[this._prev[key]];
      delete this._prev[key];
      if(key == next) break;
      delete this._byKey[key];
    }

    var _key = next;
    for(value of values) {
      key = this._keyFn(value);
      if(key in this._byKey) this.splice(this._prev[key], this._next[key]);
      this._byKey[key] = value;
      this._prev[key] = _key;
      this._next[_key] = key;
      _key = key;
    }

    this._prev[next] = _key;
    this._next[_key] = next;

    this._subject.onInvalidate(prev, next);
    return Promise.resolve();
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }
}
