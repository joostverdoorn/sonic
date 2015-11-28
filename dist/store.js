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
import { NotFound } from './exceptions';
export var Store;
(function (Store) {
    function reverse(parent) {
        var state = State.reverse(parent.state), dispatcher = Observable.map(parent.dispatcher, patch => ({
            range: Range.reverse(patch.range),
            added: patch.added ? State.reverse(patch.added) : undefined
        }));
        return create(state, dispatcher);
    }
    Store.reverse = reverse;
    function map(parent, mapFn) {
        var state = State.map(parent.state, mapFn), dispatcher = Observable.map(parent.dispatcher, patch => ({
            range: patch.range,
            added: patch.added ? State.map(patch.added, mapFn) : undefined
        }));
        return create(state, dispatcher);
    }
    Store.map = map;
    function filter(parent, filterFn) {
        var parentState = parent.state;
        function find(state, range) {
            return __awaiter(this, void 0, Promise, function* () {
                try {
                    var [key] = yield AsyncIterator.find(State.entries(state, range), ([key, value]) => filterFn(value, key));
                    return key;
                }
                catch (error) {
                    if (error instanceof NotFound)
                        return Key.sentinel;
                    throw error;
                }
            });
        }
        function move(state, range) {
            return __awaiter(this, void 0, Promise, function* () {
                var deleted = State.slice(State.reverse(state), Range.reverse(range)), position = range[1];
                if (Position.isNextPosition(position)) {
                    if (!(yield State.empty(deleted)))
                        return { next: yield find(deleted, Range.all) };
                    if (position.next === Key.sentinel)
                        return { next: Key.sentinel };
                }
                return { prev: yield find(state, [position, { next: Key.sentinel }]) };
            });
        }
        var dispatcher = Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, Promise, function* () {
            var range = (yield Promise.all([
                move(State.reverse(parentState), Range.reverse(patch.range)).then(Position.reverse),
                move(parentState, patch.range)
            ]));
            parentState = parent.state;
            return {
                range: range,
                added: patch.added ? State.filter(patch.added, filterFn) : undefined
            };
        }));
        return create(State.filter(parent.state, filterFn), dispatcher);
    }
    Store.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state, state = State.zoom(parent.state, key), dispatcher = Observable.map(Observable.filter(parent.dispatcher, patch => State.has(State.slice(parentState, patch.range), key)), patch => {
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
    function flatMap(parent, mapFn) {
        return Store.flatten(Store.map(parent, mapFn));
    }
    Store.flatMap = flatMap;
    function keyBy(parent, keyFn) {
        var state = State.keyBy(parent.state, keyFn), parentState = parent.state, dispatcher = Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, Promise, function* () {
            var [from, to] = patch.range;
            function mapPosition(position) {
                return __awaiter(this, void 0, Promise, function* () {
                    if (Position.isPrevPosition(position)) {
                        if (position.prev === Key.sentinel)
                            return position;
                        return { prev: yield keyFn(yield parentState.get(position.prev), position.prev) };
                    }
                    else {
                        if (position.next === Key.sentinel)
                            return position;
                        return { next: yield keyFn(yield parentState.get(position.next), position.next) };
                    }
                });
            }
            var range = (yield Promise.all([
                mapPosition(from),
                mapPosition(to)
            ]));
            parentState = parent.state;
            return { range, added: patch.added ? State.keyBy(patch.added, keyFn) : undefined };
        }));
        return create(state, dispatcher);
    }
    Store.keyBy = keyBy;
    function scan(parent, scanFn, memo) {
        var store, state = State.scan(parent.state, scanFn, memo), dispatcher = Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, Promise, function* () {
            var parentState = parent.state, storeState = store.state, [from, to] = patch.range;
            var added = State.lazy(() => __awaiter(this, void 0, Promise, function* () {
                var last = yield State.last(storeState, [{ next: null }, from]);
                return State.scan(State.slice(parentState, [{ next: last }, { prev: null }]), scanFn, last !== Key.sentinel ? yield storeState.get(last) : memo);
            }));
            return { range: [from, { prev: null }], added };
        }));
        return store = create(state, dispatcher);
    }
    Store.scan = scan;
    function take(parent, count) {
        var store, state = State.take(parent.state, count);
        var indexed = Store.scan(parent, ([index], value) => [index + 1, value], [-1, null]);
        var dispatcher = Observable.map(indexed.dispatcher, (patch) => __awaiter(this, void 0, Promise, function* () {
            var [from] = patch.range, parentState = parent.state, indexedState = indexed.state;
            var key = yield State.last(indexedState, [{ next: null }, from]);
            var index = key === Key.sentinel ? -1 : (yield indexedState.get(key))[0];
            return {
                range: patch.range,
                added: State.take(State.map(patch.added, ([index, value]) => value), count - (index + 1))
            };
        }));
        return create(state, dispatcher);
    }
    Store.take = take;
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
        var subject = Subject.create();
        var statePatches = Observable.scan(dispatcher, ([state], patch) => __awaiter(this, void 0, Promise, function* () { return [yield reducer(state, patch), patch]; }), [state, null]);
        Observable.forEach(statePatches, ([state, patch]) => {
            store.state = state;
            return subject.onNext(patch);
        });
        var store = { state, dispatcher: { subscribe: subject.subscribe, onNext: Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined } };
        return store;
    }
    Store.create = create;
})(Store || (Store = {}));
export default Store;
//# sourceMappingURL=store.js.map