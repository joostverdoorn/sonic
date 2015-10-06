import Key from './key';
import State from './state';
export declare type Entry<V> = {
    key: Key;
    state: State<V>;
    get: Promise<V>;
    prev: Promise<Entry<V>>;
    next: Promise<Entry<V>>;
};
