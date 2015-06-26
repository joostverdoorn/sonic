import { fromPromise as _fromPromise } from './factory';
import _List from './list';
import _ObservableList from './observable_list';
import _MutableList from './mutable_list';
import _Unit from './unit';
import _ArrayList from './array_list';
import _LinkedList from './linked_list';
import { Path as _Path, Tree as _Tree } from './tree';
export declare function Sonic(obj: any): _Unit<any>;
export declare module Sonic {
    var List: typeof _List;
    var ObservableList: typeof _ObservableList;
    var MutableList: typeof _MutableList;
    var Unit: typeof _Unit;
    var ArrayList: typeof _ArrayList;
    var LinkedList: typeof _LinkedList;
    var Tree: typeof _Tree;
    var Path: typeof _Path;
    var fromPromise: typeof _fromPromise;
}
export default Sonic;
