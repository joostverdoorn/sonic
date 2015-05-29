import Key from './key';
import Cache from './cache';
import {IObservableList, IListObserver} from './observable_list';
import {ISubscription} from './observable';

export default class ObservableCache<V> extends Cache<V> implements IObservableList<V> {
  protected _list: IObservableList<V>;

  constructor(list: IObservableList<V>) {
    super(list)

    list.observe({
      onInvalidate: (prev: Key, next: Key) => {
        var key: Key;

        key = prev;
        while((key = this._next[key]) !== undefined) {
          delete this._next[this._prev[key]];
          delete this._prev[key];
          if(key == next) break;
          delete this._byKey[key];
        }

        while((key = this._prev[key]) !== undefined) {
          delete this._prev[this._next[key]];
          delete this._next[key];
          if(key == prev) break;
          delete this._byKey[key];
        }
      }
    });
  }

  public observe(observer: IListObserver): ISubscription {
    return this._list.observe(observer);
  }
}
