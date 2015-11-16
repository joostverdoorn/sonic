import PromiseUtils from './promise_utils';

type Key = string;

module Key {
  // export const NOT_FOUND_ERROR = new Error("No entry at the specified key");
  // export const NOT_FOUND = PromiseUtils.lazy((resolve, reject) => reject(NOT_FOUND_ERROR));

  export const sentinel: Key = null;

  var uniqueKey = 0;

  export function key(key: Key): string {
    return key.toString()
  }

  export function create() {
    return "s_" + uniqueKey++;
  }
}

export default Key;
