import { Position, Range } from './range';
import State from './state';
export interface Patch<K, V> {
    range: Range<K>;
    added?: State<K, V>;
}
export declare module Patch {
    function apply<K, V>(state: State<K, V>, patch: Patch<K, V>): State<K, V>;
    function add<K, V>(value: V, key?: K, position?: Position<K>): Patch<K, V>;
    function set<K, V>(value: V, key: K): Patch<K, V>;
    function push<K, V>(value: V, key?: K): Patch<K, V>;
    function unshift<K, V>(value: V, key?: K): Patch<K, V>;
    function remove<K>(key: K): Patch<K, any>;
}
export default Patch;
