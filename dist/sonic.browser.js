(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var AsyncIterator;
exports.AsyncIterator = AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.Empty = {
        get: function get() {
            return _key3['default'].NOT_FOUND;
        },
        next: function next() {
            return Promise.resolve(_key3['default'].sentinel);
        }
    };
    function extend(iterator, partial) {
        iterator = Object.create(iterator);
        if ('get' in partial) iterator.get = partial.get;
        if ('next' in partial) iterator.next = partial.next;
        return iterator;
    }
    AsyncIterator.extend = extend;
    function every(iterator, predicate) {
        function loop() {
            return iterator.next().then(function (key) {
                return key === _key3['default'].sentinel || iterator.get().then(function (value) {
                    return predicate(value, key);
                }).then(function (result) {
                    return result ? loop() : false;
                });
            });
        }
        return loop();
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return every(iterator, function (value, key) {
            return Promise.resolve(predicate(value, key)).then(function (result) {
                return !result;
            });
        }).then(function (result) {
            return !result;
        });
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return every(iterator, function (value, key) {
            return Promise.resolve(fn(value, key)).then(function () {
                return true;
            });
        }).then(function () {});
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return forEach(iterator, function (value, key) {
            return Promise.resolve(fn(memo, value, key)).then(function (value) {
                memo = value;
            });
        }).then(function () {
            return memo;
        });
    }
    AsyncIterator.reduce = reduce;
    function findKey(iterator, predicate) {
        var key;
        return some(iterator, function (v, k) {
            return Promise.resolve(predicate(v, k)).then(function (res) {
                return res ? (key = k, true) : false;
            });
        }).then(function (found) {
            return found ? key : _key3['default'].sentinel;
        });
    }
    AsyncIterator.findKey = findKey;
    function find(iterator, predicate) {
        return findKey(iterator, predicate).then(function (key) {
            return key === _key3['default'].sentinel ? _key3['default'].NOT_FOUND : iterator.get();
        });
    }
    AsyncIterator.find = find;
    function keyOf(iterator, value) {
        return findKey(iterator, function (v) {
            return v === value;
        });
    }
    AsyncIterator.keyOf = keyOf;
    function indexOf(iterator, value) {
        var index = -1;
        return some(iterator, function (v, k) {
            return index++, value == v;
        }).then(function (found) {
            return found ? index : _key3['default'].NOT_FOUND;
        });
    }
    AsyncIterator.indexOf = indexOf;
    function keyAt(iterator, index) {
        return findKey(iterator, function () {
            return 0 === index--;
        });
    }
    AsyncIterator.keyAt = keyAt;
    function at(iterator, index) {
        return keyAt(iterator, index).then(iterator.get);
    }
    AsyncIterator.at = at;
    function contains(iterator, value) {
        return some(iterator, function (v) {
            return v === value;
        });
    }
    AsyncIterator.contains = contains;
    function concat() {
        for (var _len = arguments.length, iterators = Array(_len), _key = 0; _key < _len; _key++) {
            iterators[_key] = arguments[_key];
        }

        return iterators.reduce(function (memo, value) {
            var iterated = false,
                queue = Promise.resolve(null);
            return {
                get: function get() {
                    return queue.then(function () {
                        return iterated ? value.get() : memo.get();
                    });
                },
                next: function next() {
                    return queue.then(function () {
                        return iterated ? value.next() : memo.next().then(function (key) {
                            return key !== _key3['default'].sentinel ? key : (iterated = true, value.next());
                        });
                    });
                }
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromEntries(entries) {
        var current = -1,
            queue = Promise.resolve(null);
        return {
            get: function get() {
                return queue = queue.then(function () {
                    return current < 0 || current >= entries.length ? _key3['default'].NOT_FOUND : Promise.resolve(entries[current][1]);
                });
            },
            next: function next() {
                return queue = queue.then(function () {
                    return Promise.resolve(++current >= entries.length ? _key3['default'].sentinel : entries[current][0]);
                });
            }
        };
    }
    AsyncIterator.fromEntries = fromEntries;
    function fromArray(array) {
        return fromEntries(array.map(function (value, key) {
            return [key, value];
        }));
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromEntries(Object.keys(object).map(function (key) {
            return [key, object[key]];
        }));
    }
    AsyncIterator.fromObject = fromObject;
    function toArray(iterator) {
        return reduce(iterator, function (memo, value) {
            return memo.push(value), memo;
        }, []);
    }
    AsyncIterator.toArray = toArray;
    function toObject(iterator) {
        return reduce(iterator, function (memo, value, key) {
            return memo[key] = value, memo;
        }, Object.create(null));
    }
    AsyncIterator.toObject = toObject;
})(AsyncIterator || (exports.AsyncIterator = AsyncIterator = {}));
exports['default'] = AsyncIterator;



},{"./key":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Cache;
exports.Cache = Cache;
(function (Cache) {
    function create() {
        return {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        };
    }
    Cache.create = create;
    function extend(cache) {
        return {
            get: Object.create(cache.get),
            prev: Object.create(cache.prev),
            next: Object.create(cache.next)
        };
    }
    Cache.extend = extend;
    function apply(state, cache) {
        function get(key) {
            return key in cache.get ? cache.get[key] : cache.get[key] = state.get(key);
        }
        function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            return key in cache.prev ? cache.prev[key] : cache.prev[key] = state.prev(key).then(function (prev) {
                cache.next[prev] = Promise.resolve(key);return prev;
            });
        }
        function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            return key in cache.next ? cache.next[key] : cache.next[key] = state.next(key).then(function (next) {
                cache.prev[next] = Promise.resolve(key);return next;
            });
        }
        return { get: get, prev: prev, next: next };
    }
    Cache.apply = apply;
})(Cache || (exports.Cache = Cache = {}));
exports['default'] = Cache;



},{"./key":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _promise_utils = require('./promise_utils');

var _promise_utils2 = _interopRequireDefault(_promise_utils);

var Key;
(function (Key) {
    Key.NOT_FOUND_ERROR = new Error("No entry at the specified key");
    Key.NOT_FOUND = _promise_utils2["default"].lazy(function (resolve, reject) {
        return reject(Key.NOT_FOUND_ERROR);
    });
    Key.sentinel = null;
    var uniqueKey = 0;
    function key(key) {
        return key.toString();
    }
    Key.key = key;
    function create() {
        return uniqueKey++;
    }
    Key.create = create;
})(Key || (Key = {}));
exports["default"] = Key;


module.exports = exports["default"];

},{"./promise_utils":8}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _list = require('./list');

var _observable = require('./observable');

