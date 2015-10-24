import _State from './state';
import _AsyncIterator from './async_iterator';
import { List as _List, MutableList as _MutabeList } from './list';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject } from './observable';
import _PromiseUtils from './promise_utils';
import _Lens from './lens';
export declare function Sonic(obj: any): _MutabeList<{}>;
export declare module Sonic {
    const State: typeof _State;
    const AsyncIterator: typeof _AsyncIterator;
    const List: typeof _List;
    const Tree: typeof _Tree;
    const Subject: typeof _Subject;
    const Cache: typeof _Cache;
    const PromiseUtils: typeof _PromiseUtils;
    const Lens: typeof _Lens;
}
export default Sonic;
