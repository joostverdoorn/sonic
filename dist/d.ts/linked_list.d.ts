import MutableList from './mutable_list';
export default class LinkedList<V> extends MutableList<V> {
    private _byId;
    private _next;
    private _prev;
    private _invalidate;
    constructor(array: V[]);
    has(id: number): boolean;
    get(id: number): any;
    prev(id?: number): any;
    next(id?: number): any;
    set(id: number, value: V): boolean;
    splice(prev?: number, next?: number, ...values: V[]): boolean;
}
