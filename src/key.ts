type Key = number | string;

module Key {
  var uniqueKey = 0;

  export function key(key: Key): string {
    return key.toString()
  }

  export function create() {
    return uniqueKey++;
  }
}

export default Key;
