import Key from './key';
import State from './state';
import { Observer, Observable, Subscription, Subject } from './observable';
import { Patch } from './patch';
export declare class List<V> implements State<V>, Observable<V> {
    state: State<V>;
    protected _subject: Subject<V>;
    constructor(initial?: State<V>);
    get: (key: Key) => Promise<V>;
    prev: (key: Key) => Promise<Key>;
    next: (key: Key) => Promise<Key>;
    add(key: Key, value: V): Promise<void>;
    replace(key: Key, value: V): Promise<void>;
    remove(key: Key): Promise<void>;
    observe(observer: Observer<V>): Subscription;
    onInvalidate(patches: Patch<V>[]): Promise<void>;
}
export declare module List {
    function reverse<V>(old: List<V>): List<V>;
    function map<V, W>(old: List<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): List<W>;
    function filter<V>(old: List<V>, filterFn: (value: V, key?: Key) => boolean): List<V>;
}
export default List;
