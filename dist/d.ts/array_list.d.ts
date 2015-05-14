import Id from './id';
import MutableList from './mutable_list';
export declare class ArrayList<V> extends MutableList<V> {
    private _array;
    private _invalidate;
    constructor(array?: V[]);
    has(id: Id): boolean;
    get(id: number): V;
    prev(id?: number): number;
    next(id?: number): number;
    set(id: number, value: V): boolean;
    splice(prev: number, next: number, ...values: V[]): boolean;
}
export default ArrayList;
