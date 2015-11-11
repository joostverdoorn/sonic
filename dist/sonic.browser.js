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
    function take(iterator, count) {
        var i = 0;
        return {
            next: function next() {
                return ++i > count ? Promise.resolve(AsyncIterator.sentinel) : iterator.next();
            }
        };
    }
    AsyncIterator.take = take;
    function skip(iterator, count) {
        var i = 0;
        function next() {
            return i++ < count ? iterator.next().then(next) : iterator.next();
        }
        return { next: next };
    }
    AsyncIterator.skip = skip;
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
    function take(parent, count) {
        return fromEntries(_async_iterator2['default'].take(entries(parent), count));
    }
    State.take = take;
    function skip(parent, count) {
        return fromEntries(_async_iterator2['default'].skip(entries(parent), count));
    }
    State.skip = skip;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvZW50cnkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9rZXkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9sZW5zLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGlzdC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L29ic2VydmFibGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wYXRjaC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3Byb21pc2VfdXRpbHMuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9yYW5nZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3NvbmljLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qvc3RhdGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC90cmVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztvQkNBZ0IsT0FBTzs7OztBQUNoQixJQUFJLGFBQWEsQ0FBQzs7QUFDekIsQ0FBQyxVQUFVLGFBQWEsRUFBRTtBQUN0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U0FBQSxDQUFDLENBQy9CLElBQUksQ0FBQyxVQUFBLElBQUk7bUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7dUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7YUFBQSxDQUFDO1NBQUEsQ0FBQyxDQUFDO0tBQ3pIO0FBQ0QsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Q0FDcEIsQ0FBQSxDQUFFLElBQUksYUF6QkksSUFBSSxHQXlCSCxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDVCxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBBc3luY0l0ZXJhdG9yO1xuKGZ1bmN0aW9uIChBc3luY0l0ZXJhdG9yKSB7XG4gICAgQXN5bmNJdGVyYXRvci5zZW50aW5lbCA9IHsgZG9uZTogdHJ1ZSB9O1xuICAgIEFzeW5jSXRlcmF0b3IuRW1wdHkgPSB7XG4gICAgICAgIG5leHQ6ICgpID0+IFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLnNlbnRpbmVsKVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXZlcnkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICBmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IHRydWUgOiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHJlc3VsdC52YWx1ZSkpLnRoZW4oc2F0aXNmaWVkID0+IHNhdGlzZmllZCA/IGxvb3AoKSA6IGZhbHNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvb3AoKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5ldmVyeSA9IGV2ZXJ5O1xuICAgIGZ1bmN0aW9uIHNvbWUoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZXZlcnkoaXRlcmF0b3IsIHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUodmFsdWUpKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0KSkudGhlbihyZXN1bHQgPT4gIXJlc3VsdCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc29tZSA9IHNvbWU7XG4gICAgZnVuY3Rpb24gZm9yRWFjaChpdGVyYXRvciwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IFByb21pc2UucmVzb2x2ZShmbih2YWx1ZSkpLnRoZW4oKCkgPT4gdHJ1ZSkpLnRoZW4oKCkgPT4geyB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiByZWR1Y2UoaXRlcmF0b3IsIGZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBmb3JFYWNoKGl0ZXJhdG9yLCAodmFsdWUpID0+IFByb21pc2UucmVzb2x2ZShmbihtZW1vLCB2YWx1ZSkpLnRoZW4odmFsdWUgPT4geyBtZW1vID0gdmFsdWU7IH0pKS50aGVuKCgpID0+IG1lbW8pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnJlZHVjZSA9IHJlZHVjZTtcbiAgICBmdW5jdGlvbiBmaW5kKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUodmFsdWUpKS50aGVuKHNhdGlzZmllZCA9PiBzYXRpc2ZpZWQgPyAocmVzdWx0ID0gdmFsdWUsIHRydWUpIDogZmFsc2UpKS50aGVuKHNhdGlzZmllZCA9PiBzYXRpc2ZpZWQgPyByZXN1bHQgOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5maW5kID0gZmluZDtcbiAgICBmdW5jdGlvbiBpbmRleE9mKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHYgPT4gKGluZGV4KyssIHZhbHVlID09IHYpKS50aGVuKGZvdW5kID0+IGZvdW5kID8gaW5kZXggOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pbmRleE9mID0gaW5kZXhPZjtcbiAgICBmdW5jdGlvbiBhdChpdGVyYXRvciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZpbmQoaXRlcmF0b3IsICgpID0+IDAgPT09IGluZGV4LS0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmF0ID0gYXQ7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGlzKGl0ZXJhdG9yLCBvdGhlciwgZXF1YWxzID0gKGEsIGIpID0+IGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZXZlcnkoaXRlcmF0b3IsIHZhbHVlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5uZXh0KCkudGhlbihyZXN1bHQgPT4gIXJlc3VsdC5kb25lICYmIGVxdWFscyhyZXN1bHQudmFsdWUsIHZhbHVlKSk7XG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcyA/IG90aGVyLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSkgOiBmYWxzZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBtYXAoaXRlcmF0b3IsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBpdGVyYXRvci5uZXh0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLnNlbnRpbmVsKSA6IFByb21pc2UucmVzb2x2ZShtYXBGbihyZXN1bHQudmFsdWUpKS50aGVuKHZhbHVlID0+ICh7IGRvbmU6IGZhbHNlLCB2YWx1ZSB9KSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIoaXRlcmF0b3IsIGZpbHRlckZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gcmVzdWx0IDogUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHJlc3VsdC52YWx1ZSkpLnRoZW4oc2F0aXNmaWVkID0+IHNhdGlzZmllZCA/IHJlc3VsdCA6IG5leHQoKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IG5leHQgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gc2NhbihpdGVyYXRvciwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBpdGVyYXRvci5uZXh0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLnNlbnRpbmVsKSA6IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgcmVzdWx0LnZhbHVlKSkudGhlbih2YWx1ZSA9PiAoeyBkb25lOiBmYWxzZSwgdmFsdWU6IG1lbW8gPSB2YWx1ZSB9KSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHppcChpdGVyYXRvciwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IFByb21pc2UuYWxsKFtpdGVyYXRvci5uZXh0KCksIG90aGVyLm5leHQoKV0pLnRoZW4oKFtyZXN1bHQsIG90aGVyUmVzdWx0XSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSB8fCBvdGhlclJlc3VsdC5kb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zZW50aW5lbDtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IFtyZXN1bHQudmFsdWUsIG90aGVyUmVzdWx0LnZhbHVlXSB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gdGFrZShpdGVyYXRvciwgY291bnQpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4gKytpID4gY291bnQgPyBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5zZW50aW5lbCkgOiBpdGVyYXRvci5uZXh0KClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50YWtlID0gdGFrZTtcbiAgICBmdW5jdGlvbiBza2lwKGl0ZXJhdG9yLCBjb3VudCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gaSsrIDwgY291bnQgPyBpdGVyYXRvci5uZXh0KCkudGhlbihuZXh0KSA6IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBuZXh0IH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc2tpcCA9IHNraXA7XG4gICAgZnVuY3Rpb24gY29uY2F0KC4uLml0ZXJhdG9ycykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JzLnJlZHVjZSgobWVtbywgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRlZCA9IGZhbHNlLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbmV4dDogKCkgPT4gcXVldWUgPSBxdWV1ZS50aGVuKCgpID0+IHsgfSwgKCkgPT4geyB9KS50aGVuKCgpID0+IGl0ZXJhdGVkID8gdmFsdWUubmV4dCgpIDogbWVtby5uZXh0KCkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyAoaXRlcmF0ZWQgPSB0cnVlLCB2YWx1ZS5uZXh0KCkpIDogcmVzdWx0KSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIEFzeW5jSXRlcmF0b3IuRW1wdHkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSAtMSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4geyB9LCAoKSA9PiB7IH0pLnRoZW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCsrY3VycmVudCA+PSBhcnJheS5sZW5ndGggPyBBc3luY0l0ZXJhdG9yLnNlbnRpbmVsIDogeyBkb25lOiBmYWxzZSwgdmFsdWU6IGFycmF5W2N1cnJlbnRdIH0pKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICByZXR1cm4gZnJvbUFycmF5KE9iamVjdC5rZXlzKG9iamVjdCkubWFwKGtleSA9PiBba2V5LCBvYmplY3Rba2V5XV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSkgPT4gKG1lbW8ucHVzaCh2YWx1ZSksIG1lbW8pLCBbXSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3QoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIFtrZXksIHZhbHVlXSkgPT4gKG1lbW9ba2V5XSA9IHZhbHVlLCBtZW1vKSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9PYmplY3QgPSB0b09iamVjdDtcbn0pKEFzeW5jSXRlcmF0b3IgfHwgKEFzeW5jSXRlcmF0b3IgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQXN5bmNJdGVyYXRvcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXN5bmNfaXRlcmF0b3IuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQ2FjaGU7XG4oZnVuY3Rpb24gKENhY2hlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGV4dGVuZChjYWNoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gYXBwbHkoc3RhdGUsIGNhY2hlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUuZ2V0ID8gY2FjaGUuZ2V0W2tleV0gOiBjYWNoZS5nZXRba2V5XSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLnByZXYgPyBjYWNoZS5wcmV2W2tleV0gOiBjYWNoZS5wcmV2W2tleV0gPSBzdGF0ZS5wcmV2KGtleSkudGhlbihwcmV2ID0+IHsgY2FjaGUubmV4dFtwcmV2XSA9IFByb21pc2UucmVzb2x2ZShrZXkpOyByZXR1cm4gcHJldjsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUubmV4dCA/IGNhY2hlLm5leHRba2V5XSA6IGNhY2hlLm5leHRba2V5XSA9IHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4geyBjYWNoZS5wcmV2W25leHRdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBuZXh0OyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgQ2FjaGUuYXBwbHkgPSBhcHBseTtcbn0pKENhY2hlIHx8IChDYWNoZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBDYWNoZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGUuanMubWFwXG4iLCJleHBvcnQgdmFyIEVudHJ5O1xuKGZ1bmN0aW9uIChFbnRyeSkge1xuICAgIGZ1bmN0aW9uIGtleShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMF07XG4gICAgfVxuICAgIEVudHJ5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiB2YWx1ZShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnlbMV07XG4gICAgfVxuICAgIEVudHJ5LnZhbHVlID0gdmFsdWU7XG4gICAgZnVuY3Rpb24gaXMoZW50cnksIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBlbnRyeVswXSA9PT0gb3RoZXJbMF0gJiYgZW50cnlbMV0gPT09IG90aGVyWzFdO1xuICAgIH1cbiAgICBFbnRyeS5pcyA9IGlzO1xufSkoRW50cnkgfHwgKEVudHJ5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEVudHJ5O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnRyeS5qcy5tYXBcbiIsImltcG9ydCBQcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbnZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIEtleS5OT1RfRk9VTkRfRVJST1IgPSBuZXcgRXJyb3IoXCJObyBlbnRyeSBhdCB0aGUgc3BlY2lmaWVkIGtleVwiKTtcbiAgICBLZXkuTk9UX0ZPVU5EID0gUHJvbWlzZVV0aWxzLmxhenkoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KEtleS5OT1RfRk9VTkRfRVJST1IpKTtcbiAgICBLZXkuc2VudGluZWwgPSBudWxsO1xuICAgIHZhciB1bmlxdWVLZXkgPSAwO1xuICAgIGZ1bmN0aW9uIGtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleS50b1N0cmluZygpO1xuICAgIH1cbiAgICBLZXkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUtleSsrO1xuICAgIH1cbiAgICBLZXkuY3JlYXRlID0gY3JlYXRlO1xufSkoS2V5IHx8IChLZXkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgS2V5O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXkuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuZXhwb3J0IHZhciBMZW5zO1xuKGZ1bmN0aW9uIChMZW5zKSB7XG4gICAgZnVuY3Rpb24gY29tcG9zZShwYXJlbnQsIGxlbnMpIHtcbiAgICAgICAgdmFyIGdldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpLCBzZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxlbnMuZ2V0KSB9O1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XG4gICAgICAgIH0pLnN1YnNjcmliZShnZXRTdWJqZWN0KTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAoc2V0U3ViamVjdCwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5zZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhcmVudC5wYXRjaGVzKTtcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIGxlbnMuZ2V0KSwgeyBzdWJzY3JpYmU6IGdldFN1YmplY3Quc3Vic2NyaWJlLCBvbk5leHQ6IHNldFN1YmplY3Qub25OZXh0IH0pO1xuICAgIH1cbiAgICBMZW5zLmNvbXBvc2UgPSBjb21wb3NlO1xufSkoTGVucyB8fCAoTGVucyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBMZW5zO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZW5zLmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBSYW5nZSwgUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgTGlzdDtcbihmdW5jdGlvbiAoTGlzdCkge1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIG1hcEZuKSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiAoe1xuICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBtYXBGbikgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmlsdGVyKHBhcmVudC5zdGF0ZSwgZmlsdGVyRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kKFN0YXRlLmVudHJpZXMoU3RhdGUucmV2ZXJzZShzdGF0ZSksIFtQb3NpdGlvbi5yZXZlcnNlKHBhdGNoLnJhbmdlWzBdKSwgeyBwcmV2OiBudWxsIH1dKSwgZW50cnkgPT4gZmlsdGVyRm4oZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihuZXh0ID0+ICh7IG5leHQ6IG5leHRbMF0gfSkpLFxuICAgICAgICAgICAgICAgIEFzeW5jSXRlcmF0b3IuZmluZChTdGF0ZS5lbnRyaWVzKHN0YXRlLCBbcGF0Y2gucmFuZ2VbMV0sIHsgcHJldjogbnVsbCB9XSksIGVudHJ5ID0+IGZpbHRlckZuKGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4ocHJldiA9PiAoeyBwcmV2OiBwcmV2WzBdIH0pKVxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLmZpbHRlcihwYXRjaC5hZGRlZCwgZmlsdGVyRm4pIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzLCAob2xkU3RhdGUsIHBhdGNoZXMpID0+IHN0YXRlID0gUGF0Y2guYXBwbHkob2xkU3RhdGUsIHBhdGNoZXMpKTtcbiAgICB9XG4gICAgTGlzdC5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIHN0YXRlID0gU3RhdGUuem9vbShwYXJlbnQuc3RhdGUsIGtleSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChPYnNlcnZhYmxlLmZpbHRlcihwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShTdGF0ZS5lbnRyaWVzKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSksIGVudHJ5ID0+IGVudHJ5WzBdID09PSBrZXkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHBhdGNoLmFkZGVkID8gU3RhdGUuaGFzKHBhdGNoLmFkZGVkLCBrZXkpIDogcmVzKTtcbiAgICAgICAgfSksIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogUmFuZ2UuYWxsLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLnpvb20ocGF0Y2guYWRkZWQsIGtleSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICB2YXIgcGF0Y2hlc18gPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICB2YXIgcGFyZW50XyA9IGNhY2hlKG1hcChwYXJlbnQsICgobGlzdCwga2V5KSA9PiB7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLm1hcChsaXN0LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGUucHJldihLZXkuc2VudGluZWwpLnRoZW4obmV4dCA9PiAoeyBuZXh0OiBQYXRoLnRvS2V5KFtrZXksIG5leHRdKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBwcmV2OiBQYXRoLnRvS2V5KFtrZXksIHBvc2l0aW9uLnByZXZdKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5uZXh0ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5uZXh0KEtleS5zZW50aW5lbCkudGhlbihwcmV2ID0+ICh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcHJldl0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ubmV4dF0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBwYXRjaC5hZGRlZCA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGU7XG4gICAgICAgIH0pKSk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLnByZXYgPT09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZSh7IHByZXY6IEtleS5zZW50aW5lbCB9KSA6IFRyZWUubmV4dChwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ucHJldl0pLnRoZW4oUGF0aC50b0tleSkudGhlbihwcmV2ID0+ICh7IHByZXYgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IEtleS5zZW50aW5lbCB9KSA6IFRyZWUucHJldihwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ubmV4dF0pLnRoZW4oUGF0aC50b0tleSkudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7IHJhbmdlOiByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmxhdHRlbihTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxpc3QgPT4gbGlzdC5zdGF0ZSkpIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhdGNoZXNfKTtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmxhdHRlbihwYXJlbnRfLnN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlc18pO1xuICAgIH1cbiAgICBMaXN0LmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIHNjYW4ocGFyZW50LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuc2NhbihwYXJlbnQuc3RhdGUsIHNjYW5GbiwgbWVtbyksIGxpc3QsIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgdmFyIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlLCBsaXN0U3RhdGUgPSBsaXN0LnN0YXRlLCByYW5nZSA9IFtwYXRjaC5yYW5nZVswXSwgeyBwcmV2OiBudWxsIH1dLCBhZGRlZCA9IFN0YXRlLmxhenkoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBTdGF0ZS5sYXN0KGxpc3RTdGF0ZSwgW3sgbmV4dDogbnVsbCB9LCBwYXRjaC5yYW5nZVswXV0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKG1lbW8gPT4gU3RhdGUuc2NhbihTdGF0ZS5zbGljZShwYXJlbnRTdGF0ZSwgW3BhdGNoLnJhbmdlWzBdLCB7IHByZXY6IG51bGwgfV0pLCBzY2FuRm4sIG1lbW8pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2UsIGFkZGVkIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGlzdCA9IGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3Quc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLmNhY2hlKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGBgO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0LmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXRlLCBwYXRjaGVzLCByZWR1Y2VyID0gUGF0Y2guYXBwbHkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHsgc3RhdGUsIHBhdGNoZXMgfTtcbiAgICAgICAgT2JzZXJ2YWJsZS5zY2FuKHBhdGNoZXMsIHJlZHVjZXIsIHN0YXRlKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiAoc3RhdGUpID0+IHsgbGlzdC5zdGF0ZSA9IHN0YXRlOyB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShMaXN0IHx8IChMaXN0ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3QuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgRGlzcG9zYWJsZTtcbihmdW5jdGlvbiAoRGlzcG9zYWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaXNwb3Nlcikge1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlIHx8IChEaXNwb3NhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgT2JzZXJ2YWJsZTtcbihmdW5jdGlvbiAoT2JzZXJ2YWJsZSkge1xuICAgIGZ1bmN0aW9uIG1hcChvYnNlcnZhYmxlLCBtYXBGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUobWFwRm4odmFsdWUpKS50aGVuKHN1YmplY3Qub25OZXh0KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIob2JzZXJ2YWJsZSwgZmlsdGVyRm4pIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gc3ViamVjdC5vbk5leHQodmFsdWUpIDogdW5kZWZpbmVkKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKG9ic2VydmFibGUsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW8sIHZhbHVlKSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgc3ViamVjdC5vbk5leHQodmFsdWUpOyB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnNjYW4gPSBzY2FuO1xufSkoT2JzZXJ2YWJsZSB8fCAoT2JzZXJ2YWJsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFN1YmplY3Q7XG4oZnVuY3Rpb24gKFN1YmplY3QpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyS2V5ID0gS2V5LmNyZWF0ZSgpO1xuICAgICAgICAgICAgb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSA9IG9ic2VydmVyO1xuICAgICAgICAgICAgcmV0dXJuIERpc3Bvc2FibGUuY3JlYXRlKCgpID0+IGRlbGV0ZSBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbk5leHQodmFsdWUpKSkudGhlbigoKSA9PiB7IH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUsIG9uTmV4dCB9O1xuICAgIH1cbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN1YmplY3QgfHwgKFN1YmplY3QgPSB7fSkpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuO1xuZXhwb3J0IHZhciBQYXRjaDtcbihmdW5jdGlvbiAoUGF0Y2gpIHtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLnNwbGljZShzdGF0ZSwgcGF0Y2gucmFuZ2UsIHBhdGNoLmFkZGVkKTtcbiAgICB9XG4gICAgUGF0Y2guYXBwbHkgPSBhcHBseTtcbn0pKFBhdGNoIHx8IChQYXRjaCA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQYXRjaDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0Y2guanMubWFwXG4iLCIvLyB0eXBlIEp1c3Q8Vj4gPSBbVl07XG4vLyB0eXBlIE5vdGhpbmc8Vj4gPSBBcnJheTxWPiAmIHsgMDogdm9pZCB9XG4vLyB0eXBlIE1heWJlPFY+ID0gSnVzdDxWPiB8IE5vdGhpbmc8Vj47XG5leHBvcnQgdmFyIFByb21pc2VVdGlscztcbihmdW5jdGlvbiAoUHJvbWlzZVV0aWxzKSB7XG4gICAgZnVuY3Rpb24gbGF6eShleGVjdXRvcikge1xuICAgICAgICB2YXIgcHJvbWlzZTtcbiAgICAgICAgZnVuY3Rpb24gdGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xuICAgICAgICAgICAgaWYgKHByb21pc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgICAgICByZXR1cm4gKHByb21pc2UgPSBuZXcgUHJvbWlzZShleGVjdXRvcikpLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyB0aGVuIH0pO1xuICAgIH1cbiAgICBQcm9taXNlVXRpbHMubGF6eSA9IGxhenk7XG59KShQcm9taXNlVXRpbHMgfHwgKFByb21pc2VVdGlscyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQcm9taXNlVXRpbHM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2VfdXRpbHMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgUmFuZ2UuYWxsID0gW3sgbmV4dDogS2V5LnNlbnRpbmVsIH0sIHsgcHJldjogS2V5LnNlbnRpbmVsIH1dO1xufSkoUmFuZ2UgfHwgKFJhbmdlID0ge30pKTtcbmV4cG9ydCB2YXIgUG9zaXRpb247XG4oZnVuY3Rpb24gKFBvc2l0aW9uKSB7XG4gICAgZnVuY3Rpb24gaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICdwcmV2JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24gPSBpc1ByZXZQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiBpc05leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ25leHQnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbiA9IGlzTmV4dFBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSA/IHsgbmV4dDogcG9zaXRpb24ucHJldiB9IDogeyBwcmV2OiBwb3NpdGlvbi5uZXh0IH07XG4gICAgfVxuICAgIFBvc2l0aW9uLnJldmVyc2UgPSByZXZlcnNlO1xufSkoUG9zaXRpb24gfHwgKFBvc2l0aW9uID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFJhbmdlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5nZS5qcy5tYXBcbiIsImltcG9ydCBfU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgX0FzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0IGFzIF9MaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCBfVHJlZSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IF9DYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IFN1YmplY3QgYXMgX1N1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IF9Qcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbmltcG9ydCBfTGVucyBmcm9tICcuL2xlbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9MaXN0LmNyZWF0ZShfU3RhdGUuZnJvbUFycmF5KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tT2JqZWN0KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbn1cbmV4cG9ydCB2YXIgU29uaWM7XG4oZnVuY3Rpb24gKFNvbmljKSB7XG4gICAgU29uaWMuU3RhdGUgPSBfU3RhdGU7XG4gICAgU29uaWMuQXN5bmNJdGVyYXRvciA9IF9Bc3luY0l0ZXJhdG9yO1xuICAgIFNvbmljLkxpc3QgPSBfTGlzdDtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuU3ViamVjdCA9IF9TdWJqZWN0O1xuICAgIFNvbmljLkNhY2hlID0gX0NhY2hlO1xuICAgIFNvbmljLlByb21pc2VVdGlscyA9IF9Qcm9taXNlVXRpbHM7XG4gICAgU29uaWMuTGVucyA9IF9MZW5zO1xufSkoU29uaWMgfHwgKFNvbmljID0ge30pKTtcbjtcbm1vZHVsZS5leHBvcnRzID0gU29uaWM7XG5leHBvcnQgZGVmYXVsdCBTb25pYztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29uaWMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBFbnRyeSBmcm9tICcuL2VudHJ5JztcbmltcG9ydCB7IFBvc2l0aW9uLCBSYW5nZSB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCBQcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbmV4cG9ydCB2YXIgU3RhdGU7XG4oZnVuY3Rpb24gKFN0YXRlKSB7XG4gICAgU3RhdGUuRW1wdHkgPSB7XG4gICAgICAgIGdldDogKGtleSkgPT4gS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgcHJldjogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ga2V5ID09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgbmV4dDogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ga2V5ID09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORFxuICAgIH07XG4gICAgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgICAgIGlmIChnZXQpXG4gICAgICAgICAgICBzdGF0ZS5nZXQgPSBnZXQ7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgc3RhdGUucHJldiA9IHByZXY7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgc3RhdGUubmV4dCA9IG5leHQ7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgU3RhdGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGZpcnN0KHN0YXRlLCBbZnJvbSwgdG9dID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IHN0YXRlLmdldChmcm9tLnByZXYpIDogc3RhdGUubmV4dChmcm9tLm5leHQpLnRoZW4oc3RhdGUuZ2V0KTtcbiAgICB9XG4gICAgU3RhdGUuZmlyc3QgPSBmaXJzdDtcbiAgICBmdW5jdGlvbiBsYXN0KHN0YXRlLCBbZnJvbSwgdG9dID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBzdGF0ZS5nZXQodG8ubmV4dCkgOiBzdGF0ZS5wcmV2KHRvLnByZXYpLnRoZW4oc3RhdGUuZ2V0KTtcbiAgICB9XG4gICAgU3RhdGUubGFzdCA9IGxhc3Q7XG4gICAgZnVuY3Rpb24gaGFzKHN0YXRlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4oKCkgPT4gdHJ1ZSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IGZhbHNlIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSk7XG4gICAgfVxuICAgIFN0YXRlLmhhcyA9IGhhcztcbiAgICBmdW5jdGlvbiBpcyhzdGF0ZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gZW50cmllcyhzdGF0ZSksIG90aGVySXRlcmF0b3IgPSBlbnRyaWVzKG90aGVyKTtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuaXMoaXRlcmF0b3IsIG90aGVySXRlcmF0b3IsIEVudHJ5LmlzKTtcbiAgICB9XG4gICAgU3RhdGUuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBjb250YWlucyhzdGF0ZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShlbnRyaWVzKHN0YXRlKSwgZW50cnkgPT4gZW50cnlbMV0gPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBpc0VtcHR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCk7XG4gICAgfVxuICAgIFN0YXRlLmlzRW1wdHkgPSBpc0VtcHR5O1xuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGVudHJpZXMocGFyZW50LCByYW5nZSkpO1xuICAgIH1cbiAgICBTdGF0ZS5zbGljZSA9IHNsaWNlO1xuICAgIGZ1bmN0aW9uIHNwbGljZShwYXJlbnQsIHJhbmdlLCBjaGlsZCkge1xuICAgICAgICB2YXIgZGVsZXRlZCA9IHNsaWNlKHBhcmVudCwgcmFuZ2UpLCBmaWx0ZXJlZCA9IGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBkZWxldGVkLmdldChrZXkpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpKTtcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgICAgIHZhciBicmlkZ2VkQ2hpbGQsIGJyaWRnZWRQYXJlbnQsIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgYnJpZGdlZENoaWxkID0gZXh0ZW5kKGNoaWxkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gY2hpbGQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmV2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBQcm9taXNlLnJlc29sdmUoZnJvbS5uZXh0KSA6IHBhcmVudC5wcmV2KGZyb20ucHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAhPT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5leHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgPyBQcm9taXNlLnJlc29sdmUodG8ucHJldikgOiBwYXJlbnQubmV4dCh0by5uZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBicmlkZ2VkUGFyZW50ID0gZXh0ZW5kKGZpbHRlcmVkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gcGFyZW50LnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgcHJldiA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBwcmV2KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogcHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIG5leHQgPT09IGZyb20ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogbmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhjaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQuZ2V0KGtleSkgOiBicmlkZ2VkUGFyZW50LmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBrZXkgPT09IHRvLnByZXYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQubmV4dChrZXkpIDogYnJpZGdlZFBhcmVudC5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5zcGxpY2UgPSBzcGxpY2U7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIHByZXY6IHBhcmVudC5uZXh0LFxuICAgICAgICAgICAgbmV4dDogcGFyZW50LnByZXZcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnJldmVyc2UgPSByZXZlcnNlO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBtYXBGbih2YWx1ZSwga2V5KSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBoYXZlKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZSA/IGNhY2hlW2tleV0gOiBjYWNoZVtrZXldID0gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gZmlsdGVyRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXZlKGtleSkudGhlbihyZXMgPT4gcmVzID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQucHJldihrZXkpLnRoZW4ocCA9PiBwID09PSBLZXkuc2VudGluZWwgPyBLZXkuc2VudGluZWwgOiBoYXZlKHApLnRoZW4ocmVzID0+IHJlcyA/IHAgOiBwcmV2KHApKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQubmV4dChrZXkpLnRoZW4obiA9PiBuID09PSBLZXkuc2VudGluZWwgPyBLZXkuc2VudGluZWwgOiBoYXZlKG4pLnRoZW4ocmVzID0+IHJlcyA/IG4gOiBuZXh0KG4pKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHsgZ2V0LCBwcmV2LCBuZXh0IH0pO1xuICAgIH1cbiAgICBTdGF0ZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gc2NhbihwYXJlbnQsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5zY2FuKGVudHJpZXMocGFyZW50KSwgKG1lbW9FbnRyeSwgZW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW9FbnRyeVsxXSwgZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihyZXN1bHQgPT4gW2VudHJ5WzBdLCByZXN1bHRdKTtcbiAgICAgICAgfSwgW0tleS5zZW50aW5lbCwgbWVtb10pKTtcbiAgICB9XG4gICAgU3RhdGUuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gemlwKHBhcmVudCwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZyb21WYWx1ZXMoQXN5bmNJdGVyYXRvci56aXAodmFsdWVzKHBhcmVudCksIHZhbHVlcyhvdGhlcikpKTtcbiAgICB9XG4gICAgU3RhdGUuemlwID0gemlwO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IChrID0gS2V5LnNlbnRpbmVsKSA9PiBrID09PSBLZXkuc2VudGluZWwgPyBwYXJlbnQuZ2V0KGtleSkudGhlbigoKSA9PiBrZXksIHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBLZXkuc2VudGluZWwgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKSA6IChrZXkgPT09IGsgPyBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKSA6IEtleS5OT1RfRk9VTkQpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrID0+IGsgPT09IGtleSA/IHBhcmVudC5nZXQoa2V5KSA6IEtleS5OT1RfRk9VTkQsXG4gICAgICAgICAgICBwcmV2OiBuZXh0LFxuICAgICAgICAgICAgbmV4dDogbmV4dFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuem9vbSA9IHpvb207XG4gICAgZnVuY3Rpb24gZmxhdHRlbihwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDoga2V5ID0+IFRyZWUuZ2V0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLFxuICAgICAgICAgICAgcHJldjoga2V5ID0+IFRyZWUucHJldihwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKS50aGVuKFBhdGgudG9LZXkpLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IFRyZWUubmV4dChwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKS50aGVuKFBhdGgudG9LZXkpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5mbGF0dGVuID0gZmxhdHRlbjtcbiAgICBmdW5jdGlvbiBrZXlCeShwYXJlbnQsIGtleUZuKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHBhcmVudCksIGVudHJ5ID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5Rm4oZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihrZXkgPT4gW2tleSwgZW50cnlbMV1dKTtcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICBTdGF0ZS5rZXlCeSA9IGtleUJ5O1xuICAgIGZ1bmN0aW9uIHRha2UocGFyZW50LCBjb3VudCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci50YWtlKGVudHJpZXMocGFyZW50KSwgY291bnQpKTtcbiAgICB9XG4gICAgU3RhdGUudGFrZSA9IHRha2U7XG4gICAgZnVuY3Rpb24gc2tpcChwYXJlbnQsIGNvdW50KSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLnNraXAoZW50cmllcyhwYXJlbnQpLCBjb3VudCkpO1xuICAgIH1cbiAgICBTdGF0ZS5za2lwID0gc2tpcDtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHBhcmVudCwgQ2FjaGUuY3JlYXRlKCkpO1xuICAgIH1cbiAgICBTdGF0ZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIGVudHJpZXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gS2V5LnNlbnRpbmVsLCBkb25lID0gZmFsc2UsIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoZG9uZSA9IHRydWUsIFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLnNlbnRpbmVsKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5nZXQoa2V5KS50aGVuKHZhbHVlID0+IChjdXJyZW50ID0ga2V5LCB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogW2tleSwgdmFsdWVdIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiB0by5wcmV2ID09PSBuZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQobmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgZnJvbS5uZXh0ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pID8gZ2V0KGZyb20ucHJldikgOiBpdGVyYXRlKGZyb20ubmV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiB0by5uZXh0ID09PSBjdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUoY3VycmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0YXRlLmVudHJpZXMgPSBlbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGtleXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHN0YXRlLCByYW5nZSksIEVudHJ5LmtleSk7XG4gICAgfVxuICAgIFN0YXRlLmtleXMgPSBrZXlzO1xuICAgIGZ1bmN0aW9uIHZhbHVlcyhzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IubWFwKGVudHJpZXMoc3RhdGUsIHJhbmdlKSwgRW50cnkudmFsdWUpO1xuICAgIH1cbiAgICBTdGF0ZS52YWx1ZXMgPSB2YWx1ZXM7XG4gICAgZnVuY3Rpb24gZnJvbUVudHJpZXMoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gQ2FjaGUuY3JlYXRlKCksIGV4aGF1c3RlZCA9IGZhbHNlLCBjdXJyZW50S2V5ID0gbnVsbCwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHZhciBjYWNoaW5nSXRlcmF0b3IgPSB7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBpdGVyYXRvci5uZXh0KCkudGhlbigoeyBkb25lLCB2YWx1ZTogZW50cnkgfSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aGF1c3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLnByZXZbS2V5LnNlbnRpbmVsXSA9IFByb21pc2UucmVzb2x2ZShjdXJyZW50S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUubmV4dFtjdXJyZW50S2V5XSA9IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zZW50aW5lbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FjaGUucHJldltlbnRyeVswXV0gPSBQcm9taXNlLnJlc29sdmUoY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgY2FjaGUubmV4dFtjdXJyZW50S2V5XSA9IFByb21pc2UucmVzb2x2ZShlbnRyeVswXSk7XG4gICAgICAgICAgICAgICAgY2FjaGUuZ2V0W2VudHJ5WzBdXSA9IFByb21pc2UucmVzb2x2ZShlbnRyeVsxXSk7XG4gICAgICAgICAgICAgICAgY3VycmVudEtleSA9IGVudHJ5WzBdO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmUsIHZhbHVlOiBlbnRyeSB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KS50aGVuKEVudHJ5LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KS50aGVuKCgpID0+IGtleSBpbiBjYWNoZS5wcmV2ID8gY2FjaGUucHJldltrZXldIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBjdXJyZW50S2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gS2V5LnNlbnRpbmVsIDogcmVzdWx0LnZhbHVlWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KS50aGVuKCgpID0+IGNhY2hpbmdJdGVyYXRvci5uZXh0KCkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gS2V5LnNlbnRpbmVsIDogcmVzdWx0LnZhbHVlWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkoeyBnZXQsIHByZXYsIG5leHQgfSwgY2FjaGUpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tRW50cmllcyA9IGZyb21FbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGZyb21LZXlzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLm1hcChpdGVyYXRvciwga2V5ID0+IFtrZXksIG51bGxdKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21LZXlzID0gZnJvbUtleXM7XG4gICAgZnVuY3Rpb24gZnJvbVZhbHVlcyhpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5zY2FuKGl0ZXJhdG9yLCAocHJldiwgdmFsdWUpID0+IFtwcmV2WzBdICsgMSwgdmFsdWVdLCBbLTEsIG51bGxdKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21WYWx1ZXMgPSBmcm9tVmFsdWVzO1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZyb21WYWx1ZXMoQXN5bmNJdGVyYXRvci5mcm9tQXJyYXkodmFsdWVzKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiBsYXp5KGZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSwgcHJvbWlzZSA9IFByb21pc2VVdGlscy5sYXp5KChyZXNvbHZlLCByZWplY3QpID0+IHJlc29sdmUoUHJvbWlzZS5yZXNvbHZlKGZuKCkpLnRoZW4ocyA9PiBzdGF0ZSA9IHMpKSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHN0YXRlLmdldChrZXkpIDogcHJvbWlzZS50aGVuKHMgPT4gcy5nZXQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHN0YXRlLnByZXYoa2V5KSA6IHByb21pc2UudGhlbihzID0+IHMucHJldihrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gc3RhdGUubmV4dChrZXkpIDogcHJvbWlzZS50aGVuKHMgPT4gcy5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5sYXp5ID0gbGF6eTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IudG9PYmplY3QoZW50cmllcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9PYmplY3QgPSB0b09iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci50b0FycmF5KHZhbHVlcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9BcnJheSA9IHRvQXJyYXk7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXRlLmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHZhciBQYXRoO1xuKGZ1bmN0aW9uIChQYXRoKSB7XG4gICAgZnVuY3Rpb24ga2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gZnJvbUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IGtleS50b1N0cmluZygpLnNwbGl0KCcvJyk7XG4gICAgfVxuICAgIFBhdGguZnJvbUtleSA9IGZyb21LZXk7XG4gICAgZnVuY3Rpb24gdG9LZXkocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gbnVsbCA6IHBhdGguam9pbignLycpO1xuICAgIH1cbiAgICBQYXRoLnRvS2V5ID0gdG9LZXk7XG4gICAgZnVuY3Rpb24gaGVhZChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aFswXSA6IG51bGw7XG4gICAgfVxuICAgIFBhdGguaGVhZCA9IGhlYWQ7XG4gICAgZnVuY3Rpb24gZ2V0KHBhdGgsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aFtpbmRleF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiB0YWlsKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IFtdIDogcGF0aC5zbGljZSgxLCBwYXRoLmxlbmd0aCk7XG4gICAgfVxuICAgIFBhdGgudGFpbCA9IHRhaWw7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChhKS5jb25jYXQoYik7XG4gICAgfVxuICAgIFBhdGguYXBwZW5kID0gYXBwZW5kO1xufSkoUGF0aCB8fCAoUGF0aCA9IHt9KSk7XG5leHBvcnQgdmFyIFRyZWU7XG4oZnVuY3Rpb24gKFRyZWUpIHtcbiAgICBmdW5jdGlvbiBnZXQodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguZ2V0KHBhdGgsIDApLCB0YWlsID0gUGF0aC5nZXQocGF0aCwgMSk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKS50aGVuKHN0YXRlID0+IHN0YXRlLmdldCh0YWlsKSk7XG4gICAgfVxuICAgIFRyZWUuZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHByZXYodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguZ2V0KHBhdGgsIDApLCB0YWlsID0gUGF0aC5nZXQocGF0aCwgMSksIHByZXZzID0gU3RhdGUuZmlsdGVyKFN0YXRlLm1hcCh0cmVlLCBzdGF0ZSA9PiBzdGF0ZS5wcmV2KCkpLCBmaXJzdCA9PiBmaXJzdCAhPSBudWxsKSwgcGF0aHMgPSBTdGF0ZS5tYXAocHJldnMsIChmaXJzdCwga2V5KSA9PiBba2V5LCBmaXJzdF0pO1xuICAgICAgICBpZiAoaGVhZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLnByZXYoKS50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcGF0aHMuZ2V0KHByZXYpIDogbnVsbCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKVxuICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gc3RhdGUucHJldih0YWlsKSlcbiAgICAgICAgICAgIC50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gW2hlYWQsIHByZXZdIDogcGF0aHMucHJldihoZWFkKS50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcGF0aHMuZ2V0KHByZXYpIDogbnVsbCkpO1xuICAgIH1cbiAgICBUcmVlLnByZXYgPSBwcmV2O1xuICAgIGZ1bmN0aW9uIG5leHQodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguZ2V0KHBhdGgsIDApLCB0YWlsID0gUGF0aC5nZXQocGF0aCwgMSksIG5leHRzID0gU3RhdGUuZmlsdGVyKFN0YXRlLm1hcCh0cmVlLCBzdGF0ZSA9PiBzdGF0ZS5uZXh0KCkpLCBmaXJzdCA9PiBmaXJzdCAhPSBudWxsKSwgcGF0aHMgPSBTdGF0ZS5tYXAobmV4dHMsIChmaXJzdCwga2V5KSA9PiBba2V5LCBmaXJzdF0pO1xuICAgICAgICBpZiAoaGVhZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gcGF0aHMuZ2V0KG5leHQpIDogbnVsbCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKVxuICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gc3RhdGUubmV4dCh0YWlsKSlcbiAgICAgICAgICAgIC50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gW2hlYWQsIG5leHRdIDogcGF0aHMubmV4dChoZWFkKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gcGF0aHMuZ2V0KG5leHQpIDogbnVsbCkpO1xuICAgIH1cbiAgICBUcmVlLm5leHQgPSBuZXh0O1xufSkoVHJlZSB8fCAoVHJlZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBUcmVlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVlLmpzLm1hcFxuIl19
