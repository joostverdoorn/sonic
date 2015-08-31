import Key from './key';
import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';
export default class Unit<V> extends MutableList<V> {
    private _key;
    private _value;
    private _subject;
    constructor(value?: V);
    get(key: Key): Promise<V>;
    prev(key: Key): Promise<Key>;
    next(key: Key): Promise<number | string>;
    set(key: Key, value: V): Promise<void>;
    splice(prev: Key, next: Key, ...values: V[]): Promise<void>;
    observe(observer: IListObserver): ISubscription;
}
