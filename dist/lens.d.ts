import { MutableStore } from './store';
export interface Lens<K, A, B> {
    get(a: A, key: K): B;
    set(b: B, key: K): A;
}
export declare module Lens {
    function compose<K, V, W>(parent: MutableStore<K, V>, lens: Lens<K, V, W>): MutableStore<K, W>;
}
export default Lens;
