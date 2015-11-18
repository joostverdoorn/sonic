(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Sonic"] = factory();
	else
		root["Sonic"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _async_iterator = __webpack_require__(83);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _store = __webpack_require__(94);
	
	var _tree = __webpack_require__(91);
	
	var _tree2 = _interopRequireDefault(_tree);
	
	var _cache = __webpack_require__(82);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _observable = __webpack_require__(96);
	
	var _promise_utils = __webpack_require__(97);
	
	var _promise_utils2 = _interopRequireDefault(_promise_utils);
	
	var _lens = __webpack_require__(98);
	
	var _lens2 = _interopRequireDefault(_lens);
	
	var _patch = __webpack_require__(95);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _range = __webpack_require__(81);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	
	function Sonic(obj) {
	    if (obj instanceof Array) return _store.Store.create(_state2.default.fromArray(obj), _observable.Subject.create());
	    if (obj instanceof Object) return _store.Store.create(_state2.default.fromObject(obj), _observable.Subject.create());
	}
	var Sonic;
	(function (Sonic) {
	    Sonic.State = _state2.default;
	    Sonic.AsyncIterator = _async_iterator2.default;
	    Sonic.Store = _store.Store;
	    Sonic.Tree = _tree2.default;
	    Sonic.Subject = _observable.Subject;
	    Sonic.Cache = _cache2.default;
	    Sonic.PromiseUtils = _promise_utils2.default;
	    Sonic.Lens = _lens2.default;
	    Sonic.Patch = _patch2.default;
	    Sonic.Range = _range.Range;
	    Sonic.Position = _range.Position;
	})(Sonic || (Sonic = {}));
	;
	exports.default = Sonic;
	
	module.exports = Sonic;
	//# sourceMappingURL=sonic.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.State = undefined;
	
	var _regenerator = __webpack_require__(2);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(72);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _create = __webpack_require__(36);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(42);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(79);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _entry = __webpack_require__(80);
	
	var _entry2 = _interopRequireDefault(_entry);
	
	var _range = __webpack_require__(81);
	
	var _cache = __webpack_require__(82);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _async_iterator = __webpack_require__(83);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _tree = __webpack_require__(91);
	
	var _exceptions = __webpack_require__(89);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var State = exports.State = undefined;
	(function (State) {
	    State.Empty = {
	        get: function get(key) {
	            return _promise2.default.reject(new _exceptions.NotFound());
	        },
	        prev: function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	            return key === _key2.default.sentinel ? _promise2.default.resolve(_key2.default.sentinel) : _promise2.default.reject(new _exceptions.NotFound());
	        },
	        next: function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	            return key === _key2.default.sentinel ? _promise2.default.resolve(_key2.default.sentinel) : _promise2.default.reject(new _exceptions.NotFound());
	        }
	    };
	    function extend(parent, _ref) {
	        var get = _ref.get;
	        var prev = _ref.prev;
	        var next = _ref.next;
	
	        var state = (0, _create2.default)(parent);
	        if (get) state.get = get;
	        if (prev) state.prev = prev;
	        if (next) state.next = next;
	        return state;
	    }
	    State.extend = extend;
	    function first(state) {
	        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
	
	        var from = _ref3[0];
	        var to = _ref3[1];
	
	        return _range.Position.isPrevPosition(from) ? state.get(from.prev) : state.next(from.next).then(state.get);
	    }
	    State.first = first;
	    function last(state) {
	        var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
	
	        var from = _ref5[0];
	        var to = _ref5[1];
	
	        return _range.Position.isNextPosition(to) ? state.get(to.next) : state.prev(to.prev).then(state.get);
	    }
	    State.last = last;
	    function has(state, key) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	            return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.prev = 0;
	                            _context.next = 3;
	                            return state.get(key);
	
	                        case 3:
	                            return _context.abrupt("return", true);
	
	                        case 6:
	                            _context.prev = 6;
	                            _context.t0 = _context["catch"](0);
	
	                            if (!(_context.t0 instanceof _exceptions.NotFound)) {
	                                _context.next = 10;
	                                break;
	                            }
	
	                            return _context.abrupt("return", false);
	
	                        case 10:
	                            throw _context.t0;
	
	                        case 11:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this, [[0, 6]]);
	        }));
	    }
	    State.has = has;
	    function is(state, other) {
	        var iterator = entries(state),
	            otherIterator = entries(other);
	        return _async_iterator2.default.is(iterator, otherIterator, _entry2.default.is);
	    }
	    State.is = is;
	    function contains(state, value) {
	        return _async_iterator2.default.some(entries(state), function (entry) {
	            return entry[1] === value;
	        });
	    }
	    State.contains = contains;
	    function empty(state) {
	        return state.next().then(function (next) {
	            return next === _key2.default.sentinel;
	        });
	    }
	    State.empty = empty;
	    function any(state) {
	        return state.next().then(function (next) {
	            return next !== _key2.default.sentinel;
	        });
	    }
	    State.any = any;
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
	                    if (prev !== _key2.default.sentinel) return _promise2.default.resolve(prev);
	                    return _range.Position.isNextPosition(from) ? _promise2.default.resolve(from.next) : parent.prev(from.prev);
	                });
	            },
	            next: function next(key) {
	                return child.next(key).then(function (next) {
	                    if (next !== _key2.default.sentinel) return _promise2.default.resolve(next);
	                    return _range.Position.isPrevPosition(to) ? _promise2.default.resolve(to.prev) : parent.next(to.next);
	                });
	            }
	        });
	        bridgedParent = extend(filtered, {
	            prev: function prev(key) {
	                return parent.prev(key).then(function (prev) {
	                    if (_range.Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(_key2.default.sentinel);
	                    return has(deleted, prev).then(function (res) {
	                        return res ? _promise2.default.reject(new _exceptions.NotFound()) : prev;
	                    });
	                });
	            },
	            next: function next(key) {
	                return parent.next(key).then(function (next) {
	                    if (_range.Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(_key2.default.sentinel);
	                    return has(deleted, next).then(function (res) {
	                        return res ? _promise2.default.reject(new _exceptions.NotFound()) : next;
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
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	
	            if (_range.Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(_key2.default.sentinel);
	            return has(bridgedChild, key).then(function (res) {
	                return res ? bridgedChild.prev(key) : bridgedParent.prev(key);
	            });
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	
	            if (_range.Position.isNextPosition(from) && key === from.next) return bridgedChild.next(_key2.default.sentinel);
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
	        function get(key) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                _context2.next = 2;
	                                return parent.get(key);
	
	                            case 2:
	                                _context2.t0 = _context2.sent;
	                                _context2.t1 = key;
	                                return _context2.abrupt("return", mapFn(_context2.t0, _context2.t1));
	
	                            case 5:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	        return extend(parent, { get: get });
	    }
	    State.map = map;
	    function filter(parent, filterFn) {
	        var cache = (0, _create2.default)(null);
	        function have(key) {
	            return key in cache ? cache[key] : cache[key] = parent.get(key).then(function (value) {
	                return filterFn(value, key);
	            });
	        }
	        function get(key) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                _context3.next = 2;
	                                return have(key);
	
	                            case 2:
	                                if (!_context3.sent) {
	                                    _context3.next = 4;
	                                    break;
	                                }
	
	                                return _context3.abrupt("return", parent.get(key));
	
	                            case 4:
	                                throw new _exceptions.NotFound();
	
	                            case 5:
	                            case "end":
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        }
	        function prev(key) {
	            return parent.prev(key).then(function (p) {
	                return p === _key2.default.sentinel ? _key2.default.sentinel : have(p).then(function (res) {
	                    return res ? p : prev(p);
	                });
	            });
	        }
	        function next(key) {
	            return parent.next(key).then(function (n) {
	                return n === _key2.default.sentinel ? _key2.default.sentinel : have(n).then(function (res) {
	                    return res ? n : next(n);
	                });
	            });
	        }
	        return extend(parent, { get: get, prev: prev, next: next });
	    }
	    State.filter = filter;
	    function scan(parent, scanFn, memo) {
	        return fromEntries(_async_iterator2.default.scan(entries(parent), function (memoEntry, entry) {
	            return _promise2.default.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(function (result) {
	                return [entry[0], result];
	            });
	        }, [_key2.default.sentinel, memo]));
	    }
	    State.scan = scan;
	    function pick(parent, picked) {
	        return filter(parent, function (value, key) {
	            return has(picked, key);
	        });
	    }
	    State.pick = pick;
	    function omit(parent, omitted) {
	        var _this = this;
	
	        return filter(parent, function (value, key) {
	            return __awaiter(_this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                                _context4.next = 2;
	                                return has(omitted, key);
	
	                            case 2:
	                                return _context4.abrupt("return", !_context4.sent);
	
	                            case 3:
	                            case "end":
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, this);
	            }));
	        });
	    }
	    State.omit = omit;
	    function zip(parent, other) {
	        return fromValues(_async_iterator2.default.zip(values(parent), values(other)));
	    }
	    State.zip = zip;
	    function zoom(parent, key) {
	        var have;
	        function get(k) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                if (!(k === key)) {
	                                    _context5.next = 2;
	                                    break;
	                                }
	
	                                return _context5.abrupt("return", parent.get(key));
	
	                            case 2:
	                                throw new _exceptions.NotFound();
	
	                            case 3:
	                            case "end":
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, this);
	            }));
	        }
	        function next() {
	            var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
	                return _regenerator2.default.wrap(function _callee6$(_context6) {
	                    while (1) {
	                        switch (_context6.prev = _context6.next) {
	                            case 0:
	                                if (!(k !== key && k !== _key2.default.sentinel)) {
	                                    _context6.next = 2;
	                                    break;
	                                }
	
	                                throw new _exceptions.NotFound();
	
	                            case 2:
	                                _context6.next = 4;
	                                return has(parent, key);
	
	                            case 4:
	                                if (_context6.sent) {
	                                    _context6.next = 6;
	                                    break;
	                                }
	
	                                throw new _exceptions.NotFound();
	
	                            case 6:
	                                if (!(k === _key2.default.sentinel)) {
	                                    _context6.next = 8;
	                                    break;
	                                }
	
	                                return _context6.abrupt("return", key);
	
	                            case 8:
	                                if (!(k === key)) {
	                                    _context6.next = 10;
	                                    break;
	                                }
	
	                                return _context6.abrupt("return", _key2.default.sentinel);
	
	                            case 10:
	                            case "end":
	                                return _context6.stop();
	                        }
	                    }
	                }, _callee6, this);
	            }));
	        }
	        return { get: get, prev: next, next: next };
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
	    function groupBy(parent, groupFn) {
	        var states = {};
	        var it = entries(parent);
	        var groupKeyed = _async_iterator2.default.map(it, function (_ref6) {
	            var _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
	
	            var key = _ref7[0];
	            var value = _ref7[1];
	            return _promise2.default.resolve(groupFn(value, key)).then(function (groupKey) {
	                return [groupKey, value];
	            });
	        });
	        var filtered = _async_iterator2.default.filter(groupKeyed, function (_ref8) {
	            var _ref9 = (0, _slicedToArray3.default)(_ref8, 2);
	
	            var groupKey = _ref9[0];
	            var value = _ref9[1];
	            return !(groupKey in states);
	        });
	        var mapped = _async_iterator2.default.map(filtered, function (_ref10) {
	            var _ref11 = (0, _slicedToArray3.default)(_ref10, 2);
	
	            var groupKey = _ref11[0];
	            var value = _ref11[1];
	
	            var state = filter(parent, function (value, key) {
	                return _promise2.default.resolve(groupFn(value, key)).then(function (gk) {
	                    return gk === groupKey;
	                });
	            });
	            return [groupKey, states[groupKey] = state];
	        });
	        return fromEntries(mapped);
	    }
	    State.groupBy = groupBy;
	    function unique(parent) {
	        var uniqueFn = arguments.length <= 1 || arguments[1] === undefined ? String : arguments[1];
	
	        return map(groupBy(parent, uniqueFn), function (s) {
	            return first(s);
	        });
	    }
	    State.unique = unique;
	    function union(state, other, uniqueFn) {
	        return unique(flatten(fromArray([state, other])), uniqueFn);
	    }
	    State.union = union;
	    function keyBy(parent, keyFn) {
	        return fromEntries(_async_iterator2.default.map(entries(parent), function (entry) {
	            return _promise2.default.resolve(keyFn(entry[1], entry[0])).then(function (key) {
	                return [key, entry[1]];
	            });
	        }));
	    }
	    State.keyBy = keyBy;
	    function take(parent, count) {
	        return fromEntries(_async_iterator2.default.take(entries(parent), count));
	    }
	    State.take = take;
	    function skip(parent, count) {
	        return fromEntries(_async_iterator2.default.skip(entries(parent), count));
	    }
	    State.skip = skip;
	    function cache(parent) {
	        return _cache2.default.apply(parent, _cache2.default.create());
	    }
	    State.cache = cache;
	    function unit(value) {
	        var key = arguments.length <= 1 || arguments[1] === undefined ? _key2.default.create() : arguments[1];
	
	        return {
	            get: function get(k) {
	                return k === key ? _promise2.default.resolve(value) : _promise2.default.reject(new _exceptions.NotFound());
	            },
	            prev: function prev() {
	                var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	                return _promise2.default.resolve(k === _key2.default.sentinel ? key : _key2.default.sentinel);
	            },
	            next: function next() {
	                var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	                return _promise2.default.resolve(k === _key2.default.sentinel ? key : _key2.default.sentinel);
	            }
	        };
	    }
	    State.unit = unit;
	    function entries(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        var current = _key2.default.sentinel,
	            done = false,
	            from = range[0],
	            to = range[1];
	        function get(key) {
	            if (key === _key2.default.sentinel) return done = true, _promise2.default.resolve(_async_iterator2.default.done);
	            return state.get(key).then(function (value) {
	                return current = key, { done: false, value: [key, value] };
	            });
	        }
	        function iterate(key) {
	            return state.next(key).then(function (next) {
	                if (_range.Position.isPrevPosition(to) && to.prev === next) return get(_key2.default.sentinel);
	                return get(next);
	            });
	        }
	        function next() {
	            if (_range.Position.isPrevPosition(from) && _range.Position.isPrevPosition(to) && from.prev === to.prev) return get(_key2.default.sentinel);
	            if (_range.Position.isNextPosition(from) && _range.Position.isNextPosition(to) && from.next === to.next) return get(_key2.default.sentinel);
	            if (current === _key2.default.sentinel) return _range.Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
	            if (_range.Position.isNextPosition(to) && to.next === current) return get(_key2.default.sentinel);
	            return iterate(current);
	        }
	        return { next: next };
	    }
	    State.entries = entries;
	    function keys(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        return _async_iterator2.default.map(entries(state, range), _entry2.default.key);
	    }
	    State.keys = keys;
	    function values(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        return _async_iterator2.default.map(entries(state, range), _entry2.default.value);
	    }
	    State.values = values;
	    function fromEntries(iterator) {
	        var cache = _cache2.default.create(),
	            exhausted = false,
	            currentKey = null,
	            queue = _promise2.default.resolve(null);
	        var cachingIterator = {
	            next: function next() {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
	                    var result, _result$value, key, value;
	
	                    return _regenerator2.default.wrap(function _callee7$(_context7) {
	                        while (1) {
	                            switch (_context7.prev = _context7.next) {
	                                case 0:
	                                    _context7.next = 2;
	                                    return iterator.next();
	
	                                case 2:
	                                    result = _context7.sent;
	
	                                    if (!result.done) {
	                                        _context7.next = 8;
	                                        break;
	                                    }
	
	                                    exhausted = true;
	                                    cache.prev[_key2.default.sentinel] = _promise2.default.resolve(currentKey);
	                                    cache.next[currentKey] = _promise2.default.resolve(_key2.default.sentinel);
	                                    return _context7.abrupt("return", _async_iterator2.default.done);
	
	                                case 8:
	                                    _result$value = (0, _slicedToArray3.default)(result.value, 2);
	                                    key = _result$value[0];
	                                    value = _result$value[1];
	
	                                    cache.prev[key] = _promise2.default.resolve(currentKey);
	                                    cache.next[currentKey] = _promise2.default.resolve(key);
	                                    cache.get[key] = _promise2.default.resolve(value);
	                                    currentKey = key;
	                                    return _context7.abrupt("return", { done: false, value: [key, value] });
	
	                                case 16:
	                                case "end":
	                                    return _context7.stop();
	                            }
	                        }
	                    }, _callee7, this);
	                }));
	            }
	        };
	        function get(key) {
	            if (exhausted) return _promise2.default.reject(new _exceptions.NotFound());
	            return _async_iterator2.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(_entry2.default.value);
	        }
	        function prev(key) {
	            if (exhausted) return _promise2.default.reject(new _exceptions.NotFound());
	            return _async_iterator2.default.some(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(function () {
	                return key in cache.prev ? cache.prev[key] : _promise2.default.resolve(new _exceptions.NotFound());
	            });
	        }
	        function next(key) {
	            if (exhausted) return _promise2.default.reject(new _exceptions.NotFound());
	            if (key === currentKey) return cachingIterator.next().then(function (result) {
	                return result.done ? _key2.default.sentinel : result.value[0];
	            });
	            return _async_iterator2.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(function () {
	                return cachingIterator.next();
	            }).then(function (result) {
	                return result.done ? _key2.default.sentinel : result.value[0];
	            });
	        }
	        return _cache2.default.apply({ get: get, prev: prev, next: next }, cache);
	    }
	    State.fromEntries = fromEntries;
	    function fromKeys(iterator) {
	        return fromEntries(_async_iterator2.default.map(iterator, function (key) {
	            return [key, null];
	        }));
	    }
	    State.fromKeys = fromKeys;
	    function fromValues(iterator) {
	        return fromEntries(_async_iterator2.default.map(_async_iterator2.default.scan(iterator, function (prev, value) {
	            return [prev[0] + 1, value];
	        }, [-1, null]), function (_ref12) {
	            var _ref13 = (0, _slicedToArray3.default)(_ref12, 2);
	
	            var n = _ref13[0];
	            var value = _ref13[1];
	            return [n.toString(), value];
	        }));
	    }
	    State.fromValues = fromValues;
	    function fromArray(values) {
	        return fromValues(_async_iterator2.default.fromArray(values));
	    }
	    State.fromArray = fromArray;
	    function fromObject(values) {
	        return fromEntries(_async_iterator2.default.fromObject(values));
	    }
	    State.fromObject = fromObject;
	    function lazy(fn) {
	        var state,
	            queue = _promise2.default.resolve();
	        function createState() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
	                return _regenerator2.default.wrap(function _callee8$(_context8) {
	                    while (1) {
	                        switch (_context8.prev = _context8.next) {
	                            case 0:
	                                if (!state) {
	                                    _context8.next = 4;
	                                    break;
	                                }
	
	                                _context8.t0 = state;
	                                _context8.next = 7;
	                                break;
	
	                            case 4:
	                                _context8.next = 6;
	                                return fn();
	
	                            case 6:
	                                _context8.t0 = state = _context8.sent;
	
	                            case 7:
	                                return _context8.abrupt("return", _context8.t0);
	
	                            case 8:
	                            case "end":
	                                return _context8.stop();
	                        }
	                    }
	                }, _callee8, this);
	            }));
	        }
	        function get(key) {
	            return state ? state.get(key) : queue.then(createState).then(function (s) {
	                return s.get(key);
	            });
	        }
	        function prev(key) {
	            return state ? state.prev(key) : queue.then(createState).then(function (s) {
	                return s.prev(key);
	            });
	        }
	        function next(key) {
	            return state ? state.next(key) : queue.then(createState).then(function (s) {
	                return s.next(key);
	            });
	        }
	        return { get: get, prev: prev, next: next };
	    }
	    State.lazy = lazy;
	    function toObject(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        return _async_iterator2.default.toObject(entries(state, range));
	    }
	    State.toObject = toObject;
	    function toArray(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];
	
	        return _async_iterator2.default.toArray(values(state, range));
	    }
	    State.toArray = toArray;
	})(State || (exports.State = State = {}));
	exports.default = State;
	//# sourceMappingURL=state.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g =
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this;
	
	// Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.
	var hadRuntime = g.regeneratorRuntime &&
	  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
	
	// Save the old regeneratorRuntime in case it needs to be restored later.
	var oldRuntime = hadRuntime && g.regeneratorRuntime;
	
	// Force reevalutation of runtime.js.
	g.regeneratorRuntime = undefined;
	
	module.exports = __webpack_require__(3);
	
	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch(e) {
	    g.regeneratorRuntime = undefined;
	  }
	}
	
	module.exports = { "default": module.exports, __esModule: true };
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	"use strict";
	
	var _Symbol = __webpack_require__(5)["default"];
	
	var _Object$create = __webpack_require__(36)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(38)["default"];
	
	var _Promise = __webpack_require__(42)["default"];
	
	!(function (global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = _Object$create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction ||
	    // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };
	
	  runtime.mark = function (genFun) {
	    if (_Object$setPrototypeOf) {
	      _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = _Object$create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function (arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return _Promise.resolve(value.arg).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return _Promise.resolve(value).then(function (unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new _Promise(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	      // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
	      // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	
	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          if (state === GenStateSuspendedYield) {
	            context.sent = arg;
	          } else {
	            context.sent = undefined;
	          }
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function () {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function () {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function (object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      this.sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function stop() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	// Among the various tricks for obtaining a reference to the global
	// object, this seems to be the most reliable technique that does not
	// use indirect eval (which violates Content Security Policy).
	typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(35);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(8)
	  , global         = __webpack_require__(9)
	  , has            = __webpack_require__(10)
	  , DESCRIPTORS    = __webpack_require__(11)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(17)
	  , $fails         = __webpack_require__(12)
	  , shared         = __webpack_require__(20)
	  , setToStringTag = __webpack_require__(21)
	  , uid            = __webpack_require__(23)
	  , wks            = __webpack_require__(22)
	  , keyOf          = __webpack_require__(24)
	  , $names         = __webpack_require__(29)
	  , enumKeys       = __webpack_require__(30)
	  , isArray        = __webpack_require__(31)
	  , anObject       = __webpack_require__(32)
	  , toIObject      = __webpack_require__(25)
	  , createDesc     = __webpack_require__(19)
	  , getDesc        = $.getDesc
	  , setDesc        = $.setDesc
	  , _create        = $.create
	  , getNames       = $names.get
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , setter         = false
	  , HIDDEN         = wks('_hidden')
	  , isEnum         = $.isEnum
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , useNative      = typeof $Symbol == 'function'
	  , ObjectProto    = Object.prototype;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(setDesc({}, 'a', {
	    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = getDesc(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  setDesc(it, key, D);
	  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
	} : setDesc;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol.prototype);
	  sym._k = tag;
	  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
	    configurable: true,
	    set: function(value){
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    }
	  });
	  return sym;
	};
	
	var isSymbol = function(it){
	  return typeof it == 'symbol';
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(D && has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return setDesc(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key);
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
	    ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  var D = getDesc(it = toIObject(it), key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
	  return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var names  = getNames(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
	  return result;
	};
	var $stringify = function stringify(it){
	  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	  var args = [it]
	    , i    = 1
	    , $$   = arguments
	    , replacer, $replacer;
	  while($$.length > i)args.push($$[i++]);
	  replacer = args[1];
	  if(typeof replacer == 'function')$replacer = replacer;
	  if($replacer || !isArray(replacer))replacer = function(key, value){
	    if($replacer)value = $replacer.call(this, key, value);
	    if(!isSymbol(value))return value;
	  };
	  args[1] = replacer;
	  return _stringify.apply($JSON, args);
	};
	var buggyJSON = $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	});
	
	// 19.4.1.1 Symbol([description])
	if(!useNative){
	  $Symbol = function Symbol(){
	    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
	    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
	  };
	  redefine($Symbol.prototype, 'toString', function toString(){
	    return this._k;
	  });
	
	  isSymbol = function(it){
	    return it instanceof $Symbol;
	  };
	
	  $.create     = $create;
	  $.isEnum     = $propertyIsEnumerable;
	  $.getDesc    = $getOwnPropertyDescriptor;
	  $.setDesc    = $defineProperty;
	  $.setDescs   = $defineProperties;
	  $.getNames   = $names.get = $getOwnPropertyNames;
	  $.getSymbols = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(34)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	}
	
	var symbolStatics = {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    return keyOf(SymbolRegistry, key);
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	};
	// 19.4.2.2 Symbol.hasInstance
	// 19.4.2.3 Symbol.isConcatSpreadable
	// 19.4.2.4 Symbol.iterator
	// 19.4.2.6 Symbol.match
	// 19.4.2.8 Symbol.replace
	// 19.4.2.9 Symbol.search
	// 19.4.2.10 Symbol.species
	// 19.4.2.11 Symbol.split
	// 19.4.2.12 Symbol.toPrimitive
	// 19.4.2.13 Symbol.toStringTag
	// 19.4.2.14 Symbol.unscopables
	$.each.call((
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
	  'species,split,toPrimitive,toStringTag,unscopables'
	).split(','), function(it){
	  var sym = wks(it);
	  symbolStatics[it] = useNative ? sym : wrap(sym);
	});
	
	setter = true;
	
	$export($export.G + $export.W, {Symbol: $Symbol});
	
	$export($export.S, 'Symbol', symbolStatics);
	
	$export($export.S + $export.F * !useNative, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});
	
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 8 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 10 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(8)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(11) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(9)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(8).setDesc
	  , has = __webpack_require__(10)
	  , TAG = __webpack_require__(22)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(20)('wks')
	  , uid    = __webpack_require__(23)
	  , Symbol = __webpack_require__(9).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(8)
	  , toIObject = __webpack_require__(25);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(26)
	  , defined = __webpack_require__(28);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(27);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(25)
	  , getNames  = __webpack_require__(8).getNames
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames(toIObject(it));
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(8);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getSymbols = $.getSymbols;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = $.isEnum
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
	  }
	  return keys;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(27);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(33);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 35 */
/***/ function(module, exports) {



/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	module.exports = __webpack_require__(14).Object.setPrototypeOf;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(13);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(41).set});

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(8).getDesc
	  , isObject = __webpack_require__(33)
	  , anObject = __webpack_require__(32);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(15)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(43), __esModule: true };

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(35);
	__webpack_require__(44);
	__webpack_require__(50);
	__webpack_require__(54);
	module.exports = __webpack_require__(14).Promise;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(45)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(47)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(46)
	  , defined   = __webpack_require__(28);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(34)
	  , $export        = __webpack_require__(13)
	  , redefine       = __webpack_require__(17)
	  , hide           = __webpack_require__(18)
	  , has            = __webpack_require__(10)
	  , Iterators      = __webpack_require__(48)
	  , $iterCreate    = __webpack_require__(49)
	  , setToStringTag = __webpack_require__(21)
	  , getProto       = __webpack_require__(8).getProto
	  , ITERATOR       = __webpack_require__(22)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(8)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(21)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(18)(IteratorPrototype, __webpack_require__(22)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(51);
	var Iterators = __webpack_require__(48);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(52)
	  , step             = __webpack_require__(53)
	  , Iterators        = __webpack_require__(48)
	  , toIObject        = __webpack_require__(25);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(47)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(8)
	  , LIBRARY    = __webpack_require__(34)
	  , global     = __webpack_require__(9)
	  , ctx        = __webpack_require__(15)
	  , classof    = __webpack_require__(55)
	  , $export    = __webpack_require__(13)
	  , isObject   = __webpack_require__(33)
	  , anObject   = __webpack_require__(32)
	  , aFunction  = __webpack_require__(16)
	  , strictNew  = __webpack_require__(56)
	  , forOf      = __webpack_require__(57)
	  , setProto   = __webpack_require__(41).set
	  , same       = __webpack_require__(62)
	  , SPECIES    = __webpack_require__(22)('species')
	  , speciesConstructor = __webpack_require__(63)
	  , asap       = __webpack_require__(64)
	  , PROMISE    = 'Promise'
	  , process    = global.process
	  , isNode     = classof(process) == 'process'
	  , P          = global[PROMISE]
	  , Wrapper;
	
	var testResolve = function(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	};
	
	var USE_NATIVE = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = P && P.resolve && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && __webpack_require__(11)){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // library wrapper special case
	  if(LIBRARY && a === P && b === Wrapper)return true;
	  return same(a, b);
	};
	var getConstructor = function(C){
	  var S = anObject(C)[SPECIES];
	  return S != undefined ? S : C;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var PromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve),
	  this.reject  = aFunction(reject)
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(record, isReject){
	  if(record.n)return;
	  record.n = true;
	  var chain = record.c;
	  asap(function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , result, then;
	      try {
	        if(handler){
	          if(!ok)record.h = true;
	          result = handler === true ? value : handler(value);
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	    record.n = false;
	    if(isReject)setTimeout(function(){
	      var promise = record.p
	        , handler, console;
	      if(isUnhandled(promise)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      } record.a = undefined;
	    }, 1);
	  });
	};
	var isUnhandled = function(promise){
	  var record = promise._d
	    , chain  = record.a || record.c
	    , i      = 0
	    , reaction;
	  if(record.h)return false;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var $reject = function(value){
	  var record = this;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  notify(record, true);
	};
	var $resolve = function(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(record.p === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      asap(function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record, false);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    aFunction(executor);
	    var record = this._d = {
	      p: strictNew(this, P, PROMISE),         // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false,                               // <- handled rejection
	      n: false                                // <- notify
	    };
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(69)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction = new PromiseCapability(speciesConstructor(this, P))
	        , promise  = reaction.promise
	        , record   = this._d;
	      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      record.c.push(reaction);
	      if(record.a)record.a.push(reaction);
	      if(record.s)notify(record, false);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
	__webpack_require__(21)(P, PROMISE);
	__webpack_require__(70)(PROMISE);
	Wrapper = __webpack_require__(14)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = new PromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof P && sameConstructor(x.constructor, this))return x;
	    var capability = new PromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(71)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject
	      , values     = [];
	    var abrupt = perform(function(){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        var alreadyCalled = false;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled = true;
	          results[index] = value;
	          --remaining || resolve(results);
	        }, reject);
	      });
	      else resolve(results);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = getConstructor(this)
	      , capability = new PromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(27)
	  , TAG = __webpack_require__(22)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(15)
	  , call        = __webpack_require__(58)
	  , isArrayIter = __webpack_require__(59)
	  , anObject    = __webpack_require__(32)
	  , toLength    = __webpack_require__(60)
	  , getIterFn   = __webpack_require__(61);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(32);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(48)
	  , ITERATOR   = __webpack_require__(22)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(46)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(55)
	  , ITERATOR  = __webpack_require__(22)('iterator')
	  , Iterators = __webpack_require__(48);
	module.exports = __webpack_require__(14).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(32)
	  , aFunction = __webpack_require__(16)
	  , SPECIES   = __webpack_require__(22)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(9)
	  , macrotask = __webpack_require__(65).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(27)(process) == 'process'
	  , head, last, notify;
	
	var flush = function(){
	  var parent, domain, fn;
	  if(isNode && (parent = process.domain)){
	    process.domain = null;
	    parent.exit();
	  }
	  while(head){
	    domain = head.domain;
	    fn     = head.fn;
	    if(domain)domain.enter();
	    fn(); // <- currently we use it only for Promise - try / catch not required
	    if(domain)domain.exit();
	    head = head.next;
	  } last = undefined;
	  if(parent)parent.enter();
	};
	
	// Node.js
	if(isNode){
	  notify = function(){
	    process.nextTick(flush);
	  };
	// browsers with MutationObserver
	} else if(Observer){
	  var toggle = 1
	    , node   = document.createTextNode('');
	  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	  notify = function(){
	    node.data = toggle = -toggle;
	  };
	// environments with maybe non-completely correct, but existent Promise
	} else if(Promise && Promise.resolve){
	  notify = function(){
	    Promise.resolve().then(flush);
	  };
	// for other environments - macrotask based on:
	// - setImmediate
	// - MessageChannel
	// - window.postMessag
	// - onreadystatechange
	// - setTimeout
	} else {
	  notify = function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    macrotask.call(global, flush);
	  };
	}
	
	module.exports = function asap(fn){
	  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
	  if(last)last.next = task;
	  if(!head){
	    head = task;
	    notify();
	  } last = task;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(15)
	  , invoke             = __webpack_require__(66)
	  , html               = __webpack_require__(67)
	  , cel                = __webpack_require__(68)
	  , global             = __webpack_require__(9)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listner = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(27)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listner, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 66 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9).document && document.documentElement;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(33)
	  , document = __webpack_require__(9).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(17);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(14)
	  , $           = __webpack_require__(8)
	  , DESCRIPTORS = __webpack_require__(11)
	  , SPECIES     = __webpack_require__(22)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(22)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _isIterable2 = __webpack_require__(73);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(76);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();
	
	exports.__esModule = true;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);
	__webpack_require__(44);
	module.exports = __webpack_require__(75);

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(55)
	  , ITERATOR  = __webpack_require__(22)('iterator')
	  , Iterators = __webpack_require__(48);
	module.exports = __webpack_require__(14).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);
	__webpack_require__(44);
	module.exports = __webpack_require__(78);

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(32)
	  , get      = __webpack_require__(61);
	module.exports = __webpack_require__(14).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Key;
	(function (Key) {
	    Key.sentinel = null;
	    var uniqueKey = 0;
	    function key(key) {
	        return key.toString();
	    }
	    Key.key = key;
	    function create() {
	        return "s_" + uniqueKey++;
	    }
	    Key.create = create;
	})(Key || (Key = {}));
	exports.default = Key;
	//# sourceMappingURL=key.js.map

/***/ },
/* 80 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Entry = exports.Entry = undefined;
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
	exports.default = Entry;
	//# sourceMappingURL=entry.js.map

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Position = exports.Range = undefined;
	
	var _slicedToArray2 = __webpack_require__(72);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _key = __webpack_require__(79);
	
	var _key2 = _interopRequireDefault(_key);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var Range = exports.Range = undefined;
	(function (Range) {
	    Range.all = [{ next: _key2.default.sentinel }, { prev: _key2.default.sentinel }];
	    function reverse(_ref) {
	        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);
	
	        var from = _ref2[0];
	        var to = _ref2[1];
	
	        return [Position.reverse(to), Position.reverse(from)];
	    }
	    Range.reverse = reverse;
	})(Range || (exports.Range = Range = {}));
	var Position = exports.Position = undefined;
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
	exports.default = Range;
	//# sourceMappingURL=range.js.map

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cache = undefined;
	
	var _promise = __webpack_require__(42);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _create = __webpack_require__(36);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _key = __webpack_require__(79);
	
	var _key2 = _interopRequireDefault(_key);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var Cache = exports.Cache = undefined;
	(function (Cache) {
	    function create() {
	        return {
	            get: (0, _create2.default)(null),
	            prev: (0, _create2.default)(null),
	            next: (0, _create2.default)(null)
	        };
	    }
	    Cache.create = create;
	    function extend(cache) {
	        return {
	            get: (0, _create2.default)(cache.get),
	            prev: (0, _create2.default)(cache.prev),
	            next: (0, _create2.default)(cache.next)
	        };
	    }
	    Cache.extend = extend;
	    function apply(state, cache) {
	        function get(key) {
	            return key in cache.get ? cache.get[key] : cache.get[key] = state.get(key);
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	
	            return key in cache.prev ? cache.prev[key] : cache.prev[key] = state.prev(key).then(function (prev) {
	                cache.next[prev] = _promise2.default.resolve(key);return prev;
	            });
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.sentinel : arguments[0];
	
	            return key in cache.next ? cache.next[key] : cache.next[key] = state.next(key).then(function (next) {
	                cache.prev[next] = _promise2.default.resolve(key);return next;
	            });
	        }
	        return { get: get, prev: prev, next: next };
	    }
	    Cache.apply = apply;
	})(Cache || (exports.Cache = Cache = {}));
	exports.default = Cache;
	//# sourceMappingURL=cache.js.map

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsyncIterator = undefined;
	
	var _create = __webpack_require__(36);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _slicedToArray2 = __webpack_require__(72);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _keys = __webpack_require__(84);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _regenerator = __webpack_require__(2);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(42);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _exceptions = __webpack_require__(89);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var AsyncIterator = exports.AsyncIterator = undefined;
	(function (AsyncIterator) {
	    AsyncIterator.done = { done: true };
	    AsyncIterator.Empty = {
	        next: function next() {
	            return _promise2.default.resolve(AsyncIterator.done);
	        }
	    };
	    function every(iterator, predicate) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	            var result;
	            return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            _context.next = 2;
	                            return iterator.next();
	
	                        case 2:
	                            _context.t0 = result = _context.sent;
	
	                            if (!_context.t0) {
	                                _context.next = 5;
	                                break;
	                            }
	
	                            _context.t0 = !result.done;
	
	                        case 5:
	                            if (!_context.t0) {
	                                _context.next = 12;
	                                break;
	                            }
	
	                            _context.next = 8;
	                            return predicate(result.value);
	
	                        case 8:
	                            if (_context.sent) {
	                                _context.next = 10;
	                                break;
	                            }
	
	                            return _context.abrupt("return", false);
	
	                        case 10:
	                            _context.next = 0;
	                            break;
	
	                        case 12:
	                            return _context.abrupt("return", true);
	
	                        case 13:
	                        case "end":
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    }
	    AsyncIterator.every = every;
	    function some(iterator, predicate) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
	            var _this = this;
	
	            return _regenerator2.default.wrap(function _callee3$(_context3) {
	                while (1) {
	                    switch (_context3.prev = _context3.next) {
	                        case 0:
	                            _context3.next = 2;
	                            return every(iterator, function (value) {
	                                return __awaiter(_this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
	                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
	                                        while (1) {
	                                            switch (_context2.prev = _context2.next) {
	                                                case 0:
	                                                    _context2.next = 2;
	                                                    return predicate(value);
	
	                                                case 2:
	                                                    return _context2.abrupt("return", !_context2.sent);
	
	                                                case 3:
	                                                case "end":
	                                                    return _context2.stop();
	                                            }
	                                        }
	                                    }, _callee2, this);
	                                }));
	                            });
	
	                        case 2:
	                            return _context3.abrupt("return", !_context3.sent);
	
	                        case 3:
	                        case "end":
	                            return _context3.stop();
	                    }
	                }
	            }, _callee3, this);
	        }));
	    }
	    AsyncIterator.some = some;
	    function forEach(iterator, fn) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
	            var _this2 = this;
	
	            return _regenerator2.default.wrap(function _callee5$(_context5) {
	                while (1) {
	                    switch (_context5.prev = _context5.next) {
	                        case 0:
	                            _context5.next = 2;
	                            return every(iterator, function (value) {
	                                return __awaiter(_this2, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
	                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
	                                        while (1) {
	                                            switch (_context4.prev = _context4.next) {
	                                                case 0:
	                                                    fn(value);return _context4.abrupt("return", true);
	
	                                                case 2:
	                                                case "end":
	                                                    return _context4.stop();
	                                            }
	                                        }
	                                    }, _callee4, this);
	                                }));
	                            });
	
	                        case 2:
	                        case "end":
	                            return _context5.stop();
	                    }
	                }
	            }, _callee5, this);
	        }));
	    }
	    AsyncIterator.forEach = forEach;
	    function reduce(iterator, fn, memo) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
	            var _this3 = this;
	
	            return _regenerator2.default.wrap(function _callee7$(_context7) {
	                while (1) {
	                    switch (_context7.prev = _context7.next) {
	                        case 0:
	                            _context7.next = 2;
	                            return forEach(iterator, function (value) {
	                                return __awaiter(_this3, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
	                                    return _regenerator2.default.wrap(function _callee6$(_context6) {
	                                        while (1) {
	                                            switch (_context6.prev = _context6.next) {
	                                                case 0:
	                                                    _context6.next = 2;
	                                                    return fn(memo, value);
	
	                                                case 2:
	                                                    memo = _context6.sent;
	
	                                                case 3:
	                                                case "end":
	                                                    return _context6.stop();
	                                            }
	                                        }
	                                    }, _callee6, this);
	                                }));
	                            });
	
	                        case 2:
	                            return _context7.abrupt("return", memo);
	
	                        case 3:
	                        case "end":
	                            return _context7.stop();
	                    }
	                }
	            }, _callee7, this);
	        }));
	    }
	    AsyncIterator.reduce = reduce;
	    function find(iterator, predicate) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee9() {
	            var _this4 = this;
	
	            var result;
	            return _regenerator2.default.wrap(function _callee9$(_context9) {
	                while (1) {
	                    switch (_context9.prev = _context9.next) {
	                        case 0:
	                            _context9.next = 2;
	                            return some(iterator, function (value) {
	                                return __awaiter(_this4, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
	                                    return _regenerator2.default.wrap(function _callee8$(_context8) {
	                                        while (1) {
	                                            switch (_context8.prev = _context8.next) {
	                                                case 0:
	                                                    _context8.next = 2;
	                                                    return predicate(value);
	
	                                                case 2:
	                                                    if (_context8.sent) {
	                                                        _context8.next = 6;
	                                                        break;
	                                                    }
	
	                                                    _context8.t0 = false;
	                                                    _context8.next = 7;
	                                                    break;
	
	                                                case 6:
	                                                    _context8.t0 = (result = value, true);
	
	                                                case 7:
	                                                    return _context8.abrupt("return", _context8.t0);
	
	                                                case 8:
	                                                case "end":
	                                                    return _context8.stop();
	                                            }
	                                        }
	                                    }, _callee8, this);
	                                }));
	                            });
	
	                        case 2:
	                            if (!_context9.sent) {
	                                _context9.next = 6;
	                                break;
	                            }
	
	                            return _context9.abrupt("return", result);
	
	                        case 6:
	                            throw new _exceptions.NotFound();
	
	                        case 7:
	                        case "end":
	                            return _context9.stop();
	                    }
	                }
	            }, _callee9, this);
	        }));
	    }
	    AsyncIterator.find = find;
	    function indexOf(iterator, value) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee10() {
	            var index;
	            return _regenerator2.default.wrap(function _callee10$(_context10) {
	                while (1) {
	                    switch (_context10.prev = _context10.next) {
	                        case 0:
	                            index = -1;
	                            _context10.next = 3;
	                            return some(iterator, function (v) {
	                                return index++, value == v;
	                            });
	
	                        case 3:
	                            if (!_context10.sent) {
	                                _context10.next = 7;
	                                break;
	                            }
	
	                            return _context10.abrupt("return", index);
	
	                        case 7:
	                            throw new _exceptions.NotFound();
	
	                        case 8:
	                        case "end":
	                            return _context10.stop();
	                    }
	                }
	            }, _callee10, this);
	        }));
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
	
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee12() {
	            var _this5 = this;
	
	            return _regenerator2.default.wrap(function _callee12$(_context12) {
	                while (1) {
	                    switch (_context12.prev = _context12.next) {
	                        case 0:
	                            _context12.next = 2;
	                            return every(iterator, function (value) {
	                                return __awaiter(_this5, void 0, _promise2.default, _regenerator2.default.mark(function _callee11() {
	                                    var result;
	                                    return _regenerator2.default.wrap(function _callee11$(_context11) {
	                                        while (1) {
	                                            switch (_context11.prev = _context11.next) {
	                                                case 0:
	                                                    _context11.next = 2;
	                                                    return other.next();
	
	                                                case 2:
	                                                    result = _context11.sent;
	                                                    return _context11.abrupt("return", !result.done && equals(value, result.value));
	
	                                                case 4:
	                                                case "end":
	                                                    return _context11.stop();
	                                            }
	                                        }
	                                    }, _callee11, this);
	                                }));
	                            });
	
	                        case 2:
	                            _context12.t0 = _context12.sent;
	
	                            if (!_context12.t0) {
	                                _context12.next = 7;
	                                break;
	                            }
	
	                            _context12.next = 6;
	                            return other.next();
	
	                        case 6:
	                            _context12.t0 = _context12.sent.done;
	
	                        case 7:
	                            return _context12.abrupt("return", _context12.t0);
	
	                        case 8:
	                        case "end":
	                            return _context12.stop();
	                    }
	                }
	            }, _callee12, this);
	        }));
	    }
	    AsyncIterator.is = is;
	    function map(iterator, mapFn) {
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee13() {
	                var result;
	                return _regenerator2.default.wrap(function _callee13$(_context13) {
	                    while (1) {
	                        switch (_context13.prev = _context13.next) {
	                            case 0:
	                                _context13.next = 2;
	                                return iterator.next();
	
	                            case 2:
	                                result = _context13.sent;
	
	                                if (!result.done) {
	                                    _context13.next = 7;
	                                    break;
	                                }
	
	                                _context13.t0 = AsyncIterator.done;
	                                _context13.next = 11;
	                                break;
	
	                            case 7:
	                                _context13.next = 9;
	                                return mapFn(result.value);
	
	                            case 9:
	                                _context13.t1 = _context13.sent;
	                                _context13.t0 = {
	                                    done: false,
	                                    value: _context13.t1
	                                };
	
	                            case 11:
	                                return _context13.abrupt("return", _context13.t0);
	
	                            case 12:
	                            case "end":
	                                return _context13.stop();
	                        }
	                    }
	                }, _callee13, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.map = map;
	    function filter(iterator, filterFn) {
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee14() {
	                var result;
	                return _regenerator2.default.wrap(function _callee14$(_context14) {
	                    while (1) {
	                        switch (_context14.prev = _context14.next) {
	                            case 0:
	                                _context14.next = 2;
	                                return iterator.next();
	
	                            case 2:
	                                result = _context14.sent;
	
	                                if (!result.done) {
	                                    _context14.next = 5;
	                                    break;
	                                }
	
	                                return _context14.abrupt("return", AsyncIterator.done);
	
	                            case 5:
	                                _context14.next = 7;
	                                return filterFn(result.value);
	
	                            case 7:
	                                if (!_context14.sent) {
	                                    _context14.next = 9;
	                                    break;
	                                }
	
	                                return _context14.abrupt("return", result);
	
	                            case 9:
	                                return _context14.abrupt("return", next());
	
	                            case 10:
	                            case "end":
	                                return _context14.stop();
	                        }
	                    }
	                }, _callee14, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.filter = filter;
	    function scan(iterator, scanFn, memo) {
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee15() {
	                var result;
	                return _regenerator2.default.wrap(function _callee15$(_context15) {
	                    while (1) {
	                        switch (_context15.prev = _context15.next) {
	                            case 0:
	                                _context15.next = 2;
	                                return iterator.next();
	
	                            case 2:
	                                result = _context15.sent;
	
	                                if (!result.done) {
	                                    _context15.next = 5;
	                                    break;
	                                }
	
	                                return _context15.abrupt("return", AsyncIterator.done);
	
	                            case 5:
	                                _context15.next = 7;
	                                return scanFn(memo, result.value);
	
	                            case 7:
	                                memo = _context15.sent;
	                                return _context15.abrupt("return", { done: false, value: memo });
	
	                            case 9:
	                            case "end":
	                                return _context15.stop();
	                        }
	                    }
	                }, _callee15, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.scan = scan;
	    function zip(iterator, other) {
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee16() {
	                var result, otherResult;
	                return _regenerator2.default.wrap(function _callee16$(_context16) {
	                    while (1) {
	                        switch (_context16.prev = _context16.next) {
	                            case 0:
	                                _context16.next = 2;
	                                return iterator.next();
	
	                            case 2:
	                                result = _context16.sent;
	
	                                if (!result.done) {
	                                    _context16.next = 5;
	                                    break;
	                                }
	
	                                return _context16.abrupt("return", AsyncIterator.done);
	
	                            case 5:
	                                _context16.next = 7;
	                                return other.next();
	
	                            case 7:
	                                otherResult = _context16.sent;
	
	                                if (!otherResult.done) {
	                                    _context16.next = 10;
	                                    break;
	                                }
	
	                                return _context16.abrupt("return", AsyncIterator.done);
	
	                            case 10:
	                                return _context16.abrupt("return", { done: false, value: [result.value, otherResult.value] });
	
	                            case 11:
	                            case "end":
	                                return _context16.stop();
	                        }
	                    }
	                }, _callee16, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.zip = zip;
	    function take(iterator, count) {
	        var i = 0;
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee17() {
	                return _regenerator2.default.wrap(function _callee17$(_context17) {
	                    while (1) {
	                        switch (_context17.prev = _context17.next) {
	                            case 0:
	                                return _context17.abrupt("return", ++i > count ? AsyncIterator.done : iterator.next());
	
	                            case 1:
	                            case "end":
	                                return _context17.stop();
	                        }
	                    }
	                }, _callee17, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.take = take;
	    function skip(iterator, count) {
	        var i = 0;
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee18() {
	                return _regenerator2.default.wrap(function _callee18$(_context18) {
	                    while (1) {
	                        switch (_context18.prev = _context18.next) {
	                            case 0:
	                                if (!(i < count)) {
	                                    _context18.next = 3;
	                                    break;
	                                }
	
	                                _context18.next = 3;
	                                return some(iterator, function () {
	                                    return ++i >= count;
	                                });
	
	                            case 3:
	                                return _context18.abrupt("return", iterator.next());
	
	                            case 4:
	                            case "end":
	                                return _context18.stop();
	                        }
	                    }
	                }, _callee18, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.skip = skip;
	    function concat() {
	        for (var _len = arguments.length, iterators = Array(_len), _key = 0; _key < _len; _key++) {
	            iterators[_key] = arguments[_key];
	        }
	
	        return iterators.reduce(function (memo, iterator) {
	            var iterated = false,
	                queue = _promise2.default.resolve(null);
	            function next() {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee19() {
	                    var result;
	                    return _regenerator2.default.wrap(function _callee19$(_context19) {
	                        while (1) {
	                            switch (_context19.prev = _context19.next) {
	                                case 0:
	                                    if (!iterated) {
	                                        _context19.next = 2;
	                                        break;
	                                    }
	
	                                    return _context19.abrupt("return", iterator.next());
	
	                                case 2:
	                                    _context19.next = 4;
	                                    return memo.next();
	
	                                case 4:
	                                    result = _context19.sent;
	
	                                    if (result.done) {
	                                        _context19.next = 7;
	                                        break;
	                                    }
	
	                                    return _context19.abrupt("return", result);
	
	                                case 7:
	                                    iterated = true;
	                                    return _context19.abrupt("return", iterator.next());
	
	                                case 9:
	                                case "end":
	                                    return _context19.stop();
	                            }
	                        }
	                    }, _callee19, this);
	                }));
	            }
	            return { next: next };
	        }, AsyncIterator.Empty);
	    }
	    AsyncIterator.concat = concat;
	    function fromArray(array) {
	        var current = -1,
	            queue = _promise2.default.resolve(null);
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee20() {
	                return _regenerator2.default.wrap(function _callee20$(_context20) {
	                    while (1) {
	                        switch (_context20.prev = _context20.next) {
	                            case 0:
	                                return _context20.abrupt("return", ++current >= array.length ? AsyncIterator.done : { done: false, value: array[current] });
	
	                            case 1:
	                            case "end":
	                                return _context20.stop();
	                        }
	                    }
	                }, _callee20, this);
	            }));
	        }
	        return { next: next };
	    }
	    AsyncIterator.fromArray = fromArray;
	    function fromObject(object) {
	        return fromArray((0, _keys2.default)(object).map(function (key) {
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
	        return reduce(iterator, function (memo, _ref) {
	            var _ref2 = (0, _slicedToArray3.default)(_ref, 2);
	
	            var key = _ref2[0];
	            var value = _ref2[1];
	            return memo[key] = value, memo;
	        }, (0, _create2.default)(null));
	    }
	    AsyncIterator.toObject = toObject;
	})(AsyncIterator || (exports.AsyncIterator = AsyncIterator = {}));
	exports.default = AsyncIterator;
	//# sourceMappingURL=async_iterator.js.map

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(86);
	module.exports = __webpack_require__(14).Object.keys;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(87);
	
	__webpack_require__(88)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(28);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(13)
	  , core    = __webpack_require__(14)
	  , fails   = __webpack_require__(12);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NotFound = undefined;
	
	var _classCallCheck2 = __webpack_require__(90);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NotFound = exports.NotFound = function NotFound() {
	  (0, _classCallCheck3.default)(this, NotFound);
	};
	
	;
	//# sourceMappingURL=exceptions.js.map

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tree = exports.Path = undefined;
	
	var _stringify = __webpack_require__(92);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var Path = exports.Path = undefined;
	(function (Path) {
	    function key(path) {
	        return path == null ? null : (0, _stringify2.default)(path);
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
	var Tree = exports.Tree = undefined;
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
	            prevs = _state2.default.filter(_state2.default.map(tree, function (state) {
	            return state.prev();
	        }), function (first) {
	            return first != null;
	        }),
	            paths = _state2.default.map(prevs, function (first, key) {
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
	            nexts = _state2.default.filter(_state2.default.map(tree, function (state) {
	            return state.next();
	        }), function (first) {
	            return first != null;
	        }),
	            paths = _state2.default.map(nexts, function (first, key) {
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
	exports.default = Tree;
	//# sourceMappingURL=tree.js.map

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(93), __esModule: true };

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(14);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;
	
	var _regenerator = __webpack_require__(2);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(72);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(42);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(79);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _patch = __webpack_require__(95);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _range = __webpack_require__(81);
	
	var _tree = __webpack_require__(91);
	
	var _observable = __webpack_require__(96);
	
	var _async_iterator = __webpack_require__(83);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _exceptions = __webpack_require__(89);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var Store = exports.Store = undefined;
	(function (Store) {
	    function map(parent, mapFn) {
	        var state = _state2.default.map(parent.state, mapFn),
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: patch.range,
	                added: patch.added ? _state2.default.map(patch.added, mapFn) : undefined
	            };
	        });
	        return create(state, dispatcher);
	    }
	    Store.map = map;
	    function filter(parent, filterFn) {
	        var _this = this;
	
	        var parentState = parent.state;
	        function find(state, range) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	                var _ref, _ref2, key;
	
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                _context.prev = 0;
	                                _context.next = 3;
	                                return _async_iterator2.default.find(_state2.default.entries(state, range), function (_ref3) {
	                                    var _ref4 = (0, _slicedToArray3.default)(_ref3, 2);
	
	                                    var key = _ref4[0];
	                                    var value = _ref4[1];
	                                    return filterFn(value, key);
	                                });
	
	                            case 3:
	                                _ref = _context.sent;
	                                _ref2 = (0, _slicedToArray3.default)(_ref, 1);
	                                key = _ref2[0];
	                                return _context.abrupt("return", key);
	
	                            case 9:
	                                _context.prev = 9;
	                                _context.t0 = _context["catch"](0);
	
	                                if (!(_context.t0 instanceof _exceptions.NotFound)) {
	                                    _context.next = 13;
	                                    break;
	                                }
	
	                                return _context.abrupt("return", _key2.default.sentinel);
	
	                            case 13:
	                                throw _context.t0;
	
	                            case 14:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this, [[0, 9]]);
	            }));
	        }
	        function move(state, range) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
	                var deleted, position;
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                deleted = _state2.default.slice(_state2.default.reverse(state), _range.Range.reverse(range)), position = range[1];
	
	                                if (!_range.Position.isNextPosition(position)) {
	                                    _context2.next = 11;
	                                    break;
	                                }
	
	                                _context2.next = 4;
	                                return _state2.default.empty(deleted);
	
	                            case 4:
	                                if (_context2.sent) {
	                                    _context2.next = 9;
	                                    break;
	                                }
	
	                                _context2.next = 7;
	                                return find(deleted, _range.Range.all);
	
	                            case 7:
	                                _context2.t0 = _context2.sent;
	                                return _context2.abrupt("return", {
	                                    next: _context2.t0
	                                });
	
	                            case 9:
	                                if (!(position.next === _key2.default.sentinel)) {
	                                    _context2.next = 11;
	                                    break;
	                                }
	
	                                return _context2.abrupt("return", { next: _key2.default.sentinel });
	
	                            case 11:
	                                _context2.next = 13;
	                                return find(state, [position, { next: _key2.default.sentinel }]);
	
	                            case 13:
	                                _context2.t1 = _context2.sent;
	                                return _context2.abrupt("return", {
	                                    prev: _context2.t1
	                                });
	
	                            case 15:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	        var dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
	                var range;
	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                _context3.next = 2;
	                                return _promise2.default.all([move(_state2.default.reverse(parentState), _range.Range.reverse(patch.range)).then(_range.Position.reverse), move(parentState, patch.range)]);
	
	                            case 2:
	                                range = _context3.sent;
	
	                                parentState = parent.state;
	                                return _context3.abrupt("return", {
	                                    range: range,
	                                    added: patch.added ? _state2.default.filter(patch.added, filterFn) : undefined
	                                });
	
	                            case 5:
	                            case "end":
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        });
	        return create(_state2.default.filter(parent.state, filterFn), dispatcher);
	    }
	    Store.filter = filter;
	    function zoom(parent, key) {
	        var parentState = parent.state,
	            state = _state2.default.zoom(parent.state, key),
	            dispatcher = _observable.Observable.map(_observable.Observable.filter(parent.dispatcher, function (patch) {
	            return _async_iterator2.default.some(_state2.default.entries(parentState, patch.range), function (entry) {
	                return entry[0] === key;
	            }).then(function (res) {
	                return patch.added ? _state2.default.has(patch.added, key) : res;
	            });
	        }), function (patch) {
	            parentState = parent.state;
	            return {
	                range: _range.Range.all,
	                added: patch.added ? _state2.default.zoom(patch.added, key) : undefined
	            };
	        });
	        return create(state, dispatcher);
	    }
	    Store.zoom = zoom;
	    function flatten(parent) {
	        var dispatcher_ = _observable.Subject.create();
	        var parent_ = cache(map(parent, function (store, key) {
	            _observable.Observable.map(store.dispatcher, function (patch) {
	                var from = patch.range[0],
	                    to = patch.range[1];
	                function mapPrevPosition(position) {
	                    if (position.prev === _key2.default.sentinel) return store.state.prev(_key2.default.sentinel).then(function (next) {
	                        return { next: _tree.Path.toKey([key, next]) };
	                    });
	                    return _promise2.default.resolve({ prev: _tree.Path.toKey([key, position.prev]) });
	                }
	                function mapNextPosition(position) {
	                    if (position.next === _key2.default.sentinel) return store.state.next(_key2.default.sentinel).then(function (prev) {
	                        return { prev: _tree.Path.toKey([key, prev]) };
	                    });
	                    return _promise2.default.resolve({ next: _tree.Path.toKey([key, position.next]) });
	                }
	                return _promise2.default.all([_range.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), _range.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
	                    return { range: range, added: patch.added ? patch.added : undefined };
	                });
	            }).subscribe(dispatcher_);
	            return store.state;
	        }));
	        _observable.Observable.map(parent.dispatcher, function (patch) {
	            var from = patch.range[0],
	                to = patch.range[1];
	            function mapPrevPosition(position) {
	                return position.prev === _key2.default.sentinel ? _promise2.default.resolve({ prev: _key2.default.sentinel }) : _tree.Tree.next(parent_.state, [position.prev]).then(_tree.Path.toKey).then(function (prev) {
	                    return { prev: prev };
	                });
	            }
	            function mapNextPosition(position) {
	                return position.next === _key2.default.sentinel ? _promise2.default.resolve({ next: _key2.default.sentinel }) : _tree.Tree.prev(parent_.state, [position.next]).then(_tree.Path.toKey).then(function (next) {
	                    return { next: next };
	                });
	            }
	            return _promise2.default.all([_range.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), _range.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
	                return { range: range, added: patch.added ? _state2.default.flatten(_state2.default.map(patch.added, function (store) {
	                        return store.state;
	                    })) : undefined };
	            });
	        }).subscribe(dispatcher_);
	        var state = _state2.default.flatten(parent_.state);
	        return create(state, dispatcher_);
	    }
	    Store.flatten = flatten;
	    function scan(parent, scanFn, memo) {
	        var store,
	            state = _state2.default.scan(parent.state, scanFn, memo),
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            var parentState = parent.state,
	                storeState = store.state,
	                range = [patch.range[0], { prev: null }],
	                added = _state2.default.lazy(function () {
	                return _state2.default.last(storeState, [{ next: null }, patch.range[0]]).then(function (memo) {
	                    return _state2.default.scan(_state2.default.slice(parentState, range), scanFn, memo);
	                });
	            });
	            return { range: range, added: added };
	        });
	        return store = create(state, dispatcher);
	    }
	    Store.scan = scan;
	    function cache(parent) {
	        var state = _state2.default.cache(parent.state),
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: patch.range,
	                added: patch.added ? _state2.default.cache(patch.added) : undefined
	            };
	        });
	        return Store.create(state, dispatcher);
	    }
	    Store.cache = cache;
	    function states(store) {
	        return _observable.Observable.map(store.dispatcher, function () {
	            return store.state;
	        });
	    }
	    Store.states = states;
	    function create(state, dispatcher) {
	        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _patch2.default.apply : arguments[2];
	
	        var store = { state: state, dispatcher: dispatcher };
	        _observable.Observable.scan(dispatcher, reducer, state).subscribe({
	            onNext: function onNext(state) {
	                store.state = state;
	            }
	        });
	        return store;
	    }
	    Store.create = create;
	})(Store || (exports.Store = Store = {}));
	exports.default = Store;
	//# sourceMappingURL=store.js.map

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Patch = undefined;
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	
	;
	var Patch = exports.Patch = undefined;
	(function (Patch) {
	    function apply(state, patch) {
	        return _state2.default.splice(state, patch.range, patch.added);
	    }
	    Patch.apply = apply;
	    function add(value, key) {
	        var position = arguments.length <= 2 || arguments[2] === undefined ? { prev: null } : arguments[2];
	
	        return { added: _state2.default.unit(value, key), range: [position, position] };
	    }
	    Patch.add = add;
	    function set(value, key) {
	        return { added: _state2.default.unit(value, key), range: [{ prev: key }, { next: key }] };
	    }
	    Patch.set = set;
	    function push(value, key) {
	        return add(value, key, { prev: null });
	    }
	    Patch.push = push;
	    function unshift(value, key) {
	        return add(value, key, { next: null });
	    }
	    Patch.unshift = unshift;
	    function remove(key) {
	        return { range: [{ prev: key }, { next: key }] };
	    }
	    Patch.remove = remove;
	})(Patch || (exports.Patch = Patch = {}));
	exports.default = Patch;
	//# sourceMappingURL=patch.js.map

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Subject = exports.Observable = exports.Disposable = undefined;
	
	var _keys = __webpack_require__(84);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(36);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(42);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(79);
	
	var _key2 = _interopRequireDefault(_key);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var Disposable = exports.Disposable = undefined;
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
	var Observable = exports.Observable = undefined;
	(function (Observable) {
	    function map(observable, mapFn) {
	        var subject = Subject.create();
	        observable.subscribe({
	            onNext: function onNext(value) {
	                return _promise2.default.resolve(mapFn(value)).then(subject.onNext);
	            }
	        });
	        return { subscribe: subject.subscribe };
	    }
	    Observable.map = map;
	    function filter(observable, filterFn) {
	        var subject = Subject.create();
	        observable.subscribe({
	            onNext: function onNext(value) {
	                return _promise2.default.resolve(filterFn(value)).then(function (result) {
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
	                return _promise2.default.resolve(scanFn(memo, value)).then(function (value) {
	                    memo = value;subject.onNext(value);
	                });
	            }
	        });
	        return { subscribe: subject.subscribe };
	    }
	    Observable.scan = scan;
	})(Observable || (exports.Observable = Observable = {}));
	var Subject = exports.Subject = undefined;
	(function (Subject) {
	    function create() {
	        var observers = (0, _create2.default)(null);
	        var current = _promise2.default.resolve();
	        function subscribe(observer) {
	            var observerKey = _key2.default.create();
	            observers[observerKey] = observer;
	            return Disposable.create(function () {
	                return delete observers[observerKey];
	            });
	        }
	        function onNext(value) {
	            return current = current.then(function () {
	                return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                    return observers[key].onNext(value);
	                })).then(function () {});
	            });
	        }
	        return { subscribe: subscribe, onNext: onNext };
	    }
	    Subject.create = create;
	})(Subject || (exports.Subject = Subject = {}));
	//# sourceMappingURL=observable.js.map

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PromiseUtils = undefined;
	
	var _promise = __webpack_require__(42);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PromiseUtils = exports.PromiseUtils = undefined;
	(function (PromiseUtils) {
	    function lazy(executor) {
	        var promise;
	        function then(onfulfilled, onrejected) {
	            if (promise) return promise.then(onfulfilled, onrejected);
	            return (promise = new _promise2.default(executor)).then(onfulfilled, onrejected);
	        }
	        return _promise2.default.resolve({ then: then });
	    }
	    PromiseUtils.lazy = lazy;
	})(PromiseUtils || (exports.PromiseUtils = PromiseUtils = {}));
	exports.default = PromiseUtils;
	//# sourceMappingURL=promise_utils.js.map

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Lens = undefined;
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _store = __webpack_require__(94);
	
	var _observable = __webpack_require__(96);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
	    return new Promise(function (resolve, reject) {
	        generator = generator.call(thisArg, _arguments);
	        function cast(value) {
	            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
	                resolve(value);
	            });
	        }
	        function onfulfill(value) {
	            try {
	                step("next", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function onreject(value) {
	            try {
	                step("throw", value);
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(verb, value) {
	            var result = generator[verb](value);
	            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
	        }
	        step("next", void 0);
	    });
	};
	var Lens = exports.Lens = undefined;
	(function (Lens) {
	    function compose(parent, lens) {
	        var getSubject = _observable.Subject.create(),
	            setSubject = _observable.Subject.create();
	        _observable.Observable.map(parent.dispatcher, function (patch) {
	            if (patch.added) return { range: patch.range, added: _state2.default.map(patch.added, lens.get) };
	            return { range: patch.range };
	        }).subscribe(getSubject);
	        _observable.Observable.map(setSubject, function (patch) {
	            if (patch.added) return { range: patch.range, added: _state2.default.map(patch.added, lens.set) };
	            return { range: patch.range };
	        }).subscribe(parent.dispatcher);
	        return _store.Store.create(_state2.default.map(parent.state, lens.get), { subscribe: getSubject.subscribe, onNext: setSubject.onNext });
	    }
	    Lens.compose = compose;
	})(Lens || (exports.Lens = Lens = {}));
	exports.default = Lens;
	//# sourceMappingURL=lens.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sonic.browser.js.map