import Key   from './key';
import Entry from './entry';

export interface AsyncIterator<T> {
  next: () => Promise<IteratorResult<T>>
}

export module AsyncIterator {

  export const sentinel: IteratorResult<any> = { done: true };

  export const Empty: AsyncIterator<any> = {
    next: () => Promise.resolve(sentinel)
  }

  export function every<T>(iterator: AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean> {
    function loop(): Promise<boolean> {
      return iterator.next().then(result => result.done ? true : Promise.resolve(predicate(result.value)).then(satisfied => satisfied ? loop() : false));
    }

    return loop();
  }

  export function some<T>(iterator: AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean> {
    return every(iterator, value => Promise.resolve(predicate(value)).then(result => !result)).then(result => !result);
  }

  export function forEach<T>(iterator: AsyncIterator<T>, fn: (value: T) => void | Promise<void>): Promise<void> {
    return every(iterator, (value: T) => Promise.resolve(fn(value)).then(() => true)).then(() => {})
  }

  export function reduce<T, U>(iterator: AsyncIterator<T>, fn: (memo: U, value: T) => U | Promise<U>, memo?: U): Promise<U> {
    return forEach(iterator, (value: T) => Promise.resolve(fn(memo, value)).then(value => { memo = value })).then(() => memo);
  }

  export function find<T>(iterator: AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<T> {
    var result: T;
    return some(iterator, value => Promise.resolve(predicate(value)).then(satisfied => satisfied ? (result = value, true) : false)).then(satisfied => satisfied ? result : Key.NOT_FOUND);
  }

  export function indexOf<T>(iterator: AsyncIterator<T>, value: T): Promise<number> {
    var index = -1;
    return some(iterator, v => (index++, value == v)).then(found => found ? index : Key.NOT_FOUND);
  }

  export function at<T>(iterator: AsyncIterator<T>, index: number): Promise<T> {
    return find(iterator, () => 0 === index--);
  }

  export function contains<T>(iterator: AsyncIterator<T>, value: T): Promise<boolean> {
    return some(iterator, v => v === value);
  }

  export function is<T>(iterator: AsyncIterator<T>, other: AsyncIterator<T>, equals: (a: T, b: T) => boolean | Promise<boolean> = (a, b) => a === b): Promise<boolean> {
    return AsyncIterator.every(iterator, value => {
      return other.next().then(result => !result.done && equals(result.value, value));
    }).then(res => res ? other.next().then(result => result.done) : false);
  }

  export function concat<T>(...iterators: AsyncIterator<T>[]): AsyncIterator<T> {
    return iterators.reduce((memo, value) => {
      var iterated = false,
          queue = Promise.resolve(null);

      return {
        next: () => queue = queue.then(() => {}, () => {}).then(() => iterated ? value.next() : memo.next().then(result => result.done ? (iterated = true, value.next()) : result))
      }

    }, Empty);
  }

  export function fromArray<T>(array: T[]): AsyncIterator<T> {
    var current = -1,
        queue = Promise.resolve(null);

    return {
      next: () => queue = queue.then(() => {}, () => {}).then(() => Promise.resolve(++current >= array.length ? sentinel : {done: false, value: array[current]}))
    }
  }

  export function map<T, U>(iterator: AsyncIterator<T>, mapFn: (value: T) => U | Promise<U>): AsyncIterator<U> {
    return {
      next: () => iterator.next().then(result => {
        return result.done ? Promise.resolve(sentinel) : Promise.resolve(mapFn(result.value)).then(value => ({done: false, value}))
      })
    };
  }

  export function fromObject<V>(object: {[key: string]: V}): AsyncIterator<Entry<V>> {
    return fromArray(Object.keys(object).map<Entry<V>>(key => [key, object[key]]));
  }

  export function toArray<T>(iterator: AsyncIterator<T>): Promise<T[]> {
    return reduce(iterator, (memo: T[], value: T) => (memo.push(value), memo), []);
  }

  export function toObject<V>(iterator: AsyncIterator<Entry<V>>): Promise<{[key: string]: V}> {
    return reduce(iterator, (memo: {[key: string]: V}, [key, value]) => (memo[key] = value, memo), Object.create(null));
  }
}

export default AsyncIterator;
