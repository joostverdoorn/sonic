import Key from './key';
import { IList } from './list';
export declare class Index<V> implements IList<V> {
    protected _byIndex: Key[];
    protected _list: IList<V>;
    constructor(list: IList<V>);
    protected _add: (key: number | string, index: number) => void;
    get: (index: number) => Promise<V>;
    prev: (index: number) => Promise<number>;
    next: (index: number) => Promise<number>;
}
export default Index;
