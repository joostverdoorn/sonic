import _State from './state';
import _StateIterator from './state_iterator';
import _List from './list';
import _KeyedList from './keyed_list';
import _factory from './factory';
import { Subject as _Subject } from './observable';
export function Sonic(obj) {
    // if (obj instanceof Array) return new _List(_factory.fromArray(obj));
    // if (obj instanceof Object) return new _List(_factory.fromObject(obj));
}
export var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.StateIterator = _StateIterator;
    Sonic.List = _List;
    // export var KeyedList      = _KeyedList;
    // export var Cache          = _Cache;
    Sonic.factory = _factory;
    Sonic.KeyedList = _KeyedList;
    Sonic.Subject = _Subject;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
