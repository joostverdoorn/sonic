import Range from './range';
import State from './state';
export interface Patch<V> {
    range: Range;
    added?: State<V>;
}
export declare module Patch {
    function apply<V>(state: State<V>, patch: Patch<V>): State<V>;
}
export default Patch;
