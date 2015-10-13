import Range from './range';
import State from './state';

export interface Patch<V> {
  range: Range
  added?: State<V>
};

export module Patch {
  export function apply<V>(patch: Patch<V>, state: State<V>): State<V> {
    return State.splice(state, patch.range, patch.added);
  }
}

export default Patch;
