export declare type Entry<K, V> = [K, V];
export declare module Entry {
    function key<K>(entry: Entry<K, any>): K;
    function value<V>(entry: Entry<any, V>): V;
    function is<K, V>(entry: Entry<K, V>, other: Entry<K, V>): boolean;
}
export default Entry;
