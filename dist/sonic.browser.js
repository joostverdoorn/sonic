(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var ArrayList = (function (_MutableList) {
    _inherits(ArrayList, _MutableList);

    function ArrayList() {
        var array = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, ArrayList);

        _get(Object.getPrototypeOf(ArrayList.prototype), 'constructor', this).call(this);
        this._subject = new _observable_list.ListSubject();
        this._array = array;
    }

    _createClass(ArrayList, [{
        key: 'get',
        value: function get(key) {
            if (key != null && 0 <= key && key < this._array.length) return Promise.resolve(this._array[key]);
            return Promise.reject(new Error());
        }
    }, {
        key: 'prev',
        value: function prev(key) {
            if (key == null) return Promise.resolve(this._array.length ? this._array.length - 1 : null);
            if (key == 0) return Promise.resolve(null);
            if (0 <= key - 1 && key < this._array.length) return Promise.resolve(key - 1);
            Promise.reject(new Error());
        }
    }, {
        key: 'next',
        value: function next(key) {
            if (key == null) return Promise.resolve(this._array.length ? 0 : null);
            if (key == this._array.length - 1) return Promise.resolve(null);
            if (0 <= key && key + 1 < this._array.length) return Promise.resolve(key + 1);
            Promise.reject(new Error());
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            return this.splice(key > 0 ? key - 1 : null, key < this._array.length - 1 ? key + 1 : null, value);
        }
    }, {
        key: 'splice',
        value: function splice(prev, next) {
            var _array;

            if (prev != null && (0 > prev || prev >= this._array.length)) return Promise.reject(new Error());
            if (prev != null && (0 > next || next >= this._array.length)) return Promise.reject(new Error());

            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            (_array = this._array).splice.apply(_array, [prev == null ? 0 : prev + 1, (next == null ? this._array.length : next) - (prev == null ? 0 : prev + 1)].concat(values));
            this._subject.onInvalidate([prev, null]);
            return Promise.resolve();
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }]);

    return ArrayList;
})(_mutable_list.MutableList);

exports['default'] = ArrayList;
module.exports = exports['default'];

},{"./mutable_list":10,"./observable_list":14}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bind = bind;

function bind(fn, context) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return fn.apply(context, args);
    };
}

exports["default"] = bind;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function Cache(list) {
    var _this = this;

    _classCallCheck(this, Cache);

    this.get = function (key) {
        if (key in _this._byKey) return Promise.resolve(_this._byKey[key]);
        return _this._list.get(key).then(function (value) {
            return _this._byKey[key] = value;
        });
    };
    this.prev = function (key) {
        if (key in _this._prev) return Promise.resolve(_this._prev[key]);
        return _this._list.prev(key).then(function (prev) {
            _this._prev[key] = prev;
            _this._next[prev] = key;
            return prev;
        });
    };
    this.next = function () {
        var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        if (key in _this._next) return Promise.resolve(_this._next[key]);
        return _this._list.next(key).then(function (next) {
            _this._next[key] = next;
            _this._prev[next] = key;
            return next;
        });
    };
    this._byKey = Object.create(null), this._next = Object.create(null), this._prev = Object.create(null);
    this._list = list;
};

exports.Cache = Cache;
exports["default"] = Cache;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = factory;
exports.fromPromise = fromPromise;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _list = require('./list');

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

var _array_list = require('./array_list');

var _array_list2 = _interopRequireDefault(_array_list);

function factory(obj) {
    if (_mutable_list.MutableList.isMutableList(obj)) return _mutable_list.MutableList.create(obj);
    if (_observable_list.ObservableList.isObservableList(obj)) return _observable_list.ObservableList.create(obj);
    if (_list.List.isList(obj)) return _list.List.create(obj);
    if (Array.isArray(obj)) return new _array_list2['default'](obj);
    return _unit2['default'].create(obj);
}

function fromPromise(promise) {
    var unit = new _unit2['default']();
    promise.then(function (value) {
        unit.push(value);
    });
    return _observable_list.ObservableList.create(unit);
}

},{"./array_list":1,"./list":8,"./mutable_list":10,"./observable_list":14,"./unit":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _list = require('./list');

var Index = function Index(list) {
    var _this = this;

    _classCallCheck(this, Index);

    this._add = function (key, index) {
        _this._byIndex[index] = key;
    };
    this.get = function (index) {
        if (0 <= index && index < _this._byIndex.length) return _this._list.get(_this._byIndex[index]);
        return _list.List.find(_this, function (value, key) {
            return key === index;
        }, _this._byIndex.length - 1);
    };
    this.prev = function (index) {
        if (index != null && 0 <= index && index < _this._byIndex.length) return Promise.resolve(index - 1 < 0 ? null : index - 1);
        return _list.List.some(_this, function (value, key) {
            return key === index - 1;
        }, _this._byIndex.length - 1).then(function (found) {
            if (found) return index - 1;
            if (index == null) return _this._byIndex.length - 1;
            throw new Error();
        });
    };
    this.next = function (index) {
        var next = index == null ? 0 : index + 1;
        if (next < _this._byIndex.length) return Promise.resolve(next);
        return _list.List.some(_this._list, function (value, key) {
            _this._add(key, _this._byIndex.length);
            return next === _this._byIndex.length - 1;
        }, _this._byIndex[_this._byIndex.length - 1]).then(function (found) {
            if (found) return next;
            if (next === _this._byIndex.length) return null;
            throw new Error();
        });
    };
    this._byIndex = [];
    this._list = list;
};

exports.Index = Index;
exports['default'] = Index;

},{"./list":8}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _key3 = require('./key');

