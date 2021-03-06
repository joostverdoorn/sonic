import   Entry      from './entry';
import { NotFound } from './exceptions';


export interface AsyncIterator<T> {
  next: () => Promise<IteratorResult<T>>
}

export module AsyncIterator {

  export const done: IteratorResult<any> = { done: true };

  export const Empty: AsyncIterator<any> = {
    next: () => Promise.resolve(done)
  }

  export async function every<T>(iterator: Iterator<T> | AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean> {
    var result: IteratorResult<T>;

    while ((result = await (<AsyncIterator<T>> iterator).next()) && !result.done) {
      if (!(await predicate(result.value))) return false;
    }

    return true;
  }

  export async function some<T>(iterator: Iterator<T> | AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<boolean> {
    return !(await every(iterator, async (value: T) => !(await predicate(value))));
  }

  export async function forEach<T>(iterator: Iterator<T> | AsyncIterator<T>, fn: (value: T) => void | Promise<void>): Promise<void> {
    await every(iterator, async (value: T) => { await fn(value); return true });
  }

  export async function reduce<T, U>(iterator: Iterator<T> | AsyncIterator<T>, fn: (memo: U, value: T) => U | Promise<U>, memo?: U): Promise<U> {
    await forEach(iterator, async (value: T) => { memo = await fn(memo, value) });
    return memo;
  }

  export async function find<T>(iterator: Iterator<T> | AsyncIterator<T>, predicate: (value: T) => boolean | Promise<boolean>): Promise<T> {
    var result: T;

    if (await some(iterator, async (value: T) => !(await predicate(value)) ? false : (result = value, true))) {
      return result;
    } else {
      throw new NotFound;
    }
  }

  export async function indexOf<T>(iterator: Iterator<T> | AsyncIterator<T>, value: T): Promise<number> {
    var index = -1;

    if (await some(iterator, v => (index++, value == v))) {
      return index;
    } else {
      throw new NotFound;
    }
  }

  export function at<T>(iterator: Iterator<T> | AsyncIterator<T>, index: number): Promise<T> {
    return find(iterator, () => 0 === index--);
  }

  export function size<T>(iterator: Iterator<T> | AsyncIterator<T>): Promise<number> {
    var count = -1;
    return forEach(iterator, () => {count++}).then(() => count);
  }

  export function contains<T>(iterator: Iterator<T> | AsyncIterator<T>, value: T): Promise<boolean> {
    return some(iterator, v => v === value);
  }

  export async function is<T>(iterator: Iterator<T> | AsyncIterator<T>, other: AsyncIterator<T>, equals: (a: T, b: T) => boolean | Promise<boolean> = (a, b) => a === b): Promise<boolean> {
    return await every(iterator, async (value: T) => {
      var result = await other.next();
      return !result.done && equals(value, result.value);
    }) && (await other.next()).done;
  }

  export function map<T, U>(iterator: Iterator<T> | AsyncIterator<T>, mapFn: (value: T) => U | Promise<U>): AsyncIterator<U> {
    async function next() {
      var result = await (<AsyncIterator<T>> iterator).next();
      return result.done ? done : { done: false, value: await mapFn(result.value) };
    }

    return create(next);
  }

  export function filter<T>(iterator: Iterator<T> | AsyncIterator<T>, filterFn: (value: T) => boolean | Promise<boolean>): AsyncIterator<T> {
    async function next(): Promise<IteratorResult<T>> {
      var result = await (<AsyncIterator<T>> iterator).next();
      if (result.done) return done;
      if (await filterFn(result.value)) return result;
      return next();
    }

    return create(next);
  }

  export function scan<T, U>(iterator: Iterator<T> | AsyncIterator<T>, scanFn: (memo: U, value: T) => U | Promise<U>, memo?: U): AsyncIterator<U> {
    async function next() {
      var result = await (<AsyncIterator<T>> iterator).next();
      if (result.done) return done;
      memo = await scanFn(memo, result.value);
      return { done: false, value: memo };
    }

    return create(next);
  }

  export function zip<T, U>(iterator: Iterator<T> | AsyncIterator<T>, other: Iterator<U> | AsyncIterator<U>, zipFn: (t: T, u: U) => [T, U] | Promise<[T, U]> = (t, u) => [t, u]): AsyncIterator<[T, U]> {
    async function next() {
      var result = await (<AsyncIterator<T>> iterator).next();
      if (result.done) return done;

      var otherResult = await (<AsyncIterator<U>> other).next();
      if (otherResult.done) return done;

      return { done: false, value: await zipFn(result.value, otherResult.value)}
    }

    return create(next);
  }

  export function take<T>(iterator: Iterator<T> | AsyncIterator<T>, count: number): AsyncIterator<T> {
    var i = 0;

    async function next() {
      return ++i > count ? done : (<AsyncIterator<T>> iterator).next();
    }

    return create(next);
  }

  export function skip<T>(iterator: Iterator<T> | AsyncIterator<T>, count: number): AsyncIterator<T> {
    var i = 0;

    async function next(): Promise<IteratorResult<T>> {
      if (i < count) await some(iterator, () => ++i >= count);
      return (<AsyncIterator<T>> iterator).next();
    }

    return create(next);
  }

  export function unique<T, U>(iterator: Iterator<T> | AsyncIterator<T>, uniqueFn: (value: T) => U): AsyncIterator<T> {
    var cache: {[key: string]: boolean} = Object.create(null);

    return AsyncIterator.filter(iterator, async (value: T) => {
      var u = JSON.stringify(await uniqueFn(value));
      return (!cache[u]) || (cache[u] = true);
    });
  }

  export function concat<T>(...iterators: AsyncIterator<T>[]): AsyncIterator<T> {
    return iterators.reduce((memo, iterator) => {
      var iterated = false,
          queue = Promise.resolve(null);

      async function next() {
        if (iterated) return iterator.next();

        var result = await memo.next();
        if (!result.done) return result;

        iterated = true;
        return iterator.next();
      }

      return create(next);
    }, Empty);
  }

  export function fromArray<T>(array: T[]): AsyncIterator<T> {
    var current = -1,
        queue = Promise.resolve(null);

    async function next() {
      return ++current >= array.length ? done : {done: false, value: array[current]}
    }

    return create(next);
  }

  export function fromObject<V>(object: {[key: string]: V}): AsyncIterator<Entry<string, V>> {
    return fromArray(Object.keys(object).map<Entry<string, V>>(key => [key, object[key]]));
  }

  export function toArray<T>(iterator: Iterator<T> | AsyncIterator<T>): Promise<T[]> {
    return reduce(iterator, (memo: T[], value: T) => (memo.push(value), memo), []);
  }

  export function toObject<V>(iterator: AsyncIterator<Entry<string, V>>): Promise<{[key: string]: V}> {
    return reduce(iterator, (memo: {[key: string]: V}, [key, value]: Entry<string, V>) => (memo[key] = value, memo), Object.create(null));
  }

  export function create<T>(next: () => IteratorResult<T> | Promise<IteratorResult<T>>): AsyncIterator<T> {
    var queue = Promise.resolve<any>(null);

    return {
      next(): Promise<IteratorResult<T>> {
        return queue = queue.then(next);
      }
    };
  }
}

export default AsyncIterator;
