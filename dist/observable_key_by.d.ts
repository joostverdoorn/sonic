import Key from './key';
import KeyBy from './key_by';
import { Subject, ISubscription } from './observable';
import { IObservableList, IListObserver } from './observable_list';
export declare class ObservableKeyBy<V> extends KeyBy<V> implements IObservableList<V>, IListObserver {
    protected _list: IObservableList<V>;
    protected _subject: Subject<IListObserver>;
    constructor(list: IObservableList<V>, keyFn: (value: V, key?: Key) => Key);
    observe: (observer: IListObserver) => ISubscription;
    onInvalidate: (prev: string | number, next: string | number) => void;
}
export default ObservableKeyBy;
