import _State from './state';
import _AsyncIterator from './async_iterator';
import { Store as _Store } from './store';
import { Tree as _Tree, Path as _Path } from './tree';
import _Cache from './cache';
import { Subject as _Subject, Observable as _Observable } from './observable';
import _PromiseUtils from './promise_utils';
import _Lens from './lens';
import _Patch from './patch';
import { NotFound as _NotFound } from './exceptions';
import { Range as _Range, Position as _Position } from './range';
function Sonic(obj) {
    if (obj instanceof Array)
        return _Store.create(_State.fromArray(obj), _Subject.create());
    if (obj instanceof Object)
        return _Store.create(_State.fromObject(obj), _Subject.create());
}
var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.AsyncIterator = _AsyncIterator;
    Sonic.Store = _Store;
    Sonic.Tree = _Tree;
    Sonic.Path = _Path;
    Sonic.Subject = _Subject;
    Sonic.Observable = _Observable;
    Sonic.Cache = _Cache;
    Sonic.PromiseUtils = _PromiseUtils;
    Sonic.Lens = _Lens;
    Sonic.Patch = _Patch;
    Sonic.Range = _Range;
    Sonic.Position = _Position;
    Sonic.NotFound = _NotFound;
})(Sonic || (Sonic = {}));
;
export default Sonic;
module.exports = Sonic;
//# sourceMappingURL=sonic.js.map