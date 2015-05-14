declare type Id = number | string;
declare module Id {
    function key(id: Id): string;
    function create(): number;
}
export default Id;