var _key4 = _interopRequireDefault(_key3);

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var LinkedList = (function (_MutableList) {
    _inherits(LinkedList, _MutableList);

    function LinkedList(values, keyFn) {
        _classCallCheck(this, LinkedList);

        _get(Object.getPrototypeOf(LinkedList.prototype), 'constructor', this).call(this);
        this._keyFn = _key4['default'].create;
        if (keyFn) this._keyFn = keyFn;
        this._subject = new _observable_list.ListSubject();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice.apply(this, [null, null].concat(_toConsumableArray(values)));
    }

    _createClass(LinkedList, [{
        key: 'get',
        value: function get(key) {
            if (!(key in this._byKey)) return Promise.reject(new Error());
            return Promise.resolve(this._byKey[key]);
        }
    }, {
        key: 'prev',
        value: function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (!(key in this._prev)) return Promise.reject(new Error());
            return Promise.resolve(this._prev[key]);
        }
    }, {
        key: 'next',
        value: function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            if (!(key in this._next)) return Promise.reject(new Error());
            return Promise.resolve(this._next[key]);
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            if (!(key in this._byKey)) return Promise.reject(new Error());
            this._byKey[key] = value;
            this._subject.onInvalidate([this._prev[key], this._next[key]]);
            return Promise.resolve();
        }
    }, {
        key: 'splice',
        value: function splice() {
            var prev = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var next = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

            var key = prev,
                value;
            while ((key = this._next[key]) != null) {
                delete this._next[this._prev[key]];
                delete this._prev[key];
                if (key == next) break;
                delete this._byKey[key];
            }
            var _key = next;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
                    values[_key2 - 2] = arguments[_key2];
                }

                for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    value = _step.value;

                    key = this._keyFn(value);
                    if (key in this._byKey) this.splice(this._prev[key], this._next[key]);
                    this._byKey[key] = value;
                    this._prev[key] = _key;
                    this._next[_key] = key;
                    _key = key;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this._prev[next] = _key;
            this._next[_key] = next;
            this._subject.onInvalidate([prev, next]);
            return Promise.resolve();
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }]);

    return LinkedList;
})(_mutable_list.MutableList);

exports['default'] = LinkedList;
module.exports = exports['default'];

},{"./key":6,"./mutable_list":10,"./observable_list":14}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _bind = require('./bind');

