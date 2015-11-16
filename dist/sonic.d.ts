import _State from './state';
import _AsyncIterator from './async_iterator';
import { Store as _Store, MutableStore as _MutabeStore } from './store';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject } from './observable';
import _PromiseUtils from './promise_utils';
declare function Sonic(obj: any): _MutabeStore<{}>;
declare module Sonic {
    const State: typeof _State;
    const AsyncIterator: typeof _AsyncIterator;
    const Store: typeof _Store;
    const Tree: typeof _Tree;
    const Subject: typeof _Subject;
    const Cache: typeof _Cache;
    const PromiseUtils: typeof _PromiseUtils;
}
export default Sonic;
