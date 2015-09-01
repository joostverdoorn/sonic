import Key from './key';
import Range from './range';
import Cache from './cache';
import { ISubscription } from './observable';
import { IObservableList, IListObserver, ListSubject } from './observable_list';

export class ObservableCache<V> extends Cache<V> implements IObservableList<V>, IListObserver {
  protected _list: IObservableList<V>;
  protected _subject: ListSubject;

  constructor(list: IObservableList<V>) {
    super(list)
    this._subject = new ListSubject();
    list.observe(this);
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  onInvalidate = (range?: Range) => {
    if(!Array.isArray(range)) {
      var prev = this._prev[range],
          next = this._next[range];

      if(prev != null) {
        delete this._next[prev];
        delete this._prev[range];
      }

      if(next != null) {
        delete this._prev[next];
        delete this._next[range];
      }

      delete this._byKey[range];

      return this._subject.onInvalidate(range)
    }

    var [prev, next] = <[Key, Key]> range,
        key: Key;

    key = prev;
    while((key = this._next[key]) !== undefined) {
      delete this._next[this._prev[key]];
      delete this._prev[key];
      if(key == next) break;
      delete this._byKey[key];
    }

    key = next;
    while((key = this._prev[key]) !== undefined) {
      delete this._prev[this._next[key]];
      delete this._next[key];
      if(key == prev) break;
      delete this._byKey[key];
    }

    this._subject.onInvalidate(range);
  }
}

export default ObservableCache;
