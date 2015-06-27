import Key from './key';
import ObservableCache from './observable_cache';
import { IMutableList } from './mutable_list';

export class MutableCache<V> extends ObservableCache<V> implements IMutableList<V> {
  protected _list: IMutableList<V>;

  constructor(list: IMutableList<V>) {
    super(list);
  }

  set = (key: Key, value: V): Promise<void> => {
    return this._list.set(key, value);
  }

  splice = (prev: Key, next: Key, ...values: V[]): Promise<void> => {
    return this._list.splice(prev, next, ...values);
  }
}

export default MutableCache;
