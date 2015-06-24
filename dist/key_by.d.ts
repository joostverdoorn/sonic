import Key from './key';
import { IList } from './list';
export declare class KeyBy<V> implements IList<V> {
    protected _sourceKeyByKey: {
        [key: string]: Key;
    };
    protected _keyBySourceKey: {
        [key: string]: Key;
    };
    protected _keyFn: (value: V, key?: Key) => Key;
    protected _list: IList<V>;
    constructor(list: IList<V>, keyFn: (value: V, key?: Key) => Key);
    get: (key: string | number) => V;
    prev: (key: string | number) => string | number;
    next: (key?: string | number) => string | number;
}
export default KeyBy;
