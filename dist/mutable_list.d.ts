import Key from './key';
import { ObservableList, IObservableList } from './observable_list';
export interface IMutableList<V> extends IObservableList<V> {
    set(key: Key, value: V): Promise<void>;
    splice(prev: Key, next: Key, ...values: V[]): Promise<void>;
}
export declare class MutableList<V> extends ObservableList<V> implements IMutableList<V> {
    constructor(list?: IMutableList<V>);
    set: (key: string | number, value: V) => Promise<void>;
    splice: (prev: string | number, next: string | number, ...values: V[]) => Promise<void>;
    addBefore: (key: string | number, value: V) => Promise<string | number>;
    addAfter: (key: string | number, value: V) => Promise<string | number>;
    push: (value: V) => Promise<string | number>;
    unshift: (value: V) => Promise<string | number>;
    delete: (key: string | number) => Promise<V>;
    deleteBefore: (key: string | number) => Promise<V>;
    deleteAfter: (key: string | number) => Promise<V>;
    pop: () => Promise<V>;
    shift: () => Promise<V>;
    remove: (value: V) => Promise<void>;
    cache: () => MutableList<V>;
    map: <W>(getFn: (value: V, key: string | number) => W, setFn?: (value: W, key?: string | number) => V) => MutableList<W>;
    static isMutableList(obj: any): boolean;
    static create<V>(list: IMutableList<V>): MutableList<V>;
    static addBefore<V>(list: IMutableList<V>, key: Key, value: V): Promise<Key>;
    static addAfter<V>(list: IMutableList<V>, key: Key, value: V): Promise<Key>;
    static push<V>(list: IMutableList<V>, value: V): Promise<Key>;
    static unshift<V>(list: IMutableList<V>, value: V): Promise<Key>;
    static delete<V>(list: IMutableList<V>, key: Key): Promise<V>;
    static deleteBefore<V>(list: IMutableList<V>, key: Key): Promise<V>;
    static deleteAfter<V>(list: IMutableList<V>, key: Key): Promise<V>;
    static pop<V>(list: IMutableList<V>): Promise<V>;
    static shift<V>(list: IMutableList<V>): Promise<V>;
    static remove<V>(list: IMutableList<V>, value: V): Promise<void>;
    static cache<V>(list: IMutableList<V>): IMutableList<V>;
    static map<V, W>(list: IMutableList<V>, getFn: (value: V, key: Key) => W, setFn?: (value: W, key?: Key) => V): IMutableList<W>;
}
export default MutableList;
