import Key from './key';
import State from './state';
export declare type Cache<V> = {
    get: {
        [key: string]: Promise<V>;
    };
    prev: {
        [key: string]: Promise<Key>;
    };
    next: {
        [key: string]: Promise<Key>;
    };
};
export declare module Cache {
    function create<V>(): Cache<V>;
    function extend<V>(cache: Cache<V>): Cache<V>;
    function apply<V>(cache: Cache<V>, state: State<V>): State<V>;
}
export default Cache;
