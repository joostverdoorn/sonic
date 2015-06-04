import Index from './index';
import { Subject, ISubscription } from './observable';
import { IObservableList, IListObserver } from './observable_list';
export declare class ObservableIndex<V> extends Index<V> implements IObservableList<V>, IListObserver {
    protected _list: IObservableList<V>;
    protected _byKey: {
        [key: string]: number;
    };
    protected _subject: Subject<IListObserver>;
    constructor(list: IObservableList<V>);
    has: (index: number) => boolean;
    observe: (observer: IListObserver) => ISubscription;
    onInvalidate: (prev: string | number, next: string | number) => void;
}
export default ObservableIndex;
