import Key from './key';
import Patch from './patch';
import State from './state';
import { Range, Position } from './range';
import { Tree, Path } from './tree';
import { Observable, Subject } from './observable';
import AsyncIterator from './async_iterator';
export var List;
(function (List) {
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), patches = Observable.map(parent.patches, patch => ({
            range: patch.range,
            added: patch.added ? State.map(patch.added, mapFn) : undefined
        }));
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = State.filter(parent.state, filterFn), patches = Observable.map(parent.patches, patch => {
            return Promise.all([
                AsyncIterator.findKey(State.toIterator(State.reverse(state), [Position.reverse(patch.range[0]), { prev: null }]), filterFn).then(next => ({ next })),
                AsyncIterator.findKey(State.toIterator(state, [patch.range[1], { prev: null }]), filterFn).then(prev => ({ prev }))
            ]).then((range) => ({
                range: range,
                added: patch.added ? State.filter(patch.added, filterFn) : undefined
            }));
        });
        return create(state, patches, (oldState, patches) => state = Patch.apply(oldState, patches));
    }
    List.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state, state = State.zoom(parent.state, key), patches = Observable.map(Observable.filter(parent.patches, patch => {
            return AsyncIterator.some(State.toIterator(parentState, patch.range), (value, k) => k === key)
                .then(res => patch.added ? State.has(patch.added, key) : res);
        }), patch => {
            parentState = parent.state;
            return {
                range: Range.all,
                added: patch.added ? State.zoom(patch.added, key) : undefined
            };
        });
        return create(state, patches);
    }
    List.zoom = zoom;
    function flatten(parent) {
        var patches_ = Subject.create();
        var parent_ = cache(map(parent, ((list, key) => {
            Observable.map(list.patches, patch => {
                var from = patch.range[0], to = patch.range[1];
                function mapPrevPosition(position) {
                    if (position.prev === Key.sentinel)
                        return list.state.prev(Key.sentinel).then(next => ({ next: Path.toKey([key, next]) }));
                    return Promise.resolve({ prev: Path.toKey([key, position.prev]) });
                }
                function mapNextPosition(position) {
                    if (position.next === Key.sentinel)
                        return list.state.next(Key.sentinel).then(prev => ({ prev: Path.toKey([key, prev]) }));
                    return Promise.resolve({ next: Path.toKey([key, position.next]) });
                }
                return Promise.all([
                    Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                    Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
                ]).then((range) => ({ range: range, added: patch.added ? patch.added : undefined }));
            }).subscribe(patches_);
            return list.state;
        })));
        Observable.map(parent.patches, patch => {
            var from = patch.range[0], to = patch.range[1];
            function mapPrevPosition(position) {
                return position.prev === Key.sentinel ? Promise.resolve({ prev: Key.sentinel }) : Tree.next(parent_.state, [position.prev]).then(Path.toKey).then(prev => ({ prev }));
            }
            function mapNextPosition(position) {
                return position.next === Key.sentinel ? Promise.resolve({ next: Key.sentinel }) : Tree.prev(parent_.state, [position.next]).then(Path.toKey).then(next => ({ next }));
            }
            return Promise.all([
                Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
            ]).then((range) => ({ range: range, added: patch.added ? State.flatten(State.map(patch.added, list => list.state)) : undefined }));
        }).subscribe(patches_);
        var state = State.flatten(parent_.state);
        return create(state, patches_);
    }
    List.flatten = flatten;
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
