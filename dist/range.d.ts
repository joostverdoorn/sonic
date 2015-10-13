import Key from './key';
export declare type Range = [Key, Key];
export declare module Range {
    const all: Range;
    function from(key: Key): Range;
    function to(key: Key): Range;
    function between(a: Key, b: Key): Range;
}
export default Range;
