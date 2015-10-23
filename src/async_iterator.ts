import Key   from './key';

export interface AsyncIterator<V> {
  get:  () => Promise<V>
  next: () => Promise<Key>
}

export module AsyncIterator {

  export type Entry<V> = [Key, V];

  export const Empty: AsyncIterator<any> = {
    get: () => Key.NOT_FOUND,
    next: () => Promise.resolve(Key.sentinel)
  }

  export interface Partial<V> {
    get?:  () => Promise<V>
    next?: () => Promise<Key>
  }

  export function extend<V>(iterator: AsyncIterator<V>, partial: Partial<V>): AsyncIterator<V> {
    iterator = Object.create(iterator);
    if ('get' in partial) iterator.get = partial.get;
    if ('next' in partial) iterator.next = partial.next;
    return iterator;
  }

  export function every<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean> {
    function loop(): Promise<boolean> {
      return iterator.next().then(key => key == null || iterator.get().then(value => predicate(value, key)).then(result => result ? loop() : false));
    }

    return loop();
  }

  export function some<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<boolean> {
    return every(iterator, (value, key) => Promise.resolve(predicate(value, key)).then(result => !result)).then(result => !result);
  }

  export function forEach<V>(iterator: AsyncIterator<V>, fn: (value: V, key?: Key) => void | Promise<void>): Promise<void> {
    return every(iterator, (value: V, key: Key) => Promise.resolve(fn(value, key)).then(() => true)).then(() => {})
  }

  export function reduce<V, W>(iterator: AsyncIterator<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W): Promise<W> {
    return forEach(iterator, (value: V, key: Key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value })).then(() => memo);
  }

  export function findKey<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<Key> {
    var key: Key;
    return some(iterator, (v: V, k: Key) => Promise.resolve(predicate(v, k)).then(res => res ? (key = k, true) : false))
      .then(found => found ? key : Key.NOT_FOUND);
  }

  export function find<V>(iterator: AsyncIterator<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>): Promise<V> {
    return findKey(iterator, predicate).then(iterator.get);
  }

  export function keyOf<V>(iterator: AsyncIterator<V>, value: V): Promise<Key> {
    return findKey(iterator, v => v === value);
  }

  export function indexOf<V>(iterator: AsyncIterator<V>, value: V): Promise<number> {
    var index = -1;
    return some(iterator, (v: V, k: Key) => (index++, value == v)).then(found => found ? index : Key.NOT_FOUND);
  }

  export function keyAt<V>(iterator: AsyncIterator<V>, index: number): Promise<Key> {
    return findKey(iterator, () => 0 === index--);
  }

  export function at<V>(iterator: AsyncIterator<V>, index: number): Promise<V> {
    return keyAt(iterator, index).then(iterator.get);
  }

  export function contains<V>(iterator: AsyncIterator<V>, value: V): Promise<boolean> {
    return some(iterator, v => v === value);
  }

  export function concat<V>(...iterators: AsyncIterator<V>[]): AsyncIterator<V> {
    return iterators.reduce((memo, value) => {
      var iterated = false;

      return {
        get:  () => iterated ? value.get() : memo.get(),
        next: () => iterated ? value.next() : memo.next().then(key => key !== Key.sentinel ? key : (iterated = true, value.next()))
      }
    }, Empty);
  }

  export function fromEntries<V>(entries: Entry<V>[]): AsyncIterator<V> {
    var current = -1;

    return {
      get:  () => current === -1 ? Key.NOT_FOUND : Promise.resolve(entries[current][1]),
      next: () => Promise.resolve(++current === entries.length ? Key.sentinel : entries[current][0])
    }
  }

  export function fromArray<V>(array: V[]): AsyncIterator<V> {
    return fromEntries(array.map<Entry<V>>((value, key) => [key, value]));
  }

  export function fromObject<V>(object: {[key: string]: V}): AsyncIterator<V> {
    return fromEntries(Object.keys(object).map<Entry<V>>(key => [key, object[key]]));
  }

  export function toArray<V>(iterator: AsyncIterator<V>): Promise<V[]> {
    return reduce(iterator, (memo: V[], value: V) => (memo.push(value), memo), []);
  }

  export function toObject<V>(iterator: AsyncIterator<V>): Promise<{[key: string]: V}> {
    return reduce(iterator, (memo: {[key: string]: V}, value: V, key: Key) => (memo[key] = value, memo), Object.create(null));
  }
}

export default AsyncIterator;
