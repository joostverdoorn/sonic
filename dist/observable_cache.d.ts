import Cache from './cache';
import { IObservableList, IListObserver } from './observable_list';
import { ISubscription } from './observable';
export default class ObservableCache<V> extends Cache<V> implements IObservableList<V> {
    protected _list: IObservableList<V>;
    constructor(list: IObservableList<V>);
    observe(observer: IListObserver): ISubscription;
}
