import _Patch                from './patch'
import _State                from './state';
import _StateIterator        from './state_iterator';
import _List                 from './list';
import _Cache                from './cache';
// import _factory              from './factory';
import {Subject as _Subject} from './observable';
import _Mutable              from './mutable';

export function Sonic(obj: any) {
  if (obj instanceof Array)  return _Mutable.create(_State.fromArray(obj),  new _Subject);
  if (obj instanceof Object) return _Mutable.create(_State.fromObject(obj), new _Subject);
}

export module Sonic {
  export var Patch          = _Patch;
  export var State          = _State;
  export var StateIterator  = _StateIterator;
  export var List           = _List;
  export var Subject        = _Subject;
  export var Mutable        = _Mutable;
  export var Cache          = _Cache;
};

declare var module: any;
module.exports = Sonic;

export default Sonic;
