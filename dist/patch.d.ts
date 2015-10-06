import Key from './key';
import State from './state';
export declare enum Operation {
    "add" = 0,
    "remove" = 1,
    "replace" = 2,
}
export interface Patch<V> {
    type: string;
    key: Key;
    value?: V;
    oldValue?: V;
}
export declare module Patch {
    function reverse<V>(patch: Patch<V>, original: State<V>): Promise<Patch<V>>;
    function map<V, W>(patch: Patch<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): Promise<Patch<W>>;
    function filter<V>(patch: Patch<V>, filterFn: (value: V, key?: Key) => boolean, old: State<V>): Promise<void | Patch<V>>;
}
export default Patch;
