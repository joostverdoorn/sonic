import Key from './key';
import { IList } from './list';

export class Cache<V> implements IList<V> {
  protected _byKey: {[key: string]: V};
  protected _next: {[key: string]: Key};
  protected _prev: {[key: string]: Key};
  protected _list: IList<V>;

  constructor(list: IList<V>) {
    this._byKey = Object.create(null),
    this._next = Object.create(null),
    this._prev = Object.create(null);
    this._list = list;
  }

  get = (key: Key): Promise<V> => {
    if(key in this._byKey) return Promise.resolve(this._byKey[key]);
    return this._list.get(key).then(value => this._byKey[key] = value);
  }

  prev = (key: Key = null): Promise<Key> => {
    if(key in this._prev) return Promise.resolve(this._prev[key]);
    return this._list.prev(key).then(prev => {
      this._prev[key] = prev;
      this._next[prev] = key;
      return prev;
    });
  }

  next = (key: Key = null): Promise<Key> => {
    if(key in this._next) return Promise.resolve(this._next[key]);
    return this._list.next(key).then(next => {
      this._next[key] = next;
      this._prev[next] = key;
      return next;
    });
  }
}

export default Cache;
