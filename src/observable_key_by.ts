import Key from './key';
import KeyBy from './key_by';
import { Subject, ISubscription } from './observable';
import { IObservableList, IListObserver } from './observable_list';

export class ObservableKeyBy<V> extends KeyBy<V> implements IObservableList<V>, IListObserver {
  protected _list: IObservableList<V>;
  protected _subject: Subject<IListObserver>;

  constructor(list: IObservableList<V>, keyFn: (value: V, key?: Key) => Key) {
    super(list, keyFn);

    this._subject = new Subject<IListObserver>();
    list.observe(this);
  }

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  onInvalidate = (prev: Key, next: Key) => {
    this._subject.notify(function(observer: IListObserver) {
      observer.onInvalidate(this._keyBySourceKey[prev], this._keyBySourceKey[next]);
    });
  }
}

export default ObservableKeyBy;
