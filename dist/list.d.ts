import Key from './key';
import State from './state';
import { Observer, Observable, Disposable } from './observable';
import { Patch } from './patch';
export interface List<V> extends Observable<Patch<V>> {
    state: State<V>;
    subscribe: (observer: Observer<Patch<V>>) => Disposable;
}
export declare module List {
    function create<V>(state: State<V>, observable: Observable<Patch<V>>): List<V>;
    function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W): List<W>;
    function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V>;
    function zoom<V>(parent: List<V>, key: Key): List<V>;
}
export default List;
