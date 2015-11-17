import Key from './key';
import Patch from './patch';
import State from './state';
import { Observable, Subject } from './observable';
export interface Store<V> {
    state: State<V>;
    dispatcher: Observable<Patch<V>>;
}
export interface MutableStore<V> extends Store<V> {
    dispatcher: Subject<Patch<V>>;
}
export declare module Store {
    function map<V, W>(parent: Store<V>, mapFn: (value: V, key: Key) => W | Promise<W>): Store<W>;
    function filter<V>(parent: Store<V>, filterFn: (value: V, key: Key) => boolean | Promise<boolean>): Store<V>;
    function zoom<V>(parent: Store<V>, key: Key): Store<V>;
    function flatten<V>(parent: Store<Store<V>>): Store<V>;
    function scan<V, W>(parent: Store<V>, scanFn: (memo: W, value: V) => W | Promise<W>, memo?: W): Store<W>;
    function cache<V>(parent: Store<V>): Store<V>;
    function states<V>(store: Store<V>): Observable<State<V>>;
    function create<V>(state: State<V>, dispatcher: Subject<Patch<V>>, reducer?: (state: State<V>, patch: Patch<V>) => State<V>): MutableStore<V>;
    function create<V>(state: State<V>, dispatcher: Observable<Patch<V>>, reducer?: (state: State<V>, patch: Patch<V>) => State<V>): Store<V>;
}
export default Store;
