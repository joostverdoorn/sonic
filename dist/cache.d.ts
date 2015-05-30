import { IList } from './list';
import Key from './key';
export default class Cache<V> implements IList<V> {
    protected _byKey: {
        [key: string]: V;
    };
    protected _next: {
        [key: string]: Key;
    };
    protected _prev: {
        [key: string]: Key;
    };
    protected _list: IList<V>;
    constructor(list: IList<V>);
    has(key: Key): boolean;
    get(key: Key): V;
    prev(key: Key): Key;
    next(key?: Key): Key;
}
