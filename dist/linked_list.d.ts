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
    get(key: Key): Promise<V>;
    prev(key?: Key): Promise<Key>;
    next(key?: Key): Promise<number | string>;
    set(key: Key, value: V): Promise<void>;
    splice(prev?: Key, next?: Key, ...values: V[]): Promise<void>;
    observe(observer: IListObserver): ISubscription;
}
