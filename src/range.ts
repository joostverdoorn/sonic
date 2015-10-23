import Key   from './key';

export type Range = [Position, Position];

export type PrevPosition = {
  prev: Key
}

export type NextPosition = {
  next: Key
}

export type Position = PrevPosition | NextPosition;

export module Range {
  export const all: Range = [{next: Key.sentinel}, {prev: Key.sentinel}];
}

export module Position {
  export function isPrevPosition(position: Position): position is PrevPosition {
    return 'prev' in position;
  }

  export function isNextPosition(position: Position): position is NextPosition {
    return 'next' in position;
  }
}

export default Range;
