(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var ArrayList = (function (_MutableList) {
    function ArrayList() {
        var _this = this;

        var array = arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, ArrayList);

        _get(Object.getPrototypeOf(ArrayList.prototype), 'constructor', this).call(this);
        this.get = function (key) {
            if (key != null && 0 <= key && key < _this._array.length) return Promise.resolve(_this._array[key]);
            return Promise.reject(new Error());
        };
        this.prev = function (key) {
            if (key == null) return Promise.resolve(_this._array.length ? _this._array.length - 1 : null);
            if (key == 0) return Promise.resolve(null);
            if (0 <= key - 1 && key < _this._array.length) return Promise.resolve(key - 1);
            Promise.reject(new Error());
        };
        this.next = function (key) {
            if (key == null) return Promise.resolve(_this._array.length ? 0 : null);
            if (key == _this._array.length - 1) return Promise.resolve(null);
            if (0 <= key && key + 1 < _this._array.length) return Promise.resolve(key + 1);
            Promise.reject(new Error());
        };
        this.set = function (key, value) {
            return _this.splice(key > 0 ? key - 1 : null, key < _this._array.length - 1 ? key + 1 : null, value);
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            var _array;

            if (prev != null && (0 > prev || prev >= _this._array.length)) return Promise.reject(new Error());
            if (prev != null && (0 > next || next >= _this._array.length)) return Promise.reject(new Error());
            (_array = _this._array).splice.apply(_array, [prev == null ? 0 : prev + 1, (next == null ? _this._array.length : next) - (prev == null ? 0 : prev + 1)].concat(values));
            _this._subject.onInvalidate(prev, null);
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._subject = new _observable_list.ListSubject();
        this._array = array;
    }

    _inherits(ArrayList, _MutableList);

    return ArrayList;
})(_mutable_list.MutableList);

exports['default'] = ArrayList;
module.exports = exports['default'];

},{"./mutable_list":8,"./observable_list":12}],2:[function(require,module,exports){
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
        var key = arguments[0] === undefined ? null : arguments[0];

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

},{}],3:[function(require,module,exports){
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

},{"./array_list":1,"./list":7,"./mutable_list":8,"./observable_list":12,"./unit":14}],4:[function(require,module,exports){
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

},{"./list":7}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _key3 = require('./key');

var _key4 = _interopRequireDefault(_key3);

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var LinkedList = (function (_MutableList) {
    function LinkedList(values, keyFn) {
        var _this = this;

        _classCallCheck(this, LinkedList);

        _get(Object.getPrototypeOf(LinkedList.prototype), 'constructor', this).call(this);
        this._keyFn = _key4['default'].create;
        this.get = function (key) {
            if (!(key in _this._byKey)) return Promise.reject(new Error());
            return Promise.resolve(_this._byKey[key]);
        };
        this.prev = function () {
            var key = arguments[0] === undefined ? null : arguments[0];

            if (!(key in _this._prev)) return Promise.reject(new Error());
            return Promise.resolve(_this._prev[key]);
        };
        this.next = function () {
            var key = arguments[0] === undefined ? null : arguments[0];

            if (!(key in _this._next)) return Promise.reject(new Error());
            return Promise.resolve(_this._next[key]);
        };
        this.set = function (key, value) {
            if (!(key in _this._byKey)) return Promise.reject(new Error());
            _this._byKey[key] = value;
            _this._subject.onInvalidate(_this._prev[key], _this._next[key]);
            return Promise.resolve();
        };
        this.splice = function () {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
                values[_key2 - 2] = arguments[_key2];
            }

            var prev = arguments[0] === undefined ? null : arguments[0];
            var next = arguments[1] === undefined ? null : arguments[1];

            var key = prev,
                value;
            while ((key = _this._next[key]) != null) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next) break;
                delete _this._byKey[key];
            }
            var _key = prev;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    value = _step.value;

                    key = _this._keyFn(value);
                    _this._byKey[key] = value;
                    _this._prev[key] = _key;
                    _this._next[_key] = key;
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

            _this._prev[next] = _key;
            _this._next[_key] = next;
            _this._subject.onInvalidate(prev, next);
            return Promise.resolve();
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        if (keyFn) this._keyFn = keyFn;
        this._subject = new _observable_list.ListSubject();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice.apply(this, [null, null].concat(_toConsumableArray(values)));
    }

    _inherits(LinkedList, _MutableList);

    return LinkedList;
})(_mutable_list.MutableList);

