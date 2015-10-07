import State from './state';
import { Observable, Subject } from './observable';
import { Patch } from './patch';
export var List;
(function (List) {
    var DELETED = Promise.resolve({});
    function cache(parent) {
        function getState(_get, _prev, _next) {
            return {
                get: (key) => {
                    if (_get[key] == DELETED)
                        return Promise.reject(new Error);
                    return _get[key] === undefined ? (_get[key] = parent.state.get(key)) : _get[key];
                },
                prev: (key) => {
                    return _prev[key] === undefined ? (parent.state.prev(key).then((res) => (_next[res] = key, _prev[key] = res))) : Promise.resolve(_prev[key]);
                },
                next: (key) => {
                    return _next[key] === undefined ? (parent.state.next(key).then((res) => (_prev[res] = key, _next[key] = res))) : Promise.resolve(_next[key]);
                }
            };
        }
        var subject = new Subject(), pseudoState = {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        }, list = {
            get state() {
                return getState(pseudoState.get, pseudoState.prev, pseudoState.next);
            },
            subscribe: subject.subscribe
        };
        parent.subscribe({
            onNext: patch => {
                return Promise.resolve().then(() => {
                    var state = list.state;
                    pseudoState = {
                        get: Object.create(pseudoState.get),
                        prev: Object.create(pseudoState.prev),
                        next: Object.create(pseudoState.next)
                    };
                    if (Patch.isSetPatch(patch)) {
                        pseudoState.get[patch.key] = Promise.resolve(patch.value);
                        if (patch.before !== undefined)
                            return state.prev(patch.before).then(prev => {
                                var next = patch.before;
                                pseudoState.prev[next] = patch.key;
                                pseudoState.next[patch.key] = next;
                                pseudoState.prev[patch.key] = prev;
                                pseudoState.next[prev] = patch.key;
                            });
                    }
                    if (Patch.isDeletePatch(patch)) {
                        pseudoState.get[patch.key] = DELETED;
                        return state.prev(patch.key)
                            .then(prev => list.state.next(patch.key)
                            .then(next => (pseudoState.prev[next] = prev, pseudoState.next[prev] = next)));
                    }
                }).then(() => subject.onNext(patch));
            }
        });
        return list;
    }
    List.cache = cache;
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
        return factory.create(state, observable);
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
        return factory.create(state, observable);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = State.zoom(parent.state, key), observable = Observable.filter(parent, patch => patch.key === key);
        return factory.create(state, observable);
    }
    List.zoom = zoom;
    function reverse(parent) {
        var state = State.reverse(parent.state), list, observable = Observable.map(parent, patch => {
            if (!Patch.isSetPatch(patch))
                return patch;
            else
                return patch.before === undefined ? patch : list.state.next(patch.before).then(prev => {
                    return {
                        operation: Patch.SET,
                        key: patch.key,
                        value: patch.value,
                        before: prev
                    };
                });
        });
        return list = create(state, observable);
    }
    List.reverse = reverse;
})(List || (List = {}));
export var factory;
(function (factory) {
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
    factory.create = create;
})(factory || (factory = {}));
export default List;
