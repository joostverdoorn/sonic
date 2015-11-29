import State from './state';
export declare type Path<K, L> = [K, L];
export declare module Path {
    function head<K, L>(path: Path<K, L>): K;
    function tail<K, L>(path: Path<K, L>): L;
}
export declare type Tree<K, L, V> = State<K, State<L, V>>;
export declare module Tree {
    function get<K, L, V>(tree: Tree<K, L, V>, path: Path<K, L>): Promise<V>;
    function prev<K, L, V>(tree: Tree<K, L, V>, path: Path<K, L>): Promise<Path<K, L>>;
    function next<K, L, V>(tree: Tree<K, L, V>, path: Path<K, L>): Promise<Path<K, L>>;
}
export default Tree;
