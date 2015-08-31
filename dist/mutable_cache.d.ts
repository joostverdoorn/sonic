import ObservableCache from './observable_cache';
import { IMutableList } from './mutable_list';
export declare class MutableCache<V> extends ObservableCache<V> implements IMutableList<V> {
    protected _list: IMutableList<V>;
    constructor(list: IMutableList<V>);
    set: (key: number | string, value: V) => Promise<void>;
    splice: (prev: number | string, next: number | string, ...values: V[]) => Promise<void>;
}
export default MutableCache;
