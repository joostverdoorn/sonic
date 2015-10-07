import _Patch from './patch';
import _State from './state';
import _StateIterator from './state_iterator';
import _List from './list';
import _factory from './factory';
import { Subject as _Subject } from './observable';
import _Mutable from './mutable';
export declare function Sonic(obj: any): _Mutable<{}>;
export declare module Sonic {
    var Patch: typeof _Patch;
    var State: typeof _State;
    var StateIterator: typeof _StateIterator;
    var List: typeof _List;
    var factory: typeof _factory;
    var Subject: typeof _Subject;
    var Mutable: typeof _Mutable;
}
export default Sonic;
