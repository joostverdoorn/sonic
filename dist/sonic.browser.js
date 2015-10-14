(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var AsyncIterator;
exports.AsyncIterator = AsyncIterator;
(function (AsyncIterator) {
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
            return found ? key : _key2['default'].NOT_FOUND;
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
            return (index++, value == v);
        }).then(function (found) {
            return found ? index : _key2['default'].NOT_FOUND;
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
    function toArray(iterator) {
        return reduce(iterator, function (memo, value) {
            return (memo.push(value), memo);
        }, []);
    }
    AsyncIterator.toArray = toArray;
    function toObject(iterator) {
        return reduce(iterator, function (memo, value, key) {
            return (memo[key] = value, memo);
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
    function apply(cache, state) {
        function get(key) {
            return key in cache.get ? cache.get[key] : cache.get[key] = state.get(key);
        }
        function prev() {
            var key = arguments[0] === undefined ? _key2['default'].None : arguments[0];

            return key in cache.prev ? cache.prev[key] : cache.prev[key] = state.prev(key).then(function (prev) {
                cache.next[prev] = Promise.resolve(key);return prev;
            });
        }
        function next() {
            var key = arguments[0] === undefined ? _key2['default'].None : arguments[0];

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

var _promise_utils = require("./promise_utils");

var _promise_utils2 = _interopRequireDefault(_promise_utils);

var Key;
(function (Key) {
    Key.NOT_FOUND_ERROR = new Error("No entry at the specified key");
    Key.NOT_FOUND = _promise_utils2["default"].lazy(function (resolve, reject) {
        return reject(Key.NOT_FOUND_ERROR);
    });
    Key.None = null;
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

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

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
            return { range: patch.range, added: patch.added ? _state2['default'].map(patch.added, mapFn) : undefined };
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = _state2['default'].filter(parent.state, filterFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return Promise.all([patch.range[0] == null ? Promise.resolve(null) : state.get(patch.range[0]).then(function (value) {
                return patch.range[0];
            })['catch'](function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? state.prev(patch.range[0]) : Promise.reject(reason);
            }), patch.range[1] == null ? Promise.resolve(null) : state.get(patch.range[1]).then(function (value) {
                return patch.range[1];
            })['catch'](function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? state.next(patch.range[1]) : Promise.reject(reason);
            })]).then(function (range) {
                return { range: range, added: patch.added ? _state2['default'].filter(patch.added, filterFn) : undefined };
            });
        });
        function reduceFn(old, patch) {
            return state = _patch2['default'].apply(patch, old);
        }
        return create(state, patches, reduceFn);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = _state2['default'].zoom(parent.state, key),
            patches = _observable.Observable.map(_observable.Observable.filter(parent.patches, function (patch) {
            return _async_iterator2['default'].some(_state2['default'].toIterator(parent.state, patch.range), function (value, k) {
                return k === key;
            });
        }), function (patch) {
            return { range: _range2['default'].all, added: patch.added ? _state2['default'].zoom(patch.added, key) : undefined };
        });
        return create(state, patches);
    }
    List.zoom = zoom;
    function flatten(parent) {
        var xpatches = new _observable.Subject();
        var xparent = cache(map(parent, function (list, key) {
            _observable.Observable.map(list.patches, function (patch) {
                if (_patch2['default'].isSetPatch(patch) && 'before' in patch) {
                    if (patch.before !== null) return _patch2['default'].extend(patch, { key: _tree.Path.toKey([key, patch.key]), before: _tree.Path.toKey([key, patch.before]) });
                    return _tree.Tree.next(_state2['default'].map(parent.state, function (list) {
                        return list.state;
                    }), [key, patch.key]).then(function (next) {
                        return _patch2['default'].extend(patch, { key: _tree.Path.toKey([key, patch.key]), before: _tree.Path.toKey(next) });
                    });
                }
                return _patch2['default'].extend(patch, { key: _tree.Path.toKey([key, patch.key]) });
            }).subscribe(xpatches);
            return list.state;
        }));
        var state = _state2['default'].flatten(xparent.state);
        return create(state, xpatches);
    }
    List.flatten = flatten;
    function cache(parent) {
        var cache = _cache2['default'].create(),
            state = _cache2['default'].apply(cache, parent.state),
            reducer = function reducer(state, patch) {
            cache = _cache2['default'].patch(cache, patch);
            return _cache2['default'].apply(cache, parent.state);
        };
        return List.create(state, parent.patches, reducer);
    }
    List.cache = cache;
    function create(state, patches) {
        var reducer = arguments[2] === undefined ? _state2['default'].patch : arguments[2];

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

},{"./async_iterator":1,"./cache":2,"./key":3,"./observable":6,"./patch":7,"./range":9,"./state":10,"./tree":11}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _observable = require('./observable');

var Mutable;
exports.Mutable = Mutable;
(function (Mutable) {
    function create(state, patches) {
        var reducer = arguments[2] === undefined ? _state2['default'].patch : arguments[2];

        var list = { state: state, patches: patches };
        _observable.Observable.scan(patches, reducer, state).subscribe({
            onNext: function onNext(state) {
                list.state = state;
            }
        });
        return list;
    }
    Mutable.create = create;
})(Mutable || (exports.Mutable = Mutable = {}));
exports['default'] = Mutable;

},{"./observable":6,"./state":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.disposable = disposable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

function disposable(disposer) {
    var done = false;
    return {
        dispose: function dispose() {
            if (done) return;
            done = true, disposer();
        }
    };
}

var Subject = function Subject() {
    var _this = this;

    _classCallCheck(this, Subject);

    this._count = 0;
    this.subscribe = function (observer) {
        var observerKey = _key2['default'].create();
        _this._observers[observerKey] = observer;
        return disposable(function () {
            return delete _this._observers[observerKey];
        });
    };
    this.onNext = function (value) {
        return Promise.all(Object.keys(_this._observers).map(function (key) {
            return _this._observers[key].onNext(value);
        })).then(function () {});
    };
    this._observers = Object.create(null);
};

exports.Subject = Subject;
var Observable;
exports.Observable = Observable;
(function (Observable) {
    function map(observable, mapFn) {
        var subject = new Subject();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(mapFn(value)).then(subject.onNext);
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.map = map;
    function filter(observable, filterFn) {
        var subject = new Subject();
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
        var subject = new Subject();
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
    function apply(patch, state) {
        return _state2['default'].splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
})(Patch || (exports.Patch = Patch = {}));
exports['default'] = Patch;

},{"./state":10}],8:[function(require,module,exports){
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
    Range.all = [_key2['default'].None, _key2['default'].None];
    function from(key) {
        return [key, _key2['default'].None];
    }
    Range.from = from;
    function to(key) {
        return [_key2['default'].None, key];
    }
    Range.to = to;
    function between(a, b) {
        return [a, b];
    }
    Range.between = between;
})(Range || (exports.Range = Range = {}));
exports['default'] = Range;

},{"./key":3}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

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
        prev: function prev(key) {
            return key == null ? Promise.resolve(_key2['default'].None) : _key2['default'].NOT_FOUND;
        },
        next: function next(key) {
            return key == null ? Promise.resolve(_key2['default'].None) : _key2['default'].NOT_FOUND;
        }
    };
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
    function slice(parent) {
        var range = arguments[1] === undefined ? [null, null] : arguments[1];

        return fromIterator(toIterator(parent, range));
    }
    State.slice = slice;
    function splice(parent, range) {
        var child = arguments[2] === undefined ? State.Empty : arguments[2];

        if (range[0] === range[1] && range[0] != null) return parent;
        var deleted = slice(parent, range),
            filtered = filter(parent, function (value, key) {
            return deleted.get(key).then(function () {
                return false;
            }, function () {
                return true;
            });
        });
        if (child === State.Empty) return filtered;
        function get(key) {
            return child.get(key)['catch'](function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? filtered.get(key) : Promise.reject(reason);
            });
        }
        function prev() {
            var key = arguments[0] === undefined ? null : arguments[0];

            if (key == range[0]) return child.prev();
            if (key == null) return filtered.prev();
            return child.prev(key).then(function (prev) {
                return prev == null ? range[1] : prev;
            }, function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? filtered.next(key) : Promise.reject(reason);
            });
        }
        function next() {
            var key = arguments[0] === undefined ? null : arguments[0];

            if (key == range[0]) return child.next();
            if (key == null) return filtered.next();
            return child.next(key).then(function (next) {
                return next == null ? range[1] : next;
            }, function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? filtered.next(key) : Promise.reject(reason);
            });
        }
        return { get: get, prev: prev, next: next };
    }
    State.splice = splice;
    function patch(parent, patch) {
        return splice(parent, patch.range, patch.added);
    }
    State.patch = patch;
    function toIterator(state) {
        var range = arguments[1] === undefined ? _range2['default'].all : arguments[1];

        var current = null;
        function get() {
            return state.get(current);
        }
        function next() {
            return state.next(current === null ? range[0] : current).then(function (next) {
                return current = next == range[1] ? null : next;
            });
        }
        return { get: get, next: next };
    }
    State.toIterator = toIterator;
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
        return _cache2['default'].apply(_cache2['default'].create(), parent);
    }
    State.cache = cache;
    function keyBy(parent, keyFn) {
        var keyMap = cache(State.map(parent, keyFn));
        var reverseKeyMap = cache({
            get: function get(key) {
                return _async_iterator2['default'].keyOf(State.toIterator(keyMap), key);
            },
            prev: function prev(key) {
                return reverseKeyMap.get(key).then(keyMap.prev).then(keyMap.get);
            },
            next: function next(key) {
                return reverseKeyMap.get(key).then(keyMap.next).then(keyMap.get);
            }
        });
        return extend(reverseKeyMap, { get: function get(key) {
                return reverseKeyMap.get(key).then(parent.get);
            } });
    }
    State.keyBy = keyBy;
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
        return _cache2['default'].apply(cache, { get: get, prev: prev, next: next });
    }
    State.fromIterator = fromIterator;
})(State || (exports.State = State = {}));
exports['default'] = State;

},{"./async_iterator":1,"./cache":2,"./key":3,"./range":9,"./tree":11}],11:[function(require,module,exports){
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

},{"./state":10}],12:[function(require,module,exports){
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

var _list2 = _interopRequireDefault(_list);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable = require('./observable');

var _mutable = require('./mutable');

var _mutable2 = _interopRequireDefault(_mutable);

var _promise_utils = require('./promise_utils');

var _promise_utils2 = _interopRequireDefault(_promise_utils);

function Sonic(obj) {
    if (obj instanceof Array) return _mutable2['default'].create(_state2['default'].fromArray(obj), new _observable.Subject());
    if (obj instanceof Object) return _mutable2['default'].create(_state2['default'].fromObject(obj), new _observable.Subject());
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.State = _state2['default'];
    Sonic.AsyncIterator = _async_iterator2['default'];
    Sonic.List = _list2['default'];
    Sonic.Tree = _tree2['default'];
    Sonic.Subject = _observable.Subject;
    Sonic.Mutable = _mutable2['default'];
    Sonic.Cache = _cache2['default'];
    Sonic.PromiseUtils = _promise_utils2['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./async_iterator":1,"./cache":2,"./list":4,"./mutable":5,"./observable":6,"./promise_utils":8,"./state":10,"./tree":11}]},{},[12])(12)
});