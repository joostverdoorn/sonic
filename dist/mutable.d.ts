import Key from './key';
import { Patch } from './patch';
import State from './state';
import List from './list';
import Range from './range';
export interface Mutable<V> extends List<V> {
    modify(patch: Patch<V>): Promise<void>;
}
export declare module Mutable {
    function splice<V>(mutable: Mutable<V>, range: Range, values: State<V>): Promise<void>;
    function set<V>(mutable: Mutable<V>, key: Key, value: V, before?: Key): Promise<void>;
    function del<V>(mutable: Mutable<V>, key: Key): Promise<void>;
}
export declare module factory {
    function create<V>(state: State<V>): Mutable<V>;
}
export default Mutable;
