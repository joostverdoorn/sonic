import Key from './key';
import Patch from './patch';
import State from './state';
import { Observable, Subject } from './observable';
export interface List<V> {
    state: State<V>;
    patches: Observable<Patch<V>>;
}
export interface MutableList<V> extends List<V> {
    patches: Subject<Patch<V>>;
}
export declare module List {
    function map<V, W>(parent: List<V>, mapFn: (value: V, key: Key) => W | Promise<W>): List<W>;
    function filter<V>(parent: List<V>, filterFn: (value: V, key: Key) => boolean): List<V>;
    function zoom<V>(parent: List<V>, key: Key): List<V>;
    function flatten<V>(parent: List<List<V>>): List<V>;
    function scan<V, W>(parent: List<V>, scanFn: (memo: W, value: V) => W | Promise<W>, memo?: W): List<W>;
    function cache<V>(parent: List<V>): List<V>;
    function create<V>(state: State<V>, patches: Subject<Patch<V>>, reducer?: (state: State<V>, patch: Patch<V>) => State<V>): MutableList<V>;
    function create<V>(state: State<V>, patches: Observable<Patch<V>>, reducer?: (state: State<V>, patch: Patch<V>) => State<V>): List<V>;
}
export default List;
