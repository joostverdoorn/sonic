import State from './state';
export declare type Cache<K, V> = {
    get: (key: K, value?: V) => V;
    prev: (key: K, prevKey?: K) => K;
    next: (key: K, nextKey?: K) => K;
};
export declare module Cache {
    function create<K, V>(): Cache<K, V>;
    function extend<K, V>(cache: Cache<K, V>): Cache<K, V>;
    function apply<K, V>(state: State<K, V>, cache: Cache<K, V>): State<K, V>;
}
export default Cache;
