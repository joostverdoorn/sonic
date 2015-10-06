import Key from './key';
import State from './state';
import List from './list';
import { Observer, Disposable, Subject } from './observable';
export default class KeyedList<V> extends List<V> {
    static DELETED: {};
    protected _keyFn: (value: V) => Key;
    protected _subject: Subject<V>;
    private _pseudoState;
    constructor(values: {
        [key: string]: V;
    }, keyFn?: (value: V) => Key);
    getState(): State<V>;
    add(value: V): Promise<void>;
    replace(key: Key, value: V): Promise<void>;
    remove(key: Key): Promise<void>;
    observe(observer: Observer<V>): Disposable;
}