var Lens;
exports.Lens = Lens;
(function (Lens) {
    function compose(parent, lens) {
        var getSubject = _observable.Subject.create(),
            setSubject = _observable.Subject.create();
        _observable.Observable.map(parent.patches, function (patch) {
            if (patch.added) return { range: patch.range, added: _state2['default'].map(patch.added, lens.get) };
            return { range: patch.range };
        }).subscribe(getSubject);
        _observable.Observable.map(setSubject, function (patch) {
            if (patch.added) return { range: patch.range, added: _state2['default'].map(patch.added, lens.set) };
            return { range: patch.range };
        }).subscribe(parent.patches);
        return _list.List.create(_state2['default'].map(parent.state, lens.get), { subscribe: getSubject.subscribe, onNext: setSubject.onNext });
    }
    Lens.compose = compose;
})(Lens || (exports.Lens = Lens = {}));
exports['default'] = Lens;



},{"./list":5,"./observable":6,"./state":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _range = require('./range');

var _tree = require('./tree');

var _observable = require('./observable');

var _async_iterator = require('./async_iterator');

var _async_iterator2 = _interopRequireDefault(_async_iterator);

var List;
exports.List = List;
(function (List) {
    function map(parent, mapFn) {
        var state = _state2['default'].map(parent.state, mapFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return {
                range: patch.range,
                added: patch.added ? _state2['default'].map(patch.added, mapFn) : undefined
            };
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = _state2['default'].filter(parent.state, filterFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return Promise.all([_async_iterator2['default'].findKey(_state2['default'].toIterator(_state2['default'].reverse(state), [_range.Position.reverse(patch.range[0]), { prev: null }]), filterFn).then(function (next) {
                return { next: next };
            }), _async_iterator2['default'].findKey(_state2['default'].toIterator(state, [patch.range[1], { prev: null }]), filterFn).then(function (prev) {
                return { prev: prev };
            })]).then(function (range) {
                return {
                    range: range,
                    added: patch.added ? _state2['default'].filter(patch.added, filterFn) : undefined
                };
            });
        });
        return create(state, patches, function (oldState, patches) {
            return state = _patch2['default'].apply(oldState, patches);
        });
    }
    List.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state,
            state = _state2['default'].zoom(parent.state, key),
            patches = _observable.Observable.map(_observable.Observable.filter(parent.patches, function (patch) {
            return _async_iterator2['default'].some(_state2['default'].toIterator(parentState, patch.range), function (value, k) {
                return k === key;
            }).then(function (res) {
                return patch.added ? _state2['default'].has(patch.added, key) : res;
            });
        }), function (patch) {
            parentState = parent.state;
            return {
                range: _range.Range.all,
                added: patch.added ? _state2['default'].zoom(patch.added, key) : undefined
            };
        });
        return create(state, patches);
    }
    List.zoom = zoom;
    function flatten(parent) {
        var patches_ = _observable.Subject.create();
        var parent_ = cache(map(parent, function (list, key) {
            _observable.Observable.map(list.patches, function (patch) {
                var from = patch.range[0],
                    to = patch.range[1];
                function mapPrevPosition(position) {
                    if (position.prev === _key2['default'].sentinel) return list.state.prev(_key2['default'].sentinel).then(function (next) {
                        return { next: _tree.Path.toKey([key, next]) };
                    });
                    return Promise.resolve({ prev: _tree.Path.toKey([key, position.prev]) });
                }
                function mapNextPosition(position) {
                    if (position.next === _key2['default'].sentinel) return list.state.next(_key2['default'].sentinel).then(function (prev) {
                        return { prev: _tree.Path.toKey([key, prev]) };
                    });
                    return Promise.resolve({ next: _tree.Path.toKey([key, position.next]) });
                }
                return Promise.all([_range.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), _range.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
                    return { range: range, added: patch.added ? patch.added : undefined };
                });
            }).subscribe(patches_);
            return list.state;
        }));
        _observable.Observable.map(parent.patches, function (patch) {
            var from = patch.range[0],
                to = patch.range[1];
            function mapPrevPosition(position) {
                return position.prev === _key2['default'].sentinel ? Promise.resolve({ prev: _key2['default'].sentinel }) : _tree.Tree.next(parent_.state, [position.prev]).then(_tree.Path.toKey).then(function (prev) {
                    return { prev: prev };
                });
            }
            function mapNextPosition(position) {
                return position.next === _key2['default'].sentinel ? Promise.resolve({ next: _key2['default'].sentinel }) : _tree.Tree.prev(parent_.state, [position.next]).then(_tree.Path.toKey).then(function (next) {
                    return { next: next };
                });
            }
            return Promise.all([_range.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), _range.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
                return { range: range, added: patch.added ? _state2['default'].flatten(_state2['default'].map(patch.added, function (list) {
                        return list.state;
                    })) : undefined };
            });
        }).subscribe(patches_);
        var state = _state2['default'].flatten(parent_.state);
        return create(state, patches_);
    }
    List.flatten = flatten;
    function cache(parent) {
        var state = _state2['default'].cache(parent.state),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return {
                range: patch.range,
                added: _state2['default'].cache(patch.added)
            };
        });
        return List.create(state, patches);
    }
    List.cache = cache;
    function create(state, patches) {
        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _patch2['default'].apply : arguments[2];

        var list = { state: state, patches: patches };
        _observable.Observable.scan(patches, reducer, state).subscribe({
            onNext: function onNext(state) {
                list.state = state;
            }
        });
        return list;
    }
    List.create = create;
})(List || (exports.List = List = {}));
exports['default'] = List;



},{"./async_iterator":1,"./key":3,"./observable":6,"./patch":7,"./range":9,"./state":11,"./tree":12}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Disposable;
exports.Disposable = Disposable;
(function (Disposable) {
    function create(disposer) {
        var done = false;
        return {
            dispose: function dispose() {
                if (done) return;
                done = true;
                disposer();
            }
        };
    }
    Disposable.create = create;
})(Disposable || (exports.Disposable = Disposable = {}));
var Observable;
exports.Observable = Observable;
(function (Observable) {
    function map(observable, mapFn) {
        var subject = Subject.create();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(mapFn(value)).then(subject.onNext);
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.map = map;
    function filter(observable, filterFn) {
        var subject = Subject.create();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(filterFn(value)).then(function (result) {
                    return result ? subject.onNext(value) : undefined;
                });
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.filter = filter;
    function scan(observable, scanFn, memo) {
        var subject = Subject.create();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(scanFn(memo, value)).then(function (value) {
                    memo = value;subject.onNext(value);
                });
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.scan = scan;
})(Observable || (exports.Observable = Observable = {}));
var Subject;
exports.Subject = Subject;
(function (Subject) {
    function create() {
        var observers = Object.create(null);
        var current = Promise.resolve();
        function subscribe(observer) {
            var observerKey = _key2['default'].create();
            observers[observerKey] = observer;
            return Disposable.create(function () {
                return delete observers[observerKey];
            });
        }
        function onNext(value) {
            return current = current.then(function () {
                return Promise.all(Object.keys(observers).map(function (key) {
                    return observers[key].onNext(value);
                })).then(function () {});
            });
        }
        return { subscribe: subscribe, onNext: onNext };
    }
    Subject.create = create;
})(Subject || (exports.Subject = Subject = {}));



},{"./key":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

;
var Patch;
exports.Patch = Patch;
(function (Patch) {
    function apply(state, patch) {
        return _state2['default'].splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
})(Patch || (exports.Patch = Patch = {}));
exports['default'] = Patch;



},{"./state":11}],8:[function(require,module,exports){
// type Just<V> = [V];
// type Nothing<V> = Array<V> & { 0: void }
// type Maybe<V> = Just<V> | Nothing<V>;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PromiseUtils;
exports.PromiseUtils = PromiseUtils;
(function (PromiseUtils) {
    function lazy(executor) {
        var promise;
        function then(onfulfilled, onrejected) {
            if (promise) return promise.then(onfulfilled, onrejected);
            return (promise = new Promise(executor)).then(onfulfilled, onrejected);
        }
        return Promise.resolve({ then: then });
    }
    PromiseUtils.lazy = lazy;
})(PromiseUtils || (exports.PromiseUtils = PromiseUtils = {}));
exports["default"] = PromiseUtils;



},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Range;
exports.Range = Range;
(function (Range) {
    Range.all = [{ next: _key2['default'].sentinel }, { prev: _key2['default'].sentinel }];
})(Range || (exports.Range = Range = {}));
var Position;
exports.Position = Position;
(function (Position) {
    function isPrevPosition(position) {
        return 'prev' in position;
    }
    Position.isPrevPosition = isPrevPosition;
    function isNextPosition(position) {
        return 'next' in position;
    }
    Position.isNextPosition = isNextPosition;
    function reverse(position) {
        return Position.isPrevPosition(position) ? { next: position.prev } : { prev: position.next };
    }
    Position.reverse = reverse;
})(Position || (exports.Position = Position = {}));
exports['default'] = Range;



},{"./key":3}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Sonic = Sonic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _async_iterator = require('./async_iterator');

var _async_iterator2 = _interopRequireDefault(_async_iterator);

var _list = require('./list');

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable = require('./observable');

var _promise_utils = require('./promise_utils');

var _promise_utils2 = _interopRequireDefault(_promise_utils);

var _lens = require('./lens');

var _lens2 = _interopRequireDefault(_lens);

function Sonic(obj) {
    if (obj instanceof Array) return _list.List.create(_state2['default'].fromArray(obj), _observable.Subject.create());
    if (obj instanceof Object) return _list.List.create(_state2['default'].fromObject(obj), _observable.Subject.create());
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.State = _state2['default'];
    Sonic.AsyncIterator = _async_iterator2['default'];
    Sonic.List = _list.List;
    Sonic.Tree = _tree2['default'];
    Sonic.Subject = _observable.Subject;
    Sonic.Cache = _cache2['default'];
    Sonic.PromiseUtils = _promise_utils2['default'];
    Sonic.Lens = _lens2['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;



},{"./async_iterator":1,"./cache":2,"./lens":4,"./list":5,"./observable":6,"./promise_utils":8,"./state":11,"./tree":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _range = require('./range');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _async_iterator = require('./async_iterator');

var _async_iterator2 = _interopRequireDefault(_async_iterator);

var _tree = require('./tree');

var State;
exports.State = State;
(function (State) {
    State.Empty = {
        get: function get(key) {
            return _key2['default'].NOT_FOUND;
        },
        prev: function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];
            return key == _key2['default'].sentinel ? Promise.resolve(_key2['default'].sentinel) : _key2['default'].NOT_FOUND;
        },
        next: function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];
            return key == _key2['default'].sentinel ? Promise.resolve(_key2['default'].sentinel) : _key2['default'].NOT_FOUND;
        }
    };
    function extend(parent, _ref) {
        var get = _ref.get;
        var prev = _ref.prev;
        var next = _ref.next;

        var state = Object.create(parent);
        if (get) state.get = get;
        if (prev) state.prev = prev;
        if (next) state.next = next;
        return state;
    }
    State.extend = extend;
    function first(state) {
        return state.next().then(function (key) {
            return state.get(key);
        });
    }
    State.first = first;
    function last(state) {
        return state.prev().then(function (key) {
            return state.get(key);
        });
    }
    State.last = last;
    function has(state, key) {
        return state.get(key).then(function () {
            return true;
        }, function (reason) {
            return reason === _key2['default'].NOT_FOUND_ERROR ? false : Promise.reject(reason);
        });
    }
    State.has = has;
    function is(state, other) {
        var iterator = toIterator(state),
            otherIterator = toIterator(other);
        return _async_iterator2['default'].every(iterator, function (value, key) {
            return otherIterator.next().then(function (k) {
                return k !== key ? false : otherIterator.get().then(function (v) {
                    return v === value;
                });
            });
        }).then(function (res) {
            return res ? otherIterator.next().then(function (k) {
                return k === _key2['default'].sentinel;
            }) : false;
        });
    }
    State.is = is;
    function contains(state, value) {
        return _async_iterator2['default'].some(toIterator(state), function (v, k) {
            return v === value;
        });
    }
    State.contains = contains;
    function isEmpty(state) {
        return state.next().then(function (next) {
            return next === _key2['default'].sentinel;
        });
    }
    State.isEmpty = isEmpty;
    function slice(parent) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return fromIterator(toIterator(parent, range));
    }
    State.slice = slice;
    function splice(parent, range, child) {
        var deleted = slice(parent, range),
            filtered = filter(parent, function (value, key) {
            return deleted.get(key).then(function () {
                return false;
            }, function () {
                return true;
            });
        });
        if (child == null) return filtered;
        var bridgedChild,
            bridgedParent,
            from = range[0],
            to = range[1];
        bridgedChild = extend(child, {
            prev: function prev(key) {
                return child.prev(key).then(function (prev) {
                    if (prev !== _key2['default'].sentinel) return Promise.resolve(prev);
                    return _range.Position.isNextPosition(from) ? Promise.resolve(from.next) : parent.prev(from.prev);
                });
            },
            next: function next(key) {
                return child.next(key).then(function (next) {
                    if (next !== _key2['default'].sentinel) return Promise.resolve(next);
                    return _range.Position.isPrevPosition(to) ? Promise.resolve(to.prev) : parent.next(to.next);
                });
            }
        });
        bridgedParent = extend(filtered, {
            prev: function prev(key) {
                return parent.prev(key).then(function (prev) {
                    if (_range.Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(_key2['default'].sentinel);
                    return has(deleted, prev).then(function (res) {
                        return res ? _key2['default'].NOT_FOUND : prev;
                    });
                });
            },
            next: function next(key) {
                return parent.next(key).then(function (next) {
                    if (_range.Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(_key2['default'].sentinel);
                    return has(deleted, next).then(function (res) {
                        return res ? _key2['default'].NOT_FOUND : next;
                    });
                });
            }
        });
        function get(key) {
            return child.get(key)['catch'](function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? bridgedParent.get(key) : Promise.reject(reason);
            });
        }
        function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            if (_range.Position.isPrevPosition(to) && key === to.prev) return bridgedParent.next(_key2['default'].sentinel);
            return has(bridgedChild, key).then(function (res) {
                return res ? bridgedChild.prev(key) : bridgedParent.prev(key);
            });
        }
        function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            if (_range.Position.isNextPosition(from) && key === from.next) return bridgedChild.next(_key2['default'].sentinel);
            return has(bridgedChild, key).then(function (res) {
                return res ? bridgedChild.next(key) : bridgedParent.next(key);
            });
        }
        return { get: get, prev: prev, next: next };
    }
    State.splice = splice;
    function reverse(parent) {
        return extend(parent, {
            prev: parent.next,
            next: parent.prev
        });
    }
    State.reverse = reverse;
    function map(parent, mapFn) {
        return extend(parent, {
            get: function get(key) {
                return parent.get(key).then(function (value) {
                    return mapFn(value, key);
                });
            }
        });
    }
    State.map = map;
    function filter(parent, filterFn) {
        var cache = Object.create(null);
        function have(key) {
            return key in cache ? cache[key] : cache[key] = parent.get(key).then(function (value) {
                return filterFn(value, key);
            });
        }
        function get(key) {
            return have(key).then(function (res) {
                return res ? parent.get(key) : _key2['default'].NOT_FOUND;
            });
        }
        function prev(key) {
            return parent.prev(key).then(function (p) {
                return p === null ? null : have(p).then(function (res) {
                    return res ? p : prev(p);
                });
            });
        }
        function next(key) {
            return parent.next(key).then(function (n) {
                return n === null ? null : have(n).then(function (res) {
                    return res ? n : next(n);
                });
            });
        }
        return extend(parent, { get: get, prev: prev, next: next });
    }
    State.filter = filter;
    function zoom(parent, key) {
        var next = function next(k) {
            return k == null ? parent.get(key).then(function () {
                return key;
            }, function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? null : Promise.reject(reason);
            }) : key === k ? Promise.resolve(null) : _key2['default'].NOT_FOUND;
        };
        return extend(parent, {
            get: function get(k) {
                return k === key ? parent.get(key) : _key2['default'].NOT_FOUND;
            },
            prev: next,
            next: next
        });
    }
    State.zoom = zoom;
    function flatten(parent) {
        return extend(parent, {
            get: function get(key) {
                return _tree.Tree.get(parent, _tree.Path.fromKey(key));
            },
            prev: function prev(key) {
                return _tree.Tree.prev(parent, _tree.Path.fromKey(key)).then(_tree.Path.toKey);
            },
            next: function next(key) {
                return _tree.Tree.next(parent, _tree.Path.fromKey(key)).then(_tree.Path.toKey);
            }
        });
    }
    State.flatten = flatten;
    function cache(parent) {
        return _cache2['default'].apply(parent, _cache2['default'].create());
    }
    State.cache = cache;
    function keyBy(parent, keyFn) {
        var keyMap = cache(State.map(parent, keyFn));
        var reverseKeyMap = cache({
            get: function get(key) {
                return _async_iterator2['default'].keyOf(State.toIterator(keyMap), key);
            },
            prev: function prev() {
                var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

                return Promise.resolve(key === _key2['default'].sentinel ? _key2['default'].sentinel : reverseKeyMap.get(key)).then(keyMap.prev).then(function (prev) {
                    return prev === _key2['default'].sentinel ? prev : keyMap.get(prev);
                });
            },
            next: function next() {
                var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

                return Promise.resolve(key === _key2['default'].sentinel ? _key2['default'].sentinel : reverseKeyMap.get(key)).then(keyMap.next).then(function (next) {
                    return next === _key2['default'].sentinel ? next : keyMap.get(next);
                });
            }
        });
        return extend(reverseKeyMap, { get: function get(key) {
                return reverseKeyMap.get(key).then(function (key) {
                    return key === _key2['default'].sentinel ? _key2['default'].NOT_FOUND : parent.get(key);
                });
            } });
    }
    State.keyBy = keyBy;
    function keys(parent) {
        return map(parent, function (value, key) {
            return key;
        });
    }
    State.keys = keys;
    function fromArray(values) {
        return {
            get: function get(key) {
                return key in values ? Promise.resolve(values[key]) : _key2['default'].NOT_FOUND;
            },
            prev: function prev(key) {
                var index = key == null ? values.length - 1 : key - 1;
                return Promise.resolve(index === -1 ? null : index);
            },
            next: function next(key) {
                var index = key == null ? 0 : key + 1;
                return Promise.resolve(index === values.length ? null : index);
            }
        };
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromIterator(_async_iterator2['default'].fromObject(values));
    }
    State.fromObject = fromObject;
    function fromIterator(iterator) {
        var cache = _cache2['default'].create(),
            exhausted = false,
            currentKey = null,
            queue = Promise.resolve(null);
        var cachingIterator = _async_iterator2['default'].extend(iterator, {
            get: function get() {
                return cache.get[currentKey] = iterator.get();
            },
            next: function next() {
                return cache.next[currentKey] = iterator.next().then(function (key) {
                    cache.prev[key] = Promise.resolve(currentKey);
                    exhausted = key === null;
                    return currentKey = key;
                });
            }
        });
        function get(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return queue = queue.then(function () {
                if (key === currentKey) return cachingIterator.get();
                return _async_iterator2['default'].find(cachingIterator, function (value, k) {
                    return k === key;
                });
            });
        }
        function prev(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return queue = queue.then(function () {
                return _async_iterator2['default'].some(cachingIterator, function (value, k) {
                    return k === key;
                }).then(function () {
                    return cache.prev[key];
                });
            });
        }
        function next(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return queue = queue.then(function () {
                if (key === currentKey) return cachingIterator.next();
                return _async_iterator2['default'].findKey(cachingIterator, function (value, k) {
                    return k === key;
                }).then(function () {
                    return cachingIterator.next();
                });
            });
        }
        return _cache2['default'].apply({ get: get, prev: prev, next: next }, cache);
    }
    State.fromIterator = fromIterator;
    function toIterator(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var current = _key2['default'].sentinel,
            queue = Promise.resolve(null);
        function get() {
            return queue = queue.then(function () {
                return state.get(current);
            });
        }
        function next() {
            return queue = queue.then(function () {
                var from = range[0],
                    to = range[1];
                function iterate(key) {
                    return state.next(key).then(function (next) {
                        return _range.Position.isPrevPosition(to) && to.prev === next ? current = _key2['default'].sentinel : current = next;
                    });
                }
                if (_range.Position.isPrevPosition(from) && _range.Position.isPrevPosition(to) && from.prev === to.prev) return Promise.resolve(_key2['default'].sentinel);
                if (_range.Position.isNextPosition(from) && _range.Position.isNextPosition(to) && from.next === to.next) return Promise.resolve(_key2['default'].sentinel);
                if (current === _key2['default'].sentinel) return _range.Position.isPrevPosition(from) ? Promise.resolve(current = from.prev) : iterate(from.next);
                if (_range.Position.isNextPosition(to) && to.next === current) return Promise.resolve(current = _key2['default'].sentinel);
                return iterate(current);
            });
        }
        return { get: get, next: next };
    }
    State.toIterator = toIterator;
})(State || (exports.State = State = {}));
exports['default'] = State;



},{"./async_iterator":1,"./cache":2,"./key":3,"./range":9,"./tree":12}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var Path;
exports.Path = Path;
(function (Path) {
    function key(path) {
        return path == null ? null : JSON.stringify(path);
    }
    Path.key = key;
    function fromKey(key) {
        return key == null ? null : JSON.parse(key.toString());
    }
    Path.fromKey = fromKey;
    function toKey(path) {
        return path == null ? null : JSON.stringify(path);
    }
    Path.toKey = toKey;
    function head(path) {
        return path ? path[0] : null;
    }
    Path.head = head;
    function get(path, index) {
        return path ? path[index] : null;
    }
    Path.get = get;
    function tail(path) {
        return path == null ? [] : path.slice(1, path.length);
    }
    Path.tail = tail;
    function append(a, b) {
        return [].concat(a).concat(b);
    }
    Path.append = append;
})(Path || (exports.Path = Path = {}));
var Tree;
exports.Tree = Tree;
(function (Tree) {
    function get(tree, path) {
        var head = Path.get(path, 0),
            tail = Path.get(path, 1);
        return tree.get(head).then(function (state) {
            return state.get(tail);
        });
    }
    Tree.get = get;
    function prev(tree, path) {
        var head = Path.get(path, 0),
            tail = Path.get(path, 1),
            prevs = _state2['default'].filter(_state2['default'].map(tree, function (state) {
            return state.prev();
        }), function (first) {
            return first != null;
        }),
            paths = _state2['default'].map(prevs, function (first, key) {
            return [key, first];
        });
        if (head == null) return paths.prev().then(function (prev) {
            return prev != null ? paths.get(prev) : null;
        });
        return tree.get(head).then(function (state) {
            return state.prev(tail);
        }).then(function (prev) {
            return prev != null ? [head, prev] : paths.prev(head).then(function (prev) {
                return prev != null ? paths.get(prev) : null;
            });
        });
    }
    Tree.prev = prev;
    function next(tree, path) {
        var head = Path.get(path, 0),
            tail = Path.get(path, 1),
            nexts = _state2['default'].filter(_state2['default'].map(tree, function (state) {
            return state.next();
        }), function (first) {
            return first != null;
        }),
            paths = _state2['default'].map(nexts, function (first, key) {
            return [key, first];
        });
        if (head == null) return paths.next().then(function (next) {
            return next != null ? paths.get(next) : null;
        });
        return tree.get(head).then(function (state) {
            return state.next(tail);
        }).then(function (next) {
            return next != null ? [head, next] : paths.next(head).then(function (next) {
                return next != null ? paths.get(next) : null;
            });
        });
    }
    Tree.next = next;
})(Tree || (exports.Tree = Tree = {}));
exports['default'] = Tree;



},{"./state":11}]},{},[10])(10)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGVucy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9vYnNlcnZhYmxlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcGF0Y2guanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wcm9taXNlX3V0aWxzLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcmFuZ2UuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9zb25pYy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3N0YXRlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O29CQ0FnQixPQUFPOzs7O0FBQ2hCLElBQUksYUFBYSxDQUFDOztBQUN6QixDQUFDLFVBQVUsYUFBYSxFQUFFO0FBQ3RCLGlCQUFhLENBQUMsS0FBSyxHQUFHO0FBQ2xCLFdBQUcsRUFBRTttQkFBTSxpQkFBSSxTQUFT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QUFFLEtBQUssQ0FBQztTQUFBLENBQUMsQ0FBQztBQUNyTSxZQUFJLElBQUksSUFBSSxJQUFJLEVBQ1osT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTttQkFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtTQUFBLENBQUMsQ0FBQztBQUM1RSxlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQ2hCLElBQUksQ0FBQyxVQUFBLEtBQUs7bUJBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FBQSxDQUFDLENBQy9CLElBQUksQ0FBQyxVQUFBLElBQUk7bUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7dUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7YUFBQSxDQUFDO1NBQUEsQ0FBQyxDQUFDO0tBQ3pIO0FBQ0QsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDcEIsQ0FBQSxDQUFFLElBQUksYUF6QkksSUFBSSxHQXlCSCxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDVCxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBBc3luY0l0ZXJhdG9yO1xuKGZ1bmN0aW9uIChBc3luY0l0ZXJhdG9yKSB7XG4gICAgQXN5bmNJdGVyYXRvci5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoKSA9PiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXh0ZW5kKGl0ZXJhdG9yLCBwYXJ0aWFsKSB7XG4gICAgICAgIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShpdGVyYXRvcik7XG4gICAgICAgIGlmICgnZ2V0JyBpbiBwYXJ0aWFsKVxuICAgICAgICAgICAgaXRlcmF0b3IuZ2V0ID0gcGFydGlhbC5nZXQ7XG4gICAgICAgIGlmICgnbmV4dCcgaW4gcGFydGlhbClcbiAgICAgICAgICAgIGl0ZXJhdG9yLm5leHQgPSBwYXJ0aWFsLm5leHQ7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZXZlcnkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKS50aGVuKGtleSA9PiBrZXkgPT09IEtleS5zZW50aW5lbCB8fCBpdGVyYXRvci5nZXQoKS50aGVuKHZhbHVlID0+IHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gbG9vcCgpIDogZmFsc2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9vcCgpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmV2ZXJ5ID0gZXZlcnk7XG4gICAgZnVuY3Rpb24gc29tZShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBldmVyeShpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUodmFsdWUsIGtleSkpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQpKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zb21lID0gc29tZTtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4gZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSwga2V5KSA9PiBQcm9taXNlLnJlc29sdmUoZm4odmFsdWUsIGtleSkpLnRoZW4oKCkgPT4gdHJ1ZSkpLnRoZW4oKCkgPT4geyB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiByZWR1Y2UoaXRlcmF0b3IsIGZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBmb3JFYWNoKGl0ZXJhdG9yLCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKGZuKG1lbW8sIHZhbHVlLCBrZXkpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyB9KSkudGhlbigoKSA9PiBtZW1vKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5yZWR1Y2UgPSByZWR1Y2U7XG4gICAgZnVuY3Rpb24gZmluZEtleShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCAodiwgaykgPT4gUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZSh2LCBrKSkudGhlbihyZXMgPT4gcmVzID8gKGtleSA9IGssIHRydWUpIDogZmFsc2UpKVxuICAgICAgICAgICAgLnRoZW4oZm91bmQgPT4gZm91bmQgPyBrZXkgOiBLZXkuc2VudGluZWwpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmRLZXkgPSBmaW5kS2V5O1xuICAgIGZ1bmN0aW9uIGZpbmQoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZmluZEtleShpdGVyYXRvciwgcHJlZGljYXRlKS50aGVuKGtleSA9PiBrZXkgPT09IEtleS5zZW50aW5lbCA/IEtleS5OT1RfRk9VTkQgOiBpdGVyYXRvci5nZXQoKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZCA9IGZpbmQ7XG4gICAgZnVuY3Rpb24ga2V5T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmaW5kS2V5KGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5rZXlPZiA9IGtleU9mO1xuICAgIGZ1bmN0aW9uIGluZGV4T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgKHYsIGspID0+IChpbmRleCsrLCB2YWx1ZSA9PSB2KSkudGhlbihmb3VuZCA9PiBmb3VuZCA/IGluZGV4IDogS2V5Lk5PVF9GT1VORCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaW5kZXhPZiA9IGluZGV4T2Y7XG4gICAgZnVuY3Rpb24ga2V5QXQoaXRlcmF0b3IsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBmaW5kS2V5KGl0ZXJhdG9yLCAoKSA9PiAwID09PSBpbmRleC0tKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5rZXlBdCA9IGtleUF0O1xuICAgIGZ1bmN0aW9uIGF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4ga2V5QXQoaXRlcmF0b3IsIGluZGV4KS50aGVuKGl0ZXJhdG9yLmdldCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuYXQgPSBhdDtcbiAgICBmdW5jdGlvbiBjb250YWlucyhpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHYgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgZnVuY3Rpb24gY29uY2F0KC4uLml0ZXJhdG9ycykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JzLnJlZHVjZSgobWVtbywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRlZCA9IGZhbHNlLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBxdWV1ZS50aGVuKCgpID0+IGl0ZXJhdGVkID8gdmFsdWUuZ2V0KCkgOiBtZW1vLmdldCgpKSxcbiAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZS50aGVuKCgpID0+IGl0ZXJhdGVkID8gdmFsdWUubmV4dCgpIDogbWVtby5uZXh0KCkudGhlbihrZXkgPT4ga2V5ICE9PSBLZXkuc2VudGluZWwgPyBrZXkgOiAoaXRlcmF0ZWQgPSB0cnVlLCB2YWx1ZS5uZXh0KCkpKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIEFzeW5jSXRlcmF0b3IuRW1wdHkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBmdW5jdGlvbiBmcm9tRW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gLTEsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4gY3VycmVudCA8IDAgfHwgY3VycmVudCA+PSBlbnRyaWVzLmxlbmd0aCA/IEtleS5OT1RfRk9VTkQgOiBQcm9taXNlLnJlc29sdmUoZW50cmllc1tjdXJyZW50XVsxXSkpLFxuICAgICAgICAgICAgbmV4dDogKCkgPT4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IFByb21pc2UucmVzb2x2ZSgrK2N1cnJlbnQgPj0gZW50cmllcy5sZW5ndGggPyBLZXkuc2VudGluZWwgOiBlbnRyaWVzW2N1cnJlbnRdWzBdKSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tRW50cmllcyA9IGZyb21FbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoYXJyYXkubWFwKCh2YWx1ZSwga2V5KSA9PiBba2V5LCB2YWx1ZV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKE9iamVjdC5rZXlzKG9iamVjdCkubWFwKGtleSA9PiBba2V5LCBvYmplY3Rba2V5XV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSkgPT4gKG1lbW8ucHVzaCh2YWx1ZSksIG1lbW8pLCBbXSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3QoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlLCBrZXkpID0+IChtZW1vW2tleV0gPSB2YWx1ZSwgbWVtbyksIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRvT2JqZWN0ID0gdG9PYmplY3Q7XG59KShBc3luY0l0ZXJhdG9yIHx8IChBc3luY0l0ZXJhdG9yID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEFzeW5jSXRlcmF0b3I7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jX2l0ZXJhdG9yLmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIENhY2hlO1xuKGZ1bmN0aW9uIChDYWNoZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBleHRlbmQoY2FjaGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShjYWNoZS5nZXQpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUoY2FjaGUubmV4dClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBjYWNoZSkge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLmdldCA/IGNhY2hlLmdldFtrZXldIDogY2FjaGUuZ2V0W2tleV0gPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5wcmV2ID8gY2FjaGUucHJldltrZXldIDogY2FjaGUucHJldltrZXldID0gc3RhdGUucHJldihrZXkpLnRoZW4ocHJldiA9PiB7IGNhY2hlLm5leHRbcHJldl0gPSBQcm9taXNlLnJlc29sdmUoa2V5KTsgcmV0dXJuIHByZXY7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLm5leHQgPyBjYWNoZS5uZXh0W2tleV0gOiBjYWNoZS5uZXh0W2tleV0gPSBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IHsgY2FjaGUucHJldltuZXh0XSA9IFByb21pc2UucmVzb2x2ZShrZXkpOyByZXR1cm4gbmV4dDsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIENhY2hlLmFwcGx5ID0gYXBwbHk7XG59KShDYWNoZSB8fCAoQ2FjaGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQ2FjaGU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhY2hlLmpzLm1hcFxuIiwiaW1wb3J0IFByb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xudmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgS2V5Lk5PVF9GT1VORF9FUlJPUiA9IG5ldyBFcnJvcihcIk5vIGVudHJ5IGF0IHRoZSBzcGVjaWZpZWQga2V5XCIpO1xuICAgIEtleS5OT1RfRk9VTkQgPSBQcm9taXNlVXRpbHMubGF6eSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZWplY3QoS2V5Lk5PVF9GT1VORF9FUlJPUikpO1xuICAgIEtleS5zZW50aW5lbCA9IG51bGw7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgZnVuY3Rpb24ga2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEtleS5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS5jcmVhdGUgPSBjcmVhdGU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtleS5qcy5tYXBcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5leHBvcnQgdmFyIExlbnM7XG4oZnVuY3Rpb24gKExlbnMpIHtcbiAgICBmdW5jdGlvbiBjb21wb3NlKHBhcmVudCwgbGVucykge1xuICAgICAgICB2YXIgZ2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCksIHNldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5nZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKGdldFN1YmplY3QpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChzZXRTdWJqZWN0LCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLnNldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUocGFyZW50LnBhdGNoZXMpO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XG4gICAgfVxuICAgIExlbnMuY29tcG9zZSA9IGNvbXBvc2U7XG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExlbnM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxlbnMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBQYXRjaCBmcm9tICcuL3BhdGNoJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFJhbmdlLCBQb3NpdGlvbiB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuZXhwb3J0IHZhciBMaXN0O1xuKGZ1bmN0aW9uIChMaXN0KSB7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbWFwRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIG1hcEZuKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBBc3luY0l0ZXJhdG9yLmZpbmRLZXkoU3RhdGUudG9JdGVyYXRvcihTdGF0ZS5yZXZlcnNlKHN0YXRlKSwgW1Bvc2l0aW9uLnJldmVyc2UocGF0Y2gucmFuZ2VbMF0pLCB7IHByZXY6IG51bGwgfV0pLCBmaWx0ZXJGbikudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpLFxuICAgICAgICAgICAgICAgIEFzeW5jSXRlcmF0b3IuZmluZEtleShTdGF0ZS50b0l0ZXJhdG9yKHN0YXRlLCBbcGF0Y2gucmFuZ2VbMV0sIHsgcHJldjogbnVsbCB9XSksIGZpbHRlckZuKS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSlcbiAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoe1xuICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5maWx0ZXIocGF0Y2guYWRkZWQsIGZpbHRlckZuKSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcywgKG9sZFN0YXRlLCBwYXRjaGVzKSA9PiBzdGF0ZSA9IFBhdGNoLmFwcGx5KG9sZFN0YXRlLCBwYXRjaGVzKSk7XG4gICAgfVxuICAgIExpc3QuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgdmFyIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlLCBzdGF0ZSA9IFN0YXRlLnpvb20ocGFyZW50LnN0YXRlLCBrZXkpLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAoT2JzZXJ2YWJsZS5maWx0ZXIocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUoU3RhdGUudG9JdGVyYXRvcihwYXJlbnRTdGF0ZSwgcGF0Y2gucmFuZ2UpLCAodmFsdWUsIGspID0+IGsgPT09IGtleSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcGF0Y2guYWRkZWQgPyBTdGF0ZS5oYXMocGF0Y2guYWRkZWQsIGtleSkgOiByZXMpO1xuICAgICAgICB9KSwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBSYW5nZS5hbGwsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuem9vbShwYXRjaC5hZGRlZCwga2V5KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBwYXRjaGVzXyA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIHZhciBwYXJlbnRfID0gY2FjaGUobWFwKHBhcmVudCwgKChsaXN0LCBrZXkpID0+IHtcbiAgICAgICAgICAgIE9ic2VydmFibGUubWFwKGxpc3QucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5wcmV2KEtleS5zZW50aW5lbCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgbmV4dF0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ucHJldl0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlLm5leHQoS2V5LnNlbnRpbmVsKS50aGVuKHByZXYgPT4gKHsgcHJldjogUGF0aC50b0tleShba2V5LCBwcmV2XSkgfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5uZXh0XSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHBhdGNoLmFkZGVkIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShwYXRjaGVzXyk7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5uZXh0KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5wcmV2XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGlzdCA9PiBsaXN0LnN0YXRlKSkgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mbGF0dGVuKHBhcmVudF8uc3RhdGUpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzXyk7XG4gICAgfVxuICAgIExpc3QuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLmNhY2hlKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3QuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIHJlZHVjZXIgPSBQYXRjaC5hcHBseSkge1xuICAgICAgICBjb25zdCBsaXN0ID0geyBzdGF0ZSwgcGF0Y2hlcyB9O1xuICAgICAgICBPYnNlcnZhYmxlLnNjYW4ocGF0Y2hlcywgcmVkdWNlciwgc3RhdGUpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IChzdGF0ZSkgPT4geyBsaXN0LnN0YXRlID0gc3RhdGU7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cbiAgICBMaXN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKExpc3QgfHwgKExpc3QgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlzdC5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGRpc3Bvc2VyKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBEaXNwb3NhYmxlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKERpc3Bvc2FibGUgfHwgKERpc3Bvc2FibGUgPSB7fSkpO1xuZXhwb3J0IHZhciBPYnNlcnZhYmxlO1xuKGZ1bmN0aW9uIChPYnNlcnZhYmxlKSB7XG4gICAgZnVuY3Rpb24gbWFwKG9ic2VydmFibGUsIG1hcEZuKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShtYXBGbih2YWx1ZSkpLnRoZW4oc3ViamVjdC5vbk5leHQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihvYnNlcnZhYmxlLCBmaWx0ZXJGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoZmlsdGVyRm4odmFsdWUpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSkgOiB1bmRlZmluZWQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ob2JzZXJ2YWJsZSwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuc2NhbiA9IHNjYW47XG59KShPYnNlcnZhYmxlIHx8IChPYnNlcnZhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkuY3JlYXRlKCk7XG4gICAgICAgICAgICBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gZGVsZXRlIG9ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uTmV4dCh2YWx1ZSkpKS50aGVuKCgpID0+IHsgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSwgb25OZXh0IH07XG4gICAgfVxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xufSkoU3ViamVjdCB8fCAoU3ViamVjdCA9IHt9KSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xufSkoUGF0Y2ggfHwgKFBhdGNoID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFBhdGNoO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXRjaC5qcy5tYXBcbiIsIi8vIHR5cGUgSnVzdDxWPiA9IFtWXTtcbi8vIHR5cGUgTm90aGluZzxWPiA9IEFycmF5PFY+ICYgeyAwOiB2b2lkIH1cbi8vIHR5cGUgTWF5YmU8Vj4gPSBKdXN0PFY+IHwgTm90aGluZzxWPjtcbmV4cG9ydCB2YXIgUHJvbWlzZVV0aWxzO1xuKGZ1bmN0aW9uIChQcm9taXNlVXRpbHMpIHtcbiAgICBmdW5jdGlvbiBsYXp5KGV4ZWN1dG9yKSB7XG4gICAgICAgIHZhciBwcm9taXNlO1xuICAgICAgICBmdW5jdGlvbiB0aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgICAgIHJldHVybiAocHJvbWlzZSA9IG5ldyBQcm9taXNlKGV4ZWN1dG9yKSkudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHRoZW4gfSk7XG4gICAgfVxuICAgIFByb21pc2VVdGlscy5sYXp5ID0gbGF6eTtcbn0pKFByb21pc2VVdGlscyB8fCAoUHJvbWlzZVV0aWxzID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFByb21pc2VVdGlscztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvbWlzZV91dGlscy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBSYW5nZTtcbihmdW5jdGlvbiAoUmFuZ2UpIHtcbiAgICBSYW5nZS5hbGwgPSBbeyBuZXh0OiBLZXkuc2VudGluZWwgfSwgeyBwcmV2OiBLZXkuc2VudGluZWwgfV07XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuZXhwb3J0IHZhciBQb3NpdGlvbjtcbihmdW5jdGlvbiAoUG9zaXRpb24pIHtcbiAgICBmdW5jdGlvbiBpc1ByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ3ByZXYnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbiA9IGlzUHJldlBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIGlzTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAnbmV4dCcgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uID0gaXNOZXh0UG9zaXRpb247XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pID8geyBuZXh0OiBwb3NpdGlvbi5wcmV2IH0gOiB7IHByZXY6IHBvc2l0aW9uLm5leHQgfTtcbiAgICB9XG4gICAgUG9zaXRpb24ucmV2ZXJzZSA9IHJldmVyc2U7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcFxuIiwiaW1wb3J0IF9TdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCBfQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IExpc3QgYXMgX0xpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IF9UcmVlIGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgX0NhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgU3ViamVjdCBhcyBfU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgX1Byb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xuaW1wb3J0IF9MZW5zIGZyb20gJy4vbGVucyc7XG5leHBvcnQgZnVuY3Rpb24gU29uaWMob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tQXJyYXkob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIHJldHVybiBfTGlzdC5jcmVhdGUoX1N0YXRlLmZyb21PYmplY3Qob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xufVxuZXhwb3J0IHZhciBTb25pYztcbihmdW5jdGlvbiAoU29uaWMpIHtcbiAgICBTb25pYy5TdGF0ZSA9IF9TdGF0ZTtcbiAgICBTb25pYy5Bc3luY0l0ZXJhdG9yID0gX0FzeW5jSXRlcmF0b3I7XG4gICAgU29uaWMuTGlzdCA9IF9MaXN0O1xuICAgIFNvbmljLlRyZWUgPSBfVHJlZTtcbiAgICBTb25pYy5TdWJqZWN0ID0gX1N1YmplY3Q7XG4gICAgU29uaWMuQ2FjaGUgPSBfQ2FjaGU7XG4gICAgU29uaWMuUHJvbWlzZVV0aWxzID0gX1Byb21pc2VVdGlscztcbiAgICBTb25pYy5MZW5zID0gX0xlbnM7XG59KShTb25pYyB8fCAoU29uaWMgPSB7fSkpO1xuO1xubW9kdWxlLmV4cG9ydHMgPSBTb25pYztcbmV4cG9ydCBkZWZhdWx0IFNvbmljO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb25pYy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IHsgUG9zaXRpb24sIFJhbmdlIH0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZS5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoa2V5KSA9PiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBwcmV2OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBuZXh0OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5EXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgICAgaWYgKGdldClcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcbiAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICBzdGF0ZS5wcmV2ID0gcHJldjtcbiAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICBzdGF0ZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBTdGF0ZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZmlyc3Qoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKGtleSA9PiBzdGF0ZS5nZXQoa2V5KSk7XG4gICAgfVxuICAgIFN0YXRlLmZpcnN0ID0gZmlyc3Q7XG4gICAgZnVuY3Rpb24gbGFzdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUucHJldigpLnRoZW4oa2V5ID0+IHN0YXRlLmdldChrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUubGFzdCA9IGxhc3Q7XG4gICAgZnVuY3Rpb24gaGFzKHN0YXRlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4oKCkgPT4gdHJ1ZSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IGZhbHNlIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSk7XG4gICAgfVxuICAgIFN0YXRlLmhhcyA9IGhhcztcbiAgICBmdW5jdGlvbiBpcyhzdGF0ZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gdG9JdGVyYXRvcihzdGF0ZSksIG90aGVySXRlcmF0b3IgPSB0b0l0ZXJhdG9yKG90aGVyKTtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXJJdGVyYXRvci5uZXh0KCkudGhlbihrID0+IGsgIT09IGtleSA/IGZhbHNlIDogb3RoZXJJdGVyYXRvci5nZXQoKS50aGVuKHYgPT4gdiA9PT0gdmFsdWUpKTtcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzID8gb3RoZXJJdGVyYXRvci5uZXh0KCkudGhlbihrID0+IGsgPT09IEtleS5zZW50aW5lbCkgOiBmYWxzZSk7XG4gICAgfVxuICAgIFN0YXRlLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoc3RhdGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUodG9JdGVyYXRvcihzdGF0ZSksICh2LCBrKSA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIFN0YXRlLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgZnVuY3Rpb24gaXNFbXB0eShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ID09PSBLZXkuc2VudGluZWwpO1xuICAgIH1cbiAgICBTdGF0ZS5pc0VtcHR5ID0gaXNFbXB0eTtcbiAgICBmdW5jdGlvbiBzbGljZShwYXJlbnQsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBmcm9tSXRlcmF0b3IodG9JdGVyYXRvcihwYXJlbnQsIHJhbmdlKSk7XG4gICAgfVxuICAgIFN0YXRlLnNsaWNlID0gc2xpY2U7XG4gICAgZnVuY3Rpb24gc3BsaWNlKHBhcmVudCwgcmFuZ2UsIGNoaWxkKSB7XG4gICAgICAgIHZhciBkZWxldGVkID0gc2xpY2UocGFyZW50LCByYW5nZSksIGZpbHRlcmVkID0gZmlsdGVyKHBhcmVudCwgKHZhbHVlLCBrZXkpID0+IGRlbGV0ZWQuZ2V0KGtleSkudGhlbigoKSA9PiBmYWxzZSwgKCkgPT4gdHJ1ZSkpO1xuICAgICAgICBpZiAoY2hpbGQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgICAgICAgdmFyIGJyaWRnZWRDaGlsZCwgYnJpZGdlZFBhcmVudCwgZnJvbSA9IHJhbmdlWzBdLCB0byA9IHJhbmdlWzFdO1xuICAgICAgICBicmlkZ2VkQ2hpbGQgPSBleHRlbmQoY2hpbGQsIHtcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBjaGlsZC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByZXYpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IFByb21pc2UucmVzb2x2ZShmcm9tLm5leHQpIDogcGFyZW50LnByZXYoZnJvbS5wcmV2KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IGNoaWxkLm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0ICE9PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSA/IFByb21pc2UucmVzb2x2ZSh0by5wcmV2KSA6IHBhcmVudC5uZXh0KHRvLm5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGJyaWRnZWRQYXJlbnQgPSBleHRlbmQoZmlsdGVyZWQsIHtcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBwYXJlbnQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiBwcmV2ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLnByZXYoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIHByZXYpLnRoZW4ocmVzID0+IHJlcyA/IEtleS5OT1RfRk9VTkQgOiBwcmV2KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IHBhcmVudC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgbmV4dCA9PT0gZnJvbS5wcmV2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLm5leHQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIG5leHQpLnRoZW4ocmVzID0+IHJlcyA/IEtleS5OT1RfRk9VTkQgOiBuZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2hpbGQuZ2V0KGtleSkuY2F0Y2gocmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IGJyaWRnZWRQYXJlbnQuZ2V0KGtleSkgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBrZXkgPT09IHRvLnByZXYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRQYXJlbnQubmV4dChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhicmlkZ2VkQ2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLnByZXYoa2V5KSA6IGJyaWRnZWRQYXJlbnQucHJldihrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pICYmIGtleSA9PT0gZnJvbS5uZXh0KVxuICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhicmlkZ2VkQ2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLm5leHQoa2V5KSA6IGJyaWRnZWRQYXJlbnQubmV4dChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgU3RhdGUuc3BsaWNlID0gc3BsaWNlO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBwcmV2OiBwYXJlbnQubmV4dCxcbiAgICAgICAgICAgIG5leHQ6IHBhcmVudC5wcmV2XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gbWFwRm4odmFsdWUsIGtleSkpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcbiAgICAgICAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZnVuY3Rpb24gaGF2ZShrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUgPyBjYWNoZVtrZXldIDogY2FjaGVba2V5XSA9IHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IGZpbHRlckZuKHZhbHVlLCBrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaGF2ZShrZXkpLnRoZW4ocmVzID0+IHJlcyA/IHBhcmVudC5nZXQoa2V5KSA6IEtleS5OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnByZXYoa2V5KS50aGVuKHAgPT4gcCA9PT0gbnVsbCA/IG51bGwgOiBoYXZlKHApLnRoZW4ocmVzID0+IHJlcyA/IHAgOiBwcmV2KHApKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQubmV4dChrZXkpLnRoZW4obiA9PiBuID09PSBudWxsID8gbnVsbCA6IGhhdmUobikudGhlbihyZXMgPT4gcmVzID8gbiA6IG5leHQobikpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSAoaykgPT4gayA9PSBudWxsID8gcGFyZW50LmdldChrZXkpLnRoZW4oKCkgPT4ga2V5LCByZWFzb24gPT4gcmVhc29uID09PSBLZXkuTk9UX0ZPVU5EX0VSUk9SID8gbnVsbCA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpIDogKGtleSA9PT0gayA/IFByb21pc2UucmVzb2x2ZShudWxsKSA6IEtleS5OT1RfRk9VTkQpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrID0+IGsgPT09IGtleSA/IHBhcmVudC5nZXQoa2V5KSA6IEtleS5OT1RfRk9VTkQsXG4gICAgICAgICAgICBwcmV2OiBuZXh0LFxuICAgICAgICAgICAgbmV4dDogbmV4dFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuem9vbSA9IHpvb207XG4gICAgZnVuY3Rpb24gZmxhdHRlbihwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDoga2V5ID0+IFRyZWUuZ2V0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLFxuICAgICAgICAgICAgcHJldjoga2V5ID0+IFRyZWUucHJldihwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKS50aGVuKFBhdGgudG9LZXkpLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IFRyZWUubmV4dChwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKS50aGVuKFBhdGgudG9LZXkpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5mbGF0dGVuID0gZmxhdHRlbjtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHBhcmVudCwgQ2FjaGUuY3JlYXRlKCkpO1xuICAgIH1cbiAgICBTdGF0ZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4pIHtcbiAgICAgICAgdmFyIGtleU1hcCA9IGNhY2hlKFN0YXRlLm1hcChwYXJlbnQsIGtleUZuKSk7XG4gICAgICAgIHZhciByZXZlcnNlS2V5TWFwID0gY2FjaGUoe1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gQXN5bmNJdGVyYXRvci5rZXlPZihTdGF0ZS50b0l0ZXJhdG9yKGtleU1hcCksIGtleSksXG4gICAgICAgICAgICBwcmV2OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkgPT09IEtleS5zZW50aW5lbCA/IEtleS5zZW50aW5lbCA6IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGtleU1hcC5wcmV2KS50aGVuKHByZXYgPT4gcHJldiA9PT0gS2V5LnNlbnRpbmVsID8gcHJldiA6IGtleU1hcC5nZXQocHJldikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSA9PT0gS2V5LnNlbnRpbmVsID8gS2V5LnNlbnRpbmVsIDogcmV2ZXJzZUtleU1hcC5nZXQoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oa2V5TWFwLm5leHQpLnRoZW4obmV4dCA9PiBuZXh0ID09PSBLZXkuc2VudGluZWwgPyBuZXh0IDoga2V5TWFwLmdldChuZXh0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHJldmVyc2VLZXlNYXAsIHsgZ2V0OiBrZXkgPT4gcmV2ZXJzZUtleU1hcC5nZXQoa2V5KS50aGVuKGtleSA9PiBrZXkgPT09IEtleS5zZW50aW5lbCA/IEtleS5OT1RfRk9VTkQgOiBwYXJlbnQuZ2V0KGtleSkpIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5rZXlCeSA9IGtleUJ5O1xuICAgIGZ1bmN0aW9uIGtleXMocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBtYXAocGFyZW50LCAodmFsdWUsIGtleSkgPT4ga2V5KTtcbiAgICB9XG4gICAgU3RhdGUua2V5cyA9IGtleXM7XG4gICAgZnVuY3Rpb24gZnJvbUFycmF5KHZhbHVlcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiAoa2V5KSA9PiBrZXkgaW4gdmFsdWVzID8gUHJvbWlzZS5yZXNvbHZlKHZhbHVlc1trZXldKSA6IEtleS5OT1RfRk9VTkQsXG4gICAgICAgICAgICBwcmV2OiAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0ga2V5ID09IG51bGwgPyB2YWx1ZXMubGVuZ3RoIC0gMSA6IGtleSAtIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleCA9PT0gLTEgPyBudWxsIDogaW5kZXgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBrZXkgPT0gbnVsbCA/IDAgOiBrZXkgKyAxO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5kZXggPT09IHZhbHVlcy5sZW5ndGggPyBudWxsIDogaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZyb21JdGVyYXRvcihBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QodmFsdWVzKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIGZyb21JdGVyYXRvcihpdGVyYXRvcikge1xuICAgICAgICB2YXIgY2FjaGUgPSBDYWNoZS5jcmVhdGUoKSwgZXhoYXVzdGVkID0gZmFsc2UsIGN1cnJlbnRLZXkgPSBudWxsLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgdmFyIGNhY2hpbmdJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IuZXh0ZW5kKGl0ZXJhdG9yLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IGNhY2hlLmdldFtjdXJyZW50S2V5XSA9IGl0ZXJhdG9yLmdldCgpLFxuICAgICAgICAgICAgbmV4dDogKCkgPT4gY2FjaGUubmV4dFtjdXJyZW50S2V5XSA9IGl0ZXJhdG9yLm5leHQoKS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgY2FjaGUucHJldltrZXldID0gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgICAgIGV4aGF1c3RlZCA9IGtleSA9PT0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEtleSA9IGtleTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IGN1cnJlbnRLZXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IuZ2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZmluZChjYWNoaW5nSXRlcmF0b3IsICh2YWx1ZSwgaykgPT4gayA9PT0ga2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShjYWNoaW5nSXRlcmF0b3IsICh2YWx1ZSwgaykgPT4gayA9PT0ga2V5KS50aGVuKCgpID0+IGNhY2hlLnByZXZba2V5XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IGN1cnJlbnRLZXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmRLZXkoY2FjaGluZ0l0ZXJhdG9yLCAodmFsdWUsIGspID0+IGsgPT09IGtleSkudGhlbigoKSA9PiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseSh7IGdldCwgcHJldiwgbmV4dCB9LCBjYWNoZSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21JdGVyYXRvciA9IGZyb21JdGVyYXRvcjtcbiAgICBmdW5jdGlvbiB0b0l0ZXJhdG9yKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IEtleS5zZW50aW5lbCwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4gc3RhdGUuZ2V0KGN1cnJlbnQpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpdGVyYXRlKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgdG8ucHJldiA9PT0gbmV4dCA/IGN1cnJlbnQgPSBLZXkuc2VudGluZWwgOiBjdXJyZW50ID0gbmV4dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgZnJvbS5wcmV2ID09PSB0by5wcmV2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pICYmIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiBmcm9tLm5leHQgPT09IHRvLm5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgPyBQcm9taXNlLnJlc29sdmUoY3VycmVudCA9IGZyb20ucHJldikgOiBpdGVyYXRlKGZyb20ubmV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiB0by5uZXh0ID09PSBjdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnQgPSBLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKGN1cnJlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBuZXh0IH07XG4gICAgfVxuICAgIFN0YXRlLnRvSXRlcmF0b3IgPSB0b0l0ZXJhdG9yO1xufSkoU3RhdGUgfHwgKFN0YXRlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXBcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCB2YXIgUGF0aDtcbihmdW5jdGlvbiAoUGF0aCkge1xuICAgIGZ1bmN0aW9uIGtleShwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkocGF0aCk7XG4gICAgfVxuICAgIFBhdGgua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGZyb21LZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT0gbnVsbCA/IG51bGwgOiBKU09OLnBhcnNlKGtleS50b1N0cmluZygpKTtcbiAgICB9XG4gICAgUGF0aC5mcm9tS2V5ID0gZnJvbUtleTtcbiAgICBmdW5jdGlvbiB0b0tleShwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkocGF0aCk7XG4gICAgfVxuICAgIFBhdGgudG9LZXkgPSB0b0tleTtcbiAgICBmdW5jdGlvbiBoZWFkKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoWzBdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5oZWFkID0gaGVhZDtcbiAgICBmdW5jdGlvbiBnZXQocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoW2luZGV4XSA6IG51bGw7XG4gICAgfVxuICAgIFBhdGguZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHRhaWwocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gW10gOiBwYXRoLnNsaWNlKDEsIHBhdGgubGVuZ3RoKTtcbiAgICB9XG4gICAgUGF0aC50YWlsID0gdGFpbDtcbiAgICBmdW5jdGlvbiBhcHBlbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGEpLmNvbmNhdChiKTtcbiAgICB9XG4gICAgUGF0aC5hcHBlbmQgPSBhcHBlbmQ7XG59KShQYXRoIHx8IChQYXRoID0ge30pKTtcbmV4cG9ydCB2YXIgVHJlZTtcbihmdW5jdGlvbiAoVHJlZSkge1xuICAgIGZ1bmN0aW9uIGdldCh0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5nZXQocGF0aCwgMCksIHRhaWwgPSBQYXRoLmdldChwYXRoLCAxKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpLnRoZW4oc3RhdGUgPT4gc3RhdGUuZ2V0KHRhaWwpKTtcbiAgICB9XG4gICAgVHJlZS5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gcHJldih0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5nZXQocGF0aCwgMCksIHRhaWwgPSBQYXRoLmdldChwYXRoLCAxKSwgcHJldnMgPSBTdGF0ZS5maWx0ZXIoU3RhdGUubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLnByZXYoKSksIGZpcnN0ID0+IGZpcnN0ICE9IG51bGwpLCBwYXRocyA9IFN0YXRlLm1hcChwcmV2cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMucHJldigpLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyBwYXRocy5nZXQocHJldikgOiBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpXG4gICAgICAgICAgICAudGhlbihzdGF0ZSA9PiBzdGF0ZS5wcmV2KHRhaWwpKVxuICAgICAgICAgICAgLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyBbaGVhZCwgcHJldl0gOiBwYXRocy5wcmV2KGhlYWQpLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyBwYXRocy5nZXQocHJldikgOiBudWxsKSk7XG4gICAgfVxuICAgIFRyZWUucHJldiA9IHByZXY7XG4gICAgZnVuY3Rpb24gbmV4dCh0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5nZXQocGF0aCwgMCksIHRhaWwgPSBQYXRoLmdldChwYXRoLCAxKSwgbmV4dHMgPSBTdGF0ZS5maWx0ZXIoU3RhdGUubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLm5leHQoKSksIGZpcnN0ID0+IGZpcnN0ICE9IG51bGwpLCBwYXRocyA9IFN0YXRlLm1hcChuZXh0cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ICE9IG51bGwgPyBwYXRocy5nZXQobmV4dCkgOiBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpXG4gICAgICAgICAgICAudGhlbihzdGF0ZSA9PiBzdGF0ZS5uZXh0KHRhaWwpKVxuICAgICAgICAgICAgLnRoZW4obmV4dCA9PiBuZXh0ICE9IG51bGwgPyBbaGVhZCwgbmV4dF0gOiBwYXRocy5uZXh0KGhlYWQpLnRoZW4obmV4dCA9PiBuZXh0ICE9IG51bGwgPyBwYXRocy5nZXQobmV4dCkgOiBudWxsKSk7XG4gICAgfVxuICAgIFRyZWUubmV4dCA9IG5leHQ7XG59KShUcmVlIHx8IChUcmVlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFRyZWU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyZWUuanMubWFwXG4iXX0=
