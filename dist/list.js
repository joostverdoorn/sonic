import State from './state';
import { Observable } from './observable';
import { Patch } from './patch';
export var List;
(function (List) {
    function create(state, observable) {
        var list = {
            state: state,
            subscribe: observable.subscribe
        };
        observable.subscribe({
            onNext: patch => { list.state = State.patch(list.state, patch); }
        });
        return list;
    }
    List.create = create;
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), observable = Observable.map(parent, patch => {
            if (!Patch.isSetPatch(patch))
                return patch;
            else
                return Promise.resolve(mapFn(patch.value, patch.key)).then((result) => {
                    return {
                        operation: Patch.SET,
                        key: patch.key,
                        value: result,
                        before: patch.before
                    };
                });
        });
        return create(state, observable);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = State.filter(parent.state, filterFn), observable = Observable.map(parent, patch => {
            if (!Patch.isSetPatch(patch))
                return patch;
            else
                return Promise.resolve(filterFn(patch.value, patch.key)).then(result => {
                    if (result)
                        return patch;
                    return {
                        operation: Patch.DELETE,
                        key: patch.key
                    };
                });
        });
        return create(state, observable);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = State.zoom(parent.state, key), observable = Observable.filter(parent, patch => patch.key === key);
        return create(state, observable);
    }
    List.zoom = zoom;
})(List || (List = {}));
export default List;
