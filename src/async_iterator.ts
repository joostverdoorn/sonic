import   Key     from './key';
import { IList } from './list';
import { Range } from './range';
import bind      from './bind';

export class AsyncIterator<V> {

  public current: Key;
  public range: Range;

  protected _list: IList<V>;

  constructor(list: IList<V>, range: Range = [null, null]) {
    this._list = list;
    this.range = range;
  }

  get(): Promise<V> {
    return this._list.get(this.current);
  }

  prev(): Promise<Key> {
    return this._list.prev(this.current == null ? this.range[1] : this.current).then((prev: Key) => {
      if (prev == this.range[0]) return this.current = null;
      return this.current = prev;
    });
  }

  next(): Promise<Key> {
    return this._list.next(this.current == null ? this.range[0] : this.current).then((prev: Key) => {
      if (prev == this.range[1]) return this.current = null;
      return this.current = prev;
    });
  }

  static every<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean> {
    return iterator.next()
      .then(key => key == null || iterator.get().then(value =>
        predicate(value, key)).then(result => result ? AsyncIterator.every(iterator, predicate) : false));
  }

  static some<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean> {
    return AsyncIterator.every(iterator, (value: V, key: Key) => Promise.resolve(predicate(value, key)).then(result => !result)).then(result => !result);
  }

  static forEach<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => void | Promise<void>): Promise<void> {
    return AsyncIterator.every(iterator, (value: V, key: Key) => Promise.resolve(fn(value, key)).then(() => true)).then(() => {})
  }

  static reduce<V, W>(iterator: AsyncIterator<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W): Promise<W> {
    return AsyncIterator.forEach(iterator, (value: V, key: Key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value })).then(() => memo);
  }

  static toArray<V>(iterator: AsyncIterator<V>): Promise<V[]> {
    return AsyncIterator.reduce<V, V[]>(iterator, (memo: V[], value: V) => (memo.push(value), memo), []);
  }

  static findKey<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<Key> {
    var key: Key;
    return AsyncIterator.some(iterator, (v: V, k: Key) => Promise.resolve(fn(v, k)).then(res => res ? (!!(key = k) || true) : false)).then(found => found ? key : null);
  }

  static find<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<V> {
    return AsyncIterator.findKey(iterator, fn).then(bind(iterator.get, iterator));
  }

  static keyOf<V>(iterator: AsyncIterator<V>, value: V): Promise<Key> {
    return AsyncIterator.findKey(iterator, v => v === value);
  }

  static indexOf<V>(iterator: AsyncIterator<V>, value: V): Promise<number> {
    var index = -1;
    return AsyncIterator.some(iterator, (v: V, k: Key) => (index++, value == v)).then((found) => {if (found) {return index} else {throw new Error()}});
  }

  static keyAt<V>(iterator: AsyncIterator<V>, index: number): Promise<Key> {
    return AsyncIterator.findKey(iterator, () => 0 === index--);
  }

  static at<V>(iterator: AsyncIterator<V>, index: number): Promise<V> {
    return AsyncIterator.keyAt(iterator, index).then(bind(iterator.get, iterator));
  }

  static contains<V>(iterator: AsyncIterator<V>, value: V): Promise<boolean> {
    return AsyncIterator.some(iterator, v => v === value);
  }

}

export default AsyncIterator;
