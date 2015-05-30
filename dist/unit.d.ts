import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';
export default class Unit<V> extends MutableList<V> {
    private _key;
    private _value;
    private _subject;
    constructor(value?: V);
    has: (key: string | number) => boolean;
    get: (key: string | number) => V;
    prev: (key: string | number) => string | number;
    next: (key: string | number) => string | number;
    set: (key: string | number, value: V) => void;
    splice: (prev: string | number, next: string | number, ...values: V[]) => void;
    observe: (observer: IListObserver) => ISubscription;
    private _invalidate;
}
