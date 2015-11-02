import Key from './key';
import { MutableList } from './list';
export interface Lens<A, B> {
    get(a: A, key: Key): B;
    set(b: B, key: Key): A;
}
export declare module Lens {
    function compose<V, W>(parent: MutableList<V>, lens: Lens<V, W>): MutableList<W>;
}
export default Lens;
