(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var AsyncIterator;
exports.AsyncIterator = AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.sentinel = { done: true };
    AsyncIterator.Empty = {
        next: function next() {
            return Promise.resolve(AsyncIterator.sentinel);
        }
    };
    function every(iterator, predicate) {
        function loop() {
            return iterator.next().then(function (result) {
                return result.done ? true : Promise.resolve(predicate(result.value)).then(function (satisfied) {
                    return satisfied ? loop() : false;
                });
            });
        }
        return loop();
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return every(iterator, function (value) {
            return Promise.resolve(predicate(value)).then(function (result) {
                return !result;
            });
        }).then(function (result) {
            return !result;
        });
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return every(iterator, function (value) {
            return Promise.resolve(fn(value)).then(function () {
                return true;
            });
        }).then(function () {});
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return forEach(iterator, function (value) {
            return Promise.resolve(fn(memo, value)).then(function (value) {
                memo = value;
            });
        }).then(function () {
            return memo;
        });
    }
    AsyncIterator.reduce = reduce;
    function find(iterator, predicate) {
        var result;
        return some(iterator, function (value) {
            return Promise.resolve(predicate(value)).then(function (satisfied) {
                return satisfied ? (result = value, true) : false;
            });
        }).then(function (satisfied) {
            return satisfied ? result : _key3['default'].NOT_FOUND;
        });
    }
    AsyncIterator.find = find;
    function indexOf(iterator, value) {
        var index = -1;
        return some(iterator, function (v) {
            return index++, value == v;
        }).then(function (found) {
            return found ? index : _key3['default'].NOT_FOUND;
        });
    }
    AsyncIterator.indexOf = indexOf;
    function at(iterator, index) {
        return find(iterator, function () {
            return 0 === index--;
        });
    }
    AsyncIterator.at = at;
    function contains(iterator, value) {
        return some(iterator, function (v) {
            return v === value;
        });
    }
    AsyncIterator.contains = contains;
    function is(iterator, other) {
        var equals = arguments.length <= 2 || arguments[2] === undefined ? function (a, b) {
            return a === b;
        } : arguments[2];

        return AsyncIterator.every(iterator, function (value) {
            return other.next().then(function (result) {
                return !result.done && equals(result.value, value);
            });
        }).then(function (res) {
            return res ? other.next().then(function (result) {
                return result.done;
            }) : false;
        });
    }
    AsyncIterator.is = is;
    function map(iterator, mapFn) {
        return {
            next: function next() {
                return iterator.next().then(function (result) {
                    return result.done ? Promise.resolve(AsyncIterator.sentinel) : Promise.resolve(mapFn(result.value)).then(function (value) {
                        return { done: false, value: value };
                    });
                });
            }
        };
    }
    AsyncIterator.map = map;
    function filter(iterator, filterFn) {
        function next() {
            return iterator.next().then(function (result) {
                return result.done ? result : Promise.resolve(filterFn(result.value)).then(function (satisfied) {
                    return satisfied ? result : next();
                });
            });
        }
        return { next: next };
    }
    AsyncIterator.filter = filter;
    function scan(iterator, scanFn, memo) {
        return {
            next: function next() {
                return iterator.next().then(function (result) {
                    return result.done ? Promise.resolve(AsyncIterator.sentinel) : Promise.resolve(scanFn(memo, result.value)).then(function (value) {
                        return { done: false, value: memo = value };
                    });
                });
            }
        };
    }
    AsyncIterator.scan = scan;
    function concat() {
        for (var _len = arguments.length, iterators = Array(_len), _key = 0; _key < _len; _key++) {
            iterators[_key] = arguments[_key];
        }

        return iterators.reduce(function (memo, value) {
            var iterated = false,
                queue = Promise.resolve(null);
            return {
                next: function next() {
                    return queue = queue.then(function () {}, function () {}).then(function () {
                        return iterated ? value.next() : memo.next().then(function (result) {
                            return result.done ? (iterated = true, value.next()) : result;
                        });
                    });
                }
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromArray(array) {
        var current = -1,
            queue = Promise.resolve(null);
        return {
            next: function next() {
                return queue = queue.then(function () {}, function () {}).then(function () {
                    return Promise.resolve(++current >= array.length ? AsyncIterator.sentinel : { done: false, value: array[current] });
                });
            }
        };
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromArray(Object.keys(object).map(function (key) {
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
        return reduce(iterator, function (memo, _ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var value = _ref2[1];
            return memo[key] = value, memo;
        }, Object.create(null));
    }
    AsyncIterator.toObject = toObject;
})(AsyncIterator || (exports.AsyncIterator = AsyncIterator = {}));
exports['default'] = AsyncIterator;



},{"./key":4}],2:[function(require,module,exports){
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



},{"./key":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Entry;
exports.Entry = Entry;
(function (Entry) {
    function key(entry) {
        return entry && entry[0];
    }
    Entry.key = key;
    function value(entry) {
        return entry[1];
    }
    Entry.value = value;
    function is(entry, other) {
        return entry[0] === other[0] && entry[1] === other[1];
    }
    Entry.is = is;
})(Entry || (exports.Entry = Entry = {}));
exports["default"] = Entry;



},{}],4:[function(require,module,exports){
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

},{"./promise_utils":9}],5:[function(require,module,exports){
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



},{"./list":6,"./observable":7,"./state":12}],6:[function(require,module,exports){
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
            return Promise.all([_async_iterator2['default'].find(_state2['default'].entries(_state2['default'].reverse(state), [_range.Position.reverse(patch.range[0]), { prev: null }]), function (entry) {
                return filterFn(entry[1], entry[0]);
            }).then(function (next) {
                return { next: next[0] };
            }), _async_iterator2['default'].find(_state2['default'].entries(state, [patch.range[1], { prev: null }]), function (entry) {
                return filterFn(entry[1], entry[0]);
            }).then(function (prev) {
                return { prev: prev[0] };
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
            return _async_iterator2['default'].some(_state2['default'].entries(parentState, patch.range), function (entry) {
                return entry[0] === key;
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



},{"./async_iterator":1,"./key":4,"./observable":7,"./patch":8,"./range":10,"./state":12,"./tree":13}],7:[function(require,module,exports){
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



},{"./key":4}],8:[function(require,module,exports){
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



},{"./state":12}],9:[function(require,module,exports){
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



},{}],10:[function(require,module,exports){
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



},{"./key":4}],11:[function(require,module,exports){
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



},{"./async_iterator":1,"./cache":2,"./lens":5,"./list":6,"./observable":7,"./promise_utils":9,"./state":12,"./tree":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _entry = require('./entry');

var _entry2 = _interopRequireDefault(_entry);

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
        var iterator = entries(state),
            otherIterator = entries(other);
        return _async_iterator2['default'].is(iterator, otherIterator, _entry2['default'].is);
    }
    State.is = is;
    function contains(state, value) {
        return _async_iterator2['default'].some(entries(state), function (entry) {
            return entry[1] === value;
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

        return fromEntries(entries(parent, range));
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
            return has(child, key).then(function (res) {
                return res ? bridgedChild.get(key) : bridgedParent.get(key);
            });
        }
        function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            if (_range.Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(_key2['default'].sentinel);
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
    function scan(parent, scanFn, memo) {
        return fromEntries(_async_iterator2['default'].scan(entries(parent), function (m, entry) {
            return Promise.resolve(scanFn(m[1], entry[1], entry[0])).then(function (result) {
                return [entry[0], result];
            });
        }, [_key2['default'].sentinel, memo]));
    }
    State.scan = scan;
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
    function keyBy(parent, keyFn) {
        return fromEntries(_async_iterator2['default'].map(entries(parent), function (entry) {
            return Promise.resolve(keyFn(entry[1], entry[0])).then(function (key) {
                return [key, entry[1]];
            });
        }));
    }
    State.keyBy = keyBy;
    function cache(parent) {
        return _cache2['default'].apply(parent, _cache2['default'].create());
    }
    State.cache = cache;
    function entries(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var current = _key2['default'].sentinel,
            done = false,
            from = range[0],
            to = range[1];
        return {
            next: function next() {
                function get(key) {
                    if (key === _key2['default'].sentinel) return done = true, Promise.resolve(_async_iterator2['default'].sentinel);
                    return state.get(key).then(function (value) {
                        return current = key, { done: false, value: [key, value] };
                    });
                }
                function iterate(key) {
                    return state.next(key).then(function (next) {
                        if (_range.Position.isPrevPosition(to) && to.prev === next) return get(_key2['default'].sentinel);
                        return get(next);
                    });
                }
                if (_range.Position.isPrevPosition(from) && _range.Position.isPrevPosition(to) && from.prev === to.prev) return get(_key2['default'].sentinel);
                if (_range.Position.isNextPosition(from) && _range.Position.isNextPosition(to) && from.next === to.next) return get(_key2['default'].sentinel);
                if (current === _key2['default'].sentinel) return _range.Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
                if (_range.Position.isNextPosition(to) && to.next === current) return get(_key2['default'].sentinel);
                return iterate(current);
            }
        };
    }
    State.entries = entries;
    function keys(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return _async_iterator2['default'].map(entries(state), _entry2['default'].key);
    }
    State.keys = keys;
    function values(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return _async_iterator2['default'].map(entries(state), _entry2['default'].value);
    }
    State.values = values;
    function fromEntries(iterator) {
        var cache = _cache2['default'].create(),
            exhausted = false,
            currentKey = null,
            queue = Promise.resolve(null);
        var cachingIterator = {
            next: function next() {
                return iterator.next().then(function (_ref2) {
                    var done = _ref2.done;
                    var entry = _ref2.value;

                    if (done) {
                        exhausted = true;
                        cache.prev[_key2['default'].sentinel] = Promise.resolve(currentKey);
                        cache.next[currentKey] = Promise.resolve(_key2['default'].sentinel);
                        return _async_iterator2['default'].sentinel;
                    }
                    cache.prev[entry[0]] = Promise.resolve(currentKey);
                    cache.next[currentKey] = Promise.resolve(entry[0]);
                    cache.get[entry[0]] = Promise.resolve(entry[1]);
                    currentKey = entry[0];
                    return { done: done, value: entry };
                });
            }
        };
        function get(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return _async_iterator2['default'].find(cachingIterator, function (entry) {
                return entry[0] === key;
            }).then(_entry2['default'].value);
        }
        function prev(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return _async_iterator2['default'].some(cachingIterator, function (entry) {
                return entry[0] === key;
            }).then(function () {
                return key in cache.prev ? cache.prev[key] : _key2['default'].NOT_FOUND;
            });
        }
        function next(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            if (key === currentKey) return cachingIterator.next().then(function (result) {
                return result.done ? _key2['default'].sentinel : result.value[0];
            });
            return _async_iterator2['default'].find(cachingIterator, function (entry) {
                return entry[0] === key;
            }).then(function () {
                return cachingIterator.next();
            }).then(function (result) {
                return result.done ? _key2['default'].sentinel : result.value[0];
            });
        }
        return _cache2['default'].apply({ get: get, prev: prev, next: next }, cache);
    }
    State.fromEntries = fromEntries;
    function fromKeys(iterator) {
        return fromEntries(_async_iterator2['default'].map(iterator, function (key) {
            return [key, null];
        }));
    }
    State.fromKeys = fromKeys;
    function fromValues(iterator) {
        return fromEntries(_async_iterator2['default'].scan(iterator, function (prev, value) {
            return [prev[0] + 1, value];
        }, [-1, null]));
    }
    State.fromValues = fromValues;
    function fromArray(values) {
        return fromEntries(_async_iterator2['default'].fromArray(values.map(function (value, key) {
            return [key, value];
        })));
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromEntries(_async_iterator2['default'].fromObject(values));
    }
    State.fromObject = fromObject;
})(State || (exports.State = State = {}));
exports['default'] = State;



},{"./async_iterator":1,"./cache":2,"./entry":3,"./key":4,"./range":10,"./tree":13}],13:[function(require,module,exports){
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
        return key == null ? null : key.toString().split('/');
    }
    Path.fromKey = fromKey;
    function toKey(path) {
        return path == null ? null : path.join('/');
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



},{"./state":12}]},{},[11])(11)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvZW50cnkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9rZXkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9sZW5zLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGlzdC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L29ic2VydmFibGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wYXRjaC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3Byb21pc2VfdXRpbHMuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9yYW5nZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3NvbmljLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qvc3RhdGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC90cmVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztvQkNBZ0IsT0FBTzs7OztBQUNoQixJQUFJLGFBQWEsQ0FBQzs7QUFDekIsQ0FBQyxVQUFVLGFBQWEsRUFBRTtBQUN0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LFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLENBQUEsQ0FBRSxJQUFJLGFBekJJLElBQUksR0F5QkgsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ1QsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQXN5bmNJdGVyYXRvcjtcbihmdW5jdGlvbiAoQXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jSXRlcmF0b3Iuc2VudGluZWwgPSB7IGRvbmU6IHRydWUgfTtcbiAgICBBc3luY0l0ZXJhdG9yLkVtcHR5ID0ge1xuICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5zZW50aW5lbClcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV2ZXJ5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyB0cnVlIDogUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZShyZXN1bHQudmFsdWUpKS50aGVuKHNhdGlzZmllZCA9PiBzYXRpc2ZpZWQgPyBsb29wKCkgOiBmYWxzZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb29wKCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZXZlcnkgPSBldmVyeTtcbiAgICBmdW5jdGlvbiBzb21lKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIGV2ZXJ5KGl0ZXJhdG9yLCB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gIXJlc3VsdCkpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNvbWUgPSBzb21lO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goaXRlcmF0b3IsIGZuKSB7XG4gICAgICAgIHJldHVybiBldmVyeShpdGVyYXRvciwgKHZhbHVlKSA9PiBQcm9taXNlLnJlc29sdmUoZm4odmFsdWUpKS50aGVuKCgpID0+IHRydWUpKS50aGVuKCgpID0+IHsgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gcmVkdWNlKGl0ZXJhdG9yLCBmbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gZm9yRWFjaChpdGVyYXRvciwgKHZhbHVlKSA9PiBQcm9taXNlLnJlc29sdmUoZm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyB9KSkudGhlbigoKSA9PiBtZW1vKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5yZWR1Y2UgPSByZWR1Y2U7XG4gICAgZnVuY3Rpb24gZmluZChpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHZhbHVlKSkudGhlbihzYXRpc2ZpZWQgPT4gc2F0aXNmaWVkID8gKHJlc3VsdCA9IHZhbHVlLCB0cnVlKSA6IGZhbHNlKSkudGhlbihzYXRpc2ZpZWQgPT4gc2F0aXNmaWVkID8gcmVzdWx0IDogS2V5Lk5PVF9GT1VORCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZCA9IGZpbmQ7XG4gICAgZnVuY3Rpb24gaW5kZXhPZihpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IChpbmRleCsrLCB2YWx1ZSA9PSB2KSkudGhlbihmb3VuZCA9PiBmb3VuZCA/IGluZGV4IDogS2V5Lk5PVF9GT1VORCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaW5kZXhPZiA9IGluZGV4T2Y7XG4gICAgZnVuY3Rpb24gYXQoaXRlcmF0b3IsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBmaW5kKGl0ZXJhdG9yLCAoKSA9PiAwID09PSBpbmRleC0tKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5hdCA9IGF0O1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBpcyhpdGVyYXRvciwgb3RoZXIsIGVxdWFscyA9IChhLCBiKSA9PiBhID09PSBiKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmV2ZXJ5KGl0ZXJhdG9yLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXIubmV4dCgpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQuZG9uZSAmJiBlcXVhbHMocmVzdWx0LnZhbHVlLCB2YWx1ZSkpO1xuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMgPyBvdGhlci5uZXh0KCkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUpIDogZmFsc2UpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gbWFwKGl0ZXJhdG9yLCBtYXBGbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4gaXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5zZW50aW5lbCkgOiBQcm9taXNlLnJlc29sdmUobWFwRm4ocmVzdWx0LnZhbHVlKSkudGhlbih2YWx1ZSA9PiAoeyBkb25lOiBmYWxzZSwgdmFsdWUgfSkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKGl0ZXJhdG9yLCBmaWx0ZXJGbikge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IHJlc3VsdCA6IFByb21pc2UucmVzb2x2ZShmaWx0ZXJGbihyZXN1bHQudmFsdWUpKS50aGVuKHNhdGlzZmllZCA9PiBzYXRpc2ZpZWQgPyByZXN1bHQgOiBuZXh0KCkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBuZXh0IH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4oaXRlcmF0b3IsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4gaXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5zZW50aW5lbCkgOiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW8sIHJlc3VsdC52YWx1ZSkpLnRoZW4odmFsdWUgPT4gKHsgZG9uZTogZmFsc2UsIHZhbHVlOiBtZW1vID0gdmFsdWUgfSkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zY2FuID0gc2NhbjtcbiAgICBmdW5jdGlvbiBjb25jYXQoLi4uaXRlcmF0b3JzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcnMucmVkdWNlKChtZW1vLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdGVkID0gZmFsc2UsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4geyB9LCAoKSA9PiB7IH0pLnRoZW4oKCkgPT4gaXRlcmF0ZWQgPyB2YWx1ZS5uZXh0KCkgOiBtZW1vLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IChpdGVyYXRlZCA9IHRydWUsIHZhbHVlLm5leHQoKSkgOiByZXN1bHQpKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgQXN5bmNJdGVyYXRvci5FbXB0eSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29uY2F0ID0gY29uY2F0O1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuICAgICAgICB2YXIgY3VycmVudCA9IC0xLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiB7IH0sICgpID0+IHsgfSkudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoKytjdXJyZW50ID49IGFycmF5Lmxlbmd0aCA/IEFzeW5jSXRlcmF0b3Iuc2VudGluZWwgOiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogYXJyYXlbY3VycmVudF0gfSkpXG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmcm9tQXJyYXkoT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoa2V5ID0+IFtrZXksIG9iamVjdFtrZXldXSkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlKSA9PiAobWVtby5wdXNoKHZhbHVlKSwgbWVtbyksIFtdKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgW2tleSwgdmFsdWVdKSA9PiAobWVtb1trZXldID0gdmFsdWUsIG1lbW8pLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b09iamVjdCA9IHRvT2JqZWN0O1xufSkoQXN5bmNJdGVyYXRvciB8fCAoQXN5bmNJdGVyYXRvciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBBc3luY0l0ZXJhdG9yO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luY19pdGVyYXRvci5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBDYWNoZTtcbihmdW5jdGlvbiAoQ2FjaGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gZXh0ZW5kKGNhY2hlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUoY2FjaGUuZ2V0KSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUoY2FjaGUucHJldiksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKGNhY2hlLm5leHQpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgY2FjaGUpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5nZXQgPyBjYWNoZS5nZXRba2V5XSA6IGNhY2hlLmdldFtrZXldID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUucHJldiA/IGNhY2hlLnByZXZba2V5XSA6IGNhY2hlLnByZXZba2V5XSA9IHN0YXRlLnByZXYoa2V5KS50aGVuKHByZXYgPT4geyBjYWNoZS5uZXh0W3ByZXZdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBwcmV2OyB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5uZXh0ID8gY2FjaGUubmV4dFtrZXldIDogY2FjaGUubmV4dFtrZXldID0gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7IGNhY2hlLnByZXZbbmV4dF0gPSBQcm9taXNlLnJlc29sdmUoa2V5KTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBDYWNoZS5hcHBseSA9IGFwcGx5O1xufSkoQ2FjaGUgfHwgKENhY2hlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYWNoZS5qcy5tYXBcbiIsImV4cG9ydCB2YXIgRW50cnk7XG4oZnVuY3Rpb24gKEVudHJ5KSB7XG4gICAgZnVuY3Rpb24ga2V5KGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgICB9XG4gICAgRW50cnkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIHZhbHVlKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeVsxXTtcbiAgICB9XG4gICAgRW50cnkudmFsdWUgPSB2YWx1ZTtcbiAgICBmdW5jdGlvbiBpcyhlbnRyeSwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5WzBdID09PSBvdGhlclswXSAmJiBlbnRyeVsxXSA9PT0gb3RoZXJbMV07XG4gICAgfVxuICAgIEVudHJ5LmlzID0gaXM7XG59KShFbnRyeSB8fCAoRW50cnkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgRW50cnk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVudHJ5LmpzLm1hcFxuIiwiaW1wb3J0IFByb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xudmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgS2V5Lk5PVF9GT1VORF9FUlJPUiA9IG5ldyBFcnJvcihcIk5vIGVudHJ5IGF0IHRoZSBzcGVjaWZpZWQga2V5XCIpO1xuICAgIEtleS5OT1RfRk9VTkQgPSBQcm9taXNlVXRpbHMubGF6eSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZWplY3QoS2V5Lk5PVF9GT1VORF9FUlJPUikpO1xuICAgIEtleS5zZW50aW5lbCA9IG51bGw7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgZnVuY3Rpb24ga2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEtleS5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS5jcmVhdGUgPSBjcmVhdGU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtleS5qcy5tYXBcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5leHBvcnQgdmFyIExlbnM7XG4oZnVuY3Rpb24gKExlbnMpIHtcbiAgICBmdW5jdGlvbiBjb21wb3NlKHBhcmVudCwgbGVucykge1xuICAgICAgICB2YXIgZ2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCksIHNldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5nZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKGdldFN1YmplY3QpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChzZXRTdWJqZWN0LCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLnNldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUocGFyZW50LnBhdGNoZXMpO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XG4gICAgfVxuICAgIExlbnMuY29tcG9zZSA9IGNvbXBvc2U7XG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExlbnM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxlbnMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBQYXRjaCBmcm9tICcuL3BhdGNoJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFJhbmdlLCBQb3NpdGlvbiB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuZXhwb3J0IHZhciBMaXN0O1xuKGZ1bmN0aW9uIChMaXN0KSB7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbWFwRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIG1hcEZuKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBBc3luY0l0ZXJhdG9yLmZpbmQoU3RhdGUuZW50cmllcyhTdGF0ZS5yZXZlcnNlKHN0YXRlKSwgW1Bvc2l0aW9uLnJldmVyc2UocGF0Y2gucmFuZ2VbMF0pLCB7IHByZXY6IG51bGwgfV0pLCBlbnRyeSA9PiBmaWx0ZXJGbihlbnRyeVsxXSwgZW50cnlbMF0pKS50aGVuKG5leHQgPT4gKHsgbmV4dDogbmV4dFswXSB9KSksXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kKFN0YXRlLmVudHJpZXMoc3RhdGUsIFtwYXRjaC5yYW5nZVsxXSwgeyBwcmV2OiBudWxsIH1dKSwgZW50cnkgPT4gZmlsdGVyRm4oZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihwcmV2ID0+ICh7IHByZXY6IHByZXZbMF0gfSkpXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmlsdGVyKHBhdGNoLmFkZGVkLCBmaWx0ZXJGbikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIChvbGRTdGF0ZSwgcGF0Y2hlcykgPT4gc3RhdGUgPSBQYXRjaC5hcHBseShvbGRTdGF0ZSwgcGF0Y2hlcykpO1xuICAgIH1cbiAgICBMaXN0LmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgc3RhdGUgPSBTdGF0ZS56b29tKHBhcmVudC5zdGF0ZSwga2V5KSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKE9ic2VydmFibGUuZmlsdGVyKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKFN0YXRlLmVudHJpZXMocGFyZW50U3RhdGUsIHBhdGNoLnJhbmdlKSwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcGF0Y2guYWRkZWQgPyBTdGF0ZS5oYXMocGF0Y2guYWRkZWQsIGtleSkgOiByZXMpO1xuICAgICAgICB9KSwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBSYW5nZS5hbGwsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuem9vbShwYXRjaC5hZGRlZCwga2V5KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBwYXRjaGVzXyA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIHZhciBwYXJlbnRfID0gY2FjaGUobWFwKHBhcmVudCwgKChsaXN0LCBrZXkpID0+IHtcbiAgICAgICAgICAgIE9ic2VydmFibGUubWFwKGxpc3QucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5wcmV2KEtleS5zZW50aW5lbCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgbmV4dF0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ucHJldl0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlLm5leHQoS2V5LnNlbnRpbmVsKS50aGVuKHByZXYgPT4gKHsgcHJldjogUGF0aC50b0tleShba2V5LCBwcmV2XSkgfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5uZXh0XSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHBhdGNoLmFkZGVkIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShwYXRjaGVzXyk7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5uZXh0KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5wcmV2XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGlzdCA9PiBsaXN0LnN0YXRlKSkgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mbGF0dGVuKHBhcmVudF8uc3RhdGUpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzXyk7XG4gICAgfVxuICAgIExpc3QuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLmNhY2hlKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3QuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIHJlZHVjZXIgPSBQYXRjaC5hcHBseSkge1xuICAgICAgICBjb25zdCBsaXN0ID0geyBzdGF0ZSwgcGF0Y2hlcyB9O1xuICAgICAgICBPYnNlcnZhYmxlLnNjYW4ocGF0Y2hlcywgcmVkdWNlciwgc3RhdGUpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IChzdGF0ZSkgPT4geyBsaXN0LnN0YXRlID0gc3RhdGU7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cbiAgICBMaXN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKExpc3QgfHwgKExpc3QgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlzdC5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGRpc3Bvc2VyKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBEaXNwb3NhYmxlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKERpc3Bvc2FibGUgfHwgKERpc3Bvc2FibGUgPSB7fSkpO1xuZXhwb3J0IHZhciBPYnNlcnZhYmxlO1xuKGZ1bmN0aW9uIChPYnNlcnZhYmxlKSB7XG4gICAgZnVuY3Rpb24gbWFwKG9ic2VydmFibGUsIG1hcEZuKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShtYXBGbih2YWx1ZSkpLnRoZW4oc3ViamVjdC5vbk5leHQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihvYnNlcnZhYmxlLCBmaWx0ZXJGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoZmlsdGVyRm4odmFsdWUpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSkgOiB1bmRlZmluZWQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ob2JzZXJ2YWJsZSwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuc2NhbiA9IHNjYW47XG59KShPYnNlcnZhYmxlIHx8IChPYnNlcnZhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkuY3JlYXRlKCk7XG4gICAgICAgICAgICBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gZGVsZXRlIG9ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uTmV4dCh2YWx1ZSkpKS50aGVuKCgpID0+IHsgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSwgb25OZXh0IH07XG4gICAgfVxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xufSkoU3ViamVjdCB8fCAoU3ViamVjdCA9IHt9KSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xufSkoUGF0Y2ggfHwgKFBhdGNoID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFBhdGNoO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXRjaC5qcy5tYXBcbiIsIi8vIHR5cGUgSnVzdDxWPiA9IFtWXTtcbi8vIHR5cGUgTm90aGluZzxWPiA9IEFycmF5PFY+ICYgeyAwOiB2b2lkIH1cbi8vIHR5cGUgTWF5YmU8Vj4gPSBKdXN0PFY+IHwgTm90aGluZzxWPjtcbmV4cG9ydCB2YXIgUHJvbWlzZVV0aWxzO1xuKGZ1bmN0aW9uIChQcm9taXNlVXRpbHMpIHtcbiAgICBmdW5jdGlvbiBsYXp5KGV4ZWN1dG9yKSB7XG4gICAgICAgIHZhciBwcm9taXNlO1xuICAgICAgICBmdW5jdGlvbiB0aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgICAgIHJldHVybiAocHJvbWlzZSA9IG5ldyBQcm9taXNlKGV4ZWN1dG9yKSkudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHRoZW4gfSk7XG4gICAgfVxuICAgIFByb21pc2VVdGlscy5sYXp5ID0gbGF6eTtcbn0pKFByb21pc2VVdGlscyB8fCAoUHJvbWlzZVV0aWxzID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFByb21pc2VVdGlscztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvbWlzZV91dGlscy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBSYW5nZTtcbihmdW5jdGlvbiAoUmFuZ2UpIHtcbiAgICBSYW5nZS5hbGwgPSBbeyBuZXh0OiBLZXkuc2VudGluZWwgfSwgeyBwcmV2OiBLZXkuc2VudGluZWwgfV07XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuZXhwb3J0IHZhciBQb3NpdGlvbjtcbihmdW5jdGlvbiAoUG9zaXRpb24pIHtcbiAgICBmdW5jdGlvbiBpc1ByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ3ByZXYnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbiA9IGlzUHJldlBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIGlzTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAnbmV4dCcgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uID0gaXNOZXh0UG9zaXRpb247XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pID8geyBuZXh0OiBwb3NpdGlvbi5wcmV2IH0gOiB7IHByZXY6IHBvc2l0aW9uLm5leHQgfTtcbiAgICB9XG4gICAgUG9zaXRpb24ucmV2ZXJzZSA9IHJldmVyc2U7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcFxuIiwiaW1wb3J0IF9TdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCBfQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IExpc3QgYXMgX0xpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IF9UcmVlIGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgX0NhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgU3ViamVjdCBhcyBfU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgX1Byb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xuaW1wb3J0IF9MZW5zIGZyb20gJy4vbGVucyc7XG5leHBvcnQgZnVuY3Rpb24gU29uaWMob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tQXJyYXkob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIHJldHVybiBfTGlzdC5jcmVhdGUoX1N0YXRlLmZyb21PYmplY3Qob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xufVxuZXhwb3J0IHZhciBTb25pYztcbihmdW5jdGlvbiAoU29uaWMpIHtcbiAgICBTb25pYy5TdGF0ZSA9IF9TdGF0ZTtcbiAgICBTb25pYy5Bc3luY0l0ZXJhdG9yID0gX0FzeW5jSXRlcmF0b3I7XG4gICAgU29uaWMuTGlzdCA9IF9MaXN0O1xuICAgIFNvbmljLlRyZWUgPSBfVHJlZTtcbiAgICBTb25pYy5TdWJqZWN0ID0gX1N1YmplY3Q7XG4gICAgU29uaWMuQ2FjaGUgPSBfQ2FjaGU7XG4gICAgU29uaWMuUHJvbWlzZVV0aWxzID0gX1Byb21pc2VVdGlscztcbiAgICBTb25pYy5MZW5zID0gX0xlbnM7XG59KShTb25pYyB8fCAoU29uaWMgPSB7fSkpO1xuO1xubW9kdWxlLmV4cG9ydHMgPSBTb25pYztcbmV4cG9ydCBkZWZhdWx0IFNvbmljO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb25pYy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IEVudHJ5IGZyb20gJy4vZW50cnknO1xuaW1wb3J0IHsgUG9zaXRpb24sIFJhbmdlIH0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZS5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoa2V5KSA9PiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBwcmV2OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBuZXh0OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5EXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgICAgaWYgKGdldClcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcbiAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICBzdGF0ZS5wcmV2ID0gcHJldjtcbiAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICBzdGF0ZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBTdGF0ZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZmlyc3Qoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKGtleSA9PiBzdGF0ZS5nZXQoa2V5KSk7XG4gICAgfVxuICAgIFN0YXRlLmZpcnN0ID0gZmlyc3Q7XG4gICAgZnVuY3Rpb24gbGFzdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUucHJldigpLnRoZW4oa2V5ID0+IHN0YXRlLmdldChrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUubGFzdCA9IGxhc3Q7XG4gICAgZnVuY3Rpb24gaGFzKHN0YXRlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4oKCkgPT4gdHJ1ZSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IGZhbHNlIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSk7XG4gICAgfVxuICAgIFN0YXRlLmhhcyA9IGhhcztcbiAgICBmdW5jdGlvbiBpcyhzdGF0ZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gZW50cmllcyhzdGF0ZSksIG90aGVySXRlcmF0b3IgPSBlbnRyaWVzKG90aGVyKTtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuaXMoaXRlcmF0b3IsIG90aGVySXRlcmF0b3IsIEVudHJ5LmlzKTtcbiAgICB9XG4gICAgU3RhdGUuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBjb250YWlucyhzdGF0ZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShlbnRyaWVzKHN0YXRlKSwgZW50cnkgPT4gZW50cnlbMV0gPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBpc0VtcHR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCk7XG4gICAgfVxuICAgIFN0YXRlLmlzRW1wdHkgPSBpc0VtcHR5O1xuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGVudHJpZXMocGFyZW50LCByYW5nZSkpO1xuICAgIH1cbiAgICBTdGF0ZS5zbGljZSA9IHNsaWNlO1xuICAgIGZ1bmN0aW9uIHNwbGljZShwYXJlbnQsIHJhbmdlLCBjaGlsZCkge1xuICAgICAgICB2YXIgZGVsZXRlZCA9IHNsaWNlKHBhcmVudCwgcmFuZ2UpLCBmaWx0ZXJlZCA9IGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBkZWxldGVkLmdldChrZXkpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpKTtcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgICAgIHZhciBicmlkZ2VkQ2hpbGQsIGJyaWRnZWRQYXJlbnQsIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgYnJpZGdlZENoaWxkID0gZXh0ZW5kKGNoaWxkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gY2hpbGQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmV2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBQcm9taXNlLnJlc29sdmUoZnJvbS5uZXh0KSA6IHBhcmVudC5wcmV2KGZyb20ucHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAhPT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5leHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgPyBQcm9taXNlLnJlc29sdmUodG8ucHJldikgOiBwYXJlbnQubmV4dCh0by5uZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBicmlkZ2VkUGFyZW50ID0gZXh0ZW5kKGZpbHRlcmVkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gcGFyZW50LnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgcHJldiA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBwcmV2KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogcHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIG5leHQgPT09IGZyb20ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogbmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhjaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQuZ2V0KGtleSkgOiBicmlkZ2VkUGFyZW50LmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBrZXkgPT09IHRvLnByZXYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQubmV4dChrZXkpIDogYnJpZGdlZFBhcmVudC5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5zcGxpY2UgPSBzcGxpY2U7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIHByZXY6IHBhcmVudC5uZXh0LFxuICAgICAgICAgICAgbmV4dDogcGFyZW50LnByZXZcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnJldmVyc2UgPSByZXZlcnNlO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBtYXBGbih2YWx1ZSwga2V5KSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBoYXZlKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZSA/IGNhY2hlW2tleV0gOiBjYWNoZVtrZXldID0gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gZmlsdGVyRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXZlKGtleSkudGhlbihyZXMgPT4gcmVzID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQucHJldihrZXkpLnRoZW4ocCA9PiBwID09PSBudWxsID8gbnVsbCA6IGhhdmUocCkudGhlbihyZXMgPT4gcmVzID8gcCA6IHByZXYocCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KGtleSkudGhlbihuID0+IG4gPT09IG51bGwgPyBudWxsIDogaGF2ZShuKS50aGVuKHJlcyA9PiByZXMgPyBuIDogbmV4dChuKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ocGFyZW50LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihlbnRyaWVzKHBhcmVudCksIChtLCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2FuRm4obVsxXSwgZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihyZXN1bHQgPT4gW2VudHJ5WzBdLCByZXN1bHRdKTtcbiAgICAgICAgfSwgW0tleS5zZW50aW5lbCwgbWVtb10pKTtcbiAgICB9XG4gICAgU3RhdGUuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICBjb25zdCBuZXh0ID0gKGspID0+IGsgPT0gbnVsbCA/IHBhcmVudC5nZXQoa2V5KS50aGVuKCgpID0+IGtleSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IG51bGwgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKSA6IChrZXkgPT09IGsgPyBQcm9taXNlLnJlc29sdmUobnVsbCkgOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDogayA9PiBrID09PSBrZXkgPyBwYXJlbnQuZ2V0KGtleSkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICAgICAgcHJldjogbmV4dCxcbiAgICAgICAgICAgIG5leHQ6IG5leHRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBUcmVlLmdldChwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKSxcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBUcmVlLnByZXYocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSkudGhlbihQYXRoLnRvS2V5KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBUcmVlLm5leHQocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSkudGhlbihQYXRoLnRvS2V5KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24ga2V5QnkocGFyZW50LCBrZXlGbikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5tYXAoZW50cmllcyhwYXJlbnQpLCBlbnRyeSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleUZuKGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4oa2V5ID0+IFtrZXksIGVudHJ5WzFdXSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgU3RhdGUua2V5QnkgPSBrZXlCeTtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHBhcmVudCwgQ2FjaGUuY3JlYXRlKCkpO1xuICAgIH1cbiAgICBTdGF0ZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIGVudHJpZXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gS2V5LnNlbnRpbmVsLCBkb25lID0gZmFsc2UsIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZG9uZSA9IHRydWUsIFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLnNlbnRpbmVsKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5nZXQoa2V5KS50aGVuKHZhbHVlID0+IChjdXJyZW50ID0ga2V5LCB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogW2tleSwgdmFsdWVdIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiB0by5wcmV2ID09PSBuZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgZnJvbS5uZXh0ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pID8gZ2V0KGZyb20ucHJldikgOiBpdGVyYXRlKGZyb20ubmV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiB0by5uZXh0ID09PSBjdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUoY3VycmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0YXRlLmVudHJpZXMgPSBlbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGtleXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHN0YXRlKSwgRW50cnkua2V5KTtcbiAgICB9XG4gICAgU3RhdGUua2V5cyA9IGtleXM7XG4gICAgZnVuY3Rpb24gdmFsdWVzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5tYXAoZW50cmllcyhzdGF0ZSksIEVudHJ5LnZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUudmFsdWVzID0gdmFsdWVzO1xuICAgIGZ1bmN0aW9uIGZyb21FbnRyaWVzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IENhY2hlLmNyZWF0ZSgpLCBleGhhdXN0ZWQgPSBmYWxzZSwgY3VycmVudEtleSA9IG51bGwsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB2YXIgY2FjaGluZ0l0ZXJhdG9yID0ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4gaXRlcmF0b3IubmV4dCgpLnRoZW4oKHsgZG9uZSwgdmFsdWU6IGVudHJ5IH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBleGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5wcmV2W0tleS5zZW50aW5lbF0gPSBQcm9taXNlLnJlc29sdmUoY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLm5leHRbY3VycmVudEtleV0gPSBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc2VudGluZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhY2hlLnByZXZbZW50cnlbMF1dID0gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgICAgIGNhY2hlLm5leHRbY3VycmVudEtleV0gPSBQcm9taXNlLnJlc29sdmUoZW50cnlbMF0pO1xuICAgICAgICAgICAgICAgIGNhY2hlLmdldFtlbnRyeVswXV0gPSBQcm9taXNlLnJlc29sdmUoZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgPSBlbnRyeVswXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lLCB2YWx1ZTogZW50cnkgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbihFbnRyeS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbigoKSA9PiBrZXkgaW4gY2FjaGUucHJldiA/IGNhY2hlLnByZXZba2V5XSA6IEtleS5OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IEtleS5zZW50aW5lbCA6IHJlc3VsdC52YWx1ZVswXSk7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbigoKSA9PiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IEtleS5zZW50aW5lbCA6IHJlc3VsdC52YWx1ZVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHsgZ2V0LCBwcmV2LCBuZXh0IH0sIGNhY2hlKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUVudHJpZXMgPSBmcm9tRW50cmllcztcbiAgICBmdW5jdGlvbiBmcm9tS2V5cyhpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5tYXAoaXRlcmF0b3IsIGtleSA9PiBba2V5LCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tS2V5cyA9IGZyb21LZXlzO1xuICAgIGZ1bmN0aW9uIGZyb21WYWx1ZXMoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihpdGVyYXRvciwgKHByZXYsIHZhbHVlKSA9PiBbcHJldlswXSArIDEsIHZhbHVlXSwgWy0xLCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tVmFsdWVzID0gZnJvbVZhbHVlcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLmZyb21BcnJheSh2YWx1ZXMubWFwKCh2YWx1ZSwga2V5KSA9PiBba2V5LCB2YWx1ZV0pKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbn0pKFN0YXRlIHx8IChTdGF0ZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5leHBvcnQgdmFyIFBhdGg7XG4oZnVuY3Rpb24gKFBhdGgpIHtcbiAgICBmdW5jdGlvbiBrZXkocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gbnVsbCA6IEpTT04uc3RyaW5naWZ5KHBhdGgpO1xuICAgIH1cbiAgICBQYXRoLmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiBmcm9tS2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID09IG51bGwgPyBudWxsIDoga2V5LnRvU3RyaW5nKCkuc3BsaXQoJy8nKTtcbiAgICB9XG4gICAgUGF0aC5mcm9tS2V5ID0gZnJvbUtleTtcbiAgICBmdW5jdGlvbiB0b0tleShwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBudWxsIDogcGF0aC5qb2luKCcvJyk7XG4gICAgfVxuICAgIFBhdGgudG9LZXkgPSB0b0tleTtcbiAgICBmdW5jdGlvbiBoZWFkKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoWzBdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5oZWFkID0gaGVhZDtcbiAgICBmdW5jdGlvbiBnZXQocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoW2luZGV4XSA6IG51bGw7XG4gICAgfVxuICAgIFBhdGguZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHRhaWwocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gW10gOiBwYXRoLnNsaWNlKDEsIHBhdGgubGVuZ3RoKTtcbiAgICB9XG4gICAgUGF0aC50YWlsID0gdGFpbDtcbiAgICBmdW5jdGlvbiBhcHBlbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGEpLmNvbmNhdChiKTtcbiAgICB9XG4gICAgUGF0aC5hcHBlbmQgPSBhcHBlbmQ7XG59KShQYXRoIHx8IChQYXRoID0ge30pKTtcbmV4cG9ydCB2YXIgVHJlZTtcbihmdW5jdGlvbiAoVHJlZSkge1xuICAgIGZ1bmN0aW9uIGdldCh0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5nZXQocGF0aCwgMCksIHRhaWwgPSBQYXRoLmdldChwYXRoLCAxKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpLnRoZW4oc3RhdGUgPT4gc3RhdGUuZ2V0KHRhaWwpKTtcbiAgICB9XG4gICAgVHJlZS5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gcHJldih0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5nZXQocGF0aCwgMCksIHRhaWwgPSBQYXRoLmdldChwYXRoLCAxKSwgcHJldnMgPSBTdGF0ZS5maWx0ZXIoU3RhdGUubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLnByZXYoKSksIGZpcnN0ID0+IGZpcnN0ICE9IG51bGwpLCBwYXRocyA9IFN0YXRlLm1hcChwcmV2cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMucHJldigpLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyBwYXRocy5nZXQocHJldikgOiBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpXG4gICAgICAgICAgICAudGhlbihzdGF0ZSA9PiBzdGF0ZS5wcmV2KHRhaWwpKVxuICAgICAgICAgICAgLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyBbaGVhZCwgcHJldl0gOiBwYXRocy5wcmV2KGhlYWQpLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyBwYXRocy5nZXQocHJldikgOiBudWxsKSk7XG4gICAgfVxuICAgIFRyZWUucHJldiA9IHByZXY7XG4gICAgZnVuY3Rpb24gbmV4dCh0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5nZXQocGF0aCwgMCksIHRhaWwgPSBQYXRoLmdldChwYXRoLCAxKSwgbmV4dHMgPSBTdGF0ZS5maWx0ZXIoU3RhdGUubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLm5leHQoKSksIGZpcnN0ID0+IGZpcnN0ICE9IG51bGwpLCBwYXRocyA9IFN0YXRlLm1hcChuZXh0cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ICE9IG51bGwgPyBwYXRocy5nZXQobmV4dCkgOiBudWxsKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpXG4gICAgICAgICAgICAudGhlbihzdGF0ZSA9PiBzdGF0ZS5uZXh0KHRhaWwpKVxuICAgICAgICAgICAgLnRoZW4obmV4dCA9PiBuZXh0ICE9IG51bGwgPyBbaGVhZCwgbmV4dF0gOiBwYXRocy5uZXh0KGhlYWQpLnRoZW4obmV4dCA9PiBuZXh0ICE9IG51bGwgPyBwYXRocy5nZXQobmV4dCkgOiBudWxsKSk7XG4gICAgfVxuICAgIFRyZWUubmV4dCA9IG5leHQ7XG59KShUcmVlIHx8IChUcmVlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFRyZWU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRyZWUuanMubWFwXG4iXX0=
