import Id from './id';
import MutableList from './mutable_list';
export default class Unit<V> extends MutableList<V> {
    private _id;
    private _value;
    private _invalidate;
    constructor(value: V);
    has(id: Id): boolean;
    get(id: Id): V;
    prev(id: Id): string | number | (string | number)[];
    next(id: Id): string | number | (string | number)[];
    set(id: Id, value: V): boolean;
    splice(prev: Id, next: Id, ...values: V[]): boolean;
}
