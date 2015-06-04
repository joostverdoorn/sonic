import Key from './key';
import { IList } from './list';
export declare class Index<V> implements IList<V> {
    protected _byIndex: Key[];
    protected _list: IList<V>;
    constructor(list: IList<V>);
    has: (index: number) => boolean;
    get: (index: number) => V;
    prev: (index: number) => number;
    next: (index?: number) => number;
}
export default Index;
