import Key   from './key';

export type Range<K> = [Position<K>, Position<K>];

export type PrevPosition<K> = {
  prev: K
}

export type NextPosition<K> = {
  next: K
}

export type Position<K> = PrevPosition<K> | NextPosition<K>;

export module Range {
  export const all: Range<any> = [{next: Key.SENTINEL}, {prev: Key.SENTINEL}];

  export function reverse<K>([from, to]: Range<K>): Range<K> {
    return [Position.reverse<K>(to), Position.reverse<K>(from)];
  }
}

export module Position {
  export function isPrevPosition<K>(position: Position<K>): position is PrevPosition<K> {
    return 'prev' in position;
  }

  export function isNextPosition<K>(position: Position<K>): position is NextPosition<K> {
    return 'next' in position;
  }

  export function reverse<K>(position: Position<K>): Position<K> {
    return Position.isPrevPosition<K>(position) ? {next: position.prev} : {prev: position.next};
  }
}

export default Range;
