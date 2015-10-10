import Key from './key';
import Patch from './patch';
import { Tree } from './tree';
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
export declare module State {
    const NOT_FOUND: Promise<any>;
    function extend<V, W>(parent: State<V>, {get, prev, next}: PartialState<W>): State<W>;
    function patch<V>(parent: State<V>, patch: Patch<V>): State<V>;
    function reverse<V>(parent: State<V>): State<V>;
    function map<V, W>(parent: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W>;
    function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V>;
    function zoom<V>(parent: State<V>, key: Key): State<V>;
    function flatten<V>(parent: Tree<V>): State<V>;
    function cache<V>(parent: State<V>): State<V>;
    function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V>;
    function fromArray<V>(values: V[]): State<V>;
    function fromObject<V>(values: {
        [key: string]: V;
    }): State<V>;
}
export default State;
