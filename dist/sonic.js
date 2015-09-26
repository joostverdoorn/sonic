import { default as factory, fromPromise as _fromPromise } from './factory';
import _List from './list';
import _ObservableList from './observable_list';
import _MutableList from './mutable_list';
import _Unit from './unit';
import _ArrayList from './array_list';
import _LinkedList from './linked_list';
import _AsyncIterator from './async_iterator';
import { Path as _Path, Tree as _Tree } from './tree';
export function Sonic(obj) {
    return factory(obj);
}
export var Sonic;
(function (Sonic) {
    Sonic.List = _List;
    Sonic.ObservableList = _ObservableList;
    Sonic.MutableList = _MutableList;
    Sonic.Unit = _Unit;
    Sonic.ArrayList = _ArrayList;
    Sonic.LinkedList = _LinkedList;
    Sonic.Tree = _Tree;
    Sonic.Path = _Path;
    Sonic.AsyncIterator = _AsyncIterator;
    Sonic.fromPromise = _fromPromise;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
