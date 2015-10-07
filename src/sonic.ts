import _Patch                from './patch'
import _State                from './state';
import _StateIterator        from './state_iterator';
import _List                 from './list';
import _KeyedList            from './keyed_list';
// import _Cache             from './cache';
import _factory              from './factory';
import {Subject as _Subject} from './observable';
import _Mutable              from './mutable';

export function Sonic(obj: any) {
  if (obj instanceof Array)  return _factory.Mutable.create(_factory.State.fromArray(obj));
  if (obj instanceof Object) return _factory.Mutable.create(_factory.State.fromObject(obj));
}

export module Sonic {
  export var Patch          = _Patch;
  export var State          = _State;
  export var StateIterator  = _StateIterator;
  export var List           = _List;
  // export var KeyedList      = _KeyedList;
  // export var Cache          = _Cache;
  export var factory        = _factory
  // export var KeyedList      = _KeyedList;
  export var Subject        = _Subject;
  export var Mutable        = _Mutable;
};


declare var module: any;
module.exports = Sonic;

export default Sonic;
