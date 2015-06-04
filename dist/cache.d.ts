import Key from './key';
import { IList } from './list';
export declare class Cache<V> implements IList<V> {
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
    has: (key: string | number) => boolean;
    get: (key: string | number) => V;
    prev: (key: string | number) => string | number;
    next: (key?: string | number) => string | number;
}
export default Cache;
