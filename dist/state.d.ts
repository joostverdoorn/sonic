import Entry from './entry';
import { Range } from './range';
import AsyncIterator from './async_iterator';
import { Tree, Path } from './tree';
export interface State<K, V> {
    get: (key: K) => Promise<V>;
    prev: (key?: K) => Promise<K>;
    next: (key?: K) => Promise<K>;
}
export declare module State {
    interface Partial<K, V> {
        get?: (key: K) => Promise<V>;
        prev?: (key?: K) => Promise<K>;
        next?: (key?: K) => Promise<K>;
    }
    const Empty: {
        get: (key: any) => Promise<any>;
        prev: (key?: any) => Promise<any>;
        next: (key?: any) => Promise<any>;
    };
    function extend<K, V, L, W>(parent: State<K, V>, {get, prev, next}: Partial<L, W>): State<K | L, V | W>;
    function first<K, V>(state: State<K, V>, [from, to]?: Range<K>): Promise<K>;
    function last<K, V>(state: State<K, V>, [from, to]?: Range<K>): Promise<K>;
    function has<K, V>(state: State<K, V>, key: K): Promise<boolean>;
    function is<K, V>(state: State<K, V>, other: State<K, V>): Promise<boolean>;
    function contains<K, V>(state: State<K, V>, value: V): Promise<boolean>;
    function empty<K, V>(state: State<K, V>): Promise<boolean>;
    function any<K, V>(state: State<K, V>): Promise<boolean>;
    function size<K, V>(state: State<K, V>): Promise<number>;
    function slice<K, V>(parent: State<K, V>, range?: Range<K>): State<K, V>;
    function splice<K, V>(parent: State<K, V>, range: Range<K>, child?: State<K, V>): State<K, V>;
    function reverse<K, V>(parent: State<K, V>): State<K, V>;
    function map<K, V, W>(parent: State<K, V>, mapFn: (value: V, key?: K) => W | Promise<W>): State<K, W>;
    function filter<K, V>(parent: State<K, V>, filterFn: (value: V, key?: K) => boolean | Promise<boolean>): State<K, V>;
    function scan<K, V, W>(parent: State<K, V>, scanFn: (memo: W, value: V, key: K) => W | Promise<W>, memo?: W): State<K, W>;
    function pick<K, V>(parent: State<K, V>, picked: State<K, V>): State<K, V>;
    function omit<K, V>(parent: State<K, V>, omitted: State<K, V>): State<K, V>;
    function zip<K, L, V, W>(parent: State<K, V>, other: State<L, W>): State<[K, L], [V, W]>;
    function zoom<K, V>(parent: State<K, V>, key: K): State<K, V>;
    function flatten<K, L, V>(parent: Tree<K, L, V>): State<Path<K, L>, V>;
    function flatMap<K, L, V, W>(parent: State<K, V>, mapFn: (value: V, key: K) => State<L, W> | Promise<State<L, W>>): State<Path<K, L>, W>;
    function groupBy<K, L, V>(parent: State<K, V>, groupFn: (value: V, key: K) => L | Promise<L>): Tree<L, K, V>;
    function unique<K, L, V>(parent: State<K, V>, uniqueFn: (value: V, key: K) => L | Promise<L>): State<K, V>;
    function union<K, V>(state: State<K, V>, other: State<K, V>, uniqueFn?: (value: V, key: K) => K | Promise<K>): State<K, V>;
    function keyBy<K, L, V>(parent: State<K, V>, keyFn: (value: V, key?: K) => L | Promise<L>, reverseKeyFn?: (key: L) => K | Promise<K>): State<L, V>;
    function take<K, V>(parent: State<K, V>, count: number): State<K, V>;
    function skip<K, V>(parent: State<K, V>, count: number): State<K, V>;
    function cache<K, V>(parent: State<K, V>): State<K, V>;
    function unit<K, V>(value: V, key: K): State<K, V>;
    function entries<K, V>(state: State<K, V>, range?: Range<K>): AsyncIterator<Entry<K, V>>;
    function keys<K, V>(state: State<K, V>, range?: Range<K>): AsyncIterator<K>;
    function values<K, V>(state: State<K, V>, range?: Range<K>): AsyncIterator<V>;
    function fromEntries<K, V>(iterator: Iterator<Entry<K, V>> | AsyncIterator<Entry<K, V>>): State<K, V>;
    function fromKeys<K>(iterator: Iterator<K> | AsyncIterator<K>): State<K, void>;
    function fromValues<V>(iterator: Iterator<V> | AsyncIterator<V>): State<number, V>;
    function fromArray<V>(values: V[]): State<number, V>;
    function fromObject<V>(values: {
        [key: string]: V;
    }): State<string, V>;
    function lazy<K, V>(fn: () => State<K, V> | Promise<State<K, V>>): State<K, V>;
    function toObject<V>(state: State<string, V>, range?: Range<string>): Promise<{
        [key: string]: V;
    }>;
    function toArray<K, V>(state: State<K, V>, range?: Range<K>): Promise<V[]>;
}
export default State;
