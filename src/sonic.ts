export * from './state';
export * from './async_iterator';
export * from './store';
export * from './entry';
export * from './tree';
export * from './cache';
export * from './observable';
export * from './promise_utils';
export * from './lens';
export * from './patch';
export * from './exceptions';
export * from './range';

// export const State          = _State;
// export const AsyncIterator  = _AsyncIterator;
// export const Store          = _Store;
// export const Tree           = _Tree;
// export const Path           = _Path;
// export const Subject        = _Subject;
// export const Observable     = _Observable;
// export const Cache          = _Cache;
// export const PromiseUtils   = _PromiseUtils;
// export const Lens           = _Lens;
// export const Patch          = _Patch;
// export const Range          = _Range;
// export const Position       = _Position;
// export const NotFound       = _NotFound;

// export function Sonic<V>(obj: any): _MutableStore<string | number, V> {
//   if (obj instanceof Array)  return _Store.create(_State.fromArray(obj),  _Subject.create());
//   if (obj instanceof Object) return _Store.create(_State.fromObject(obj), _Subject.create());
// }
//
// export default Sonic;
