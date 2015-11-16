declare type Key = string;
declare module Key {
    const NOT_FOUND_ERROR: Error;
    const NOT_FOUND: Promise<{}>;
    const sentinel: Key;
    function key(key: Key): string;
    function create(): string;
}
export default Key;
