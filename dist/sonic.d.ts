import _State from './state';
import _StateIterator from './state_iterator';
import _List from './list';
import _KeyedList from './keyed_list';
import _Cache from './cache';
import _factory from './factory';
export declare function Sonic(obj: any): _List<{}>;
export declare module Sonic {
    var State: typeof _State;
    var StateIterator: typeof _StateIterator;
    var List: typeof _List;
    var Cache: typeof _Cache;
    var factory: typeof _factory;
    var KeyedList: typeof _KeyedList;
    var Operation: any;
}
export default Sonic;
