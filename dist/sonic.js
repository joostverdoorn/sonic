import _Patch from './patch';
import _State from './state';
import _StateIterator from './state_iterator';
import _List from './list';
import _factory from './factory';
import { Subject as _Subject } from './observable';
import _Mutable from './mutable';
export function Sonic(obj) {
    if (obj instanceof Array)
        return _factory.Mutable.create(_factory.State.fromArray(obj));
    if (obj instanceof Object)
        return _factory.Mutable.create(_factory.State.fromObject(obj));
}
export var Sonic;
(function (Sonic) {
    Sonic.Patch = _Patch;
    Sonic.State = _State;
    Sonic.StateIterator = _StateIterator;
    Sonic.List = _List;
    // export var KeyedList      = _KeyedList;
    // export var Cache          = _Cache;
    Sonic.factory = _factory;
    // export var KeyedList      = _KeyedList;
    Sonic.Subject = _Subject;
    Sonic.Mutable = _Mutable;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
