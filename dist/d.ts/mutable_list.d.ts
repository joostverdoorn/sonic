import Id from './id';
import { ObservableList, IObservableList } from './observable_list';
export interface IMutableList<V> extends IObservableList<V> {
    set(id: Id, value: V): boolean;
    splice(prev: Id, next: Id, ...values: V[]): boolean;
}
export declare class MutableList<V> extends ObservableList<V> implements IMutableList<V> {
    constructor(list?: IMutableList<V>);
    set(id: Id, value: V): boolean;
    splice(prev: Id, next: Id, ...values: V[]): boolean;
    push(value: V): string | number | (string | number)[];
    unshift(value: V): string | number | (string | number)[];
    pop(): V;
    shift(): V;
    delete(id: Id): boolean;
    remove(value: V): boolean;
    static isMutableList(obj: Object): boolean;
    static create<V>(list: IMutableList<V>): MutableList<V>;
    static push<V>(list: IMutableList<V>, value: V): Id;
    static unshift<V>(list: IMutableList<V>, value: V): Id;
    static pop<V>(list: IMutableList<V>): V;
    static shift<V>(list: IMutableList<V>): V;
    static delete<V>(list: IMutableList<V>, id: Id): boolean;
    static remove<V>(list: IMutableList<V>, value: V): boolean;
}
export default MutableList;
