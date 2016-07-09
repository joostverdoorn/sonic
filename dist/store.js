"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const key_1 = require('./key');
const patch_1 = require('./patch');
const state_1 = require('./state');
const range_1 = require('./range');
const tree_1 = require('./tree');
const observable_1 = require('./observable');
const async_iterator_1 = require('./async_iterator');
const exceptions_1 = require('./exceptions');
var Store;
(function (Store) {
    function reverse(parent) {
        function getState() {
            return state_1.default.reverse(parent.state);
        }
        const dispatcher = observable_1.Observable.map(parent.dispatcher, patch => ({
            range: range_1.Range.reverse(patch.range),
            added: patch.added ? state_1.default.reverse(patch.added) : undefined
        }));
        return create(getState(), dispatcher, getState);
    }
    Store.reverse = reverse;
    function map(parent, mapFn) {
        function getState() {
            return state_1.default.map(parent.state, mapFn);
        }
        const dispatcher = observable_1.Observable.map(parent.dispatcher, patch => ({
            range: patch.range,
            added: patch.added ? state_1.default.map(patch.added, mapFn) : undefined
        }));
        return create(getState(), dispatcher, getState);
    }
    Store.map = map;
    function filter(parent, filterFn) {
        var parentState = parent.state;
        function getState() {
            return state_1.default.filter(parent.state, filterFn);
        }
        function find(state, range) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    var [key] = yield async_iterator_1.default.find(state_1.default.entries(state, range), ([key, value]) => filterFn(value, key));
                    return key;
                }
                catch (error) {
                    if (error instanceof exceptions_1.NotFound)
                        return key_1.default.SENTINEL;
                    throw error;
                }
            });
        }
        function move(state, range) {
            return __awaiter(this, void 0, void 0, function* () {
                var deleted = state_1.default.slice(state_1.default.reverse(state), range_1.Range.reverse(range)), position = range[1];
                if (range_1.Position.isNextPosition(position)) {
                    if (!(yield state_1.default.empty(deleted)))
                        return { next: yield find(deleted, range_1.Range.all) };
                    if (position.next === key_1.default.SENTINEL)
                        return { next: key_1.default.SENTINEL };
                }
                return { prev: yield find(state, [position, { next: key_1.default.SENTINEL }]) };
            });
        }
        var dispatcher = observable_1.Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var range = (yield Promise.all([
                move(state_1.default.reverse(parentState), range_1.Range.reverse(patch.range)).then(range_1.Position.reverse),
                move(parentState, patch.range)
            ]));
            parentState = parent.state;
            return {
                range: range,
                added: patch.added ? state_1.default.filter(patch.added, filterFn) : undefined
            };
        }));
        return create(getState(), dispatcher, getState);
    }
    Store.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state;
        function getState() {
            return state_1.default.zoom(parent.state, key);
        }
        const dispatcher = observable_1.Observable.map(observable_1.Observable.filter(parent.dispatcher, patch => state_1.default.has(state_1.default.slice(parentState, patch.range), key)), patch => {
            parentState = parent.state;
            return {
                range: range_1.Range.all,
                added: patch.added ? state_1.default.zoom(patch.added, key) : undefined
            };
        });
        return create(getState(), dispatcher, getState);
    }
    Store.zoom = zoom;
    function flatten(parent) {
        var dispatcher_ = observable_1.Subject.create();
        var parent_ = cache(map(parent, (store, key) => {
            observable_1.Observable.map(store.dispatcher, patch => {
                var from = patch.range[0], to = patch.range[1];
                function mapPrevPosition(position) {
                    if (position.prev === key_1.default.SENTINEL)
                        return store.state.prev(key_1.default.SENTINEL).then(next => ({ next: [key, next] }));
                    return Promise.resolve({ prev: [key, position.prev] });
                }
                function mapNextPosition(position) {
                    if (position.next === key_1.default.SENTINEL)
                        return store.state.next(key_1.default.SENTINEL).then(prev => ({ prev: [key, prev] }));
                    return Promise.resolve({ next: [key, position.next] });
                }
                return Promise.all([
                    range_1.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                    range_1.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
                ]).then((range) => ({ range: range, added: patch.added ? patch.added : undefined }));
            }).subscribe(dispatcher_);
            return store.state;
        }));
        observable_1.Observable.map(parent.dispatcher, patch => {
            var from = patch.range[0], to = patch.range[1];
            function mapPrevPosition(position) {
                return position.prev === key_1.default.SENTINEL ? Promise.resolve({ prev: key_1.default.SENTINEL }) : tree_1.Tree.next(parent_.state, [position.prev, null]).then(prev => ({ prev }));
            }
            function mapNextPosition(position) {
                return position.next === key_1.default.SENTINEL ? Promise.resolve({ next: key_1.default.SENTINEL }) : tree_1.Tree.prev(parent_.state, [position.next, null]).then(next => ({ next }));
            }
            return Promise.all([
                range_1.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from),
                range_1.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)
            ]).then((range) => ({ range: range, added: patch.added ? state_1.default.flatten(state_1.default.map(patch.added, store => store.state)) : undefined }));
        }).subscribe(dispatcher_);
        var state = state_1.default.flatten(parent_.state);
        function getState() {
            return state_1.default.flatten(parent_.state);
        }
        return create(getState(), dispatcher_, getState);
    }
    Store.flatten = flatten;
    function flatMap(parent, mapFn) {
        return Store.flatten(Store.map(parent, mapFn));
    }
    Store.flatMap = flatMap;
    function keyBy(parent, keyFn, reverseKeyFn) {
        var state = state_1.default.keyBy(parent.state, keyFn, reverseKeyFn), parentState = parent.state, dispatcher = observable_1.Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var [from, to] = patch.range;
            function mapPosition(position) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (range_1.Position.isPrevPosition(position)) {
                        if (position.prev === key_1.default.SENTINEL)
                            return { prev: key_1.default.SENTINEL };
                        return { prev: yield keyFn(yield parentState.get(position.prev), position.prev) };
                    }
                    else {
                        if (position.next === key_1.default.SENTINEL)
                            return { next: key_1.default.SENTINEL };
                        return { next: yield keyFn(yield parentState.get(position.next), position.next) };
                    }
                });
            }
            var range = (yield Promise.all([
                mapPosition(from),
                mapPosition(to)
            ]));
            parentState = parent.state;
            return { range, added: patch.added ? state_1.default.keyBy(patch.added, keyFn) : undefined };
        }));
        return create(state, dispatcher);
    }
    Store.keyBy = keyBy;
    function scan(parent, scanFn, memo) {
        function getState() {
            return state_1.default.scan(parent.state, scanFn, memo);
        }
        var store, dispatcher = observable_1.Observable.map(parent.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var parentState = parent.state, storeState = store.state, [from, to] = patch.range;
            var added = state_1.default.lazy(() => __awaiter(this, void 0, void 0, function* () {
                var last = yield state_1.default.last(storeState, [{ next: null }, from]);
                return state_1.default.scan(state_1.default.slice(parentState, [{ next: last }, { prev: null }]), scanFn, last !== key_1.default.SENTINEL ? yield storeState.get(last) : memo);
            }));
            return { range: [from, { prev: null }], added };
        }));
        return store = create(getState(), dispatcher);
    }
    Store.scan = scan;
    function take(parent, count) {
        var store, state = state_1.default.take(parent.state, count);
        var indexed = Store.scan(parent, ([index], value) => [index + 1, value], [-1, null]);
        var dispatcher = observable_1.Observable.map(indexed.dispatcher, (patch) => __awaiter(this, void 0, void 0, function* () {
            var [from] = patch.range, parentState = parent.state, indexedState = indexed.state;
            var key = yield state_1.default.last(indexedState, [{ next: null }, from]);
            var index = key === key_1.default.SENTINEL ? -1 : (yield indexedState.get(key))[0];
            return {
                range: patch.range,
                added: state_1.default.take(state_1.default.map(patch.added, ([index, value]) => value), count - (index + 1))
            };
        }));
        return create(state, dispatcher);
    }
    Store.take = take;
    function cache(parent) {
        return Store.create(state_1.default.cache(parent.state), parent.dispatcher, (state, patch) => {
            return state_1.default.cache(patch_1.default.apply(state, patch));
        });
    }
    Store.cache = cache;
    function states(store) {
        return observable_1.Observable.map(store.dispatcher, () => store.state);
    }
    Store.states = states;
    function create(state, dispatcher, reducer = patch_1.default.apply) {
        var subject = observable_1.Subject.create();
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
                onNext: observable_1.Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined
            }
        };
        return store;
    }
    Store.create = create;
})(Store = exports.Store || (exports.Store = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Store;
//# sourceMappingURL=store.js.map