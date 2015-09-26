import Key from './key';
import { ITree } from './tree';
export interface IList<V> {
    get: (key: Key) => Promise<V>;
    prev: (key?: Key) => Promise<Key>;
    next: (key?: Key) => Promise<Key>;
}
export declare abstract class List<V> implements IList<V> {
    abstract get(key: Key): Promise<V>;
    abstract prev(key?: Key): Promise<Key>;
    abstract next(key?: Key): Promise<Key>;
    static create<V>(list: IList<V>): List<V>;
    static _add<V>(list: IList<V>, key: Key, value: V): IList<V>;
    static _remove<V>(list: IList<V>, key: Key): IList<V>;
    _add(key: Key, value: V): List<V>;
    _remove(key: Key): List<V>;
    reverse(): List<V>;
    map<W>(mapFn: (value: V, key?: Key) => W): List<W>;
    filter(filterFn: (value: V, key?: Key) => boolean): List<V>;
    flatten(): List<any>;
    flatMap<W>(flatMapFn: (value: V, key?: Key) => IList<W>): List<W>;
    cache(): List<V>;
    group(groupFn: (value: V, key: Key) => Key): List<List<V>>;
    index(): List<V>;
    zip<W, U>(other: IList<W>, zipFn: (v: V, w: W) => U): List<U>;
    skip(k: number): IList<V>;
    take(n: number): IList<V>;
    range(k: number, n: number): IList<V>;
    scan<W>(scanFn: (memo: W, value: V) => W, memo?: W): IList<W>;
    static isList(obj: any): boolean;
    static first<V>(list: IList<V>): Promise<V>;
    static last<V>(list: IList<V>): Promise<V>;
    static reverse<V>(list: IList<V>): IList<V>;
    static map<V, W>(list: IList<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): IList<W>;
    static filter<V>(list: IList<V>, filterFn: (value: V, key?: Key) => boolean): IList<V>;
    static flatten<V>(list: ITree<V>): ITree<V>;
    static flatMap<V, W>(list: IList<V>, flatMapFn: (value: V, key?: Key) => IList<W>): IList<W>;
    static cache<V>(list: IList<V>): IList<V>;
    static group<V>(list: IList<V>, groupFn: (value: V, key: Key) => Key): IList<IList<V>>;
    static index<V>(list: IList<V>): IList<V>;
    static zip<V, W, U>(list: IList<V>, other: IList<W>, zipFn: (v: V, w: W) => U): IList<U>;
    static skip<V>(list: IList<V>, k: number): IList<V>;
    static take<V>(list: IList<V>, n: number): IList<V>;
    static range<V>(list: IList<V>, k: number, n: number): IList<V>;
    static scan<V, W>(list: IList<V>, scanFn: (memo: W, value: V, key?: Key) => W, memo?: W): IList<W>;
}
export default List;
