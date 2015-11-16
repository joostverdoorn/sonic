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
import Key from './key';
import Patch from './patch';
import State from './state';
import { Range, Position } from './range';
import { Tree, Path } from './tree';
import { Observable, Subject } from './observable';
import AsyncIterator from './async_iterator';
export var Store;
(function (Store) {
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), dispatcher = Observable.map(parent.dispatcher, patch => ({
            range: patch.range,
            added: patch.added ? State.map(patch.added, mapFn) : undefined
        }));
        return create(state, dispatcher);
    }
    Store.map = map;
    function filter(parent, filterFn) {
        var store, parentState = parent.state, state = State.filter(parent.state, filterFn);
        return null;
    }
    Store.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state, state = State.zoom(parent.state, key), dispatcher = Observable.map(Observable.filter(parent.dispatcher, patch => {
            return AsyncIterator.some(State.entries(parentState, patch.range), entry => entry[0] === key)
                .then(res => patch.added ? State.has(patch.added, key) : res);
        }), patch => {
            parentState = parent.state;
            return {
                range: Range.all,
                added: patch.added ? State.zoom(patch.added, key) : undefined
            };
        });
        return create(state, dispatcher);
    }
    Store.zoom = zoom;
    function flatten(parent) {
        var dispatcher_ = Subject.create();
        var parent_ = cache(map(parent, ((store, key) => {
            Observable.map(store.dispatcher, patch => {
                var from = patch.range[0], to = patch.range[1];
                function mapPrevPosition(position) {
                    if (position.prev === Key.sentinel)
                        return store.state.prev(Key.sentinel).then(next => ({ next: Path.toKey([key, next]) }));
                    return Promise.resolve({ prev: Path.toKey([key, position.prev]) });
                }
                function mapNextPosition(position) {
                    if (position.next === Key.sentinel)
                        return store.state.next(Key.sentinel).then(prev => ({ prev: Path.toKey([key, prev]) }));
                    return Promise.resolve({ next: Path.toKey([key, position.next]) });
                }
                return Promise.all([
                    Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                    Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
                ]).then((range) => ({ range: range, added: patch.added ? patch.added : undefined }));
            }).subscribe(dispatcher_);
            return store.state;
        })));
        Observable.map(parent.dispatcher, patch => {
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
            ]).then((range) => ({ range: range, added: patch.added ? State.flatten(State.map(patch.added, store => store.state)) : undefined }));
        }).subscribe(dispatcher_);
        var state = State.flatten(parent_.state);
        return create(state, dispatcher_);
    }
    Store.flatten = flatten;
    function scan(parent, scanFn, memo) {
        var store, state = State.scan(parent.state, scanFn, memo), dispatcher = Observable.map(parent.dispatcher, patch => {
            var parentState = parent.state, storeState = store.state, range = [patch.range[0], { prev: null }], added = State.lazy(() => {
                return State.last(storeState, [{ next: null }, patch.range[0]])
                    .then(memo => State.scan(State.slice(parentState, range), scanFn, memo));
            });
            return { range, added };
        });
        return store = create(state, dispatcher);
    }
    Store.scan = scan;
    function cache(parent) {
        var state = State.cache(parent.state), dispatcher = Observable.map(parent.dispatcher, patch => ({
            range: patch.range,
            added: patch.added ? State.cache(patch.added) : undefined
        }));
        return Store.create(state, dispatcher);
    }
    Store.cache = cache;
    function states(store) {
        return Observable.map(store.dispatcher, () => store.state);
    }
    Store.states = states;
    function create(state, dispatcher, reducer = Patch.apply) {
        const store = { state, dispatcher };
        Observable.scan(dispatcher, reducer, state).subscribe({
            onNext: (state) => { store.state = state; }
        });
        return store;
    }
    Store.create = create;
})(Store || (Store = {}));
export default Store;
//# sourceMappingURL=store.js.map