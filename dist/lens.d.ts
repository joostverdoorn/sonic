import Key from './key';
import { MutableStore } from './store';
export interface Lens<A, B> {
    get(a: A, key: Key): B;
    set(b: B, key: Key): A;
}
export declare module Lens {
    function compose<V, W>(parent: MutableStore<V>, lens: Lens<V, W>): MutableStore<W>;
}
export default Lens;
