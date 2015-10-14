import Key from './key';
import Range from './range';
import Patch from './patch';
import AsyncIterator from './async_iterator';
import { Tree } from './tree';
export interface State<V> {
    get: (key: Key) => Promise<V>;
    prev: (key?: Key) => Promise<Key>;
    next: (key?: Key) => Promise<Key>;
}
export declare module State {
    interface Partial<V> {
        get?: (key: Key) => Promise<V>;
        prev?: (key?: Key) => Promise<Key>;
        next?: (key?: Key) => Promise<Key>;
    }
    const Empty: {
        get: (key: number | string) => Promise<{}>;
        prev: (key?: number | string) => Promise<number | string> | Promise<{}>;
        next: (key?: number | string) => Promise<number | string> | Promise<{}>;
    };
    function first<V>(state: State<V>): Promise<V>;
    function last<V>(state: State<V>): Promise<V>;
    function extend<V, W>(parent: State<V>, {get, prev, next}: Partial<W>): State<W>;
    function slice<V>(parent: State<V>, range?: Range): State<V>;
    function splice<V>(parent: State<V>, range: Range, child?: State<V>): State<V>;
    function patch<V>(parent: State<V>, patch: Patch<V>): State<V>;
    function toIterator<V>(state: State<V>, range?: Range): AsyncIterator<V>;
    function reverse<V>(parent: State<V>): State<V>;
    function map<V, W>(parent: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W>;
    function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean | Promise<boolean>): State<V>;
    function zoom<V>(parent: State<V>, key: Key): State<V>;
    function flatten<V>(parent: Tree<V>): State<V>;
    function cache<V>(parent: State<V>): State<V>;
    function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V>;
    function fromArray<V>(values: V[]): State<V>;
    function fromObject<V>(values: {
        [key: string]: V;
    }): State<V>;
    function fromIterator<V>(iterator: AsyncIterator<V>): State<V>;
}
export default State;
