import ObservableCache from './observable_cache';
import { IMutableList } from './mutable_list';
export declare class MutableCache<V> extends ObservableCache<V> implements IMutableList<V> {
    protected _list: IMutableList<V>;
    constructor(list: IMutableList<V>);
    set: (key: string | number, value: V) => Promise<void>;
    splice: (prev: string | number, next: string | number, ...values: V[]) => Promise<void>;
}
export default MutableCache;
