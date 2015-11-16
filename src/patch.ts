import   Key     from './key';
import { Position,
         Range } from './range';
import   State   from './state';

export interface Patch<V> {
  range: Range
  added?: State<V>
};

export module Patch {
  export function apply<V>(state: State<V>, patch: Patch<V>): State<V> {
    return State.splice(state, patch.range, patch.added);
  }

  export function add<V>(value: V, key?: Key, position: Position = {prev: null}): Patch<V> {
    return {added: State.unit(value, key), range: [position, position]};
  }

  export function set<V>(value: V, key: Key): Patch<V> {
    return {added: State.unit(value, key), range: [{prev: key}, {next: key}]};
  }

  export function push<V>(value: V, key?: Key): Patch<V> {
    return add(value, key, {prev: null});
  }

  export function unshift<V>(value: V, key?: Key): Patch<V> {
    return add(value, key, {next: null});
  }

  export function remove(key: Key): Patch<any> {
    return {range: [{prev: key}, {next: key}]};
  }
}

export default Patch;
