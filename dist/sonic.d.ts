import _State from './state';
import _AsyncIterator from './async_iterator';
import { Store as _Store, MutableStore as _MutabeStore } from './store';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject, Observable as _Observable } from './observable';
import _PromiseUtils from './promise_utils';
import _Lens from './lens';
import _Patch from './patch';
import { Range as _Range, Position as _Position } from './range';
declare function Sonic(obj: any): _MutabeStore<{}>;
declare module Sonic {
    const State: typeof _State;
    const AsyncIterator: typeof _AsyncIterator;
    const Store: typeof _Store;
    const Tree: typeof _Tree;
    const Subject: typeof _Subject;
    const Observable: typeof _Observable;
    const Cache: typeof _Cache;
    const PromiseUtils: typeof _PromiseUtils;
    const Lens: typeof _Lens;
    const Patch: typeof _Patch;
    const Range: typeof _Range;
    const Position: typeof _Position;
}
export default Sonic;
