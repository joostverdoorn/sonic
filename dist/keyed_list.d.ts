import Key from './key';
import State from './state';
import List from './list';
export default class KeyedList<V> extends List<V> {
    static DELETED: {};
    private _keyFn;
    private _pseudoState;
    constructor(values: {
        [key: string]: V;
    }, keyFn?: (value: V) => Key);
    getState(): State<V>;
    add(value: V): Promise<void>;
    replace(key: Key, value: V): Promise<void>;
    remove(key: Key): Promise<void>;
}
