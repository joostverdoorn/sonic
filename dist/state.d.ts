import Key from './key';
export interface State<V> {
    get: (key: Key) => Promise<V>;
    prev: (key?: Key) => Promise<Key>;
    next: (key?: Key) => Promise<Key>;
}
export declare module State {
    function fromArray<V>(values: V[]): State<V>;
    function fromObject<V>(values: {
        [key: string]: V;
    }): State<V>;
    function add<V>(old: State<V>, key: Key, value: V): State<V>;
    function replace<V>(old: State<V>, key: Key, value: V): State<V>;
    function remove<V>(old: State<V>, key: Key): State<V>;
    function reverse<V>(old: State<V>): State<V>;
    function map<V, W>(old: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W>;
    function filter<V>(old: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V>;
}
export default State;
