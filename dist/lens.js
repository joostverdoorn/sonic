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