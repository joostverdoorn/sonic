(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get2 = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _list = require('./list');

var Cache = (function (_List) {
    function Cache(list) {
        _classCallCheck(this, Cache);

        _get2(Object.getPrototypeOf(Cache.prototype), 'constructor', this).call(this);
        this._list = list;
        this._get = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        list.observe(this);
    }

    _inherits(Cache, _List);

    _createClass(Cache, [{
        key: 'onInvalidate',
        value: function onInvalidate() {
            var _this = this;

            for (var _len = arguments.length, events = Array(_len), _key = 0; _key < _len; _key++) {
                events[_key] = arguments[_key];
            }

            this._get = Object.create(this._get);
            this._prev = Object.create(this._prev);
            this._next = Object.create(this._next);
            events.forEach(function (event) {
                var key = event.key,
                    value = event.value;
                switch (event.type) {
                    case _list.EventType.add:
                        _this._get[key] = value;
                        var prev = _this._prev['null'],
                            next = null;
                        _this._prev[next] = key;
                        _this._next[key] = next;
                        _this._prev[key] = prev;
                        _this._next[prev] = key;
                        break;
                    case _list.EventType.remove:
                        _this._get[key] = Cache.DELETED;
                        var prev = _this._prev[key],
                            next = _this._next[key];
                        _this._prev[next] = prev;
                        _this._next[prev] = next;
                        break;
                    case _list.EventType.replace:
                        _this._get[key] = value;
                        break;
                }
            });
            this._subject.notify(function (observer) {
                return observer.onInvalidate.apply(observer, events);
            });
        }
    }, {
        key: 'state',
        get: function get() {
            var _get = this._get,
                _prev = this._prev,
                _next = this._next,
                old = this._list.state;
            var state = {
                get: function get(key) {
                    if (_get[key] == Cache.DELETED) return Promise.reject(new Error());
                    return _get[key] == null ? old.get(key).then(function (res) {
                        return _get[key] = res;
                    }) : Promise.resolve(_get[key]);
                },
                prev: function prev(key) {
                    return _prev[key] == null ? old.prev(key).then(function (res) {
                        return (_next[res] = key, _prev[key] = res);
                    }) : Promise.resolve(_prev[key]);
                },
                next: function next(key) {
                    return _next[key] == null ? old.next(key).then(function (res) {
                        return (_prev[res] = key, _next[key] = res);
                    }) : Promise.resolve(_next[key]);
                }
            };
            return state;
        }
    }]);

    return Cache;
})(_list.List);

exports.Cache = Cache;

Cache.DELETED = {};
exports['default'] = Cache;

},{"./list":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _observable = require('./observable');

var EventType;
exports.EventType = EventType;
(function (EventType) {
    EventType[EventType['add'] = 0] = 'add';
    EventType[EventType['remove'] = 1] = 'remove';
    EventType[EventType['replace'] = 2] = 'replace';
})(EventType || (exports.EventType = EventType = {}));

var List = (function () {
    function List(initial) {
        var _this = this;

        _classCallCheck(this, List);

        Object.keys(_state_iterator2['default']).forEach(function (key) {
            return _this[key] = function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return _state_iterator2['default'][key].apply(_state_iterator2['default'], [_this.state].concat(args));
            };
        });
        Object.keys(List).forEach(function (key) {
            return _this[key] = function () {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    args[_key2] = arguments[_key2];
                }

                return List[key].apply(List, [_this].concat(args));
            };
        });
        if (initial != null) this.state = initial;
        this._subject = new _observable.Subject();
    }

    _createClass(List, [{
        key: 'add',
        value: function add(key, value) {
            this.onInvalidate({ type: EventType.add, key: key, value: value });
            return Promise.resolve();
        }
    }, {
        key: 'replace',
        value: function replace(key, value) {
            this.onInvalidate({ type: EventType.replace, key: key, value: value });
            return Promise.resolve();
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            this.onInvalidate({ type: EventType.remove, key: key });
            return Promise.resolve();
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }, {
        key: 'onInvalidate',
        value: function onInvalidate() {
            var _this2 = this;

            for (var _len3 = arguments.length, events = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                events[_key3] = arguments[_key3];
            }

            events.forEach(function (event) {
                switch (event.type) {
                    case EventType.add:
                        _this2.state = _state2['default'].add(_this2.state, event.key, event.value);
                        break;
                    case EventType.remove:
                        _this2.state = _state2['default'].remove(_this2.state, event.key);
                        break;
                    case EventType.replace:
                        _this2.state = _state2['default'].replace(_this2.state, event.key, event.value);
                        break;
                }
            });
            this._subject.notify(function (observer) {
                return observer.onInvalidate.apply(observer, events);
            });
        }
    }, {
        key: 'get',
        get: function get() {
            return this.state.get;
        }
    }, {
        key: 'prev',
        get: function get() {
            return this.state.prev;
        }
    }, {
        key: 'next',
        get: function get() {
            return this.state.next;
        }
    }]);

    return List;
})();

