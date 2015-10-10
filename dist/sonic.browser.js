(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var Cache;
exports.Cache = Cache;
(function (Cache) {
    Cache.DELETED = {};
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
    function patch(cache, patch) {
        cache = extend(cache);
        if (_patch2['default'].isSetPatch(patch)) {
            cache.get[patch.key] = patch.value;
            var next = patch.before;
            if (next !== undefined) {
                var prev = cache.prev[next];
                if (prev !== undefined) {
                    cache.prev[patch.key] = prev;
                    cache.next[prev] = patch.key;
                }
                cache.prev[next] = patch.key;
                cache.next[patch.key] = next;
            }
        }
        if (_patch2['default'].isDeletePatch(patch)) {
            var next = cache.next[patch.key],
                prev = cache.prev[patch.key];
            if (prev !== undefined) cache.next[prev] = next;
            if (next !== undefined) cache.prev[next] = prev;
            cache.get[patch.key] = Cache.DELETED;
            cache.prev[patch.key] = Cache.DELETED;
            cache.next[patch.key] = Cache.DELETED;
        }
        return cache;
    }
    Cache.patch = patch;
    function apply(cache, state) {
        function get(key) {
            if (cache.get[key] === Cache.DELETED) return _state2['default'].NOT_FOUND;
            return key in cache.get ? Promise.resolve(cache.get[key]) : state.get(key).then(function (res) {
                return cache.get[key] = res;
            });
        }
        function prev(key) {
            if (cache.prev[key] === Cache.DELETED) return _state2['default'].NOT_FOUND;
            return key in cache.prev ? Promise.resolve(cache.prev[key]) : state.prev(key).then(function (res) {
                return cache.prev[cache.next[res] = key] = res;
            });
        }
        function next(key) {
            if (cache.next[key] === Cache.DELETED) return _state2['default'].NOT_FOUND;
            return key in cache.next ? Promise.resolve(cache.next[key]) : state.next(key).then(function (res) {
                return cache.next[cache.prev[res] = key] = res;
            });
        }
        return { get: get, prev: prev, next: next };
    }
    Cache.apply = apply;
})(Cache || (exports.Cache = Cache = {}));
exports['default'] = Cache;

},{"./patch":6,"./state":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Key;
(function (Key) {
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable = require('./observable');

var List;
exports.List = List;
(function (List) {
    function map(parent, mapFn) {
        var state = _state2['default'].map(parent.state, mapFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            if (_patch2['default'].isSetPatch(patch)) return Promise.resolve(mapFn(patch.value, patch.key)).then(function (result) {
                return _patch2['default'].setPatch(patch.key, result, patch.before);
            });
            return patch;
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = _state2['default'].filter(parent.state, filterFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            if (_patch2['default'].isSetPatch(patch)) return Promise.resolve(filterFn(patch.value, patch.key)).then(function (result) {
                return result ? patch : _patch2['default'].deletePatch(patch.key);
            });
            return patch;
        });
        return create(state, patches);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = _state2['default'].zoom(parent.state, key),
            patches = _observable.Observable.filter(parent.patches, function (patch) {
            return patch.key === key;
        });
        return create(state, patches);
    }
    List.zoom = zoom;
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
        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _state2['default'].patch : arguments[2];

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

},{"./cache":1,"./observable":5,"./patch":6,"./state":8}],4:[function(require,module,exports){
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
        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _state2['default'].patch : arguments[2];

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

},{"./observable":5,"./state":8}],5:[function(require,module,exports){
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

},{"./key":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
;
;
;
var Patch;
exports.Patch = Patch;
(function (Patch) {
    Patch.SET = "set";
    Patch.DELETE = "delete";
    function setPatch(key, value, before) {
        return {
            operation: Patch.SET,
            key: key,
            value: value,
            before: before
        };
    }
    Patch.setPatch = setPatch;
    function deletePatch(key) {
        return {
            operation: Patch.DELETE,
            key: key
        };
    }
    Patch.deletePatch = deletePatch;
    function isSetPatch(patch) {
        return patch.operation === Patch.SET;
    }
    Patch.isSetPatch = isSetPatch;
    function isDeletePatch(patch) {
        return patch.operation === Patch.DELETE;
    }
    Patch.isDeletePatch = isDeletePatch;
})(Patch || (exports.Patch = Patch = {}));
exports["default"] = Patch;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Sonic = Sonic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable = require('./observable');

var _mutable = require('./mutable');

var _mutable2 = _interopRequireDefault(_mutable);

function Sonic(obj) {
    if (obj instanceof Array) return _mutable2['default'].create(_state2['default'].fromArray(obj), new _observable.Subject());
    if (obj instanceof Object) return _mutable2['default'].create(_state2['default'].fromObject(obj), new _observable.Subject());
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.Patch = _patch2['default'];
    Sonic.State = _state2['default'];
    Sonic.StateIterator = _state_iterator2['default'];
    Sonic.List = _list2['default'];
    Sonic.Tree = _tree2['default'];
    Sonic.Subject = _observable.Subject;
    Sonic.Mutable = _mutable2['default'];
    Sonic.Cache = _cache2['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./cache":1,"./list":3,"./mutable":4,"./observable":5,"./patch":6,"./state":8,"./state_iterator":9,"./tree":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _tree = require('./tree');

var State;
exports.State = State;
(function (State) {
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
    function patch(parent, patch) {
        var partial;
        if (_patch2['default'].isSetPatch(patch)) {
            partial = {
                get: function get(key) {
                    return key === patch.key ? Promise.resolve(patch.value) : parent.get(key);
                }
            };
            if (patch.before !== undefined) {
                partial.prev = function () {
                    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    if (key === patch.before) return Promise.resolve(key);
                    if (key === patch.key) return parent.prev(patch.before);
                    return parent.prev(key);
                };
                partial.next = function () {
                    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    if (key === patch.key) return Promise.resolve(patch.before);
                    return parent.next(key).then(function (next) {
                        return next == patch.before ? patch.key : next;
                    });
                };
            }
        }
        if (_patch2['default'].isDeletePatch(patch)) {
            partial = {
                get: function get(key) {
                    return key !== patch.key ? parent.get(key) : State.NOT_FOUND;
                },
                prev: function prev() {
                    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                    return parent.prev(key).then(function (prev) {
                        return prev === patch.key ? parent.prev(prev) : prev;
                    });
                },
                next: function next() {
                    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                    return parent.next(key).then(function (next) {
                        return next === patch.key ? parent.next(next) : next;
                    });
                }
            };
        }
        return extend(parent, partial);
        ;
    }
    State.patch = patch;
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
        return extend(parent, {
            get: function get(key) {
                return parent.get(key).then(function (value) {
                    return filterFn(value) ? value : State.NOT_FOUND;
                });
            },
            prev: function prev(key) {
                return _state_iterator2['default'].findKey(State.reverse(parent), filterFn, [key, null]);
            },
            next: function next(key) {
                return _state_iterator2['default'].findKey(parent, filterFn, [key, null]);
            }
        });
    }
    State.filter = filter;
    function zoom(parent, key) {
        var next = function next(k) {
            return k == null ? Promise.resolve(key) : k === key ? Promise.resolve(null) : State.NOT_FOUND;
        };
        return extend(parent, {
            get: function get(k) {
                return k === key ? parent.get(key) : State.NOT_FOUND;
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
                return _state_iterator2['default'].keyOf(keyMap, key);
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
                return key in values ? Promise.resolve(values[key]) : State.NOT_FOUND;
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
                return key in values ? Promise.resolve(values[key]) : State.NOT_FOUND;
            },
            prev: function prev(key) {
                if (key == null) return Promise.resolve(keys[keys.length - 1]);
                if (!(key in indexByKey)) return State.NOT_FOUND;
                var index = indexByKey[key];
                if (index === 0) return Promise.resolve(null);
                return Promise.resolve(keys[index - 1]);
            },
            next: function next(key) {
                if (key == null) return Promise.resolve(keys[0]);
                if (!(key in indexByKey)) return State.NOT_FOUND;
                var index = indexByKey[key];
                if (index === keys.length - 1) return Promise.resolve(null);
                return Promise.resolve(keys[index + 1]);
            }
        };
    }
    State.fromObject = fromObject;
})(State || (exports.State = State = {}));
Object.defineProperty(State, "NOT_FOUND", {
    get: function get() {
        return Promise.reject("No entry at the specified key");
    }
});
exports['default'] = State;

},{"./cache":1,"./patch":6,"./state_iterator":9,"./tree":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var StateIterator = function StateIterator(state) {
    var _this = this;

    var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

    _classCallCheck(this, StateIterator);

    this.get = function () {
        return _this.state.get(_this.current);
    };
    this.prev = function () {
        return _this.state.prev(_this.current == null ? _this.range[1] : _this.current).then(function (prev) {
            if (prev == _this.range[0]) return _this.current = null;
            return _this.current = prev;
        });
    };
    this.next = function () {
        return _this.state.next(_this.current == null ? _this.range[0] : _this.current).then(function (next) {
            if (next == _this.range[1]) return _this.current = null;
            return _this.current = next;
        });
    };
    this.state = state;
    this.range = range;
};

exports.StateIterator = StateIterator;

(function (StateIterator) {
    function first(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        return state.next(range[0]).then(state.get);
    }
    StateIterator.first = first;
    function last(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        return state.prev(range[1]).then(state.get);
    }
    StateIterator.last = last;
    function every(state, predicate, range) {
        var iterator = new StateIterator(state, range);
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
    StateIterator.every = every;
    function some(state, predicate, range) {
        return every(state, function (value, key) {
            return Promise.resolve(predicate(value, key)).then(function (result) {
                return !result;
            });
        }, range).then(function (result) {
            return !result;
        });
    }
    StateIterator.some = some;
    function forEach(state, fn, range) {
        return every(state, function (value, key) {
            return Promise.resolve(fn(value, key)).then(function () {
                return true;
            });
        }, range).then(function () {});
    }
    StateIterator.forEach = forEach;
    function reduce(state, fn, memo, range) {
        return forEach(state, function (value, key) {
            return Promise.resolve(fn(memo, value, key)).then(function (value) {
                memo = value;
            });
        }, range).then(function () {
            return memo;
        });
    }
    StateIterator.reduce = reduce;
    function toArray(state, range) {
        return reduce(state, function (memo, value) {
            return (memo.push(value), memo);
        }, [], range);
    }
    StateIterator.toArray = toArray;
    function toObject(state, range) {
        return reduce(state, function (memo, value, key) {
            return (memo[key] = value, memo);
        }, Object.create(null), range);
    }
    StateIterator.toObject = toObject;
    function findKey(state, predicate, range) {
        var key;
        return some(state, function (v, k) {
            return Promise.resolve(predicate(v, k)).then(function (res) {
                return res ? (key = k, true) : false;
            });
        }, range).then(function (found) {
            return found ? key : null;
        });
    }
    StateIterator.findKey = findKey;
    function find(state, predicate, range) {
        return findKey(state, predicate, range).then(state.get);
    }
    StateIterator.find = find;
    function keyOf(state, value, range) {
        return findKey(state, function (v) {
            return v === value;
        }, range);
    }
    StateIterator.keyOf = keyOf;
    function indexOf(state, value, range) {
        var index = -1;
        return some(state, function (v, k) {
            return (index++, value == v);
        }, range).then(function (found) {
            if (found) {
                return index;
            } else _state2['default'].NOT_FOUND;
        });
    }
    StateIterator.indexOf = indexOf;
    function keyAt(state, index, range) {
        return findKey(state, function () {
            return 0 === index--;
        }, range);
    }
    StateIterator.keyAt = keyAt;
    function at(state, index, range) {
        return keyAt(state, index, range).then(state.get);
    }
    StateIterator.at = at;
    function contains(state, value, range) {
        return some(state, function (v) {
            return v === value;
        }, range);
    }
    StateIterator.contains = contains;
})(StateIterator || (exports.StateIterator = StateIterator = {}));
exports['default'] = StateIterator;

},{"./state":8}],10:[function(require,module,exports){
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

},{"./state":8}]},{},[7])(7)
});