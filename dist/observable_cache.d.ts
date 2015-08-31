import Cache from './cache';
import { ISubscription } from './observable';
import { IObservableList, IListObserver, ListSubject } from './observable_list';
export declare class ObservableCache<V> extends Cache<V> implements IObservableList<V>, IListObserver {
    protected _list: IObservableList<V>;
    protected _subject: ListSubject;
    constructor(list: IObservableList<V>);
    observe: (observer: IListObserver) => ISubscription;
    onInvalidate: (range?: number | string | [number | string, number | string]) => void;
}
export default ObservableCache;
