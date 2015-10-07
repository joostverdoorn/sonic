import Key from './key';
import State from './state';
import Range from './range';
export declare class StateIterator<V> {
    current: Key;
    range: Range;
    state: State<V>;
    constructor(state: State<V>, range?: Range);
    get: () => Promise<V>;
    prev: () => Promise<number | string>;
    next: () => Promise<number | string>;
}
export declare module StateIterator {
    function first<V>(state: State<V>, range?: Range): Promise<V>;
    function last<V>(state: State<V>, range?: Range): Promise<V>;
    function every<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<boolean>;
    function some<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<boolean>;
    function forEach<V>(state: State<V>, fn: (value: V, key?: Key) => void | Promise<void>, range?: Range): Promise<void>;
    function reduce<V, W>(state: State<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W, range?: Range): Promise<W>;
    function toArray<V>(state: State<V>, range?: Range): Promise<V[]>;
    function toObject<V>(state: State<V>, range?: Range): Promise<{
        [key: string]: V;
    }>;
    function findKey<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<Key>;
    function find<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<V>;
    function keyOf<V>(state: State<V>, value: V, range?: Range): Promise<Key>;
    function indexOf<V>(state: State<V>, value: V, range?: Range): Promise<number>;
    function keyAt<V>(state: State<V>, index: number, range?: Range): Promise<Key>;
    function at<V>(state: State<V>, index: number, range?: Range): Promise<V>;
    function contains<V>(state: State<V>, value: V, range?: Range): Promise<boolean>;
}
export default StateIterator;
