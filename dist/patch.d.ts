import Key from './key';
import { Position, Range } from './range';
import State from './state';
export interface Patch<V> {
    range: Range;
    added?: State<V>;
}
export declare module Patch {
    function apply<V>(state: State<V>, patch: Patch<V>): State<V>;
    function add<V>(value: V, key?: Key, position?: Position): Patch<V>;
    function set<V>(value: V, key: Key): Patch<V>;
    function push<V>(value: V, key?: Key): Patch<V>;
    function unshift<V>(value: V, key?: Key): Patch<V>;
    function remove(key: Key): Patch<any>;
}
export default Patch;
