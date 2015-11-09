import Entry from './entry';
export interface AsyncIterator<T> {
    next: () => Promise<IteratorResult<T>>;
}
export declare module AsyncIterator {
    const sentinel: IteratorResult<any>;
    const Empty: AsyncIterator<any>;
    function every<T>(iterator: AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean>;
    function some<T>(iterator: AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean>;
    function forEach<T>(iterator: AsyncIterator<T>, fn: (value: T) => void | Promise<void>): Promise<void>;
    function reduce<T, U>(iterator: AsyncIterator<T>, fn: (memo: U, value: T) => U | Promise<U>, memo?: U): Promise<U>;
    function find<T>(iterator: AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<T>;
    function indexOf<T>(iterator: AsyncIterator<T>, value: T): Promise<number>;
    function at<T>(iterator: AsyncIterator<T>, index: number): Promise<T>;
    function contains<T>(iterator: AsyncIterator<T>, value: T): Promise<boolean>;
    function is<T>(iterator: AsyncIterator<T>, other: AsyncIterator<T>, equals?: (a: T, b: T) => boolean | Promise<boolean>): Promise<boolean>;
    function concat<T>(...iterators: AsyncIterator<T>[]): AsyncIterator<T>;
    function fromArray<T>(array: T[]): AsyncIterator<T>;
    function map<T, U>(iterator: AsyncIterator<T>, mapFn: (value: T) => U | Promise<U>): AsyncIterator<U>;
    function fromObject<V>(object: {
        [key: string]: V;
    }): AsyncIterator<Entry<V>>;
    function toArray<T>(iterator: AsyncIterator<T>): Promise<T[]>;
    function toObject<V>(iterator: AsyncIterator<Entry<V>>): Promise<{
        [key: string]: V;
    }>;
}
export default AsyncIterator;
