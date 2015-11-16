var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import _State from './state';
import _AsyncIterator from './async_iterator';
import { Store as _Store } from './store';
import _Tree from './tree';
import _Cache from './cache';
import { Subject as _Subject } from './observable';
import _PromiseUtils from './promise_utils';
function Sonic(obj) {
    if (obj instanceof Array)
        return _Store.create(_State.fromArray(obj), _Subject.create());
    if (obj instanceof Object)
        return _Store.create(_State.fromObject(obj), _Subject.create());
}
var Sonic;
(function (Sonic) {
    Sonic.State = _State;
    Sonic.AsyncIterator = _AsyncIterator;
    Sonic.Store = _Store;
    Sonic.Tree = _Tree;
    Sonic.Subject = _Subject;
    Sonic.Cache = _Cache;
    Sonic.PromiseUtils = _PromiseUtils;
})(Sonic || (Sonic = {}));
;
export default Sonic;
module.exports = Sonic;
//# sourceMappingURL=sonic.js.map