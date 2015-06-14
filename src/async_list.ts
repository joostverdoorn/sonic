import Key from './key';
import { List, IList } from './list';
// import { IScheduler } from './scheduler';

export interface IScheduler {
  (schedulee: () => void): void;
}

export interface IAsyncList<V> {
  has: (key: Key) => Promise<boolean>;
  get: (key: Key) => Promise<V>;
  prev: (key?: Key) => Promise<Key>;
  next: (key?: Key) => Promise<Key>;
}

export class AsyncList<V> implements IAsyncList<V> {
  protected _list: IAsyncList<V> | IList<V>;
  protected _scheduler: IScheduler;

  constructor(list: IAsyncList<V> | IList<V>, scheduler?: IScheduler) {
    this._list = list;
    this._scheduler = scheduler || window.setTimeout;
  }

  has = (key: Key): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this._scheduler(() => {
        Promise.resolve(this._list.has(key))
               .then(resolve)
               .catch(reject);
      });
    });
  }

  get = (key: Key): Promise<V> => {
    return new Promise<V>((resolve, reject) => {
      this.has(key)
          .then(has => has ? resolve(this._list.get(key)) : reject())
          .catch(reject);
    });
  }

  prev = (key: Key): Promise<Key> => {
    return new Promise<Key>((resolve, reject) => {
      this._scheduler(() => {
        Promise.resolve(this._list.prev(key))
               .then(prev => prev != null ? resolve(prev) : reject())
               .catch(reject);
      });
    })
  }

  next = (key: Key): Promise<Key> => {
    return new Promise<Key>((resolve, reject) => {
      this._scheduler(() => {
        Promise.resolve(this._list.next(key))
               .then(prev => prev != null ? resolve(prev) : reject())
               .catch(reject);
      });
    })
  }

  static create<V>(list: IAsyncList<V>): AsyncList<V> {
    return new AsyncList<V>(list);
  }

  static map<V, W>(list: IAsyncList<V>, mapFn: (value: V, key?: Key) => W): AsyncList<W> {
    var {has, prev, next} = list;
    function get(key: Key) {
      return list.get(key).then(mapFn)
    }

    return new AsyncList<W>({has, get, prev, next})
  }
}

export default AsyncList;
