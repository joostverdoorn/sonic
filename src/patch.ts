import Key from './key';
import State from './state';

export interface Patch<V> { operation: string, key: Key };
export interface DeletePatch<V> extends Patch<V> {};
export interface SetPatch<V> extends Patch<V> { key: Key, value: V, before?: Key };

export module Patch {
  export const SET = "set";
  export const DELETE = "delete";

  export function setPatch<V>(key: Key, value: V, before?: Key): SetPatch<V> {
    return {
      operation: SET,
      key: key,
      value: value,
      before: before
    }
  }

  export function deletePatch<V>(key: Key): DeletePatch<V> {
    return {
      operation: DELETE,
      key: key
    }
  }

  export function isSetPatch<V>(patch: Patch<V>): patch is SetPatch<V> {
    return patch.operation === SET;
  }

  export function isDeletePatch<V>(patch: Patch<V>): patch is DeletePatch<V> {
    return patch.operation === DELETE;
  }
}

export default Patch;
