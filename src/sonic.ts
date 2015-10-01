import _State          from './state';
import _StateIterator  from './state_iterator';
import _KeyedList      from './keyed_list';

export function Sonic(obj: any) {}

export module Sonic {
  export var State          = _State;
  export var StateIterator  = _StateIterator;
  export var KeyedList      = _KeyedList;
};


declare var module: any;
module.exports = Sonic;

export default Sonic;
