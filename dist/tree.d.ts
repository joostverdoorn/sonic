import Key from './key';
import State from './state';
export declare type Path = Key[];
export declare module Path {
    function key(path: Path): string;
    function fromKey(key: Key): Path;
    function toKey(path: Path): Key;
    function head(path: Path): Key;
    function get(path: Path, index: number): Key;
    function tail(path: Path): Path;
    function append(a: Key | Path, b: Key | Path): Path;
}
export declare type Tree<V> = State<State<V>>;
export declare module Tree {
    function get<V>(tree: Tree<V>, path: Path): Promise<Tree<V> | V>;
    function prev<V>(tree: Tree<V>, path: Path): Promise<Path>;
    function next<V>(tree: Tree<V>, path: Path): Promise<Path>;
}
export default Tree;
