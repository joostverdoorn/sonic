import Id from './id';
import { List, IList } from './list';
import { IObservable, ISubscription } from './observable';
export interface IListObserver {
    onInvalidate: (prev: Id, next: Id) => void;
}
export interface IObservableList<V> extends IList<V>, IObservable<IListObserver> {
}
export declare class ObservableList<V> extends List<V> implements IObservableList<V> {
    constructor(list?: IObservableList<V>);
    observe(observer: IListObserver): ISubscription;
    static isObservableList(obj: any): boolean;
    static create<V>(list: IObservableList<V>): ObservableList<V>;
    static reverse<V>(list: IObservableList<V>): ObservableList<V>;
    static map<V, W>(list: IObservableList<V>, mapFn: (value: V, id?: Id) => W): ObservableList<W>;
    static filter<V>(list: IObservableList<V>, filterFn: (value: V, id?: Id) => boolean): ObservableList<V>;
    static flatten<V>(list: IObservableList<IObservableList<V>>): IObservableList<V>;
    static cache<V>(list: IObservableList<V>): IObservableList<V>;
}
export default ObservableList;
