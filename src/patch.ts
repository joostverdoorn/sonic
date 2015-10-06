import Key from './key';
import State from './state';

export enum Operation {
  "add",
  "remove",
  "replace"
}

export interface Patch<V> {
  type: string,
  key: Key,
  value?: V,
  oldValue?: V
}

export module Patch {
  export function reverse<V>(patch: Patch<V>, original: State<V>): Promise<Patch<V>> {
    return Promise.resolve(patch);
  }

  export function map<V, W>(patch: Patch<V>, mapFn: (value: V, key?: Key) => W | Promise<W>): Promise<Patch<W>> {
    return Promise.resolve(mapFn(patch.value, patch.key)).then( (value: W) => {
      return {type: patch.type, key: patch.key, value};
    })
  }

  export function filter<V>(patch: Patch<V>, filterFn: (value: V, key?: Key) => boolean, old: State<V>): Promise<void | Patch<V>> {
    if (patch.type == Operation[Operation.add] && filterFn(patch.value, patch.key)) return Promise.resolve(patch);

    if (patch.type == Operation[Operation.replace]) {
      if (filterFn(patch.oldValue, patch.key) && (!filterFn(patch.value, patch.key))) {
        return Promise.resolve({type: Operation[Operation.remove], key: patch.key});
      }

      if ((!filterFn(patch.oldValue, patch.key)) && (filterFn(patch.value, patch.key))) {
        return Promise.resolve({type: Operation[Operation.add], key: patch.key, value: patch.value});
      }

      if (filterFn(patch.oldValue, patch.key) && filterFn(patch.value, patch.key)) {
        return Promise.resolve(patch);
      }
    }

    if (patch.type == Operation[Operation.remove]) {
      return old.get(patch.key).then(value => filterFn(value, patch.key) ? patch : null)
    }

    return null;
  }
}

export default Patch;
