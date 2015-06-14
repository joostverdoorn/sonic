import { default as factory, fromPromise as _fromPromise, fromIterator as _fromIterator } from './factory';
import _List from './list';
import _ObservableList from './observable_list';
import _MutableList from './mutable_list';
import _Unit from './unit';
import _ArrayList from './array_list';
import _LinkedList from './linked_list';
import _Tree from './tree';
function Sonic(obj) {
    return factory(obj);
}
var Sonic;
(function (Sonic) {
    Sonic.List = _List;
    Sonic.ObservableList = _ObservableList;
    Sonic.MutableList = _MutableList;
    Sonic.Unit = _Unit;
    Sonic.ArrayList = _ArrayList;
    Sonic.LinkedList = _LinkedList;
    Sonic.Tree = _Tree;
    Sonic.fromPromise = _fromPromise;
    Sonic.fromIterator = _fromIterator;
})(Sonic || (Sonic = {}));
module['exports'] = Sonic;
