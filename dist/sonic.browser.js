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
    function zip(iterator, other) {
        return {
            next: function next() {
                return Promise.all([iterator.next(), other.next()]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);

                    var result = _ref2[0];
                    var otherResult = _ref2[1];

                    if (result.done || otherResult.done) return AsyncIterator.sentinel;
                    return { done: false, value: [result.value, otherResult.value] };
                });
            }
        };
    }
    AsyncIterator.zip = zip;
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
        return reduce(iterator, function (memo, _ref3) {
            var _ref32 = _slicedToArray(_ref3, 2);

            var key = _ref32[0];
            var value = _ref32[1];
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
    function scan(parent, scanFn, memo) {
        var state = _state2['default'].scan(parent.state, scanFn, memo),
            list,
            patches = _observable.Observable.map(parent.patches, function (patch) {
            var parentState = parent.state,
                listState = list.state,
                range = [patch.range[0], { prev: null }],
                added = _state2['default'].lazy(function () {
                return _state2['default'].last(listState, [{ next: null }, patch.range[0]]).then(function (memo) {
                    return _state2['default'].scan(_state2['default'].slice(parentState, [patch.range[0], { prev: null }]), scanFn, memo);
                });
            });
            return { range: range, added: added };
        });
        return list = create(state, patches);
    }
    List.scan = scan;
    function cache(parent) {
        var state = _state2['default'].cache(parent.state),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return {
                range: patch.range,
                added: _state2['default'].cache(patch.added)
            };
        });
        '';
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

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

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

var _promise_utils = require('./promise_utils');

var _promise_utils2 = _interopRequireDefault(_promise_utils);

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
        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var _ref22 = _slicedToArray(_ref2, 2);

        var from = _ref22[0];
        var to = _ref22[1];

        return _range.Position.isPrevPosition(from) ? state.get(from.prev) : state.next(from.next).then(state.get);
    }
    State.first = first;
    function last(state) {
        var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var _ref32 = _slicedToArray(_ref3, 2);

        var from = _ref32[0];
        var to = _ref32[1];

        return _range.Position.isNextPosition(to) ? state.get(to.next) : state.prev(to.prev).then(state.get);
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
                return p === _key2['default'].sentinel ? _key2['default'].sentinel : have(p).then(function (res) {
                    return res ? p : prev(p);
                });
            });
        }
        function next(key) {
            return parent.next(key).then(function (n) {
                return n === _key2['default'].sentinel ? _key2['default'].sentinel : have(n).then(function (res) {
                    return res ? n : next(n);
                });
            });
        }
        return extend(parent, { get: get, prev: prev, next: next });
    }
    State.filter = filter;
    function scan(parent, scanFn, memo) {
        return fromEntries(_async_iterator2['default'].scan(entries(parent), function (memoEntry, entry) {
            return Promise.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(function (result) {
                return [entry[0], result];
            });
        }, [_key2['default'].sentinel, memo]));
    }
    State.scan = scan;
    function zip(parent, other) {
        return fromValues(_async_iterator2['default'].zip(values(parent), values(other)));
    }
    State.zip = zip;
    function zoom(parent, key) {
        var next = function next() {
            var k = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];
            return k === _key2['default'].sentinel ? parent.get(key).then(function () {
                return key;
            }, function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? _key2['default'].sentinel : Promise.reject(reason);
            }) : key === k ? Promise.resolve(_key2['default'].sentinel) : _key2['default'].NOT_FOUND;
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

        return _async_iterator2['default'].map(entries(state, range), _entry2['default'].key);
    }
    State.keys = keys;
    function values(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return _async_iterator2['default'].map(entries(state, range), _entry2['default'].value);
    }
    State.values = values;
    function fromEntries(iterator) {
        var cache = _cache2['default'].create(),
            exhausted = false,
            currentKey = null,
            queue = Promise.resolve(null);
        var cachingIterator = {
            next: function next() {
                return iterator.next().then(function (_ref4) {
                    var done = _ref4.done;
                    var entry = _ref4.value;

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
        return fromValues(_async_iterator2['default'].fromArray(values));
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromEntries(_async_iterator2['default'].fromObject(values));
    }
    State.fromObject = fromObject;
    function lazy(fn) {
        var state,
            promise = _promise_utils2['default'].lazy(function (resolve, reject) {
            return resolve(Promise.resolve(fn()).then(function (s) {
                return state = s;
            }));
        });
        function get(key) {
            return state ? state.get(key) : promise.then(function (s) {
                return s.get(key);
            });
        }
        function prev(key) {
            return state ? state.prev(key) : promise.then(function (s) {
                return s.prev(key);
            });
        }
        function next(key) {
            return state ? state.next(key) : promise.then(function (s) {
                return s.next(key);
            });
        }
        return { get: get, prev: prev, next: next };
    }
    State.lazy = lazy;
    function toObject(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return _async_iterator2['default'].toObject(entries(state, range));
    }
    State.toObject = toObject;
    function toArray(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return _async_iterator2['default'].toArray(values(state, range));
    }
    State.toArray = toArray;
})(State || (exports.State = State = {}));
exports['default'] = State;



},{"./async_iterator":1,"./cache":2,"./entry":3,"./key":4,"./promise_utils":9,"./range":10,"./tree":13}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvZW50cnkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9rZXkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9sZW5zLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGlzdC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L29ic2VydmFibGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wYXRjaC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3Byb21pc2VfdXRpbHMuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9yYW5nZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3NvbmljLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qvc3RhdGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC90cmVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztvQkNBZ0IsT0FBTzs7OztBQUNoQixJQUFJLGFBQWEsQ0FBQzs7QUFDekIsQ0FBQyxVQUFVLGFBQWEsRUFBRTtBQUN0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QUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUFBLENBQUMsQ0FDL0IsSUFBSSxDQUFDLFVBQUEsSUFBSTttQkFBSSxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsSUFBSTt1QkFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTthQUFBLENBQUM7U0FBQSxDQUFDLENBQUM7S0FDekg7QUFDRCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNwQixDQUFBLENBQUUsSUFBSSxhQXpCSSxJQUFJLEdBeUJILElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNULElBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIEFzeW5jSXRlcmF0b3I7XG4oZnVuY3Rpb24gKEFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0l0ZXJhdG9yLnNlbnRpbmVsID0geyBkb25lOiB0cnVlIH07XG4gICAgQXN5bmNJdGVyYXRvci5FbXB0eSA9IHtcbiAgICAgICAgbmV4dDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKEFzeW5jSXRlcmF0b3Iuc2VudGluZWwpXG4gICAgfTtcbiAgICBmdW5jdGlvbiBldmVyeShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gdHJ1ZSA6IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUocmVzdWx0LnZhbHVlKSkudGhlbihzYXRpc2ZpZWQgPT4gc2F0aXNmaWVkID8gbG9vcCgpIDogZmFsc2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG9vcCgpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmV2ZXJ5ID0gZXZlcnk7XG4gICAgZnVuY3Rpb24gc29tZShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBldmVyeShpdGVyYXRvciwgdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZSh2YWx1ZSkpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQpKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zb21lID0gc29tZTtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4gZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSkgPT4gUHJvbWlzZS5yZXNvbHZlKGZuKHZhbHVlKSkudGhlbigoKSA9PiB0cnVlKSkudGhlbigoKSA9PiB7IH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIHJlZHVjZShpdGVyYXRvciwgZm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGZvckVhY2goaXRlcmF0b3IsICh2YWx1ZSkgPT4gUHJvbWlzZS5yZXNvbHZlKGZuKG1lbW8sIHZhbHVlKSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgfSkpLnRoZW4oKCkgPT4gbWVtbyk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IucmVkdWNlID0gcmVkdWNlO1xuICAgIGZ1bmN0aW9uIGZpbmQoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZSh2YWx1ZSkpLnRoZW4oc2F0aXNmaWVkID0+IHNhdGlzZmllZCA/IChyZXN1bHQgPSB2YWx1ZSwgdHJ1ZSkgOiBmYWxzZSkpLnRoZW4oc2F0aXNmaWVkID0+IHNhdGlzZmllZCA/IHJlc3VsdCA6IEtleS5OT1RfRk9VTkQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmQgPSBmaW5kO1xuICAgIGZ1bmN0aW9uIGluZGV4T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgdiA9PiAoaW5kZXgrKywgdmFsdWUgPT0gdikpLnRoZW4oZm91bmQgPT4gZm91bmQgPyBpbmRleCA6IEtleS5OT1RfRk9VTkQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmluZGV4T2YgPSBpbmRleE9mO1xuICAgIGZ1bmN0aW9uIGF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZmluZChpdGVyYXRvciwgKCkgPT4gMCA9PT0gaW5kZXgtLSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuYXQgPSBhdDtcbiAgICBmdW5jdGlvbiBjb250YWlucyhpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHYgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgZnVuY3Rpb24gaXMoaXRlcmF0b3IsIG90aGVyLCBlcXVhbHMgPSAoYSwgYikgPT4gYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5ldmVyeShpdGVyYXRvciwgdmFsdWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG90aGVyLm5leHQoKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0LmRvbmUgJiYgZXF1YWxzKHJlc3VsdC52YWx1ZSwgdmFsdWUpKTtcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzID8gb3RoZXIubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lKSA6IGZhbHNlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIG1hcChpdGVyYXRvciwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IGl0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gUHJvbWlzZS5yZXNvbHZlKEFzeW5jSXRlcmF0b3Iuc2VudGluZWwpIDogUHJvbWlzZS5yZXNvbHZlKG1hcEZuKHJlc3VsdC52YWx1ZSkpLnRoZW4odmFsdWUgPT4gKHsgZG9uZTogZmFsc2UsIHZhbHVlIH0pKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihpdGVyYXRvciwgZmlsdGVyRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyByZXN1bHQgOiBQcm9taXNlLnJlc29sdmUoZmlsdGVyRm4ocmVzdWx0LnZhbHVlKSkudGhlbihzYXRpc2ZpZWQgPT4gc2F0aXNmaWVkID8gcmVzdWx0IDogbmV4dCgpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbmV4dCB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKGl0ZXJhdG9yLCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IGl0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gUHJvbWlzZS5yZXNvbHZlKEFzeW5jSXRlcmF0b3Iuc2VudGluZWwpIDogUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vLCByZXN1bHQudmFsdWUpKS50aGVuKHZhbHVlID0+ICh7IGRvbmU6IGZhbHNlLCB2YWx1ZTogbWVtbyA9IHZhbHVlIH0pKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gemlwKGl0ZXJhdG9yLCBvdGhlcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4gUHJvbWlzZS5hbGwoW2l0ZXJhdG9yLm5leHQoKSwgb3RoZXIubmV4dCgpXSkudGhlbigoW3Jlc3VsdCwgb3RoZXJSZXN1bHRdKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lIHx8IG90aGVyUmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNlbnRpbmVsO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogW3Jlc3VsdC52YWx1ZSwgb3RoZXJSZXN1bHQudmFsdWVdIH07XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnppcCA9IHppcDtcbiAgICBmdW5jdGlvbiBjb25jYXQoLi4uaXRlcmF0b3JzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcnMucmVkdWNlKChtZW1vLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdGVkID0gZmFsc2UsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4geyB9LCAoKSA9PiB7IH0pLnRoZW4oKCkgPT4gaXRlcmF0ZWQgPyB2YWx1ZS5uZXh0KCkgOiBtZW1vLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IChpdGVyYXRlZCA9IHRydWUsIHZhbHVlLm5leHQoKSkgOiByZXN1bHQpKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgQXN5bmNJdGVyYXRvci5FbXB0eSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29uY2F0ID0gY29uY2F0O1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuICAgICAgICB2YXIgY3VycmVudCA9IC0xLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHF1ZXVlID0gcXVldWUudGhlbigoKSA9PiB7IH0sICgpID0+IHsgfSkudGhlbigoKSA9PiBQcm9taXNlLnJlc29sdmUoKytjdXJyZW50ID49IGFycmF5Lmxlbmd0aCA/IEFzeW5jSXRlcmF0b3Iuc2VudGluZWwgOiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogYXJyYXlbY3VycmVudF0gfSkpXG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmcm9tQXJyYXkoT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoa2V5ID0+IFtrZXksIG9iamVjdFtrZXldXSkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlKSA9PiAobWVtby5wdXNoKHZhbHVlKSwgbWVtbyksIFtdKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgW2tleSwgdmFsdWVdKSA9PiAobWVtb1trZXldID0gdmFsdWUsIG1lbW8pLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b09iamVjdCA9IHRvT2JqZWN0O1xufSkoQXN5bmNJdGVyYXRvciB8fCAoQXN5bmNJdGVyYXRvciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBBc3luY0l0ZXJhdG9yO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luY19pdGVyYXRvci5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBDYWNoZTtcbihmdW5jdGlvbiAoQ2FjaGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gZXh0ZW5kKGNhY2hlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUoY2FjaGUuZ2V0KSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUoY2FjaGUucHJldiksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKGNhY2hlLm5leHQpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgY2FjaGUpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5nZXQgPyBjYWNoZS5nZXRba2V5XSA6IGNhY2hlLmdldFtrZXldID0gc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUucHJldiA/IGNhY2hlLnByZXZba2V5XSA6IGNhY2hlLnByZXZba2V5XSA9IHN0YXRlLnByZXYoa2V5KS50aGVuKHByZXYgPT4geyBjYWNoZS5uZXh0W3ByZXZdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBwcmV2OyB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5uZXh0ID8gY2FjaGUubmV4dFtrZXldIDogY2FjaGUubmV4dFtrZXldID0gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7IGNhY2hlLnByZXZbbmV4dF0gPSBQcm9taXNlLnJlc29sdmUoa2V5KTsgcmV0dXJuIG5leHQ7IH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBDYWNoZS5hcHBseSA9IGFwcGx5O1xufSkoQ2FjaGUgfHwgKENhY2hlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYWNoZS5qcy5tYXBcbiIsImV4cG9ydCB2YXIgRW50cnk7XG4oZnVuY3Rpb24gKEVudHJ5KSB7XG4gICAgZnVuY3Rpb24ga2V5KGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgICB9XG4gICAgRW50cnkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIHZhbHVlKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeVsxXTtcbiAgICB9XG4gICAgRW50cnkudmFsdWUgPSB2YWx1ZTtcbiAgICBmdW5jdGlvbiBpcyhlbnRyeSwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5WzBdID09PSBvdGhlclswXSAmJiBlbnRyeVsxXSA9PT0gb3RoZXJbMV07XG4gICAgfVxuICAgIEVudHJ5LmlzID0gaXM7XG59KShFbnRyeSB8fCAoRW50cnkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgRW50cnk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWVudHJ5LmpzLm1hcFxuIiwiaW1wb3J0IFByb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xudmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgS2V5Lk5PVF9GT1VORF9FUlJPUiA9IG5ldyBFcnJvcihcIk5vIGVudHJ5IGF0IHRoZSBzcGVjaWZpZWQga2V5XCIpO1xuICAgIEtleS5OT1RfRk9VTkQgPSBQcm9taXNlVXRpbHMubGF6eSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZWplY3QoS2V5Lk5PVF9GT1VORF9FUlJPUikpO1xuICAgIEtleS5zZW50aW5lbCA9IG51bGw7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgZnVuY3Rpb24ga2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEtleS5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS5jcmVhdGUgPSBjcmVhdGU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtleS5qcy5tYXBcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5leHBvcnQgdmFyIExlbnM7XG4oZnVuY3Rpb24gKExlbnMpIHtcbiAgICBmdW5jdGlvbiBjb21wb3NlKHBhcmVudCwgbGVucykge1xuICAgICAgICB2YXIgZ2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCksIHNldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5nZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKGdldFN1YmplY3QpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChzZXRTdWJqZWN0LCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLnNldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUocGFyZW50LnBhdGNoZXMpO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XG4gICAgfVxuICAgIExlbnMuY29tcG9zZSA9IGNvbXBvc2U7XG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExlbnM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxlbnMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBQYXRjaCBmcm9tICcuL3BhdGNoJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFJhbmdlLCBQb3NpdGlvbiB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuZXhwb3J0IHZhciBMaXN0O1xuKGZ1bmN0aW9uIChMaXN0KSB7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbWFwRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIG1hcEZuKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBBc3luY0l0ZXJhdG9yLmZpbmQoU3RhdGUuZW50cmllcyhTdGF0ZS5yZXZlcnNlKHN0YXRlKSwgW1Bvc2l0aW9uLnJldmVyc2UocGF0Y2gucmFuZ2VbMF0pLCB7IHByZXY6IG51bGwgfV0pLCBlbnRyeSA9PiBmaWx0ZXJGbihlbnRyeVsxXSwgZW50cnlbMF0pKS50aGVuKG5leHQgPT4gKHsgbmV4dDogbmV4dFswXSB9KSksXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kKFN0YXRlLmVudHJpZXMoc3RhdGUsIFtwYXRjaC5yYW5nZVsxXSwgeyBwcmV2OiBudWxsIH1dKSwgZW50cnkgPT4gZmlsdGVyRm4oZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihwcmV2ID0+ICh7IHByZXY6IHByZXZbMF0gfSkpXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmlsdGVyKHBhdGNoLmFkZGVkLCBmaWx0ZXJGbikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIChvbGRTdGF0ZSwgcGF0Y2hlcykgPT4gc3RhdGUgPSBQYXRjaC5hcHBseShvbGRTdGF0ZSwgcGF0Y2hlcykpO1xuICAgIH1cbiAgICBMaXN0LmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgc3RhdGUgPSBTdGF0ZS56b29tKHBhcmVudC5zdGF0ZSwga2V5KSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKE9ic2VydmFibGUuZmlsdGVyKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKFN0YXRlLmVudHJpZXMocGFyZW50U3RhdGUsIHBhdGNoLnJhbmdlKSwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcGF0Y2guYWRkZWQgPyBTdGF0ZS5oYXMocGF0Y2guYWRkZWQsIGtleSkgOiByZXMpO1xuICAgICAgICB9KSwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBSYW5nZS5hbGwsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuem9vbShwYXRjaC5hZGRlZCwga2V5KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBwYXRjaGVzXyA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIHZhciBwYXJlbnRfID0gY2FjaGUobWFwKHBhcmVudCwgKChsaXN0LCBrZXkpID0+IHtcbiAgICAgICAgICAgIE9ic2VydmFibGUubWFwKGxpc3QucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5wcmV2KEtleS5zZW50aW5lbCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgbmV4dF0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ucHJldl0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlLm5leHQoS2V5LnNlbnRpbmVsKS50aGVuKHByZXYgPT4gKHsgcHJldjogUGF0aC50b0tleShba2V5LCBwcmV2XSkgfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5uZXh0XSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHBhdGNoLmFkZGVkIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShwYXRjaGVzXyk7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5uZXh0KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5wcmV2XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGlzdCA9PiBsaXN0LnN0YXRlKSkgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mbGF0dGVuKHBhcmVudF8uc3RhdGUpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzXyk7XG4gICAgfVxuICAgIExpc3QuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gc2NhbihwYXJlbnQsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5zY2FuKHBhcmVudC5zdGF0ZSwgc2NhbkZuLCBtZW1vKSwgbGlzdCwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIGxpc3RTdGF0ZSA9IGxpc3Quc3RhdGUsIHJhbmdlID0gW3BhdGNoLnJhbmdlWzBdLCB7IHByZXY6IG51bGwgfV0sIGFkZGVkID0gU3RhdGUubGF6eSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXRlLmxhc3QobGlzdFN0YXRlLCBbeyBuZXh0OiBudWxsIH0sIHBhdGNoLnJhbmdlWzBdXSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4obWVtbyA9PiBTdGF0ZS5zY2FuKFN0YXRlLnNsaWNlKHBhcmVudFN0YXRlLCBbcGF0Y2gucmFuZ2VbMF0sIHsgcHJldjogbnVsbCB9XSksIHNjYW5GbiwgbWVtbykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZSwgYWRkZWQgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaXN0ID0gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC5zY2FuID0gc2NhbjtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuY2FjaGUocGFyZW50LnN0YXRlKSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDogU3RhdGUuY2FjaGUocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgYGA7XG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3QuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIHJlZHVjZXIgPSBQYXRjaC5hcHBseSkge1xuICAgICAgICBjb25zdCBsaXN0ID0geyBzdGF0ZSwgcGF0Y2hlcyB9O1xuICAgICAgICBPYnNlcnZhYmxlLnNjYW4ocGF0Y2hlcywgcmVkdWNlciwgc3RhdGUpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IChzdGF0ZSkgPT4geyBsaXN0LnN0YXRlID0gc3RhdGU7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cbiAgICBMaXN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKExpc3QgfHwgKExpc3QgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlzdC5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGRpc3Bvc2VyKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBEaXNwb3NhYmxlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKERpc3Bvc2FibGUgfHwgKERpc3Bvc2FibGUgPSB7fSkpO1xuZXhwb3J0IHZhciBPYnNlcnZhYmxlO1xuKGZ1bmN0aW9uIChPYnNlcnZhYmxlKSB7XG4gICAgZnVuY3Rpb24gbWFwKG9ic2VydmFibGUsIG1hcEZuKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShtYXBGbih2YWx1ZSkpLnRoZW4oc3ViamVjdC5vbk5leHQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihvYnNlcnZhYmxlLCBmaWx0ZXJGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoZmlsdGVyRm4odmFsdWUpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSkgOiB1bmRlZmluZWQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ob2JzZXJ2YWJsZSwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuc2NhbiA9IHNjYW47XG59KShPYnNlcnZhYmxlIHx8IChPYnNlcnZhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkuY3JlYXRlKCk7XG4gICAgICAgICAgICBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gZGVsZXRlIG9ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uTmV4dCh2YWx1ZSkpKS50aGVuKCgpID0+IHsgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSwgb25OZXh0IH07XG4gICAgfVxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xufSkoU3ViamVjdCB8fCAoU3ViamVjdCA9IHt9KSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmFibGUuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xufSkoUGF0Y2ggfHwgKFBhdGNoID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFBhdGNoO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1wYXRjaC5qcy5tYXBcbiIsIi8vIHR5cGUgSnVzdDxWPiA9IFtWXTtcbi8vIHR5cGUgTm90aGluZzxWPiA9IEFycmF5PFY+ICYgeyAwOiB2b2lkIH1cbi8vIHR5cGUgTWF5YmU8Vj4gPSBKdXN0PFY+IHwgTm90aGluZzxWPjtcbmV4cG9ydCB2YXIgUHJvbWlzZVV0aWxzO1xuKGZ1bmN0aW9uIChQcm9taXNlVXRpbHMpIHtcbiAgICBmdW5jdGlvbiBsYXp5KGV4ZWN1dG9yKSB7XG4gICAgICAgIHZhciBwcm9taXNlO1xuICAgICAgICBmdW5jdGlvbiB0aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgICAgIHJldHVybiAocHJvbWlzZSA9IG5ldyBQcm9taXNlKGV4ZWN1dG9yKSkudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHRoZW4gfSk7XG4gICAgfVxuICAgIFByb21pc2VVdGlscy5sYXp5ID0gbGF6eTtcbn0pKFByb21pc2VVdGlscyB8fCAoUHJvbWlzZVV0aWxzID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFByb21pc2VVdGlscztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvbWlzZV91dGlscy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBSYW5nZTtcbihmdW5jdGlvbiAoUmFuZ2UpIHtcbiAgICBSYW5nZS5hbGwgPSBbeyBuZXh0OiBLZXkuc2VudGluZWwgfSwgeyBwcmV2OiBLZXkuc2VudGluZWwgfV07XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuZXhwb3J0IHZhciBQb3NpdGlvbjtcbihmdW5jdGlvbiAoUG9zaXRpb24pIHtcbiAgICBmdW5jdGlvbiBpc1ByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ3ByZXYnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbiA9IGlzUHJldlBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIGlzTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAnbmV4dCcgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uID0gaXNOZXh0UG9zaXRpb247XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pID8geyBuZXh0OiBwb3NpdGlvbi5wcmV2IH0gOiB7IHByZXY6IHBvc2l0aW9uLm5leHQgfTtcbiAgICB9XG4gICAgUG9zaXRpb24ucmV2ZXJzZSA9IHJldmVyc2U7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcFxuIiwiaW1wb3J0IF9TdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCBfQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IExpc3QgYXMgX0xpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IF9UcmVlIGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgX0NhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgU3ViamVjdCBhcyBfU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgX1Byb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xuaW1wb3J0IF9MZW5zIGZyb20gJy4vbGVucyc7XG5leHBvcnQgZnVuY3Rpb24gU29uaWMob2JqKSB7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tQXJyYXkob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIHJldHVybiBfTGlzdC5jcmVhdGUoX1N0YXRlLmZyb21PYmplY3Qob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xufVxuZXhwb3J0IHZhciBTb25pYztcbihmdW5jdGlvbiAoU29uaWMpIHtcbiAgICBTb25pYy5TdGF0ZSA9IF9TdGF0ZTtcbiAgICBTb25pYy5Bc3luY0l0ZXJhdG9yID0gX0FzeW5jSXRlcmF0b3I7XG4gICAgU29uaWMuTGlzdCA9IF9MaXN0O1xuICAgIFNvbmljLlRyZWUgPSBfVHJlZTtcbiAgICBTb25pYy5TdWJqZWN0ID0gX1N1YmplY3Q7XG4gICAgU29uaWMuQ2FjaGUgPSBfQ2FjaGU7XG4gICAgU29uaWMuUHJvbWlzZVV0aWxzID0gX1Byb21pc2VVdGlscztcbiAgICBTb25pYy5MZW5zID0gX0xlbnM7XG59KShTb25pYyB8fCAoU29uaWMgPSB7fSkpO1xuO1xubW9kdWxlLmV4cG9ydHMgPSBTb25pYztcbmV4cG9ydCBkZWZhdWx0IFNvbmljO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb25pYy5qcy5tYXBcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IEVudHJ5IGZyb20gJy4vZW50cnknO1xuaW1wb3J0IHsgUG9zaXRpb24sIFJhbmdlIH0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IFByb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZS5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoa2V5KSA9PiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBwcmV2OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBuZXh0OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5EXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgICAgaWYgKGdldClcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcbiAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICBzdGF0ZS5wcmV2ID0gcHJldjtcbiAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICBzdGF0ZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBTdGF0ZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZmlyc3Qoc3RhdGUsIFtmcm9tLCB0b10gPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pID8gc3RhdGUuZ2V0KGZyb20ucHJldikgOiBzdGF0ZS5uZXh0KGZyb20ubmV4dCkudGhlbihzdGF0ZS5nZXQpO1xuICAgIH1cbiAgICBTdGF0ZS5maXJzdCA9IGZpcnN0O1xuICAgIGZ1bmN0aW9uIGxhc3Qoc3RhdGUsIFtmcm9tLCB0b10gPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IHN0YXRlLmdldCh0by5uZXh0KSA6IHN0YXRlLnByZXYodG8ucHJldikudGhlbihzdGF0ZS5nZXQpO1xuICAgIH1cbiAgICBTdGF0ZS5sYXN0ID0gbGFzdDtcbiAgICBmdW5jdGlvbiBoYXMoc3RhdGUsIGtleSkge1xuICAgICAgICByZXR1cm4gc3RhdGUuZ2V0KGtleSkudGhlbigoKSA9PiB0cnVlLCByZWFzb24gPT4gcmVhc29uID09PSBLZXkuTk9UX0ZPVU5EX0VSUk9SID8gZmFsc2UgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKTtcbiAgICB9XG4gICAgU3RhdGUuaGFzID0gaGFzO1xuICAgIGZ1bmN0aW9uIGlzKHN0YXRlLCBvdGhlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBlbnRyaWVzKHN0YXRlKSwgb3RoZXJJdGVyYXRvciA9IGVudHJpZXMob3RoZXIpO1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5pcyhpdGVyYXRvciwgb3RoZXJJdGVyYXRvciwgRW50cnkuaXMpO1xuICAgIH1cbiAgICBTdGF0ZS5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHN0YXRlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGVudHJpZXMoc3RhdGUpLCBlbnRyeSA9PiBlbnRyeVsxXSA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBTdGF0ZS5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGlzRW1wdHkoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCA9PT0gS2V5LnNlbnRpbmVsKTtcbiAgICB9XG4gICAgU3RhdGUuaXNFbXB0eSA9IGlzRW1wdHk7XG4gICAgZnVuY3Rpb24gc2xpY2UocGFyZW50LCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoZW50cmllcyhwYXJlbnQsIHJhbmdlKSk7XG4gICAgfVxuICAgIFN0YXRlLnNsaWNlID0gc2xpY2U7XG4gICAgZnVuY3Rpb24gc3BsaWNlKHBhcmVudCwgcmFuZ2UsIGNoaWxkKSB7XG4gICAgICAgIHZhciBkZWxldGVkID0gc2xpY2UocGFyZW50LCByYW5nZSksIGZpbHRlcmVkID0gZmlsdGVyKHBhcmVudCwgKHZhbHVlLCBrZXkpID0+IGRlbGV0ZWQuZ2V0KGtleSkudGhlbigoKSA9PiBmYWxzZSwgKCkgPT4gdHJ1ZSkpO1xuICAgICAgICBpZiAoY2hpbGQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZDtcbiAgICAgICAgdmFyIGJyaWRnZWRDaGlsZCwgYnJpZGdlZFBhcmVudCwgZnJvbSA9IHJhbmdlWzBdLCB0byA9IHJhbmdlWzFdO1xuICAgICAgICBicmlkZ2VkQ2hpbGQgPSBleHRlbmQoY2hpbGQsIHtcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBjaGlsZC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocHJldiAhPT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHByZXYpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IFByb21pc2UucmVzb2x2ZShmcm9tLm5leHQpIDogcGFyZW50LnByZXYoZnJvbS5wcmV2KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IGNoaWxkLm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0ICE9PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSA/IFByb21pc2UucmVzb2x2ZSh0by5wcmV2KSA6IHBhcmVudC5uZXh0KHRvLm5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGJyaWRnZWRQYXJlbnQgPSBleHRlbmQoZmlsdGVyZWQsIHtcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBwYXJlbnQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiBwcmV2ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLnByZXYoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIHByZXYpLnRoZW4ocmVzID0+IHJlcyA/IEtleS5OT1RfRk9VTkQgOiBwcmV2KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IHBhcmVudC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgbmV4dCA9PT0gZnJvbS5wcmV2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLm5leHQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIG5leHQpLnRoZW4ocmVzID0+IHJlcyA/IEtleS5OT1RfRk9VTkQgOiBuZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGNoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5nZXQoa2V5KSA6IGJyaWRnZWRQYXJlbnQuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGtleSA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLnByZXYoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5wcmV2KGtleSkgOiBicmlkZ2VkUGFyZW50LnByZXYoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBrZXkgPT09IGZyb20ubmV4dClcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLm5leHQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5uZXh0KGtleSkgOiBicmlkZ2VkUGFyZW50Lm5leHQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIFN0YXRlLnNwbGljZSA9IHNwbGljZTtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgcHJldjogcGFyZW50Lm5leHQsXG4gICAgICAgICAgICBuZXh0OiBwYXJlbnQucHJldlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUucmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDoga2V5ID0+IHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IG1hcEZuKHZhbHVlLCBrZXkpKVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihwYXJlbnQsIGZpbHRlckZuKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhdmUoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlID8gY2FjaGVba2V5XSA6IGNhY2hlW2tleV0gPSBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBmaWx0ZXJGbih2YWx1ZSwga2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhdmUoa2V5KS50aGVuKHJlcyA9PiByZXMgPyBwYXJlbnQuZ2V0KGtleSkgOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5wcmV2KGtleSkudGhlbihwID0+IHAgPT09IEtleS5zZW50aW5lbCA/IEtleS5zZW50aW5lbCA6IGhhdmUocCkudGhlbihyZXMgPT4gcmVzID8gcCA6IHByZXYocCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KGtleSkudGhlbihuID0+IG4gPT09IEtleS5zZW50aW5lbCA/IEtleS5zZW50aW5lbCA6IGhhdmUobikudGhlbihyZXMgPT4gcmVzID8gbiA6IG5leHQobikpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKHBhcmVudCwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLnNjYW4oZW50cmllcyhwYXJlbnQpLCAobWVtb0VudHJ5LCBlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtb0VudHJ5WzFdLCBlbnRyeVsxXSwgZW50cnlbMF0pKS50aGVuKHJlc3VsdCA9PiBbZW50cnlbMF0sIHJlc3VsdF0pO1xuICAgICAgICB9LCBbS2V5LnNlbnRpbmVsLCBtZW1vXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5zY2FuID0gc2NhbjtcbiAgICBmdW5jdGlvbiB6aXAocGFyZW50LCBvdGhlcikge1xuICAgICAgICByZXR1cm4gZnJvbVZhbHVlcyhBc3luY0l0ZXJhdG9yLnppcCh2YWx1ZXMocGFyZW50KSwgdmFsdWVzKG90aGVyKSkpO1xuICAgIH1cbiAgICBTdGF0ZS56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICBjb25zdCBuZXh0ID0gKGsgPSBLZXkuc2VudGluZWwpID0+IGsgPT09IEtleS5zZW50aW5lbCA/IHBhcmVudC5nZXQoa2V5KS50aGVuKCgpID0+IGtleSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IEtleS5zZW50aW5lbCA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpIDogKGtleSA9PT0gayA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGsgPT4gayA9PT0ga2V5ID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgICAgIHByZXY6IG5leHQsXG4gICAgICAgICAgICBuZXh0OiBuZXh0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gVHJlZS5nZXQocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSksXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gVHJlZS5wcmV2KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gVHJlZS5uZXh0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IubWFwKGVudHJpZXMocGFyZW50KSwgZW50cnkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXlGbihlbnRyeVsxXSwgZW50cnlbMF0pKS50aGVuKGtleSA9PiBba2V5LCBlbnRyeVsxXV0pO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIFN0YXRlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseShwYXJlbnQsIENhY2hlLmNyZWF0ZSgpKTtcbiAgICB9XG4gICAgU3RhdGUuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBlbnRyaWVzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IEtleS5zZW50aW5lbCwgZG9uZSA9IGZhbHNlLCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGRvbmUgPSB0cnVlLCBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5zZW50aW5lbCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiAoY3VycmVudCA9IGtleSwgeyBkb25lOiBmYWxzZSwgdmFsdWU6IFtrZXksIHZhbHVlXSB9KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGUoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgdG8ucHJldiA9PT0gbmV4dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KG5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBmcm9tLnByZXYgPT09IHRvLnByZXYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIGZyb20ubmV4dCA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IGdldChmcm9tLnByZXYpIDogaXRlcmF0ZShmcm9tLm5leHQpO1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgdG8ubmV4dCA9PT0gY3VycmVudClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKGN1cnJlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBTdGF0ZS5lbnRyaWVzID0gZW50cmllcztcbiAgICBmdW5jdGlvbiBrZXlzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5tYXAoZW50cmllcyhzdGF0ZSwgcmFuZ2UpLCBFbnRyeS5rZXkpO1xuICAgIH1cbiAgICBTdGF0ZS5rZXlzID0ga2V5cztcbiAgICBmdW5jdGlvbiB2YWx1ZXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHN0YXRlLCByYW5nZSksIEVudHJ5LnZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUudmFsdWVzID0gdmFsdWVzO1xuICAgIGZ1bmN0aW9uIGZyb21FbnRyaWVzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IENhY2hlLmNyZWF0ZSgpLCBleGhhdXN0ZWQgPSBmYWxzZSwgY3VycmVudEtleSA9IG51bGwsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB2YXIgY2FjaGluZ0l0ZXJhdG9yID0ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4gaXRlcmF0b3IubmV4dCgpLnRoZW4oKHsgZG9uZSwgdmFsdWU6IGVudHJ5IH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICBleGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5wcmV2W0tleS5zZW50aW5lbF0gPSBQcm9taXNlLnJlc29sdmUoY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLm5leHRbY3VycmVudEtleV0gPSBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc2VudGluZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhY2hlLnByZXZbZW50cnlbMF1dID0gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgICAgIGNhY2hlLm5leHRbY3VycmVudEtleV0gPSBQcm9taXNlLnJlc29sdmUoZW50cnlbMF0pO1xuICAgICAgICAgICAgICAgIGNhY2hlLmdldFtlbnRyeVswXV0gPSBQcm9taXNlLnJlc29sdmUoZW50cnlbMV0pO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRLZXkgPSBlbnRyeVswXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lLCB2YWx1ZTogZW50cnkgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbihFbnRyeS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbigoKSA9PiBrZXkgaW4gY2FjaGUucHJldiA/IGNhY2hlLnByZXZba2V5XSA6IEtleS5OT1RfRk9VTkQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IEtleS5zZW50aW5lbCA6IHJlc3VsdC52YWx1ZVswXSk7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbigoKSA9PiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IEtleS5zZW50aW5lbCA6IHJlc3VsdC52YWx1ZVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHsgZ2V0LCBwcmV2LCBuZXh0IH0sIGNhY2hlKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUVudHJpZXMgPSBmcm9tRW50cmllcztcbiAgICBmdW5jdGlvbiBmcm9tS2V5cyhpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5tYXAoaXRlcmF0b3IsIGtleSA9PiBba2V5LCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tS2V5cyA9IGZyb21LZXlzO1xuICAgIGZ1bmN0aW9uIGZyb21WYWx1ZXMoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihpdGVyYXRvciwgKHByZXYsIHZhbHVlKSA9PiBbcHJldlswXSArIDEsIHZhbHVlXSwgWy0xLCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tVmFsdWVzID0gZnJvbVZhbHVlcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmcm9tVmFsdWVzKEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IuZnJvbU9iamVjdCh2YWx1ZXMpKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XG4gICAgZnVuY3Rpb24gbGF6eShmbikge1xuICAgICAgICB2YXIgc3RhdGUsIHByb21pc2UgPSBQcm9taXNlVXRpbHMubGF6eSgocmVzb2x2ZSwgcmVqZWN0KSA9PiByZXNvbHZlKFByb21pc2UucmVzb2x2ZShmbigpKS50aGVuKHMgPT4gc3RhdGUgPSBzKSkpO1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5nZXQoa2V5KSA6IHByb21pc2UudGhlbihzID0+IHMuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5wcmV2KGtleSkgOiBwcm9taXNlLnRoZW4ocyA9PiBzLnByZXYoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHN0YXRlLm5leHQoa2V5KSA6IHByb21pc2UudGhlbihzID0+IHMubmV4dChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgU3RhdGUubGF6eSA9IGxhenk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3Qoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnRvT2JqZWN0KGVudHJpZXMoc3RhdGUsIHJhbmdlKSk7XG4gICAgfVxuICAgIFN0YXRlLnRvT2JqZWN0ID0gdG9PYmplY3Q7XG4gICAgZnVuY3Rpb24gdG9BcnJheShzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IudG9BcnJheSh2YWx1ZXMoc3RhdGUsIHJhbmdlKSk7XG4gICAgfVxuICAgIFN0YXRlLnRvQXJyYXkgPSB0b0FycmF5O1xufSkoU3RhdGUgfHwgKFN0YXRlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXBcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCB2YXIgUGF0aDtcbihmdW5jdGlvbiAoUGF0aCkge1xuICAgIGZ1bmN0aW9uIGtleShwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBudWxsIDogSlNPTi5zdHJpbmdpZnkocGF0aCk7XG4gICAgfVxuICAgIFBhdGgua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGZyb21LZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkgPT0gbnVsbCA/IG51bGwgOiBrZXkudG9TdHJpbmcoKS5zcGxpdCgnLycpO1xuICAgIH1cbiAgICBQYXRoLmZyb21LZXkgPSBmcm9tS2V5O1xuICAgIGZ1bmN0aW9uIHRvS2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBwYXRoLmpvaW4oJy8nKTtcbiAgICB9XG4gICAgUGF0aC50b0tleSA9IHRvS2V5O1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbaW5kZXhdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gdGFpbChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBbXSA6IHBhdGguc2xpY2UoMSwgcGF0aC5sZW5ndGgpO1xuICAgIH1cbiAgICBQYXRoLnRhaWwgPSB0YWlsO1xuICAgIGZ1bmN0aW9uIGFwcGVuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoYSkuY29uY2F0KGIpO1xuICAgIH1cbiAgICBQYXRoLmFwcGVuZCA9IGFwcGVuZDtcbn0pKFBhdGggfHwgKFBhdGggPSB7fSkpO1xuZXhwb3J0IHZhciBUcmVlO1xuKGZ1bmN0aW9uIChUcmVlKSB7XG4gICAgZnVuY3Rpb24gZ2V0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZCkudGhlbihzdGF0ZSA9PiBzdGF0ZS5nZXQodGFpbCkpO1xuICAgIH1cbiAgICBUcmVlLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwcmV2KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBwcmV2cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUucHJldigpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5wcmV2KCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBuZXh0cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUubmV4dCgpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKG5leHRzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IFtoZWFkLCBuZXh0XSA6IHBhdGhzLm5leHQoaGVhZCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5uZXh0ID0gbmV4dDtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZS5qcy5tYXBcbiJdfQ==
