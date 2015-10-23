import Range from './range';
import State from './state';

export interface Patch<V> {
  range: Range
  added?: State<V>
};

export module Patch {
  export function apply<V>(state: State<V>, patch: Patch<V>): State<V> {
    return State.splice(state, patch.range, patch.added);
  }
}

export default Patch;
