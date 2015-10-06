import Key from './key';
import Patch from './patch';
export interface State<V> {
    get: (key: Key) => Promise<V>;
    prev: (key?: Key) => Promise<Key>;
    next: (key?: Key) => Promise<Key>;
}
export interface PartialState<V> {
    get?: (key: Key) => Promise<V>;
    prev?: (key?: Key) => Promise<Key>;
    next?: (key?: Key) => Promise<Key>;
}
export declare const KEY_NOT_FOUND: Promise<any>;
export declare module State {
    function extend<V, W>(parent: State<V>, {get, prev, next}: PartialState<W>): State<W>;
    function patch<V>(parent: State<V>, patch: Patch<V>): State<V>;
    function patches<V>(parent: State<V>, patches: Patch<V>[]): State<V>;
    function set<V>(parent: State<V>, key: Key, value: V | Promise<V>, before?: Key): State<V>;
    function del<V>(parent: State<V>, key: Key): State<V>;
    function reverse<V>(parent: State<V>): State<V>;
    function map<V, W>(parent: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W>;
    function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V>;
}
export default State;
