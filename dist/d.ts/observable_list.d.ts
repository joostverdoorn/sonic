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
    observe: (observer: IListObserver) => ISubscription;
    reverse: () => ObservableList<V>;
    map: <W>(mapFn: (value: V, id?: string | number) => W) => ObservableList<W>;
    filter: (filterFn: (value: V, id?: string | number) => boolean) => ObservableList<V>;
    flatten: () => ObservableList<any>;
    flatMap: <W>(flatMapFn: (value: V, id?: string | number) => IObservableList<W>) => ObservableList<W>;
    cache: () => List<V>;
    static isObservableList(obj: any): boolean;
    static create<V>(list: IObservableList<V>): ObservableList<V>;
    static reverse<V>(list: IObservableList<V>): IObservableList<V>;
    static map<V, W>(list: IObservableList<V>, mapFn: (value: V, id?: Id) => W): IObservableList<W>;
    static filter<V>(list: IObservableList<V>, filterFn: (value: V, id?: Id) => boolean): IObservableList<V>;
    static flatten<V>(list: IObservableList<IObservableList<V> | V | any>): IObservableList<V>;
    static flatMap<V, W>(list: IObservableList<V>, flatMapFn: (value: V, id?: Id) => IObservableList<W>): IObservableList<W>;
    static cache<V>(list: IObservableList<V>): IObservableList<V>;
}
export default ObservableList;
