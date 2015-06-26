import Key from './key';
import { IList } from './list';
export declare class ListIterator<V> implements Iterator<V> {
    protected _list: IList<V>;
    protected _current: Promise<Key>;
    constructor(list: IList<V>);
    next(): IteratorResult<V>;
}
export default ListIterator;
