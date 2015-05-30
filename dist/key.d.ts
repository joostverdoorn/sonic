declare type Key = number | string;
declare module Key {
    function key(key: Key): string;
    function create(): number;
}
export default Key;
