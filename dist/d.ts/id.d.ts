export declare type IdToken = number | string;
export declare type Id = IdToken | IdToken[];
export declare module Id {
    function key(id: Id): string;
    function get(id: Id, index: number): IdToken;
    function head(id: Id): IdToken;
    function tail(id: Id): IdToken[];
    function append(a: Id, b: Id): Id;
}
export default Id;
