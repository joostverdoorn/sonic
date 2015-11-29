import Entry from './entry';
export interface AsyncIterator<T> {
    next: () => Promise<IteratorResult<T>>;
}
export declare module AsyncIterator {
    const done: IteratorResult<any>;
    const Empty: AsyncIterator<any>;
    function every<T>(iterator: Iterator<T> | AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean>;
    function some<T>(iterator: Iterator<T> | AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean>;
    function forEach<T>(iterator: Iterator<T> | AsyncIterator<T>, fn: (value: T) => void | Promise<void>): Promise<void>;
    function reduce<T, U>(iterator: Iterator<T> | AsyncIterator<T>, fn: (memo: U, value: T) => U | Promise<U>, memo?: U): Promise<U>;
    function find<T>(iterator: Iterator<T> | AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<T>;
    function indexOf<T>(iterator: Iterator<T> | AsyncIterator<T>, value: T): Promise<number>;
    function at<T>(iterator: Iterator<T> | AsyncIterator<T>, index: number): Promise<T>;
    function size<T>(iterator: Iterator<T> | AsyncIterator<T>): Promise<number>;
    function contains<T>(iterator: Iterator<T> | AsyncIterator<T>, value: T): Promise<boolean>;
    function is<T>(iterator: Iterator<T> | AsyncIterator<T>, other: AsyncIterator<T>, equals?: (a: T, b: T) => boolean | Promise<boolean>): Promise<boolean>;
    function map<T, U>(iterator: Iterator<T> | AsyncIterator<T>, mapFn: (value: T) => U | Promise<U>): AsyncIterator<U>;
    function filter<T>(iterator: Iterator<T> | AsyncIterator<T>, filterFn: (value: T) => boolean | Promise<boolean>): AsyncIterator<T>;
    function scan<T, U>(iterator: Iterator<T> | AsyncIterator<T>, scanFn: (memo: U, value: T) => U | Promise<U>, memo?: U): AsyncIterator<U>;
    function zip<T, U>(iterator: Iterator<T> | AsyncIterator<T>, other: Iterator<U> | AsyncIterator<U>, zipFn?: (t: T, u: U) => [T, U] | Promise<[T, U]>): AsyncIterator<[T, U]>;
    function take<T>(iterator: Iterator<T> | AsyncIterator<T>, count: number): AsyncIterator<T>;
    function skip<T>(iterator: Iterator<T> | AsyncIterator<T>, count: number): AsyncIterator<T>;
    function unique<T, U>(iterator: Iterator<T> | AsyncIterator<T>, uniqueFn: (value: T) => U): AsyncIterator<T>;
    function concat<T>(...iterators: AsyncIterator<T>[]): AsyncIterator<T>;
    function fromArray<T>(array: T[]): AsyncIterator<T>;
    function fromObject<V>(object: {
        [key: string]: V;
    }): AsyncIterator<Entry<string, V>>;
    function toArray<T>(iterator: Iterator<T> | AsyncIterator<T>): Promise<T[]>;
    function toObject<V>(iterator: AsyncIterator<Entry<string, V>>): Promise<{
        [key: string]: V;
    }>;
    function create<T>(next: () => IteratorResult<T> | Promise<IteratorResult<T>>): AsyncIterator<T>;
}
export default AsyncIterator;
