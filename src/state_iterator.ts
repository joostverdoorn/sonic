import Key   from './key';
import State from './state';
import Range from './range';

export class StateIterator<V> {
  public current: Key;
  public range: Range;
  public state: State<V>;

  constructor(state: State<V>, range: Range = [null, null]) {
    this.state = state;
    this.range = range;
  }

  get = (): Promise<V> => {
    return this.state.get(this.current);
  }

  prev = (): Promise<Key> => {
    return this.state.prev(this.current == null ? this.range[1] : this.current).then((prev: Key) => {
      if (prev == this.range[0]) return this.current = null;
      return this.current = prev;
    });
  }

  next = (): Promise<Key> => {
    return this.state.next(this.current == null ? this.range[0] : this.current).then((next: Key) => {
      if (next == this.range[1]) return this.current = null;
      return this.current = next;
    });
  }
}

export module StateIterator {
  export function first<V>(state: State<V>, range: Range = [null, null]): Promise<V> {
    return state.next(range[0]).then(state.get);
  }

  export function last<V>(state: State<V>, range: Range = [null, null]): Promise<V> {
    return state.prev(range[1]).then(state.get);
  }

  export function every<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<boolean> {
    var iterator = new StateIterator(state, range);

    function loop(): Promise<boolean> {
      return iterator.next().then(key => key == null || iterator.get().then(value => predicate(value, key)).then(result => result ? loop() : false));
    }

    return loop();
  }

  export function some<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<boolean> {
    return every(state, (value, key) => Promise.resolve(predicate(value, key)).then(result => !result), range).then(result => !result);
  }

  export function forEach<V>(state: State<V>, fn: (value: V, key?: Key) => void | Promise<void>, range?: Range): Promise<void> {
    return every(state, (value: V, key: Key) => Promise.resolve(fn(value, key)).then(() => true), range).then(() => {})
  }

  export function reduce<V, W>(state: State<V>, fn: (memo: W, value: V, key?: Key) => W | Promise<W>, memo?: W, range?: Range): Promise<W> {
    return forEach(state, (value: V, key: Key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value }), range).then(() => memo);
  }

  export function toArray<V>(state: State<V>, range?: Range): Promise<V[]> {
    return reduce(state, (memo: V[], value: V) => (memo.push(value), memo), [], range);
  }

  export function toObject<V>(state: State<V>, range?: Range): Promise<{[key: string]: V}> {
    return reduce(state, (memo: {[key: string]: V}, value: V, key: Key) => (memo[key] = value, memo), Object.create(null), range);
  }

  export function findKey<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<Key> {
    var key: Key;
    return some(state, (v: V, k: Key) => Promise.resolve(predicate(v, k)).then(res => res ? (key = k, true) : false), range)
      .then(found => found ? key : null);
  }

  export function find<V>(state: State<V>, predicate: (value: V, key?: Key) => boolean | Promise<boolean>, range?: Range): Promise<V> {
    return findKey(state, predicate, range).then(state.get);
  }

  export function keyOf<V>(state: State<V>, value: V, range?: Range): Promise<Key> {
    return findKey(state, v => v === value, range);
  }

  export function indexOf<V>(state: State<V>, value: V, range?: Range): Promise<number> {
    var index = -1;
    return some(state, (v: V, k: Key) => (index++, value == v), range).then((found) => {if (found) {return index} else State.NOT_FOUND});
  }

  export function keyAt<V>(state: State<V>, index: number, range?: Range): Promise<Key> {
    return findKey(state, () => 0 === index--, range);
  }

  export function at<V>(state: State<V>, index: number, range?: Range): Promise<V> {
    return keyAt(state, index, range).then(state.get);
  }

  export function contains<V>(state: State<V>, value: V, range?: Range): Promise<boolean> {
    return some(state, v => v === value, range);
  }
}

export default StateIterator;
