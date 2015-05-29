import {IList} from './list';
import Key from './key';

export default class Cache<V> implements IList<V> {
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

  has(key: Key): boolean {
    return key in this._byKey || this._list.has(key);
  }

  get(key: Key): V {
    if(key in this._byKey) return this._byKey[key];
    if(this._list.has(key)) return this._byKey[key] = this._list.get(key);
    return;
  }

  prev(key: Key): Key {
    if(key in this._prev) return this._prev[key];

    var prevKey = this._list.prev(key);
    if(prevKey == null) prevKey = null;

    this._prev[key] = prevKey;
    this._next[prevKey] = key;

    return prevKey;
  }

  next(key: Key = null): Key {
    if(key in this._next) return this._next[key];

    var nextKey = this._list.next(key);
    if(nextKey == null) nextKey = null;

    this._next[key] = nextKey;
    this._prev[nextKey] = key;

    return nextKey;
  }
}
