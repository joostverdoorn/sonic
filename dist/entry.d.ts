import Key from './key';
export declare type Entry<V> = [Key, V];
export declare module Entry {
    function key<V>(entry: Entry<V>): Key;
    function value<V>(entry: Entry<V>): V;
    function is<V>(entry: Entry<V>, other: Entry<V>): boolean;
}
export default Entry;
