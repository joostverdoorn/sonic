import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';
export declare class ArrayList<V> extends MutableList<V> {
    private _array;
    private _subject;
    constructor(array?: V[]);
    has: (id: string | number) => boolean;
    get: (id: number) => V;
    prev: (id?: number) => number;
    next: (id?: number) => number;
    set: (id: number, value: V) => string | number;
    splice: (prev: number, next: number, ...values: V[]) => void;
    observe: (observer: IListObserver) => ISubscription;
    private _invalidate;
}
export default ArrayList;
