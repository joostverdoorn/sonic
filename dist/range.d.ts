export declare type Range<K> = [Position<K>, Position<K>];
export declare type PrevPosition<K> = {
    prev: K;
};
export declare type NextPosition<K> = {
    next: K;
};
export declare type Position<K> = PrevPosition<K> | NextPosition<K>;
export declare module Range {
    const all: Range<any>;
    function reverse<K>([from, to]: Range<K>): Range<K>;
}
export declare module Position {
    function isPrevPosition<K>(position: Position<K>): position is PrevPosition<K>;
    function isNextPosition<K>(position: Position<K>): position is NextPosition<K>;
    function reverse<K>(position: Position<K>): Position<K>;
}
export default Range;
