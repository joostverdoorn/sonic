import Key from './key';

export type Entry<K, V> = [K, V];

export module Entry {
  export function key<K>(entry: Entry<K, any>): K {
    return entry && entry[0];
  }

  export function value<V>(entry: Entry<any, V>): V {
    return entry[1];
  }

  export function is<K, V>(entry: Entry<K, V>, other: Entry<K, V>): boolean {
    return entry[0] === other[0] && entry[1] === other[1];
  }
}

export default Entry;
