import Key from './key';
import { ObservableList, IObservableList } from './observable_list';
export interface IMutableList<V> extends IObservableList<V> {
    set(key: Key, value: V): void;
    splice(prev: Key, next: Key, ...values: V[]): void;
}
export declare class MutableList<V> extends ObservableList<V> implements IMutableList<V> {
    constructor(list?: IMutableList<V>);
    set: (key: string | number, value: V) => void;
    splice: (prev: string | number, next: string | number, ...values: V[]) => void;
    addBefore: (key: string | number, value: V) => string | number;
    addAfter: (key: string | number, value: V) => string | number;
    push: (value: V) => string | number;
    unshift: (value: V) => string | number;
    delete: (key: string | number) => V;
    deleteBefore: (key: string | number) => V;
    deleteAfter: (key: string | number) => V;
    pop: () => V;
    shift: () => V;
    remove: (value: V) => boolean;
    static isMutableList(obj: any): boolean;
    static create<V>(list: IMutableList<V>): MutableList<V>;
    static addBefore<V>(list: IMutableList<V>, key: Key, value: V): Key;
    static addAfter<V>(list: IMutableList<V>, key: Key, value: V): Key;
    static push<V>(list: IMutableList<V>, value: V): Key;
    static unshift<V>(list: IMutableList<V>, value: V): Key;
    static delete<V>(list: IMutableList<V>, key: Key): V;
    static deleteBefore<V>(list: IMutableList<V>, key: Key): V;
    static deleteAfter<V>(list: IMutableList<V>, key: Key): V;
    static pop<V>(list: IMutableList<V>): V;
    static shift<V>(list: IMutableList<V>): V;
    static remove<V>(list: IMutableList<V>, value: V): boolean;
}
export default MutableList;