var _bind2 = _interopRequireDefault(_bind);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _tree = require('./tree');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var List = (function () {
    function List() {
        _classCallCheck(this, List);
    }

    _createClass(List, [{
        key: 'first',
        value: function first() {
            return List.first(this);
        }
    }, {
        key: 'last',
        value: function last() {
            return List.last(this);
        }
    }, {
        key: 'every',
        value: function every(predicate) {
            return List.every(this, predicate);
        }
    }, {
        key: 'some',
        value: function some(predicate) {
            return List.some(this, predicate);
        }
    }, {
        key: 'forEach',
        value: function forEach(fn, range) {
            return List.forEach(this, fn, range);
        }
    }, {
        key: 'reduce',
        value: function reduce(fn, memo, range) {
            return List.reduce(this, fn, memo, range);
        }
    }, {
        key: 'toArray',
        value: function toArray(range) {
            return List.toArray(this, range);
        }
    }, {
        key: 'findKey',
        value: function findKey(fn, range) {
            return List.findKey(this, fn, range);
        }
    }, {
        key: 'find',
        value: function find(fn, range) {
            return List.find(this, fn, range);
        }
    }, {
        key: 'keyOf',
        value: function keyOf(value, range) {
            return List.keyOf(this, value, range);
        }
    }, {
        key: 'indexOf',
        value: function indexOf(value, range) {
            return List.indexOf(this, value, range);
        }
    }, {
        key: 'keyAt',
        value: function keyAt(index, range) {
            return List.keyAt(this, index, range);
        }
    }, {
        key: 'at',
        value: function at(index, range) {
            return List.at(this, index, range);
        }
    }, {
        key: 'contains',
        value: function contains(value, range) {
            return List.contains(this, value, range);
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            return List.create(List.reverse(this));
        }
    }, {
        key: 'map',
        value: function map(mapFn) {
            return List.create(List.map(this, mapFn));
        }
    }, {
        key: 'filter',
        value: function filter(filterFn) {
            return List.create(List.filter(this, filterFn));
        }
    }, {
        key: 'flatten',
        value: function flatten() {
            return List.create(List.flatten(this));
        }
    }, {
        key: 'flatMap',
        value: function flatMap(flatMapFn) {
            return List.create(List.flatMap(this, flatMapFn));
        }
    }, {
        key: 'cache',
        value: function cache() {
            return List.create(List.cache(this));
        }
    }, {
        key: 'group',
        value: function group(groupFn) {
            return List.create(List.group(this, groupFn)).map(List.create).cache();
        }
    }, {
        key: 'index',
        value: function index() {
            return List.create(List.index(this));
        }
    }, {
        key: 'zip',
        value: function zip(other, zipFn) {
            return List.create(List.zip(this, other, zipFn));
        }
    }, {
        key: 'skip',
        value: function skip(k) {
            return List.create(List.skip(this, k));
        }
    }, {
        key: 'take',
        value: function take(n) {
            return List.create(List.take(this, n));
        }
    }, {
        key: 'range',
        value: function range(k, n) {
            return List.create(List.range(this, k, n));
        }
    }, {
        key: 'scan',
        value: function scan(scanFn, memo) {
            return List.create(List.scan(this, scanFn, memo));
        }
    }], [{
        key: 'create',
        value: function create(list) {
            return new ((function (_List) {
                _inherits(class_1, _List);

                function class_1() {
                    _classCallCheck(this, class_1);

                    _get(Object.getPrototypeOf(class_1.prototype), 'constructor', this).apply(this, arguments);
                }

                _createClass(class_1, [{
                    key: 'get',
                    value: function get(key) {
                        return list.get(key);
                    }
                }, {
                    key: 'prev',
                    value: function prev(key) {
                        return list.prev(key);
                    }
                }, {
                    key: 'next',
                    value: function next(key) {
                        return list.next(key);
                    }
                }]);

                return class_1;
            })(List))();
        }
    }, {
        key: 'isList',
        value: function isList(obj) {
            return obj != null && !!obj['get'] && !!obj['prev'] && !!obj['next'];
        }
    }, {
        key: 'first',
        value: function first(list) {
            var get = (0, _bind2['default'])(list.get, list);
            return list.next().then(get);
        }
    }, {
        key: 'last',
        value: function last(list) {
            var get = (0, _bind2['default'])(list.get, list);
            return list.prev().then(get);
        }
    }, {
        key: 'every',
        value: function every(list, predicate, range) {
            var next, last;
            if (Array.isArray(range)) {
                next = range[1];
            } else {
                last = range;
            }
            var loop = function loop(key) {
                if (key == null) return Promise.resolve(true);
                return list.get(key).then(function (value) {
                    return predicate(value, key);
                }).then(function (res) {
                    return res === false ? false : key == last ? true : list.next(key).then(function (key) {
                        return key == next ? true : loop(key);
                    });
                });
            };
            return _range2['default'].first(list, range).then(loop);
        }
    }, {
        key: 'some',
        value: function some(list, predicate, range) {
            return List.every(list, function (value, key) {
                return Promise.resolve(predicate(value, key)).then(function (result) {
                    return !result;
                });
            }, range).then(function (result) {
                return !result;
            });
        }
    }, {
        key: 'forEach',
        value: function forEach(list, fn, range) {
            return List.every(list, function (value, key) {
                return Promise.resolve(fn(value, key)).then(function () {
                    return true;
                });
            }, range).then(function () {});
        }
    }, {
        key: 'reduce',
        value: function reduce(list, fn, memo, range) {
            return List.forEach(list, function (value, key) {
                return Promise.resolve(fn(memo, value, key)).then(function (value) {
                    memo = value;
                });
            }, range).then(function () {
                return memo;
            });
        }
    }, {
        key: 'toArray',
        value: function toArray(list, range) {
            return List.reduce(list, function (memo, value) {
                return (memo.push(value), memo);
            }, [], range);
        }
    }, {
        key: 'findKey',
        value: function findKey(list, fn, range) {
            var key;
            return List.some(list, function (v, k) {
                return Promise.resolve(fn(v, k)).then(function (res) {
                    return res ? !!(key = k) || true : false;
                });
            }, range).then(function (found) {
                return found ? key : null;
            });
        }
    }, {
        key: 'find',
        value: function find(list, fn, range) {
            return List.findKey(list, fn, range).then(list.get);
        }
    }, {
        key: 'keyOf',
        value: function keyOf(list, value, range) {
            return List.findKey(list, function (v) {
                return v === value;
            }, range);
        }
    }, {
        key: 'indexOf',
        value: function indexOf(list, value, range) {
            var index = -1;
            return List.some(list, function (v, k) {
                return value == v ? !! index++ || true : false;
            }, range).then(function (found) {
                if (found) {
                    return index;
                } else {
                    throw new Error();
                }
            });
        }
    }, {
        key: 'keyAt',
        value: function keyAt(list, index, range) {
            return List.findKey(list, function () {
                return 0 === index--;
            });
        }
    }, {
        key: 'at',
        value: function at(list, index, range) {
            return List.keyAt(list, index, range).then(list.get);
        }
    }, {
        key: 'contains',
        value: function contains(list, value, range) {
            return List.some(list, function (v) {
                return v === value;
            }, range);
        }
    }, {
        key: 'reverse',
        value: function reverse(list) {
            var get = (0, _bind2['default'])(list.get, list),
                prev = (0, _bind2['default'])(list.next, list),
                next = (0, _bind2['default'])(list.prev, list);
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var prev = (0, _bind2['default'])(list.prev, list),
                next = (0, _bind2['default'])(list.next, list);
            function get(key) {
                return list.get(key).then(function (value) {
                    return mapFn(value, key);
                });
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            function get(key) {
                return list.get(key).then(function (value) {
                    if (filterFn(value)) return value;
                    throw new Error();
                });
            }
            function prev(key) {
                return List.findKey(List.reverse(list), filterFn, [key, null]);
            }
            function next(key) {
                return List.findKey(list, filterFn, [key, null]);
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            function get(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.get(list, path, 1);
            }
            function prev(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.prev(list, path, 1).then(_tree.Path.toKey);
            }
            function next(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.next(list, path, 1).then(_tree.Path.toKey);
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'flatMap',
        value: function flatMap(list, flatMapFn) {
            return List.flatten(List.map(list, flatMapFn));
        }
    }, {
        key: 'cache',
        value: function cache(list) {
            return new _cache2['default'](list);
        }
    }, {
        key: 'group',
        value: function group(list, groupFn) {
            var groups = Object.create(null);
            function get(groupKey) {
                return List.findKey(list, function (value, key) {
                    return groupFn(value, key) === groupKey;
                }).then(function () {
                    return groups[groupKey] = List.filter(list, function (value, key) {
                        return groupKey === groupFn(value, key);
                    });
                });
            }
            function prev(groupKey) {
                return List.findKey(List.reverse(list), function (value, key) {
                    var _groupKey = groupFn(value, key);
                    return _groupKey !== groupKey && !groups[_groupKey];
                }).then(function (key) {
                    return key == null ? null : list.get(key).then(function (value) {
                        return groupFn(value, key);
                    });
                });
            }
            function next(groupKey) {
                return List.findKey(list, function (value, key) {
                    var _groupKey = groupFn(value, key);
                    return _groupKey !== groupKey && !groups[_groupKey];
                }).then(function (key) {
                    return key == null ? null : list.get(key).then(function (value) {
                        return groupFn(value, key);
                    });
                });
            }
            return new _cache2['default']({ get: get, prev: prev, next: next });
        }
    }, {
        key: 'index',
        value: function index(list) {
            return new _index2['default'](list);
        }
    }, {
        key: 'zip',
        value: function zip(list, other, zipFn) {
            list = List.index(list);
            other = List.index(other);
            function get(key) {
                return list.get(key).then(function (v) {
                    return other.get(key).then(function (w) {
                        return zipFn(v, w);
                    });
                });
            }
            function prev(key) {
                return list.prev(key).then(function () {
                    return other.prev(key);
                });
            }
            function next(key) {
                return list.next(key).then(function () {
                    return other.next(key);
                });
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'skip',
        value: function skip(list, k) {
            return List.filter(List.index(list), function (value, key) {
                return key >= k;
            });
        }
    }, {
        key: 'take',
        value: function take(list, n) {
            return List.filter(List.index(list), function (value, key) {
                return key < n;
            });
        }
    }, {
        key: 'range',
        value: function range(list, k, n) {
            return List.filter(List.index(list), function (value, key) {
                return key >= k && key < n + k;
            });
        }
    }, {
        key: 'scan',
        value: function scan(list, scanFn, memo) {
            var prev = list.prev;
            var next = list.next;var scanList;
            function get(key) {
                return scanList.prev(key).then(function (p) {
                    return p == null ? memo : scanList.get(p);
                }).then(function (memo) {
                    return list.get(key).then(function (value) {
                        return scanFn(memo, value);
                    });
                });
            }
            scanList = List.cache({ get: get, prev: prev, next: next });
            return scanList;
        }
    }]);

    return List;
})();

exports.List = List;
exports['default'] = List;

},{"./bind":2,"./cache":3,"./index":5,"./range":15,"./tree":17}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _observable_cache = require('./observable_cache');

var _observable_cache2 = _interopRequireDefault(_observable_cache);

var MutableCache = (function (_ObservableCache) {
    _inherits(MutableCache, _ObservableCache);

    function MutableCache(list) {
        var _this = this;

        _classCallCheck(this, MutableCache);

        _get(Object.getPrototypeOf(MutableCache.prototype), 'constructor', this).call(this, list);
        this.set = function (key, value) {
            return _this._list.set(key, value);
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            var _list;

            return (_list = _this._list).splice.apply(_list, [prev, next].concat(values));
        };
    }

    return MutableCache;
})(_observable_cache2['default']);

exports.MutableCache = MutableCache;
exports['default'] = MutableCache;

},{"./observable_cache":12}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _observable_list = require('./observable_list');

var _mutable_cache = require('./mutable_cache');

var _mutable_cache2 = _interopRequireDefault(_mutable_cache);

var MutableList = (function (_ObservableList) {
    _inherits(MutableList, _ObservableList);

    function MutableList() {
        _classCallCheck(this, MutableList);

        _get(Object.getPrototypeOf(MutableList.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(MutableList, [{
        key: 'addBefore',
        value: function addBefore(key, value) {
            return MutableList.addBefore(this, key, value);
        }
    }, {
        key: 'addAfter',
        value: function addAfter(key, value) {
            return MutableList.addAfter(this, key, value);
        }
    }, {
        key: 'push',
        value: function push(value) {
            return MutableList.push(this, value);
        }
    }, {
        key: 'unshift',
        value: function unshift(value) {
            return MutableList.unshift(this, value);
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            return MutableList['delete'](this, key);
        }
    }, {
        key: 'deleteBefore',
        value: function deleteBefore(key) {
            return MutableList.deleteBefore(this, key);
        }
    }, {
        key: 'deleteAfter',
        value: function deleteAfter(key) {
            return MutableList.deleteAfter(this, key);
        }
    }, {
        key: 'pop',
        value: function pop() {
            return MutableList.pop(this);
        }
    }, {
        key: 'shift',
        value: function shift() {
            return MutableList.shift(this);
        }
    }, {
        key: 'remove',
        value: function remove(value) {
            return MutableList.remove(this, value);
        }
    }, {
        key: 'cache',
        value: function cache() {
            return MutableList.create(MutableList.cache(this));
        }

        // map<W>(getFn: (value: V, key: Key) => W, setFn?: (value: W, key?: Key) => V): MutableList<W> {
        //   return MutableList.create(MutableList.map(this, getFn, setFn));
        // }
    }], [{
        key: 'create',
        value: function create(list) {
            return new ((function (_MutableList) {
                _inherits(class_1, _MutableList);

                function class_1() {
                    _classCallCheck(this, class_1);

                    _get(Object.getPrototypeOf(class_1.prototype), 'constructor', this).apply(this, arguments);
                }

                _createClass(class_1, [{
                    key: 'get',
                    value: function get(key) {
                        return list.get(key);
                    }
                }, {
                    key: 'prev',
                    value: function prev(key) {
                        return list.prev(key);
                    }
                }, {
                    key: 'next',
                    value: function next(key) {
                        return list.next(key);
                    }
                }, {
                    key: 'observe',
                    value: function observe(observer) {
                        return list.observe(observer);
                    }
                }, {
                    key: 'set',
                    value: function set(key, value) {
                        return list.set(key, value);
                    }
                }, {
                    key: 'splice',
                    value: function splice(prev, next) {
                        for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                            values[_key - 2] = arguments[_key];
                        }

                        return list.splice.apply(list, [prev, next].concat(values));
                    }
                }]);

                return class_1;
            })(MutableList))();
        }
    }, {
        key: 'isMutableList',
        value: function isMutableList(obj) {
            return _observable_list.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
        }
    }, {
        key: 'addBefore',
        value: function addBefore(list, key, value) {
            return list.prev(key).then(function (prev) {
                return list.splice(prev, key, value);
            }).then(function () {
                return list.prev(key);
            });
        }
    }, {
        key: 'addAfter',
        value: function addAfter(list, key, value) {
            return list.next(key).then(function (next) {
                return list.splice(key, next, value);
            }).then(function () {
                return list.next(key);
            });
        }
    }, {
        key: 'push',
        value: function push(list, value) {
            return MutableList.addBefore(list, null, value);
        }
    }, {
        key: 'unshift',
        value: function unshift(list, value) {
            return MutableList.addAfter(list, null, value);
        }
    }, {
        key: 'delete',
        value: function _delete(list, key) {
            return list.get(key).then(function (value) {
                return Promise.all([list.prev(key), list.next(key)]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);

                    var prev = _ref2[0];
                    var next = _ref2[1];
                    return list.splice(prev, next);
                }).then(function () {
                    return value;
                });
            });
        }
    }, {
        key: 'deleteBefore',
        value: function deleteBefore(list, key) {
            return list.prev(key).then(function (prev) {
                return MutableList['delete'](list, prev);
            });
        }
    }, {
        key: 'deleteAfter',
        value: function deleteAfter(list, key) {
            return list.next(key).then(function (next) {
                return MutableList['delete'](list, next);
            });
        }
    }, {
        key: 'pop',
        value: function pop(list) {
            return MutableList.deleteBefore(list, null);
        }
    }, {
        key: 'shift',
        value: function shift(list) {
            return MutableList.deleteAfter(list, null);
        }
    }, {
        key: 'remove',
        value: function remove(list, value) {
            return MutableList.keyOf(list, value).then(function (key) {
                MutableList['delete'](list, key);
            });
        }
    }, {
        key: 'cache',
        value: function cache(list) {
            return new _mutable_cache2['default'](list);
        }
    }]);

    return MutableList;
})(_observable_list.ObservableList);

exports.MutableList = MutableList;
exports['default'] = MutableList;

},{"./mutable_cache":9,"./observable_list":14}],11:[function(require,module,exports){
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

},{"./key":6}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable_list = require('./observable_list');

var ObservableCache = (function (_Cache) {
    _inherits(ObservableCache, _Cache);

    function ObservableCache(list) {
        var _this = this;

        _classCallCheck(this, ObservableCache);

        _get(Object.getPrototypeOf(ObservableCache.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (range) {
            if (!Array.isArray(range)) {
                var prev = _this._prev[range],
                    next = _this._next[range];
                if (prev != null) {
                    delete _this._next[prev];
                    delete _this._prev[range];
                }
                if (next != null) {
                    delete _this._prev[next];
                    delete _this._next[range];
                }
                return _this._subject.onInvalidate(range);
            }

            var _range = _slicedToArray(range, 2);

            var prev = _range[0];
            var next = _range[1];var key;
            key = prev;
            while ((key = _this._next[key]) !== undefined) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next) break;
                delete _this._byKey[key];
            }
            key = next;
            while ((key = _this._prev[key]) !== undefined) {
                delete _this._prev[_this._next[key]];
                delete _this._next[key];
                if (key == prev) break;
                delete _this._byKey[key];
            }
            _this._subject.onInvalidate(range);
        };
        this._subject = new _observable_list.ListSubject();
        list.observe(this);
    }

    return ObservableCache;
})(_cache2['default']);

exports.ObservableCache = ObservableCache;
exports['default'] = ObservableCache;

},{"./cache":3,"./observable_list":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _observable_list = require('./observable_list');

var ObservableIndex = (function (_Index) {
    _inherits(ObservableIndex, _Index);

    function ObservableIndex(list) {
        var _this = this;

        _classCallCheck(this, ObservableIndex);

        _get(Object.getPrototypeOf(ObservableIndex.prototype), 'constructor', this).call(this, list);
        this._add = function (key, index) {
            _this._byIndex[index] = key;
            _this._byKey[key] = index;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (range) {
            var index,
                length = _this._byIndex.length;
            var index = Array.isArray(range) ? _this._byKey[range[0]] : _this._byKey[range];
            while (index++ < length) delete _this._byKey[_this._byIndex[index]];
            _this._byIndex.splice(index);
            _this._subject.onInvalidate([index == 0 ? null : index - 1, null]);
        };
        this._byKey = Object.create(null);
        this._subject = new _observable_list.ListSubject();
        list.observe(this);
    }

    return ObservableIndex;
})(_index2['default']);

exports.ObservableIndex = ObservableIndex;
exports['default'] = ObservableIndex;

},{"./index":5,"./observable_list":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _bind = require('./bind');

var _bind2 = _interopRequireDefault(_bind);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _list = require('./list');

var _tree = require('./tree');

var _observable = require('./observable');

var _observable_cache = require('./observable_cache');

var _observable_cache2 = _interopRequireDefault(_observable_cache);

var _observable_index = require('./observable_index');

var _observable_index2 = _interopRequireDefault(_observable_index);

var ListSubject = (function (_Subject) {
    _inherits(ListSubject, _Subject);

    function ListSubject() {
        var _this = this;

        _classCallCheck(this, ListSubject);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(ListSubject.prototype), 'constructor', this).apply(this, args);
        this.onInvalidate = function (range) {
            _this.notify(function (observer) {
                observer.onInvalidate(range);
            });
        };
    }

    return ListSubject;
})(_observable.Subject);

exports.ListSubject = ListSubject;

;

var ObservableList = (function (_List) {
    _inherits(ObservableList, _List);

    function ObservableList() {
        _classCallCheck(this, ObservableList);

        _get(Object.getPrototypeOf(ObservableList.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ObservableList, [{
        key: 'reverse',
        value: function reverse() {
            return ObservableList.create(ObservableList.reverse(this));
        }
    }, {
        key: 'map',
        value: function map(mapFn) {
            return ObservableList.create(ObservableList.map(this, mapFn));
        }
    }, {
        key: 'filter',
        value: function filter(filterFn) {
            return ObservableList.create(ObservableList.filter(this, filterFn));
        }
    }, {
        key: 'flatten',
        value: function flatten() {
            return ObservableList.create(ObservableList.flatten(this));
        }
    }, {
        key: 'flatMap',
        value: function flatMap(flatMapFn) {
            return ObservableList.create(ObservableList.flatMap(this, flatMapFn));
        }
    }, {
        key: 'cache',
        value: function cache() {
            return ObservableList.create(ObservableList.cache(this));
        }
    }, {
        key: 'index',
        value: function index() {
            return ObservableList.create(ObservableList.index(this));
        }
    }, {
        key: 'zip',
        value: function zip(other, zipFn) {
            return ObservableList.create(ObservableList.zip(this, other, zipFn));
        }
    }, {
        key: 'skip',
        value: function skip(k) {
            return ObservableList.create(ObservableList.skip(this, k));
        }
    }, {
        key: 'take',
        value: function take(n) {
            return ObservableList.create(ObservableList.take(this, n));
        }
    }, {
        key: 'range',
        value: function range(k, n) {
            return ObservableList.create(ObservableList.range(this, k, n));
        }
    }, {
        key: 'scan',
        value: function scan(scanFn, memo) {
            return ObservableList.create(ObservableList.scan(this, scanFn, memo));
        }
    }], [{
        key: 'create',
        value: function create(list) {
            return new ((function (_ObservableList) {
                _inherits(class_1, _ObservableList);

                function class_1() {
                    _classCallCheck(this, class_1);

                    _get(Object.getPrototypeOf(class_1.prototype), 'constructor', this).apply(this, arguments);
                }

                _createClass(class_1, [{
                    key: 'get',
                    value: function get(key) {
                        return list.get(key);
                    }
                }, {
                    key: 'prev',
                    value: function prev(key) {
                        return list.prev(key);
                    }
                }, {
                    key: 'next',
                    value: function next(key) {
                        return list.next(key);
                    }
                }, {
                    key: 'observe',
                    value: function observe(observer) {
                        return list.observe(observer);
                    }
                }]);

                return class_1;
            })(ObservableList))();
        }
    }, {
        key: 'isObservableList',
        value: function isObservableList(obj) {
            return _list.List.isList(obj) && !!obj['observe'];
        }
    }, {
        key: 'reverse',
        value: function reverse(list) {
            var _List$reverse = _list.List.reverse(list);

            var get = _List$reverse.get;
            var prev = _List$reverse.prev;
            var next = _List$reverse.next;

            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(range) {
                        observer.onInvalidate(range);
                    }
                });
            }
            return { get: get, prev: prev, next: next, observe: observe };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var _List$map = _list.List.map(list, mapFn);

            var get = _List$map.get;
            var prev = _List$map.prev;
            var next = _List$map.next;

            return { get: get, prev: prev, next: next, observe: (0, _bind2['default'])(list.observe, list) };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            var _List$filter = _list.List.filter(list, filterFn);

            var get = _List$filter.get;
            var prev = _List$filter.prev;
            var next = _List$filter.next;var observe = (0, _bind2['default'])(list.observe, list);
            return { get: get, prev: prev, next: next, observe: observe };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            var flat = _list.List.flatten(list),
                subject = new ListSubject(),
                subscriptions = Object.create(null),
                cache = new _observable_cache2['default']({
                get: (0, _bind2['default'])(list.get, list),
                prev: (0, _bind2['default'])(list.prev, list),
                next: (0, _bind2['default'])(list.next, list),
                observe: function observe(observer) {
                    return null;
                }
            });
            function createObserver(head) {
                var onInvalidate = function onInvalidate(range) {
                    if (!Array.isArray(range)) return subject.onInvalidate(_tree.Path.toKey([head, range]));else subject.onInvalidate([_tree.Path.toKey(range[0] != null ? [head, range[0]] : [head]), _tree.Path.toKey(range[1] != null ? [head, range[1]] : [head])]);
                };
                return { onInvalidate: onInvalidate };
            }
            function prev(key) {
                return flat.prev(key).then(function (prev) {
                    var path = _tree.Path.fromKey(prev),
                        head = _tree.Path.head(path);
                    if (head != null && !subscriptions[head]) {
                        list.get(head).then(function (list) {
                            return subscriptions[head] = list.observe(createObserver(head));
                        });
                    }
                    return prev;
                });
            }
            function next(key) {
                return flat.next(key).then(function (next) {
                    var path = _tree.Path.fromKey(next),
                        head = _tree.Path.head(path);
                    if (head != null && !subscriptions[head]) {
                        list.get(head).then(function (list) {
                            return subscriptions[head] = list.observe(createObserver(head));
                        });
                    }
                    return next;
                });
            }
            list.observe({
                onInvalidate: function onInvalidate(range) {
                    // Unsubscribe from all lists in the range
                    _list.List.forEach(cache, function (value, key) {
                        if (!subscriptions[key]) return;
                        subscriptions[key].unsubscribe();
                        delete subscriptions[key];
                    }, range);
                    if (!Array.isArray(range)) subject.onInvalidate(_tree.Path.toKey([range]));else subject.onInvalidate([_tree.Path.toKey([range[0]]), _tree.Path.toKey([range[1]])]);
                    cache.onInvalidate(range);
                }
            });
            return { get: flat.get, prev: prev, next: next, observe: subject.observe };
        }
    }, {
        key: 'flatMap',
        value: function flatMap(list, flatMapFn) {
            return ObservableList.flatten(ObservableList.map(list, flatMapFn));
        }
    }, {
        key: 'cache',
        value: function cache(list) {
            return new _observable_cache2['default'](list);
        }
    }, {
        key: 'index',
        value: function index(list) {
            return new _observable_index2['default'](list);
        }
    }, {
        key: 'zip',
        value: function zip(list, other, zipFn) {
            list = ObservableList.index(list);
            other = ObservableList.index(other);
            function get(key) {
                return list.get(key).then(function (v) {
                    return other.get(key).then(function (w) {
                        return zipFn(v, w);
                    });
                });
            }
            function prev(key) {
                return list.prev(key).then(function () {
                    return other.prev(key);
                });
            }
            function next(key) {
                return list.next(key).then(function () {
                    return other.next(key);
                });
            }
            var subject = new ListSubject();
            list.observe(subject);
            other.observe(subject);
            return { get: get, prev: prev, next: next, observe: subject.observe };
        }
    }, {
        key: 'skip',
        value: function skip(list, k) {
            return ObservableList.filter(ObservableList.index(list), function (value, key) {
                return key >= k;
            });
        }
    }, {
        key: 'take',
        value: function take(list, n) {
            return ObservableList.filter(ObservableList.index(list), function (value, key) {
                return key < n;
            });
        }
    }, {
        key: 'range',
        value: function range(list, k, n) {
            return ObservableList.filter(ObservableList.index(list), function (value, key) {
                return key >= k && key < n + k;
            });
        }
    }, {
        key: 'scan',
        value: function scan(list, scanFn, memo) {
            var prev = (0, _bind2['default'])(list.prev, list),
                next = (0, _bind2['default'])(list.next, list),
                scanList;
            function get(key) {
                return scanList.prev(key).then(function (p) {
                    return p == null ? memo : scanList.get(p);
                }).then(function (memo) {
                    return list.get(key).then(function (value) {
                        return scanFn(memo, value);
                    });
                });
            }
            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(range) {
                        _range2['default'].prev(list, range).then(function (prev) {
                            return observer.onInvalidate([prev, null]);
                        });
                    }
                });
            }
            scanList = ObservableList.cache({ get: get, prev: prev, next: next, observe: observe });
            return scanList;
        }
    }]);

    return ObservableList;
})(_list.List);

