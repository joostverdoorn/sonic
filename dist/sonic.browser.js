(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _state = require('./state');

var _list = require('./list');

var _mutable = require('./mutable');

var factory;
exports.factory = factory;
(function (factory) {
    factory.State = _state.factory;
    factory.List = _list.factory;
    factory.Mutable = _mutable.factory;
})(factory || (exports.factory = factory = {}));
exports['default'] = factory;

},{"./list":3,"./mutable":4,"./state":7}],2:[function(require,module,exports){
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

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _observable = require('./observable');

var _patch = require('./patch');

var List;
exports.List = List;
(function (List) {
    var DELETED = Promise.resolve({});
    function cache(parent) {
        function getState(_get, _prev, _next) {
            return {
                get: function get(key) {
                    if (_get[key] == DELETED) return Promise.reject(new Error());
                    return _get[key] === undefined ? _get[key] = parent.state.get(key) : _get[key];
                },
                prev: function prev(key) {
                    return _prev[key] === undefined ? parent.state.prev(key).then(function (res) {
                        return (_next[res] = key, _prev[key] = res);
                    }) : Promise.resolve(_prev[key]);
                },
                next: function next(key) {
                    return _next[key] === undefined ? parent.state.next(key).then(function (res) {
                        return (_prev[res] = key, _next[key] = res);
                    }) : Promise.resolve(_next[key]);
                }
            };
        }
        var subject = new _observable.Subject(),
            pseudoState = {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        },
            list = Object.defineProperties({
            subscribe: subject.subscribe
        }, {
            state: {
                get: function get() {
                    return getState(pseudoState.get, pseudoState.prev, pseudoState.next);
                },
                configurable: true,
                enumerable: true
            }
        });
        parent.subscribe({
            onNext: function onNext(patch) {
                return Promise.resolve().then(function () {
                    var state = list.state;
                    pseudoState = {
                        get: Object.create(pseudoState.get),
                        prev: Object.create(pseudoState.prev),
                        next: Object.create(pseudoState.next)
                    };
                    if (_patch.Patch.isSetPatch(patch)) {
                        pseudoState.get[patch.key] = Promise.resolve(patch.value);
                        if (patch.before !== undefined) return state.prev(patch.before).then(function (prev) {
                            var next = patch.before;
                            pseudoState.prev[next] = patch.key;
                            pseudoState.next[patch.key] = next;
                            pseudoState.prev[patch.key] = prev;
                            pseudoState.next[prev] = patch.key;
                        });
                    }
                    if (_patch.Patch.isDeletePatch(patch)) {
                        pseudoState.get[patch.key] = DELETED;
                        return state.prev(patch.key).then(function (prev) {
                            return list.state.next(patch.key).then(function (next) {
                                return (pseudoState.prev[next] = prev, pseudoState.next[prev] = next);
                            });
                        });
                    }
                }).then(function () {
                    return subject.onNext(patch);
                });
            }
        });
        return list;
    }
    List.cache = cache;
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
        return factory.create(state, observable);
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
        return factory.create(state, observable);
    }
    List.filter = filter;
    function zoom(parent, key) {
        var state = _state2['default'].zoom(parent.state, key),
            observable = _observable.Observable.filter(parent, function (patch) {
            return patch.key === key;
        });
        return factory.create(state, observable);
    }
    List.zoom = zoom;
    function reverse(parent) {
        var state = _state2['default'].reverse(parent.state),
            list,
            observable = _observable.Observable.map(parent, function (patch) {
            if (!_patch.Patch.isSetPatch(patch)) return patch;else return patch.before === undefined ? patch : list.state.next(patch.before).then(function (prev) {
                return {
                    operation: _patch.Patch.SET,
                    key: patch.key,
                    value: patch.value,
                    before: prev
                };
            });
        });
        return list = factory.create(state, observable);
    }
    List.reverse = reverse;
})(List || (exports.List = List = {}));
var factory;
exports.factory = factory;
(function (factory) {
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
    factory.create = create;
})(factory || (exports.factory = factory = {}));
exports['default'] = List;

},{"./observable":5,"./patch":6,"./state":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _observable = require('./observable');

var _patch = require('./patch');

var _state = require('./state');

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var Mutable;
exports.Mutable = Mutable;
(function (Mutable) {
    function splice(mutable, range, values) {
        var reduceFn = function reduceFn(memo, value, key) {
            return Promise.resolve(memo).then(function () {
                return set(mutable, key, value, range[1]);
            });
        };
        return _state_iterator2['default'].reduce(values, reduceFn, _state_iterator2['default'].every(mutable.state, function (value, key) {
            return del(mutable, key).then(function () {
                return true;
            });
        }).then(function () {}));
    }
    Mutable.splice = splice;
    function set(mutable, key, value, before) {
        var patch = {
            operation: _patch.Patch.SET,
            key: key,
            value: value
        };
        if (before !== undefined) patch.before = before;
        return mutable.modify(patch);
    }
    Mutable.set = set;
    function del(mutable, key) {
        var patch = {
            operation: _patch.Patch.DELETE,
            key: key
        };
        return mutable.modify(patch);
    }
    Mutable.del = del;
    function compose(parent, lens) {
        var subject = new _observable.Subject(),
            list = _list2['default'].map(_list.factory.create(parent.state, subject), lens.get);
        return Object.defineProperties({
            subscribe: list.subscribe,
            modify: function modify(patch) {
                if (_patch.Patch.isSetPatch(patch)) {
                    if (patch.before !== undefined) return parent.modify({
                        operation: patch.operation,
                        key: patch.key,
                        value: lens.set(undefined, patch.value),
                        before: patch.before
                    });
                    return parent.state.get(patch.key).then(function (value) {
                        return parent.modify({
                            operation: patch.operation,
                            key: patch.key,
                            value: lens.set(value, patch.value)
                        });
                    }).then(function () {
                        return subject.onNext(patch);
                    });
                }
                return parent.modify(patch).then(function () {
                    return subject.onNext(patch);
                });
            }
        }, {
            state: {
                get: function get() {
                    return list.state;
                },
                configurable: true,
                enumerable: true
            }
        });
    }
    Mutable.compose = compose;
})(Mutable || (exports.Mutable = Mutable = {}));
var factory;
exports.factory = factory;
(function (factory) {
    function create(state) {
        var subject = new _observable.Subject(),
            list = _list.factory.create(state, subject);
        return Object.defineProperties({
            subscribe: list.subscribe,
            // onNext: subject.onNext,
            modify: function modify(patch) {
                return subject.onNext(patch);
            }
        }, {
            state: {
                get: function get() {
                    return list.state;
                },
                configurable: true,
                enumerable: true
            }
        });
    }
    factory.create = create;
    function fromURL(urlRoot) {
        var subject = new _observable.Subject(),
            list = _list.factory.create(_state.factory.fromURL(urlRoot), subject);
        return Object.defineProperties({
            subscribe: subject.subscribe,
            modify: function modify(patch) {
                return new Promise(function (resolve) {
                    if (_patch.Patch.isSetPatch(patch)) {
                        if (patch.before !== undefined) return resolve(_xhr2['default'].post(urlRoot, patch.value));
                        return resolve(_xhr2['default'].put(urlRoot + '/' + patch.key, patch.value));
                    }
                    return resolve(_xhr2['default']['delete'](urlRoot + '/' + patch.key));
                }).then(function () {
                    return subject.onNext(patch);
                });
            }
        }, {
            state: {
                get: function get() {
                    return list.state;
                },
                configurable: true,
                enumerable: true
            }
        });
    }
    factory.fromURL = fromURL;
})(factory || (exports.factory = factory = {}));
exports['default'] = Mutable;

},{"./list":3,"./observable":5,"./patch":6,"./state":7,"./state_iterator":8,"./xhr":9}],5:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _patch = require('./patch');

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

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
        if (_patch.Patch.isSetPatch(patch)) state = extend(state, set(state, patch.key, patch.value, patch.before));
        if (_patch.Patch.isDeletePatch(patch)) state = extend(state, del(state, patch.key));
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
                var k = arguments[0] === undefined ? null : arguments[0];

                if (k === before) return Promise.resolve(key);else if (k == key) return parent.prev(before);
                return parent.prev(k);
            };
            state.next = function () {
                var k = arguments[0] === undefined ? null : arguments[0];

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
                var k = arguments[0] === undefined ? null : arguments[0];
                return parent.prev(k).then(function (p) {
                    return p === key ? parent.prev(p) : p;
                });
            },
            next: function next() {
                var k = arguments[0] === undefined ? null : arguments[0];
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
Object.defineProperty(State, 'NOT_FOUND', {
    get: function get() {
        return Promise.reject('No entry at the specified key');
    }
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
            'null': -1
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
    function fromURL(urlRoot) {
        var cache;
        function fetch() {
            return _xhr2['default'].get(urlRoot).then(function (xhr) {
                return xhr.responseText;
            }).then(JSON.parse).then(function (arr) {
                return cache = fromObject(arr.reduce(function (memo, value) {
                    memo[value['id']] = value;
                    return memo;
                }, {}));
            });
        }
        return {
            get: function get(key) {
                return cache ? cache.get(key) : _xhr2['default'].get(urlRoot + '/' + key).then(function (xhr) {
                    return xhr.responseText;
                }).then(JSON.parse);
            },
            prev: function prev(key) {
                return cache ? cache.prev(key) : fetch().then(function (cache) {
                    return cache.prev(key);
                });
            },
            next: function next(key) {
                return cache ? cache.next(key) : fetch().then(function (cache) {
                    return cache.next(key);
                });
            }
        };
    }
    factory.fromURL = fromURL;
})(factory || (exports.factory = factory = {}));
exports['default'] = State;

},{"./patch":6,"./state_iterator":8,"./xhr":9}],8:[function(require,module,exports){
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

    var range = arguments[1] === undefined ? [null, null] : arguments[1];

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
        var range = arguments[1] === undefined ? [null, null] : arguments[1];

        return state.next(range[0]).then(state.get);
    }
    StateIterator.first = first;
    function last(state) {
        var range = arguments[1] === undefined ? [null, null] : arguments[1];

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

},{"./state":7}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var XHR = {
    create: function create(key, options) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();var url = key.toString();var method = options.method;
            var body = options.body;

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            };
            xhr.onerror = function () {
                reject(xhr);
            };
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(JSON.stringify(body));
        });
    },
    get: function get(url) {
        return XHR.create(url, { method: 'GET' });
    },
    put: function put(url, body) {
        return XHR.create(url, { method: 'PUT', body: body });
    },
    post: function post(url, body) {
        return XHR.create(url, { method: 'POST', body: body });
    },
    'delete': function _delete(url) {
        return XHR.create(url, { method: 'DELETE' });
    }
};
exports.XHR = XHR;
exports['default'] = XHR;

},{}],10:[function(require,module,exports){
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

var _factory2 = require('./factory');

var _factory3 = _interopRequireDefault(_factory2);

var _observable = require('./observable');

var _mutable = require('./mutable');

var _mutable2 = _interopRequireDefault(_mutable);

function Sonic(obj) {
    if (obj instanceof Array) return _factory3['default'].Mutable.create(_factory3['default'].State.fromArray(obj));
    if (obj instanceof Object) return _factory3['default'].Mutable.create(_factory3['default'].State.fromObject(obj));
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
    // export var KeyedList      = _KeyedList;
    Sonic.Subject = _observable.Subject;
    Sonic.Mutable = _mutable2['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./factory":1,"./list":3,"./mutable":4,"./observable":5,"./patch":6,"./state":7,"./state_iterator":8}]},{},[10])(10)
});