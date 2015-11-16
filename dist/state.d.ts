import Key from './key';
import Entry from './entry';
import { Range } from './range';
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
        get: (key: string) => Promise<{}>;
        prev: (key?: string) => Promise<string>;
        next: (key?: string) => Promise<string>;
    };
    function extend<V, W>(parent: State<V>, {get, prev, next}: Partial<W>): State<W>;
    function first<V>(state: State<V>, [from, to]?: Range): Promise<V>;
    function last<V>(state: State<V>, [from, to]?: Range): Promise<V>;
    function has<V>(state: State<V>, key: Key): Promise<boolean>;
    function is<V>(state: State<V>, other: State<V>): Promise<boolean>;
    function contains<V>(state: State<V>, value: V): Promise<boolean>;
    function empty<V>(state: State<V>): Promise<boolean>;
    function any<V>(state: State<V>): Promise<boolean>;
    function slice<V>(parent: State<V>, range?: Range): State<V>;
    function splice<V>(parent: State<V>, range: Range, child?: State<V>): State<V>;
    function reverse<V>(parent: State<V>): State<V>;
    function map<V, W>(parent: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W>;
    function filter<V>(parent: State<V>, filterFn: (value: V, key?: Key) => boolean | Promise<boolean>): State<V>;
    function scan<V, W>(parent: State<V>, scanFn: (memo: W, value: V, key: Key) => W | Promise<W>, memo?: W): State<W>;
    function zip<V, W>(parent: State<V>, other: State<W>): State<[V, W]>;
    function zoom<V>(parent: State<V>, key: Key): State<V>;
    function flatten<V>(parent: Tree<V>): State<V>;
    function groupBy<V>(parent: State<V>, groupFn: (value: V, key: Key) => Key | Promise<Key>): Tree<V>;
    function unique<V>(parent: State<V>, uniqueFn?: (value: V, key: Key) => Key | Promise<Key>): State<V>;
    function union<V>(state: State<V>, other: State<V>, uniqueFn?: (value: V, key: Key) => Key | Promise<Key>): State<V>;
    function keyBy<V>(parent: State<V>, keyFn: (value: V, key?: Key) => Key | Promise<Key>): State<V>;
    function take<V>(parent: State<V>, count: number): State<V>;
    function skip<V>(parent: State<V>, count: number): State<V>;
    function cache<V>(parent: State<V>): State<V>;
    function unit<V>(value: V, key?: Key): State<V>;
    function entries<V>(state: State<V>, range?: Range): AsyncIterator<Entry<V>>;
    function keys<V>(state: State<V>, range?: Range): AsyncIterator<Key>;
    function values<V>(state: State<V>, range?: Range): AsyncIterator<V>;
    function fromEntries<V>(iterator: AsyncIterator<Entry<V>>): State<V>;
    function fromKeys(iterator: AsyncIterator<Key>): State<void>;
    function fromValues<V>(iterator: AsyncIterator<V>): State<V>;
    function fromArray<V>(values: V[]): State<V>;
    function fromObject<V>(values: {
        [key: string]: V;
    }): State<V>;
    function lazy<V>(fn: () => State<V> | Promise<State<V>>): State<V>;
    function toObject<V>(state: State<V>, range?: Range): Promise<{
        [key: string]: V;
    }>;
    function toArray<V>(state: State<V>, range?: Range): Promise<V[]>;
}
export default State;
