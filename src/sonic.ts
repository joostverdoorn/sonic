import _State                from './state';
import _AsyncIterator        from './async_iterator';
import _List                 from './list';
import _Tree                 from './tree';
import _Cache                from './cache';
// import _factory              from './factory';
import {Subject as _Subject} from './observable';
import _Mutable              from './mutable';
import _PromiseUtils         from './promise_utils';

export function Sonic(obj: any) {
  if (obj instanceof Array)  return _Mutable.create(_State.fromArray(obj),  new _Subject);
  if (obj instanceof Object) return _Mutable.create(_State.fromObject(obj), new _Subject);
}

export module Sonic {
  export const State          = _State;
  export const AsyncIterator  = _AsyncIterator;
  export const List           = _List;
  export const Tree           = _Tree;
  export const Subject        = _Subject;
  export const Mutable        = _Mutable;
  export const Cache          = _Cache;
  export const PromiseUtils   = _PromiseUtils;
};

declare const module: any;
module.exports = Sonic;

export default Sonic;
