import Key     from './key';
import { IList } from './list';

export class KeyBy<V> implements IList<V> {
  protected _sourceKeyByKey: {[key: string]: Key};
  protected _keyBySourceKey: {[key: string]: Key};
  protected _keyFn: (value: V, key?: Key) => Key;
  protected _list: IList<V>;

  constructor(list: IList<V>, keyFn: (value: V, key?: Key) => Key) {
    this._list = list;
    this._keyFn = keyFn;

    this._sourceKeyByKey = Object.create(null);
    this._keyBySourceKey  = Object.create(null);
  }

  has = (key: Key): boolean => {
    if(key in this._sourceKeyByKey) return true;

    var last: Key = null;
    while((last = this.next(last)) != null) if(last == key) return true;
    return false;
  }

  get = (key: Key): V => {
    return this.has(key) ? this._list.get(this._sourceKeyByKey[key]) : undefined;
  }

  prev = (key: Key): Key => {
    if(this.has(key) || key == null) return this._keyBySourceKey[this._list.prev(this._sourceKeyByKey[key])];
  }

  next = (key: Key = null): Key => {
    var sourceKey: Key, sourceNext: Key, res: Key;

    if(key in this._sourceKeyByKey) sourceKey = this._sourceKeyByKey[key];
    else sourceKey = null;

    while(key != null && !(key in this._sourceKeyByKey)) {
      sourceKey = this._list.next(sourceKey);

      if (!(sourceKey in this._keyBySourceKey)) {
        if (sourceKey == null) return null;
        res = this._keyFn(this._list.get(sourceKey), sourceKey);
        this._keyBySourceKey[sourceKey] = res;
        this._sourceKeyByKey[res] = sourceKey;

        if (res == key) break;
      }
    }

    sourceKey = this._list.next(sourceKey);
    if (sourceKey == null) return null;
    res = this._keyFn(this._list.get(sourceKey), sourceKey);
    this._keyBySourceKey[sourceKey] = res;
    this._sourceKeyByKey[res] = sourceKey;

    return res;
  }
}

export default KeyBy;
