(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var KeyedList = (function (_List) {
    _inherits(KeyedList, _List);

    function KeyedList(values, keyFn) {
        _classCallCheck(this, KeyedList);

        _get(Object.getPrototypeOf(KeyedList.prototype), 'constructor', this).call(this);
        this._keyFn = keyFn || _key2['default'].create;
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
        key: 'getState',
        value: function getState() {
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
    }, {
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
            return Promise.resolve();
        }
    }, {
        key: 'replace',
        value: function replace(key, value) {
            if (!(key in this._pseudoState.get)) return Promise.reject(new Error());
            var pseudoState = Object.create(this._pseudoState);
            pseudoState.get[key] = value;
            this._pseudoState = pseudoState;
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
            return Promise.resolve();
        }
    }]);

    return KeyedList;
})(_list2['default']);

exports['default'] = KeyedList;

KeyedList.DELETED = {};
module.exports = exports['default'];

},{"./key":1,"./list":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function List() {
  _classCallCheck(this, List);
};

exports.List = List;
exports["default"] = List;

},{}],4:[function(require,module,exports){
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

var _keyed_list = require('./keyed_list');

var _keyed_list2 = _interopRequireDefault(_keyed_list);

function Sonic(obj) {}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.State = _state2['default'];
    Sonic.StateIterator = _state_iterator2['default'];
    Sonic.KeyedList = _keyed_list2['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./keyed_list":2,"./state":5,"./state_iterator":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state_iterator = require('./state_iterator');

var _state_iterator2 = _interopRequireDefault(_state_iterator);

var State;
exports.State = State;
(function (State) {
    function reverse(list) {
        var get = list.get;
        var prev = list.next;
        var next = list.prev;

        return { get: get, prev: prev, next: next };
    }
    State.reverse = reverse;
    function map(list, mapFn) {
        var prev = list.prev;
        var next = list.next;

        function get(key) {
            return list.get(key).then(function (value) {
                return mapFn(value, key);
            });
        }
        return { get: get, prev: prev, next: next };
    }
    State.map = map;
    function filter(list, filterFn) {
        function get(key) {
            return list.get(key).then(function (value) {
                if (filterFn(value)) return value;
                throw new Error();
            });
        }
        function prev(key) {
            return _state_iterator2['default'].findKey(State.reverse(list), filterFn, [key, null]);
        }
        function next(key) {
            return _state_iterator2['default'].findKey(list, filterFn, [key, null]);
        }
        return { get: get, prev: prev, next: next };
    }
    State.filter = filter;
})(State || (exports.State = State = {}));
exports['default'] = State;

},{"./state_iterator":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

},{}]},{},[4])(4)
});