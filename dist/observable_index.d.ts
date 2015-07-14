import Index from './index';
import { ISubscription } from './observable';
import { IObservableList, IListObserver, ListSubject } from './observable_list';
export declare class ObservableIndex<V> extends Index<V> implements IObservableList<V>, IListObserver {
    protected _list: IObservableList<V>;
    protected _byKey: {
        [key: string]: number;
    };
    protected _subject: ListSubject;
    constructor(list: IObservableList<V>);
    protected _add: (key: string | number, index: number) => void;
    observe: (observer: IListObserver) => ISubscription;
    onInvalidate: (range: string | number | [string | number, string | number]) => void;
}
export default ObservableIndex;
