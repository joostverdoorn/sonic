import Key from './key';
import Index from './index';
import { Subject, ISubscription } from './observable';
import { IObservableList, IListObserver, ListSubject } from './observable_list';

export class ObservableIndex<V> extends Index<V> implements IObservableList<V>, IListObserver {
  protected _list: IObservableList<V>;
  protected _byKey: {[key: string]: number};
  protected _subject: ListSubject;

  constructor(list: IObservableList<V>) {
    super(list);

    this._byKey = Object.create(null);
    this._subject = new ListSubject();
    list.observe(this);
  }

  protected _add = (key: Key, index: number) => {
    this._byIndex[index] = key;
    this._byKey[key] = index;
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

    this._subject.onInvalidate(prevIndex, null);
  }
}

export default ObservableIndex;
