import Key   from './key';
import Maybe from './maybe';

export type Range = [Key, Key];

export module Range {
  export const all: Range = [Key.None, Key.None];

  export function from(key: Key): Range {
    return [key, Key.None];
  }

  export function to(key: Key): Range {
    return [Key.None, key];
  }

  export function between(a: Key, b: Key): Range {
    return [a, b];
  }
}

export default Range;
