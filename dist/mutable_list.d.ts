import Key from './key';
import { ObservableList, IObservableList } from './observable_list';
export interface IMutableList<V> extends IObservableList<V> {
    set(key: Key, value: V): Promise<void>;
    splice(prev: Key, next: Key, ...values: V[]): Promise<void>;
}
export declare abstract class MutableList<V> extends ObservableList<V> implements IMutableList<V> {
    abstract set(key: Key, value: V): Promise<void>;
    abstract splice(prev: Key, next: Key, ...values: V[]): Promise<void>;
    static create<V>(list: IMutableList<V>): MutableList<V>;
    addBefore(key: Key, value: V): Promise<number | string>;
    addAfter(key: Key, value: V): Promise<number | string>;
    push(value: V): Promise<number | string>;
    unshift(value: V): Promise<number | string>;
    delete(key: Key): Promise<V>;
    deleteBefore(key: Key): Promise<V>;
    deleteAfter(key: Key): Promise<V>;
    pop(): Promise<V>;
    shift(): Promise<V>;
    remove(value: V): Promise<void>;
    cache(): MutableList<V>;
    static isMutableList(obj: any): boolean;
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
}
export default MutableList;
