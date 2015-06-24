import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';
export default class Unit<V> extends MutableList<V> {
    private _key;
    private _value;
    private _subject;
    constructor(value?: V);
    get: (key: string | number) => Promise<V>;
    prev: (key: string | number) => Promise<string | number>;
    next: (key: string | number) => Promise<string | number>;
    set: (key: string | number, value: V) => Promise<void>;
    splice: (prev: string | number, next: string | number, ...values: V[]) => Promise<void>;
    observe: (observer: IListObserver) => ISubscription;
}
