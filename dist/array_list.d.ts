import { ISubscription } from './observable';
import { IListObserver } from './observable_list';
import { MutableList } from './mutable_list';
export default class ArrayList<V> extends MutableList<V> {
    private _array;
    private _subject;
    constructor(array?: V[]);
    get(key: number): Promise<V>;
    prev(key?: number): Promise<number>;
    next(key?: number): Promise<number>;
    set(key: number, value: V): Promise<void>;
    splice(prev: number, next: number, ...values: V[]): Promise<void>;
    observe(observer: IListObserver): ISubscription;
}
