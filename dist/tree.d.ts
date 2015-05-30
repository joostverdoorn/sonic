import Key from './key';
import { IList } from './list';
export declare type Path = Key[];
export interface ITree<V> extends IList<ITree<V> | V> {
}
export declare module Path {
    function key(path: Path): string;
    function create(key: Key): Path;
    function head(path: Path): Key;
    function get(path: Path, index: number): Key;
    function tail(path: Path): Path;
    function append(a: Key | Path, b: Key | Path): Path;
}
export declare module Tree {
    function has<V>(list: ITree<any>, path: Path, depth?: number): boolean;
    function get<V>(list: ITree<V>, path: Path, depth?: number): ITree<V> | V;
    function prev(list: ITree<any>, path?: Path, depth?: number): Path;
    function next(list: ITree<any>, path?: Path, depth?: number): Path;
}
export default Tree;
