import _State                         from './state';
import _AsyncIterator                 from './async_iterator';
import { Store as _Store,
         MutableStore as _MutableStore } from './store';
import { Tree as _Tree,
         Path as _Path }              from './tree';
import _Cache                         from './cache';
import { Subject as _Subject,
         Observable as _Observable }  from './observable';
import _PromiseUtils                  from './promise_utils';
import _Lens                          from './lens';
import _Patch                         from './patch';
import { Range as _Range,
         Position as _Position }      from './range';


function Sonic<V>(obj: any): _MutableStore<string | number, V> {
  if (obj instanceof Array)  return _Store.create(_State.fromArray(obj),  _Subject.create());
  if (obj instanceof Object) return _Store.create(_State.fromObject(obj), _Subject.create());
}

module Sonic {
  export const State          = _State;
  export const AsyncIterator  = _AsyncIterator;
  export const Store          = _Store;
  export const Tree           = _Tree;
  export const Path           = _Path;
  export const Subject        = _Subject;
  export const Observable     = _Observable;
  export const Cache          = _Cache;
  export const PromiseUtils   = _PromiseUtils;
  export const Lens           = _Lens;
  export const Patch          = _Patch;
  export const Range          = _Range;
  export const Position       = _Position;

  export function map<T, U>(mapFn: (value: T) => U) {
    if (State.isState(this)) return State.map(this, mapFn);
  }

  export function toArray<T>() {
    if (State.isState(this)) return State.toArray(this);
  }
};

export default Sonic;
declare const module: any;
module.exports = Sonic;