exports.List = List;

(function (List) {
    function map(old, mapFn) {
        var list = new List(_state2['default'].map(old.state, mapFn));
        old.observe({
            onInvalidate: function onInvalidate() {
                for (var _len4 = arguments.length, events = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    events[_key4] = arguments[_key4];
                }

                Promise.all(events.map(function (event) {
                    return Promise.resolve(mapFn(event.value, event.key)).then(function (value) {
                        return { type: event.type, key: event.key, value: value };
                    });
                })).then(function (res) {
                    return list.onInvalidate.apply(list, _toConsumableArray(res));
                });
            }
        });
        return list;
    }
    List.map = map;
})(List || (exports.List = List = {}));
exports['default'] = List;

},{"./observable":5,"./state":6,"./state_iterator":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Subject = function Subject() {
    var _this = this;

    _classCallCheck(this, Subject);

    this.observe = function (observer) {
        var observerKey = _key2['default'].create();
        _this._observers[observerKey] = observer;
        return {
            unsubscribe: function unsubscribe() {
                delete _this._observers[observerKey];
            }
        };
    };
    this.notify = function (notifier) {
        for (var observerKey in _this._observers) notifier(_this._observers[observerKey]);
    };
    this._observers = Object.create(null);
};

exports.Subject = Subject;

},{"./key":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _state_iterator = require("./state_iterator");

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var State;
exports.State = State;
(function (State) {
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
    State.fromArray = fromArray;
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
    State.fromObject = fromObject;
    function add(old, key, value) {
        var state = Object.create(old);
        state.prev = function (k) {
            if (k == null) return Promise.resolve(key);else if (k == key) return old.prev(null);
            return old.prev(k);
        };
        state.next = function (k) {
            if (k == key) return Promise.resolve(null);
            return old.next(k).then(function (n) {
                return n == null ? key : n;
            });
        };
        return State.replace(state, key, value);
    }
    State.add = add;
    function replace(old, key, value) {
        var state = Object.create(old);
        state.get = function (k) {
            if (k == key) return Promise.resolve(value);
            return old.get(k);
        };
        return state;
    }
    State.replace = replace;
    function remove(old, key) {
        var state = Object.create(old);
        state.get = function (k) {
            if (k == key) return Promise.reject(new Error());
            return old.get(k);
        };
        state.prev = function (k) {
            return old.prev(k).then(function (p) {
                return p == key ? old.prev(p) : p;
            });
        };
        state.next = function (k) {
            return old.next(k).then(function (n) {
                return n == key ? old.next(n) : n;
            });
        };
        return state;
    }
    State.remove = remove;
    function reverse(old) {
        var state = Object.create(old);
        state.prev = old.next;
        state.next = old.prev;
        return state;
    }
    State.reverse = reverse;
    function map(old, mapFn) {
        var state = Object.create(old);
        state.get = function (key) {
            return old.get(key).then(function (value) {
                return mapFn(value, key);
            });
        };
        return state;
    }
    State.map = map;
    function filter(old, filterFn) {
        var state = Object.create(old);
        state.get = function (key) {
            return old.get(key).then(function (value) {
                if (filterFn(value)) return value;
                throw new Error();
            });
        };
        state.prev = function (key) {
            return _state_iterator2["default"].findKey(State.reverse(old), filterFn, [key, null]);
        };
        state.next = function (key) {
            return _state_iterator2["default"].findKey(old, filterFn, [key, null]);
        };
        return state;
    }
    State.filter = filter;
})(State || (exports.State = State = {}));
exports["default"] = State;

},{"./state_iterator":7}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        return _this.state.next(_this.current == null ? _this.range[0] : _this.current).then(function (prev) {
            if (prev == _this.range[1]) return _this.current = null;
            return _this.current = prev;
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
        }).then(function (result) {
            return !result;
        });
    }
    StateIterator.some = some;
    function forEach(state, fn, range) {
        return every(state, function (value, key) {
            return Promise.resolve(fn(value, key)).then(function () {
                return true;
            });
        }).then(function () {});
    }
    StateIterator.forEach = forEach;
    function reduce(state, fn, memo, range) {
        return forEach(state, function (value, key) {
            return Promise.resolve(fn(memo, value, key)).then(function (value) {
                memo = value;
            });
        }).then(function () {
            return memo;
        });
    }
    StateIterator.reduce = reduce;
    function toArray(state, range) {
        return reduce(state, function (memo, value) {
            return (memo.push(value), memo);
        }, []);
    }
    StateIterator.toArray = toArray;
    function toObject(state, range) {
        return reduce(state, function (memo, value, key) {
            return (memo[key] = value, memo);
        }, Object.create(null));
    }
    StateIterator.toObject = toObject;
    function findKey(state, fn, range) {
        var key;
        return some(state, function (v, k) {
            return Promise.resolve(fn(v, k)).then(function (res) {
                return res ? !!(key = k) || true : false;
            });
        }).then(function (found) {
            return found ? key : null;
        });
    }
    StateIterator.findKey = findKey;
    function find(state, fn, range) {
        return findKey(state, fn).then(state.get);
    }
    StateIterator.find = find;
    function keyOf(state, value, range) {
        return findKey(state, function (v) {
            return v === value;
        });
    }
    StateIterator.keyOf = keyOf;
    function indexOf(state, value, range) {
        var index = -1;
        return some(state, function (v, k) {
            return (index++, value == v);
        }).then(function (found) {
            if (found) {
                return index;
            } else {
                throw new Error();
            }
        });
    }
    StateIterator.indexOf = indexOf;
    function keyAt(state, index, range) {
        return findKey(state, function () {
            return 0 === index--;
        });
    }
    StateIterator.keyAt = keyAt;
    function at(state, index, range) {
        return keyAt(state, index).then(state.get);
    }
    StateIterator.at = at;
    function contains(state, value, range) {
        return some(state, function (v) {
            return v === value;
        });
    }
    StateIterator.contains = contains;
})(StateIterator || (exports.StateIterator = StateIterator = {}));
exports["default"] = StateIterator;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Sonic = Sonic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _factory2 = require('./factory');

var _factory3 = _interopRequireDefault(_factory2);

function Sonic(obj) {
    if (obj instanceof Array) return new _list2['default'](_factory3['default'].fromArray(obj));
    if (obj instanceof Object) return new _list2['default'](_factory3['default'].fromObject(obj));
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.State = _state2['default'];
    Sonic.StateIterator = _state_iterator2['default'];
    Sonic.List = _list2['default'];
    // export var KeyedList      = _KeyedList;
    Sonic.Cache = _cache2['default'];
    Sonic.factory = _factory3['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./cache":1,"./factory":2,"./list":4,"./state":6,"./state_iterator":7}]},{},[8])(8)
});