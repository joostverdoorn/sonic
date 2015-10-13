import _State from './state';
import _AsyncIterator from './async_iterator';
import _List from './list';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject } from './observable';
import _Mutable from './mutable';
import _PromiseUtils from './promise_utils';
export declare function Sonic(obj: any): _Mutable<{}>;
export declare module Sonic {
    const State: typeof _State;
    const AsyncIterator: typeof _AsyncIterator;
    const List: typeof _List;
    const Tree: typeof _Tree;
    const Subject: typeof _Subject;
    const Mutable: typeof _Mutable;
    const Cache: typeof _Cache;
    const PromiseUtils: typeof _PromiseUtils;
}
export default Sonic;