exports.ObservableList = ObservableList;
exports['default'] = ObservableList;

},{"./bind":2,"./list":8,"./observable":11,"./observable_cache":12,"./observable_index":13,"./range":15,"./tree":17}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Range;
exports.Range = Range;
(function (Range) {
    function prev(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return Promise.resolve(range[0]);else return list.prev(range);
    }
    Range.prev = prev;
    function next(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return Promise.resolve(range[1]);else return list.next(range);
    }
    Range.next = next;
    function first(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return list.next(range[0]);
        return Promise.resolve(range);
    }
    Range.first = first;
    function last(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return list.prev(range[1]);
        return Promise.resolve(range);
    }
    Range.last = last;
})(Range || (exports.Range = Range = {}));
exports["default"] = Range;

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Sonic = Sonic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _observable_list = require('./observable_list');

var _observable_list2 = _interopRequireDefault(_observable_list);

var _mutable_list = require('./mutable_list');

var _mutable_list2 = _interopRequireDefault(_mutable_list);

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

var _array_list = require('./array_list');

var _array_list2 = _interopRequireDefault(_array_list);

var _linked_list = require('./linked_list');

var _linked_list2 = _interopRequireDefault(_linked_list);

var _tree = require('./tree');

function Sonic(obj) {
    return (0, _factory2['default'])(obj);
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.List = _list2['default'];
    Sonic.ObservableList = _observable_list2['default'];
    Sonic.MutableList = _mutable_list2['default'];
    Sonic.Unit = _unit2['default'];
    Sonic.ArrayList = _array_list2['default'];
    Sonic.LinkedList = _linked_list2['default'];
    Sonic.Tree = _tree.Tree;
    Sonic.Path = _tree.Path;
    Sonic.fromPromise = _factory.fromPromise;
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;

},{"./array_list":1,"./factory":4,"./linked_list":7,"./list":8,"./mutable_list":10,"./observable_list":14,"./tree":17,"./unit":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _list = require('./list');

;
;
var Path;
exports.Path = Path;
(function (Path) {
    function key(path) {
        return JSON.stringify(path);
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
        return path[index];
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
    function get(list, path) {
        var depth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        return list.get(head).then(function (value) {
            if (tail.length == 0 || depth == 0) return value;
            return Tree.get(value, tail, depth);
        });
    }
    Tree.get = get;
    function prev(list) {
        var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        if ((head == null || !tail.length) && depth > 0) {
            return list.prev(head).then(function (key) {
                if (key == null) return null;
                return list.get(key).then(function (value) {
                    if (_list.List.isList(value)) return Tree.prev(value, null, depth - 1).then(function (prev) {
                        return prev == null ? null : Path.append(key, prev);
                    });
                    return [key];
                });
            });
        }
        if (tail.length && depth > 0) {
            return list.get(head).then(function (list) {
                return Tree.prev(list, tail, depth - 1);
            }).then(function (prev) {
                if (prev != null) return Path.append(head, prev);
                return list.prev(head).then(function (prev) {
                    return prev == null ? null : list.get(prev).then(function (list) {
                        return Tree.prev(list, null, depth - 1);
                    }).then(function (tail) {
                        return Path.append(prev, tail);
                    });
                });
            });
        }
        return list.prev(head).then(function (prev) {
            return prev != null ? [prev] : null;
        });
    }
    Tree.prev = prev;
    function next(list) {
        var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        if ((head == null || !tail.length) && depth > 0) {
            return list.next(head).then(function (key) {
                if (key == null) return null;
                return list.get(key).then(function (value) {
                    if (_list.List.isList(value)) return Tree.next(value, null, depth - 1).then(function (next) {
                        return next == null ? null : Path.append(key, next);
                    });
                    return [key];
                });
            });
        }
        if (tail.length && depth > 0) {
            return list.get(head).then(function (list) {
                return Tree.next(list, tail, depth - 1);
            }).then(function (next) {
                if (next != null) return Path.append(head, next);
                return list.next(head).then(function (next) {
                    return next == null ? null : list.get(next).then(function (list) {
                        return Tree.next(list, null, depth - 1);
                    }).then(function (tail) {
                        return Path.append(next, tail);
                    });
                });
            });
        }
        return list.next(head).then(function (next) {
            return next != null ? [next] : null;
        });
    }
    Tree.next = next;
    function set(list, path, value) {
        var head = path.slice(0, path.length - 1);
        var key = path[path.length - 1];
        return get(list, head).then(function (list) {
            return list.set(key, value);
        });
    }
    Tree.set = set;
    function splice(list, prev, next) {
        for (var _len = arguments.length, values = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            values[_key - 3] = arguments[_key];
        }

        var prevHead = prev.slice(0, prev.length - 1);
        var prevKey = prev[prev.length - 1];
        var nextHead = next.slice(0, next.length - 1);
        var nextKey = next[next.length - 1];
        return get(list, prevHead).then(function (list) {
            return list.splice.apply(list, [prevKey, nextKey].concat(values));
        });
    }
    Tree.splice = splice;
})(Tree || (exports.Tree = Tree = {}));
exports['default'] = Tree;

},{"./list":8}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var Unit = (function (_MutableList) {
    _inherits(Unit, _MutableList);

    function Unit(value) {
        _classCallCheck(this, Unit);

        _get(Object.getPrototypeOf(Unit.prototype), 'constructor', this).call(this);
        this._subject = new _observable_list.ListSubject();
        if (arguments.length) this.splice(null, null, value);
    }

    _createClass(Unit, [{
        key: 'get',
        value: function get(key) {
            if (key === this._key) return Promise.resolve(this._value);
            Promise.reject(new Error());
        }
    }, {
        key: 'prev',
        value: function prev(key) {
            if (key == null) return Promise.resolve(this._key);
            if (key === this._key) return Promise.resolve(null);
            return Promise.reject(new Error());
        }
    }, {
        key: 'next',
        value: function next(key) {
            if (key == null) return Promise.resolve(this._key);
            if (key === this._key) return Promise.resolve(null);
            return Promise.reject(new Error());
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            this._key = key;
            this._value = value;
            this._subject.onInvalidate([null, null]);
            return Promise.resolve();
        }
    }, {
        key: 'splice',
        value: function splice(prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            if (values.length) return this.set(_key3['default'].create(), values[0]);
            delete this._key;
            delete this._value;
            this._subject.onInvalidate([null, null]);
            return Promise.resolve();
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }]);

    return Unit;
})(_mutable_list.MutableList);

exports['default'] = Unit;
module.exports = exports['default'];

},{"./key":6,"./mutable_list":10,"./observable_list":14}]},{},[16])(16)
});