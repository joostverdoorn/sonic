import _State from './state';
import _AsyncIterator from './async_iterator';
import { List as _List } from './list';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject } from './observable';
import _PromiseUtils from './promise_utils';
import _Lens from './lens';
export function Sonic(obj) {
    if (obj instanceof Array)
        return _List.create(_State.fromArray(obj), _Subject.create());
    if (obj instanceof Object)
        return _List.create(_State.fromObject(obj), _Subject.create());
}
export var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.AsyncIterator = _AsyncIterator;
    Sonic.List = _List;
    Sonic.Tree = _Tree;
    Sonic.Subject = _Subject;
    Sonic.Cache = _Cache;
    Sonic.PromiseUtils = _PromiseUtils;
    Sonic.Lens = _Lens;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
