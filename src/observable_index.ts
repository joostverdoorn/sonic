import Key from './key';
import Range from './range';
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

  onInvalidate = (range: Range) => {
    var index: number,
        length = this._byIndex.length;

    var index = Array.isArray(range) ? this._byKey[range[0]] : this._byKey[range];

    while(index++ < length) delete this._byKey[this._byIndex[index]];
    this._byIndex.splice(index);
    this._subject.onInvalidate([index == 0 ? null : index - 1, null]);
  }
}

export default ObservableIndex;
