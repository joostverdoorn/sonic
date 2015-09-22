import Key from './key';
import Range from './range';
import { List, IList } from './list';
import { Subject, IObservable, ISubscription } from './observable';
export interface IListObserver {
    onInvalidate: (range: Range) => void;
}
export declare class ListSubject extends Subject<IListObserver> {
    onInvalidate: (range: number | string | [number | string, number | string]) => void;
}
export interface IObservableList<V> extends IList<V>, IObservable<IListObserver> {
}
export declare abstract class ObservableList<V> extends List<V> implements IObservableList<V> {
    abstract observe(observer: IListObserver): ISubscription;
    static create<V>(list: IObservableList<V>): ObservableList<V>;
    reverse(): ObservableList<V>;
    map<W>(mapFn: (value: V, key?: Key) => W): ObservableList<W>;
    filter(filterFn: (value: V, key?: Key) => boolean): ObservableList<V>;
    flatten(): ObservableList<any>;
    flatMap<W>(flatMapFn: (value: V, key?: Key) => IObservableList<W>): ObservableList<W>;
    cache(): ObservableList<V>;
    index(): ObservableList<V>;
    zip<W, U>(other: IObservableList<W>, zipFn: (v: V, w: W) => U): ObservableList<U>;
    skip(k: number): IObservableList<V>;
    take(n: number): IObservableList<V>;
    range(k: number, n: number): IObservableList<V>;
    scan<W>(scanFn: (memo: W, value: V) => W, memo?: W): ObservableList<W>;
    static isObservableList(obj: any): boolean;
    static reverse<V>(list: IObservableList<V>): IObservableList<V>;
    static map<V, W>(list: IObservableList<V>, mapFn: (value: V, key?: Key) => W): IObservableList<W>;
    static filter<V>(list: IObservableList<V>, filterFn: (value: V, key?: Key) => boolean): IObservableList<V>;
    static flatten<V>(list: IObservableList<IObservableList<V> | V | any>): IObservableList<V>;
    static flatMap<V, W>(list: IObservableList<V>, flatMapFn: (value: V, key?: Key) => IObservableList<W>): IObservableList<W>;
    static cache<V>(list: IObservableList<V>): IObservableList<V>;
    static index<V>(list: IObservableList<V>): IObservableList<V>;
    static zip<V, W, U>(list: IObservableList<V>, other: IObservableList<W>, zipFn: (v: V, w: W) => U): IObservableList<U>;
    static skip<V>(list: IObservableList<V>, k: number): IObservableList<V>;
    static take<V>(list: IObservableList<V>, n: number): IObservableList<V>;
    static range<V>(list: IObservableList<V>, k: number, n: number): IObservableList<V>;
    static scan<V, W>(list: IObservableList<V>, scanFn: (memo: W, value: V, key?: Key) => W, memo?: W): IObservableList<W>;
}
export default ObservableList;
