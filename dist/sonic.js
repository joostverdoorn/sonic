import _State from './state';
import _StateIterator from './state_iterator';
import _KeyedList from './keyed_list';
export function Sonic(obj) { }
export var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.StateIterator = _StateIterator;
    Sonic.KeyedList = _KeyedList;
})(Sonic || (Sonic = {}));
;
module.exports = Sonic;
export default Sonic;
