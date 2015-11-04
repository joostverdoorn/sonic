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
                return reverseKeyMap.get(key).then(parent.get);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGVucy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9vYnNlcnZhYmxlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcGF0Y2guanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wcm9taXNlX3V0aWxzLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcmFuZ2UuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9zb25pYy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3N0YXRlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O29CQ0FnQixPQUFPOzs7O0FBQ2hCLElBQUksYUFBYSxDQUFDOztBQUN6QixDQUFDLFVBQVUsYUFBYSxFQUFFO0FBQ3RCLGlCQUFhLENBQUMsS0FBSyxHQUFHO0FBQ2xCLFdBQUcsRUFBRTttQkFBTSxpQkFBSSxTQUFT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QUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTttQkFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtTQUFBLENBQUMsQ0FBQztBQUM1RSxlQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQ2hCLElBQUksQ0FBQyxVQUFBLEtBQUs7bUJBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FBQSxDQUFDLENBQy9CLElBQUksQ0FBQyxVQUFBLElBQUk7bUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7dUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7YUFBQSxDQUFDO1NBQUEsQ0FBQyxDQUFDO0tBQ3pIO0FBQ0QsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDcEIsQ0FBQSxDQUFFLElBQUksYUF6QkksSUFBSSxHQXlCSCxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDVCxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBBc3luY0l0ZXJhdG9yO1xuKGZ1bmN0aW9uIChBc3luY0l0ZXJhdG9yKSB7XG4gICAgQXN5bmNJdGVyYXRvci5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoKSA9PiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXh0ZW5kKGl0ZXJhdG9yLCBwYXJ0aWFsKSB7XG4gICAgICAgIGl0ZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShpdGVyYXRvcik7XG4gICAgICAgIGlmICgnZ2V0JyBpbiBwYXJ0aWFsKVxuICAgICAgICAgICAgaXRlcmF0b3IuZ2V0ID0gcGFydGlhbC5nZXQ7XG4gICAgICAgIGlmICgnbmV4dCcgaW4gcGFydGlhbClcbiAgICAgICAgICAgIGl0ZXJhdG9yLm5leHQgPSBwYXJ0aWFsLm5leHQ7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcjtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZXZlcnkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKS50aGVuKGtleSA9PiBrZXkgPT0gbnVsbCB8fCBpdGVyYXRvci5nZXQoKS50aGVuKHZhbHVlID0+IHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gbG9vcCgpIDogZmFsc2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9vcCgpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmV2ZXJ5ID0gZXZlcnk7XG4gICAgZnVuY3Rpb24gc29tZShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBldmVyeShpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUodmFsdWUsIGtleSkpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQpKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zb21lID0gc29tZTtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4gZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSwga2V5KSA9PiBQcm9taXNlLnJlc29sdmUoZm4odmFsdWUsIGtleSkpLnRoZW4oKCkgPT4gdHJ1ZSkpLnRoZW4oKCkgPT4geyB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiByZWR1Y2UoaXRlcmF0b3IsIGZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBmb3JFYWNoKGl0ZXJhdG9yLCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKGZuKG1lbW8sIHZhbHVlLCBrZXkpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyB9KSkudGhlbigoKSA9PiBtZW1vKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5yZWR1Y2UgPSByZWR1Y2U7XG4gICAgZnVuY3Rpb24gZmluZEtleShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCAodiwgaykgPT4gUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZSh2LCBrKSkudGhlbihyZXMgPT4gcmVzID8gKGtleSA9IGssIHRydWUpIDogZmFsc2UpKVxuICAgICAgICAgICAgLnRoZW4oZm91bmQgPT4gZm91bmQgPyBrZXkgOiBLZXkuc2VudGluZWwpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmRLZXkgPSBmaW5kS2V5O1xuICAgIGZ1bmN0aW9uIGZpbmQoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZmluZEtleShpdGVyYXRvciwgcHJlZGljYXRlKS50aGVuKGtleSA9PiBrZXkgPT09IEtleS5zZW50aW5lbCA/IEtleS5OT1RfRk9VTkQgOiBpdGVyYXRvci5nZXQoKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZCA9IGZpbmQ7XG4gICAgZnVuY3Rpb24ga2V5T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmaW5kS2V5KGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5rZXlPZiA9IGtleU9mO1xuICAgIGZ1bmN0aW9uIGluZGV4T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgKHYsIGspID0+IChpbmRleCsrLCB2YWx1ZSA9PSB2KSkudGhlbihmb3VuZCA9PiBmb3VuZCA/IGluZGV4IDogS2V5Lk5PVF9GT1VORCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaW5kZXhPZiA9IGluZGV4T2Y7XG4gICAgZnVuY3Rpb24ga2V5QXQoaXRlcmF0b3IsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBmaW5kS2V5KGl0ZXJhdG9yLCAoKSA9PiAwID09PSBpbmRleC0tKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5rZXlBdCA9IGtleUF0O1xuICAgIGZ1bmN0aW9uIGF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4ga2V5QXQoaXRlcmF0b3IsIGluZGV4KS50aGVuKGl0ZXJhdG9yLmdldCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuYXQgPSBhdDtcbiAgICBmdW5jdGlvbiBjb250YWlucyhpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHYgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgZnVuY3Rpb24gY29uY2F0KC4uLml0ZXJhdG9ycykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JzLnJlZHVjZSgobWVtbywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRlZCA9IGZhbHNlLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBxdWV1ZS50aGVuKCgpID0+IGl0ZXJhdGVkID8gdmFsdWUuZ2V0KCkgOiBtZW1vLmdldCgpKSxcbiAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZS50aGVuKCgpID0+IGl0ZXJhdGVkID8gdmFsdWUubmV4dCgpIDogbWVtby5uZXh0KCkudGhlbihrZXkgPT4ga2V5ICE9PSBLZXkuc2VudGluZWwgPyBrZXkgOiAoaXRlcmF0ZWQgPSB0cnVlLCB2YWx1ZS5uZXh0KCkpKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIEFzeW5jSXRlcmF0b3IuRW1wdHkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBmdW5jdGlvbiBmcm9tRW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gLTEsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4gY3VycmVudCA8IDAgfHwgY3VycmVudCA+PSBlbnRyaWVzLmxlbmd0aCA/IFByb21pc2UucmVqZWN0KGN1cnJlbnQpIDogUHJvbWlzZS5yZXNvbHZlKGVudHJpZXNbY3VycmVudF1bMV0pKSxcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoKytjdXJyZW50ID49IGVudHJpZXMubGVuZ3RoID8gS2V5LnNlbnRpbmVsIDogZW50cmllc1tjdXJyZW50XVswXSkpXG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUVudHJpZXMgPSBmcm9tRW50cmllcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGFycmF5Lm1hcCgodmFsdWUsIGtleSkgPT4gW2tleSwgdmFsdWVdKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhPYmplY3Qua2V5cyhvYmplY3QpLm1hcChrZXkgPT4gW2tleSwgb2JqZWN0W2tleV1dKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XG4gICAgZnVuY3Rpb24gdG9BcnJheShpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgdmFsdWUpID0+IChtZW1vLnB1c2godmFsdWUpLCBtZW1vKSwgW10pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRvQXJyYXkgPSB0b0FycmF5O1xuICAgIGZ1bmN0aW9uIHRvT2JqZWN0KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSwga2V5KSA9PiAobWVtb1trZXldID0gdmFsdWUsIG1lbW8pLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b09iamVjdCA9IHRvT2JqZWN0O1xufSkoQXN5bmNJdGVyYXRvciB8fCAoQXN5bmNJdGVyYXRvciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBBc3luY0l0ZXJhdG9yO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luY19pdGVyYXRvci5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBDYWNoZTtcbihmdW5jdGlvbiAoQ2FjaGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gZXh0ZW5kKGNhY2hlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUoY2FjaGUuZ2V0KSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUoY2FjaGUucHJldiksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKGNhY2hlLm5leHQpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgY2FjaGUpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5nZXQgPyBjYWNoZS5nZXRba2V5XSA6IGNhY2hlLmdldFtrZXldID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUucHJldiA/IGNhY2hlLnByZXZba2V5XSA6IGNhY2hlLnByZXZba2V5XSA9IHN0YXRlLnByZXYoa2V5KS50aGVuKHByZXYgPT4geyBjYWNoZS5uZXh0W3ByZXZdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBwcmV2OyB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5uZXh0ID8gY2FjaGUubmV4dFtrZXldIDogY2FjaGUubmV4dFtrZXldID0gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7IGNhY2hlLnByZXZbbmV4dF0gPSBQcm9taXNlLnJlc29sdmUoa2V5KTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBDYWNoZS5hcHBseSA9IGFwcGx5O1xufSkoQ2FjaGUgfHwgKENhY2hlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYWNoZS5qcy5tYXBcbiIsImltcG9ydCBQcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbnZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIEtleS5OT1RfRk9VTkRfRVJST1IgPSBuZXcgRXJyb3IoXCJObyBlbnRyeSBhdCB0aGUgc3BlY2lmaWVkIGtleVwiKTtcbiAgICBLZXkuTk9UX0ZPVU5EID0gUHJvbWlzZVV0aWxzLmxhenkoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KEtleS5OT1RfRk9VTkRfRVJST1IpKTtcbiAgICBLZXkuc2VudGluZWwgPSBudWxsO1xuICAgIHZhciB1bmlxdWVLZXkgPSAwO1xuICAgIGZ1bmN0aW9uIGtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleS50b1N0cmluZygpO1xuICAgIH1cbiAgICBLZXkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUtleSsrO1xuICAgIH1cbiAgICBLZXkuY3JlYXRlID0gY3JlYXRlO1xufSkoS2V5IHx8IChLZXkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgS2V5O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXkuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuZXhwb3J0IHZhciBMZW5zO1xuKGZ1bmN0aW9uIChMZW5zKSB7XG4gICAgZnVuY3Rpb24gY29tcG9zZShwYXJlbnQsIGxlbnMpIHtcbiAgICAgICAgdmFyIGdldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpLCBzZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxlbnMuZ2V0KSB9O1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XG4gICAgICAgIH0pLnN1YnNjcmliZShnZXRTdWJqZWN0KTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAoc2V0U3ViamVjdCwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5zZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhcmVudC5wYXRjaGVzKTtcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIGxlbnMuZ2V0KSwgeyBzdWJzY3JpYmU6IGdldFN1YmplY3Quc3Vic2NyaWJlLCBvbk5leHQ6IHNldFN1YmplY3Qub25OZXh0IH0pO1xuICAgIH1cbiAgICBMZW5zLmNvbXBvc2UgPSBjb21wb3NlO1xufSkoTGVucyB8fCAoTGVucyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBMZW5zO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZW5zLmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBSYW5nZSwgUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgTGlzdDtcbihmdW5jdGlvbiAoTGlzdCkge1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIG1hcEZuKSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiAoe1xuICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBtYXBGbikgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmlsdGVyKHBhcmVudC5zdGF0ZSwgZmlsdGVyRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kS2V5KFN0YXRlLnRvSXRlcmF0b3IoU3RhdGUucmV2ZXJzZShzdGF0ZSksIFtQb3NpdGlvbi5yZXZlcnNlKHBhdGNoLnJhbmdlWzBdKSwgeyBwcmV2OiBudWxsIH1dKSwgZmlsdGVyRm4pLnRoZW4obmV4dCA9PiAoeyBuZXh0IH0pKSxcbiAgICAgICAgICAgICAgICBBc3luY0l0ZXJhdG9yLmZpbmRLZXkoU3RhdGUudG9JdGVyYXRvcihzdGF0ZSwgW3BhdGNoLnJhbmdlWzFdLCB7IHByZXY6IG51bGwgfV0pLCBmaWx0ZXJGbikudGhlbihwcmV2ID0+ICh7IHByZXYgfSkpXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmlsdGVyKHBhdGNoLmFkZGVkLCBmaWx0ZXJGbikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIChvbGRTdGF0ZSwgcGF0Y2hlcykgPT4gc3RhdGUgPSBQYXRjaC5hcHBseShvbGRTdGF0ZSwgcGF0Y2hlcykpO1xuICAgIH1cbiAgICBMaXN0LmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgc3RhdGUgPSBTdGF0ZS56b29tKHBhcmVudC5zdGF0ZSwga2V5KSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKE9ic2VydmFibGUuZmlsdGVyKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKFN0YXRlLnRvSXRlcmF0b3IocGFyZW50U3RhdGUsIHBhdGNoLnJhbmdlKSwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHBhdGNoLmFkZGVkID8gU3RhdGUuaGFzKHBhdGNoLmFkZGVkLCBrZXkpIDogcmVzKTtcbiAgICAgICAgfSksIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogUmFuZ2UuYWxsLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLnpvb20ocGF0Y2guYWRkZWQsIGtleSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICB2YXIgcGF0Y2hlc18gPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICB2YXIgcGFyZW50XyA9IGNhY2hlKG1hcChwYXJlbnQsICgobGlzdCwga2V5KSA9PiB7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLm1hcChsaXN0LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGUucHJldihLZXkuc2VudGluZWwpLnRoZW4obmV4dCA9PiAoeyBuZXh0OiBQYXRoLnRvS2V5KFtrZXksIG5leHRdKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBwcmV2OiBQYXRoLnRvS2V5KFtrZXksIHBvc2l0aW9uLnByZXZdKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5uZXh0ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5uZXh0KEtleS5zZW50aW5lbCkudGhlbihwcmV2ID0+ICh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcHJldl0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ubmV4dF0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBwYXRjaC5hZGRlZCA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGU7XG4gICAgICAgIH0pKSk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLnByZXYgPT09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZSh7IHByZXY6IEtleS5zZW50aW5lbCB9KSA6IFRyZWUubmV4dChwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ucHJldl0pLnRoZW4oUGF0aC50b0tleSkudGhlbihwcmV2ID0+ICh7IHByZXYgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IEtleS5zZW50aW5lbCB9KSA6IFRyZWUucHJldihwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ubmV4dF0pLnRoZW4oUGF0aC50b0tleSkudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7IHJhbmdlOiByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmxhdHRlbihTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxpc3QgPT4gbGlzdC5zdGF0ZSkpIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhdGNoZXNfKTtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmxhdHRlbihwYXJlbnRfLnN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlc18pO1xuICAgIH1cbiAgICBMaXN0LmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5jYWNoZShwYXJlbnQuc3RhdGUpLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBTdGF0ZS5jYWNoZShwYXRjaC5hZGRlZClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0LmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXRlLCBwYXRjaGVzLCByZWR1Y2VyID0gUGF0Y2guYXBwbHkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHsgc3RhdGUsIHBhdGNoZXMgfTtcbiAgICAgICAgT2JzZXJ2YWJsZS5zY2FuKHBhdGNoZXMsIHJlZHVjZXIsIHN0YXRlKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiAoc3RhdGUpID0+IHsgbGlzdC5zdGF0ZSA9IHN0YXRlOyB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShMaXN0IHx8IChMaXN0ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3QuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgRGlzcG9zYWJsZTtcbihmdW5jdGlvbiAoRGlzcG9zYWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaXNwb3Nlcikge1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlIHx8IChEaXNwb3NhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgT2JzZXJ2YWJsZTtcbihmdW5jdGlvbiAoT2JzZXJ2YWJsZSkge1xuICAgIGZ1bmN0aW9uIG1hcChvYnNlcnZhYmxlLCBtYXBGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUobWFwRm4odmFsdWUpKS50aGVuKHN1YmplY3Qub25OZXh0KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIob2JzZXJ2YWJsZSwgZmlsdGVyRm4pIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gc3ViamVjdC5vbk5leHQodmFsdWUpIDogdW5kZWZpbmVkKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKG9ic2VydmFibGUsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW8sIHZhbHVlKSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgc3ViamVjdC5vbk5leHQodmFsdWUpOyB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnNjYW4gPSBzY2FuO1xufSkoT2JzZXJ2YWJsZSB8fCAoT2JzZXJ2YWJsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFN1YmplY3Q7XG4oZnVuY3Rpb24gKFN1YmplY3QpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyS2V5ID0gS2V5LmNyZWF0ZSgpO1xuICAgICAgICAgICAgb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSA9IG9ic2VydmVyO1xuICAgICAgICAgICAgcmV0dXJuIERpc3Bvc2FibGUuY3JlYXRlKCgpID0+IGRlbGV0ZSBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbk5leHQodmFsdWUpKSkudGhlbigoKSA9PiB7IH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUsIG9uTmV4dCB9O1xuICAgIH1cbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN1YmplY3QgfHwgKFN1YmplY3QgPSB7fSkpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuO1xuZXhwb3J0IHZhciBQYXRjaDtcbihmdW5jdGlvbiAoUGF0Y2gpIHtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLnNwbGljZShzdGF0ZSwgcGF0Y2gucmFuZ2UsIHBhdGNoLmFkZGVkKTtcbiAgICB9XG4gICAgUGF0Y2guYXBwbHkgPSBhcHBseTtcbn0pKFBhdGNoIHx8IChQYXRjaCA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQYXRjaDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0Y2guanMubWFwXG4iLCIvLyB0eXBlIEp1c3Q8Vj4gPSBbVl07XG4vLyB0eXBlIE5vdGhpbmc8Vj4gPSBBcnJheTxWPiAmIHsgMDogdm9pZCB9XG4vLyB0eXBlIE1heWJlPFY+ID0gSnVzdDxWPiB8IE5vdGhpbmc8Vj47XG5leHBvcnQgdmFyIFByb21pc2VVdGlscztcbihmdW5jdGlvbiAoUHJvbWlzZVV0aWxzKSB7XG4gICAgZnVuY3Rpb24gbGF6eShleGVjdXRvcikge1xuICAgICAgICB2YXIgcHJvbWlzZTtcbiAgICAgICAgZnVuY3Rpb24gdGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xuICAgICAgICAgICAgaWYgKHByb21pc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgICAgICByZXR1cm4gKHByb21pc2UgPSBuZXcgUHJvbWlzZShleGVjdXRvcikpLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyB0aGVuIH0pO1xuICAgIH1cbiAgICBQcm9taXNlVXRpbHMubGF6eSA9IGxhenk7XG59KShQcm9taXNlVXRpbHMgfHwgKFByb21pc2VVdGlscyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQcm9taXNlVXRpbHM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2VfdXRpbHMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgUmFuZ2UuYWxsID0gW3sgbmV4dDogS2V5LnNlbnRpbmVsIH0sIHsgcHJldjogS2V5LnNlbnRpbmVsIH1dO1xufSkoUmFuZ2UgfHwgKFJhbmdlID0ge30pKTtcbmV4cG9ydCB2YXIgUG9zaXRpb247XG4oZnVuY3Rpb24gKFBvc2l0aW9uKSB7XG4gICAgZnVuY3Rpb24gaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICdwcmV2JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24gPSBpc1ByZXZQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiBpc05leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ25leHQnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbiA9IGlzTmV4dFBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSA/IHsgbmV4dDogcG9zaXRpb24ucHJldiB9IDogeyBwcmV2OiBwb3NpdGlvbi5uZXh0IH07XG4gICAgfVxuICAgIFBvc2l0aW9uLnJldmVyc2UgPSByZXZlcnNlO1xufSkoUG9zaXRpb24gfHwgKFBvc2l0aW9uID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFJhbmdlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5nZS5qcy5tYXBcbiIsImltcG9ydCBfU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgX0FzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0IGFzIF9MaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCBfVHJlZSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IF9DYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IFN1YmplY3QgYXMgX1N1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IF9Qcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbmltcG9ydCBfTGVucyBmcm9tICcuL2xlbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9MaXN0LmNyZWF0ZShfU3RhdGUuZnJvbUFycmF5KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tT2JqZWN0KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbn1cbmV4cG9ydCB2YXIgU29uaWM7XG4oZnVuY3Rpb24gKFNvbmljKSB7XG4gICAgU29uaWMuU3RhdGUgPSBfU3RhdGU7XG4gICAgU29uaWMuQXN5bmNJdGVyYXRvciA9IF9Bc3luY0l0ZXJhdG9yO1xuICAgIFNvbmljLkxpc3QgPSBfTGlzdDtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuU3ViamVjdCA9IF9TdWJqZWN0O1xuICAgIFNvbmljLkNhY2hlID0gX0NhY2hlO1xuICAgIFNvbmljLlByb21pc2VVdGlscyA9IF9Qcm9taXNlVXRpbHM7XG4gICAgU29uaWMuTGVucyA9IF9MZW5zO1xufSkoU29uaWMgfHwgKFNvbmljID0ge30pKTtcbjtcbm1vZHVsZS5leHBvcnRzID0gU29uaWM7XG5leHBvcnQgZGVmYXVsdCBTb25pYztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29uaWMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCB7IFBvc2l0aW9uLCBSYW5nZSB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmV4cG9ydCB2YXIgU3RhdGU7XG4oZnVuY3Rpb24gKFN0YXRlKSB7XG4gICAgU3RhdGUuRW1wdHkgPSB7XG4gICAgICAgIGdldDogKGtleSkgPT4gS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgcHJldjogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ga2V5ID09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgbmV4dDogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ga2V5ID09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORFxuICAgIH07XG4gICAgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgICAgIGlmIChnZXQpXG4gICAgICAgICAgICBzdGF0ZS5nZXQgPSBnZXQ7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgc3RhdGUucHJldiA9IHByZXY7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgc3RhdGUubmV4dCA9IG5leHQ7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgU3RhdGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGZpcnN0KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihrZXkgPT4gc3RhdGUuZ2V0KGtleSkpO1xuICAgIH1cbiAgICBTdGF0ZS5maXJzdCA9IGZpcnN0O1xuICAgIGZ1bmN0aW9uIGxhc3Qoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnByZXYoKS50aGVuKGtleSA9PiBzdGF0ZS5nZXQoa2V5KSk7XG4gICAgfVxuICAgIFN0YXRlLmxhc3QgPSBsYXN0O1xuICAgIGZ1bmN0aW9uIGhhcyhzdGF0ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5nZXQoa2V5KS50aGVuKCgpID0+IHRydWUsIHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBmYWxzZSA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpO1xuICAgIH1cbiAgICBTdGF0ZS5oYXMgPSBoYXM7XG4gICAgZnVuY3Rpb24gaXMoc3RhdGUsIG90aGVyKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IHRvSXRlcmF0b3Ioc3RhdGUpLCBvdGhlckl0ZXJhdG9yID0gdG9JdGVyYXRvcihvdGhlcik7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVySXRlcmF0b3IubmV4dCgpLnRoZW4oayA9PiBrICE9PSBrZXkgPyBmYWxzZSA6IG90aGVySXRlcmF0b3IuZ2V0KCkudGhlbih2ID0+IHYgPT09IHZhbHVlKSk7XG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcyA/IG90aGVySXRlcmF0b3IubmV4dCgpLnRoZW4oayA9PiBrID09PSBLZXkuc2VudGluZWwpIDogZmFsc2UpO1xuICAgIH1cbiAgICBTdGF0ZS5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHN0YXRlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKHRvSXRlcmF0b3Ioc3RhdGUpLCAodiwgaykgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBTdGF0ZS5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGlzRW1wdHkoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCA9PT0gS2V5LnNlbnRpbmVsKTtcbiAgICB9XG4gICAgU3RhdGUuaXNFbXB0eSA9IGlzRW1wdHk7XG4gICAgZnVuY3Rpb24gc2xpY2UocGFyZW50LCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gZnJvbUl0ZXJhdG9yKHRvSXRlcmF0b3IocGFyZW50LCByYW5nZSkpO1xuICAgIH1cbiAgICBTdGF0ZS5zbGljZSA9IHNsaWNlO1xuICAgIGZ1bmN0aW9uIHNwbGljZShwYXJlbnQsIHJhbmdlLCBjaGlsZCkge1xuICAgICAgICB2YXIgZGVsZXRlZCA9IHNsaWNlKHBhcmVudCwgcmFuZ2UpLCBmaWx0ZXJlZCA9IGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBkZWxldGVkLmdldChrZXkpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpKTtcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgICAgIHZhciBicmlkZ2VkQ2hpbGQsIGJyaWRnZWRQYXJlbnQsIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgYnJpZGdlZENoaWxkID0gZXh0ZW5kKGNoaWxkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gY2hpbGQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmV2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBQcm9taXNlLnJlc29sdmUoZnJvbS5uZXh0KSA6IHBhcmVudC5wcmV2KGZyb20ucHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAhPT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5leHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgPyBQcm9taXNlLnJlc29sdmUodG8ucHJldikgOiBwYXJlbnQubmV4dCh0by5uZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBicmlkZ2VkUGFyZW50ID0gZXh0ZW5kKGZpbHRlcmVkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gcGFyZW50LnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgcHJldiA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBwcmV2KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogcHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIG5leHQgPT09IGZyb20ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogbmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkLmdldChrZXkpLmNhdGNoKHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBicmlkZ2VkUGFyZW50LmdldChrZXkpIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYga2V5ID09PSB0by5wcmV2KVxuICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkUGFyZW50Lm5leHQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5wcmV2KGtleSkgOiBicmlkZ2VkUGFyZW50LnByZXYoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBrZXkgPT09IGZyb20ubmV4dClcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLm5leHQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5uZXh0KGtleSkgOiBicmlkZ2VkUGFyZW50Lm5leHQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIFN0YXRlLnNwbGljZSA9IHNwbGljZTtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgcHJldjogcGFyZW50Lm5leHQsXG4gICAgICAgICAgICBuZXh0OiBwYXJlbnQucHJldlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUucmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDoga2V5ID0+IHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IG1hcEZuKHZhbHVlLCBrZXkpKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihwYXJlbnQsIGZpbHRlckZuKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhdmUoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlID8gY2FjaGVba2V5XSA6IGNhY2hlW2tleV0gPSBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBmaWx0ZXJGbih2YWx1ZSwga2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhdmUoa2V5KS50aGVuKHJlcyA9PiByZXMgPyBwYXJlbnQuZ2V0KGtleSkgOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5wcmV2KGtleSkudGhlbihwID0+IHAgPT09IG51bGwgPyBudWxsIDogaGF2ZShwKS50aGVuKHJlcyA9PiByZXMgPyBwIDogcHJldihwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Lm5leHQoa2V5KS50aGVuKG4gPT4gbiA9PT0gbnVsbCA/IG51bGwgOiBoYXZlKG4pLnRoZW4ocmVzID0+IHJlcyA/IG4gOiBuZXh0KG4pKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHsgZ2V0LCBwcmV2LCBuZXh0IH0pO1xuICAgIH1cbiAgICBTdGF0ZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICBjb25zdCBuZXh0ID0gKGspID0+IGsgPT0gbnVsbCA/IHBhcmVudC5nZXQoa2V5KS50aGVuKCgpID0+IGtleSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IG51bGwgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKSA6IChrZXkgPT09IGsgPyBQcm9taXNlLnJlc29sdmUobnVsbCkgOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDogayA9PiBrID09PSBrZXkgPyBwYXJlbnQuZ2V0KGtleSkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICAgICAgcHJldjogbmV4dCxcbiAgICAgICAgICAgIG5leHQ6IG5leHRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBUcmVlLmdldChwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKSxcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBUcmVlLnByZXYocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSkudGhlbihQYXRoLnRvS2V5KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBUcmVlLm5leHQocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSkudGhlbihQYXRoLnRvS2V5KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseShwYXJlbnQsIENhY2hlLmNyZWF0ZSgpKTtcbiAgICB9XG4gICAgU3RhdGUuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBrZXlCeShwYXJlbnQsIGtleUZuKSB7XG4gICAgICAgIHZhciBrZXlNYXAgPSBjYWNoZShTdGF0ZS5tYXAocGFyZW50LCBrZXlGbikpO1xuICAgICAgICB2YXIgcmV2ZXJzZUtleU1hcCA9IGNhY2hlKHtcbiAgICAgICAgICAgIGdldDoga2V5ID0+IEFzeW5jSXRlcmF0b3Iua2V5T2YoU3RhdGUudG9JdGVyYXRvcihrZXlNYXApLCBrZXkpLFxuICAgICAgICAgICAgcHJldjogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5ID09PSBLZXkuc2VudGluZWwgPyBLZXkuc2VudGluZWwgOiByZXZlcnNlS2V5TWFwLmdldChrZXkpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihrZXlNYXAucHJldikudGhlbihwcmV2ID0+IHByZXYgPT09IEtleS5zZW50aW5lbCA/IHByZXYgOiBrZXlNYXAuZ2V0KHByZXYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkgPT09IEtleS5zZW50aW5lbCA/IEtleS5zZW50aW5lbCA6IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGtleU1hcC5uZXh0KS50aGVuKG5leHQgPT4gbmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gbmV4dCA6IGtleU1hcC5nZXQobmV4dCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChyZXZlcnNlS2V5TWFwLCB7IGdldDoga2V5ID0+IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkudGhlbihwYXJlbnQuZ2V0KSB9KTtcbiAgICB9XG4gICAgU3RhdGUua2V5QnkgPSBrZXlCeTtcbiAgICBmdW5jdGlvbiBrZXlzKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gbWFwKHBhcmVudCwgKHZhbHVlLCBrZXkpID0+IGtleSk7XG4gICAgfVxuICAgIFN0YXRlLmtleXMgPSBrZXlzO1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogKGtleSkgPT4ga2V5IGluIHZhbHVlcyA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZXNba2V5XSkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICAgICAgcHJldjogKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGtleSA9PSBudWxsID8gdmFsdWVzLmxlbmd0aCAtIDEgOiBrZXkgLSAxO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5kZXggPT09IC0xID8gbnVsbCA6IGluZGV4KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0ga2V5ID09IG51bGwgPyAwIDoga2V5ICsgMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4ID09PSB2YWx1ZXMubGVuZ3RoID8gbnVsbCA6IGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmcm9tSXRlcmF0b3IoQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiBmcm9tSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gQ2FjaGUuY3JlYXRlKCksIGV4aGF1c3RlZCA9IGZhbHNlLCBjdXJyZW50S2V5ID0gbnVsbCwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHZhciBjYWNoaW5nSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLmV4dGVuZChpdGVyYXRvciwge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBjYWNoZS5nZXRbY3VycmVudEtleV0gPSBpdGVyYXRvci5nZXQoKSxcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IGNhY2hlLm5leHRbY3VycmVudEtleV0gPSBpdGVyYXRvci5uZXh0KCkudGhlbihrZXkgPT4ge1xuICAgICAgICAgICAgICAgIGNhY2hlLnByZXZba2V5XSA9IFByb21pc2UucmVzb2x2ZShjdXJyZW50S2V5KTtcbiAgICAgICAgICAgICAgICBleGhhdXN0ZWQgPSBrZXkgPT09IG51bGw7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRLZXkgPSBrZXk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBjdXJyZW50S2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGluZ0l0ZXJhdG9yLmdldCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCAodmFsdWUsIGspID0+IGsgPT09IGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUoY2FjaGluZ0l0ZXJhdG9yLCAodmFsdWUsIGspID0+IGsgPT09IGtleSkudGhlbigoKSA9PiBjYWNoZS5wcmV2W2tleV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBjdXJyZW50S2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kS2V5KGNhY2hpbmdJdGVyYXRvciwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkoeyBnZXQsIHByZXYsIG5leHQgfSwgY2FjaGUpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tSXRlcmF0b3IgPSBmcm9tSXRlcmF0b3I7XG4gICAgZnVuY3Rpb24gdG9JdGVyYXRvcihzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBLZXkuc2VudGluZWwsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IHN0YXRlLmdldChjdXJyZW50KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIHRvLnByZXYgPT09IG5leHQgPyBjdXJyZW50ID0gS2V5LnNlbnRpbmVsIDogY3VycmVudCA9IG5leHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgZnJvbS5uZXh0ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pID8gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnQgPSBmcm9tLnByZXYpIDogaXRlcmF0ZShmcm9tLm5leHQpO1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgdG8ubmV4dCA9PT0gY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjdXJyZW50ID0gS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShjdXJyZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS50b0l0ZXJhdG9yID0gdG9JdGVyYXRvcjtcbn0pKFN0YXRlIHx8IChTdGF0ZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5leHBvcnQgdmFyIFBhdGg7XG4oZnVuY3Rpb24gKFBhdGgpIHtcbiAgICBmdW5jdGlvbiBrZXkocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gbnVsbCA6IEpTT04uc3RyaW5naWZ5KHBhdGgpO1xuICAgIH1cbiAgICBQYXRoLmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiBmcm9tS2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID09IG51bGwgPyBudWxsIDogSlNPTi5wYXJzZShrZXkudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIFBhdGguZnJvbUtleSA9IGZyb21LZXk7XG4gICAgZnVuY3Rpb24gdG9LZXkocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gbnVsbCA6IEpTT04uc3RyaW5naWZ5KHBhdGgpO1xuICAgIH1cbiAgICBQYXRoLnRvS2V5ID0gdG9LZXk7XG4gICAgZnVuY3Rpb24gaGVhZChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aFswXSA6IG51bGw7XG4gICAgfVxuICAgIFBhdGguaGVhZCA9IGhlYWQ7XG4gICAgZnVuY3Rpb24gZ2V0KHBhdGgsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aFtpbmRleF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiB0YWlsKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IFtdIDogcGF0aC5zbGljZSgxLCBwYXRoLmxlbmd0aCk7XG4gICAgfVxuICAgIFBhdGgudGFpbCA9IHRhaWw7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChhKS5jb25jYXQoYik7XG4gICAgfVxuICAgIFBhdGguYXBwZW5kID0gYXBwZW5kO1xufSkoUGF0aCB8fCAoUGF0aCA9IHt9KSk7XG5leHBvcnQgdmFyIFRyZWU7XG4oZnVuY3Rpb24gKFRyZWUpIHtcbiAgICBmdW5jdGlvbiBnZXQodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguZ2V0KHBhdGgsIDApLCB0YWlsID0gUGF0aC5nZXQocGF0aCwgMSk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKS50aGVuKHN0YXRlID0+IHN0YXRlLmdldCh0YWlsKSk7XG4gICAgfVxuICAgIFRyZWUuZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHByZXYodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguZ2V0KHBhdGgsIDApLCB0YWlsID0gUGF0aC5nZXQocGF0aCwgMSksIHByZXZzID0gU3RhdGUuZmlsdGVyKFN0YXRlLm1hcCh0cmVlLCBzdGF0ZSA9PiBzdGF0ZS5wcmV2KCkpLCBmaXJzdCA9PiBmaXJzdCAhPSBudWxsKSwgcGF0aHMgPSBTdGF0ZS5tYXAocHJldnMsIChmaXJzdCwga2V5KSA9PiBba2V5LCBmaXJzdF0pO1xuICAgICAgICBpZiAoaGVhZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLnByZXYoKS50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcGF0aHMuZ2V0KHByZXYpIDogbnVsbCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKVxuICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gc3RhdGUucHJldih0YWlsKSlcbiAgICAgICAgICAgIC50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gW2hlYWQsIHByZXZdIDogcGF0aHMucHJldihoZWFkKS50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcGF0aHMuZ2V0KHByZXYpIDogbnVsbCkpO1xuICAgIH1cbiAgICBUcmVlLnByZXYgPSBwcmV2O1xuICAgIGZ1bmN0aW9uIG5leHQodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguZ2V0KHBhdGgsIDApLCB0YWlsID0gUGF0aC5nZXQocGF0aCwgMSksIG5leHRzID0gU3RhdGUuZmlsdGVyKFN0YXRlLm1hcCh0cmVlLCBzdGF0ZSA9PiBzdGF0ZS5uZXh0KCkpLCBmaXJzdCA9PiBmaXJzdCAhPSBudWxsKSwgcGF0aHMgPSBTdGF0ZS5tYXAobmV4dHMsIChmaXJzdCwga2V5KSA9PiBba2V5LCBmaXJzdF0pO1xuICAgICAgICBpZiAoaGVhZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gcGF0aHMuZ2V0KG5leHQpIDogbnVsbCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKVxuICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gc3RhdGUubmV4dCh0YWlsKSlcbiAgICAgICAgICAgIC50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gW2hlYWQsIG5leHRdIDogcGF0aHMubmV4dChoZWFkKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gcGF0aHMuZ2V0KG5leHQpIDogbnVsbCkpO1xuICAgIH1cbiAgICBUcmVlLm5leHQgPSBuZXh0O1xufSkoVHJlZSB8fCAoVHJlZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBUcmVlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVlLmpzLm1hcFxuIl19
