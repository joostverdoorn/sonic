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
    get: (key: number | string) => Promise<V>;
    prev: (key: number | string) => Promise<number | string>;
    next: (key?: number | string) => Promise<number | string>;
}
export default Cache;
