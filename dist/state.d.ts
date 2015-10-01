import Key from './key';
export interface State<V> {
    get: (key: Key) => Promise<V>;
    prev: (key?: Key) => Promise<Key>;
    next: (key?: Key) => Promise<Key>;
}
export declare module State {
    function reverse<V>(list: State<V>): State<V>;
    function map<V, W>(list: State<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): State<W>;
    function filter<V>(list: State<V>, filterFn: (value: V, key?: Key) => boolean): State<V>;
}
export default State;
