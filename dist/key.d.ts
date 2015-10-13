declare type Key = number | string;
declare module Key {
    const NOT_FOUND_ERROR: Error;
    const NOT_FOUND: Promise<{}>;
    const None: Key;
    function key(key: Key): string;
    function create(): number;
}
export default Key;
