import   Key       from './key';
import   State     from './state';
import   List      from './list';
import { Observer, Disposable, Subject } from './observable';
import { Operation, Patch } from './patch';

export default class KeyedList<V> extends List<V> {
  static DELETED = {};

  protected _keyFn: (value: V) => Key;
  protected _subject: Subject<V>;

  private _pseudoState: {
    get:  {[key: string]: V},
    prev: {[key: string]: Key},
    next: {[key: string]: Key}
  }

  constructor(values: {[key: string]: V}, keyFn?: (value: V) => Key) {
    super();

    this._keyFn = keyFn || Key.create;
    this._subject = new Subject();

    this._pseudoState = Object.keys(values).reduce((state: any, key: Key, index: number, keys: Key[]) => {
      state.get[key]  = values[key];

      if (index == 0) state.next['null'] = key;
      if (index == keys.length - 1) state.prev['null'] = key;

      state.prev[key] = keys[index - 1] != null ? keys[index - 1] : null;
      state.next[key] = keys[index + 1] != null ? keys[index + 1] : null;
      return state;
    }, {
      get:  Object.create(null),
      prev: Object.create(null),
      next: Object.create(null)
    });
  }

  getState(): State<V> {
    var pseudoState = this._pseudoState;

    return {
      get: (key: Key): Promise<V> => {
        if (key in pseudoState.get && pseudoState.get[key] != KeyedList.DELETED) return Promise.resolve(pseudoState.get[key]);
        return Promise.reject<V>(new Error);
      },

      prev: (key: Key = null): Promise<Key> => {
        if (key in pseudoState.prev) return Promise.resolve(pseudoState.prev[key]);
        return Promise.reject<Key>(new Error);
      },

      next: (key: Key = null): Promise<Key> => {
        if (key in pseudoState.next) return Promise.resolve(pseudoState.next[key]);
        return Promise.reject<Key>(new Error);
      }
    }
  }

  add(value: V): Promise<void> {
    var key = this._keyFn(value);
    if (key in this._pseudoState.get) return this.replace(key, value);

    var pseudoState = Object.create(this._pseudoState);
    pseudoState.get[key] = value;

    var prev = pseudoState.prev['null'],
        next = <Key> null;

    pseudoState.prev[next] = key;
    pseudoState.next[key] = next;

    pseudoState.prev[key] = prev;
    pseudoState.next[prev] = key

    this._pseudoState = pseudoState;

    this._subject.onInvalidate([{op: Operation[Operation.add], key, value: Promise.resolve(value)}]);
    return Promise.resolve();
  }

  replace(key: Key, value: V): Promise<void> {
    if (!(key in this._pseudoState.get)) return Promise.reject(new Error);

    var pseudoState = Object.create(this._pseudoState);
    pseudoState.get[key] = value;

    this._pseudoState = pseudoState;

    this._subject.onInvalidate([{op: Operation[Operation.replace], key, value: Promise.resolve(value)}]);
    return Promise.resolve();
  }

  remove(key: Key): Promise<void> {
    if (!(key in this._pseudoState.get)) return Promise.reject(new Error);

    var pseudoState = Object.create(this._pseudoState);
    pseudoState.get[key] = KeyedList.DELETED;

    var prev = pseudoState.prev[key],
        next = pseudoState.next[key];

    pseudoState.prev[next] = prev;
    pseudoState.next[prev] = next;

    this._pseudoState = pseudoState;

    this._subject.onInvalidate([{op: Operation[Operation.remove], key}]);
    return Promise.resolve();
  }

  observe(observer: Observer<V>): Disposable {
    return this._subject.observe(observer);
  }
}
