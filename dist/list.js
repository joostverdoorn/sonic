import Patch from './patch';
import State from './state';
import Cache from './cache';
import { Observable } from './observable';
export var List;
(function (List) {
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), patches = Observable.map(parent.patches, patch => {
            if (Patch.isSetPatch(patch))
                return Promise.resolve(mapFn(patch.value, patch.key)).then((result) => Patch.setPatch(patch.key, result, patch.before));
            return patch;
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = State.filter(parent.state, filterFn), patches = Observable.map(parent.patches, patch => {
            if (Patch.isSetPatch(patch))
                return Promise.resolve(filterFn(patch.value, patch.key)).then(result => result ? patch : Patch.deletePatch(patch.key));
            return patch;
        });
        return create(state, patches);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = State.zoom(parent.state, key), patches = Observable.filter(parent.patches, patch => patch.key === key);
        return create(state, patches);
    }
    List.zoom = zoom;
    function cache(parent) {
        var cache = Cache.create(), state = Cache.apply(cache, parent.state), reducer = (state, patch) => {
            cache = Cache.patch(cache, patch);
            return Cache.apply(cache, parent.state);
        };
        return List.create(state, parent.patches, reducer);
    }
    List.cache = cache;
    function create(state, patches, reducer = State.patch) {
        const list = { state, patches };
        Observable.scan(patches, reducer, state).subscribe({
            onNext: (state) => { list.state = state; }
        });
        return list;
    }
    List.create = create;
})(List || (List = {}));
export default List;
