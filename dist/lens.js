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
import State from './state';
import { Store } from './store';
import { Observable, Subject } from './observable';
export var Lens;
(function (Lens) {
    function compose(parent, lens) {
        var getSubject = Subject.create(), setSubject = Subject.create();
        Observable.map(parent.dispatcher, patch => {
            if (patch.added)
                return { range: patch.range, added: State.map(patch.added, lens.get) };
            return { range: patch.range };
        }).subscribe(getSubject);
        Observable.map(setSubject, patch => {
            if (patch.added)
                return { range: patch.range, added: State.map(patch.added, lens.set) };
            return { range: patch.range };
        }).subscribe(parent.dispatcher);
        return Store.create(State.map(parent.state, lens.get), { subscribe: getSubject.subscribe, onNext: setSubject.onNext });
    }
    Lens.compose = compose;
})(Lens || (Lens = {}));
export default Lens;
//# sourceMappingURL=lens.js.map