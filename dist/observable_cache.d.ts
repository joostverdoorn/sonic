import Cache from './cache';
import { ISubscription } from './observable';
import { IObservableList, IListObserver, ListSubject } from './observable_list';
export declare class ObservableCache<V> extends Cache<V> implements IObservableList<V>, IListObserver {
    protected _list: IObservableList<V>;
    protected _subject: ListSubject;
    constructor(list: IObservableList<V>);
    observe: (observer: IListObserver) => ISubscription;
    onInvalidate: (prev: string | number, next: string | number) => void;
}
export default ObservableCache;
