import Key from './key';
import State from './state';
import { List, ListObserver, ListEvent } from './list';
export declare class Cache<V> extends List<V> implements ListObserver {
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
    onInvalidate(...events: ListEvent<V>[]): void;
}
export default Cache;
