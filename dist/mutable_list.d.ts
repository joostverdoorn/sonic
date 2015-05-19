import Id from './id';
import { ObservableList, IObservableList } from './observable_list';
export interface IMutableList<V> extends IObservableList<V> {
    set(id: Id, value: V): Id;
    splice(prev: Id, next: Id, ...values: V[]): void;
}
export declare class MutableList<V> extends ObservableList<V> implements IMutableList<V> {
    constructor(list?: IMutableList<V>);
    set: (id: string | number, value: V) => string | number;
    splice: (prev: string | number, next: string | number, ...values: V[]) => void;
    addBefore: (id: string | number, value: V) => string | number;
    addAfter: (id: string | number, value: V) => string | number;
    push: (value: V) => string | number;
    unshift: (value: V) => string | number;
    delete: (id: string | number) => V;
    deleteBefore: (id: string | number) => V;
    deleteAfter: (id: string | number) => V;
    pop: () => V;
    shift: () => V;
    remove: (value: V) => boolean;
    static isMutableList(obj: any): boolean;
    static create<V>(list: IMutableList<V>): MutableList<V>;
    static addBefore<V>(list: IMutableList<V>, id: Id, value: V): Id;
    static addAfter<V>(list: IMutableList<V>, id: Id, value: V): Id;
    static push<V>(list: IMutableList<V>, value: V): Id;
    static unshift<V>(list: IMutableList<V>, value: V): Id;
    static delete<V>(list: IMutableList<V>, id: Id): V;
    static deleteBefore<V>(list: IMutableList<V>, id: Id): V;
    static deleteAfter<V>(list: IMutableList<V>, id: Id): V;
    static pop<V>(list: IMutableList<V>): V;
    static shift<V>(list: IMutableList<V>): V;
    static remove<V>(list: IMutableList<V>, value: V): boolean;
}
export default MutableList;
