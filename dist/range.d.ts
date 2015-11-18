import Key from './key';
export declare type Range = [Position, Position];
export declare type PrevPosition = {
    prev: Key;
};
export declare type NextPosition = {
    next: Key;
};
export declare type Position = PrevPosition | NextPosition;
export declare module Range {
    const all: Range;
    function reverse([from, to]: Range): Range;
}
export declare module Position {
    function isPrevPosition(position: Position): position is PrevPosition;
    function isNextPosition(position: Position): position is NextPosition;
    function reverse(position: Position): Position;
}
export default Range;
