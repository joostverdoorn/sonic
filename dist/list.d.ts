import Key from './key';
import State from './state';
import { IObservable, ISubscription, Subject } from './observable';
export interface ListObserver {
    onInvalidate<V>(...events: ListEvent<V>[]): void;
}
export declare enum EventType {
    "add" = 0,
    "remove" = 1,
    "replace" = 2,
}
export interface ListEvent<V> {
    type: EventType;
    key: Key;
    value?: V;
    oldValue?: V;
}
export declare class List<V> implements State<V>, IObservable<ListObserver> {
    state: State<V>;
    protected _subject: Subject<ListObserver>;
    constructor(initial?: State<V>);
    get: (key: Key) => Promise<V>;
    prev: (key: Key) => Promise<Key>;
    next: (key: Key) => Promise<Key>;
    add(key: Key, value: V): Promise<void>;
    replace(key: Key, value: V): Promise<void>;
    remove(key: Key): Promise<void>;
    observe(observer: ListObserver): ISubscription;
    onInvalidate(...events: ListEvent<V>[]): void;
}
export declare module List {
    function map<V, W>(old: List<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): List<W>;
}
export default List;
