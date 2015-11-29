import State from './state';
export declare type Cache<K, V> = {
    get: {
        [key: string]: Promise<V>;
    };
    prev: {
        [key: string]: Promise<K>;
    };
    next: {
        [key: string]: Promise<K>;
    };
};
export declare module Cache {
    function create<K, V>(): Cache<K, V>;
    function extend<K, V>(cache: Cache<K, V>): Cache<K, V>;
    function apply<K, V>(state: State<K, V>, cache: Cache<K, V>): State<K, V>;
}
export default Cache;
