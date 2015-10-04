import _State from './state';
import _StateIterator from './state_iterator';
import _List from './list';
import _Cache from './cache';
import _factory from './factory';
export function Sonic(obj) {
    if (obj instanceof Array)
        return new _List(_factory.fromArray(obj));
    if (obj instanceof Object)
        return new _List(_factory.fromObject(obj));
}
export var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.StateIterator = _StateIterator;
    Sonic.List = _List;
    // export var KeyedList      = _KeyedList;
    Sonic.Cache = _Cache;
    Sonic.factory = _factory;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
