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
    get: (key: string | number) => Promise<V>;
    prev: (key: string | number) => Promise<string | number>;
    next: (key?: string | number) => Promise<string | number>;
}
export default Cache;
