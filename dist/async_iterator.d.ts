import Key from './key';
import { IList } from './list';
import { Range } from './range';
export declare class AsyncIterator<V> {
    current: Key;
    range: Range;
    protected _list: IList<V>;
    constructor(list: IList<V>, range?: Range);
    get(): Promise<V>;
    prev(): Promise<Key>;
    next(): Promise<Key>;
    static every<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean>;
    static some<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean>;
    static forEach<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => void | Promise<void>): Promise<void>;
    static reduce<V, W>(iterator: AsyncIterator<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W): Promise<W>;
    static toArray<V>(iterator: AsyncIterator<V>): Promise<V[]>;
    static findKey<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<Key>;
    static find<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<V>;
    static keyOf<V>(iterator: AsyncIterator<V>, value: V): Promise<Key>;
    static indexOf<V>(iterator: AsyncIterator<V>, value: V): Promise<number>;
    static keyAt<V>(iterator: AsyncIterator<V>, index: number): Promise<Key>;
    static at<V>(iterator: AsyncIterator<V>, index: number): Promise<V>;
    static contains<V>(iterator: AsyncIterator<V>, value: V): Promise<boolean>;
}
export default AsyncIterator;
