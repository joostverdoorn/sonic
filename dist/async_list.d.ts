import Key from './key';
import { IList } from './list';
export interface IScheduler {
    (schedulee: () => void): void;
}
export interface IAsyncList<V> {
    has: (key: Key) => Promise<boolean>;
    get: (key: Key) => Promise<V>;
    prev: (key?: Key) => Promise<Key>;
    next: (key?: Key) => Promise<Key>;
}
export declare class AsyncList<V> implements IAsyncList<V> {
    protected _list: IAsyncList<V> | IList<V>;
    protected _scheduler: IScheduler;
    constructor(list: IAsyncList<V> | IList<V>, scheduler?: IScheduler);
    has: (key: string | number) => Promise<boolean>;
    get: (key: string | number) => Promise<V>;
    prev: (key: string | number) => Promise<string | number>;
    next: (key: string | number) => Promise<string | number>;
    static create<V>(list: IAsyncList<V>): AsyncList<V>;
    static map<V, W>(list: IAsyncList<V>, mapFn: (value: V, key?: Key) => W): AsyncList<W>;
}
export default AsyncList;