exports['default'] = LinkedList;
module.exports = exports['default'];

},{"./key":5,"./mutable_list":8,"./observable_list":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tree = require('./tree');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var List = (function () {
    function List(list) {
        var _this = this;

        _classCallCheck(this, List);

        this.get = function (key) {
            throw new Error('Not implemented');
        };
        this.prev = function (key) {
            throw new Error('Not implemented');
        };
        this.next = function (key) {
            throw new Error('Not implemented');
        };
        this.first = function () {
            return List.first(_this);
        };
        this.last = function () {
            return List.last(_this);
        };
        this.every = function (predicate) {
            return List.every(_this, predicate);
        };
        this.some = function (predicate) {
            return List.some(_this, predicate);
        };
        this.forEach = function (fn) {
            return List.forEach(_this, fn);
        };
        this.reduce = function (fn, memo) {
            return List.reduce(_this, fn);
        };
        this.toArray = function () {
            return List.toArray(_this);
        };
        this.findKey = function (fn) {
            return List.findKey(_this, fn);
        };
        this.find = function (fn) {
            return List.find(_this, fn);
        };
        this.keyOf = function (value) {
            return List.keyOf(_this, value);
        };
        this.indexOf = function (value) {
            return List.indexOf(_this, value);
        };
        this.keyAt = function (index) {
            return List.keyAt(_this, index);
        };
        this.at = function (index) {
            return List.at(_this, index);
        };
        this.contains = function (value) {
            return List.contains(_this, value);
        };
        this.reverse = function () {
            return List.create(List.reverse(_this));
        };
        this.map = function (mapFn) {
            return List.create(List.map(_this, mapFn));
        };
        this.filter = function (filterFn) {
            return List.create(List.filter(_this, filterFn));
        };
        this.flatten = function () {
            return List.create(List.flatten(_this));
        };
        this.flatMap = function (flatMapFn) {
            return List.create(List.flatMap(_this, flatMapFn));
        };
        this.cache = function () {
            return List.create(List.cache(_this));
        };
        this.index = function () {
            return List.create(List.index(_this));
        };
        this.zip = function (other, zipFn) {
            return List.create(List.zip(_this, other, zipFn));
        };
        this.skip = function (k) {
            return List.create(List.skip(_this, k));
        };
        this.take = function (n) {
            return List.create(List.take(_this, n));
        };
        this.range = function (k, n) {
            return List.create(List.range(_this, k, n));
        };
        this.scan = function (scanFn, memo) {
            return List.create(List.scan(_this, scanFn, memo));
        };
        if (list != null) {
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }

    _createClass(List, null, [{
        key: 'isList',
        value: function isList(obj) {
            return obj != null && !!obj['get'] && !!obj['prev'] && !!obj['next'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new List({
                get: list.get,
                prev: list.prev,
                next: list.next
            });
        }
    }, {
        key: 'first',
        value: function first(list) {
            return list.next().then(list.get);
        }
    }, {
        key: 'last',
        value: function last(list) {
            return list.prev().then(list.get);
        }
    }, {
        key: 'every',
        value: function every(list, predicate, prev, next) {
            var loop = function loop(key) {
                return list.next(key).then(function (key) {
                    return key == next ? true : list.get(key).then(function (value) {
                        return predicate(value, key) === true ? loop(key) : false;
                    });
                });
            };
            return loop(prev);
        }
    }, {
        key: 'some',
        value: function some(list, predicate, prev, next) {
            var loop = function loop(key) {
                return list.next(key).then(function (key) {
                    return key == next ? false : list.get(key).then(function (value) {
                        return predicate(value, key) === true ? true : loop(key);
                    });
                });
            };
            return loop(prev);
        }
    }, {
        key: 'forEach',
        value: function forEach(list, fn, prev, next) {
            return List.every(list, function (value, key) {
                fn(value, key);return true;
            }, prev, next).then(function () {});
        }
    }, {
        key: 'reduce',
        value: function reduce(list, fn, memo) {
            return List.forEach(list, function (value, key) {
                return memo = fn(memo, value, key);
            }).then(function () {
                return memo;
            });
        }
    }, {
        key: 'toArray',
        value: function toArray(list) {
            return List.reduce(list, function (memo, value) {
                return (memo.push(value), memo);
            }, []);
        }
    }, {
        key: 'findKey',
        value: function findKey(list, fn, prev, next) {
            var key;
            return List.some(list, function (v, k) {
                return fn(v, k) ? !!(key = k) || true : false;
            }, prev, next).then(function (found) {
                if (found) {
                    return key;
                } else {
                    throw new Error();
                }
            });
        }
    }, {
        key: 'find',
        value: function find(list, fn, prev, next) {
            return List.findKey(list, fn, prev, next).then(list.get);
        }
    }, {
        key: 'keyOf',
        value: function keyOf(list, value, prev, next) {
            return List.findKey(list, function (v) {
                return v === value;
            }, prev, next);
        }
    }, {
        key: 'indexOf',
        value: function indexOf(list, value, prev, next) {
            var index = -1;
            return List.some(list, function (v, k) {
                return value == v ? !! index++ || true : false;
            }, prev, next).then(function (found) {
                if (found) {
                    return index;
                } else {
                    throw new Error();
                }
            });
        }
    }, {
        key: 'keyAt',
        value: function keyAt(list, index, prev, next) {
            return List.findKey(list, function () {
                return 0 === index--;
            });
        }
    }, {
        key: 'at',
        value: function at(list, index) {
            return List.keyAt(list, index).then(list.get);
        }
    }, {
        key: 'contains',
        value: function contains(list, value) {
            return List.some(list, function (v) {
                return v === value;
            });
        }
    }, {
        key: 'reverse',
        value: function reverse(list) {
            var get = list.get;

            function prev(key) {
                return list.next(key);
            }
            function next(key) {
                return list.prev(key);
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var prev = list.prev;
            var next = list.next;

            function get(key) {
                return list.get(key).then(mapFn);
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            function get(key) {
                return list.get(key).then(function (value) {
                    if (filterFn(value)) throw new Error();
                    return value;
                });
            }
            function prev(key) {
                return List.findKey(List.reverse(list), filterFn, key);
            }
            function next(key) {
                return List.findKey(list, filterFn, key);
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
                return _tree.Tree.prev(list, path, 1).then(_tree.Path.toKey).then(function (x) {
                    console.log(key, x);return x;
                });
                ;
            }
            function next(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.next(list, path, 1).then(_tree.Path.toKey).then(function (x) {
                    console.log(key, x);return x;
                });
                ;
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

},{"./cache":2,"./index":4,"./tree":13}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _observable_list = require("./observable_list");

var MutableList = (function (_ObservableList) {
    function MutableList(list) {
        var _this = this;

        _classCallCheck(this, MutableList);

        _get(Object.getPrototypeOf(MutableList.prototype), "constructor", this).call(this, list);
        this.set = function (key, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            throw new Error("Not implemented");
        };
        this.addBefore = function (key, value) {
            return MutableList.addBefore(_this, key, value);
        };
        this.addAfter = function (key, value) {
            return MutableList.addAfter(_this, key, value);
        };
        this.push = function (value) {
            return MutableList.push(_this, value);
        };
        this.unshift = function (value) {
            return MutableList.unshift(_this, value);
        };
        this["delete"] = function (key) {
            return MutableList["delete"](_this, key);
        };
        this.deleteBefore = function (key) {
            return MutableList.deleteBefore(_this, key);
        };
        this.deleteAfter = function (key) {
            return MutableList.deleteAfter(_this, key);
        };
        this.pop = function () {
            return MutableList.pop(_this);
        };
        this.shift = function () {
            return MutableList.shift(_this);
        };
        this.remove = function (value) {
            return MutableList.remove(_this, value);
        };
        if (list != null) {
            this.set = list.set;
            this.splice = list.splice;
        }
    }

    _inherits(MutableList, _ObservableList);

    _createClass(MutableList, null, [{
        key: "isMutableList",
        value: function isMutableList(obj) {
            return _observable_list.ObservableList.isObservableList(obj) && !!obj["set"] && !!obj["splice"];
        }
    }, {
        key: "create",
        value: function create(list) {
            return new MutableList({
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: list.observe,
                set: list.set,
                splice: list.splice
            });
        }
    }, {
        key: "addBefore",
        value: function addBefore(list, key, value) {
            return list.prev(key).then(function (prev) {
                return list.splice(prev, key, value);
            }).then(function () {
                return list.prev(key);
            });
        }
    }, {
        key: "addAfter",
        value: function addAfter(list, key, value) {
            return list.next(key).then(function (next) {
                return list.splice(key, next, value);
            }).then(function () {
                return list.next(key);
            });
        }
    }, {
        key: "push",
        value: function push(list, value) {
            return MutableList.addBefore(list, null, value);
        }
    }, {
        key: "unshift",
        value: function unshift(list, value) {
            return MutableList.addAfter(list, null, value);
        }
    }, {
        key: "delete",
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
        key: "deleteBefore",
        value: function deleteBefore(list, key) {
            return list.prev(key).then(function (prev) {
                return MutableList["delete"](list, prev);
            });
        }
    }, {
        key: "deleteAfter",
        value: function deleteAfter(list, key) {
            return list.next(key).then(function (next) {
                return MutableList["delete"](list, next);
            });
        }
    }, {
        key: "pop",
        value: function pop(list) {
            return MutableList.deleteBefore(list, null);
        }
    }, {
        key: "shift",
        value: function shift(list) {
            return MutableList.deleteAfter(list, null);
        }
    }, {
        key: "remove",
        value: function remove(list, value) {
            return MutableList.keyOf(list, value).then(function (key) {
                MutableList["delete"](list, key);
            });
        }
    }]);

    return MutableList;
})(_observable_list.ObservableList);

exports.MutableList = MutableList;
exports["default"] = MutableList;

},{"./observable_list":12}],9:[function(require,module,exports){
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

},{"./key":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var ObservableCache = (function (_Cache) {
    function ObservableCache(list) {
        var _this = this;

        _classCallCheck(this, ObservableCache);

        _get(Object.getPrototypeOf(ObservableCache.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            return _this._list.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            var key;
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
        };
        list.observe(this);
    }

    _inherits(ObservableCache, _Cache);

    return ObservableCache;
})(_cache2['default']);

exports.ObservableCache = ObservableCache;
exports['default'] = ObservableCache;

},{"./cache":2}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _observable_list = require('./observable_list');

var ObservableIndex = (function (_Index) {
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
        this.onInvalidate = function (prev, next) {
            var prevIndex = _this._byKey[prev],
                length = _this._byIndex.length,
                index = prevIndex;
            while (++index < length) delete _this._byKey[_this._byIndex[index]];
            _this._byIndex.splice(prevIndex + 1);
            _this._subject.onInvalidate(prevIndex, null);
        };
        this._byKey = Object.create(null);
        this._subject = new _observable_list.ListSubject();
        list.observe(this);
    }

    _inherits(ObservableIndex, _Index);

    return ObservableIndex;
})(_index2['default']);

exports.ObservableIndex = ObservableIndex;
exports['default'] = ObservableIndex;

},{"./index":4,"./observable_list":12}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _list = require('./list');

var _tree = require('./tree');

var _observable = require('./observable');

var _observable_cache = require('./observable_cache');

var _observable_cache2 = _interopRequireDefault(_observable_cache);

var _observable_index = require('./observable_index');

var _observable_index2 = _interopRequireDefault(_observable_index);

var ListSubject = (function (_Subject) {
    function ListSubject() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _classCallCheck(this, ListSubject);

        _get(Object.getPrototypeOf(ListSubject.prototype), 'constructor', this).apply(this, args);
        this.onInvalidate = function (prev, next) {
            _this.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
    }

    _inherits(ListSubject, _Subject);

    return ListSubject;
})(_observable.Subject);

exports.ListSubject = ListSubject;

;

var ObservableList = (function (_List) {
    function ObservableList(list) {
        var _this2 = this;

        _classCallCheck(this, ObservableList);

        _get(Object.getPrototypeOf(ObservableList.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            throw new Error('Not implemented');
        };
        this.reverse = function () {
            return ObservableList.create(ObservableList.reverse(_this2));
        };
        this.map = function (mapFn) {
            return ObservableList.create(ObservableList.map(_this2, mapFn));
        };
        this.filter = function (filterFn) {
            return ObservableList.create(ObservableList.filter(_this2, filterFn));
        };
        this.flatten = function () {
            return ObservableList.create(ObservableList.flatten(_this2));
        };
        this.flatMap = function (flatMapFn) {
            return ObservableList.create(ObservableList.flatMap(_this2, flatMapFn));
        };
        this.cache = function () {
            return ObservableList.create(ObservableList.cache(_this2));
        };
        this.index = function () {
            return ObservableList.create(ObservableList.index(_this2));
        };
        this.zip = function (other, zipFn) {
            return ObservableList.create(ObservableList.zip(_this2, other, zipFn));
        };
        this.skip = function (k) {
            return ObservableList.create(ObservableList.skip(_this2, k));
        };
        this.take = function (n) {
            return ObservableList.create(ObservableList.take(_this2, n));
        };
        this.range = function (k, n) {
            return ObservableList.create(ObservableList.range(_this2, k, n));
        };
        this.scan = function (scanFn, memo) {
            return ObservableList.create(ObservableList.scan(_this2, scanFn, memo));
        };
        if (list != null) this.observe = list.observe;
    }

    _inherits(ObservableList, _List);

    _createClass(ObservableList, null, [{
        key: 'isObservableList',
        value: function isObservableList(obj) {
            return _list.List.isList(obj) && !!obj['observe'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new ObservableList({
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: list.observe
            });
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
                    onInvalidate: function onInvalidate(prev, next) {
                        observer.onInvalidate(next, prev);
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

            return { get: get, prev: prev, next: next, observe: list.observe };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            var _List$filter = _list.List.filter(list, filterFn);

            var get = _List$filter.get;
            var prev = _List$filter.prev;
            var next = _List$filter.next;

            var subject = new ListSubject();
            list.observe({
                onInvalidate: function onInvalidate(p, n) {
                    prev(p).then(function (p) {
                        return next(n).then(function (n) {
                            return subject.onInvalidate(p, n);
                        });
                    });
                }
            });
            return { get: get, prev: prev, next: next, observe: subject.observe };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            var flat = _list.List.flatten(list),
                subject = new ListSubject(),
                subscriptions = Object.create(null);
            var cache = new _observable_cache2['default']({
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: function observe(observer) {
                    return null;
                }
            });
            function createObserver(head) {
                var onInvalidate = function onInvalidate(prev, next) {
                    Promise.all([prev == null ? _tree.Tree.prev(list, [head]) : _tree.Path.append(head, prev), next == null ? _tree.Tree.next(list, [head]) : _tree.Path.append(head, next)]).then(function (_ref) {
                        var _ref2 = _slicedToArray(_ref, 2);

                        var prev = _ref2[0];
                        var next = _ref2[1];

                        subject.onInvalidate(_tree.Path.toKey(prev), _tree.Path.toKey(next));
                    });
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
                onInvalidate: function onInvalidate(prev, next) {
                    // Unsubscribe from all lists in the range
                    _list.List.forEach(cache, function (value, key) {
                        if (!subscriptions[key]) return;
                        subscriptions[key].unsubscribe();
                        delete subscriptions[key];
                    }, prev, next);
                    // Find the prev and next paths, and invalidate
                    Promise.all([prev == null ? null : _tree.Tree.prev(list, [prev, null], 1), next == null ? null : _tree.Tree.next(list, [next, null], 1)]).then(function (_ref3) {
                        var _ref32 = _slicedToArray(_ref3, 2);

                        var prev = _ref32[0];
                        var next = _ref32[1];

                        subject.onInvalidate(_tree.Path.toKey(prev), _tree.Path.toKey(next));
                    });
                    // Invalidate cache
                    cache.onInvalidate(prev, next);
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
            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(prev, next) {
                        observer.onInvalidate(prev, null);
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

},{"./list":7,"./observable":9,"./observable_cache":10,"./observable_index":11,"./tree":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _list = require('./list');

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
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        return list.get(head).then(function (value) {
            if (tail.length == 0 || depth == 0) return value;
            return Tree.get(value, tail, depth);
        });
    }
    Tree.get = get;
    function prev(list) {
        var path = arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

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
        var path = arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

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
})(Tree || (exports.Tree = Tree = {}));
exports['default'] = Tree;

},{"./list":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var Unit = (function (_MutableList) {
    function Unit(value) {
        var _this = this;

        _classCallCheck(this, Unit);

        _get(Object.getPrototypeOf(Unit.prototype), 'constructor', this).call(this);
        this.get = function (key) {
            if (key === _this._key) return Promise.resolve(_this._value);
            Promise.reject(new Error());
        };
        this.prev = function (key) {
            if (key == null) return Promise.resolve(_this._key);
            if (key === _this._key) return Promise.resolve(null);
            return Promise.reject(new Error());
        };
        this.next = function (key) {
            if (key == null) return Promise.resolve(_this._key);
            if (key === _this._key) return Promise.resolve(null);
            return Promise.reject(new Error());
        };
        this.set = function (key, value) {
            _this._key = key;
            _this._value = value;
            _this._subject.onInvalidate(null, null);
            return Promise.resolve();
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            if (values.length) return _this.set(_key3['default'].create(), values[0]);
            delete _this._key;
            delete _this._value;
            _this._subject.onInvalidate(null, null);
            return Promise.resolve();
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._subject = new _observable_list.ListSubject();
        if (arguments.length) this.splice(null, null, value);
    }

    _inherits(Unit, _MutableList);

    return Unit;
})(_mutable_list.MutableList);

exports['default'] = Unit;
module.exports = exports['default'];

},{"./key":5,"./mutable_list":8,"./observable_list":12}],15:[function(require,module,exports){
'use strict';

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
})(Sonic || (Sonic = {}));
module.exports = Sonic;

},{"./array_list":1,"./factory":3,"./linked_list":6,"./list":7,"./mutable_list":8,"./observable_list":12,"./tree":13,"./unit":14}]},{},[15])(15)
});