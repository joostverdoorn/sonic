import _Patch from './patch';
import _State from './state';
import _StateIterator from './state_iterator';
import _List from './list';
import _cache from './cache';
import { Subject as _Subject } from './observable';
import _Mutable from './mutable';
export function Sonic(obj) {
    if (obj instanceof Array)
        return _Mutable.create(_State.fromArray(obj), new _Subject);
    if (obj instanceof Object)
        return _Mutable.create(_State.fromObject(obj), new _Subject);
}
export var Sonic;
(function (Sonic) {
    Sonic.Patch = _Patch;
    Sonic.State = _State;
    Sonic.StateIterator = _StateIterator;
    Sonic.List = _List;
    Sonic.Subject = _Subject;
    Sonic.Mutable = _Mutable;
    Sonic.cache = _cache;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
