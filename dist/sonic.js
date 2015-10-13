import _State from './state';
import _AsyncIterator from './async_iterator';
import _List from './list';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject } from './observable';
import _Mutable from './mutable';
import _PromiseUtils from './promise_utils';
export function Sonic(obj) {
    if (obj instanceof Array)
        return _Mutable.create(_State.fromArray(obj), new _Subject);
    if (obj instanceof Object)
        return _Mutable.create(_State.fromObject(obj), new _Subject);
}
export var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.AsyncIterator = _AsyncIterator;
    Sonic.List = _List;
    Sonic.Tree = _Tree;
    Sonic.Subject = _Subject;
    Sonic.Mutable = _Mutable;
    Sonic.Cache = _Cache;
    Sonic.PromiseUtils = _PromiseUtils;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
