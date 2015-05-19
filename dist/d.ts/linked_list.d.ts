import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import MutableList from './mutable_list';
export default class LinkedList<V> extends MutableList<V> {
    private _byId;
    private _next;
    private _prev;
    private _subject;
    constructor(array: V[]);
    has: (id: string | number) => boolean;
    get: (id: string | number) => V;
    prev: (id?: string | number) => string | number;
    next: (id?: string | number) => string | number;
    set: (id: string | number, value: V) => string | number;
    splice: (prev?: string | number, next?: string | number, ...values: V[]) => void;
    observe: (observer: IListObserver) => ISubscription;
    private _invalidate;
}
