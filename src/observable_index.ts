import Key from './key';
import Index from './index';
import { Subject, ISubscription } from './observable';
import { IObservableList, IListObserver } from './observable_list';

export class ObservableIndex<V> extends Index<V> implements IObservableList<V>, IListObserver {
  protected _list: IObservableList<V>;
  protected _byKey: {[key: string]: number};
  protected _subject: Subject<IListObserver>;

  constructor(list: IObservableList<V>) {
    super(list);

    this._byKey = Object.create(null);
    this._subject = new Subject<IListObserver>();
    list.observe(this);
  }

  has = (index: number): boolean => {
    if(index >= 0 && index < this._byIndex.length) return true;

    var next: Key,
        last = this._byIndex.length - 1;

    while(last != index) {
      next = this._list.next(this._byIndex[last]);
      if(next == null) return false;
      this._byIndex[++last] = next;
      this._byKey[next] = last;
    }

    return true;
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  onInvalidate = (prev: Key, next: Key) => {
    var prevIndex = this._byKey[prev],
        length    = this._byIndex.length,
        index     = prevIndex;

    while(++index < length) delete this._byKey[this._byIndex[index]];
    this._byIndex.splice(prevIndex + 1);

    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(prevIndex, null);
    });
  }
}

export default ObservableIndex;
