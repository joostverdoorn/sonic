import Key from './key';
export interface AsyncIterator<V> {
    get: () => Promise<V>;
    next: () => Promise<Key>;
}
export declare module AsyncIterator {
    type Entry<V> = [Key, V];
    const Empty: AsyncIterator<any>;
    interface Partial<V> {
        get?: () => Promise<V>;
        next?: () => Promise<Key>;
    }
    function extend<V>(iterator: AsyncIterator<V>, partial: Partial<V>): AsyncIterator<V>;
    function every<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean>;
    function some<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean>;
    function forEach<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => void | Promise<void>): Promise<void>;
    function reduce<V, W>(iterator: AsyncIterator<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W): Promise<W>;
    function findKey<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<Key>;
    function find<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<V>;
    function keyOf<V>(iterator: AsyncIterator<V>, value: V): Promise<Key>;
    function indexOf<V>(iterator: AsyncIterator<V>, value: V): Promise<number>;
    function keyAt<V>(iterator: AsyncIterator<V>, index: number): Promise<Key>;
    function at<V>(iterator: AsyncIterator<V>, index: number): Promise<V>;
    function contains<V>(iterator: AsyncIterator<V>, value: V): Promise<boolean>;
    function concat<V>(...iterators: AsyncIterator<V>[]): AsyncIterator<V>;
    function fromEntries<V>(entries: Entry<V>[]): AsyncIterator<V>;
    function fromArray<V>(array: V[]): AsyncIterator<V>;
    function fromObject<V>(object: {
        [key: string]: V;
    }): AsyncIterator<V>;
    function toArray<V>(iterator: AsyncIterator<V>): Promise<V[]>;
    function toObject<V>(iterator: AsyncIterator<V>): Promise<{
        [key: string]: V;
    }>;
}
export default AsyncIterator;
