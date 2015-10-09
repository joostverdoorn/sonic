import Key from './key';
import State from './state';
import Patch from './patch';
export declare type Cache<V> = {
    get: {
        [key: string]: V;
    };
    prev: {
        [key: string]: Key;
    };
    next: {
        [key: string]: Key;
    };
};
export declare module Cache {
    const DELETED: any;
    function create<V>(): Cache<V>;
    function extend<V>(cache: Cache<V>): Cache<V>;
    function patch<V>(cache: Cache<V>, patch: Patch<V>): Cache<V>;
    function apply<V>(cache: Cache<V>, state: State<V>): State<V>;
}
export default Cache;
