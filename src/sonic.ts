import _State                         from './state';
import _AsyncIterator                 from './async_iterator';
import { Store as _Store,
         MutableStore as _MutabeStore } from './store';
import _Tree                          from './tree';
import _Cache                         from './cache';
import {Subject as _Subject}          from './observable';
import _PromiseUtils                  from './promise_utils';
import _Lens                          from './lens';

function Sonic(obj: any) {
  if (obj instanceof Array)  return _Store.create(_State.fromArray(obj),  _Subject.create());
  if (obj instanceof Object) return _Store.create(_State.fromObject(obj), _Subject.create());
}

module Sonic {
  export const State          = _State;
  export const AsyncIterator  = _AsyncIterator;
  export const Store          = _Store;
  export const Tree           = _Tree;
  export const Subject        = _Subject;
  export const Cache          = _Cache;
  export const PromiseUtils   = _PromiseUtils;
  export const Lens           = _Lens;
};

export default Sonic;
declare const module: any;
module.exports = Sonic;
