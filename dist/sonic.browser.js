(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var factory;
exports.factory = factory;
(function (factory) {
    function fromArray(values) {
        return {
            get: function get(key) {
                if (key in values) return Promise.resolve(values[key]);
                return Promise.reject(new Error());
            },
            prev: function prev(key) {
                var index = key == null ? values.length - 1 : key - 1;
                return Promise.resolve(index == -1 ? null : index);
            },
            next: function next(key) {
                var index = key == null ? 0 : key + 1;
                return Promise.resolve(index == values.length ? null : index);
            }
        };
    }
    factory.fromArray = fromArray;
    function fromObject(values) {
        var keys = Object.keys(values),
            indexByKey = {
            "null": -1
        };
        return {
            get: function get(key) {
                if (key in values) return Promise.resolve(values[key]);
                return Promise.reject(new Error());
            },
            prev: function prev(key) {
                var index = key == null ? keys.length - 1 : indexByKey[key] - 1;
                indexByKey[keys[index]] = index;
                if (key == null) return Promise.resolve(keys[keys.length - 1]);
                if (!(key in values)) return Promise.reject(new Error());
                return Promise.resolve(index == -1 ? null : keys[index]);
            },
            next: function next(key) {
                var index = indexByKey[key] + 1;
                indexByKey[keys[index]] = index;
                if (key == null) return Promise.resolve(keys[0]);
                if (!(key in values)) return Promise.reject(new Error());
                return Promise.resolve(index == keys.length ? null : keys[index]);
            }
        };
    }
    factory.fromObject = fromObject;
})(factory || (exports.factory = factory = {}));
exports["default"] = factory;

},{}],2:[function(require,module,exports){
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _observable = require('./observable');

var _patch = require('./patch');

var KeyedList = (function () {
    function KeyedList(values, keyFn) {
        _classCallCheck(this, KeyedList);

        this._keyFn = keyFn || _key2['default'].create;
        this._subject = new _observable.Subject();
        this._pseudoState = Object.keys(values).reduce(function (state, key, index, keys) {
            state.get[key] = values[key];
            if (index == 0) state.next['null'] = key;
            if (index == keys.length - 1) state.prev['null'] = key;
            state.prev[key] = keys[index - 1] != null ? keys[index - 1] : null;
            state.next[key] = keys[index + 1] != null ? keys[index + 1] : null;
            return state;
        }, {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        });
    }

    _createClass(KeyedList, [{
        key: 'add',
        value: function add(value) {
            var key = this._keyFn(value);
            if (key in this._pseudoState.get) return this.replace(key, value);
            var pseudoState = Object.create(this._pseudoState);
            pseudoState.get[key] = value;
            var prev = pseudoState.prev['null'],
                next = null;
            pseudoState.prev[next] = key;
            pseudoState.next[key] = next;
            pseudoState.prev[key] = prev;
            pseudoState.next[prev] = key;
            this._pseudoState = pseudoState;
            this._subject.onInvalidate([{ op: _patch.Operation[_patch.Operation.add], key: key, value: Promise.resolve(value) }]);
            return Promise.resolve();
        }
    }, {
        key: 'replace',
        value: function replace(key, value) {
            if (!(key in this._pseudoState.get)) return Promise.reject(new Error());
            var pseudoState = Object.create(this._pseudoState);
            pseudoState.get[key] = value;
            this._pseudoState = pseudoState;
            this._subject.onInvalidate([{ op: _patch.Operation[_patch.Operation.replace], key: key, value: Promise.resolve(value) }]);
            return Promise.resolve();
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            if (!(key in this._pseudoState.get)) return Promise.reject(new Error());
            var pseudoState = Object.create(this._pseudoState);
            pseudoState.get[key] = KeyedList.DELETED;
            var prev = pseudoState.prev[key],
                next = pseudoState.next[key];
            pseudoState.prev[next] = prev;
            pseudoState.next[prev] = next;
            this._pseudoState = pseudoState;
            this._subject.onInvalidate([{ op: _patch.Operation[_patch.Operation.remove], key: key }]);
            return Promise.resolve();
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }, {
        key: 'state',
        get: function get() {
            var pseudoState = this._pseudoState;
            return {
                get: function get(key) {
                    if (key in pseudoState.get && pseudoState.get[key] != KeyedList.DELETED) return Promise.resolve(pseudoState.get[key]);
                    return Promise.reject(new Error());
                },
                prev: function prev() {
                    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    if (key in pseudoState.prev) return Promise.resolve(pseudoState.prev[key]);
                    return Promise.reject(new Error());
                },
                next: function next() {
                    var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                    if (key in pseudoState.next) return Promise.resolve(pseudoState.next[key]);
                    return Promise.reject(new Error());
                }
            };
        }
    }]);

    return KeyedList;
})();

exports['default'] = KeyedList;

KeyedList.DELETED = {};
module.exports = exports['default'];

},{"./key":2,"./observable":5,"./patch":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _observable = require('./observable');

var _patch = require('./patch');

var List;
exports.List = List;
(function (List) {
    function create(state, observable) {
        var list = {
            state: state,
            subscribe: observable.subscribe
        };
        observable.subscribe({
            onNext: function onNext(patch) {
                list.state = _state2['default'].patch(list.state, patch);
            }
        });
        return list;
    }
    List.create = create;
    function map(parent, mapFn) {
        var state = _state2['default'].map(parent.state, mapFn),
            observable = _observable.Observable.map(parent, function (patch) {
            if (!_patch.Patch.isSetPatch(patch)) return patch;else return Promise.resolve(mapFn(patch.value, patch.key)).then(function (result) {
                return {
                    operation: _patch.Patch.SET,
                    key: patch.key,
                    value: result,
                    before: patch.before
                };
            });
        });
        return create(state, observable);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = _state2['default'].filter(parent.state, filterFn),
            observable = _observable.Observable.map(parent, function (patch) {
            if (!_patch.Patch.isSetPatch(patch)) return patch;else return Promise.resolve(filterFn(patch.value, patch.key)).then(function (result) {
                if (result) return patch;
                return {
                    operation: _patch.Patch.DELETE,
                    key: patch.key
                };
            });
        });
        return create(state, observable);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = _state2['default'].zoom(parent.state, key),
            observable = _observable.Observable.filter(parent, function (patch) {
            return patch.key === key;
        });
        return create(state, observable);
    }
    List.zoom = zoom;
})(List || (exports.List = List = {}));
exports['default'] = List;

},{"./observable":5,"./patch":6,"./state":8}],5:[function(require,module,exports){
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

var _keyed_list = require('./keyed_list');

var _keyed_list2 = _interopRequireDefault(_keyed_list);

var _factory2 = require('./factory');

var _factory3 = _interopRequireDefault(_factory2);

var _observable = require('./observable');

function Sonic(obj) {
    // if (obj instanceof Array) return new _List(_factory.fromArray(obj));
    // if (obj instanceof Object) return new _List(_factory.fromObject(obj));
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.Patch = _patch2['default'];
    Sonic.State = _state2['default'];
    Sonic.StateIterator = _state_iterator2['default'];
    Sonic.List = _list2['default'];
    // export var KeyedList      = _KeyedList;
    // export var Cache          = _Cache;
    Sonic.factory = _factory3['default'];
    Sonic.KeyedList = _keyed_list2['default'];
    Sonic.Subject = _observable.Subject;
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./factory":1,"./keyed_list":3,"./list":4,"./observable":5,"./patch":6,"./state":8,"./state_iterator":9}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

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
        var state = parent;
        if (_patch2['default'].isSetPatch(patch)) state = extend(state, set(state, patch.key, patch.value, patch.before));
        if (_patch2['default'].isDeletePatch(patch)) state = extend(state, del(state, patch.key));
        return state;
    }
    State.patch = patch;
    function patches(parent, patches) {
        return patches.reduce(function (state, ptch) {
            return patch(state, ptch);
        }, parent);
    }
    State.patches = patches;
    function set(parent, key, value, before) {
        var state = {
            get: function get(k) {
                return k === key ? Promise.resolve(value) : parent.get(k);
            }
        };
        if (before !== undefined) {
            state.prev = function () {
                var k = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                if (k === before) return Promise.resolve(key);else if (k == key) return parent.prev(before);
                return parent.prev(k);
            };
            state.next = function () {
                var k = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                if (k === key) return Promise.resolve(before);
                return parent.next(k).then(function (n) {
                    return n == before ? key : n;
                });
            };
        }
        return extend(parent, state);
    }
    State.set = set;
    function del(parent, key) {
        return extend(parent, {
            get: function get(k) {
                return k !== key ? parent.get(k) : State.NOT_FOUND;
            },
            prev: function prev() {
                var k = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                return parent.prev(k).then(function (p) {
                    return p === key ? parent.prev(p) : p;
                });
            },
            next: function next() {
                var k = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
                return parent.next(k).then(function (n) {
                    return n === key ? parent.next(n) : n;
                });
            }
        });
    }
    State.del = del;
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
})(State || (exports.State = State = {}));
Object.defineProperty(State, "NOT_FOUND", {
    get: function get() {
        return Promise.reject("No entry at the specified key");
    }
});
exports['default'] = State;

},{"./patch":6,"./state_iterator":9}],9:[function(require,module,exports){
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

},{"./state":8}]},{},[7])(7)
});