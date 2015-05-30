import Key from './key';
import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';
export default class LinkedList<V> extends MutableList<V> {
    private _byKey;
    private _next;
    private _prev;
    private _subject;
    private _keyFn;
    constructor(values: V[], keyFn?: (value: V) => Key);
    has: (key: string | number) => boolean;
    get: (key: string | number) => V;
    prev: (key?: string | number) => string | number;
    next: (key?: string | number) => string | number;
    set: (key: string | number, value: V) => string | number;
    splice: (prev?: string | number, next?: string | number, ...values: V[]) => void;
    observe: (observer: IListObserver) => ISubscription;
    private _invalidate;
}
