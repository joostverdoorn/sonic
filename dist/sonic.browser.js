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
        return findKey(iterator, predicate).then(iterator.get);
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
            var iterated = false;
            return {
                get: function get() {
                    return iterated ? value.get() : memo.get();
                },
                next: function next() {
                    return iterated ? value.next() : memo.next().then(function (key) {
                        return key !== _key3['default'].sentinel ? key : (iterated = true, value.next());
                    });
                }
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromEntries(entries) {
        var current = -1;
        return {
            get: function get() {
                return current === -1 ? _key3['default'].NOT_FOUND : Promise.resolve(entries[current][1]);
            },
            next: function next() {
                return Promise.resolve(++current === entries.length ? _key3['default'].sentinel : entries[current][0]);
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
        function get(key) {
            return parent.get(key).then(function (value) {
                return Promise.resolve(filterFn(value, key)).then(function (res) {
                    return res ? value : _key2['default'].NOT_FOUND;
                });
            });
        }
        function prev(key) {
            return parent.prev(key).then(function (p) {
                return p === null ? null : parent.get(p).then(function (value) {
                    return filterFn(value, p);
                }).then(function (result) {
                    return result ? p : prev(p);
                });
            });
        }
        function next(key) {
            return parent.next(key).then(function (n) {
                return n === null ? null : parent.get(n).then(function (value) {
                    return filterFn(value, n);
                }).then(function (result) {
                    return result ? n : next(n);
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
        var keys = Object.keys(values),
            indexByKey = keys.reduce(function (memo, key, index) {
            memo[key] = index;
            return memo;
        }, Object.create(null));
        return {
            get: function get(key) {
                return key in values ? Promise.resolve(values[key]) : _key2['default'].NOT_FOUND;
            },
            prev: function prev(key) {
                if (key == null) return Promise.resolve(keys[keys.length - 1]);
                if (!(key in indexByKey)) return _key2['default'].NOT_FOUND;
                var index = indexByKey[key];
                if (index === 0) return Promise.resolve(null);
                return Promise.resolve(keys[index - 1]);
            },
            next: function next(key) {
                if (key == null) return Promise.resolve(keys[0]);
                if (!(key in indexByKey)) return _key2['default'].NOT_FOUND;
                var index = indexByKey[key];
                if (index === keys.length - 1) return Promise.resolve(null);
                return Promise.resolve(keys[index + 1]);
            }
        };
    }
    State.fromObject = fromObject;
    function fromIterator(iterator) {
        var cache = _cache2['default'].create(),
            exhausted = false,
            currentKey = null;
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
            if (key === currentKey) return cachingIterator.get();
            return _async_iterator2['default'].find(cachingIterator, function (value, k) {
                return k === key;
            });
        }
        function prev(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return _async_iterator2['default'].some(cachingIterator, function (value, k) {
                return k === key;
            }).then(function () {
                return cache.prev[key];
            });
        }
        function next(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            if (key === currentKey) return cachingIterator.next();
            return _async_iterator2['default'].findKey(cachingIterator, function (value, k) {
                return k === key;
            }).then(function () {
                return cachingIterator.next();
            });
        }
        return _cache2['default'].apply({ get: get, prev: prev, next: next }, cache);
    }
    State.fromIterator = fromIterator;
    function toIterator(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var current = _key2['default'].sentinel;
        function get() {
            return state.get(current);
        }
        function next() {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9hc3luY19pdGVyYXRvci5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvbGVucy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9vYnNlcnZhYmxlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcGF0Y2guanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9wcm9taXNlX3V0aWxzLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvcmFuZ2UuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMvZGlzdC9zb25pYy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYy9kaXN0L3N0YXRlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljL2Rpc3QvdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O29CQ0FnQixPQUFPOzs7O0FBQ2hCLElBQUksYUFBYSxDQUFDOztBQUN6QixDQUFDLFVBQVUsYUFBYSxFQUFFO0FBQ3RCLGlCQUFhLENBQUMsS0FBSyxHQUFHO0FBQ2xCLFdBQUcsRUFBRTttQkFBTSxpQkFBSSxTQUFT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QUM7cUJBQ1QsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQXN5bmNJdGVyYXRvcjtcbihmdW5jdGlvbiAoQXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jSXRlcmF0b3IuRW1wdHkgPSB7XG4gICAgICAgIGdldDogKCkgPT4gS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgbmV4dDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbClcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV4dGVuZChpdGVyYXRvciwgcGFydGlhbCkge1xuICAgICAgICBpdGVyYXRvciA9IE9iamVjdC5jcmVhdGUoaXRlcmF0b3IpO1xuICAgICAgICBpZiAoJ2dldCcgaW4gcGFydGlhbClcbiAgICAgICAgICAgIGl0ZXJhdG9yLmdldCA9IHBhcnRpYWwuZ2V0O1xuICAgICAgICBpZiAoJ25leHQnIGluIHBhcnRpYWwpXG4gICAgICAgICAgICBpdGVyYXRvci5uZXh0ID0gcGFydGlhbC5uZXh0O1xuICAgICAgICByZXR1cm4gaXRlcmF0b3I7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGV2ZXJ5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCkudGhlbihrZXkgPT4ga2V5ID09IG51bGwgfHwgaXRlcmF0b3IuZ2V0KCkudGhlbih2YWx1ZSA9PiBwcmVkaWNhdGUodmFsdWUsIGtleSkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IGxvb3AoKSA6IGZhbHNlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvb3AoKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5ldmVyeSA9IGV2ZXJ5O1xuICAgIGZ1bmN0aW9uIHNvbWUoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSwga2V5KSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHZhbHVlLCBrZXkpKS50aGVuKHJlc3VsdCA9PiAhcmVzdWx0KSkudGhlbihyZXN1bHQgPT4gIXJlc3VsdCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc29tZSA9IHNvbWU7XG4gICAgZnVuY3Rpb24gZm9yRWFjaChpdGVyYXRvciwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKGZuKHZhbHVlLCBrZXkpKS50aGVuKCgpID0+IHRydWUpKS50aGVuKCgpID0+IHsgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gcmVkdWNlKGl0ZXJhdG9yLCBmbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gZm9yRWFjaChpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShmbihtZW1vLCB2YWx1ZSwga2V5KSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgfSkpLnRoZW4oKCkgPT4gbWVtbyk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IucmVkdWNlID0gcmVkdWNlO1xuICAgIGZ1bmN0aW9uIGZpbmRLZXkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgKHYsIGspID0+IFByb21pc2UucmVzb2x2ZShwcmVkaWNhdGUodiwgaykpLnRoZW4ocmVzID0+IHJlcyA/IChrZXkgPSBrLCB0cnVlKSA6IGZhbHNlKSlcbiAgICAgICAgICAgIC50aGVuKGZvdW5kID0+IGZvdW5kID8ga2V5IDogS2V5LnNlbnRpbmVsKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5maW5kS2V5ID0gZmluZEtleTtcbiAgICBmdW5jdGlvbiBmaW5kKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRLZXkoaXRlcmF0b3IsIHByZWRpY2F0ZSkudGhlbihpdGVyYXRvci5nZXQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmQgPSBmaW5kO1xuICAgIGZ1bmN0aW9uIGtleU9mKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmluZEtleShpdGVyYXRvciwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iua2V5T2YgPSBrZXlPZjtcbiAgICBmdW5jdGlvbiBpbmRleE9mKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsICh2LCBrKSA9PiAoaW5kZXgrKywgdmFsdWUgPT0gdikpLnRoZW4oZm91bmQgPT4gZm91bmQgPyBpbmRleCA6IEtleS5OT1RfRk9VTkQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmluZGV4T2YgPSBpbmRleE9mO1xuICAgIGZ1bmN0aW9uIGtleUF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZmluZEtleShpdGVyYXRvciwgKCkgPT4gMCA9PT0gaW5kZXgtLSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iua2V5QXQgPSBrZXlBdDtcbiAgICBmdW5jdGlvbiBhdChpdGVyYXRvciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGtleUF0KGl0ZXJhdG9yLCBpbmRleCkudGhlbihpdGVyYXRvci5nZXQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmF0ID0gYXQ7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGNvbmNhdCguLi5pdGVyYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9ycy5yZWR1Y2UoKG1lbW8sIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBpdGVyYXRlZCA/IHZhbHVlLmdldCgpIDogbWVtby5nZXQoKSxcbiAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiBpdGVyYXRlZCA/IHZhbHVlLm5leHQoKSA6IG1lbW8ubmV4dCgpLnRoZW4oa2V5ID0+IGtleSAhPT0gS2V5LnNlbnRpbmVsID8ga2V5IDogKGl0ZXJhdGVkID0gdHJ1ZSwgdmFsdWUubmV4dCgpKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIEFzeW5jSXRlcmF0b3IuRW1wdHkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBmdW5jdGlvbiBmcm9tRW50cmllcyhlbnRyaWVzKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gLTE7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IGN1cnJlbnQgPT09IC0xID8gS2V5Lk5PVF9GT1VORCA6IFByb21pc2UucmVzb2x2ZShlbnRyaWVzW2N1cnJlbnRdWzFdKSxcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IFByb21pc2UucmVzb2x2ZSgrK2N1cnJlbnQgPT09IGVudHJpZXMubGVuZ3RoID8gS2V5LnNlbnRpbmVsIDogZW50cmllc1tjdXJyZW50XVswXSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tRW50cmllcyA9IGZyb21FbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoYXJyYXkubWFwKCh2YWx1ZSwga2V5KSA9PiBba2V5LCB2YWx1ZV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKE9iamVjdC5rZXlzKG9iamVjdCkubWFwKGtleSA9PiBba2V5LCBvYmplY3Rba2V5XV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSkgPT4gKG1lbW8ucHVzaCh2YWx1ZSksIG1lbW8pLCBbXSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3QoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlLCBrZXkpID0+IChtZW1vW2tleV0gPSB2YWx1ZSwgbWVtbyksIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRvT2JqZWN0ID0gdG9PYmplY3Q7XG59KShBc3luY0l0ZXJhdG9yIHx8IChBc3luY0l0ZXJhdG9yID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEFzeW5jSXRlcmF0b3I7XG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQ2FjaGU7XG4oZnVuY3Rpb24gKENhY2hlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGV4dGVuZChjYWNoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gYXBwbHkoc3RhdGUsIGNhY2hlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUuZ2V0ID8gY2FjaGUuZ2V0W2tleV0gOiBjYWNoZS5nZXRba2V5XSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLnByZXYgPyBjYWNoZS5wcmV2W2tleV0gOiBjYWNoZS5wcmV2W2tleV0gPSBzdGF0ZS5wcmV2KGtleSkudGhlbihwcmV2ID0+IHsgY2FjaGUubmV4dFtwcmV2XSA9IFByb21pc2UucmVzb2x2ZShrZXkpOyByZXR1cm4gcHJldjsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUubmV4dCA/IGNhY2hlLm5leHRba2V5XSA6IGNhY2hlLm5leHRba2V5XSA9IHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4geyBjYWNoZS5wcmV2W25leHRdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBuZXh0OyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgQ2FjaGUuYXBwbHkgPSBhcHBseTtcbn0pKENhY2hlIHx8IChDYWNoZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBDYWNoZTtcbiIsImltcG9ydCBQcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbnZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIEtleS5OT1RfRk9VTkRfRVJST1IgPSBuZXcgRXJyb3IoXCJObyBlbnRyeSBhdCB0aGUgc3BlY2lmaWVkIGtleVwiKTtcbiAgICBLZXkuTk9UX0ZPVU5EID0gUHJvbWlzZVV0aWxzLmxhenkoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KEtleS5OT1RfRk9VTkRfRVJST1IpKTtcbiAgICBLZXkuc2VudGluZWwgPSBudWxsO1xuICAgIHZhciB1bmlxdWVLZXkgPSAwO1xuICAgIGZ1bmN0aW9uIGtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleS50b1N0cmluZygpO1xuICAgIH1cbiAgICBLZXkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUtleSsrO1xuICAgIH1cbiAgICBLZXkuY3JlYXRlID0gY3JlYXRlO1xufSkoS2V5IHx8IChLZXkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgS2V5O1xuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xyXG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XHJcbmV4cG9ydCB2YXIgTGVucztcclxuKGZ1bmN0aW9uIChMZW5zKSB7XHJcbiAgICBmdW5jdGlvbiBjb21wb3NlKHBhcmVudCwgbGVucykge1xyXG4gICAgICAgIHZhciBnZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKSwgc2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XHJcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLmdldCkgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XHJcbiAgICAgICAgfSkuc3Vic2NyaWJlKGdldFN1YmplY3QpO1xyXG4gICAgICAgIE9ic2VydmFibGUubWFwKHNldFN1YmplY3QsIHBhdGNoID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLnNldCkgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XHJcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhcmVudC5wYXRjaGVzKTtcclxuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XHJcbiAgICB9XHJcbiAgICBMZW5zLmNvbXBvc2UgPSBjb21wb3NlO1xyXG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcclxuZXhwb3J0IGRlZmF1bHQgTGVucztcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGVucy5qcy5tYXAiLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcclxuaW1wb3J0IFBhdGNoIGZyb20gJy4vcGF0Y2gnO1xyXG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XHJcbmltcG9ydCB7IFJhbmdlLCBQb3NpdGlvbiB9IGZyb20gJy4vcmFuZ2UnO1xyXG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XHJcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xyXG5leHBvcnQgdmFyIExpc3Q7XHJcbihmdW5jdGlvbiAoTGlzdCkge1xyXG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcclxuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5tYXAocGFyZW50LnN0YXRlLCBtYXBGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4gKHtcclxuICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxyXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIG1hcEZuKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcclxuICAgIH1cclxuICAgIExpc3QubWFwID0gbWFwO1xyXG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcclxuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kS2V5KFN0YXRlLnRvSXRlcmF0b3IoU3RhdGUucmV2ZXJzZShzdGF0ZSksIFtQb3NpdGlvbi5yZXZlcnNlKHBhdGNoLnJhbmdlWzBdKSwgeyBwcmV2OiBudWxsIH1dKSwgZmlsdGVyRm4pLnRoZW4obmV4dCA9PiAoeyBuZXh0IH0pKSxcclxuICAgICAgICAgICAgICAgIEFzeW5jSXRlcmF0b3IuZmluZEtleShTdGF0ZS50b0l0ZXJhdG9yKHN0YXRlLCBbcGF0Y2gucmFuZ2VbMV0sIHsgcHJldjogbnVsbCB9XSksIGZpbHRlckZuKS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSlcclxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7XHJcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXHJcbiAgICAgICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5maWx0ZXIocGF0Y2guYWRkZWQsIGZpbHRlckZuKSA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcywgKG9sZFN0YXRlLCBwYXRjaGVzKSA9PiBzdGF0ZSA9IFBhdGNoLmFwcGx5KG9sZFN0YXRlLCBwYXRjaGVzKSk7XHJcbiAgICB9XHJcbiAgICBMaXN0LmZpbHRlciA9IGZpbHRlcjtcclxuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcclxuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIHN0YXRlID0gU3RhdGUuem9vbShwYXJlbnQuc3RhdGUsIGtleSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChPYnNlcnZhYmxlLmZpbHRlcihwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKFN0YXRlLnRvSXRlcmF0b3IocGFyZW50U3RhdGUsIHBhdGNoLnJhbmdlKSwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcGF0Y2guYWRkZWQgPyBTdGF0ZS5oYXMocGF0Y2guYWRkZWQsIGtleSkgOiByZXMpO1xyXG4gICAgICAgIH0pLCBwYXRjaCA9PiB7XHJcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IFJhbmdlLmFsbCxcclxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLnpvb20ocGF0Y2guYWRkZWQsIGtleSkgOiB1bmRlZmluZWRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcclxuICAgIH1cclxuICAgIExpc3Quem9vbSA9IHpvb207XHJcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xyXG4gICAgICAgIHZhciBwYXRjaGVzXyA9IFN1YmplY3QuY3JlYXRlKCk7XHJcbiAgICAgICAgdmFyIHBhcmVudF8gPSBjYWNoZShtYXAocGFyZW50LCAoKGxpc3QsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBPYnNlcnZhYmxlLm1hcChsaXN0LnBhdGNoZXMsIHBhdGNoID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5wcmV2KEtleS5zZW50aW5lbCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgbmV4dF0pIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5wcmV2XSkgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5uZXh0KEtleS5zZW50aW5lbCkudGhlbihwcmV2ID0+ICh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcHJldl0pIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5uZXh0XSkgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxyXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXHJcbiAgICAgICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBwYXRjaC5hZGRlZCA6IHVuZGVmaW5lZCB9KSk7XHJcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShwYXRjaGVzXyk7XHJcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcclxuICAgICAgICAgICAgdmFyIGZyb20gPSBwYXRjaC5yYW5nZVswXSwgdG8gPSBwYXRjaC5yYW5nZVsxXTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5uZXh0KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5wcmV2XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxyXG4gICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcclxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7IHJhbmdlOiByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmxhdHRlbihTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxpc3QgPT4gbGlzdC5zdGF0ZSkpIDogdW5kZWZpbmVkIH0pKTtcclxuICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmZsYXR0ZW4ocGFyZW50Xy5zdGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlc18pO1xyXG4gICAgfVxyXG4gICAgTGlzdC5mbGF0dGVuID0gZmxhdHRlbjtcclxuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xyXG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxyXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLmNhY2hlKHBhdGNoLmFkZGVkKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XHJcbiAgICB9XHJcbiAgICBMaXN0LmNhY2hlID0gY2FjaGU7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIHJlZHVjZXIgPSBQYXRjaC5hcHBseSkge1xyXG4gICAgICAgIGNvbnN0IGxpc3QgPSB7IHN0YXRlLCBwYXRjaGVzIH07XHJcbiAgICAgICAgT2JzZXJ2YWJsZS5zY2FuKHBhdGNoZXMsIHJlZHVjZXIsIHN0YXRlKS5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBvbk5leHQ6IChzdGF0ZSkgPT4geyBsaXN0LnN0YXRlID0gc3RhdGU7IH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gbGlzdDtcclxuICAgIH1cclxuICAgIExpc3QuY3JlYXRlID0gY3JlYXRlO1xyXG59KShMaXN0IHx8IChMaXN0ID0ge30pKTtcclxuZXhwb3J0IGRlZmF1bHQgTGlzdDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGlzdC5qcy5tYXAiLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcclxuZXhwb3J0IHZhciBEaXNwb3NhYmxlO1xyXG4oZnVuY3Rpb24gKERpc3Bvc2FibGUpIHtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaXNwb3Nlcikge1xyXG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBkaXNwb3NlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIERpc3Bvc2FibGUuY3JlYXRlID0gY3JlYXRlO1xyXG59KShEaXNwb3NhYmxlIHx8IChEaXNwb3NhYmxlID0ge30pKTtcclxuZXhwb3J0IHZhciBPYnNlcnZhYmxlO1xyXG4oZnVuY3Rpb24gKE9ic2VydmFibGUpIHtcclxuICAgIGZ1bmN0aW9uIG1hcChvYnNlcnZhYmxlLCBtYXBGbikge1xyXG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xyXG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcclxuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUobWFwRm4odmFsdWUpKS50aGVuKHN1YmplY3Qub25OZXh0KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZTogc3ViamVjdC5zdWJzY3JpYmUgfTtcclxuICAgIH1cclxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xyXG4gICAgZnVuY3Rpb24gZmlsdGVyKG9ic2VydmFibGUsIGZpbHRlckZuKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XHJcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShmaWx0ZXJGbih2YWx1ZSkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IHN1YmplY3Qub25OZXh0KHZhbHVlKSA6IHVuZGVmaW5lZClcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XHJcbiAgICB9XHJcbiAgICBPYnNlcnZhYmxlLmZpbHRlciA9IGZpbHRlcjtcclxuICAgIGZ1bmN0aW9uIHNjYW4ob2JzZXJ2YWJsZSwgc2NhbkZuLCBtZW1vKSB7XHJcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XHJcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xyXG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xyXG4gICAgfVxyXG4gICAgT2JzZXJ2YWJsZS5zY2FuID0gc2NhbjtcclxufSkoT2JzZXJ2YWJsZSB8fCAoT2JzZXJ2YWJsZSA9IHt9KSk7XHJcbmV4cG9ydCB2YXIgU3ViamVjdDtcclxuKGZ1bmN0aW9uIChTdWJqZWN0KSB7XHJcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgICAgICB2YXIgY3VycmVudCA9IFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xyXG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkuY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIG9ic2VydmVyc1tvYnNlcnZlcktleV0gPSBvYnNlcnZlcjtcclxuICAgICAgICAgICAgcmV0dXJuIERpc3Bvc2FibGUuY3JlYXRlKCgpID0+IGRlbGV0ZSBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gb25OZXh0KHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbk5leHQodmFsdWUpKSkudGhlbigoKSA9PiB7IH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlLCBvbk5leHQgfTtcclxuICAgIH1cclxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xyXG59KShTdWJqZWN0IHx8IChTdWJqZWN0ID0ge30pKTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xufSkoUGF0Y2ggfHwgKFBhdGNoID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFBhdGNoO1xuIiwiLy8gdHlwZSBKdXN0PFY+ID0gW1ZdO1xuLy8gdHlwZSBOb3RoaW5nPFY+ID0gQXJyYXk8Vj4gJiB7IDA6IHZvaWQgfVxuLy8gdHlwZSBNYXliZTxWPiA9IEp1c3Q8Vj4gfCBOb3RoaW5nPFY+O1xuZXhwb3J0IHZhciBQcm9taXNlVXRpbHM7XG4oZnVuY3Rpb24gKFByb21pc2VVdGlscykge1xuICAgIGZ1bmN0aW9uIGxhenkoZXhlY3V0b3IpIHtcbiAgICAgICAgdmFyIHByb21pc2U7XG4gICAgICAgIGZ1bmN0aW9uIHRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIChwcm9taXNlID0gbmV3IFByb21pc2UoZXhlY3V0b3IpKS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdGhlbiB9KTtcbiAgICB9XG4gICAgUHJvbWlzZVV0aWxzLmxhenkgPSBsYXp5O1xufSkoUHJvbWlzZVV0aWxzIHx8IChQcm9taXNlVXRpbHMgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZVV0aWxzO1xuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIFJhbmdlO1xuKGZ1bmN0aW9uIChSYW5nZSkge1xuICAgIFJhbmdlLmFsbCA9IFt7IG5leHQ6IEtleS5zZW50aW5lbCB9LCB7IHByZXY6IEtleS5zZW50aW5lbCB9XTtcbn0pKFJhbmdlIHx8IChSYW5nZSA9IHt9KSk7XG5leHBvcnQgdmFyIFBvc2l0aW9uO1xuKGZ1bmN0aW9uIChQb3NpdGlvbikge1xuICAgIGZ1bmN0aW9uIGlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAncHJldicgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uID0gaXNQcmV2UG9zaXRpb247XG4gICAgZnVuY3Rpb24gaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICduZXh0JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24gPSBpc05leHRQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikgPyB7IG5leHQ6IHBvc2l0aW9uLnByZXYgfSA6IHsgcHJldjogcG9zaXRpb24ubmV4dCB9O1xuICAgIH1cbiAgICBQb3NpdGlvbi5yZXZlcnNlID0gcmV2ZXJzZTtcbn0pKFBvc2l0aW9uIHx8IChQb3NpdGlvbiA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBSYW5nZTtcbiIsImltcG9ydCBfU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgX0FzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0IGFzIF9MaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCBfVHJlZSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IF9DYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IFN1YmplY3QgYXMgX1N1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IF9Qcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbmltcG9ydCBfTGVucyBmcm9tICcuL2xlbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9MaXN0LmNyZWF0ZShfU3RhdGUuZnJvbUFycmF5KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tT2JqZWN0KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbn1cbmV4cG9ydCB2YXIgU29uaWM7XG4oZnVuY3Rpb24gKFNvbmljKSB7XG4gICAgU29uaWMuU3RhdGUgPSBfU3RhdGU7XG4gICAgU29uaWMuQXN5bmNJdGVyYXRvciA9IF9Bc3luY0l0ZXJhdG9yO1xuICAgIFNvbmljLkxpc3QgPSBfTGlzdDtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuU3ViamVjdCA9IF9TdWJqZWN0O1xuICAgIFNvbmljLkNhY2hlID0gX0NhY2hlO1xuICAgIFNvbmljLlByb21pc2VVdGlscyA9IF9Qcm9taXNlVXRpbHM7XG4gICAgU29uaWMuTGVucyA9IF9MZW5zO1xufSkoU29uaWMgfHwgKFNvbmljID0ge30pKTtcbjtcbm1vZHVsZS5leHBvcnRzID0gU29uaWM7XG5leHBvcnQgZGVmYXVsdCBTb25pYztcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xyXG5pbXBvcnQgeyBQb3NpdGlvbiwgUmFuZ2UgfSBmcm9tICcuL3JhbmdlJztcclxuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xyXG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcclxuaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XHJcbmV4cG9ydCB2YXIgU3RhdGU7XHJcbihmdW5jdGlvbiAoU3RhdGUpIHtcclxuICAgIFN0YXRlLkVtcHR5ID0ge1xyXG4gICAgICAgIGdldDogKGtleSkgPT4gS2V5Lk5PVF9GT1VORCxcclxuICAgICAgICBwcmV2OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5ELFxyXG4gICAgICAgIG5leHQ6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IGtleSA9PSBLZXkuc2VudGluZWwgPyBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKSA6IEtleS5OT1RfRk9VTkRcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XHJcbiAgICAgICAgdmFyIHN0YXRlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xyXG4gICAgICAgIGlmIChnZXQpXHJcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcclxuICAgICAgICBpZiAocHJldilcclxuICAgICAgICAgICAgc3RhdGUucHJldiA9IHByZXY7XHJcbiAgICAgICAgaWYgKG5leHQpXHJcbiAgICAgICAgICAgIHN0YXRlLm5leHQgPSBuZXh0O1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuICAgIFN0YXRlLmV4dGVuZCA9IGV4dGVuZDtcclxuICAgIGZ1bmN0aW9uIGZpcnN0KHN0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKGtleSA9PiBzdGF0ZS5nZXQoa2V5KSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5maXJzdCA9IGZpcnN0O1xyXG4gICAgZnVuY3Rpb24gbGFzdChzdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5wcmV2KCkudGhlbihrZXkgPT4gc3RhdGUuZ2V0KGtleSkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUubGFzdCA9IGxhc3Q7XHJcbiAgICBmdW5jdGlvbiBoYXMoc3RhdGUsIGtleSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5nZXQoa2V5KS50aGVuKCgpID0+IHRydWUsIHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBmYWxzZSA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuaGFzID0gaGFzO1xyXG4gICAgZnVuY3Rpb24gaXMoc3RhdGUsIG90aGVyKSB7XHJcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gdG9JdGVyYXRvcihzdGF0ZSksIG90aGVySXRlcmF0b3IgPSB0b0l0ZXJhdG9yKG90aGVyKTtcclxuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5ldmVyeShpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG90aGVySXRlcmF0b3IubmV4dCgpLnRoZW4oayA9PiBrICE9PSBrZXkgPyBmYWxzZSA6IG90aGVySXRlcmF0b3IuZ2V0KCkudGhlbih2ID0+IHYgPT09IHZhbHVlKSk7XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4gcmVzID8gb3RoZXJJdGVyYXRvci5uZXh0KCkudGhlbihrID0+IGsgPT09IEtleS5zZW50aW5lbCkgOiBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5pcyA9IGlzO1xyXG4gICAgZnVuY3Rpb24gY29udGFpbnMoc3RhdGUsIHZhbHVlKSB7XHJcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZSh0b0l0ZXJhdG9yKHN0YXRlKSwgKHYsIGspID0+IHYgPT09IHZhbHVlKTtcclxuICAgIH1cclxuICAgIFN0YXRlLmNvbnRhaW5zID0gY29udGFpbnM7XHJcbiAgICBmdW5jdGlvbiBpc0VtcHR5KHN0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCA9PT0gS2V5LnNlbnRpbmVsKTtcclxuICAgIH1cclxuICAgIFN0YXRlLmlzRW1wdHkgPSBpc0VtcHR5O1xyXG4gICAgZnVuY3Rpb24gc2xpY2UocGFyZW50LCByYW5nZSA9IFJhbmdlLmFsbCkge1xyXG4gICAgICAgIHJldHVybiBmcm9tSXRlcmF0b3IodG9JdGVyYXRvcihwYXJlbnQsIHJhbmdlKSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5zbGljZSA9IHNsaWNlO1xyXG4gICAgZnVuY3Rpb24gc3BsaWNlKHBhcmVudCwgcmFuZ2UsIGNoaWxkKSB7XHJcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XHJcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZDtcclxuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XHJcbiAgICAgICAgYnJpZGdlZENoaWxkID0gZXh0ZW5kKGNoaWxkLCB7XHJcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBjaGlsZC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBLZXkuc2VudGluZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmV2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IFByb21pc2UucmVzb2x2ZShmcm9tLm5leHQpIDogcGFyZW50LnByZXYoZnJvbS5wcmV2KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0ICE9PSBLZXkuc2VudGluZWwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgPyBQcm9taXNlLnJlc29sdmUodG8ucHJldikgOiBwYXJlbnQubmV4dCh0by5uZXh0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmlkZ2VkUGFyZW50ID0gZXh0ZW5kKGZpbHRlcmVkLCB7XHJcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBwYXJlbnQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHByZXYgPT09IHRvLm5leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIHByZXYpLnRoZW4ocmVzID0+IHJlcyA/IEtleS5OT1RfRk9VTkQgOiBwcmV2KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgbmV4dCA9PT0gZnJvbS5wcmV2KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuc2VudGluZWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogbmV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2hpbGQuZ2V0KGtleSkuY2F0Y2gocmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IGJyaWRnZWRQYXJlbnQuZ2V0KGtleSkgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBLZXkuc2VudGluZWwpIHtcclxuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBrZXkgPT09IHRvLnByZXYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZFBhcmVudC5uZXh0KEtleS5zZW50aW5lbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5wcmV2KGtleSkgOiBicmlkZ2VkUGFyZW50LnByZXYoa2V5KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XHJcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBrZXkgPT09IGZyb20ubmV4dClcclxuICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuc2VudGluZWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQubmV4dChrZXkpIDogYnJpZGdlZFBhcmVudC5uZXh0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcclxuICAgIH1cclxuICAgIFN0YXRlLnNwbGljZSA9IHNwbGljZTtcclxuICAgIGZ1bmN0aW9uIHJldmVyc2UocGFyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcclxuICAgICAgICAgICAgcHJldjogcGFyZW50Lm5leHQsXHJcbiAgICAgICAgICAgIG5leHQ6IHBhcmVudC5wcmV2XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5yZXZlcnNlID0gcmV2ZXJzZTtcclxuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcclxuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gbWFwRm4odmFsdWUsIGtleSkpXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5tYXAgPSBtYXA7XHJcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShmaWx0ZXJGbih2YWx1ZSwga2V5KSkudGhlbihyZXMgPT4gcmVzID8gdmFsdWUgOiBLZXkuTk9UX0ZPVU5EKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQucHJldihrZXkpLnRoZW4ocCA9PiBwID09PSBudWxsID8gbnVsbCA6IHBhcmVudC5nZXQocCkudGhlbih2YWx1ZSA9PiBmaWx0ZXJGbih2YWx1ZSwgcCkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IHAgOiBwcmV2KHApKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQubmV4dChrZXkpLnRoZW4obiA9PiBuID09PSBudWxsID8gbnVsbCA6IHBhcmVudC5nZXQobikudGhlbih2YWx1ZSA9PiBmaWx0ZXJGbih2YWx1ZSwgbikpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IG4gOiBuZXh0KG4pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmZpbHRlciA9IGZpbHRlcjtcclxuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcclxuICAgICAgICBjb25zdCBuZXh0ID0gKGspID0+IGsgPT0gbnVsbCA/IHBhcmVudC5nZXQoa2V5KS50aGVuKCgpID0+IGtleSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IG51bGwgOiBQcm9taXNlLnJlamVjdChyZWFzb24pKSA6IChrZXkgPT09IGsgPyBQcm9taXNlLnJlc29sdmUobnVsbCkgOiBLZXkuTk9UX0ZPVU5EKTtcclxuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xyXG4gICAgICAgICAgICBnZXQ6IGsgPT4gayA9PT0ga2V5ID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCxcclxuICAgICAgICAgICAgcHJldjogbmV4dCxcclxuICAgICAgICAgICAgbmV4dDogbmV4dFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuem9vbSA9IHpvb207XHJcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xyXG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XHJcbiAgICAgICAgICAgIGdldDoga2V5ID0+IFRyZWUuZ2V0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLFxyXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gVHJlZS5wcmV2KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSksXHJcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBUcmVlLm5leHQocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSkudGhlbihQYXRoLnRvS2V5KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZmxhdHRlbiA9IGZsYXR0ZW47XHJcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcclxuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkocGFyZW50LCBDYWNoZS5jcmVhdGUoKSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5jYWNoZSA9IGNhY2hlO1xyXG4gICAgZnVuY3Rpb24ga2V5QnkocGFyZW50LCBrZXlGbikge1xyXG4gICAgICAgIHZhciBrZXlNYXAgPSBjYWNoZShTdGF0ZS5tYXAocGFyZW50LCBrZXlGbikpO1xyXG4gICAgICAgIHZhciByZXZlcnNlS2V5TWFwID0gY2FjaGUoe1xyXG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBBc3luY0l0ZXJhdG9yLmtleU9mKFN0YXRlLnRvSXRlcmF0b3Ioa2V5TWFwKSwga2V5KSxcclxuICAgICAgICAgICAgcHJldjogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXkgPT09IEtleS5zZW50aW5lbCA/IEtleS5zZW50aW5lbCA6IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oa2V5TWFwLnByZXYpLnRoZW4ocHJldiA9PiBwcmV2ID09PSBLZXkuc2VudGluZWwgPyBwcmV2IDoga2V5TWFwLmdldChwcmV2KSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5leHQ6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5ID09PSBLZXkuc2VudGluZWwgPyBLZXkuc2VudGluZWwgOiByZXZlcnNlS2V5TWFwLmdldChrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGtleU1hcC5uZXh0KS50aGVuKG5leHQgPT4gbmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gbmV4dCA6IGtleU1hcC5nZXQobmV4dCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChyZXZlcnNlS2V5TWFwLCB7IGdldDoga2V5ID0+IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkudGhlbihwYXJlbnQuZ2V0KSB9KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmtleUJ5ID0ga2V5Qnk7XHJcbiAgICBmdW5jdGlvbiBrZXlzKHBhcmVudCkge1xyXG4gICAgICAgIHJldHVybiBtYXAocGFyZW50LCAodmFsdWUsIGtleSkgPT4ga2V5KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmtleXMgPSBrZXlzO1xyXG4gICAgZnVuY3Rpb24gZnJvbUFycmF5KHZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogKGtleSkgPT4ga2V5IGluIHZhbHVlcyA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZXNba2V5XSkgOiBLZXkuTk9UX0ZPVU5ELFxyXG4gICAgICAgICAgICBwcmV2OiAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBrZXkgPT0gbnVsbCA/IHZhbHVlcy5sZW5ndGggLSAxIDoga2V5IC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5kZXggPT09IC0xID8gbnVsbCA6IGluZGV4KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmV4dDogKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0ga2V5ID09IG51bGwgPyAwIDoga2V5ICsgMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5kZXggPT09IHZhbHVlcy5sZW5ndGggPyBudWxsIDogaW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcclxuICAgIGZ1bmN0aW9uIGZyb21PYmplY3QodmFsdWVzKSB7XHJcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZXMpLCBpbmRleEJ5S2V5ID0ga2V5cy5yZWR1Y2UoKG1lbW8sIGtleSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbWVtb1trZXldID0gaW5kZXg7XHJcbiAgICAgICAgICAgIHJldHVybiBtZW1vO1xyXG4gICAgICAgIH0sIE9iamVjdC5jcmVhdGUobnVsbCkpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSBpbiB2YWx1ZXMgPyBQcm9taXNlLnJlc29sdmUodmFsdWVzW2tleV0pIDogS2V5Lk5PVF9GT1VORDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJldjogKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5c1trZXlzLmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBpbmRleEJ5S2V5KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGluZGV4QnlLZXlba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXlzW2luZGV4IC0gMV0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXh0OiAoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXlzWzBdKTtcclxuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBpbmRleEJ5S2V5KSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGluZGV4QnlLZXlba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0ga2V5cy5sZW5ndGggLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleXNbaW5kZXggKyAxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XHJcbiAgICBmdW5jdGlvbiBmcm9tSXRlcmF0b3IoaXRlcmF0b3IpIHtcclxuICAgICAgICB2YXIgY2FjaGUgPSBDYWNoZS5jcmVhdGUoKSwgZXhoYXVzdGVkID0gZmFsc2UsIGN1cnJlbnRLZXkgPSBudWxsO1xyXG4gICAgICAgIHZhciBjYWNoaW5nSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLmV4dGVuZChpdGVyYXRvciwge1xyXG4gICAgICAgICAgICBnZXQ6ICgpID0+IGNhY2hlLmdldFtjdXJyZW50S2V5XSA9IGl0ZXJhdG9yLmdldCgpLFxyXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBjYWNoZS5uZXh0W2N1cnJlbnRLZXldID0gaXRlcmF0b3IubmV4dCgpLnRoZW4oa2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIGNhY2hlLnByZXZba2V5XSA9IFByb21pc2UucmVzb2x2ZShjdXJyZW50S2V5KTtcclxuICAgICAgICAgICAgICAgIGV4aGF1c3RlZCA9IGtleSA9PT0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50S2V5ID0ga2V5O1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IuZ2V0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCAodmFsdWUsIGspID0+IGsgPT09IGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcclxuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShjYWNoaW5nSXRlcmF0b3IsICh2YWx1ZSwgaykgPT4gayA9PT0ga2V5KS50aGVuKCgpID0+IGNhY2hlLnByZXZba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kS2V5KGNhY2hpbmdJdGVyYXRvciwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseSh7IGdldCwgcHJldiwgbmV4dCB9LCBjYWNoZSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5mcm9tSXRlcmF0b3IgPSBmcm9tSXRlcmF0b3I7XHJcbiAgICBmdW5jdGlvbiB0b0l0ZXJhdG9yKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gS2V5LnNlbnRpbmVsO1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmdldChjdXJyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICAgICAgdmFyIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcclxuICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiB0by5wcmV2ID09PSBuZXh0ID8gY3VycmVudCA9IEtleS5zZW50aW5lbCA6IGN1cnJlbnQgPSBuZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoS2V5LnNlbnRpbmVsKTtcclxuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pICYmIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiBmcm9tLm5leHQgPT09IHRvLm5leHQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBLZXkuc2VudGluZWwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgPyBQcm9taXNlLnJlc29sdmUoY3VycmVudCA9IGZyb20ucHJldikgOiBpdGVyYXRlKGZyb20ubmV4dCk7XHJcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgdG8ubmV4dCA9PT0gY3VycmVudClcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY3VycmVudCA9IEtleS5zZW50aW5lbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKGN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBnZXQsIG5leHQgfTtcclxuICAgIH1cclxuICAgIFN0YXRlLnRvSXRlcmF0b3IgPSB0b0l0ZXJhdG9yO1xyXG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xyXG5leHBvcnQgZGVmYXVsdCBTdGF0ZTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RhdGUuanMubWFwIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHZhciBQYXRoO1xuKGZ1bmN0aW9uIChQYXRoKSB7XG4gICAgZnVuY3Rpb24ga2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gZnJvbUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmZyb21LZXkgPSBmcm9tS2V5O1xuICAgIGZ1bmN0aW9uIHRvS2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC50b0tleSA9IHRvS2V5O1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbaW5kZXhdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gdGFpbChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBbXSA6IHBhdGguc2xpY2UoMSwgcGF0aC5sZW5ndGgpO1xuICAgIH1cbiAgICBQYXRoLnRhaWwgPSB0YWlsO1xuICAgIGZ1bmN0aW9uIGFwcGVuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoYSkuY29uY2F0KGIpO1xuICAgIH1cbiAgICBQYXRoLmFwcGVuZCA9IGFwcGVuZDtcbn0pKFBhdGggfHwgKFBhdGggPSB7fSkpO1xuZXhwb3J0IHZhciBUcmVlO1xuKGZ1bmN0aW9uIChUcmVlKSB7XG4gICAgZnVuY3Rpb24gZ2V0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZCkudGhlbihzdGF0ZSA9PiBzdGF0ZS5nZXQodGFpbCkpO1xuICAgIH1cbiAgICBUcmVlLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwcmV2KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBwcmV2cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUucHJldigpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5wcmV2KCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBuZXh0cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUubmV4dCgpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKG5leHRzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IFtoZWFkLCBuZXh0XSA6IHBhdGhzLm5leHQoaGVhZCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5uZXh0ID0gbmV4dDtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcbiJdfQ==
