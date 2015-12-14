import Patch from './patch';
import State from './state';
import { Path } from './tree';
import { Observable, Subject } from './observable';
export interface Store<K, V> {
    state: State<K, V>;
    dispatcher: Observable<Patch<K, V>>;
}
export interface MutableStore<K, V> extends Store<K, V> {
    dispatcher: Subject<Patch<K, V>, Patch<K, V>>;
}
export declare module Store {
    function reverse<K, V>(parent: Store<K, V>): Store<K, V>;
    function map<K, V, W>(parent: Store<K, V>, mapFn: (value: V, key: K) => W | Promise<W>): Store<K, W>;
    function filter<K, V>(parent: Store<K, V>, filterFn: (value: V, key: K) => boolean | Promise<boolean>): Store<K, V>;
    function zoom<K, V>(parent: Store<K, V>, key: K): Store<K, V>;
    function flatten<K, L, V>(parent: Store<K, Store<L, V>>): Store<[K, L], V>;
    function flatMap<K, L, V, W>(parent: Store<K, V>, mapFn: (value: V, key: K) => Store<L, W>): Store<Path<K, L>, W>;
    function keyBy<K, L, V>(parent: Store<K, V>, keyFn: (value: V, key: K) => L | Promise<L>, reverseKeyFn: (key: L) => K | Promise<K>): Store<L, V>;
    function scan<K, V, W>(parent: Store<K, V>, scanFn: (memo: W, value: V) => W | Promise<W>, memo?: W): Store<K, W>;
    function take<K, V>(parent: Store<K, V>, count: number): Store<K, V>;
    function cache<K, V>(parent: Store<K, V>): Store<K, V>;
    function states<K, V>(store: Store<K, V>): Observable<State<K, V>>;
    function create<K, V>(state: State<K, V>, dispatcher: Subject<Patch<K, V>, Patch<K, V>>, reducer?: (state: State<K, V>, patch: Patch<K, V>) => State<K, V> | Promise<State<K, V>>): MutableStore<K, V>;
    function create<K, V>(state: State<K, V>, dispatcher: Observable<Patch<K, V>>, reducer?: (state: State<K, V>, patch: Patch<K, V>) => State<K, V> | Promise<State<K, V>>): Store<K, V>;
}
export default Store;
