import Id from './id';
import { IList } from './list';
export declare type Path = Id[];
export interface ITree<V> extends IList<ITree<V> | V> {
}
export declare module Path {
    function id(path: Path): string;
    function create(id: Id): Path;
    function head(path: Path): Id;
    function get(path: Path, index: number): Id;
    function tail(path: Path): Path;
    function append(a: Id | Path, b: Id | Path): Path;
}
export declare module Tree {
    function has<V>(list: ITree<any>, path: Path, depth?: number): boolean;
    function get<V>(list: ITree<V>, path: Path, depth?: number): ITree<V> | V;
    function prev(list: ITree<any>, path?: Path, depth?: number): Path;
    function next(list: ITree<any>, path?: Path, depth?: number): Path;
}
