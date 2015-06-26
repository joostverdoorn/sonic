import Key from './key';
import { IList } from './list';
import { IMutableList } from './mutable_list';
export declare type Path = Key[];
export interface ITree<V> extends IList<ITree<V> | V> {
}
export interface IMutableTree<V> extends IMutableList<IMutableTree<V> | V> {
}
export declare module Path {
    function key(path: Path): string;
    function fromKey(key: Key): Path;
    function toKey(path: Path): Key;
    function head(path: Path): Key;
    function get(path: Path, index: number): Key;
    function tail(path: Path): Path;
    function append(a: Key | Path, b: Key | Path): Path;
}
export declare module Tree {
    function get<V>(list: ITree<V>, path: Path, depth?: number): Promise<ITree<V> | V>;
    function prev(list: ITree<any>, path?: Path, depth?: number): Promise<Path>;
    function next(list: ITree<any>, path?: Path, depth?: number): Promise<Path>;
    function set<V>(list: IMutableTree<V>, path: Path, value: V): Promise<void>;
    function splice<V>(list: IMutableTree<V>, prev: Path, next: Path, ...values: V[]): Promise<void>;
}
export default Tree;
