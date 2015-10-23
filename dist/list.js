import Key from './key';
import Patch from './patch';
import State from './state';
import { Range, Position } from './range';
import { Observable } from './observable';
import AsyncIterator from './async_iterator';
export var List;
(function (List) {
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), patches = Observable.map(parent.patches, patch => {
            return {
                range: patch.range,
                added: patch.added ? State.map(patch.added, mapFn) : undefined
            };
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var list, state = State.filter(parent.state, filterFn), patches = Observable.map(parent.patches, patch => {
            var from = patch.range[0], to = patch.range[1];
            return Promise.all([
                AsyncIterator.findKey(State.toIterator(State.reverse(state), [Position.isPrevPosition(from) ? { next: from.prev } : { prev: from.next }, { prev: null }]), filterFn)
                    .then(next => ({ next }), reason => reason === Key.NOT_FOUND_ERROR ? { next: Key.sentinel } : Promise.reject(reason)),
                AsyncIterator.findKey(State.toIterator(state, [to, { prev: null }]), filterFn)
                    .then(prev => ({ prev }), reason => reason === Key.NOT_FOUND_ERROR ? { prev: Key.sentinel } : Promise.reject(reason)),
            ]).then((range) => ({
                range: range,
                added: patch.added == undefined ? undefined : State.filter(patch.added, filterFn)
            }));
        });
        return list = create(state, patches, (oldState, patche) => state = Patch.apply(oldState, patche));
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = State.zoom(parent.state, key), patches = Observable.map(Observable.filter(parent.patches, patch => AsyncIterator.some(State.toIterator(parent.state, patch.range), (value, k) => k === key)), patch => {
            return {
                range: Range.all,
                added: patch.added ? State.zoom(patch.added, key) : undefined
            };
        });
        return create(state, patches);
    }
    List.zoom = zoom;
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
    function create(state, patches, reducer = Patch.apply) {
        const list = { state, patches };
        Observable.scan(patches, reducer, state).subscribe({
            onNext: (state) => { list.state = state; }
        });
        return list;
    }
    List.create = create;
})(List || (List = {}));
export default List;
