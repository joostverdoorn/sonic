import Key from './key';
import Patch from './patch';
import State from './state';
import Range from './range';
import { Tree, Path } from './tree';
import { Observable, Subject } from './observable';
import AsyncIterator from './async_iterator';
export var List;
(function (List) {
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), patches = Observable.map(parent.patches, patch => {
            return { range: patch.range, added: patch.added ? State.map(patch.added, mapFn) : undefined };
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = State.filter(parent.state, filterFn), patches = Observable.map(parent.patches, patch => {
            return Promise.all([
                patch.range[0] == null ? Promise.resolve(null) : state.get(patch.range[0]).then(value => patch.range[0])
                    .catch(reason => reason === Key.NOT_FOUND_ERROR ? state.prev(patch.range[0]) : Promise.reject(reason)),
                patch.range[1] == null ? Promise.resolve(null) : state.get(patch.range[1]).then(value => patch.range[1])
                    .catch(reason => reason === Key.NOT_FOUND_ERROR ? state.next(patch.range[1]) : Promise.reject(reason)),
            ]).then((range) => { return { range: range, added: patch.added ? State.filter(patch.added, filterFn) : undefined }; });
        });
        function reduceFn(old, patch) {
            return state = Patch.apply(patch, old);
        }
        return create(state, patches, reduceFn);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = State.zoom(parent.state, key), patches = Observable.map(Observable.filter(parent.patches, patch => AsyncIterator.some(State.toIterator(parent.state, patch.range), (value, k) => k === key)), (patch) => { return { range: Range.all, added: patch.added ? State.zoom(patch.added, key) : undefined }; });
        return create(state, patches);
    }
    List.zoom = zoom;
    function flatten(parent) {
        var xpatches = Subject.create();
        var xparent = cache(map(parent, ((list, key) => {
            Observable.map(list.patches, patch => {
                return Promise.all([
                    patch.range[0] == null ? Tree.prev(xparent.state, [key]).then(Path.toKey) : Path.toKey(Path.append([key], patch.range[0])),
                    patch.range[1] == null ? Tree.next(xparent.state, [key]).then(Path.toKey) : Path.toKey(Path.append([key], patch.range[1]))
                ]).then((range) => { return { range: range, added: patch.added ? patch.added : undefined }; });
            }).subscribe(xpatches);
            return list.state;
        })));
        var state = State.flatten(xparent.state);
        return create(state, xpatches);
    }
    List.flatten = flatten;
    function keyBy(parent, keyFn) {
        var state = State.keyBy(parent.state, keyFn), parentState = parent.state, patches = Observable.map(parent.patches, (patch) => {
            parentState = parent.state;
            return Promise.all([
                patch.range[0] == Key.None ? Promise.resolve(Key.None) : parentState.get(patch.range[0]).then(value => keyFn(value, patch.range[0])),
                patch.range[1] == Key.None ? Promise.resolve(Key.None) : parentState.get(patch.range[1]).then(value => keyFn(value, patch.range[1]))
            ]).then((range) => { return { range: range, added: patch.added ? State.keyBy(patch.added, keyFn) : undefined }; });
        });
        return create(state, patches);
    }
    List.keyBy = keyBy;
    function cache(parent) {
        var state = State.cache(parent.state), patches = Observable.map(parent.patches, patch => {
            return {
                range: patch.range,
                added: State.cache(patch.added)
            };
        });
        return List.create(state, patches);
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
