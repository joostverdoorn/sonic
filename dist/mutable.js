import State from './state';
import { Observable } from './observable';
export var Mutable;
(function (Mutable) {
    function create(state, patches, reducer = State.patch) {
        const list = { state, patches };
        Observable.scan(patches, reducer, state).subscribe({
            onNext: (state) => { list.state = state; }
        });
        return list;
    }
    Mutable.create = create;
})(Mutable || (Mutable = {}));
export default Mutable;
