declare type Key = string;
declare module Key {
    const sentinel: Key;
    function key(key: Key): string;
    function create(): string;
}
export default Key;
