import Key from './key';
import State from './state';
import List from './list';
import { Patch } from './patch';
import { Observer } from './observable';
export declare class Cache<V> extends List<V> implements Observer<V> {
    static DELETED: {};
    protected _list: List<V>;
    protected _get: {
        [key: string]: V;
    };
    protected _prev: {
        [key: string]: Key;
    };
    protected _next: {
        [key: string]: Key;
    };
    state: State<V>;
    constructor(list: List<V>);
    onInvalidate(patches: Patch<V>[]): Promise<void>;
}
export default Cache;
