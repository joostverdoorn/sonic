var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
import Key from './key';
import Patch from './patch';
import State from './state';
import { Range, Position } from './range';
import { Tree } from './tree';
import { Observable, Subject } from './observable';
import AsyncIterator from './async_iterator';
import { NotFound } from './exceptions';
export var Store;
(function (Store) {
    function reverse(parent) {
        function getState() {
            return State.reverse(parent.state);
        }
        const dispatcher = Observable.map(parent.dispatcher, patch => ({
            range: Range.reverse(patch.range),
            added: patch.added ? State.reverse(patch.added) : undefined
        }));
        return create(getState(), dispatcher, getState);
    }
    Store.reverse = reverse;
    function map(parent, mapFn) {
        function getState() {
            return State.map(parent.state, mapFn);
        }
        const dispatcher = Observable.map(parent.dispatcher, patch => ({
            range: patch.range,
            added: patch.added ? State.map(patch.added, mapFn) : undefined
        }));
        return create(getState(), dispatcher, getState);
    }
    Store.map = map;
    function filter(parent, filterFn) {
        var parentState = parent.state;
        function getState() {
            return State.filter(parent.state, filterFn);
        }
        function find(state, range) {
            return __awaiter(this, void 0, Promise, function* () {
                try {
                    var [key] = yield AsyncIterator.find(State.entries(state, range), ([key, value]) => filterFn(value, key));
                    return key;
                }
                catch (error) {
                    if (error instanceof NotFound)
                        return Key.SENTINEL;
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
                    if (position.next === Key.SENTINEL)
                        return { next: Key.SENTINEL };
                }
                return { prev: yield find(state, [position, { next: Key.SENTINEL }]) };
            });
        }
        var dispatcher = Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
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
        return create(getState(), dispatcher, getState);
    }
    Store.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state;
        function getState() {
            return State.zoom(parent.state, key);
        }
        const dispatcher = Observable.map(Observable.filter(parent.dispatcher, patch => State.has(State.slice(parentState, patch.range), key)), patch => {
            parentState = parent.state;
            return {
                range: Range.all,
                added: patch.added ? State.zoom(patch.added, key) : undefined
            };
        });
        return create(getState(), dispatcher, getState);
    }
    Store.zoom = zoom;
    function flatten(parent) {
        var dispatcher_ = Subject.create();
        var parent_ = cache(map(parent, (store, key) => {
            Observable.map(store.dispatcher, patch => {
                var from = patch.range[0], to = patch.range[1];
                function mapPrevPosition(position) {
                    if (position.prev === Key.SENTINEL)
                        return store.state.prev(Key.SENTINEL).then(next => ({ next: [key, next] }));
                    return Promise.resolve({ prev: [key, position.prev] });
                }
                function mapNextPosition(position) {
                    if (position.next === Key.SENTINEL)
                        return store.state.next(Key.SENTINEL).then(prev => ({ prev: [key, prev] }));
                    return Promise.resolve({ next: [key, position.next] });
                }
                return Promise.all([
                    Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                    Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
                ]).then((range) => ({ range: range, added: patch.added ? patch.added : undefined }));
            }).subscribe(dispatcher_);
            return store.state;
        }));
        Observable.map(parent.dispatcher, patch => {
            var from = patch.range[0], to = patch.range[1];
            function mapPrevPosition(position) {
                return position.prev === Key.SENTINEL ? Promise.resolve({ prev: Key.SENTINEL }) : Tree.next(parent_.state, [position.prev, null]).then(prev => ({ prev }));
            }
            function mapNextPosition(position) {
                return position.next === Key.SENTINEL ? Promise.resolve({ next: Key.SENTINEL }) : Tree.prev(parent_.state, [position.next, null]).then(next => ({ next }));
            }
            return Promise.all([
                Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
            ]).then((range) => ({ range: range, added: patch.added ? State.flatten(State.map(patch.added, store => store.state)) : undefined }));
        }).subscribe(dispatcher_);
        var state = State.flatten(parent_.state);
        function getState() {
            return State.flatten(parent_.state);
        }
        return create(getState(), dispatcher_, getState);
    }
    Store.flatten = flatten;
    function flatMap(parent, mapFn) {
        return Store.flatten(Store.map(parent, mapFn));
    }
    Store.flatMap = flatMap;
    function keyBy(parent, keyFn, reverseKeyFn) {
        var state = State.keyBy(parent.state, keyFn, reverseKeyFn), parentState = parent.state, dispatcher = Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var [from, to] = patch.range;
            function mapPosition(position) {
                return __awaiter(this, void 0, Promise, function* () {
                    if (Position.isPrevPosition(position)) {
                        if (position.prev === Key.SENTINEL)
                            return { prev: Key.SENTINEL };
                        return { prev: yield keyFn(yield parentState.get(position.prev), position.prev) };
                    }
                    else {
                        if (position.next === Key.SENTINEL)
                            return { next: Key.SENTINEL };
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
        function getState() {
            return State.scan(parent.state, scanFn, memo);
        }
        var store, dispatcher = Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var parentState = parent.state, storeState = store.state, [from, to] = patch.range;
            var added = State.lazy(() => __awaiter(this, void 0, void 0, function* () {
                var last = yield State.last(storeState, [{ next: null }, from]);
                return State.scan(State.slice(parentState, [{ next: last }, { prev: null }]), scanFn, last !== Key.SENTINEL ? yield storeState.get(last) : memo);
            }));
            return { range: [from, { prev: null }], added };
        }));
        return store = create(getState(), dispatcher);
    }
    Store.scan = scan;
    function take(parent, count) {
        var store, state = State.take(parent.state, count);
        var indexed = Store.scan(parent, ([index], value) => [index + 1, value], [-1, null]);
        var dispatcher = Observable.map(indexed.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var [from] = patch.range, parentState = parent.state, indexedState = indexed.state;
            var key = yield State.last(indexedState, [{ next: null }, from]);
            var index = key === Key.SENTINEL ? -1 : (yield indexedState.get(key))[0];
            return {
                range: patch.range,
                added: State.take(State.map(patch.added, ([index, value]) => value), count - (index + 1))
            };
        }));
        return create(state, dispatcher);
    }
    Store.take = take;
    function cache(parent) {
        return Store.create(State.cache(parent.state), parent.dispatcher, (state, patch) => {
            return State.cache(Patch.apply(state, patch));
        });
    }
    Store.cache = cache;
    function states(store) {
        return Observable.map(store.dispatcher, () => store.state);
    }
    Store.states = states;
    function create(state, dispatcher, reducer = Patch.apply) {
        var subject = Subject.create();
        dispatcher.subscribe({
            onNext: (patch) => __awaiter(this, void 0, void 0, function* () {
                store.state = yield reducer(store.state, patch);
                return subject.onNext(patch);
            })
        });
        const store = {
            state,
            dispatcher: {
                subscribe: subject.subscribe,
                onNext: Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined
            }
        };
        return store;
    }
    Store.create = create;
})(Store || (Store = {}));
export default Store;
//# sourceMappingURL=store.js.map