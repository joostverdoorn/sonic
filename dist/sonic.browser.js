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
                return key == null || iterator.get().then(function (value) {
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
                    return current < 0 || current >= entries.length ? Promise.reject(current) : Promise.resolve(entries[current][1]);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGVucy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9vYnNlcnZhYmxlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcGF0Y2guanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wcm9taXNlX3V0aWxzLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcmFuZ2UuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9zb25pYy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3N0YXRlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O29CQ0FnQixPQUFPOzs7O0FBQ2hCLElBQUksYUFBYSxDQUFDOztBQUN6QixDQUFDLFVBQVUsYUFBYSxFQUFFO0FBQ3RCLGlCQUFhLENBQUMsS0FBSyxHQUFHO0FBQ2xCLFdBQUcsRUFBRTttQkFBTSxpQkFBSSxTQUFT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SyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FBQSxDQUFDLENBQUM7QUFDck0sWUFBSSxJQUFJLElBQUksSUFBSSxFQUNaLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7bUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7U0FBQSxDQUFDLENBQUM7QUFDNUUsZUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUNoQixJQUFJLENBQUMsVUFBQSxLQUFLO21CQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQUEsQ0FBQyxDQUMvQixJQUFJLENBQUMsVUFBQSxJQUFJO21CQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO3VCQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO2FBQUEsQ0FBQztTQUFBLENBQUMsQ0FBQztLQUN6SDtBQUNELFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLENBQUEsQ0FBRSxJQUFJLGFBekJJLElBQUksR0F5QkgsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ1QsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQXN5bmNJdGVyYXRvcjtcbihmdW5jdGlvbiAoQXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jSXRlcmF0b3IuRW1wdHkgPSB7XG4gICAgICAgIGdldDogKCkgPT4gS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgbmV4dDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbClcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV4dGVuZChpdGVyYXRvciwgcGFydGlhbCkge1xuICAgICAgICBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoaXRlcmF0b3IpO1xuICAgICAgICBpZiAoJ2dldCcgaW4gcGFydGlhbClcbiAgICAgICAgICAgIGl0ZXJhdG9yLmdldCA9IHBhcnRpYWwuZ2V0O1xuICAgICAgICBpZiAoJ25leHQnIGluIHBhcnRpYWwpXG4gICAgICAgICAgICBpdGVyYXRvci5uZXh0ID0gcGFydGlhbC5uZXh0O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGV2ZXJ5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCkudGhlbihrZXkgPT4ga2V5ID09IG51bGwgfHwgaXRlcmF0b3IuZ2V0KCkudGhlbih2YWx1ZSA9PiBwcmVkaWNhdGUodmFsdWUsIGtleSkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IGxvb3AoKSA6IGZhbHNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvb3AoKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5ldmVyeSA9IGV2ZXJ5O1xuICAgIGZ1bmN0aW9uIHNvbWUoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSwga2V5KSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHZhbHVlLCBrZXkpKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0KSkudGhlbihyZXN1bHQgPT4gIXJlc3VsdCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc29tZSA9IHNvbWU7XG4gICAgZnVuY3Rpb24gZm9yRWFjaChpdGVyYXRvciwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKGZuKHZhbHVlLCBrZXkpKS50aGVuKCgpID0+IHRydWUpKS50aGVuKCgpID0+IHsgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gcmVkdWNlKGl0ZXJhdG9yLCBmbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gZm9yRWFjaChpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShmbihtZW1vLCB2YWx1ZSwga2V5KSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgfSkpLnRoZW4oKCkgPT4gbWVtbyk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IucmVkdWNlID0gcmVkdWNlO1xuICAgIGZ1bmN0aW9uIGZpbmRLZXkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgKHYsIGspID0+IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUodiwgaykpLnRoZW4ocmVzID0+IHJlcyA/IChrZXkgPSBrLCB0cnVlKSA6IGZhbHNlKSlcbiAgICAgICAgICAgIC50aGVuKGZvdW5kID0+IGZvdW5kID8ga2V5IDogS2V5LnNlbnRpbmVsKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5maW5kS2V5ID0gZmluZEtleTtcbiAgICBmdW5jdGlvbiBmaW5kKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRLZXkoaXRlcmF0b3IsIHByZWRpY2F0ZSkudGhlbihrZXkgPT4ga2V5ID09PSBLZXkuc2VudGluZWwgPyBLZXkuTk9UX0ZPVU5EIDogaXRlcmF0b3IuZ2V0KCkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmQgPSBmaW5kO1xuICAgIGZ1bmN0aW9uIGtleU9mKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmluZEtleShpdGVyYXRvciwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iua2V5T2YgPSBrZXlPZjtcbiAgICBmdW5jdGlvbiBpbmRleE9mKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsICh2LCBrKSA9PiAoaW5kZXgrKywgdmFsdWUgPT0gdikpLnRoZW4oZm91bmQgPT4gZm91bmQgPyBpbmRleCA6IEtleS5OT1RfRk9VTkQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmluZGV4T2YgPSBpbmRleE9mO1xuICAgIGZ1bmN0aW9uIGtleUF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZmluZEtleShpdGVyYXRvciwgKCkgPT4gMCA9PT0gaW5kZXgtLSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iua2V5QXQgPSBrZXlBdDtcbiAgICBmdW5jdGlvbiBhdChpdGVyYXRvciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGtleUF0KGl0ZXJhdG9yLCBpbmRleCkudGhlbihpdGVyYXRvci5nZXQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmF0ID0gYXQ7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGNvbmNhdCguLi5pdGVyYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9ycy5yZWR1Y2UoKG1lbW8sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0ZWQgPSBmYWxzZSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gcXVldWUudGhlbigoKSA9PiBpdGVyYXRlZCA/IHZhbHVlLmdldCgpIDogbWVtby5nZXQoKSksXG4gICAgICAgICAgICAgICAgbmV4dDogKCkgPT4gcXVldWUudGhlbigoKSA9PiBpdGVyYXRlZCA/IHZhbHVlLm5leHQoKSA6IG1lbW8ubmV4dCgpLnRoZW4oa2V5ID0+IGtleSAhPT0gS2V5LnNlbnRpbmVsID8ga2V5IDogKGl0ZXJhdGVkID0gdHJ1ZSwgdmFsdWUubmV4dCgpKSkpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCBBc3luY0l0ZXJhdG9yLkVtcHR5KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb25jYXQgPSBjb25jYXQ7XG4gICAgZnVuY3Rpb24gZnJvbUVudHJpZXMoZW50cmllcykge1xuICAgICAgICB2YXIgY3VycmVudCA9IC0xLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogKCkgPT4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IGN1cnJlbnQgPCAwIHx8IGN1cnJlbnQgPj0gZW50cmllcy5sZW5ndGggPyBQcm9taXNlLnJlamVjdChjdXJyZW50KSA6IFByb21pc2UucmVzb2x2ZShlbnRyaWVzW2N1cnJlbnRdWzFdKSksXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCsrY3VycmVudCA+PSBlbnRyaWVzLmxlbmd0aCA/IEtleS5zZW50aW5lbCA6IGVudHJpZXNbY3VycmVudF1bMF0pKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21FbnRyaWVzID0gZnJvbUVudHJpZXM7XG4gICAgZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhhcnJheS5tYXAoKHZhbHVlLCBrZXkpID0+IFtrZXksIHZhbHVlXSkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoa2V5ID0+IFtrZXksIG9iamVjdFtrZXldXSkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlKSA9PiAobWVtby5wdXNoKHZhbHVlKSwgbWVtbyksIFtdKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgdmFsdWUsIGtleSkgPT4gKG1lbW9ba2V5XSA9IHZhbHVlLCBtZW1vKSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9PYmplY3QgPSB0b09iamVjdDtcbn0pKEFzeW5jSXRlcmF0b3IgfHwgKEFzeW5jSXRlcmF0b3IgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQXN5bmNJdGVyYXRvcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXN5bmNfaXRlcmF0b3IuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQ2FjaGU7XG4oZnVuY3Rpb24gKENhY2hlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGV4dGVuZChjYWNoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gYXBwbHkoc3RhdGUsIGNhY2hlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUuZ2V0ID8gY2FjaGUuZ2V0W2tleV0gOiBjYWNoZS5nZXRba2V5XSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLnByZXYgPyBjYWNoZS5wcmV2W2tleV0gOiBjYWNoZS5wcmV2W2tleV0gPSBzdGF0ZS5wcmV2KGtleSkudGhlbihwcmV2ID0+IHsgY2FjaGUubmV4dFtwcmV2XSA9IFByb21pc2UucmVzb2x2ZShrZXkpOyByZXR1cm4gcHJldjsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUubmV4dCA/IGNhY2hlLm5leHRba2V5XSA6IGNhY2hlLm5leHRba2V5XSA9IHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4geyBjYWNoZS5wcmV2W25leHRdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBuZXh0OyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgQ2FjaGUuYXBwbHkgPSBhcHBseTtcbn0pKENhY2hlIHx8IChDYWNoZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBDYWNoZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGUuanMubWFwXG4iLCJpbXBvcnQgUHJvbWlzZVV0aWxzIGZyb20gJy4vcHJvbWlzZV91dGlscyc7XG52YXIgS2V5O1xuKGZ1bmN0aW9uIChLZXkpIHtcbiAgICBLZXkuTk9UX0ZPVU5EX0VSUk9SID0gbmV3IEVycm9yKFwiTm8gZW50cnkgYXQgdGhlIHNwZWNpZmllZCBrZXlcIik7XG4gICAgS2V5Lk5PVF9GT1VORCA9IFByb21pc2VVdGlscy5sYXp5KChyZXNvbHZlLCByZWplY3QpID0+IHJlamVjdChLZXkuTk9UX0ZPVU5EX0VSUk9SKSk7XG4gICAgS2V5LnNlbnRpbmVsID0gbnVsbDtcbiAgICB2YXIgdW5pcXVlS2V5ID0gMDtcbiAgICBmdW5jdGlvbiBrZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgS2V5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiB1bmlxdWVLZXkrKztcbiAgICB9XG4gICAgS2V5LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKEtleSB8fCAoS2V5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEtleTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5LmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgTGVucztcbihmdW5jdGlvbiAoTGVucykge1xuICAgIGZ1bmN0aW9uIGNvbXBvc2UocGFyZW50LCBsZW5zKSB7XG4gICAgICAgIHZhciBnZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKSwgc2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLmdldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUoZ2V0U3ViamVjdCk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHNldFN1YmplY3QsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxlbnMuc2V0KSB9O1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XG4gICAgICAgIH0pLnN1YnNjcmliZShwYXJlbnQucGF0Y2hlcyk7XG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShTdGF0ZS5tYXAocGFyZW50LnN0YXRlLCBsZW5zLmdldCksIHsgc3Vic2NyaWJlOiBnZXRTdWJqZWN0LnN1YnNjcmliZSwgb25OZXh0OiBzZXRTdWJqZWN0Lm9uTmV4dCB9KTtcbiAgICB9XG4gICAgTGVucy5jb21wb3NlID0gY29tcG9zZTtcbn0pKExlbnMgfHwgKExlbnMgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgTGVucztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGVucy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IFBhdGNoIGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgUmFuZ2UsIFBvc2l0aW9uIH0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5leHBvcnQgdmFyIExpc3Q7XG4oZnVuY3Rpb24gKExpc3QpIHtcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5tYXAocGFyZW50LnN0YXRlLCBtYXBGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4gKHtcbiAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbWFwRm4pIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3QubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihwYXJlbnQsIGZpbHRlckZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmZpbHRlcihwYXJlbnQuc3RhdGUsIGZpbHRlckZuKSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIEFzeW5jSXRlcmF0b3IuZmluZEtleShTdGF0ZS50b0l0ZXJhdG9yKFN0YXRlLnJldmVyc2Uoc3RhdGUpLCBbUG9zaXRpb24ucmV2ZXJzZShwYXRjaC5yYW5nZVswXSksIHsgcHJldjogbnVsbCB9XSksIGZpbHRlckZuKS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSksXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kS2V5KFN0YXRlLnRvSXRlcmF0b3Ioc3RhdGUsIFtwYXRjaC5yYW5nZVsxXSwgeyBwcmV2OiBudWxsIH1dKSwgZmlsdGVyRm4pLnRoZW4ocHJldiA9PiAoeyBwcmV2IH0pKVxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLmZpbHRlcihwYXRjaC5hZGRlZCwgZmlsdGVyRm4pIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzLCAob2xkU3RhdGUsIHBhdGNoZXMpID0+IHN0YXRlID0gUGF0Y2guYXBwbHkob2xkU3RhdGUsIHBhdGNoZXMpKTtcbiAgICB9XG4gICAgTGlzdC5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIHN0YXRlID0gU3RhdGUuem9vbShwYXJlbnQuc3RhdGUsIGtleSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChPYnNlcnZhYmxlLmZpbHRlcihwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShTdGF0ZS50b0l0ZXJhdG9yKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSksICh2YWx1ZSwgaykgPT4gayA9PT0ga2V5KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiBwYXRjaC5hZGRlZCA/IFN0YXRlLmhhcyhwYXRjaC5hZGRlZCwga2V5KSA6IHJlcyk7XG4gICAgICAgIH0pLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IFJhbmdlLmFsbCxcbiAgICAgICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS56b29tKHBhdGNoLmFkZGVkLCBrZXkpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3Quem9vbSA9IHpvb207XG4gICAgZnVuY3Rpb24gZmxhdHRlbihwYXJlbnQpIHtcbiAgICAgICAgdmFyIHBhdGNoZXNfID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgdmFyIHBhcmVudF8gPSBjYWNoZShtYXAocGFyZW50LCAoKGxpc3QsIGtleSkgPT4ge1xuICAgICAgICAgICAgT2JzZXJ2YWJsZS5tYXAobGlzdC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBwYXRjaC5yYW5nZVswXSwgdG8gPSBwYXRjaC5yYW5nZVsxXTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnByZXYgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlLnByZXYoS2V5LnNlbnRpbmVsKS50aGVuKG5leHQgPT4gKHsgbmV4dDogUGF0aC50b0tleShba2V5LCBuZXh0XSkgfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5wcmV2XSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcE5leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGUubmV4dChLZXkuc2VudGluZWwpLnRoZW4ocHJldiA9PiAoeyBwcmV2OiBQYXRoLnRvS2V5KFtrZXksIHByZXZdKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBuZXh0OiBQYXRoLnRvS2V5KFtrZXksIHBvc2l0aW9uLm5leHRdKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBtYXBOZXh0UG9zaXRpb24oZnJvbSkgOiBtYXBQcmV2UG9zaXRpb24oZnJvbSksXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXG4gICAgICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7IHJhbmdlOiByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gcGF0Y2guYWRkZWQgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKHBhdGNoZXNfKTtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlO1xuICAgICAgICB9KSkpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgdmFyIGZyb20gPSBwYXRjaC5yYW5nZVswXSwgdG8gPSBwYXRjaC5yYW5nZVsxXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5wcmV2ID09PSBLZXkuc2VudGluZWwgPyBQcm9taXNlLnJlc29sdmUoeyBwcmV2OiBLZXkuc2VudGluZWwgfSkgOiBUcmVlLm5leHQocGFyZW50Xy5zdGF0ZSwgW3Bvc2l0aW9uLnByZXZdKS50aGVuKFBhdGgudG9LZXkpLnRoZW4ocHJldiA9PiAoeyBwcmV2IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcE5leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5uZXh0ID09PSBLZXkuc2VudGluZWwgPyBQcm9taXNlLnJlc29sdmUoeyBuZXh0OiBLZXkuc2VudGluZWwgfSkgOiBUcmVlLnByZXYocGFyZW50Xy5zdGF0ZSwgW3Bvc2l0aW9uLm5leHRdKS50aGVuKFBhdGgudG9LZXkpLnRoZW4obmV4dCA9PiAoeyBuZXh0IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBtYXBOZXh0UG9zaXRpb24oZnJvbSkgOiBtYXBQcmV2UG9zaXRpb24oZnJvbSksXG4gICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLmZsYXR0ZW4oU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsaXN0ID0+IGxpc3Quc3RhdGUpKSA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgIH0pLnN1YnNjcmliZShwYXRjaGVzXyk7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmZsYXR0ZW4ocGFyZW50Xy5zdGF0ZSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXNfKTtcbiAgICB9XG4gICAgTGlzdC5mbGF0dGVuID0gZmxhdHRlbjtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuY2FjaGUocGFyZW50LnN0YXRlKSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDogU3RhdGUuY2FjaGUocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcywgcmVkdWNlciA9IFBhdGNoLmFwcGx5KSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB7IHN0YXRlLCBwYXRjaGVzIH07XG4gICAgICAgIE9ic2VydmFibGUuc2NhbihwYXRjaGVzLCByZWR1Y2VyLCBzdGF0ZSkuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogKHN0YXRlKSA9PiB7IGxpc3Quc3RhdGUgPSBzdGF0ZTsgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuICAgIExpc3QuY3JlYXRlID0gY3JlYXRlO1xufSkoTGlzdCB8fCAoTGlzdCA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBMaXN0O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1saXN0LmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIERpc3Bvc2FibGU7XG4oZnVuY3Rpb24gKERpc3Bvc2FibGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoZGlzcG9zZXIpIHtcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIERpc3Bvc2FibGUuY3JlYXRlID0gY3JlYXRlO1xufSkoRGlzcG9zYWJsZSB8fCAoRGlzcG9zYWJsZSA9IHt9KSk7XG5leHBvcnQgdmFyIE9ic2VydmFibGU7XG4oZnVuY3Rpb24gKE9ic2VydmFibGUpIHtcbiAgICBmdW5jdGlvbiBtYXAob2JzZXJ2YWJsZSwgbWFwRm4pIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKG1hcEZuKHZhbHVlKSkudGhlbihzdWJqZWN0Lm9uTmV4dClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZTogc3ViamVjdC5zdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKG9ic2VydmFibGUsIGZpbHRlckZuKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShmaWx0ZXJGbih2YWx1ZSkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IHN1YmplY3Qub25OZXh0KHZhbHVlKSA6IHVuZGVmaW5lZClcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZTogc3ViamVjdC5zdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gc2NhbihvYnNlcnZhYmxlLCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vLCB2YWx1ZSkpLnRoZW4odmFsdWUgPT4geyBtZW1vID0gdmFsdWU7IHN1YmplY3Qub25OZXh0KHZhbHVlKTsgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZTogc3ViamVjdC5zdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5zY2FuID0gc2Nhbjtcbn0pKE9ic2VydmFibGUgfHwgKE9ic2VydmFibGUgPSB7fSkpO1xuZXhwb3J0IHZhciBTdWJqZWN0O1xuKGZ1bmN0aW9uIChTdWJqZWN0KSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBvYnNlcnZlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIgY3VycmVudCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlcktleSA9IEtleS5jcmVhdGUoKTtcbiAgICAgICAgICAgIG9ic2VydmVyc1tvYnNlcnZlcktleV0gPSBvYnNlcnZlcjtcbiAgICAgICAgICAgIHJldHVybiBEaXNwb3NhYmxlLmNyZWF0ZSgoKSA9PiBkZWxldGUgb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25OZXh0KHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25OZXh0KHZhbHVlKSkpLnRoZW4oKCkgPT4geyB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlLCBvbk5leHQgfTtcbiAgICB9XG4gICAgU3ViamVjdC5jcmVhdGUgPSBjcmVhdGU7XG59KShTdWJqZWN0IHx8IChTdWJqZWN0ID0ge30pKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXBcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbjtcbmV4cG9ydCB2YXIgUGF0Y2g7XG4oZnVuY3Rpb24gKFBhdGNoKSB7XG4gICAgZnVuY3Rpb24gYXBwbHkoc3RhdGUsIHBhdGNoKSB7XG4gICAgICAgIHJldHVybiBTdGF0ZS5zcGxpY2Uoc3RhdGUsIHBhdGNoLnJhbmdlLCBwYXRjaC5hZGRlZCk7XG4gICAgfVxuICAgIFBhdGNoLmFwcGx5ID0gYXBwbHk7XG59KShQYXRjaCB8fCAoUGF0Y2ggPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUGF0Y2g7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGNoLmpzLm1hcFxuIiwiLy8gdHlwZSBKdXN0PFY+ID0gW1ZdO1xuLy8gdHlwZSBOb3RoaW5nPFY+ID0gQXJyYXk8Vj4gJiB7IDA6IHZvaWQgfVxuLy8gdHlwZSBNYXliZTxWPiA9IEp1c3Q8Vj4gfCBOb3RoaW5nPFY+O1xuZXhwb3J0IHZhciBQcm9taXNlVXRpbHM7XG4oZnVuY3Rpb24gKFByb21pc2VVdGlscykge1xuICAgIGZ1bmN0aW9uIGxhenkoZXhlY3V0b3IpIHtcbiAgICAgICAgdmFyIHByb21pc2U7XG4gICAgICAgIGZ1bmN0aW9uIHRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIChwcm9taXNlID0gbmV3IFByb21pc2UoZXhlY3V0b3IpKS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdGhlbiB9KTtcbiAgICB9XG4gICAgUHJvbWlzZVV0aWxzLmxhenkgPSBsYXp5O1xufSkoUHJvbWlzZVV0aWxzIHx8IChQcm9taXNlVXRpbHMgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZVV0aWxzO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcm9taXNlX3V0aWxzLmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIFJhbmdlO1xuKGZ1bmN0aW9uIChSYW5nZSkge1xuICAgIFJhbmdlLmFsbCA9IFt7IG5leHQ6IEtleS5zZW50aW5lbCB9LCB7IHByZXY6IEtleS5zZW50aW5lbCB9XTtcbn0pKFJhbmdlIHx8IChSYW5nZSA9IHt9KSk7XG5leHBvcnQgdmFyIFBvc2l0aW9uO1xuKGZ1bmN0aW9uIChQb3NpdGlvbikge1xuICAgIGZ1bmN0aW9uIGlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAncHJldicgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uID0gaXNQcmV2UG9zaXRpb247XG4gICAgZnVuY3Rpb24gaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICduZXh0JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24gPSBpc05leHRQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikgPyB7IG5leHQ6IHBvc2l0aW9uLnByZXYgfSA6IHsgcHJldjogcG9zaXRpb24ubmV4dCB9O1xuICAgIH1cbiAgICBQb3NpdGlvbi5yZXZlcnNlID0gcmV2ZXJzZTtcbn0pKFBvc2l0aW9uIHx8IChQb3NpdGlvbiA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBSYW5nZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmFuZ2UuanMubWFwXG4iLCJpbXBvcnQgX1N0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IF9Bc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuaW1wb3J0IHsgTGlzdCBhcyBfTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgX1RyZWUgZnJvbSAnLi90cmVlJztcbmltcG9ydCBfQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgeyBTdWJqZWN0IGFzIF9TdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBfUHJvbWlzZVV0aWxzIGZyb20gJy4vcHJvbWlzZV91dGlscyc7XG5pbXBvcnQgX0xlbnMgZnJvbSAnLi9sZW5zJztcbmV4cG9ydCBmdW5jdGlvbiBTb25pYyhvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJldHVybiBfTGlzdC5jcmVhdGUoX1N0YXRlLmZyb21BcnJheShvYmopLCBfU3ViamVjdC5jcmVhdGUoKSk7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgcmV0dXJuIF9MaXN0LmNyZWF0ZShfU3RhdGUuZnJvbU9iamVjdChvYmopLCBfU3ViamVjdC5jcmVhdGUoKSk7XG59XG5leHBvcnQgdmFyIFNvbmljO1xuKGZ1bmN0aW9uIChTb25pYykge1xuICAgIFNvbmljLlN0YXRlID0gX1N0YXRlO1xuICAgIFNvbmljLkFzeW5jSXRlcmF0b3IgPSBfQXN5bmNJdGVyYXRvcjtcbiAgICBTb25pYy5MaXN0ID0gX0xpc3Q7XG4gICAgU29uaWMuVHJlZSA9IF9UcmVlO1xuICAgIFNvbmljLlN1YmplY3QgPSBfU3ViamVjdDtcbiAgICBTb25pYy5DYWNoZSA9IF9DYWNoZTtcbiAgICBTb25pYy5Qcm9taXNlVXRpbHMgPSBfUHJvbWlzZVV0aWxzO1xuICAgIFNvbmljLkxlbnMgPSBfTGVucztcbn0pKFNvbmljIHx8IChTb25pYyA9IHt9KSk7XG47XG5tb2R1bGUuZXhwb3J0cyA9IFNvbmljO1xuZXhwb3J0IGRlZmF1bHQgU29uaWM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNvbmljLmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgeyBQb3NpdGlvbiwgUmFuZ2UgfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5leHBvcnQgdmFyIFN0YXRlO1xuKGZ1bmN0aW9uIChTdGF0ZSkge1xuICAgIFN0YXRlLkVtcHR5ID0ge1xuICAgICAgICBnZXQ6IChrZXkpID0+IEtleS5OT1RfRk9VTkQsXG4gICAgICAgIHByZXY6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IGtleSA9PSBLZXkuc2VudGluZWwgPyBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKSA6IEtleS5OT1RfRk9VTkQsXG4gICAgICAgIG5leHQ6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IGtleSA9PSBLZXkuc2VudGluZWwgPyBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKSA6IEtleS5OT1RfRk9VTkRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIHsgZ2V0LCBwcmV2LCBuZXh0IH0pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xuICAgICAgICBpZiAoZ2V0KVxuICAgICAgICAgICAgc3RhdGUuZ2V0ID0gZ2V0O1xuICAgICAgICBpZiAocHJldilcbiAgICAgICAgICAgIHN0YXRlLnByZXYgPSBwcmV2O1xuICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgIHN0YXRlLm5leHQgPSBuZXh0O1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIFN0YXRlLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBmaXJzdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUubmV4dCgpLnRoZW4oa2V5ID0+IHN0YXRlLmdldChrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUuZmlyc3QgPSBmaXJzdDtcbiAgICBmdW5jdGlvbiBsYXN0KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5wcmV2KCkudGhlbihrZXkgPT4gc3RhdGUuZ2V0KGtleSkpO1xuICAgIH1cbiAgICBTdGF0ZS5sYXN0ID0gbGFzdDtcbiAgICBmdW5jdGlvbiBoYXMoc3RhdGUsIGtleSkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZ2V0KGtleSkudGhlbigoKSA9PiB0cnVlLCByZWFzb24gPT4gcmVhc29uID09PSBLZXkuTk9UX0ZPVU5EX0VSUk9SID8gZmFsc2UgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKTtcbiAgICB9XG4gICAgU3RhdGUuaGFzID0gaGFzO1xuICAgIGZ1bmN0aW9uIGlzKHN0YXRlLCBvdGhlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSB0b0l0ZXJhdG9yKHN0YXRlKSwgb3RoZXJJdGVyYXRvciA9IHRvSXRlcmF0b3Iob3RoZXIpO1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5ldmVyeShpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvdGhlckl0ZXJhdG9yLm5leHQoKS50aGVuKGsgPT4gayAhPT0ga2V5ID8gZmFsc2UgOiBvdGhlckl0ZXJhdG9yLmdldCgpLnRoZW4odiA9PiB2ID09PSB2YWx1ZSkpO1xuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMgPyBvdGhlckl0ZXJhdG9yLm5leHQoKS50aGVuKGsgPT4gayA9PT0gS2V5LnNlbnRpbmVsKSA6IGZhbHNlKTtcbiAgICB9XG4gICAgU3RhdGUuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBjb250YWlucyhzdGF0ZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZSh0b0l0ZXJhdG9yKHN0YXRlKSwgKHYsIGspID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBpc0VtcHR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCk7XG4gICAgfVxuICAgIFN0YXRlLmlzRW1wdHkgPSBpc0VtcHR5O1xuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGZyb21JdGVyYXRvcih0b0l0ZXJhdG9yKHBhcmVudCwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUuc2xpY2UgPSBzbGljZTtcbiAgICBmdW5jdGlvbiBzcGxpY2UocGFyZW50LCByYW5nZSwgY2hpbGQpIHtcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgIGJyaWRnZWRDaGlsZCA9IGV4dGVuZChjaGlsZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IGNoaWxkLnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJldik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gUHJvbWlzZS5yZXNvbHZlKGZyb20ubmV4dCkgOiBwYXJlbnQucHJldihmcm9tLnByZXYpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gY2hpbGQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgIT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pID8gUHJvbWlzZS5yZXNvbHZlKHRvLnByZXYpIDogcGFyZW50Lm5leHQodG8ubmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgYnJpZGdlZFBhcmVudCA9IGV4dGVuZChmaWx0ZXJlZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IHBhcmVudC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHByZXYgPT09IHRvLm5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQucHJldihLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgcHJldikudGhlbihyZXMgPT4gcmVzID8gS2V5Lk5PVF9GT1VORCA6IHByZXYpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gcGFyZW50Lm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBuZXh0ID09PSBmcm9tLnByZXYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgbmV4dCkudGhlbihyZXMgPT4gcmVzID8gS2V5Lk5PVF9GT1VORCA6IG5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZC5nZXQoa2V5KS5jYXRjaChyZWFzb24gPT4gcmVhc29uID09PSBLZXkuTk9UX0ZPVU5EX0VSUk9SID8gYnJpZGdlZFBhcmVudC5nZXQoa2V5KSA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGtleSA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZFBhcmVudC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQubmV4dChrZXkpIDogYnJpZGdlZFBhcmVudC5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5zcGxpY2UgPSBzcGxpY2U7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIHByZXY6IHBhcmVudC5uZXh0LFxuICAgICAgICAgICAgbmV4dDogcGFyZW50LnByZXZcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnJldmVyc2UgPSByZXZlcnNlO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBtYXBGbih2YWx1ZSwga2V5KSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBoYXZlKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZSA/IGNhY2hlW2tleV0gOiBjYWNoZVtrZXldID0gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gZmlsdGVyRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXZlKGtleSkudGhlbihyZXMgPT4gcmVzID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQucHJldihrZXkpLnRoZW4ocCA9PiBwID09PSBudWxsID8gbnVsbCA6IGhhdmUocCkudGhlbihyZXMgPT4gcmVzID8gcCA6IHByZXYocCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KGtleSkudGhlbihuID0+IG4gPT09IG51bGwgPyBudWxsIDogaGF2ZShuKS50aGVuKHJlcyA9PiByZXMgPyBuIDogbmV4dChuKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IChrKSA9PiBrID09IG51bGwgPyBwYXJlbnQuZ2V0KGtleSkudGhlbigoKSA9PiBrZXksIHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBudWxsIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSkgOiAoa2V5ID09PSBrID8gUHJvbWlzZS5yZXNvbHZlKG51bGwpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGsgPT4gayA9PT0ga2V5ID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgICAgIHByZXY6IG5leHQsXG4gICAgICAgICAgICBuZXh0OiBuZXh0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gVHJlZS5nZXQocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSksXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gVHJlZS5wcmV2KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gVHJlZS5uZXh0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkocGFyZW50LCBDYWNoZS5jcmVhdGUoKSk7XG4gICAgfVxuICAgIFN0YXRlLmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24ga2V5QnkocGFyZW50LCBrZXlGbikge1xuICAgICAgICB2YXIga2V5TWFwID0gY2FjaGUoU3RhdGUubWFwKHBhcmVudCwga2V5Rm4pKTtcbiAgICAgICAgdmFyIHJldmVyc2VLZXlNYXAgPSBjYWNoZSh7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBBc3luY0l0ZXJhdG9yLmtleU9mKFN0YXRlLnRvSXRlcmF0b3Ioa2V5TWFwKSwga2V5KSxcbiAgICAgICAgICAgIHByZXY6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSA9PT0gS2V5LnNlbnRpbmVsID8gS2V5LnNlbnRpbmVsIDogcmV2ZXJzZUtleU1hcC5nZXQoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oa2V5TWFwLnByZXYpLnRoZW4ocHJldiA9PiBwcmV2ID09PSBLZXkuc2VudGluZWwgPyBwcmV2IDoga2V5TWFwLmdldChwcmV2KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5ID09PSBLZXkuc2VudGluZWwgPyBLZXkuc2VudGluZWwgOiByZXZlcnNlS2V5TWFwLmdldChrZXkpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihrZXlNYXAubmV4dCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCA/IG5leHQgOiBrZXlNYXAuZ2V0KG5leHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBleHRlbmQocmV2ZXJzZUtleU1hcCwgeyBnZXQ6IGtleSA9PiByZXZlcnNlS2V5TWFwLmdldChrZXkpLnRoZW4oa2V5ID0+IGtleSA9PT0gS2V5LnNlbnRpbmVsID8gS2V5Lk5PVF9GT1VORCA6IHBhcmVudC5nZXQoa2V5KSkgfSk7XG4gICAgfVxuICAgIFN0YXRlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24ga2V5cyhwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIG1hcChwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBrZXkpO1xuICAgIH1cbiAgICBTdGF0ZS5rZXlzID0ga2V5cztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IChrZXkpID0+IGtleSBpbiB2YWx1ZXMgPyBQcm9taXNlLnJlc29sdmUodmFsdWVzW2tleV0pIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgICAgIHByZXY6IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBrZXkgPT0gbnVsbCA/IHZhbHVlcy5sZW5ndGggLSAxIDoga2V5IC0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4ID09PSAtMSA/IG51bGwgOiBpbmRleCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGtleSA9PSBudWxsID8gMCA6IGtleSArIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleCA9PT0gdmFsdWVzLmxlbmd0aCA/IG51bGwgOiBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnJvbUl0ZXJhdG9yKEFzeW5jSXRlcmF0b3IuZnJvbU9iamVjdCh2YWx1ZXMpKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XG4gICAgZnVuY3Rpb24gZnJvbUl0ZXJhdG9yKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IENhY2hlLmNyZWF0ZSgpLCBleGhhdXN0ZWQgPSBmYWxzZSwgY3VycmVudEtleSA9IG51bGwsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB2YXIgY2FjaGluZ0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvci5leHRlbmQoaXRlcmF0b3IsIHtcbiAgICAgICAgICAgIGdldDogKCkgPT4gY2FjaGUuZ2V0W2N1cnJlbnRLZXldID0gaXRlcmF0b3IuZ2V0KCksXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBjYWNoZS5uZXh0W2N1cnJlbnRLZXldID0gaXRlcmF0b3IubmV4dCgpLnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBjYWNoZS5wcmV2W2tleV0gPSBQcm9taXNlLnJlc29sdmUoY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgZXhoYXVzdGVkID0ga2V5ID09PSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50S2V5ID0ga2V5O1xuICAgICAgICAgICAgfSksXG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hpbmdJdGVyYXRvci5nZXQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGNhY2hpbmdJdGVyYXRvciwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGUucHJldltrZXldKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hpbmdJdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZmluZEtleShjYWNoaW5nSXRlcmF0b3IsICh2YWx1ZSwgaykgPT4gayA9PT0ga2V5KS50aGVuKCgpID0+IGNhY2hpbmdJdGVyYXRvci5uZXh0KCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHsgZ2V0LCBwcmV2LCBuZXh0IH0sIGNhY2hlKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUl0ZXJhdG9yID0gZnJvbUl0ZXJhdG9yO1xuICAgIGZ1bmN0aW9uIHRvSXRlcmF0b3Ioc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gS2V5LnNlbnRpbmVsLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiBzdGF0ZS5nZXQoY3VycmVudCkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IHJhbmdlWzBdLCB0byA9IHJhbmdlWzFdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGUoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiB0by5wcmV2ID09PSBuZXh0ID8gY3VycmVudCA9IEtleS5zZW50aW5lbCA6IGN1cnJlbnQgPSBuZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBmcm9tLnByZXYgPT09IHRvLnByZXYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIGZyb20ubmV4dCA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IFByb21pc2UucmVzb2x2ZShjdXJyZW50ID0gZnJvbS5wcmV2KSA6IGl0ZXJhdGUoZnJvbS5uZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHRvLm5leHQgPT09IGN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3VycmVudCA9IEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUoY3VycmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIG5leHQgfTtcbiAgICB9XG4gICAgU3RhdGUudG9JdGVyYXRvciA9IHRvSXRlcmF0b3I7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXRlLmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHZhciBQYXRoO1xuKGZ1bmN0aW9uIChQYXRoKSB7XG4gICAgZnVuY3Rpb24ga2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gZnJvbUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmZyb21LZXkgPSBmcm9tS2V5O1xuICAgIGZ1bmN0aW9uIHRvS2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC50b0tleSA9IHRvS2V5O1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbaW5kZXhdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gdGFpbChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBbXSA6IHBhdGguc2xpY2UoMSwgcGF0aC5sZW5ndGgpO1xuICAgIH1cbiAgICBQYXRoLnRhaWwgPSB0YWlsO1xuICAgIGZ1bmN0aW9uIGFwcGVuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoYSkuY29uY2F0KGIpO1xuICAgIH1cbiAgICBQYXRoLmFwcGVuZCA9IGFwcGVuZDtcbn0pKFBhdGggfHwgKFBhdGggPSB7fSkpO1xuZXhwb3J0IHZhciBUcmVlO1xuKGZ1bmN0aW9uIChUcmVlKSB7XG4gICAgZnVuY3Rpb24gZ2V0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZCkudGhlbihzdGF0ZSA9PiBzdGF0ZS5nZXQodGFpbCkpO1xuICAgIH1cbiAgICBUcmVlLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwcmV2KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBwcmV2cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUucHJldigpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5wcmV2KCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBuZXh0cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUubmV4dCgpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKG5leHRzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IFtoZWFkLCBuZXh0XSA6IHBhdGhzLm5leHQoaGVhZCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5uZXh0ID0gbmV4dDtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZS5qcy5tYXBcbiJdfQ==
