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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _async_iterator = __webpack_require__(92);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _store = __webpack_require__(98);
	
	var _tree = __webpack_require__(97);
	
	var _cache = __webpack_require__(89);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _observable = __webpack_require__(100);
	
	var _promise_utils = __webpack_require__(101);
	
	var _promise_utils2 = _interopRequireDefault(_promise_utils);
	
	var _lens = __webpack_require__(102);
	
	var _lens2 = _interopRequireDefault(_lens);
	
	var _patch = __webpack_require__(99);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _exceptions = __webpack_require__(90);
	
	var _range = __webpack_require__(88);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Sonic(obj) {
	    if (obj instanceof Array) return _store.Store.create(_state2.default.fromArray(obj), _observable.Subject.create());
	    if (obj instanceof Object) return _store.Store.create(_state2.default.fromObject(obj), _observable.Subject.create());
	}
	var Sonic;
	(function (Sonic) {
	    Sonic.State = _state2.default;
	    Sonic.AsyncIterator = _async_iterator2.default;
	    Sonic.Store = _store.Store;
	    Sonic.Tree = _tree.Tree;
	    Sonic.Path = _tree.Path;
	    Sonic.Subject = _observable.Subject;
	    Sonic.Observable = _observable.Observable;
	    Sonic.Cache = _cache2.default;
	    Sonic.PromiseUtils = _promise_utils2.default;
	    Sonic.Lens = _lens2.default;
	    Sonic.Patch = _patch2.default;
	    Sonic.Range = _range.Range;
	    Sonic.Position = _range.Position;
	    Sonic.NotFound = _exceptions.NotFound;
	})(Sonic || (Sonic = {}));
	;
	exports.default = Sonic;
	
	module.exports = Sonic;
	//# sourceMappingURL=sonic.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3Qvc29uaWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxTQUFTLEtBQVQsQ0FBZSxHQUFmLEVBQW9CO0FBQ2hCLFFBQUksZUFBZSxLQUFuQixFQUNJLE9BQU8sYUFBTyxNQUFQLENBQWMsZ0JBQU8sU0FBUCxDQUFpQixHQUFqQixDQUFkLEVBQXFDLG9CQUFTLE1BQVQsRUFBckMsQ0FBUDtBQUNKLFFBQUksZUFBZSxNQUFuQixFQUNJLE9BQU8sYUFBTyxNQUFQLENBQWMsZ0JBQU8sVUFBUCxDQUFrQixHQUFsQixDQUFkLEVBQXNDLG9CQUFTLE1BQVQsRUFBdEMsQ0FBUDtBQUNQO0FBQ0QsSUFBSSxLQUFKO0FBQ0EsQ0FBQyxVQUFVLEtBQVYsRUFBaUI7QUFDZCxVQUFNLEtBQU47QUFDQSxVQUFNLGFBQU47QUFDQSxVQUFNLEtBQU47QUFDQSxVQUFNLElBQU47QUFDQSxVQUFNLElBQU47QUFDQSxVQUFNLE9BQU47QUFDQSxVQUFNLFVBQU47QUFDQSxVQUFNLEtBQU47QUFDQSxVQUFNLFlBQU47QUFDQSxVQUFNLElBQU47QUFDQSxVQUFNLEtBQU47QUFDQSxVQUFNLEtBQU47QUFDQSxVQUFNLFFBQU47QUFDQSxVQUFNLFFBQU47QUFDSCxDQWZELEVBZUcsVUFBVSxRQUFRLEVBQWxCLENBZkg7QUFnQkE7a0JBQ2UsSzs7QUFDZixPQUFPLE9BQVAsR0FBaUIsS0FBakIiLCJmaWxlIjoic29uaWMuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF9TdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCBfQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IFN0b3JlIGFzIF9TdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgVHJlZSBhcyBfVHJlZSwgUGF0aCBhcyBfUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgX0NhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgU3ViamVjdCBhcyBfU3ViamVjdCwgT2JzZXJ2YWJsZSBhcyBfT2JzZXJ2YWJsZSB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgX1Byb21pc2VVdGlscyBmcm9tICcuL3Byb21pc2VfdXRpbHMnO1xuaW1wb3J0IF9MZW5zIGZyb20gJy4vbGVucyc7XG5pbXBvcnQgX1BhdGNoIGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHsgTm90Rm91bmQgYXMgX05vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb25zJztcbmltcG9ydCB7IFJhbmdlIGFzIF9SYW5nZSwgUG9zaXRpb24gYXMgX1Bvc2l0aW9uIH0gZnJvbSAnLi9yYW5nZSc7XG5mdW5jdGlvbiBTb25pYyhvYmopIHtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHJldHVybiBfU3RvcmUuY3JlYXRlKF9TdGF0ZS5mcm9tQXJyYXkob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIHJldHVybiBfU3RvcmUuY3JlYXRlKF9TdGF0ZS5mcm9tT2JqZWN0KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbn1cbnZhciBTb25pYztcbihmdW5jdGlvbiAoU29uaWMpIHtcbiAgICBTb25pYy5TdGF0ZSA9IF9TdGF0ZTtcbiAgICBTb25pYy5Bc3luY0l0ZXJhdG9yID0gX0FzeW5jSXRlcmF0b3I7XG4gICAgU29uaWMuU3RvcmUgPSBfU3RvcmU7XG4gICAgU29uaWMuVHJlZSA9IF9UcmVlO1xuICAgIFNvbmljLlBhdGggPSBfUGF0aDtcbiAgICBTb25pYy5TdWJqZWN0ID0gX1N1YmplY3Q7XG4gICAgU29uaWMuT2JzZXJ2YWJsZSA9IF9PYnNlcnZhYmxlO1xuICAgIFNvbmljLkNhY2hlID0gX0NhY2hlO1xuICAgIFNvbmljLlByb21pc2VVdGlscyA9IF9Qcm9taXNlVXRpbHM7XG4gICAgU29uaWMuTGVucyA9IF9MZW5zO1xuICAgIFNvbmljLlBhdGNoID0gX1BhdGNoO1xuICAgIFNvbmljLlJhbmdlID0gX1JhbmdlO1xuICAgIFNvbmljLlBvc2l0aW9uID0gX1Bvc2l0aW9uO1xuICAgIFNvbmljLk5vdEZvdW5kID0gX05vdEZvdW5kO1xufSkoU29uaWMgfHwgKFNvbmljID0ge30pKTtcbjtcbmV4cG9ydCBkZWZhdWx0IFNvbmljO1xubW9kdWxlLmV4cG9ydHMgPSBTb25pYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNvbmljLmpzLm1hcCJdfQ==

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.State = undefined;
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(9);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _create = __webpack_require__(65);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(86);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _entry = __webpack_require__(87);
	
	var _entry2 = _interopRequireDefault(_entry);
	
	var _range2 = __webpack_require__(88);
	
	var _cache = __webpack_require__(89);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _async_iterator = __webpack_require__(92);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _tree = __webpack_require__(97);
	
	var _exceptions = __webpack_require__(90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = _promise2.default))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var State = exports.State = undefined;
	(function (State) {
	    State.Empty = {
	        get: function get(key) {
	            return _promise2.default.reject(new _exceptions.NotFound());
	        },
	        prev: function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	            return key === _key2.default.SENTINEL ? _promise2.default.resolve(_key2.default.SENTINEL) : _promise2.default.reject(new _exceptions.NotFound());
	        },
	        next: function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	            return key === _key2.default.SENTINEL ? _promise2.default.resolve(_key2.default.SENTINEL) : _promise2.default.reject(new _exceptions.NotFound());
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
	        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
	        var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
	
	        var from = _ref3[0];
	        var to = _ref3[1];
	
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	            return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            return _context.abrupt('return', _range2.Position.isPrevPosition(from) ? from.prev : state.next(from.next));
	
	                        case 1:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, this);
	        }));
	    }
	    State.first = first;
	    function last(state) {
	        var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
	        var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
	
	        var from = _ref5[0];
	        var to = _ref5[1];
	
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
	            return _regenerator2.default.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            return _context2.abrupt('return', _range2.Position.isNextPosition(to) ? to.next : state.prev(to.prev));
	
	                        case 1:
	                        case 'end':
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, this);
	        }));
	    }
	    State.last = last;
	    function has(state, key) {
	        return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
	            return _regenerator2.default.wrap(function _callee3$(_context3) {
	                while (1) {
	                    switch (_context3.prev = _context3.next) {
	                        case 0:
	                            _context3.prev = 0;
	                            _context3.next = 3;
	                            return state.get(key);
	
	                        case 3:
	                            return _context3.abrupt('return', true);
	
	                        case 6:
	                            _context3.prev = 6;
	                            _context3.t0 = _context3['catch'](0);
	
	                            if (!(_context3.t0 instanceof _exceptions.NotFound)) {
	                                _context3.next = 10;
	                                break;
	                            }
	
	                            return _context3.abrupt('return', false);
	
	                        case 10:
	                            throw _context3.t0;
	
	                        case 11:
	                        case 'end':
	                            return _context3.stop();
	                    }
	                }
	            }, _callee3, this, [[0, 6]]);
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
	            return next === _key2.default.SENTINEL;
	        });
	    }
	    State.empty = empty;
	    function any(state) {
	        return state.next().then(function (next) {
	            return next !== _key2.default.SENTINEL;
	        });
	    }
	    State.any = any;
	    function size(state) {
	        return _async_iterator2.default.size(keys(state));
	    }
	    State.size = size;
	    function slice(parent) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
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
	                    if (prev !== _key2.default.SENTINEL) return prev;
	                    return _range2.Position.isNextPosition(from) ? from.next : parent.prev(from.prev);
	                });
	            },
	            next: function next(key) {
	                return child.next(key).then(function (next) {
	                    if (next !== _key2.default.SENTINEL) return next;
	                    return _range2.Position.isPrevPosition(to) ? to.prev : parent.next(to.next);
	                });
	            }
	        });
	        bridgedParent = extend(filtered, {
	            prev: function prev(key) {
	                return parent.prev(key).then(function (prev) {
	                    if (_range2.Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(_key2.default.SENTINEL);
	                    return has(deleted, prev).then(function (res) {
	                        if (res) throw new _exceptions.NotFound();
	                        return prev;
	                    });
	                });
	            },
	            next: function next(key) {
	                return parent.next(key).then(function (next) {
	                    if (_range2.Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(_key2.default.SENTINEL);
	                    return has(deleted, next).then(function (res) {
	                        if (res) throw new _exceptions.NotFound();
	                        return next;
	                    });
	                });
	            }
	        });
	        function get(key) {
	            return bridgedChild.get(key).catch(function (reason) {
	                if (!(reason instanceof _exceptions.NotFound)) throw reason;
	                return bridgedParent.get(key);
	            });
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            if (_range2.Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(_key2.default.SENTINEL);
	            return has(bridgedChild, key).then(function (res) {
	                return res ? bridgedChild.prev(key) : bridgedParent.prev(key);
	            });
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            if (_range2.Position.isNextPosition(from) && key === from.next) return bridgedChild.next(_key2.default.SENTINEL);
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
	            return parent.get(key).then(function (value) {
	                return mapFn(value, key);
	            });
	        }
	        return extend(parent, { get: get });
	    }
	    State.map = map;
	    function filter(parent, filterFn) {
	        var cache = (0, _create2.default)(null);
	        function have(key) {
	            var label = (0, _stringify2.default)(key);
	            return label in cache ? cache[label] : cache[label] = parent.get(key).then(function (value) {
	                return filterFn(value, key);
	            });
	        }
	        function find(state, from) {
	            return _async_iterator2.default.filter(keys(state, [{ next: from }, { prev: null }]), have).next().then(function (result) {
	                return result.done ? _key2.default.SENTINEL : result.value;
	            });
	        }
	        function get(key) {
	            return have(key).then(function (res) {
	                if (!res) throw new _exceptions.NotFound();
	                return parent.get(key);
	            });
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            if (key === _key2.default.SENTINEL) return find(reverse(parent), key);
	            return have(key).then(function (res) {
	                if (!res) throw new _exceptions.NotFound();
	            }).then(function () {
	                return find(reverse(parent), key);
	            });
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            if (key === _key2.default.SENTINEL) return find(parent, key);
	            return have(key).then(function (res) {
	                if (!res) throw new _exceptions.NotFound();
	            }).then(function () {
	                return find(parent, key);
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
	        }, [_key2.default.SENTINEL, memo]));
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
	            return __awaiter(_this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                                _context4.next = 2;
	                                return has(omitted, key);
	
	                            case 2:
	                                return _context4.abrupt('return', !_context4.sent);
	
	                            case 3:
	                            case 'end':
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, this);
	            }));
	        });
	    }
	    State.omit = omit;
	    function zip(parent, other) {
	        return fromEntries(_async_iterator2.default.zip(_async_iterator2.default.zip(keys(parent), keys(other)), _async_iterator2.default.zip(values(parent), values(other))));
	    }
	    State.zip = zip;
	    function zoom(parent, key) {
	        var have;
	        function get(k) {
	            if (k === key) return parent.get(key);
	            return _promise2.default.reject(new _exceptions.NotFound());
	        }
	        function next() {
	            var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            if (k !== key && k !== _key2.default.SENTINEL) return _promise2.default.reject(new _exceptions.NotFound());
	            if (k === key) return _promise2.default.resolve(_key2.default.SENTINEL);
	            if (have !== undefined) return _promise2.default.resolve(have ? key : _key2.default.SENTINEL);
	            return has(parent, key).then(function (res) {
	                return (have = res) ? key : _key2.default.SENTINEL;
	            });
	        }
	        return { get: get, prev: next, next: next };
	    }
	    State.zoom = zoom;
	    function flatten(parent) {
	        return extend(parent, {
	            get: function get(key) {
	                return _tree.Tree.get(parent, key);
	            },
	            prev: function prev(key) {
	                return _tree.Tree.prev(parent, key);
	            },
	            next: function next(key) {
	                return _tree.Tree.next(parent, key);
	            }
	        });
	    }
	    State.flatten = flatten;
	    function flatMap(parent, mapFn) {
	        return State.flatten(State.map(parent, mapFn));
	    }
	    State.flatMap = flatMap;
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
	            return !((0, _stringify2.default)(groupKey) in states);
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
	            return [groupKey, states[(0, _stringify2.default)(groupKey)] = state];
	        });
	        return fromEntries(mapped);
	    }
	    State.groupBy = groupBy;
	    function unique(parent, uniqueFn) {
	        var _this2 = this;
	
	        return fromEntries(_async_iterator2.default.unique(entries(parent), function (_ref12) {
	            var _ref13 = (0, _slicedToArray3.default)(_ref12, 2);
	
	            var key = _ref13[0];
	            var value = _ref13[1];
	            return __awaiter(_this2, void 0, void 0, _regenerator2.default.mark(function _callee5() {
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                return _context5.abrupt('return', uniqueFn(value, key));
	
	                            case 1:
	                            case 'end':
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, this);
	            }));
	        }));
	    }
	    State.unique = unique;
	    function union(state, other, uniqueFn) {
	        var _this3 = this;
	
	        return fromEntries(_async_iterator2.default.unique(_async_iterator2.default.concat(entries(state), entries(other)), function (_ref14) {
	            var _ref15 = (0, _slicedToArray3.default)(_ref14, 2);
	
	            var key = _ref15[0];
	            var value = _ref15[1];
	            return __awaiter(_this3, void 0, void 0, _regenerator2.default.mark(function _callee6() {
	                return _regenerator2.default.wrap(function _callee6$(_context6) {
	                    while (1) {
	                        switch (_context6.prev = _context6.next) {
	                            case 0:
	                                return _context6.abrupt('return', uniqueFn(value, key));
	
	                            case 1:
	                            case 'end':
	                                return _context6.stop();
	                        }
	                    }
	                }, _callee6, this);
	            }));
	        }));
	    }
	    State.union = union;
	    function keyBy(parent, keyFn, reverseKeyFn) {
	        if (!reverseKeyFn) return fromEntries(_async_iterator2.default.map(entries(parent), function (entry) {
	            return _promise2.default.resolve(keyFn(entry[1], entry[0])).then(function (key) {
	                return [key, entry[1]];
	            });
	        }));
	        return {
	            get: function get(key) {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
	                    return _regenerator2.default.wrap(function _callee7$(_context7) {
	                        while (1) {
	                            switch (_context7.prev = _context7.next) {
	                                case 0:
	                                    _context7.t0 = parent;
	                                    _context7.next = 3;
	                                    return reverseKeyFn(key);
	
	                                case 3:
	                                    _context7.t1 = _context7.sent;
	                                    return _context7.abrupt('return', _context7.t0.get.call(_context7.t0, _context7.t1));
	
	                                case 5:
	                                case 'end':
	                                    return _context7.stop();
	                            }
	                        }
	                    }, _callee7, this);
	                }));
	            },
	            prev: function prev(key) {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
	                    var prev;
	                    return _regenerator2.default.wrap(function _callee8$(_context8) {
	                        while (1) {
	                            switch (_context8.prev = _context8.next) {
	                                case 0:
	                                    _context8.t0 = parent;
	                                    _context8.next = 3;
	                                    return reverseKeyFn(key);
	
	                                case 3:
	                                    _context8.t1 = _context8.sent;
	                                    _context8.next = 6;
	                                    return _context8.t0.prev.call(_context8.t0, _context8.t1);
	
	                                case 6:
	                                    prev = _context8.sent;
	                                    _context8.next = 9;
	                                    return parent.get(prev);
	
	                                case 9:
	                                    _context8.t2 = _context8.sent;
	                                    _context8.t3 = prev;
	                                    return _context8.abrupt('return', keyFn(_context8.t2, _context8.t3));
	
	                                case 12:
	                                case 'end':
	                                    return _context8.stop();
	                            }
	                        }
	                    }, _callee8, this);
	                }));
	            },
	            next: function next(key) {
	                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee9() {
	                    var next;
	                    return _regenerator2.default.wrap(function _callee9$(_context9) {
	                        while (1) {
	                            switch (_context9.prev = _context9.next) {
	                                case 0:
	                                    _context9.t0 = parent;
	                                    _context9.next = 3;
	                                    return reverseKeyFn(key);
	
	                                case 3:
	                                    _context9.t1 = _context9.sent;
	                                    _context9.next = 6;
	                                    return _context9.t0.next.call(_context9.t0, _context9.t1);
	
	                                case 6:
	                                    next = _context9.sent;
	                                    _context9.next = 9;
	                                    return parent.get(next);
	
	                                case 9:
	                                    _context9.t2 = _context9.sent;
	                                    _context9.t3 = next;
	                                    return _context9.abrupt('return', keyFn(_context9.t2, _context9.t3));
	
	                                case 12:
	                                case 'end':
	                                    return _context9.stop();
	                            }
	                        }
	                    }, _callee9, this);
	                }));
	            }
	        };
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
	        var key = arguments.length <= 1 || arguments[1] === undefined ? _key2.default.unique() : arguments[1];
	
	        return {
	            get: function get(k) {
	                return k === key ? _promise2.default.resolve(value) : _promise2.default.reject(new _exceptions.NotFound());
	            },
	            prev: function prev() {
	                var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	                return _promise2.default.resolve(k === _key2.default.SENTINEL ? key : _key2.default.SENTINEL);
	            },
	            next: function next() {
	                var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	                return _promise2.default.resolve(k === _key2.default.SENTINEL ? key : _key2.default.SENTINEL);
	            }
	        };
	    }
	    State.unit = unit;
	    function entries(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	        var current = _key2.default.SENTINEL;var done = false;
	        var _range = (0, _slicedToArray3.default)(range, 2);
	
	        var from = _range[0];
	        var to = _range[1];
	
	        function get(key) {
	            if (key === _key2.default.SENTINEL) return done = true, _promise2.default.resolve(_async_iterator2.default.done);
	            return state.get(key).then(function (value) {
	                return current = key, { done: false, value: [key, value] };
	            });
	        }
	        function iterate(key) {
	            return state.next(key).then(function (next) {
	                if (_range2.Position.isPrevPosition(to) && to.prev === next) return get(_key2.default.SENTINEL);
	                return get(next);
	            });
	        }
	        function next() {
	            if (_range2.Position.isPrevPosition(from) && _range2.Position.isPrevPosition(to) && from.prev === to.prev) return get(_key2.default.SENTINEL);
	            if (_range2.Position.isNextPosition(from) && _range2.Position.isNextPosition(to) && from.next === to.next) return get(_key2.default.SENTINEL);
	            if (current === _key2.default.SENTINEL) return _range2.Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
	            if (_range2.Position.isNextPosition(to) && to.next === current) return get(_key2.default.SENTINEL);
	            return iterate(current);
	        }
	        return _async_iterator2.default.create(next);
	    }
	    State.entries = entries;
	    function keys(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
	        return _async_iterator2.default.map(entries(state, range), _entry2.default.key);
	    }
	    State.keys = keys;
	    function values(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
	        return _async_iterator2.default.map(entries(state, range), _entry2.default.value);
	    }
	    State.values = values;
	    function fromEntries(iterator) {
	        var _this4 = this;
	
	        var cache = _cache2.default.create(),
	            exhausted = false,
	            currentKey = _key2.default.SENTINEL,
	            queue = _promise2.default.resolve(null);
	        var cachingIterator = _async_iterator2.default.create(function () {
	            return __awaiter(_this4, void 0, void 0, _regenerator2.default.mark(function _callee10() {
	                var result, _result$value, key, value;
	
	                return _regenerator2.default.wrap(function _callee10$(_context10) {
	                    while (1) {
	                        switch (_context10.prev = _context10.next) {
	                            case 0:
	                                _context10.next = 2;
	                                return iterator.next();
	
	                            case 2:
	                                result = _context10.sent;
	
	                                if (!result.done) {
	                                    _context10.next = 8;
	                                    break;
	                                }
	
	                                exhausted = true;
	                                cache.prev(_key2.default.SENTINEL, currentKey);
	                                cache.next(currentKey, _key2.default.SENTINEL);
	                                return _context10.abrupt('return', _async_iterator2.default.done);
	
	                            case 8:
	                                _result$value = (0, _slicedToArray3.default)(result.value, 2);
	                                key = _result$value[0];
	                                value = _result$value[1];
	
	                                cache.prev(key, currentKey);
	                                cache.next(currentKey, key);
	                                cache.get(key, value);
	                                currentKey = key;
	                                return _context10.abrupt('return', { done: false, value: [key, value] });
	
	                            case 16:
	                            case 'end':
	                                return _context10.stop();
	                        }
	                    }
	                }, _callee10, this);
	            }));
	        });
	        function get(key) {
	            if (exhausted) return _promise2.default.reject(new _exceptions.NotFound());
	            return _async_iterator2.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(_entry2.default.value);
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee11() {
	                return _regenerator2.default.wrap(function _callee11$(_context11) {
	                    while (1) {
	                        switch (_context11.prev = _context11.next) {
	                            case 0:
	                                if (!exhausted) {
	                                    _context11.next = 2;
	                                    break;
	                                }
	
	                                return _context11.abrupt('return', _promise2.default.reject(new _exceptions.NotFound()));
	
	                            case 2:
	                                _context11.next = 4;
	                                return _async_iterator2.default.some(cachingIterator, function (entry) {
	                                    return entry[0] === key;
	                                });
	
	                            case 4:
	                                return _context11.abrupt('return', cache.prev(key));
	
	                            case 5:
	                            case 'end':
	                                return _context11.stop();
	                        }
	                    }
	                }, _callee11, this);
	            }));
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            if (exhausted) return _promise2.default.reject(new _exceptions.NotFound());
	            if (key === currentKey) return cachingIterator.next().then(function (result) {
	                return result.done ? _key2.default.SENTINEL : result.value[0];
	            });
	            return _async_iterator2.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(function () {
	                return cachingIterator.next();
	            }).then(function (result) {
	                return result.done ? _key2.default.SENTINEL : result.value[0];
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
	        return fromEntries(_async_iterator2.default.scan(iterator, function (prev, value) {
	            return [prev[0] + 1, value];
	        }, [-1, null]));
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee12() {
	                return _regenerator2.default.wrap(function _callee12$(_context12) {
	                    while (1) {
	                        switch (_context12.prev = _context12.next) {
	                            case 0:
	                                if (!state) {
	                                    _context12.next = 4;
	                                    break;
	                                }
	
	                                _context12.t0 = state;
	                                _context12.next = 7;
	                                break;
	
	                            case 4:
	                                _context12.next = 6;
	                                return fn();
	
	                            case 6:
	                                _context12.t0 = state = _context12.sent;
	
	                            case 7:
	                                return _context12.abrupt('return', _context12.t0);
	
	                            case 8:
	                            case 'end':
	                                return _context12.stop();
	                        }
	                    }
	                }, _callee12, this);
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
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
	        return _async_iterator2.default.toObject(entries(state, range));
	    }
	    State.toObject = toObject;
	    function toArray(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? _range2.Range.all : arguments[1];
	
	        return _async_iterator2.default.toArray(values(state, range));
	    }
	    State.toArray = toArray;
	})(State || (exports.State = State = {}));
	exports.default = State;
	//# sourceMappingURL=state.js.map
	//# sourceMappingURL=data:application/json;base64,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LGFBQTdCLENBQWpDO0FBQ0g7QUFDRCxpQkFBUyxJQUFULENBQWMsR0FBZCxFQUFtQjtBQUNmLG1CQUFPLFFBQVEsTUFBTSxJQUFOLENBQVcsR0FBWCxDQUFSLEdBQTBCLE1BQU0sSUFBTixDQUFXLFdBQVgsRUFBd0IsSUFBeEIsQ0FBNkI7QUFBQSx1QkFBSyxFQUFFLElBQUYsQ0FBTyxHQUFQLENBQUw7QUFBQSxhQUE3QixDQUFqQztBQUNIO0FBQ0QsZUFBTyxFQUFFLFFBQUYsRUFBTyxVQUFQLEVBQWEsVUFBYixFQUFQO0FBQ0g7QUFDRCxVQUFNLElBQU4sR0FBYSxJQUFiO0FBQ0EsYUFBUyxRQUFULENBQWtCLEtBQWxCLEVBQTRDO0FBQUEsWUFBbkIsS0FBbUIseURBQVgsY0FBTSxHQUFLOztBQUN4QyxlQUFPLHlCQUFjLFFBQWQsQ0FBdUIsUUFBUSxLQUFSLEVBQWUsS0FBZixDQUF2QixDQUFQO0FBQ0g7QUFDRCxVQUFNLFFBQU4sR0FBaUIsUUFBakI7QUFDQSxhQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBMkM7QUFBQSxZQUFuQixLQUFtQix5REFBWCxjQUFNLEdBQUs7O0FBQ3ZDLGVBQU8seUJBQWMsT0FBZCxDQUFzQixPQUFPLEtBQVAsRUFBYyxLQUFkLENBQXRCLENBQVA7QUFDSDtBQUNELFVBQU0sT0FBTixHQUFnQixPQUFoQjtBQUNILENBelpELEVBeVpHLGtCQTFaUSxLQTBaUixHQUFVLFFBQVEsRUFBbEIsQ0F6Wkg7a0JBMFplLEsiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cykpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgRW50cnkgZnJvbSAnLi9lbnRyeSc7XG5pbXBvcnQgeyBQb3NpdGlvbiwgUmFuZ2UgfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBOb3RGb3VuZCB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5leHBvcnQgdmFyIFN0YXRlO1xuKGZ1bmN0aW9uIChTdGF0ZSkge1xuICAgIFN0YXRlLkVtcHR5ID0ge1xuICAgICAgICBnZXQ6IChrZXkpID0+IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCksXG4gICAgICAgIHByZXY6IChrZXkgPSBLZXkuU0VOVElORUwpID0+IGtleSA9PT0gS2V5LlNFTlRJTkVMID8gUHJvbWlzZS5yZXNvbHZlKEtleS5TRU5USU5FTCkgOiBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpLFxuICAgICAgICBuZXh0OiAoa2V5ID0gS2V5LlNFTlRJTkVMKSA9PiBrZXkgPT09IEtleS5TRU5USU5FTCA/IFByb21pc2UucmVzb2x2ZShLZXkuU0VOVElORUwpIDogUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgICAgIGlmIChnZXQpXG4gICAgICAgICAgICBzdGF0ZS5nZXQgPSBnZXQ7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgc3RhdGUucHJldiA9IHByZXY7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgc3RhdGUubmV4dCA9IG5leHQ7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgU3RhdGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGZpcnN0KHN0YXRlLCBbZnJvbSwgdG9dID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pID8gZnJvbS5wcmV2IDogc3RhdGUubmV4dChmcm9tLm5leHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlyc3QgPSBmaXJzdDtcbiAgICBmdW5jdGlvbiBsYXN0KHN0YXRlLCBbZnJvbSwgdG9dID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IHRvLm5leHQgOiBzdGF0ZS5wcmV2KHRvLnByZXYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUubGFzdCA9IGxhc3Q7XG4gICAgZnVuY3Rpb24gaGFzKHN0YXRlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHN0YXRlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgTm90Rm91bmQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLmhhcyA9IGhhcztcbiAgICBmdW5jdGlvbiBpcyhzdGF0ZSwgb3RoZXIpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gZW50cmllcyhzdGF0ZSksIG90aGVySXRlcmF0b3IgPSBlbnRyaWVzKG90aGVyKTtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuaXMoaXRlcmF0b3IsIG90aGVySXRlcmF0b3IsIEVudHJ5LmlzKTtcbiAgICB9XG4gICAgU3RhdGUuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBjb250YWlucyhzdGF0ZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZShlbnRyaWVzKHN0YXRlKSwgZW50cnkgPT4gZW50cnlbMV0gPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBlbXB0eShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ID09PSBLZXkuU0VOVElORUwpO1xuICAgIH1cbiAgICBTdGF0ZS5lbXB0eSA9IGVtcHR5O1xuICAgIGZ1bmN0aW9uIGFueShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ICE9PSBLZXkuU0VOVElORUwpO1xuICAgIH1cbiAgICBTdGF0ZS5hbnkgPSBhbnk7XG4gICAgZnVuY3Rpb24gc2l6ZShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zaXplKGtleXMoc3RhdGUpKTtcbiAgICB9XG4gICAgU3RhdGUuc2l6ZSA9IHNpemU7XG4gICAgZnVuY3Rpb24gc2xpY2UocGFyZW50LCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoZW50cmllcyhwYXJlbnQsIHJhbmdlKSk7XG4gICAgfVxuICAgIFN0YXRlLnNsaWNlID0gc2xpY2U7XG4gICAgZnVuY3Rpb24gc3BsaWNlKHBhcmVudCwgcmFuZ2UsIGNoaWxkKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgIGJyaWRnZWRDaGlsZCA9IGV4dGVuZChjaGlsZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IGNoaWxkLnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IGZyb20ubmV4dCA6IHBhcmVudC5wcmV2KGZyb20ucHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAhPT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pID8gdG8ucHJldiA6IHBhcmVudC5uZXh0KHRvLm5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGJyaWRnZWRQYXJlbnQgPSBleHRlbmQoZmlsdGVyZWQsIHtcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBwYXJlbnQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiBwcmV2ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLnByZXYoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIHByZXYpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIG5leHQgPT09IGZyb20ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5TRU5USU5FTCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQuZ2V0KGtleSkuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIShyZWFzb24gaW5zdGFuY2VvZiBOb3RGb3VuZCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZFBhcmVudC5nZXQoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGtleSA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLnByZXYoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5wcmV2KGtleSkgOiBicmlkZ2VkUGFyZW50LnByZXYoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuU0VOVElORUwpIHtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBrZXkgPT09IGZyb20ubmV4dClcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLm5leHQoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMoYnJpZGdlZENoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5uZXh0KGtleSkgOiBicmlkZ2VkUGFyZW50Lm5leHQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIFN0YXRlLnNwbGljZSA9IHNwbGljZTtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgcHJldjogcGFyZW50Lm5leHQsXG4gICAgICAgICAgICBuZXh0OiBwYXJlbnQucHJldlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUucmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IG1hcEZuKHZhbHVlLCBrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwgeyBnZXQgfSk7XG4gICAgfVxuICAgIFN0YXRlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBoYXZlKGtleSkge1xuICAgICAgICAgICAgdmFyIGxhYmVsID0gSlNPTi5zdHJpbmdpZnkoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBsYWJlbCBpbiBjYWNoZSA/IGNhY2hlW2xhYmVsXSA6IGNhY2hlW2xhYmVsXSA9IHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IGZpbHRlckZuKHZhbHVlLCBrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBmaW5kKHN0YXRlLCBmcm9tKSB7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maWx0ZXIoa2V5cyhzdGF0ZSwgW3sgbmV4dDogZnJvbSB9LCB7IHByZXY6IG51bGwgfV0pLCBoYXZlKVxuICAgICAgICAgICAgICAgIC5uZXh0KCkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyBLZXkuU0VOVElORUwgOiByZXN1bHQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXZlKGtleSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmQocmV2ZXJzZShwYXJlbnQpLCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGhhdmUoa2V5KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZmluZChyZXZlcnNlKHBhcmVudCksIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmQocGFyZW50LCBrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGhhdmUoa2V5KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZmluZChwYXJlbnQsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ocGFyZW50LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihlbnRyaWVzKHBhcmVudCksIChtZW1vRW50cnksIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vRW50cnlbMV0sIGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4ocmVzdWx0ID0+IFtlbnRyeVswXSwgcmVzdWx0XSk7XG4gICAgICAgIH0sIFtLZXkuU0VOVElORUwsIG1lbW9dKSk7XG4gICAgfVxuICAgIFN0YXRlLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHBpY2socGFyZW50LCBwaWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBoYXMocGlja2VkLCBrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUucGljayA9IHBpY2s7XG4gICAgZnVuY3Rpb24gb21pdChwYXJlbnQsIG9taXR0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiAhKHlpZWxkIGhhcyhvbWl0dGVkLCBrZXkpKTsgfSkpO1xuICAgIH1cbiAgICBTdGF0ZS5vbWl0ID0gb21pdDtcbiAgICBmdW5jdGlvbiB6aXAocGFyZW50LCBvdGhlcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci56aXAoQXN5bmNJdGVyYXRvci56aXAoa2V5cyhwYXJlbnQpLCBrZXlzKG90aGVyKSksIEFzeW5jSXRlcmF0b3IuemlwKHZhbHVlcyhwYXJlbnQpLCB2YWx1ZXMob3RoZXIpKSkpO1xuICAgIH1cbiAgICBTdGF0ZS56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICB2YXIgaGF2ZTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGspIHtcbiAgICAgICAgICAgIGlmIChrID09PSBrZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoayA9IEtleS5TRU5USU5FTCkge1xuICAgICAgICAgICAgaWYgKGsgIT09IGtleSAmJiBrICE9PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCk7XG4gICAgICAgICAgICBpZiAoayA9PT0ga2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIGlmIChoYXZlICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShoYXZlID8ga2V5IDogS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMocGFyZW50LCBrZXkpLnRoZW4ocmVzID0+IChoYXZlID0gcmVzKSA/IGtleSA6IEtleS5TRU5USU5FTCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2OiBuZXh0LCBuZXh0IH07XG4gICAgfVxuICAgIFN0YXRlLnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBUcmVlLmdldChwYXJlbnQsIGtleSksXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gVHJlZS5wcmV2KHBhcmVudCwga2V5KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBUcmVlLm5leHQocGFyZW50LCBrZXkpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5mbGF0dGVuID0gZmxhdHRlbjtcbiAgICBmdW5jdGlvbiBmbGF0TWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLmZsYXR0ZW4oU3RhdGUubWFwKHBhcmVudCwgbWFwRm4pKTtcbiAgICB9XG4gICAgU3RhdGUuZmxhdE1hcCA9IGZsYXRNYXA7XG4gICAgZnVuY3Rpb24gZ3JvdXBCeShwYXJlbnQsIGdyb3VwRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlcyA9IHt9O1xuICAgICAgICB2YXIgaXQgPSBlbnRyaWVzKHBhcmVudCk7XG4gICAgICAgIHZhciBncm91cEtleWVkID0gQXN5bmNJdGVyYXRvci5tYXAoaXQsIChba2V5LCB2YWx1ZV0pID0+IHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShncm91cEZuKHZhbHVlLCBrZXkpKS50aGVuKGdyb3VwS2V5ID0+IFtncm91cEtleSwgdmFsdWVdKTsgfSk7XG4gICAgICAgIHZhciBmaWx0ZXJlZCA9IEFzeW5jSXRlcmF0b3IuZmlsdGVyKGdyb3VwS2V5ZWQsIChbZ3JvdXBLZXksIHZhbHVlXSkgPT4gIShKU09OLnN0cmluZ2lmeShncm91cEtleSkgaW4gc3RhdGVzKSk7XG4gICAgICAgIHZhciBtYXBwZWQgPSBBc3luY0l0ZXJhdG9yLm1hcChmaWx0ZXJlZCwgKFtncm91cEtleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKGdyb3VwRm4odmFsdWUsIGtleSkpLnRoZW4oZ2sgPT4gZ2sgPT09IGdyb3VwS2V5KSk7XG4gICAgICAgICAgICByZXR1cm4gW2dyb3VwS2V5LCBzdGF0ZXNbSlNPTi5zdHJpbmdpZnkoZ3JvdXBLZXkpXSA9IHN0YXRlXTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhtYXBwZWQpO1xuICAgIH1cbiAgICBTdGF0ZS5ncm91cEJ5ID0gZ3JvdXBCeTtcbiAgICBmdW5jdGlvbiB1bmlxdWUocGFyZW50LCB1bmlxdWVGbikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci51bmlxdWUoZW50cmllcyhwYXJlbnQpLCAoW2tleSwgdmFsdWVdKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB1bmlxdWVGbih2YWx1ZSwga2V5KTsgfSkpKTtcbiAgICB9XG4gICAgU3RhdGUudW5pcXVlID0gdW5pcXVlO1xuICAgIGZ1bmN0aW9uIHVuaW9uKHN0YXRlLCBvdGhlciwgdW5pcXVlRm4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IudW5pcXVlKEFzeW5jSXRlcmF0b3IuY29uY2F0KGVudHJpZXMoc3RhdGUpLCBlbnRyaWVzKG90aGVyKSksIChba2V5LCB2YWx1ZV0pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHVuaXF1ZUZuKHZhbHVlLCBrZXkpOyB9KSkpO1xuICAgIH1cbiAgICBTdGF0ZS51bmlvbiA9IHVuaW9uO1xuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4sIHJldmVyc2VLZXlGbikge1xuICAgICAgICBpZiAoIXJldmVyc2VLZXlGbilcbiAgICAgICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHBhcmVudCksIGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleUZuKGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4oa2V5ID0+IFtrZXksIGVudHJ5WzFdXSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuZ2V0KHlpZWxkIHJldmVyc2VLZXlGbihrZXkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2KGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHlpZWxkIHBhcmVudC5wcmV2KHlpZWxkIHJldmVyc2VLZXlGbihrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleUZuKHlpZWxkIHBhcmVudC5nZXQocHJldiksIHByZXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSB5aWVsZCBwYXJlbnQubmV4dCh5aWVsZCByZXZlcnNlS2V5Rm4oa2V5KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlGbih5aWVsZCBwYXJlbnQuZ2V0KG5leHQpLCBuZXh0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3RhdGUua2V5QnkgPSBrZXlCeTtcbiAgICBmdW5jdGlvbiB0YWtlKHBhcmVudCwgY291bnQpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IudGFrZShlbnRyaWVzKHBhcmVudCksIGNvdW50KSk7XG4gICAgfVxuICAgIFN0YXRlLnRha2UgPSB0YWtlO1xuICAgIGZ1bmN0aW9uIHNraXAocGFyZW50LCBjb3VudCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5za2lwKGVudHJpZXMocGFyZW50KSwgY291bnQpKTtcbiAgICB9XG4gICAgU3RhdGUuc2tpcCA9IHNraXA7XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseShwYXJlbnQsIENhY2hlLmNyZWF0ZSgpKTtcbiAgICB9XG4gICAgU3RhdGUuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiB1bml0KHZhbHVlLCBrZXkgPSBLZXkudW5pcXVlKCkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogayA9PiBrID09PSBrZXkgPyBQcm9taXNlLnJlc29sdmUodmFsdWUpIDogUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKSxcbiAgICAgICAgICAgIHByZXY6IChrID0gS2V5LlNFTlRJTkVMKSA9PiBQcm9taXNlLnJlc29sdmUoayA9PT0gS2V5LlNFTlRJTkVMID8ga2V5IDogS2V5LlNFTlRJTkVMKSxcbiAgICAgICAgICAgIG5leHQ6IChrID0gS2V5LlNFTlRJTkVMKSA9PiBQcm9taXNlLnJlc29sdmUoayA9PT0gS2V5LlNFTlRJTkVMID8ga2V5IDogS2V5LlNFTlRJTkVMKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBTdGF0ZS51bml0ID0gdW5pdDtcbiAgICBmdW5jdGlvbiBlbnRyaWVzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IEtleS5TRU5USU5FTCwgZG9uZSA9IGZhbHNlLCBbZnJvbSwgdG9dID0gcmFuZ2U7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRvbmUgPSB0cnVlLCBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5kb25lKSk7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiAoY3VycmVudCA9IGtleSwgeyBkb25lOiBmYWxzZSwgdmFsdWU6IFtrZXksIHZhbHVlXSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIHRvLnByZXYgPT09IG5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KG5leHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgZnJvbS5wcmV2ID09PSB0by5wcmV2KVxuICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgZnJvbS5uZXh0ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pID8gZ2V0KGZyb20ucHJldikgOiBpdGVyYXRlKGZyb20ubmV4dCk7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHRvLm5leHQgPT09IGN1cnJlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUoY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBTdGF0ZS5lbnRyaWVzID0gZW50cmllcztcbiAgICBmdW5jdGlvbiBrZXlzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5tYXAoZW50cmllcyhzdGF0ZSwgcmFuZ2UpLCBFbnRyeS5rZXkpO1xuICAgIH1cbiAgICBTdGF0ZS5rZXlzID0ga2V5cztcbiAgICBmdW5jdGlvbiB2YWx1ZXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHN0YXRlLCByYW5nZSksIEVudHJ5LnZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUudmFsdWVzID0gdmFsdWVzO1xuICAgIGZ1bmN0aW9uIGZyb21FbnRyaWVzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IENhY2hlLmNyZWF0ZSgpLCBleGhhdXN0ZWQgPSBmYWxzZSwgY3VycmVudEtleSA9IEtleS5TRU5USU5FTCwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHZhciBjYWNoaW5nSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yLmNyZWF0ZSgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgZXhoYXVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWNoZS5wcmV2KEtleS5TRU5USU5FTCwgY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgY2FjaGUubmV4dChjdXJyZW50S2V5LCBLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgW2tleSwgdmFsdWVdID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgY2FjaGUucHJldihrZXksIGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgY2FjaGUubmV4dChjdXJyZW50S2V5LCBrZXkpO1xuICAgICAgICAgICAgY2FjaGUuZ2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgY3VycmVudEtleSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogW2tleSwgdmFsdWVdIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKTtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KS50aGVuKEVudHJ5LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5TRU5USU5FTCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCk7XG4gICAgICAgICAgICAgICAgeWllbGQgQXN5bmNJdGVyYXRvci5zb21lKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnByZXYoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IEtleS5TRU5USU5FTCA6IHJlc3VsdC52YWx1ZVswXSk7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbigoKSA9PiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IEtleS5TRU5USU5FTCA6IHJlc3VsdC52YWx1ZVswXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHsgZ2V0LCBwcmV2LCBuZXh0IH0sIGNhY2hlKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUVudHJpZXMgPSBmcm9tRW50cmllcztcbiAgICBmdW5jdGlvbiBmcm9tS2V5cyhpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5tYXAoaXRlcmF0b3IsIGtleSA9PiBba2V5LCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tS2V5cyA9IGZyb21LZXlzO1xuICAgIGZ1bmN0aW9uIGZyb21WYWx1ZXMoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihpdGVyYXRvciwgKHByZXYsIHZhbHVlKSA9PiBbcHJldlswXSArIDEsIHZhbHVlXSwgWy0xLCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tVmFsdWVzID0gZnJvbVZhbHVlcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmcm9tVmFsdWVzKEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbU9iamVjdCh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IuZnJvbU9iamVjdCh2YWx1ZXMpKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XG4gICAgZnVuY3Rpb24gbGF6eShmbikge1xuICAgICAgICB2YXIgc3RhdGUsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZSA6IHN0YXRlID0geWllbGQgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHN0YXRlLmdldChrZXkpIDogcXVldWUudGhlbihjcmVhdGVTdGF0ZSkudGhlbihzID0+IHMuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5wcmV2KGtleSkgOiBxdWV1ZS50aGVuKGNyZWF0ZVN0YXRlKS50aGVuKHMgPT4gcy5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5uZXh0KGtleSkgOiBxdWV1ZS50aGVuKGNyZWF0ZVN0YXRlKS50aGVuKHMgPT4gcy5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5sYXp5ID0gbGF6eTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IudG9PYmplY3QoZW50cmllcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9PYmplY3QgPSB0b09iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci50b0FycmF5KHZhbHVlcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9BcnJheSA9IHRvQXJyYXk7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXAiXX0=

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(4)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
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
	
	module.exports = __webpack_require__(7);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
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
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
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
	    var generator = Object.create((outerFn || Generator).prototype);
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
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
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
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
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
	        return new Promise(function(resolve, reject) {
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
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
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
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
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
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
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
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
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
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
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
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
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
	
	  runtime.keys = function(object) {
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
	        var i = -1, next = function next() {
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
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
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
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
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
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
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
	
	    delegateYield: function(iterable, resultName, nextLoc) {
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
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(10);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(61);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
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
	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(11), __esModule: true };

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	__webpack_require__(57);
	module.exports = __webpack_require__(59);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	var global        = __webpack_require__(24)
	  , hide          = __webpack_require__(27)
	  , Iterators     = __webpack_require__(16)
	  , TO_STRING_TAG = __webpack_require__(54)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(14)
	  , step             = __webpack_require__(15)
	  , Iterators        = __webpack_require__(16)
	  , toIObject        = __webpack_require__(17);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(21)(Array, 'Array', function(iterated, kind){
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
/* 14 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(18)
	  , defined = __webpack_require__(20);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(19);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(22)
	  , $export        = __webpack_require__(23)
	  , redefine       = __webpack_require__(37)
	  , hide           = __webpack_require__(27)
	  , has            = __webpack_require__(38)
	  , Iterators      = __webpack_require__(16)
	  , $iterCreate    = __webpack_require__(39)
	  , setToStringTag = __webpack_require__(53)
	  , getPrototypeOf = __webpack_require__(55)
	  , ITERATOR       = __webpack_require__(54)('iterator')
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
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
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
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(24)
	  , core      = __webpack_require__(4)
	  , ctx       = __webpack_require__(25)
	  , hide      = __webpack_require__(27)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 24 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(26);
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
/* 26 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(28)
	  , createDesc = __webpack_require__(36);
	module.exports = __webpack_require__(32) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(29)
	  , IE8_DOM_DEFINE = __webpack_require__(31)
	  , toPrimitive    = __webpack_require__(35)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(32) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(32) && !__webpack_require__(33)(function(){
	  return Object.defineProperty(__webpack_require__(34)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(33)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 33 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(30)
	  , document = __webpack_require__(24).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(30);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 36 */
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(27);

/***/ },
/* 38 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(40)
	  , descriptor     = __webpack_require__(36)
	  , setToStringTag = __webpack_require__(53)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(27)(IteratorPrototype, __webpack_require__(54)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(29)
	  , dPs         = __webpack_require__(41)
	  , enumBugKeys = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(48)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(34)('iframe')
	    , i      = enumBugKeys.length
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(52).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write('<script>document.F=Object</script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(28)
	  , anObject = __webpack_require__(29)
	  , getKeys  = __webpack_require__(42);
	
	module.exports = __webpack_require__(32) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(43)
	  , enumBugKeys = __webpack_require__(51);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(38)
	  , toIObject    = __webpack_require__(17)
	  , arrayIndexOf = __webpack_require__(44)(false)
	  , IE_PROTO     = __webpack_require__(48)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(17)
	  , toLength  = __webpack_require__(45)
	  , toIndex   = __webpack_require__(47);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(46)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
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

	var toInteger = __webpack_require__(46)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(49)('keys')
	  , uid    = __webpack_require__(50);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(24)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 50 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24).document && document.documentElement;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(28).f
	  , has = __webpack_require__(38)
	  , TAG = __webpack_require__(54)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(49)('wks')
	  , uid        = __webpack_require__(50)
	  , Symbol     = __webpack_require__(24).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(38)
	  , toObject    = __webpack_require__(56)
	  , IE_PROTO    = __webpack_require__(48)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(20);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(58)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(21)(String, 'String', function(iterated){
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
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(46)
	  , defined   = __webpack_require__(20);
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(60)
	  , ITERATOR  = __webpack_require__(54)('iterator')
	  , Iterators = __webpack_require__(16);
	module.exports = __webpack_require__(4).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(19)
	  , TAG = __webpack_require__(54)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(62), __esModule: true };

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(12);
	__webpack_require__(57);
	module.exports = __webpack_require__(63);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(29)
	  , get      = __webpack_require__(64);
	module.exports = __webpack_require__(4).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(60)
	  , ITERATOR  = __webpack_require__(54)('iterator')
	  , Iterators = __webpack_require__(16);
	module.exports = __webpack_require__(4).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(67);
	var $Object = __webpack_require__(4).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(23)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(40)});

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(70);
	__webpack_require__(57);
	__webpack_require__(12);
	__webpack_require__(71);
	module.exports = __webpack_require__(4).Promise;

/***/ },
/* 70 */
/***/ function(module, exports) {



/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(22)
	  , global             = __webpack_require__(24)
	  , ctx                = __webpack_require__(25)
	  , classof            = __webpack_require__(60)
	  , $export            = __webpack_require__(23)
	  , isObject           = __webpack_require__(30)
	  , anObject           = __webpack_require__(29)
	  , aFunction          = __webpack_require__(26)
	  , anInstance         = __webpack_require__(72)
	  , forOf              = __webpack_require__(73)
	  , setProto           = __webpack_require__(76).set
	  , speciesConstructor = __webpack_require__(79)
	  , task               = __webpack_require__(80).set
	  , microtask          = __webpack_require__(82)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(54)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
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
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(83)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(53)($Promise, PROMISE);
	__webpack_require__(84)(PROMISE);
	Wrapper = __webpack_require__(4)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(85)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
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
/* 72 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(25)
	  , call        = __webpack_require__(74)
	  , isArrayIter = __webpack_require__(75)
	  , anObject    = __webpack_require__(29)
	  , toLength    = __webpack_require__(45)
	  , getIterFn   = __webpack_require__(64)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(29);
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(16)
	  , ITERATOR   = __webpack_require__(54)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(30)
	  , anObject = __webpack_require__(29);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(25)(Function.call, __webpack_require__(77).f(Object.prototype, '__proto__').set, 2);
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(78)
	  , createDesc     = __webpack_require__(36)
	  , toIObject      = __webpack_require__(17)
	  , toPrimitive    = __webpack_require__(35)
	  , has            = __webpack_require__(38)
	  , IE8_DOM_DEFINE = __webpack_require__(31)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(32) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(29)
	  , aFunction = __webpack_require__(26)
	  , SPECIES   = __webpack_require__(54)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(25)
	  , invoke             = __webpack_require__(81)
	  , html               = __webpack_require__(52)
	  , cel                = __webpack_require__(34)
	  , global             = __webpack_require__(24)
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
	var listener = function(event){
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
	  if(__webpack_require__(19)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
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
/* 81 */
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(24)
	  , macrotask = __webpack_require__(80).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(19)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
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
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
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
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(27);
	module.exports = function(target, src, safe){
	  for(var key in src){
	    if(safe && target[key])target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(24)
	  , core        = __webpack_require__(4)
	  , dP          = __webpack_require__(28)
	  , DESCRIPTORS = __webpack_require__(32)
	  , SPECIES     = __webpack_require__(54)('species');
	
	module.exports = function(KEY){
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(54)('iterator')
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
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Key;
	(function (Key) {
	    var uniqueKey = 0;
	    Key.SENTINEL = null;
	    function unique() {
	        return "s_" + uniqueKey++;
	    }
	    Key.unique = unique;
	})(Key || (Key = {}));
	exports.default = Key;
	//# sourceMappingURL=key.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3Qva2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSSxHQUFKO0FBQ0EsQ0FBQyxVQUFVLEdBQVYsRUFBZTtBQUNaLFFBQUksWUFBWSxDQUFoQjtBQUNBLFFBQUksUUFBSixHQUFlLElBQWY7QUFDQSxhQUFTLE1BQVQsR0FBa0I7QUFDZCxlQUFPLE9BQU8sV0FBZDtBQUNIO0FBQ0QsUUFBSSxNQUFKLEdBQWEsTUFBYjtBQUNILENBUEQsRUFPRyxRQUFRLE1BQU0sRUFBZCxDQVBIO2tCQVFlLEciLCJmaWxlIjoia2V5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIHZhciB1bmlxdWVLZXkgPSAwO1xuICAgIEtleS5TRU5USU5FTCA9IG51bGw7XG4gICAgZnVuY3Rpb24gdW5pcXVlKCkge1xuICAgICAgICByZXR1cm4gXCJzX1wiICsgdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS51bmlxdWUgPSB1bmlxdWU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXkuanMubWFwIl19

/***/ },
/* 87 */
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvZW50cnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFJLGlDQUFKO0FBQ1AsQ0FBQyxVQUFVLEtBQVYsRUFBaUI7QUFDZCxhQUFTLEdBQVQsQ0FBYSxLQUFiLEVBQW9CO0FBQ2hCLGVBQU8sU0FBUyxNQUFNLENBQU4sQ0FBaEI7QUFDSDtBQUNELFVBQU0sR0FBTixHQUFZLEdBQVo7QUFDQSxhQUFTLEtBQVQsQ0FBZSxLQUFmLEVBQXNCO0FBQ2xCLGVBQU8sTUFBTSxDQUFOLENBQVA7QUFDSDtBQUNELFVBQU0sS0FBTixHQUFjLEtBQWQ7QUFDQSxhQUFTLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLEtBQW5CLEVBQTBCO0FBQ3RCLGVBQU8sTUFBTSxDQUFOLE1BQWEsTUFBTSxDQUFOLENBQWIsSUFBeUIsTUFBTSxDQUFOLE1BQWEsTUFBTSxDQUFOLENBQTdDO0FBQ0g7QUFDRCxVQUFNLEVBQU4sR0FBVyxFQUFYO0FBQ0gsQ0FiRCxFQWFHLGtCQWRRLEtBY1IsR0FBVSxRQUFRLEVBQWxCLENBYkg7a0JBY2UsSyIsImZpbGUiOiJlbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEVudHJ5O1xuKGZ1bmN0aW9uIChFbnRyeSkge1xuICAgIGZ1bmN0aW9uIGtleShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMF07XG4gICAgfVxuICAgIEVudHJ5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiB2YWx1ZShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnlbMV07XG4gICAgfVxuICAgIEVudHJ5LnZhbHVlID0gdmFsdWU7XG4gICAgZnVuY3Rpb24gaXMoZW50cnksIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBlbnRyeVswXSA9PT0gb3RoZXJbMF0gJiYgZW50cnlbMV0gPT09IG90aGVyWzFdO1xuICAgIH1cbiAgICBFbnRyeS5pcyA9IGlzO1xufSkoRW50cnkgfHwgKEVudHJ5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEVudHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW50cnkuanMubWFwIl19

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Position = exports.Range = undefined;
	
	var _slicedToArray2 = __webpack_require__(9);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _key = __webpack_require__(86);
	
	var _key2 = _interopRequireDefault(_key);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Range = exports.Range = undefined;
	(function (Range) {
	    Range.all = [{ next: _key2.default.SENTINEL }, { prev: _key2.default.SENTINEL }];
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcmFuZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBQ08sSUFBSSxpQ0FBSjtBQUNQLENBQUMsVUFBVSxLQUFWLEVBQWlCO0FBQ2QsVUFBTSxHQUFOLEdBQVksQ0FBQyxFQUFFLE1BQU0sY0FBSSxRQUFaLEVBQUQsRUFBeUIsRUFBRSxNQUFNLGNBQUksUUFBWixFQUF6QixDQUFaO0FBQ0EsYUFBUyxPQUFULE9BQTZCO0FBQUE7O0FBQUEsWUFBWCxJQUFXO0FBQUEsWUFBTCxFQUFLOztBQUN6QixlQUFPLENBQUMsU0FBUyxPQUFULENBQWlCLEVBQWpCLENBQUQsRUFBdUIsU0FBUyxPQUFULENBQWlCLElBQWpCLENBQXZCLENBQVA7QUFDSDtBQUNELFVBQU0sT0FBTixHQUFnQixPQUFoQjtBQUNILENBTkQsRUFNRyxrQkFQUSxLQU9SLEdBQVUsUUFBUSxFQUFsQixDQU5IO0FBT08sSUFBSSx1Q0FBSjtBQUNQLENBQUMsVUFBVSxRQUFWLEVBQW9CO0FBQ2pCLGFBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixlQUFPLFVBQVUsUUFBakI7QUFDSDtBQUNELGFBQVMsY0FBVCxHQUEwQixjQUExQjtBQUNBLGFBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixlQUFPLFVBQVUsUUFBakI7QUFDSDtBQUNELGFBQVMsY0FBVCxHQUEwQixjQUExQjtBQUNBLGFBQVMsT0FBVCxDQUFpQixRQUFqQixFQUEyQjtBQUN2QixlQUFPLFNBQVMsY0FBVCxDQUF3QixRQUF4QixJQUFvQyxFQUFFLE1BQU0sU0FBUyxJQUFqQixFQUFwQyxHQUE4RCxFQUFFLE1BQU0sU0FBUyxJQUFqQixFQUFyRTtBQUNIO0FBQ0QsYUFBUyxPQUFULEdBQW1CLE9BQW5CO0FBQ0gsQ0FiRCxFQWFHLHFCQWRRLFFBY1IsR0FBYSxXQUFXLEVBQXhCLENBYkg7a0JBY2UsSyIsImZpbGUiOiJyYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgUmFuZ2UuYWxsID0gW3sgbmV4dDogS2V5LlNFTlRJTkVMIH0sIHsgcHJldjogS2V5LlNFTlRJTkVMIH1dO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UoW2Zyb20sIHRvXSkge1xuICAgICAgICByZXR1cm4gW1Bvc2l0aW9uLnJldmVyc2UodG8pLCBQb3NpdGlvbi5yZXZlcnNlKGZyb20pXTtcbiAgICB9XG4gICAgUmFuZ2UucmV2ZXJzZSA9IHJldmVyc2U7XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuZXhwb3J0IHZhciBQb3NpdGlvbjtcbihmdW5jdGlvbiAoUG9zaXRpb24pIHtcbiAgICBmdW5jdGlvbiBpc1ByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ3ByZXYnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbiA9IGlzUHJldlBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIGlzTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAnbmV4dCcgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uID0gaXNOZXh0UG9zaXRpb247XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pID8geyBuZXh0OiBwb3NpdGlvbi5wcmV2IH0gOiB7IHByZXY6IHBvc2l0aW9uLm5leHQgfTtcbiAgICB9XG4gICAgUG9zaXRpb24ucmV2ZXJzZSA9IHJldmVyc2U7XG59KShQb3NpdGlvbiB8fCAoUG9zaXRpb24gPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5nZS5qcy5tYXAiXX0=

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cache = undefined;
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _create = __webpack_require__(65);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _exceptions = __webpack_require__(90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = _promise2.default))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var Cache = exports.Cache = undefined;
	(function (Cache) {
	    var NONE = {};
	    function create() {
	        var cache = {
	            get: (0, _create2.default)(null),
	            prev: (0, _create2.default)(null),
	            next: (0, _create2.default)(null)
	        };
	        function createCache(c) {
	            return function (t, u) {
	                var label = (0, _stringify2.default)(t);
	                if (arguments.length > 1) return c[label] = u;
	                if (label in c) return c[label];
	                throw new _exceptions.NotFound();
	            };
	        }
	        return {
	            get: createCache(cache.get),
	            prev: createCache(cache.prev),
	            next: createCache(cache.next)
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
	        function cacheFn(fn, cacher) {
	            var _this = this;
	
	            return function (t) {
	                return __awaiter(_this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	                    return _regenerator2.default.wrap(function _callee$(_context) {
	                        while (1) {
	                            switch (_context.prev = _context.next) {
	                                case 0:
	                                    _context.prev = 0;
	                                    return _context.abrupt('return', cacher(t));
	
	                                case 4:
	                                    _context.prev = 4;
	                                    _context.t0 = _context['catch'](0);
	
	                                    if (!(_context.t0 instanceof _exceptions.NotFound)) {
	                                        _context.next = 12;
	                                        break;
	                                    }
	
	                                    _context.t1 = t;
	                                    _context.next = 10;
	                                    return fn(t);
	
	                                case 10:
	                                    _context.t2 = _context.sent;
	                                    return _context.abrupt('return', cacher(_context.t1, _context.t2));
	
	                                case 12:
	                                    throw _context.t0;
	
	                                case 13:
	                                case 'end':
	                                    return _context.stop();
	                            }
	                        }
	                    }, _callee, this, [[0, 4]]);
	                }));
	            };
	        }
	        return {
	            get: cacheFn(state.get, cache.get),
	            prev: cacheFn(state.prev, cache.prev),
	            next: cacheFn(state.next, cache.next)
	        };
	    }
	    Cache.apply = apply;
	})(Cache || (exports.Cache = Cache = {}));
	exports.default = Cache;
	//# sourceMappingURL=cache.js.map
	//# sourceMappingURL=data:application/json;base64,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O0FBQUEsMENBS25DLDJDQUxtQztBQUFBO0FBQUE7QUFBQTs7QUFBQSxrREFNckIsQ0FOcUI7QUFBQTtBQUFBLDJDQU1aLEdBQUcsQ0FBSCxDQU5ZOztBQUFBO0FBQUE7QUFBQSxxRUFNNUIsTUFONEI7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBakMsRUFBUDtBQUFBLGFBQVA7QUFVSDtBQUNELGVBQU87QUFDSCxpQkFBSyxRQUFRLE1BQU0sR0FBZCxFQUFtQixNQUFNLEdBQXpCLENBREY7QUFFSCxrQkFBTSxRQUFRLE1BQU0sSUFBZCxFQUFvQixNQUFNLElBQTFCLENBRkg7QUFHSCxrQkFBTSxRQUFRLE1BQU0sSUFBZCxFQUFvQixNQUFNLElBQTFCO0FBSEgsU0FBUDtBQUtIO0FBQ0QsVUFBTSxLQUFOLEdBQWMsS0FBZDtBQUNILENBckRELEVBcURHLGtCQXREUSxLQXNEUixHQUFVLFFBQVEsRUFBbEIsQ0FyREg7a0JBc0RlLEsiLCJmaWxlIjoiY2FjaGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cykpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgTm90Rm91bmQgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuZXhwb3J0IHZhciBDYWNoZTtcbihmdW5jdGlvbiAoQ2FjaGUpIHtcbiAgICBjb25zdCBOT05FID0ge307XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBjYWNoZSA9IHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUNhY2hlKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodCwgdSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gSlNPTi5zdHJpbmdpZnkodCk7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY1tsYWJlbF0gPSB1O1xuICAgICAgICAgICAgICAgIGlmIChsYWJlbCBpbiBjKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY1tsYWJlbF07XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IGNyZWF0ZUNhY2hlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBjcmVhdGVDYWNoZShjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IGNyZWF0ZUNhY2hlKGNhY2hlLm5leHQpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBleHRlbmQoY2FjaGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShjYWNoZS5nZXQpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUoY2FjaGUubmV4dClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBjYWNoZSkge1xuICAgICAgICBmdW5jdGlvbiBjYWNoZUZuKGZuLCBjYWNoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAodCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVyKHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFzb24gaW5zdGFuY2VvZiBOb3RGb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXIodCwgeWllbGQgZm4odCkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZWFzb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogY2FjaGVGbihzdGF0ZS5nZXQsIGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBjYWNoZUZuKHN0YXRlLnByZXYsIGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogY2FjaGVGbihzdGF0ZS5uZXh0LCBjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5hcHBseSA9IGFwcGx5O1xufSkoQ2FjaGUgfHwgKENhY2hlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGUuanMubWFwIl19

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NotFound = undefined;
	
	var _classCallCheck2 = __webpack_require__(91);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NotFound = exports.NotFound = function NotFound() {
	  (0, _classCallCheck3.default)(this, NotFound);
	};
	
	;
	//# sourceMappingURL=exceptions.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvZXhjZXB0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQWEsUSxXQUFBLFE7Ozs7QUFFYiIsImZpbGUiOiJleGNlcHRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOb3RGb3VuZCB7XG59XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGNlcHRpb25zLmpzLm1hcCJdfQ==

/***/ },
/* 91 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsyncIterator = undefined;
	
	var _slicedToArray2 = __webpack_require__(9);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _keys = __webpack_require__(93);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _create = __webpack_require__(65);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _exceptions = __webpack_require__(90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = _promise2.default))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
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
	
	                            return _context.abrupt('return', false);
	
	                        case 10:
	                            _context.next = 0;
	                            break;
	
	                        case 12:
	                            return _context.abrupt('return', true);
	
	                        case 13:
	                        case 'end':
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
	                                return __awaiter(_this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
	                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
	                                        while (1) {
	                                            switch (_context2.prev = _context2.next) {
	                                                case 0:
	                                                    _context2.next = 2;
	                                                    return predicate(value);
	
	                                                case 2:
	                                                    return _context2.abrupt('return', !_context2.sent);
	
	                                                case 3:
	                                                case 'end':
	                                                    return _context2.stop();
	                                            }
	                                        }
	                                    }, _callee2, this);
	                                }));
	                            });
	
	                        case 2:
	                            return _context3.abrupt('return', !_context3.sent);
	
	                        case 3:
	                        case 'end':
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
	                                return __awaiter(_this2, void 0, void 0, _regenerator2.default.mark(function _callee4() {
	                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
	                                        while (1) {
	                                            switch (_context4.prev = _context4.next) {
	                                                case 0:
	                                                    _context4.next = 2;
	                                                    return fn(value);
	
	                                                case 2:
	                                                    return _context4.abrupt('return', true);
	
	                                                case 3:
	                                                case 'end':
	                                                    return _context4.stop();
	                                            }
	                                        }
	                                    }, _callee4, this);
	                                }));
	                            });
	
	                        case 2:
	                        case 'end':
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
	                                return __awaiter(_this3, void 0, void 0, _regenerator2.default.mark(function _callee6() {
	                                    return _regenerator2.default.wrap(function _callee6$(_context6) {
	                                        while (1) {
	                                            switch (_context6.prev = _context6.next) {
	                                                case 0:
	                                                    _context6.next = 2;
	                                                    return fn(memo, value);
	
	                                                case 2:
	                                                    memo = _context6.sent;
	
	                                                case 3:
	                                                case 'end':
	                                                    return _context6.stop();
	                                            }
	                                        }
	                                    }, _callee6, this);
	                                }));
	                            });
	
	                        case 2:
	                            return _context7.abrupt('return', memo);
	
	                        case 3:
	                        case 'end':
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
	                                return __awaiter(_this4, void 0, void 0, _regenerator2.default.mark(function _callee8() {
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
	                                                    return _context8.abrupt('return', _context8.t0);
	
	                                                case 8:
	                                                case 'end':
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
	
	                            return _context9.abrupt('return', result);
	
	                        case 6:
	                            throw new _exceptions.NotFound();
	
	                        case 7:
	                        case 'end':
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
	
	                            return _context10.abrupt('return', index);
	
	                        case 7:
	                            throw new _exceptions.NotFound();
	
	                        case 8:
	                        case 'end':
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
	    function size(iterator) {
	        var count = -1;
	        return forEach(iterator, function () {
	            count++;
	        }).then(function () {
	            return count;
	        });
	    }
	    AsyncIterator.size = size;
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
	                                return __awaiter(_this5, void 0, void 0, _regenerator2.default.mark(function _callee11() {
	                                    var result;
	                                    return _regenerator2.default.wrap(function _callee11$(_context11) {
	                                        while (1) {
	                                            switch (_context11.prev = _context11.next) {
	                                                case 0:
	                                                    _context11.next = 2;
	                                                    return other.next();
	
	                                                case 2:
	                                                    result = _context11.sent;
	                                                    return _context11.abrupt('return', !result.done && equals(value, result.value));
	
	                                                case 4:
	                                                case 'end':
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
	                            return _context12.abrupt('return', _context12.t0);
	
	                        case 8:
	                        case 'end':
	                            return _context12.stop();
	                    }
	                }
	            }, _callee12, this);
	        }));
	    }
	    AsyncIterator.is = is;
	    function map(iterator, mapFn) {
	        function next() {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee13() {
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
	                                return _context13.abrupt('return', _context13.t0);
	
	                            case 12:
	                            case 'end':
	                                return _context13.stop();
	                        }
	                    }
	                }, _callee13, this);
	            }));
	        }
	        return create(next);
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
	
	                                return _context14.abrupt('return', AsyncIterator.done);
	
	                            case 5:
	                                _context14.next = 7;
	                                return filterFn(result.value);
	
	                            case 7:
	                                if (!_context14.sent) {
	                                    _context14.next = 9;
	                                    break;
	                                }
	
	                                return _context14.abrupt('return', result);
	
	                            case 9:
	                                return _context14.abrupt('return', next());
	
	                            case 10:
	                            case 'end':
	                                return _context14.stop();
	                        }
	                    }
	                }, _callee14, this);
	            }));
	        }
	        return create(next);
	    }
	    AsyncIterator.filter = filter;
	    function scan(iterator, scanFn, memo) {
	        function next() {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee15() {
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
	
	                                return _context15.abrupt('return', AsyncIterator.done);
	
	                            case 5:
	                                _context15.next = 7;
	                                return scanFn(memo, result.value);
	
	                            case 7:
	                                memo = _context15.sent;
	                                return _context15.abrupt('return', { done: false, value: memo });
	
	                            case 9:
	                            case 'end':
	                                return _context15.stop();
	                        }
	                    }
	                }, _callee15, this);
	            }));
	        }
	        return create(next);
	    }
	    AsyncIterator.scan = scan;
	    function zip(iterator, other) {
	        var zipFn = arguments.length <= 2 || arguments[2] === undefined ? function (t, u) {
	            return [t, u];
	        } : arguments[2];
	
	        function next() {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee16() {
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
	
	                                return _context16.abrupt('return', AsyncIterator.done);
	
	                            case 5:
	                                _context16.next = 7;
	                                return other.next();
	
	                            case 7:
	                                otherResult = _context16.sent;
	
	                                if (!otherResult.done) {
	                                    _context16.next = 10;
	                                    break;
	                                }
	
	                                return _context16.abrupt('return', AsyncIterator.done);
	
	                            case 10:
	                                _context16.next = 12;
	                                return zipFn(result.value, otherResult.value);
	
	                            case 12:
	                                _context16.t0 = _context16.sent;
	                                return _context16.abrupt('return', {
	                                    done: false,
	                                    value: _context16.t0
	                                });
	
	                            case 14:
	                            case 'end':
	                                return _context16.stop();
	                        }
	                    }
	                }, _callee16, this);
	            }));
	        }
	        return create(next);
	    }
	    AsyncIterator.zip = zip;
	    function take(iterator, count) {
	        var i = 0;
	        function next() {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee17() {
	                return _regenerator2.default.wrap(function _callee17$(_context17) {
	                    while (1) {
	                        switch (_context17.prev = _context17.next) {
	                            case 0:
	                                return _context17.abrupt('return', ++i > count ? AsyncIterator.done : iterator.next());
	
	                            case 1:
	                            case 'end':
	                                return _context17.stop();
	                        }
	                    }
	                }, _callee17, this);
	            }));
	        }
	        return create(next);
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
	                                return _context18.abrupt('return', iterator.next());
	
	                            case 4:
	                            case 'end':
	                                return _context18.stop();
	                        }
	                    }
	                }, _callee18, this);
	            }));
	        }
	        return create(next);
	    }
	    AsyncIterator.skip = skip;
	    function unique(iterator, uniqueFn) {
	        var _this6 = this;
	
	        var cache = (0, _create2.default)(null);
	        return AsyncIterator.filter(iterator, function (value) {
	            return __awaiter(_this6, void 0, void 0, _regenerator2.default.mark(function _callee19() {
	                var u;
	                return _regenerator2.default.wrap(function _callee19$(_context19) {
	                    while (1) {
	                        switch (_context19.prev = _context19.next) {
	                            case 0:
	                                _context19.next = 2;
	                                return uniqueFn(value);
	
	                            case 2:
	                                _context19.t0 = _context19.sent;
	                                u = (0, _stringify2.default)(_context19.t0);
	                                return _context19.abrupt('return', !cache[u] || (cache[u] = true));
	
	                            case 5:
	                            case 'end':
	                                return _context19.stop();
	                        }
	                    }
	                }, _callee19, this);
	            }));
	        });
	    }
	    AsyncIterator.unique = unique;
	    function concat() {
	        for (var _len = arguments.length, iterators = Array(_len), _key = 0; _key < _len; _key++) {
	            iterators[_key] = arguments[_key];
	        }
	
	        return iterators.reduce(function (memo, iterator) {
	            var iterated = false,
	                queue = _promise2.default.resolve(null);
	            function next() {
	                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee20() {
	                    var result;
	                    return _regenerator2.default.wrap(function _callee20$(_context20) {
	                        while (1) {
	                            switch (_context20.prev = _context20.next) {
	                                case 0:
	                                    if (!iterated) {
	                                        _context20.next = 2;
	                                        break;
	                                    }
	
	                                    return _context20.abrupt('return', iterator.next());
	
	                                case 2:
	                                    _context20.next = 4;
	                                    return memo.next();
	
	                                case 4:
	                                    result = _context20.sent;
	
	                                    if (result.done) {
	                                        _context20.next = 7;
	                                        break;
	                                    }
	
	                                    return _context20.abrupt('return', result);
	
	                                case 7:
	                                    iterated = true;
	                                    return _context20.abrupt('return', iterator.next());
	
	                                case 9:
	                                case 'end':
	                                    return _context20.stop();
	                            }
	                        }
	                    }, _callee20, this);
	                }));
	            }
	            return create(next);
	        }, AsyncIterator.Empty);
	    }
	    AsyncIterator.concat = concat;
	    function fromArray(array) {
	        var current = -1,
	            queue = _promise2.default.resolve(null);
	        function next() {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee21() {
	                return _regenerator2.default.wrap(function _callee21$(_context21) {
	                    while (1) {
	                        switch (_context21.prev = _context21.next) {
	                            case 0:
	                                return _context21.abrupt('return', ++current >= array.length ? AsyncIterator.done : { done: false, value: array[current] });
	
	                            case 1:
	                            case 'end':
	                                return _context21.stop();
	                        }
	                    }
	                }, _callee21, this);
	            }));
	        }
	        return create(next);
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
	    function create(_next) {
	        var queue = _promise2.default.resolve(null);
	        return {
	            next: function next() {
	                return queue = queue.then(_next);
	            }
	        };
	    }
	    AsyncIterator.create = create;
	})(AsyncIterator || (exports.AsyncIterator = AsyncIterator = {}));
	exports.default = AsyncIterator;
	//# sourceMappingURL=async_iterator.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvYXN5bmNfaXRlcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBOzs7O0FBUkEsSUFBSSxZQUFhLGFBQVEsVUFBSyxTQUFkLElBQTRCLFVBQVUsT0FBVixFQUFtQixVQUFuQixFQUErQixDQUEvQixFQUFrQyxTQUFsQyxFQUE2QztBQUNyRixXQUFPLEtBQUssTUFBTSxxQkFBTixDQUFMLEVBQXlCLFVBQVUsT0FBVixFQUFtQixNQUFuQixFQUEyQjtBQUN2RCxpQkFBUyxTQUFULENBQW1CLEtBQW5CLEVBQTBCO0FBQUUsZ0JBQUk7QUFBRSxxQkFBSyxVQUFVLElBQVYsQ0FBZSxLQUFmLENBQUw7QUFBOEIsYUFBcEMsQ0FBcUMsT0FBTyxDQUFQLEVBQVU7QUFBRSx1QkFBTyxDQUFQO0FBQVk7QUFBRTtBQUMzRixpQkFBUyxRQUFULENBQWtCLEtBQWxCLEVBQXlCO0FBQUUsZ0JBQUk7QUFBRSxxQkFBSyxVQUFVLEtBQVYsQ0FBZ0IsS0FBaEIsQ0FBTDtBQUErQixhQUFyQyxDQUFzQyxPQUFPLENBQVAsRUFBVTtBQUFFLHVCQUFPLENBQVA7QUFBWTtBQUFFO0FBQzNGLGlCQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCO0FBQUUsbUJBQU8sSUFBUCxHQUFjLFFBQVEsT0FBTyxLQUFmLENBQWQsR0FBc0MsSUFBSSxDQUFKLENBQU0sVUFBVSxPQUFWLEVBQW1CO0FBQUUsd0JBQVEsT0FBTyxLQUFmO0FBQXdCLGFBQW5ELEVBQXFELElBQXJELENBQTBELFNBQTFELEVBQXFFLFFBQXJFLENBQXRDO0FBQXVIO0FBQy9JLGFBQUssQ0FBQyxZQUFZLFVBQVUsS0FBVixDQUFnQixPQUFoQixFQUF5QixVQUF6QixDQUFiLEVBQW1ELElBQW5ELEVBQUw7QUFDSCxLQUxNLENBQVA7QUFNSCxDQVBEO0FBU08sSUFBSSxpREFBSjtBQUNQLENBQUMsVUFBVSxhQUFWLEVBQXlCO0FBQ3RCLGtCQUFjLElB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QTRCO0FBQ3hCLGVBQU8sT0FBTyxRQUFQLEVBQWlCLFVBQUMsSUFBRDtBQUFBOztBQUFBLGdCQUFRLEdBQVI7QUFBQSxnQkFBYSxLQUFiO0FBQUEsbUJBQXlCLEtBQUssR0FBTCxJQUFZLEtBQVosRUFBbUIsSUFBNUM7QUFBQSxTQUFqQixFQUFvRSxzQkFBYyxJQUFkLENBQXBFLENBQVA7QUFDSDtBQUNELGtCQUFjLFFBQWQsR0FBeUIsUUFBekI7QUFDQSxhQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBc0I7QUFDbEIsWUFBSSxRQUFRLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBWjtBQUNBLGVBQU87QUFDSCxnQkFERyxrQkFDSTtBQUNILHVCQUFPLFFBQVEsTUFBTSxJQUFOLENBQVcsS0FBWCxDQUFmO0FBQ0g7QUFIRSxTQUFQO0FBS0g7QUFDRCxrQkFBYyxNQUFkLEdBQXVCLE1BQXZCO0FBQ0gsQ0FwTkQsRUFvTkcsMEJBck5RLGFBcU5SLEdBQWtCLGdCQUFnQixFQUFsQyxDQXBOSDtrQkFxTmUsYSIsImZpbGUiOiJhc3luY19pdGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgeyBOb3RGb3VuZCB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5leHBvcnQgdmFyIEFzeW5jSXRlcmF0b3I7XG4oZnVuY3Rpb24gKEFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0l0ZXJhdG9yLmRvbmUgPSB7IGRvbmU6IHRydWUgfTtcbiAgICBBc3luY0l0ZXJhdG9yLkVtcHR5ID0ge1xuICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5kb25lKVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXZlcnkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICB3aGlsZSAoKHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKSkgJiYgIXJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoeWllbGQgcHJlZGljYXRlKHJlc3VsdC52YWx1ZSkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZXZlcnkgPSBldmVyeTtcbiAgICBmdW5jdGlvbiBzb21lKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gISh5aWVsZCBldmVyeShpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiAhKHlpZWxkIHByZWRpY2F0ZSh2YWx1ZSkpOyB9KSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zb21lID0gc29tZTtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgeWllbGQgZm4odmFsdWUpOyByZXR1cm4gdHJ1ZTsgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiByZWR1Y2UoaXRlcmF0b3IsIGZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgZm9yRWFjaChpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IG1lbW8gPSB5aWVsZCBmbihtZW1vLCB2YWx1ZSk7IH0pKTtcbiAgICAgICAgICAgIHJldHVybiBtZW1vO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5yZWR1Y2UgPSByZWR1Y2U7XG4gICAgZnVuY3Rpb24gZmluZChpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIGlmICh5aWVsZCBzb21lKGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgcmV0dXJuICEoeWllbGQgcHJlZGljYXRlKHZhbHVlKSkgPyBmYWxzZSA6IChyZXN1bHQgPSB2YWx1ZSwgdHJ1ZSk7IH0pKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmQgPSBmaW5kO1xuICAgIGZ1bmN0aW9uIGluZGV4T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBpZiAoeWllbGQgc29tZShpdGVyYXRvciwgdiA9PiAoaW5kZXgrKywgdmFsdWUgPT0gdikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pbmRleE9mID0gaW5kZXhPZjtcbiAgICBmdW5jdGlvbiBhdChpdGVyYXRvciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZpbmQoaXRlcmF0b3IsICgpID0+IDAgPT09IGluZGV4LS0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmF0ID0gYXQ7XG4gICAgZnVuY3Rpb24gc2l6ZShpdGVyYXRvcikge1xuICAgICAgICB2YXIgY291bnQgPSAtMTtcbiAgICAgICAgcmV0dXJuIGZvckVhY2goaXRlcmF0b3IsICgpID0+IHsgY291bnQrKzsgfSkudGhlbigoKSA9PiBjb3VudCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc2l6ZSA9IHNpemU7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGlzKGl0ZXJhdG9yLCBvdGhlciwgZXF1YWxzID0gKGEsIGIpID0+IGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHlpZWxkIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgb3RoZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhcmVzdWx0LmRvbmUgJiYgZXF1YWxzKHZhbHVlLCByZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgfSkpKSAmJiAoeWllbGQgb3RoZXIubmV4dCgpKS5kb25lO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIG1hcChpdGVyYXRvciwgbWFwRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyBBc3luY0l0ZXJhdG9yLmRvbmUgOiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogeWllbGQgbWFwRm4ocmVzdWx0LnZhbHVlKSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKGl0ZXJhdG9yLCBmaWx0ZXJGbikge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICAgICAgaWYgKHlpZWxkIGZpbHRlckZuKHJlc3VsdC52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4oaXRlcmF0b3IsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICBtZW1vID0geWllbGQgc2NhbkZuKG1lbW8sIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBtZW1vIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHppcChpdGVyYXRvciwgb3RoZXIsIHppcEZuID0gKHQsIHUpID0+IFt0LCB1XSkge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICB2YXIgb3RoZXJSZXN1bHQgPSB5aWVsZCBvdGhlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyUmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiB5aWVsZCB6aXBGbihyZXN1bHQudmFsdWUsIG90aGVyUmVzdWx0LnZhbHVlKSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gdGFrZShpdGVyYXRvciwgY291bnQpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKytpID4gY291bnQgPyBBc3luY0l0ZXJhdG9yLmRvbmUgOiBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRha2UgPSB0YWtlO1xuICAgIGZ1bmN0aW9uIHNraXAoaXRlcmF0b3IsIGNvdW50KSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChpIDwgY291bnQpXG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHNvbWUoaXRlcmF0b3IsICgpID0+ICsraSA+PSBjb3VudCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc2tpcCA9IHNraXA7XG4gICAgZnVuY3Rpb24gdW5pcXVlKGl0ZXJhdG9yLCB1bmlxdWVGbikge1xuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maWx0ZXIoaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHUgPSBKU09OLnN0cmluZ2lmeSh5aWVsZCB1bmlxdWVGbih2YWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuICghY2FjaGVbdV0pIHx8IChjYWNoZVt1XSA9IHRydWUpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudW5pcXVlID0gdW5pcXVlO1xuICAgIGZ1bmN0aW9uIGNvbmNhdCguLi5pdGVyYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9ycy5yZWR1Y2UoKG1lbW8sIGl0ZXJhdG9yKSA9PiB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0ZWQgPSBmYWxzZSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBtZW1vLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgICAgIH0sIEFzeW5jSXRlcmF0b3IuRW1wdHkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSAtMSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiArK2N1cnJlbnQgPj0gYXJyYXkubGVuZ3RoID8gQXN5bmNJdGVyYXRvci5kb25lIDogeyBkb25lOiBmYWxzZSwgdmFsdWU6IGFycmF5W2N1cnJlbnRdIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICByZXR1cm4gZnJvbUFycmF5KE9iamVjdC5rZXlzKG9iamVjdCkubWFwKGtleSA9PiBba2V5LCBvYmplY3Rba2V5XV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSkgPT4gKG1lbW8ucHVzaCh2YWx1ZSksIG1lbW8pLCBbXSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3QoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIFtrZXksIHZhbHVlXSkgPT4gKG1lbW9ba2V5XSA9IHZhbHVlLCBtZW1vKSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9PYmplY3QgPSB0b09iamVjdDtcbiAgICBmdW5jdGlvbiBjcmVhdGUobmV4dCkge1xuICAgICAgICB2YXIgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBxdWV1ZSA9IHF1ZXVlLnRoZW4obmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY3JlYXRlID0gY3JlYXRlO1xufSkoQXN5bmNJdGVyYXRvciB8fCAoQXN5bmNJdGVyYXRvciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBBc3luY0l0ZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXN5bmNfaXRlcmF0b3IuanMubWFwIl19

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(94), __esModule: true };

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	module.exports = __webpack_require__(4).Object.keys;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(56)
	  , $keys    = __webpack_require__(42);
	
	__webpack_require__(96)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(23)
	  , core    = __webpack_require__(4)
	  , fails   = __webpack_require__(33);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tree = exports.Path = undefined;
	
	var _key = __webpack_require__(86);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Path = exports.Path = undefined;
	(function (Path) {
	    function head(path) {
	        return path ? path[0] : _key2.default.SENTINEL;
	    }
	    Path.head = head;
	    function tail(path) {
	        return path ? path[1] : _key2.default.SENTINEL;
	    }
	    Path.tail = tail;
	})(Path || (exports.Path = Path = {}));
	var Tree = exports.Tree = undefined;
	(function (Tree) {
	    function get(tree, path) {
	        var head = Path.head(path),
	            tail = Path.tail(path);
	        return tree.get(head).then(function (state) {
	            return state.get(tail);
	        });
	    }
	    Tree.get = get;
	    function prev(tree, path) {
	        var head = Path.head(path),
	            tail = Path.tail(path),
	            prevs = _state2.default.filter(_state2.default.map(tree, function (state) {
	            return state.prev();
	        }), function (first) {
	            return first !== _key2.default.SENTINEL;
	        }),
	            paths = _state2.default.map(prevs, function (first, key) {
	            return [key, first];
	        });
	        if (head === _key2.default.SENTINEL) return paths.prev().then(function (prev) {
	            return prev !== _key2.default.SENTINEL ? paths.get(prev) : _key2.default.SENTINEL;
	        });
	        return tree.get(head).then(function (state) {
	            return state.prev(tail);
	        }).then(function (prev) {
	            return prev !== _key2.default.SENTINEL ? [head, prev] : paths.prev(head).then(function (prev) {
	                return prev !== _key2.default.SENTINEL ? paths.get(prev) : _key2.default.SENTINEL;
	            });
	        });
	    }
	    Tree.prev = prev;
	    function next(tree, path) {
	        var head = Path.head(path),
	            tail = Path.tail(path),
	            nexts = _state2.default.filter(_state2.default.map(tree, function (state) {
	            return state.next();
	        }), function (first) {
	            return first !== _key2.default.SENTINEL;
	        }),
	            paths = _state2.default.map(nexts, function (first, key) {
	            return [key, first];
	        });
	        if (head === _key2.default.SENTINEL) return paths.next().then(function (next) {
	            return next !== _key2.default.SENTINEL ? paths.get(next) : _key2.default.SENTINEL;
	        });
	        return tree.get(head).then(function (state) {
	            return state.next(tail);
	        }).then(function (next) {
	            return next !== _key2.default.SENTINEL ? [head, next] : paths.next(head).then(function (next) {
	                return next !== _key2.default.SENTINEL ? paths.get(next) : _key2.default.SENTINEL;
	            });
	        });
	    }
	    Tree.next = next;
	})(Tree || (exports.Tree = Tree = {}));
	exports.default = Tree;
	//# sourceMappingURL=tree.js.map
	//# sourceMappingURL=data:application/json;base64,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U0FBaEIsQ0FBYixFQUFxRDtBQUFBLG1CQUFTLFVBQVUsY0FBSSxRQUF2QjtBQUFBLFNBQXJELENBQTVEO0FBQUEsWUFBbUosUUFBUSxnQkFBTSxHQUFOLENBQVUsS0FBVixFQUFpQixVQUFDLEtBQUQsRUFBUSxHQUFSO0FBQUEsbUJBQWdCLENBQUMsR0FBRCxFQUFNLEtBQU4sQ0FBaEI7QUFBQSxTQUFqQixDQUEzSjtBQUNBLFlBQUksU0FBUyxjQUFJLFFBQWpCLEVBQ0ksT0FBTyxNQUFNLElBQU4sR0FBYSxJQUFiLENBQWtCO0FBQUEsbUJBQVEsU0FBUyxjQUFJLFFBQWIsR0FBd0IsTUFBTSxHQUFOLENBQVUsSUFBVixDQUF4QixHQUEwQyxjQUFJLFFBQXREO0FBQUEsU0FBbEIsQ0FBUDtBQUNKLGVBQU8sS0FBSyxHQUFMLENBQVMsSUFBVCxFQUNGLElBREUsQ0FDRztBQUFBLG1CQUFTLE1BQU0sSUFBTixDQUFXLElBQVgsQ0FBVDtBQUFBLFNBREgsRUFFRixJQUZFLENBRUc7QUFBQSxtQkFBUSxTQUFTLGNBQUksUUFBYixHQUF3QixDQUFDLElBQUQsRUFBTyxJQUFQLENBQXhCLEdBQXVDLE1BQU0sSUFBTixDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FBc0I7QUFBQSx1QkFBUSxTQUFTLGNBQUksUUFBYixHQUF3QixNQUFNLEdBQU4sQ0FBVSxJQUFWLENBQXhCLEdBQTBDLGNBQUksUUFBdEQ7QUFBQSxhQUF0QixDQUEvQztBQUFBLFNBRkgsQ0FBUDtBQUdIO0FBQ0QsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNILENBeEJELEVBd0JHLGlCQXpCUSxJQXlCUixHQUFTLE9BQU8sRUFBaEIsQ0F4Qkg7a0JBeUJlLEkiLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCB2YXIgUGF0aDtcbihmdW5jdGlvbiAoUGF0aCkge1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBLZXkuU0VOVElORUw7XG4gICAgfVxuICAgIFBhdGguaGVhZCA9IGhlYWQ7XG4gICAgZnVuY3Rpb24gdGFpbChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID8gcGF0aFsxXSA6IEtleS5TRU5USU5FTDtcbiAgICB9XG4gICAgUGF0aC50YWlsID0gdGFpbDtcbn0pKFBhdGggfHwgKFBhdGggPSB7fSkpO1xuZXhwb3J0IHZhciBUcmVlO1xuKGZ1bmN0aW9uIChUcmVlKSB7XG4gICAgZnVuY3Rpb24gZ2V0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKS50aGVuKHN0YXRlID0+IHN0YXRlLmdldCh0YWlsKSk7XG4gICAgfVxuICAgIFRyZWUuZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHByZXYodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKSwgcHJldnMgPSBTdGF0ZS5maWx0ZXIoU3RhdGUubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLnByZXYoKSksIGZpcnN0ID0+IGZpcnN0ICE9PSBLZXkuU0VOVElORUwpLCBwYXRocyA9IFN0YXRlLm1hcChwcmV2cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMucHJldigpLnRoZW4ocHJldiA9PiBwcmV2ICE9PSBLZXkuU0VOVElORUwgPyBwYXRocy5nZXQocHJldikgOiBLZXkuU0VOVElORUwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT09IEtleS5TRU5USU5FTCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT09IEtleS5TRU5USU5FTCA/IHBhdGhzLmdldChwcmV2KSA6IEtleS5TRU5USU5FTCkpO1xuICAgIH1cbiAgICBUcmVlLnByZXYgPSBwcmV2O1xuICAgIGZ1bmN0aW9uIG5leHQodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKSwgbmV4dHMgPSBTdGF0ZS5maWx0ZXIoU3RhdGUubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLm5leHQoKSksIGZpcnN0ID0+IGZpcnN0ICE9PSBLZXkuU0VOVElORUwpLCBwYXRocyA9IFN0YXRlLm1hcChuZXh0cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ICE9PSBLZXkuU0VOVElORUwgPyBwYXRocy5nZXQobmV4dCkgOiBLZXkuU0VOVElORUwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT09IEtleS5TRU5USU5FTCA/IFtoZWFkLCBuZXh0XSA6IHBhdGhzLm5leHQoaGVhZCkudGhlbihuZXh0ID0+IG5leHQgIT09IEtleS5TRU5USU5FTCA/IHBhdGhzLmdldChuZXh0KSA6IEtleS5TRU5USU5FTCkpO1xuICAgIH1cbiAgICBUcmVlLm5leHQgPSBuZXh0O1xufSkoVHJlZSB8fCAoVHJlZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBUcmVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZS5qcy5tYXAiXX0=

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(9);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(86);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _patch = __webpack_require__(99);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _range = __webpack_require__(88);
	
	var _tree = __webpack_require__(97);
	
	var _observable = __webpack_require__(100);
	
	var _async_iterator = __webpack_require__(92);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _exceptions = __webpack_require__(90);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = _promise2.default))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	};
	var Store = exports.Store = undefined;
	(function (Store) {
	    function reverse(parent) {
	        function getState() {
	            return _state2.default.reverse(parent.state);
	        }
	        var dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: _range.Range.reverse(patch.range),
	                added: patch.added ? _state2.default.reverse(patch.added) : undefined
	            };
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.reverse = reverse;
	    function map(parent, mapFn) {
	        function getState() {
	            return _state2.default.map(parent.state, mapFn);
	        }
	        var dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: patch.range,
	                added: patch.added ? _state2.default.map(patch.added, mapFn) : undefined
	            };
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.map = map;
	    function filter(parent, filterFn) {
	        var _this = this;
	
	        var parentState = parent.state;
	        function getState() {
	            return _state2.default.filter(parent.state, filterFn);
	        }
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
	                                return _context.abrupt('return', key);
	
	                            case 9:
	                                _context.prev = 9;
	                                _context.t0 = _context['catch'](0);
	
	                                if (!(_context.t0 instanceof _exceptions.NotFound)) {
	                                    _context.next = 13;
	                                    break;
	                                }
	
	                                return _context.abrupt('return', _key2.default.SENTINEL);
	
	                            case 13:
	                                throw _context.t0;
	
	                            case 14:
	                            case 'end':
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
	                                return _context2.abrupt('return', {
	                                    next: _context2.t0
	                                });
	
	                            case 9:
	                                if (!(position.next === _key2.default.SENTINEL)) {
	                                    _context2.next = 11;
	                                    break;
	                                }
	
	                                return _context2.abrupt('return', { next: _key2.default.SENTINEL });
	
	                            case 11:
	                                _context2.next = 13;
	                                return find(state, [position, { next: _key2.default.SENTINEL }]);
	
	                            case 13:
	                                _context2.t1 = _context2.sent;
	                                return _context2.abrupt('return', {
	                                    prev: _context2.t1
	                                });
	
	                            case 15:
	                            case 'end':
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	        var dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
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
	                                return _context3.abrupt('return', {
	                                    range: range,
	                                    added: patch.added ? _state2.default.filter(patch.added, filterFn) : undefined
	                                });
	
	                            case 5:
	                            case 'end':
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.filter = filter;
	    function zoom(parent, key) {
	        var parentState = parent.state;
	        function getState() {
	            return _state2.default.zoom(parent.state, key);
	        }
	        var dispatcher = _observable.Observable.map(_observable.Observable.filter(parent.dispatcher, function (patch) {
	            return _state2.default.has(_state2.default.slice(parentState, patch.range), key);
	        }), function (patch) {
	            parentState = parent.state;
	            return {
	                range: _range.Range.all,
	                added: patch.added ? _state2.default.zoom(patch.added, key) : undefined
	            };
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.zoom = zoom;
	    function flatten(parent) {
	        var dispatcher_ = _observable.Subject.create();
	        var parent_ = cache(map(parent, function (store, key) {
	            _observable.Observable.map(store.dispatcher, function (patch) {
	                var from = patch.range[0],
	                    to = patch.range[1];
	                function mapPrevPosition(position) {
	                    if (position.prev === _key2.default.SENTINEL) return store.state.prev(_key2.default.SENTINEL).then(function (next) {
	                        return { next: [key, next] };
	                    });
	                    return _promise2.default.resolve({ prev: [key, position.prev] });
	                }
	                function mapNextPosition(position) {
	                    if (position.next === _key2.default.SENTINEL) return store.state.next(_key2.default.SENTINEL).then(function (prev) {
	                        return { prev: [key, prev] };
	                    });
	                    return _promise2.default.resolve({ next: [key, position.next] });
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
	                return position.prev === _key2.default.SENTINEL ? _promise2.default.resolve({ prev: _key2.default.SENTINEL }) : _tree.Tree.next(parent_.state, [position.prev, null]).then(function (prev) {
	                    return { prev: prev };
	                });
	            }
	            function mapNextPosition(position) {
	                return position.next === _key2.default.SENTINEL ? _promise2.default.resolve({ next: _key2.default.SENTINEL }) : _tree.Tree.prev(parent_.state, [position.next, null]).then(function (next) {
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
	        function getState() {
	            return _state2.default.flatten(parent_.state);
	        }
	        return create(getState(), dispatcher_, getState);
	    }
	    Store.flatten = flatten;
	    function flatMap(parent, mapFn) {
	        return Store.flatten(Store.map(parent, mapFn));
	    }
	    Store.flatMap = flatMap;
	    function keyBy(parent, keyFn, reverseKeyFn) {
	        var _this2 = this;
	
	        var state = _state2.default.keyBy(parent.state, keyFn, reverseKeyFn),
	            parentState = parent.state,
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this2, void 0, void 0, _regenerator2.default.mark(function _callee5() {
	                var _patch$range, from, to, mapPosition, range;
	
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                mapPosition = function mapPosition(position) {
	                                    return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
	                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
	                                            while (1) {
	                                                switch (_context4.prev = _context4.next) {
	                                                    case 0:
	                                                        if (!_range.Position.isPrevPosition(position)) {
	                                                            _context4.next = 13;
	                                                            break;
	                                                        }
	
	                                                        if (!(position.prev === _key2.default.SENTINEL)) {
	                                                            _context4.next = 3;
	                                                            break;
	                                                        }
	
	                                                        return _context4.abrupt('return', { prev: _key2.default.SENTINEL });
	
	                                                    case 3:
	                                                        _context4.next = 5;
	                                                        return parentState.get(position.prev);
	
	                                                    case 5:
	                                                        _context4.t0 = _context4.sent;
	                                                        _context4.t1 = position.prev;
	                                                        _context4.next = 9;
	                                                        return keyFn(_context4.t0, _context4.t1);
	
	                                                    case 9:
	                                                        _context4.t2 = _context4.sent;
	                                                        return _context4.abrupt('return', {
	                                                            prev: _context4.t2
	                                                        });
	
	                                                    case 13:
	                                                        if (!(position.next === _key2.default.SENTINEL)) {
	                                                            _context4.next = 15;
	                                                            break;
	                                                        }
	
	                                                        return _context4.abrupt('return', { next: _key2.default.SENTINEL });
	
	                                                    case 15:
	                                                        _context4.next = 17;
	                                                        return parentState.get(position.next);
	
	                                                    case 17:
	                                                        _context4.t3 = _context4.sent;
	                                                        _context4.t4 = position.next;
	                                                        _context4.next = 21;
	                                                        return keyFn(_context4.t3, _context4.t4);
	
	                                                    case 21:
	                                                        _context4.t5 = _context4.sent;
	                                                        return _context4.abrupt('return', {
	                                                            next: _context4.t5
	                                                        });
	
	                                                    case 23:
	                                                    case 'end':
	                                                        return _context4.stop();
	                                                }
	                                            }
	                                        }, _callee4, this);
	                                    }));
	                                };
	
	                                _patch$range = (0, _slicedToArray3.default)(patch.range, 2);
	                                from = _patch$range[0];
	                                to = _patch$range[1];
	                                _context5.next = 6;
	                                return _promise2.default.all([mapPosition(from), mapPosition(to)]);
	
	                            case 6:
	                                range = _context5.sent;
	
	                                parentState = parent.state;
	                                return _context5.abrupt('return', { range: range, added: patch.added ? _state2.default.keyBy(patch.added, keyFn) : undefined });
	
	                            case 9:
	                            case 'end':
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, this);
	            }));
	        });
	        return create(state, dispatcher);
	    }
	    Store.keyBy = keyBy;
	    function scan(parent, scanFn, memo) {
	        var _this3 = this;
	
	        function getState() {
	            return _state2.default.scan(parent.state, scanFn, memo);
	        }
	        var store,
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this3, void 0, void 0, _regenerator2.default.mark(function _callee7() {
	                var _this4 = this;
	
	                var parentState, storeState, _patch$range2, from, to, added;
	
	                return _regenerator2.default.wrap(function _callee7$(_context7) {
	                    while (1) {
	                        switch (_context7.prev = _context7.next) {
	                            case 0:
	                                parentState = parent.state;
	                                storeState = store.state;
	                                _patch$range2 = (0, _slicedToArray3.default)(patch.range, 2);
	                                from = _patch$range2[0];
	                                to = _patch$range2[1];
	                                added = _state2.default.lazy(function () {
	                                    return __awaiter(_this4, void 0, void 0, _regenerator2.default.mark(function _callee6() {
	                                        var last;
	                                        return _regenerator2.default.wrap(function _callee6$(_context6) {
	                                            while (1) {
	                                                switch (_context6.prev = _context6.next) {
	                                                    case 0:
	                                                        _context6.next = 2;
	                                                        return _state2.default.last(storeState, [{ next: null }, from]);
	
	                                                    case 2:
	                                                        last = _context6.sent;
	                                                        _context6.t0 = _state2.default;
	                                                        _context6.t1 = _state2.default.slice(parentState, [{ next: last }, { prev: null }]);
	                                                        _context6.t2 = scanFn;
	
	                                                        if (!(last !== _key2.default.SENTINEL)) {
	                                                            _context6.next = 12;
	                                                            break;
	                                                        }
	
	                                                        _context6.next = 9;
	                                                        return storeState.get(last);
	
	                                                    case 9:
	                                                        _context6.t3 = _context6.sent;
	                                                        _context6.next = 13;
	                                                        break;
	
	                                                    case 12:
	                                                        _context6.t3 = memo;
	
	                                                    case 13:
	                                                        _context6.t4 = _context6.t3;
	                                                        return _context6.abrupt('return', _context6.t0.scan.call(_context6.t0, _context6.t1, _context6.t2, _context6.t4));
	
	                                                    case 15:
	                                                    case 'end':
	                                                        return _context6.stop();
	                                                }
	                                            }
	                                        }, _callee6, this);
	                                    }));
	                                });
	                                return _context7.abrupt('return', { range: [from, { prev: null }], added: added });
	
	                            case 7:
	                            case 'end':
	                                return _context7.stop();
	                        }
	                    }
	                }, _callee7, this);
	            }));
	        });
	        return store = create(getState(), dispatcher);
	    }
	    Store.scan = scan;
	    function take(parent, count) {
	        var _this5 = this;
	
	        var store,
	            state = _state2.default.take(parent.state, count);
	        var indexed = Store.scan(parent, function (_ref5, value) {
	            var _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
	
	            var index = _ref6[0];
	            return [index + 1, value];
	        }, [-1, null]);
	        var dispatcher = _observable.Observable.map(indexed.dispatcher, function (patch) {
	            return __awaiter(_this5, void 0, void 0, _regenerator2.default.mark(function _callee8() {
	                var _patch$range3, from, parentState, indexedState, key, index;
	
	                return _regenerator2.default.wrap(function _callee8$(_context8) {
	                    while (1) {
	                        switch (_context8.prev = _context8.next) {
	                            case 0:
	                                _patch$range3 = (0, _slicedToArray3.default)(patch.range, 1);
	                                from = _patch$range3[0];
	                                parentState = parent.state;
	                                indexedState = indexed.state;
	                                _context8.next = 6;
	                                return _state2.default.last(indexedState, [{ next: null }, from]);
	
	                            case 6:
	                                key = _context8.sent;
	
	                                if (!(key === _key2.default.SENTINEL)) {
	                                    _context8.next = 11;
	                                    break;
	                                }
	
	                                _context8.t0 = -1;
	                                _context8.next = 14;
	                                break;
	
	                            case 11:
	                                _context8.next = 13;
	                                return indexedState.get(key);
	
	                            case 13:
	                                _context8.t0 = _context8.sent[0];
	
	                            case 14:
	                                index = _context8.t0;
	                                return _context8.abrupt('return', {
	                                    range: patch.range,
	                                    added: _state2.default.take(_state2.default.map(patch.added, function (_ref7) {
	                                        var _ref8 = (0, _slicedToArray3.default)(_ref7, 2);
	
	                                        var index = _ref8[0];
	                                        var value = _ref8[1];
	                                        return value;
	                                    }), count - (index + 1))
	                                });
	
	                            case 16:
	                            case 'end':
	                                return _context8.stop();
	                        }
	                    }
	                }, _callee8, this);
	            }));
	        });
	        return create(state, dispatcher);
	    }
	    Store.take = take;
	    function cache(parent) {
	        return Store.create(_state2.default.cache(parent.state), parent.dispatcher, function (state, patch) {
	            return _state2.default.cache(_patch2.default.apply(state, patch));
	        });
	    }
	    Store.cache = cache;
	    function states(store) {
	        return _observable.Observable.map(store.dispatcher, function () {
	            return store.state;
	        });
	    }
	    Store.states = states;
	    function create(state, dispatcher) {
	        var _this6 = this;
	
	        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _patch2.default.apply : arguments[2];
	
	        var subject = _observable.Subject.create();
	        dispatcher.subscribe({
	            onNext: function onNext(patch) {
	                return __awaiter(_this6, void 0, void 0, _regenerator2.default.mark(function _callee9() {
	                    return _regenerator2.default.wrap(function _callee9$(_context9) {
	                        while (1) {
	                            switch (_context9.prev = _context9.next) {
	                                case 0:
	                                    _context9.next = 2;
	                                    return reducer(store.state, patch);
	
	                                case 2:
	                                    store.state = _context9.sent;
	                                    return _context9.abrupt('return', subject.onNext(patch));
	
	                                case 4:
	                                case 'end':
	                                    return _context9.stop();
	                            }
	                        }
	                    }, _callee9, this);
	                }));
	            }
	        });
	        var store = {
	            state: state,
	            dispatcher: {
	                subscribe: subject.subscribe,
	                onNext: _observable.Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined
	            }
	        };
	        return store;
	    }
	    Store.create = create;
	})(Store || (exports.Store = Store = {}));
	exports.default = Store;
	//# sourceMappingURL=store.js.map
	//# sourceMappingURL=data:application/json;base64,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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaEMsRUFBWDtBQUFBO0FBRFMsU0FBckI7QUFNQSxZQUFNLFFBQVE7QUFDVix3QkFEVTtBQUVWLHdCQUFZO0FBQ1IsMkJBQVcsUUFBUSxTQURYO0FBRVIsd0JBQVEsb0JBQVEsU0FBUixDQUFrQixVQUFsQixJQUFnQyxXQUFXLE1BQTNDLEdBQW9EO0FBRnBEO0FBRkYsU0FBZDtBQU9BLGVBQU8sS0FBUDtBQUNIO0FBQ0QsVUFBTSxNQUFOLEdBQWUsTUFBZjtBQUNILENBck5ELEVBcU5HLGtCQXROUSxLQXNOUixHQUFVLFFBQVEsRUFBbEIsQ0FyTkg7a0JBc05lLEsiLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cykpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBSYW5nZSwgUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7IFRyZWUgfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IE5vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb25zJztcbmV4cG9ydCB2YXIgU3RvcmU7XG4oZnVuY3Rpb24gKFN0b3JlKSB7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGUucmV2ZXJzZShwYXJlbnQuc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4gKHtcbiAgICAgICAgICAgIHJhbmdlOiBSYW5nZS5yZXZlcnNlKHBhdGNoLnJhbmdlKSxcbiAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLnJldmVyc2UocGF0Y2guYWRkZWQpIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyLCBnZXRTdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLnJldmVyc2UgPSByZXZlcnNlO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIG1hcEZuKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LmRpc3BhdGNoZXIsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIG1hcEZuKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoZ2V0U3RhdGUoKSwgZGlzcGF0Y2hlciwgZ2V0U3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcbiAgICAgICAgdmFyIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZmluZChzdGF0ZSwgcmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBba2V5XSA9IHlpZWxkIEFzeW5jSXRlcmF0b3IuZmluZChTdGF0ZS5lbnRyaWVzKHN0YXRlLCByYW5nZSksIChba2V5LCB2YWx1ZV0pID0+IGZpbHRlckZuKHZhbHVlLCBrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIE5vdEZvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEtleS5TRU5USU5FTDtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbW92ZShzdGF0ZSwgcmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciBkZWxldGVkID0gU3RhdGUuc2xpY2UoU3RhdGUucmV2ZXJzZShzdGF0ZSksIFJhbmdlLnJldmVyc2UocmFuZ2UpKSwgcG9zaXRpb24gPSByYW5nZVsxXTtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHlpZWxkIFN0YXRlLmVtcHR5KGRlbGV0ZWQpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IHlpZWxkIGZpbmQoZGVsZXRlZCwgUmFuZ2UuYWxsKSB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmV4dDogS2V5LlNFTlRJTkVMIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHByZXY6IHlpZWxkIGZpbmQoc3RhdGUsIFtwb3NpdGlvbiwgeyBuZXh0OiBLZXkuU0VOVElORUwgfV0pIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IE9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCAocGF0Y2gpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9ICh5aWVsZCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgbW92ZShTdGF0ZS5yZXZlcnNlKHBhcmVudFN0YXRlKSwgUmFuZ2UucmV2ZXJzZShwYXRjaC5yYW5nZSkpLnRoZW4oUG9zaXRpb24ucmV2ZXJzZSksXG4gICAgICAgICAgICAgICAgbW92ZShwYXJlbnRTdGF0ZSwgcGF0Y2gucmFuZ2UpXG4gICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLmZpbHRlcihwYXRjaC5hZGRlZCwgZmlsdGVyRm4pIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoZ2V0U3RhdGUoKSwgZGlzcGF0Y2hlciwgZ2V0U3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0YXRlLnpvb20ocGFyZW50LnN0YXRlLCBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChPYnNlcnZhYmxlLmZpbHRlcihwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4gU3RhdGUuaGFzKFN0YXRlLnNsaWNlKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSksIGtleSkpLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IFJhbmdlLmFsbCxcbiAgICAgICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS56b29tKHBhdGNoLmFkZGVkLCBrZXkpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyLCBnZXRTdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBkaXNwYXRjaGVyXyA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIHZhciBwYXJlbnRfID0gY2FjaGUobWFwKHBhcmVudCwgKHN0b3JlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIE9ic2VydmFibGUubWFwKHN0b3JlLmRpc3BhdGNoZXIsIHBhdGNoID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ucHJldiA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlLnByZXYoS2V5LlNFTlRJTkVMKS50aGVuKG5leHQgPT4gKHsgbmV4dDogW2tleSwgbmV4dF0gfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogW2tleSwgcG9zaXRpb24ucHJldl0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcE5leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlLm5leHQoS2V5LlNFTlRJTkVMKS50aGVuKHByZXYgPT4gKHsgcHJldjogW2tleSwgcHJldl0gfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogW2tleSwgcG9zaXRpb24ubmV4dF0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHBhdGNoLmFkZGVkIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShkaXNwYXRjaGVyXyk7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmUuc3RhdGU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LmRpc3BhdGNoZXIsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ucHJldiA9PT0gS2V5LlNFTlRJTkVMID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogS2V5LlNFTlRJTkVMIH0pIDogVHJlZS5uZXh0KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5wcmV2LCBudWxsXSkudGhlbihwcmV2ID0+ICh7IHByZXYgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLm5leHQgPT09IEtleS5TRU5USU5FTCA/IFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IEtleS5TRU5USU5FTCB9KSA6IFRyZWUucHJldihwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ubmV4dCwgbnVsbF0pLnRoZW4obmV4dCA9PiAoeyBuZXh0IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBtYXBOZXh0UG9zaXRpb24oZnJvbSkgOiBtYXBQcmV2UG9zaXRpb24oZnJvbSksXG4gICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLmZsYXR0ZW4oU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBzdG9yZSA9PiBzdG9yZS5zdGF0ZSkpIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKGRpc3BhdGNoZXJfKTtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmxhdHRlbihwYXJlbnRfLnN0YXRlKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGUuZmxhdHRlbihwYXJlbnRfLnN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKGdldFN0YXRlKCksIGRpc3BhdGNoZXJfLCBnZXRTdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGZsYXRNYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICByZXR1cm4gU3RvcmUuZmxhdHRlbihTdG9yZS5tYXAocGFyZW50LCBtYXBGbikpO1xuICAgIH1cbiAgICBTdG9yZS5mbGF0TWFwID0gZmxhdE1hcDtcbiAgICBmdW5jdGlvbiBrZXlCeShwYXJlbnQsIGtleUZuLCByZXZlcnNlS2V5Rm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUua2V5QnkocGFyZW50LnN0YXRlLCBrZXlGbiwgcmV2ZXJzZUtleUZuKSwgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgW2Zyb20sIHRvXSA9IHBhdGNoLnJhbmdlO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnByZXYgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBwcmV2OiBLZXkuU0VOVElORUwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHByZXY6IHlpZWxkIGtleUZuKHlpZWxkIHBhcmVudFN0YXRlLmdldChwb3NpdGlvbi5wcmV2KSwgcG9zaXRpb24ucHJldikgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5uZXh0ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmV4dDogS2V5LlNFTlRJTkVMIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBuZXh0OiB5aWVsZCBrZXlGbih5aWVsZCBwYXJlbnRTdGF0ZS5nZXQocG9zaXRpb24ubmV4dCksIHBvc2l0aW9uLm5leHQpIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByYW5nZSA9ICh5aWVsZCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgbWFwUG9zaXRpb24oZnJvbSksXG4gICAgICAgICAgICAgICAgbWFwUG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5rZXlCeShwYXRjaC5hZGRlZCwga2V5Rm4pIDogdW5kZWZpbmVkIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24gc2NhbihwYXJlbnQsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBTdGF0ZS5zY2FuKHBhcmVudC5zdGF0ZSwgc2NhbkZuLCBtZW1vKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RvcmUsIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIHN0b3JlU3RhdGUgPSBzdG9yZS5zdGF0ZSwgW2Zyb20sIHRvXSA9IHBhdGNoLnJhbmdlO1xuICAgICAgICAgICAgdmFyIGFkZGVkID0gU3RhdGUubGF6eSgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSB5aWVsZCBTdGF0ZS5sYXN0KHN0b3JlU3RhdGUsIFt7IG5leHQ6IG51bGwgfSwgZnJvbV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBTdGF0ZS5zY2FuKFN0YXRlLnNsaWNlKHBhcmVudFN0YXRlLCBbeyBuZXh0OiBsYXN0IH0sIHsgcHJldjogbnVsbCB9XSksIHNjYW5GbiwgbGFzdCAhPT0gS2V5LlNFTlRJTkVMID8geWllbGQgc3RvcmVTdGF0ZS5nZXQobGFzdCkgOiBtZW1vKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBbZnJvbSwgeyBwcmV2OiBudWxsIH1dLCBhZGRlZCB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBzdG9yZSA9IGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyKTtcbiAgICB9XG4gICAgU3RvcmUuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gdGFrZShwYXJlbnQsIGNvdW50KSB7XG4gICAgICAgIHZhciBzdG9yZSwgc3RhdGUgPSBTdGF0ZS50YWtlKHBhcmVudC5zdGF0ZSwgY291bnQpO1xuICAgICAgICB2YXIgaW5kZXhlZCA9IFN0b3JlLnNjYW4ocGFyZW50LCAoW2luZGV4XSwgdmFsdWUpID0+IFtpbmRleCArIDEsIHZhbHVlXSwgWy0xLCBudWxsXSk7XG4gICAgICAgIHZhciBkaXNwYXRjaGVyID0gT2JzZXJ2YWJsZS5tYXAoaW5kZXhlZC5kaXNwYXRjaGVyLCAocGF0Y2gpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBbZnJvbV0gPSBwYXRjaC5yYW5nZSwgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIGluZGV4ZWRTdGF0ZSA9IGluZGV4ZWQuc3RhdGU7XG4gICAgICAgICAgICB2YXIga2V5ID0geWllbGQgU3RhdGUubGFzdChpbmRleGVkU3RhdGUsIFt7IG5leHQ6IG51bGwgfSwgZnJvbV0pO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0ga2V5ID09PSBLZXkuU0VOVElORUwgPyAtMSA6ICh5aWVsZCBpbmRleGVkU3RhdGUuZ2V0KGtleSkpWzBdO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLnRha2UoU3RhdGUubWFwKHBhdGNoLmFkZGVkLCAoW2luZGV4LCB2YWx1ZV0pID0+IHZhbHVlKSwgY291bnQgLSAoaW5kZXggKyAxKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLnRha2UgPSB0YWtlO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gU3RvcmUuY3JlYXRlKFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhcmVudC5kaXNwYXRjaGVyLCAoc3RhdGUsIHBhdGNoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGUuY2FjaGUoUGF0Y2guYXBwbHkoc3RhdGUsIHBhdGNoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdG9yZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIHN0YXRlcyhzdG9yZSkge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5tYXAoc3RvcmUuZGlzcGF0Y2hlciwgKCkgPT4gc3RvcmUuc3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5zdGF0ZXMgPSBzdGF0ZXM7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXRlLCBkaXNwYXRjaGVyLCByZWR1Y2VyID0gUGF0Y2guYXBwbHkpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBkaXNwYXRjaGVyLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IChwYXRjaCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHN0b3JlLnN0YXRlID0geWllbGQgcmVkdWNlcihzdG9yZS5zdGF0ZSwgcGF0Y2gpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJqZWN0Lm9uTmV4dChwYXRjaCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc3RvcmUgPSB7XG4gICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgIGRpc3BhdGNoZXI6IHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlLFxuICAgICAgICAgICAgICAgIG9uTmV4dDogU3ViamVjdC5pc1N1YmplY3QoZGlzcGF0Y2hlcikgPyBkaXNwYXRjaGVyLm9uTmV4dCA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgfVxuICAgIFN0b3JlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN0b3JlIHx8IChTdG9yZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JlLmpzLm1hcCJdfQ==

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Patch = undefined;
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcGF0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFDQTtBQUNPLElBQUksaUNBQUo7QUFDUCxDQUFDLFVBQVUsS0FBVixFQUFpQjtBQUNkLGFBQVMsS0FBVCxDQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkI7QUFDekIsZUFBTyxnQkFBTSxNQUFOLENBQWEsS0FBYixFQUFvQixNQUFNLEtBQTFCLEVBQWlDLE1BQU0sS0FBdkMsQ0FBUDtBQUNIO0FBQ0QsVUFBTSxLQUFOLEdBQWMsS0FBZDtBQUNBLGFBQVMsR0FBVCxDQUFhLEtBQWIsRUFBb0IsR0FBcEIsRUFBb0Q7QUFBQSxZQUEzQixRQUEyQix5REFBaEIsRUFBRSxNQUFNLElBQVIsRUFBZ0I7O0FBQ2hELGVBQU8sRUFBRSxPQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQWtCLEdBQWxCLENBQVQsRUFBaUMsT0FBTyxDQUFDLFFBQUQsRUFBVyxRQUFYLENBQXhDLEVBQVA7QUFDSDtBQUNELFVBQU0sR0FBTixHQUFZLEdBQVo7QUFDQSxhQUFTLEdBQVQsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLEVBQXlCO0FBQ3JCLGVBQU8sRUFBRSxPQUFPLGdCQUFNLElBQU4sQ0FBVyxLQUFYLEVBQWtCLEdBQWxCLENBQVQsRUFBaUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxHQUFSLEVBQUQsRUFBZ0IsRUFBRSxNQUFNLEdBQVIsRUFBaEIsQ0FBeEMsRUFBUDtBQUNIO0FBQ0QsVUFBTSxHQUFOLEdBQVksR0FBWjtBQUNBLGFBQVMsSUFBVCxDQUFjLEtBQWQsRUFBcUIsR0FBckIsRUFBMEI7QUFDdEIsZUFBTyxJQUFJLEtBQUosRUFBVyxHQUFYLEVBQWdCLEVBQUUsTUFBTSxJQUFSLEVBQWhCLENBQVA7QUFDSDtBQUNELFVBQU0sSUFBTixHQUFhLElBQWI7QUFDQSxhQUFTLE9BQVQsQ0FBaUIsS0FBakIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDekIsZUFBTyxJQUFJLEtBQUosRUFBVyxHQUFYLEVBQWdCLEVBQUUsTUFBTSxJQUFSLEVBQWhCLENBQVA7QUFDSDtBQUNELFVBQU0sT0FBTixHQUFnQixPQUFoQjtBQUNBLGFBQVMsTUFBVCxDQUFnQixHQUFoQixFQUFxQjtBQUNqQixlQUFPLEVBQUUsT0FBTyxDQUFDLEVBQUUsTUFBTSxHQUFSLEVBQUQsRUFBZ0IsRUFBRSxNQUFNLEdBQVIsRUFBaEIsQ0FBVCxFQUFQO0FBQ0g7QUFDRCxVQUFNLE1BQU4sR0FBZSxNQUFmO0FBQ0gsQ0F6QkQsRUF5Qkcsa0JBMUJRLEtBMEJSLEdBQVUsUUFBUSxFQUFsQixDQXpCSDtrQkEwQmUsSyIsImZpbGUiOiJwYXRjaC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xuICAgIGZ1bmN0aW9uIGFkZCh2YWx1ZSwga2V5LCBwb3NpdGlvbiA9IHsgcHJldjogbnVsbCB9KSB7XG4gICAgICAgIHJldHVybiB7IGFkZGVkOiBTdGF0ZS51bml0KHZhbHVlLCBrZXkpLCByYW5nZTogW3Bvc2l0aW9uLCBwb3NpdGlvbl0gfTtcbiAgICB9XG4gICAgUGF0Y2guYWRkID0gYWRkO1xuICAgIGZ1bmN0aW9uIHNldCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiB7IGFkZGVkOiBTdGF0ZS51bml0KHZhbHVlLCBrZXkpLCByYW5nZTogW3sgcHJldjoga2V5IH0sIHsgbmV4dDoga2V5IH1dIH07XG4gICAgfVxuICAgIFBhdGNoLnNldCA9IHNldDtcbiAgICBmdW5jdGlvbiBwdXNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGFkZCh2YWx1ZSwga2V5LCB7IHByZXY6IG51bGwgfSk7XG4gICAgfVxuICAgIFBhdGNoLnB1c2ggPSBwdXNoO1xuICAgIGZ1bmN0aW9uIHVuc2hpZnQodmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gYWRkKHZhbHVlLCBrZXksIHsgbmV4dDogbnVsbCB9KTtcbiAgICB9XG4gICAgUGF0Y2gudW5zaGlmdCA9IHVuc2hpZnQ7XG4gICAgZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogW3sgcHJldjoga2V5IH0sIHsgbmV4dDoga2V5IH1dIH07XG4gICAgfVxuICAgIFBhdGNoLnJlbW92ZSA9IHJlbW92ZTtcbn0pKFBhdGNoIHx8IChQYXRjaCA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQYXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGNoLmpzLm1hcCJdfQ==

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Subject = exports.Observable = exports.Disposable = undefined;
	
	var _keys = __webpack_require__(93);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(65);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(86);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _async_iterator = __webpack_require__(92);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = _promise2.default))(function (resolve, reject) {
	        function fulfilled(value) {
	            try {
	                step(generator.next(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function rejected(value) {
	            try {
	                step(generator.throw(value));
	            } catch (e) {
	                reject(e);
	            }
	        }
	        function step(result) {
	            result.done ? resolve(result.value) : new P(function (resolve) {
	                resolve(result.value);
	            }).then(fulfilled, rejected);
	        }
	        step((generator = generator.apply(thisArg, _arguments)).next());
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
	                if (disposer) disposer();
	            }
	        };
	    }
	    Disposable.create = create;
	})(Disposable || (exports.Disposable = Disposable = {}));
	var Observable = exports.Observable = undefined;
	(function (Observable) {
	    function create(fn) {
	        var subject;
	        function subscribe(observer) {
	            if (!subject) {
	                subject = Subject.create();
	                if (fn) fn(subject);
	            }
	            return subject.subscribe(observer);
	        }
	        return { subscribe: subscribe };
	    }
	    Observable.create = create;
	    function pipe(observable, observer) {
	        observable.subscribe(observer);
	        return observer;
	    }
	    Observable.pipe = pipe;
	    function map(observable, mapFn) {
	        return create(function (subject) {
	            observable.subscribe({
	                onNext: function onNext(value) {
	                    return _promise2.default.resolve(mapFn(value)).then(subject.onNext);
	                }
	            });
	        });
	    }
	    Observable.map = map;
	    function filter(observable, filterFn) {
	        return create(function (subject) {
	            observable.subscribe({
	                onNext: function onNext(value) {
	                    return _promise2.default.resolve(filterFn(value)).then(function (result) {
	                        return result ? subject.onNext(value) : undefined;
	                    });
	                }
	            });
	        });
	    }
	    Observable.filter = filter;
	    function scan(observable, scanFn, memo) {
	        return create(function (subject) {
	            observable.subscribe({
	                onNext: function onNext(value) {
	                    return _promise2.default.resolve(scanFn(memo, value)).then(function (value) {
	                        memo = value;return subject.onNext(value);
	                    });
	                }
	            });
	        });
	    }
	    Observable.scan = scan;
	    function forEach(observable, fn) {
	        return observable.subscribe({
	            onNext: fn
	        });
	    }
	    Observable.forEach = forEach;
	    function fromPromise(promise) {
	        return create(function (subject) {
	            promise.then(subject.onNext).then(subject.onComplete);
	        });
	    }
	    Observable.fromPromise = fromPromise;
	    function toPromise(observable) {
	        return new _promise2.default(function (resolve, reject) {
	            observable.subscribe({
	                onNext: resolve,
	                onComplete: resolve,
	                onError: reject
	            });
	        });
	    }
	    Observable.toPromise = toPromise;
	    function fromIterator(iterator) {
	        var subject = Subject.create();
	        _async_iterator2.default.forEach(iterator, subject.onNext);
	        return { subscribe: subject.subscribe };
	    }
	    Observable.fromIterator = fromIterator;
	    function toIterator(observable) {
	        function defer() {
	            var resolve,
	                reject,
	                promise = new _promise2.default(function (res, rej) {
	                resolve = res;
	                reject = rej;
	            });
	            return { resolve: resolve, reject: reject, promise: promise };
	        }
	        var values = [];
	        var deferreds = [];
	        var done = false;
	        var errored = false;
	        var error;
	        observable.subscribe({
	            onNext: function onNext(value) {
	                if (deferreds.length) deferreds.pop().resolve({ done: false, value: value });else values.push(value);
	            },
	            onComplete: function onComplete() {
	                if (deferreds.length) deferreds.pop().resolve({ done: true });
	                done = true;
	            },
	            onError: function onError(reason) {
	                if (deferreds.length) deferreds.pop().reject(reason);
	                errored = true;
	                error = reason;
	            }
	        });
	        function next() {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	                var deferred;
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                if (!(done && !values.length)) {
	                                    _context.next = 2;
	                                    break;
	                                }
	
	                                return _context.abrupt('return', { done: true });
	
	                            case 2:
	                                if (!(errored && !values.length)) {
	                                    _context.next = 4;
	                                    break;
	                                }
	
	                                throw error;
	
	                            case 4:
	                                if (!values.length) {
	                                    _context.next = 6;
	                                    break;
	                                }
	
	                                return _context.abrupt('return', { done: false, value: values.shift() });
	
	                            case 6:
	                                deferred = defer();
	
	                                deferreds.push(deferred);
	                                return _context.abrupt('return', deferred.promise);
	
	                            case 9:
	                            case 'end':
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	        return _async_iterator2.default.create(next);
	    }
	    Observable.toIterator = toIterator;
	})(Observable || (exports.Observable = Observable = {}));
	var Subject = exports.Subject = undefined;
	(function (Subject) {
	    function isSubject(obj) {
	        return typeof obj["onNext"] === "function";
	    }
	    Subject.isSubject = isSubject;
	    function create() {
	        var observers = (0, _create2.default)(null),
	            current = _promise2.default.resolve(),
	            completed = false,
	            result,
	            errored = false,
	            error;
	        function subscribe(observer) {
	            if (completed) {
	                _promise2.default.resolve(function () {
	                    return observer.onComplete(result);
	                });
	                return Disposable.create();
	            }
	            if (errored) {
	                _promise2.default.resolve(function () {
	                    return observer.onError(error);
	                });
	                return Disposable.create();
	            }
	            var observerKey = _key2.default.unique();
	            observers[observerKey] = observer;
	            return Disposable.create(function () {
	                return delete observers[observerKey];
	            });
	        }
	        function onNext(value) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                return _context2.abrupt('return', current = current.then(function () {
	                                    return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                                        return observers[key].onNext(value);
	                                    })).then(function () {});
	                                }));
	
	                            case 1:
	                            case 'end':
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	        function onComplete(res) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                completed = true;
	                                result = res;
	                                return _context3.abrupt('return', current = current.then(function () {
	                                    return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                                        return observers[key].onComplete ? observers[key].onComplete(res) : undefined;
	                                    })).then(function () {
	                                        observers = null;
	                                    });
	                                }));
	
	                            case 3:
	                            case 'end':
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        }
	        function onError(reason) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                                errored = true;
	                                error = reason;
	                                return _context4.abrupt('return', current = current.then(function () {
	                                    return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                                        return observers[key].onError ? observers[key].onError(reason) : undefined;
	                                    })).then(function () {
	                                        observers = null;
	                                    });
	                                }));
	
	                            case 3:
	                            case 'end':
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, this);
	            }));
	        }
	        return { subscribe: subscribe, onNext: onNext, onComplete: onComplete, onError: onError };
	    }
	    Subject.create = create;
	})(Subject || (exports.Subject = Subject = {}));
	//# sourceMappingURL=observable.js.map
	//# sourceMappingURL=data:application/json;base64,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R0FBVixFQUFlLE9BQWYsQ0FBdUIsTUFBdkIsQ0FBekIsR0FBMEQsU0FBakU7QUFBQSxxQ0FBM0IsQ0FBWixFQUFvSCxJQUFwSCxDQUF5SCxZQUFNO0FBQUUsb0RBQVksSUFBWjtBQUFtQixxQ0FBcEosQ0FBTjtBQUFBLGlDQUFiLENBSG1COztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWpDLEVBQVA7QUFLSDtBQUNELGVBQU8sRUFBRSxvQkFBRixFQUFhLGNBQWIsRUFBcUIsc0JBQXJCLEVBQWlDLGdCQUFqQyxFQUFQO0FBQ0g7QUFDRCxZQUFRLE1BQVIsR0FBaUIsTUFBakI7QUFDSCxDQTFDRCxFQTBDRyxvQkEzQ1EsT0EyQ1IsR0FBWSxVQUFVLEVBQXRCLENBMUNIIiwiZmlsZSI6Im9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IudGhyb3codmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cykpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgRGlzcG9zYWJsZTtcbihmdW5jdGlvbiAoRGlzcG9zYWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaXNwb3Nlcikge1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChkaXNwb3NlcilcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlIHx8IChEaXNwb3NhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgT2JzZXJ2YWJsZTtcbihmdW5jdGlvbiAoT2JzZXJ2YWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShmbikge1xuICAgICAgICB2YXIgc3ViamVjdDtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBpZiAoIXN1YmplY3QpIHtcbiAgICAgICAgICAgICAgICBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZm4pXG4gICAgICAgICAgICAgICAgICAgIGZuKHN1YmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3Quc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gcGlwZShvYnNlcnZhYmxlLCBvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICAgIHJldHVybiBvYnNlcnZlcjtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5waXBlID0gcGlwZTtcbiAgICBmdW5jdGlvbiBtYXAob2JzZXJ2YWJsZSwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShtYXBGbih2YWx1ZSkpLnRoZW4oc3ViamVjdC5vbk5leHQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihvYnNlcnZhYmxlLCBmaWx0ZXJGbikge1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gc3ViamVjdC5vbk5leHQodmFsdWUpIDogdW5kZWZpbmVkKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKG9ic2VydmFibGUsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vLCB2YWx1ZSkpLnRoZW4odmFsdWUgPT4geyBtZW1vID0gdmFsdWU7IHJldHVybiBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gZm9yRWFjaChvYnNlcnZhYmxlLCBmbikge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiBmblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3ViamVjdCA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3ViamVjdC5vbk5leHQpLnRoZW4oc3ViamVjdC5vbkNvbXBsZXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUuZnJvbVByb21pc2UgPSBmcm9tUHJvbWlzZTtcbiAgICBmdW5jdGlvbiB0b1Byb21pc2Uob2JzZXJ2YWJsZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiByZXNvbHZlLFxuICAgICAgICAgICAgICAgIG9uRXJyb3I6IHJlamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnRvUHJvbWlzZSA9IHRvUHJvbWlzZTtcbiAgICBmdW5jdGlvbiBmcm9tSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBBc3luY0l0ZXJhdG9yLmZvckVhY2goaXRlcmF0b3IsIHN1YmplY3Qub25OZXh0KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZyb21JdGVyYXRvciA9IGZyb21JdGVyYXRvcjtcbiAgICBmdW5jdGlvbiB0b0l0ZXJhdG9yKG9ic2VydmFibGUpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZSwgcmVqZWN0LCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgICAgICAgICAgICByZWplY3QgPSByZWo7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc29sdmUsIHJlamVjdCwgcHJvbWlzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgdmFyIGRlZmVycmVkcyA9IFtdO1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJlZHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZHMucG9wKCkucmVzb2x2ZSh7IGRvbmU6IGZhbHNlLCB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJlZHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZHMucG9wKCkucmVzb2x2ZSh7IGRvbmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FcnJvcihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXJyZWRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRzLnBvcCgpLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9yID0gcmVhc29uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lICYmICF2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yZWQgJiYgIXZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IHZhbHVlcy5zaGlmdCgpIH07XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5jcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIE9ic2VydmFibGUudG9JdGVyYXRvciA9IHRvSXRlcmF0b3I7XG59KShPYnNlcnZhYmxlIHx8IChPYnNlcnZhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGlzU3ViamVjdChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmpbXCJvbk5leHRcIl0gPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG4gICAgU3ViamVjdC5pc1N1YmplY3QgPSBpc1N1YmplY3Q7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKSwgY3VycmVudCA9IFByb21pc2UucmVzb2x2ZSgpLCBjb21wbGV0ZWQgPSBmYWxzZSwgcmVzdWx0LCBlcnJvcmVkID0gZmFsc2UsIGVycm9yO1xuICAgICAgICBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKCkgPT4gb2JzZXJ2ZXIub25Db21wbGV0ZShyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcmVkKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCgpID0+IG9ic2VydmVyLm9uRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvYnNlcnZlcktleSA9IEtleS51bmlxdWUoKTtcbiAgICAgICAgICAgIG9ic2VydmVyc1tvYnNlcnZlcktleV0gPSBvYnNlcnZlcjtcbiAgICAgICAgICAgIHJldHVybiBEaXNwb3NhYmxlLmNyZWF0ZSgoKSA9PiBkZWxldGUgb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25OZXh0KHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25OZXh0KHZhbHVlKSkpLnRoZW4oKCkgPT4geyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkNvbXBsZXRlKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uQ29tcGxldGUgPyBvYnNlcnZlcnNba2V5XS5vbkNvbXBsZXRlKHJlcykgOiB1bmRlZmluZWQpKS50aGVuKCgpID0+IHsgb2JzZXJ2ZXJzID0gbnVsbDsgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvcihyZWFzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9yID0gcmVhc29uO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbkVycm9yID8gb2JzZXJ2ZXJzW2tleV0ub25FcnJvcihyZWFzb24pIDogdW5kZWZpbmVkKSkudGhlbigoKSA9PiB7IG9ic2VydmVycyA9IG51bGw7IH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yIH07XG4gICAgfVxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xufSkoU3ViamVjdCB8fCAoU3ViamVjdCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcCJdfQ==

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PromiseUtils = undefined;
	
	var _promise = __webpack_require__(68);
	
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcHJvbWlzZV91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQU8sSUFBSSwrQ0FBSjtBQUNQLENBQUMsVUFBVSxZQUFWLEVBQXdCO0FBQ3JCLGFBQVMsSUFBVCxDQUFjLFFBQWQsRUFBd0I7QUFDcEIsWUFBSSxPQUFKO0FBQ0EsaUJBQVMsSUFBVCxDQUFjLFdBQWQsRUFBMkIsVUFBM0IsRUFBdUM7QUFDbkMsZ0JBQUksT0FBSixFQUNJLE9BQU8sUUFBUSxJQUFSLENBQWEsV0FBYixFQUEwQixVQUExQixDQUFQO0FBQ0osbUJBQU8sQ0FBQyxVQUFVLHNCQUFZLFFBQVosQ0FBWCxFQUFrQyxJQUFsQyxDQUF1QyxXQUF2QyxFQUFvRCxVQUFwRCxDQUFQO0FBQ0g7QUFDRCxlQUFPLGtCQUFRLE9BQVIsQ0FBZ0IsRUFBRSxVQUFGLEVBQWhCLENBQVA7QUFDSDtBQUNELGlCQUFhLElBQWIsR0FBb0IsSUFBcEI7QUFDSCxDQVhELEVBV0cseUJBWlEsWUFZUixHQUFpQixlQUFlLEVBQWhDLENBWEg7a0JBWWUsWSIsImZpbGUiOiJwcm9taXNlX3V0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgUHJvbWlzZVV0aWxzO1xuKGZ1bmN0aW9uIChQcm9taXNlVXRpbHMpIHtcbiAgICBmdW5jdGlvbiBsYXp5KGV4ZWN1dG9yKSB7XG4gICAgICAgIHZhciBwcm9taXNlO1xuICAgICAgICBmdW5jdGlvbiB0aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgICAgIHJldHVybiAocHJvbWlzZSA9IG5ldyBQcm9taXNlKGV4ZWN1dG9yKSkudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHRoZW4gfSk7XG4gICAgfVxuICAgIFByb21pc2VVdGlscy5sYXp5ID0gbGF6eTtcbn0pKFByb21pc2VVdGlscyB8fCAoUHJvbWlzZVV0aWxzID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFByb21pc2VVdGlscztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2VfdXRpbHMuanMubWFwIl19

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Lens = undefined;
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _store = __webpack_require__(98);
	
	var _observable = __webpack_require__(100);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvbGVucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNPLElBQUksK0JBQUo7QUFDUCxDQUFDLFVBQVUsSUFBVixFQUFnQjtBQUNiLGFBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixJQUF6QixFQUErQjtBQUMzQixZQUFJLGFBQWEsb0JBQVEsTUFBUixFQUFqQjtBQUFBLFlBQW1DLGFBQWEsb0JBQVEsTUFBUixFQUFoRDtBQUNBLCtCQUFXLEdBQVgsQ0FBZSxPQUFPLFVBQXRCLEVBQWtDLGlCQUFTO0FBQ3ZDLGdCQUFJLE1BQU0sS0FBVixFQUNJLE9BQU8sRUFBRSxPQUFPLE1BQU0sS0FBZixFQUFzQixPQUFPLGdCQUFNLEdBQU4sQ0FBVSxNQUFNLEtBQWhCLEVBQXVCLEtBQUssR0FBNUIsQ0FBN0IsRUFBUDtBQUNKLG1CQUFPLEVBQUUsT0FBTyxNQUFNLEtBQWYsRUFBUDtBQUNILFNBSkQsRUFJRyxTQUpILENBSWEsVUFKYjtBQUtBLCtCQUFXLEdBQVgsQ0FBZSxVQUFmLEVBQTJCLGlCQUFTO0FBQ2hDLGdCQUFJLE1BQU0sS0FBVixFQUNJLE9BQU8sRUFBRSxPQUFPLE1BQU0sS0FBZixFQUFzQixPQUFPLGdCQUFNLEdBQU4sQ0FBVSxNQUFNLEtBQWhCLEVBQXVCLEtBQUssR0FBNUIsQ0FBN0IsRUFBUDtBQUNKLG1CQUFPLEVBQUUsT0FBTyxNQUFNLEtBQWYsRUFBUDtBQUNILFNBSkQsRUFJRyxTQUpILENBSWEsT0FBTyxVQUpwQjtBQUtBLGVBQU8sYUFBTSxNQUFOLENBQWEsZ0JBQU0sR0FBTixDQUFVLE9BQU8sS0FBakIsRUFBd0IsS0FBSyxHQUE3QixDQUFiLEVBQWdELEVBQUUsV0FBVyxXQUFXLFNBQXhCLEVBQW1DLFFBQVEsV0FBVyxNQUF0RCxFQUFoRCxDQUFQO0FBQ0g7QUFDRCxTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0gsQ0FoQkQsRUFnQkcsaUJBakJRLElBaUJSLEdBQVMsT0FBTyxFQUFoQixDQWhCSDtrQkFpQmUsSSIsImZpbGUiOiJsZW5zLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgTGVucztcbihmdW5jdGlvbiAoTGVucykge1xuICAgIGZ1bmN0aW9uIGNvbXBvc2UocGFyZW50LCBsZW5zKSB7XG4gICAgICAgIHZhciBnZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKSwgc2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLmdldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUoZ2V0U3ViamVjdCk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHNldFN1YmplY3QsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxlbnMuc2V0KSB9O1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XG4gICAgICAgIH0pLnN1YnNjcmliZShwYXJlbnQuZGlzcGF0Y2hlcik7XG4gICAgICAgIHJldHVybiBTdG9yZS5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XG4gICAgfVxuICAgIExlbnMuY29tcG9zZSA9IGNvbXBvc2U7XG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExlbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZW5zLmpzLm1hcCJdfQ==

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sonic.browser.js.map