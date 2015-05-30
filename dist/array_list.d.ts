import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';
export default class ArrayList<V> extends MutableList<V> {
    private _array;
    private _subject;
    constructor(array?: V[]);
    has: (key: string | number) => boolean;
    get: (key: number) => V;
    prev: (key?: number) => number;
    next: (key?: number) => number;
    set: (key: number, value: V) => string | number;
    splice: (prev: number, next: number, ...values: V[]) => void;
    observe: (observer: IListObserver) => ISubscription;
    private _invalidate;
}
