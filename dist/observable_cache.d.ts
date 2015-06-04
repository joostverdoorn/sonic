import Cache from './cache';
import { ISubscription } from './observable';
import { IObservableList, IListObserver } from './observable_list';
export declare class ObservableCache<V> extends Cache<V> implements IObservableList<V> {
    protected _list: IObservableList<V>;
    constructor(list: IObservableList<V>);
    observe: (observer: IListObserver) => ISubscription;
    onInvalidate: (prev: string | number, next: string | number) => void;
}
export default ObservableCache;
