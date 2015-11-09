import Key from './key';

export type Entry<V> = [Key, V];

export module Entry {
  export function key<V>(entry: Entry<V>): Key {
    return entry && entry[0];
  }

  export function value<V>(entry: Entry<V>): V {
    return entry[1];
  }

  export function is<V>(entry: Entry<V>, other: Entry<V>): boolean {
    return entry[0] === other[0] && entry[1] === other[1];
  }
}

export default Entry;
