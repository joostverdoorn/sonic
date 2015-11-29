import   Key     from './key';
import { Position,
         Range } from './range';
import   State   from './state';

export interface Patch<K, V> {
  range: Range<K>
  added?: State<K, V>
};

export module Patch {
  export function apply<K, V>(state: State<K, V>, patch: Patch<K, V>): State<K, V> {
    return State.splice(state, patch.range, patch.added);
  }

  export function add<K, V>(value: V, key?: K, position: Position<K> = {prev: null}): Patch<K, V> {
    return {added: State.unit(value, key), range: [position, position]};
  }

  export function set<K, V>(value: V, key: K): Patch<K, V> {
    return {added: State.unit(value, key), range: [{prev: key}, {next: key}]};
  }

  export function push<K, V>(value: V, key?: K): Patch<K, V> {
    return add(value, key, {prev: null});
  }

  export function unshift<K, V>(value: V, key?: K): Patch<K, V> {
    return add(value, key, {next: null});
  }

  export function remove<K>(key: K): Patch<K, any> {
    return {range: [{prev: key}, {next: key}]};
  }
}

export default Patch;
