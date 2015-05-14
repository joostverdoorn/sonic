import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';
export declare class Unit<V> extends MutableList<V> {
    private _id;
    private _value;
    private _subject;
    constructor(value: V);
    has: (id: string | number) => boolean;
    get: (id: string | number) => V;
    prev: (id: string | number) => string | number;
    next: (id: string | number) => string | number;
    set: (id: string | number, value: V) => boolean;
    splice: (prev: string | number, next: string | number, ...values: V[]) => boolean;
    observe: (observer: IListObserver) => ISubscription;
    private _invalidate;
}
export default Unit;
