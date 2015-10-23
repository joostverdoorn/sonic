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
}
export declare module Position {
    function isPrevPosition(position: Position): position is PrevPosition;
    function isNextPosition(position: Position): position is NextPosition;
}
export default Range;
