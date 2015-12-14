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
	
	var _async_iterator = __webpack_require__(87);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _store = __webpack_require__(94);
	
	var _tree = __webpack_require__(93);
	
	var _cache = __webpack_require__(84);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _observable = __webpack_require__(96);
	
	var _promise_utils = __webpack_require__(97);
	
	var _promise_utils2 = _interopRequireDefault(_promise_utils);
	
	var _lens = __webpack_require__(98);
	
	var _lens2 = _interopRequireDefault(_lens);
	
	var _patch = __webpack_require__(95);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _exceptions = __webpack_require__(85);
	
	var _range = __webpack_require__(83);
	
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
	//# sourceMappingURL=data:application/json;base64,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QUssQ0FBQyxJQUFJLGlCQUFRLENBQUM7QUFDbkIsU0FBSyxDQUFDLEtBQUssa0JBQVMsQ0FBQztBQUNyQixTQUFLLENBQUMsS0FBSyxVQXBCTixLQUFLLEFBb0JVLENBQUM7QUFDckIsU0FBSyxDQUFDLFFBQVEsVUFyQlEsUUFBUSxBQXFCSixDQUFDO0FBQzNCLFNBQUssQ0FBQyxRQUFRLGVBdkJULFFBQVEsQUF1QmEsQ0FBQztDQUM5QixDQUFBLENBQUUsS0FBSyxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQztrQkFDYyxLQUFLOztBQUNwQixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUs7O0FBQUMiLCJmaWxlIjoic29uaWMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgX1N0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IF9Bc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuaW1wb3J0IHsgU3RvcmUgYXMgX1N0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBUcmVlIGFzIF9UcmVlLCBQYXRoIGFzIF9QYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCBfQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgeyBTdWJqZWN0IGFzIF9TdWJqZWN0LCBPYnNlcnZhYmxlIGFzIF9PYnNlcnZhYmxlIH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBfUHJvbWlzZVV0aWxzIGZyb20gJy4vcHJvbWlzZV91dGlscyc7XG5pbXBvcnQgX0xlbnMgZnJvbSAnLi9sZW5zJztcbmltcG9ydCBfUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgeyBOb3RGb3VuZCBhcyBfTm90Rm91bmQgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgUmFuZ2UgYXMgX1JhbmdlLCBQb3NpdGlvbiBhcyBfUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9TdG9yZS5jcmVhdGUoX1N0YXRlLmZyb21BcnJheShvYmopLCBfU3ViamVjdC5jcmVhdGUoKSk7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgcmV0dXJuIF9TdG9yZS5jcmVhdGUoX1N0YXRlLmZyb21PYmplY3Qob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xufVxudmFyIFNvbmljO1xuKGZ1bmN0aW9uIChTb25pYykge1xuICAgIFNvbmljLlN0YXRlID0gX1N0YXRlO1xuICAgIFNvbmljLkFzeW5jSXRlcmF0b3IgPSBfQXN5bmNJdGVyYXRvcjtcbiAgICBTb25pYy5TdG9yZSA9IF9TdG9yZTtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuUGF0aCA9IF9QYXRoO1xuICAgIFNvbmljLlN1YmplY3QgPSBfU3ViamVjdDtcbiAgICBTb25pYy5PYnNlcnZhYmxlID0gX09ic2VydmFibGU7XG4gICAgU29uaWMuQ2FjaGUgPSBfQ2FjaGU7XG4gICAgU29uaWMuUHJvbWlzZVV0aWxzID0gX1Byb21pc2VVdGlscztcbiAgICBTb25pYy5MZW5zID0gX0xlbnM7XG4gICAgU29uaWMuUGF0Y2ggPSBfUGF0Y2g7XG4gICAgU29uaWMuUmFuZ2UgPSBfUmFuZ2U7XG4gICAgU29uaWMuUG9zaXRpb24gPSBfUG9zaXRpb247XG4gICAgU29uaWMuTm90Rm91bmQgPSBfTm90Rm91bmQ7XG59KShTb25pYyB8fCAoU29uaWMgPSB7fSkpO1xuO1xuZXhwb3J0IGRlZmF1bHQgU29uaWM7XG5tb2R1bGUuZXhwb3J0cyA9IFNvbmljO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29uaWMuanMubWFwIl19

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.State = undefined;
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(74);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _create = __webpack_require__(38);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(81);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _entry = __webpack_require__(82);
	
	var _entry2 = _interopRequireDefault(_entry);
	
	var _range2 = __webpack_require__(83);
	
	var _cache = __webpack_require__(84);
	
	var _cache2 = _interopRequireDefault(_cache);
	
	var _async_iterator = __webpack_require__(87);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _tree = __webpack_require__(93);
	
	var _exceptions = __webpack_require__(85);
	
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
	                            return _context.abrupt("return", _range2.Position.isPrevPosition(from) ? from.prev : state.next(from.next));
	
	                        case 1:
	                        case "end":
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
	                            return _context2.abrupt("return", _range2.Position.isNextPosition(to) ? to.next : state.prev(to.prev));
	
	                        case 1:
	                        case "end":
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
	                            return _context3.abrupt("return", true);
	
	                        case 6:
	                            _context3.prev = 6;
	                            _context3.t0 = _context3["catch"](0);
	
	                            if (!(_context3.t0 instanceof _exceptions.NotFound)) {
	                                _context3.next = 10;
	                                break;
	                            }
	
	                            return _context3.abrupt("return", false);
	
	                        case 10:
	                            throw _context3.t0;
	
	                        case 11:
	                        case "end":
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
	                    if (prev !== _key2.default.SENTINEL) return _promise2.default.resolve(prev);
	                    return _range2.Position.isNextPosition(from) ? _promise2.default.resolve(from.next) : parent.prev(from.prev);
	                });
	            },
	            next: function next(key) {
	                return child.next(key).then(function (next) {
	                    if (next !== _key2.default.SENTINEL) return _promise2.default.resolve(next);
	                    return _range2.Position.isPrevPosition(to) ? _promise2.default.resolve(to.prev) : parent.next(to.next);
	                });
	            }
	        });
	        bridgedParent = extend(filtered, {
	            prev: function prev(key) {
	                return parent.prev(key).then(function (prev) {
	                    if (_range2.Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(_key2.default.SENTINEL);
	                    return has(deleted, prev).then(function (res) {
	                        return res ? _promise2.default.reject(new _exceptions.NotFound()) : prev;
	                    });
	                });
	            },
	            next: function next(key) {
	                return parent.next(key).then(function (next) {
	                    if (_range2.Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(_key2.default.SENTINEL);
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
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                                _context4.next = 2;
	                                return parent.get(key);
	
	                            case 2:
	                                _context4.t0 = _context4.sent;
	                                _context4.t1 = key;
	                                return _context4.abrupt("return", mapFn(_context4.t0, _context4.t1));
	
	                            case 5:
	                            case "end":
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, this);
	            }));
	        }
	        return extend(parent, { get: get });
	    }
	    State.map = map;
	    function filter(parent, filterFn) {
	        var cache = (0, _create2.default)(null);
	        function have(key) {
	            var stringifiedKey = (0, _stringify2.default)(key);
	            return stringifiedKey in cache ? cache[stringifiedKey] : cache[stringifiedKey] = parent.get(key).then(function (value) {
	                return filterFn(value, key);
	            });
	        }
	        function get(key) {
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                _context5.next = 2;
	                                return have(key);
	
	                            case 2:
	                                if (!_context5.sent) {
	                                    _context5.next = 4;
	                                    break;
	                                }
	
	                                return _context5.abrupt("return", parent.get(key));
	
	                            case 4:
	                                throw new _exceptions.NotFound();
	
	                            case 5:
	                            case "end":
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, this);
	            }));
	        }
	        function prev(key) {
	            return parent.prev(key).then(function (p) {
	                return p === _key2.default.SENTINEL ? _key2.default.SENTINEL : have(p).then(function (res) {
	                    return res ? p : prev(p);
	                });
	            });
	        }
	        function next(key) {
	            return parent.next(key).then(function (n) {
	                return n === _key2.default.SENTINEL ? _key2.default.SENTINEL : have(n).then(function (res) {
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
	            return __awaiter(_this, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
	                return _regenerator2.default.wrap(function _callee6$(_context6) {
	                    while (1) {
	                        switch (_context6.prev = _context6.next) {
	                            case 0:
	                                _context6.next = 2;
	                                return has(omitted, key);
	
	                            case 2:
	                                return _context6.abrupt("return", !_context6.sent);
	
	                            case 3:
	                            case "end":
	                                return _context6.stop();
	                        }
	                    }
	                }, _callee6, this);
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
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
	                return _regenerator2.default.wrap(function _callee7$(_context7) {
	                    while (1) {
	                        switch (_context7.prev = _context7.next) {
	                            case 0:
	                                if (!(k === key)) {
	                                    _context7.next = 2;
	                                    break;
	                                }
	
	                                return _context7.abrupt("return", parent.get(key));
	
	                            case 2:
	                                throw new _exceptions.NotFound();
	
	                            case 3:
	                            case "end":
	                                return _context7.stop();
	                        }
	                    }
	                }, _callee7, this);
	            }));
	        }
	        function next() {
	            var k = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
	                return _regenerator2.default.wrap(function _callee8$(_context8) {
	                    while (1) {
	                        switch (_context8.prev = _context8.next) {
	                            case 0:
	                                if (!(k !== key && k !== _key2.default.SENTINEL)) {
	                                    _context8.next = 2;
	                                    break;
	                                }
	
	                                throw new _exceptions.NotFound();
	
	                            case 2:
	                                _context8.next = 4;
	                                return has(parent, key);
	
	                            case 4:
	                                if (_context8.sent) {
	                                    _context8.next = 6;
	                                    break;
	                                }
	
	                                throw new _exceptions.NotFound();
	
	                            case 6:
	                                if (!(k === _key2.default.SENTINEL)) {
	                                    _context8.next = 8;
	                                    break;
	                                }
	
	                                return _context8.abrupt("return", key);
	
	                            case 8:
	                                if (!(k === key)) {
	                                    _context8.next = 10;
	                                    break;
	                                }
	
	                                return _context8.abrupt("return", _key2.default.SENTINEL);
	
	                            case 10:
	                            case "end":
	                                return _context8.stop();
	                        }
	                    }
	                }, _callee8, this);
	            }));
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
	            return __awaiter(_this2, void 0, _promise2.default, _regenerator2.default.mark(function _callee9() {
	                return _regenerator2.default.wrap(function _callee9$(_context9) {
	                    while (1) {
	                        switch (_context9.prev = _context9.next) {
	                            case 0:
	                                return _context9.abrupt("return", uniqueFn(value, key));
	
	                            case 1:
	                            case "end":
	                                return _context9.stop();
	                        }
	                    }
	                }, _callee9, this);
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
	            return __awaiter(_this3, void 0, _promise2.default, _regenerator2.default.mark(function _callee10() {
	                return _regenerator2.default.wrap(function _callee10$(_context10) {
	                    while (1) {
	                        switch (_context10.prev = _context10.next) {
	                            case 0:
	                                return _context10.abrupt("return", uniqueFn(value, key));
	
	                            case 1:
	                            case "end":
	                                return _context10.stop();
	                        }
	                    }
	                }, _callee10, this);
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
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee11() {
	                    return _regenerator2.default.wrap(function _callee11$(_context11) {
	                        while (1) {
	                            switch (_context11.prev = _context11.next) {
	                                case 0:
	                                    _context11.t0 = parent;
	                                    _context11.next = 3;
	                                    return reverseKeyFn(key);
	
	                                case 3:
	                                    _context11.t1 = _context11.sent;
	                                    return _context11.abrupt("return", _context11.t0.get.call(_context11.t0, _context11.t1));
	
	                                case 5:
	                                case "end":
	                                    return _context11.stop();
	                            }
	                        }
	                    }, _callee11, this);
	                }));
	            },
	            prev: function prev(key) {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee12() {
	                    var prev;
	                    return _regenerator2.default.wrap(function _callee12$(_context12) {
	                        while (1) {
	                            switch (_context12.prev = _context12.next) {
	                                case 0:
	                                    _context12.t0 = parent;
	                                    _context12.next = 3;
	                                    return reverseKeyFn(key);
	
	                                case 3:
	                                    _context12.t1 = _context12.sent;
	                                    _context12.next = 6;
	                                    return _context12.t0.prev.call(_context12.t0, _context12.t1);
	
	                                case 6:
	                                    prev = _context12.sent;
	                                    _context12.next = 9;
	                                    return parent.get(prev);
	
	                                case 9:
	                                    _context12.t2 = _context12.sent;
	                                    _context12.t3 = prev;
	                                    return _context12.abrupt("return", keyFn(_context12.t2, _context12.t3));
	
	                                case 12:
	                                case "end":
	                                    return _context12.stop();
	                            }
	                        }
	                    }, _callee12, this);
	                }));
	            },
	            next: function next(key) {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee13() {
	                    var next;
	                    return _regenerator2.default.wrap(function _callee13$(_context13) {
	                        while (1) {
	                            switch (_context13.prev = _context13.next) {
	                                case 0:
	                                    _context13.t0 = parent;
	                                    _context13.next = 3;
	                                    return reverseKeyFn(key);
	
	                                case 3:
	                                    _context13.t1 = _context13.sent;
	                                    _context13.next = 6;
	                                    return _context13.t0.next.call(_context13.t0, _context13.t1);
	
	                                case 6:
	                                    next = _context13.sent;
	                                    _context13.next = 9;
	                                    return parent.get(next);
	
	                                case 9:
	                                    _context13.t2 = _context13.sent;
	                                    _context13.t3 = next;
	                                    return _context13.abrupt("return", keyFn(_context13.t2, _context13.t3));
	
	                                case 12:
	                                case "end":
	                                    return _context13.stop();
	                            }
	                        }
	                    }, _callee13, this);
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
	        var cache = _cache2.default.create(),
	            exhausted = false,
	            currentKey = _key2.default.SENTINEL,
	            queue = _promise2.default.resolve(null);
	        var cachingIterator = {
	            next: function next() {
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee14() {
	                    var result, _result$value, key, value;
	
	                    return _regenerator2.default.wrap(function _callee14$(_context14) {
	                        while (1) {
	                            switch (_context14.prev = _context14.next) {
	                                case 0:
	                                    _context14.next = 2;
	                                    return iterator.next();
	
	                                case 2:
	                                    result = _context14.sent;
	
	                                    if (!result.done) {
	                                        _context14.next = 10;
	                                        break;
	                                    }
	
	                                    exhausted = true;
	                                    _context14.next = 7;
	                                    return cache.prev(_key2.default.SENTINEL, currentKey);
	
	                                case 7:
	                                    _context14.next = 9;
	                                    return cache.next(currentKey, _key2.default.SENTINEL);
	
	                                case 9:
	                                    return _context14.abrupt("return", _async_iterator2.default.done);
	
	                                case 10:
	                                    _result$value = (0, _slicedToArray3.default)(result.value, 2);
	                                    key = _result$value[0];
	                                    value = _result$value[1];
	                                    _context14.next = 15;
	                                    return cache.prev(key, currentKey);
	
	                                case 15:
	                                    _context14.next = 17;
	                                    return cache.next(currentKey, key);
	
	                                case 17:
	                                    _context14.next = 19;
	                                    return cache.get(key, value);
	
	                                case 19:
	                                    currentKey = key;
	                                    return _context14.abrupt("return", { done: false, value: [key, value] });
	
	                                case 21:
	                                case "end":
	                                    return _context14.stop();
	                            }
	                        }
	                    }, _callee14, this);
	                }));
	            }
	        };
	        function get(key) {
	            if (exhausted) return _promise2.default.reject(new _exceptions.NotFound());
	            return _async_iterator2.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(_entry2.default.value);
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee15() {
	                return _regenerator2.default.wrap(function _callee15$(_context15) {
	                    while (1) {
	                        switch (_context15.prev = _context15.next) {
	                            case 0:
	                                if (!exhausted) {
	                                    _context15.next = 2;
	                                    break;
	                                }
	
	                                return _context15.abrupt("return", _promise2.default.reject(new _exceptions.NotFound()));
	
	                            case 2:
	                                _context15.next = 4;
	                                return _async_iterator2.default.some(cachingIterator, function (entry) {
	                                    return entry[0] === key;
	                                });
	
	                            case 4:
	                                return _context15.abrupt("return", cache.prev(key));
	
	                            case 5:
	                            case "end":
	                                return _context15.stop();
	                        }
	                    }
	                }, _callee15, this);
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
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee16() {
	                return _regenerator2.default.wrap(function _callee16$(_context16) {
	                    while (1) {
	                        switch (_context16.prev = _context16.next) {
	                            case 0:
	                                if (!state) {
	                                    _context16.next = 4;
	                                    break;
	                                }
	
	                                _context16.t0 = state;
	                                _context16.next = 7;
	                                break;
	
	                            case 4:
	                                _context16.next = 6;
	                                return fn();
	
	                            case 6:
	                                _context16.t0 = state = _context16.sent;
	
	                            case 7:
	                                return _context16.abrupt("return", _context16.t0);
	
	                            case 8:
	                            case "end":
	                                return _context16.stop();
	                        }
	                    }
	                }, _callee16, this);
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
	//# sourceMappingURL=data:application/json;base64,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RyxFQUFFLENBQUMsQ0FBQyxDQUFDO2tCQUNYLEtBQUsiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBFbnRyeSBmcm9tICcuL2VudHJ5JztcbmltcG9ydCB7IFBvc2l0aW9uLCBSYW5nZSB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IE5vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb25zJztcbmV4cG9ydCB2YXIgU3RhdGU7XG4oZnVuY3Rpb24gKFN0YXRlKSB7XG4gICAgU3RhdGUuRW1wdHkgPSB7XG4gICAgICAgIGdldDogKGtleSkgPT4gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKSxcbiAgICAgICAgcHJldjogKGtleSA9IEtleS5TRU5USU5FTCkgPT4ga2V5ID09PSBLZXkuU0VOVElORUwgPyBQcm9taXNlLnJlc29sdmUoS2V5LlNFTlRJTkVMKSA6IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCksXG4gICAgICAgIG5leHQ6IChrZXkgPSBLZXkuU0VOVElORUwpID0+IGtleSA9PT0gS2V5LlNFTlRJTkVMID8gUHJvbWlzZS5yZXNvbHZlKEtleS5TRU5USU5FTCkgOiBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgICAgaWYgKGdldClcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcbiAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICBzdGF0ZS5wcmV2ID0gcHJldjtcbiAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICBzdGF0ZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBTdGF0ZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZmlyc3Qoc3RhdGUsIFtmcm9tLCB0b10gPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgPyBmcm9tLnByZXYgOiBzdGF0ZS5uZXh0KGZyb20ubmV4dCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5maXJzdCA9IGZpcnN0O1xuICAgIGZ1bmN0aW9uIGxhc3Qoc3RhdGUsIFtmcm9tLCB0b10gPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gdG8ubmV4dCA6IHN0YXRlLnByZXYodG8ucHJldik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5sYXN0ID0gbGFzdDtcbiAgICBmdW5jdGlvbiBoYXMoc3RhdGUsIGtleSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgc3RhdGUuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RGb3VuZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuaGFzID0gaGFzO1xuICAgIGZ1bmN0aW9uIGlzKHN0YXRlLCBvdGhlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBlbnRyaWVzKHN0YXRlKSwgb3RoZXJJdGVyYXRvciA9IGVudHJpZXMob3RoZXIpO1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5pcyhpdGVyYXRvciwgb3RoZXJJdGVyYXRvciwgRW50cnkuaXMpO1xuICAgIH1cbiAgICBTdGF0ZS5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHN0YXRlLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGVudHJpZXMoc3RhdGUpLCBlbnRyeSA9PiBlbnRyeVsxXSA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBTdGF0ZS5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGVtcHR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5TRU5USU5FTCk7XG4gICAgfVxuICAgIFN0YXRlLmVtcHR5ID0gZW1wdHk7XG4gICAgZnVuY3Rpb24gYW55KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT09IEtleS5TRU5USU5FTCk7XG4gICAgfVxuICAgIFN0YXRlLmFueSA9IGFueTtcbiAgICBmdW5jdGlvbiBzaXplKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNpemUoa2V5cyhzdGF0ZSkpO1xuICAgIH1cbiAgICBTdGF0ZS5zaXplID0gc2l6ZTtcbiAgICBmdW5jdGlvbiBzbGljZShwYXJlbnQsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhlbnRyaWVzKHBhcmVudCwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUuc2xpY2UgPSBzbGljZTtcbiAgICBmdW5jdGlvbiBzcGxpY2UocGFyZW50LCByYW5nZSwgY2hpbGQpIHtcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgIGJyaWRnZWRDaGlsZCA9IGV4dGVuZChjaGlsZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IGNoaWxkLnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJldik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gUHJvbWlzZS5yZXNvbHZlKGZyb20ubmV4dCkgOiBwYXJlbnQucHJldihmcm9tLnByZXYpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gY2hpbGQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgIT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pID8gUHJvbWlzZS5yZXNvbHZlKHRvLnByZXYpIDogcGFyZW50Lm5leHQodG8ubmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgYnJpZGdlZFBhcmVudCA9IGV4dGVuZChmaWx0ZXJlZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IHBhcmVudC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHByZXYgPT09IHRvLm5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQucHJldihLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgcHJldikudGhlbihyZXMgPT4gcmVzID8gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKSA6IHByZXYpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gcGFyZW50Lm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBuZXh0ID09PSBmcm9tLnByZXYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgbmV4dCkudGhlbihyZXMgPT4gcmVzID8gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKSA6IG5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXMoY2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLmdldChrZXkpIDogYnJpZGdlZFBhcmVudC5nZXQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBLZXkuU0VOVElORUwpIHtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYga2V5ID09PSB0by5wcmV2KVxuICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQucHJldihLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhicmlkZ2VkQ2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLnByZXYoa2V5KSA6IGJyaWRnZWRQYXJlbnQucHJldihrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IEtleS5TRU5USU5FTCkge1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pICYmIGtleSA9PT0gZnJvbS5uZXh0KVxuICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhicmlkZ2VkQ2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLm5leHQoa2V5KSA6IGJyaWRnZWRQYXJlbnQubmV4dChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgU3RhdGUuc3BsaWNlID0gc3BsaWNlO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBwcmV2OiBwYXJlbnQubmV4dCxcbiAgICAgICAgICAgIG5leHQ6IHBhcmVudC5wcmV2XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwRm4oeWllbGQgcGFyZW50LmdldChrZXkpLCBrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHsgZ2V0IH0pO1xuICAgIH1cbiAgICBTdGF0ZS5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcbiAgICAgICAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZnVuY3Rpb24gaGF2ZShrZXkpIHtcbiAgICAgICAgICAgIHZhciBzdHJpbmdpZmllZEtleSA9IEpTT04uc3RyaW5naWZ5KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5naWZpZWRLZXkgaW4gY2FjaGUgPyBjYWNoZVtzdHJpbmdpZmllZEtleV0gOiBjYWNoZVtzdHJpbmdpZmllZEtleV0gPSBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBmaWx0ZXJGbih2YWx1ZSwga2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHlpZWxkIChoYXZlKGtleSkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldChrZXkpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LnByZXYoa2V5KS50aGVuKHAgPT4gcCA9PT0gS2V5LlNFTlRJTkVMID8gS2V5LlNFTlRJTkVMIDogaGF2ZShwKS50aGVuKHJlcyA9PiByZXMgPyBwIDogcHJldihwKSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50Lm5leHQoa2V5KS50aGVuKG4gPT4gbiA9PT0gS2V5LlNFTlRJTkVMID8gS2V5LlNFTlRJTkVMIDogaGF2ZShuKS50aGVuKHJlcyA9PiByZXMgPyBuIDogbmV4dChuKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ocGFyZW50LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihlbnRyaWVzKHBhcmVudCksIChtZW1vRW50cnksIGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vRW50cnlbMV0sIGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4ocmVzdWx0ID0+IFtlbnRyeVswXSwgcmVzdWx0XSk7XG4gICAgICAgIH0sIFtLZXkuU0VOVElORUwsIG1lbW9dKSk7XG4gICAgfVxuICAgIFN0YXRlLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHBpY2socGFyZW50LCBwaWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBoYXMocGlja2VkLCBrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUucGljayA9IHBpY2s7XG4gICAgZnVuY3Rpb24gb21pdChwYXJlbnQsIG9taXR0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkgeyByZXR1cm4gISh5aWVsZCBoYXMob21pdHRlZCwga2V5KSk7IH0pKTtcbiAgICB9XG4gICAgU3RhdGUub21pdCA9IG9taXQ7XG4gICAgZnVuY3Rpb24gemlwKHBhcmVudCwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IuemlwKEFzeW5jSXRlcmF0b3IuemlwKGtleXMocGFyZW50KSwga2V5cyhvdGhlcikpLCBBc3luY0l0ZXJhdG9yLnppcCh2YWx1ZXMocGFyZW50KSwgdmFsdWVzKG90aGVyKSkpKTtcbiAgICB9XG4gICAgU3RhdGUuemlwID0gemlwO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgdmFyIGhhdmU7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0ga2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldChrZXkpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoayA9IEtleS5TRU5USU5FTCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT09IGtleSAmJiBrICE9PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgICAgICBpZiAoISh5aWVsZCBoYXMocGFyZW50LCBrZXkpKSlcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xuICAgICAgICAgICAgICAgIGlmIChrID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IGtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEtleS5TRU5USU5FTDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldjogbmV4dCwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gVHJlZS5nZXQocGFyZW50LCBrZXkpLFxuICAgICAgICAgICAgcHJldjoga2V5ID0+IFRyZWUucHJldihwYXJlbnQsIGtleSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gVHJlZS5uZXh0KHBhcmVudCwga2V5KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gZmxhdE1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXJlbnQsIG1hcEZuKSk7XG4gICAgfVxuICAgIFN0YXRlLmZsYXRNYXAgPSBmbGF0TWFwO1xuICAgIGZ1bmN0aW9uIGdyb3VwQnkocGFyZW50LCBncm91cEZuKSB7XG4gICAgICAgIHZhciBzdGF0ZXMgPSB7fTtcbiAgICAgICAgdmFyIGl0ID0gZW50cmllcyhwYXJlbnQpO1xuICAgICAgICB2YXIgZ3JvdXBLZXllZCA9IEFzeW5jSXRlcmF0b3IubWFwKGl0LCAoW2tleSwgdmFsdWVdKSA9PiB7IHJldHVybiBQcm9taXNlLnJlc29sdmUoZ3JvdXBGbih2YWx1ZSwga2V5KSkudGhlbihncm91cEtleSA9PiBbZ3JvdXBLZXksIHZhbHVlXSk7IH0pO1xuICAgICAgICB2YXIgZmlsdGVyZWQgPSBBc3luY0l0ZXJhdG9yLmZpbHRlcihncm91cEtleWVkLCAoW2dyb3VwS2V5LCB2YWx1ZV0pID0+ICEoSlNPTi5zdHJpbmdpZnkoZ3JvdXBLZXkpIGluIHN0YXRlcykpO1xuICAgICAgICB2YXIgbWFwcGVkID0gQXN5bmNJdGVyYXRvci5tYXAoZmlsdGVyZWQsIChbZ3JvdXBLZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gZmlsdGVyKHBhcmVudCwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShncm91cEZuKHZhbHVlLCBrZXkpKS50aGVuKGdrID0+IGdrID09PSBncm91cEtleSkpO1xuICAgICAgICAgICAgcmV0dXJuIFtncm91cEtleSwgc3RhdGVzW0pTT04uc3RyaW5naWZ5KGdyb3VwS2V5KV0gPSBzdGF0ZV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMobWFwcGVkKTtcbiAgICB9XG4gICAgU3RhdGUuZ3JvdXBCeSA9IGdyb3VwQnk7XG4gICAgZnVuY3Rpb24gdW5pcXVlKHBhcmVudCwgdW5pcXVlRm4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IudW5pcXVlKGVudHJpZXMocGFyZW50KSwgKFtrZXksIHZhbHVlXSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHVuaXF1ZUZuKHZhbHVlLCBrZXkpOyB9KSkpO1xuICAgIH1cbiAgICBTdGF0ZS51bmlxdWUgPSB1bmlxdWU7XG4gICAgZnVuY3Rpb24gdW5pb24oc3RhdGUsIG90aGVyLCB1bmlxdWVGbikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci51bmlxdWUoQXN5bmNJdGVyYXRvci5jb25jYXQoZW50cmllcyhzdGF0ZSksIGVudHJpZXMob3RoZXIpKSwgKFtrZXksIHZhbHVlXSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHVuaXF1ZUZuKHZhbHVlLCBrZXkpOyB9KSkpO1xuICAgIH1cbiAgICBTdGF0ZS51bmlvbiA9IHVuaW9uO1xuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4sIHJldmVyc2VLZXlGbikge1xuICAgICAgICBpZiAoIXJldmVyc2VLZXlGbilcbiAgICAgICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHBhcmVudCksIGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleUZuKGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4oa2V5ID0+IFtrZXksIGVudHJ5WzFdXSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQuZ2V0KHlpZWxkIHJldmVyc2VLZXlGbihrZXkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2KGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldiA9IHlpZWxkIHBhcmVudC5wcmV2KHlpZWxkIHJldmVyc2VLZXlGbihrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleUZuKHlpZWxkIHBhcmVudC5nZXQocHJldiksIHByZXYpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0geWllbGQgcGFyZW50Lm5leHQoeWllbGQgcmV2ZXJzZUtleUZuKGtleSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5Rm4oeWllbGQgcGFyZW50LmdldChuZXh0KSwgbmV4dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0YXRlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24gdGFrZShwYXJlbnQsIGNvdW50KSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLnRha2UoZW50cmllcyhwYXJlbnQpLCBjb3VudCkpO1xuICAgIH1cbiAgICBTdGF0ZS50YWtlID0gdGFrZTtcbiAgICBmdW5jdGlvbiBza2lwKHBhcmVudCwgY291bnQpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2tpcChlbnRyaWVzKHBhcmVudCksIGNvdW50KSk7XG4gICAgfVxuICAgIFN0YXRlLnNraXAgPSBza2lwO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkocGFyZW50LCBDYWNoZS5jcmVhdGUoKSk7XG4gICAgfVxuICAgIFN0YXRlLmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24gdW5pdCh2YWx1ZSwga2V5ID0gS2V5LnVuaXF1ZSgpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IGsgPT4gayA9PT0ga2V5ID8gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKSA6IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCksXG4gICAgICAgICAgICBwcmV2OiAoayA9IEtleS5TRU5USU5FTCkgPT4gUHJvbWlzZS5yZXNvbHZlKGsgPT09IEtleS5TRU5USU5FTCA/IGtleSA6IEtleS5TRU5USU5FTCksXG4gICAgICAgICAgICBuZXh0OiAoayA9IEtleS5TRU5USU5FTCkgPT4gUHJvbWlzZS5yZXNvbHZlKGsgPT09IEtleS5TRU5USU5FTCA/IGtleSA6IEtleS5TRU5USU5FTClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3RhdGUudW5pdCA9IHVuaXQ7XG4gICAgZnVuY3Rpb24gZW50cmllcyhzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBLZXkuU0VOVElORUwsIGRvbmUgPSBmYWxzZSwgW2Zyb20sIHRvXSA9IHJhbmdlO1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkb25lID0gdHJ1ZSwgUHJvbWlzZS5yZXNvbHZlKEFzeW5jSXRlcmF0b3IuZG9uZSkpO1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4odmFsdWUgPT4gKGN1cnJlbnQgPSBrZXksIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBba2V5LCB2YWx1ZV0gfSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGl0ZXJhdGUoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiB0by5wcmV2ID09PSBuZXh0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5TRU5USU5FTCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldChuZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5TRU5USU5FTCk7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIGZyb20ubmV4dCA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5TRU5USU5FTCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IGdldChmcm9tLnByZXYpIDogaXRlcmF0ZShmcm9tLm5leHQpO1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiB0by5uZXh0ID09PSBjdXJyZW50KVxuICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgU3RhdGUuZW50cmllcyA9IGVudHJpZXM7XG4gICAgZnVuY3Rpb24ga2V5cyhzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IubWFwKGVudHJpZXMoc3RhdGUsIHJhbmdlKSwgRW50cnkua2V5KTtcbiAgICB9XG4gICAgU3RhdGUua2V5cyA9IGtleXM7XG4gICAgZnVuY3Rpb24gdmFsdWVzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5tYXAoZW50cmllcyhzdGF0ZSwgcmFuZ2UpLCBFbnRyeS52YWx1ZSk7XG4gICAgfVxuICAgIFN0YXRlLnZhbHVlcyA9IHZhbHVlcztcbiAgICBmdW5jdGlvbiBmcm9tRW50cmllcyhpdGVyYXRvcikge1xuICAgICAgICB2YXIgY2FjaGUgPSBDYWNoZS5jcmVhdGUoKSwgZXhoYXVzdGVkID0gZmFsc2UsIGN1cnJlbnRLZXkgPSBLZXkuU0VOVElORUwsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB2YXIgY2FjaGluZ0l0ZXJhdG9yID0ge1xuICAgICAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgY2FjaGUucHJldihLZXkuU0VOVElORUwsIGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgY2FjaGUubmV4dChjdXJyZW50S2V5LCBLZXkuU0VOVElORUwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgW2tleSwgdmFsdWVdID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBjYWNoZS5wcmV2KGtleSwgY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGNhY2hlLm5leHQoY3VycmVudEtleSwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgY2FjaGUuZ2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50S2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IFtrZXksIHZhbHVlXSB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpO1xuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZmluZChjYWNoaW5nSXRlcmF0b3IsIGVudHJ5ID0+IGVudHJ5WzBdID09PSBrZXkpLnRoZW4oRW50cnkudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKTtcbiAgICAgICAgICAgICAgICB5aWVsZCBBc3luY0l0ZXJhdG9yLnNvbWUoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUucHJldihrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuU0VOVElORUwpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCk7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBjdXJyZW50S2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gS2V5LlNFTlRJTkVMIDogcmVzdWx0LnZhbHVlWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KS50aGVuKCgpID0+IGNhY2hpbmdJdGVyYXRvci5uZXh0KCkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gS2V5LlNFTlRJTkVMIDogcmVzdWx0LnZhbHVlWzBdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkoeyBnZXQsIHByZXYsIG5leHQgfSwgY2FjaGUpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tRW50cmllcyA9IGZyb21FbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGZyb21LZXlzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLm1hcChpdGVyYXRvciwga2V5ID0+IFtrZXksIG51bGxdKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21LZXlzID0gZnJvbUtleXM7XG4gICAgZnVuY3Rpb24gZnJvbVZhbHVlcyhpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5zY2FuKGl0ZXJhdG9yLCAocHJldiwgdmFsdWUpID0+IFtwcmV2WzBdICsgMSwgdmFsdWVdLCBbLTEsIG51bGxdKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21WYWx1ZXMgPSBmcm9tVmFsdWVzO1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheSh2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIGZyb21WYWx1ZXMoQXN5bmNJdGVyYXRvci5mcm9tQXJyYXkodmFsdWVzKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiBsYXp5KGZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZSA6IHN0YXRlID0geWllbGQgZm4oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHN0YXRlLmdldChrZXkpIDogcXVldWUudGhlbihjcmVhdGVTdGF0ZSkudGhlbihzID0+IHMuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5wcmV2KGtleSkgOiBxdWV1ZS50aGVuKGNyZWF0ZVN0YXRlKS50aGVuKHMgPT4gcy5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5uZXh0KGtleSkgOiBxdWV1ZS50aGVuKGNyZWF0ZVN0YXRlKS50aGVuKHMgPT4gcy5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5sYXp5ID0gbGF6eTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IudG9PYmplY3QoZW50cmllcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9PYmplY3QgPSB0b09iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci50b0FycmF5KHZhbHVlcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9BcnJheSA9IHRvQXJyYXk7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXAiXX0=

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var core = __webpack_require__(4);
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return (core.JSON && core.JSON.stringify || JSON.stringify).apply(JSON, arguments);
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 5 */
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
	
	module.exports = __webpack_require__(6);
	
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
/* 6 */
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
	
	var _Symbol = __webpack_require__(8)["default"];
	
	var _Object$create = __webpack_require__(38)["default"];
	
	var _Object$setPrototypeOf = __webpack_require__(40)["default"];
	
	var _Promise = __webpack_require__(44)["default"];
	
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(7)))

/***/ },
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(9), __esModule: true };

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(10);
	__webpack_require__(37);
	module.exports = __webpack_require__(4).Symbol;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var $              = __webpack_require__(11)
	  , global         = __webpack_require__(12)
	  , has            = __webpack_require__(13)
	  , DESCRIPTORS    = __webpack_require__(14)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(19)
	  , $fails         = __webpack_require__(15)
	  , shared         = __webpack_require__(22)
	  , setToStringTag = __webpack_require__(23)
	  , uid            = __webpack_require__(25)
	  , wks            = __webpack_require__(24)
	  , keyOf          = __webpack_require__(26)
	  , $names         = __webpack_require__(31)
	  , enumKeys       = __webpack_require__(32)
	  , isArray        = __webpack_require__(33)
	  , anObject       = __webpack_require__(34)
	  , toIObject      = __webpack_require__(27)
	  , createDesc     = __webpack_require__(21)
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
	
	  if(DESCRIPTORS && !__webpack_require__(36)){
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
/* 11 */
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
/* 12 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 13 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , core      = __webpack_require__(4)
	  , ctx       = __webpack_require__(17)
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(18);
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
/* 18 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(11)
	  , createDesc = __webpack_require__(21);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(12)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).setDesc
	  , has = __webpack_require__(13)
	  , TAG = __webpack_require__(24)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(22)('wks')
	  , uid    = __webpack_require__(25)
	  , Symbol = __webpack_require__(12).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $         = __webpack_require__(11)
	  , toIObject = __webpack_require__(27);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = $.getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(28)
	  , defined = __webpack_require__(30);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(29);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(27)
	  , getNames  = __webpack_require__(11).getNames
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var $ = __webpack_require__(11);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(29);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(35);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 37 */
/***/ function(module, exports) {



/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(11);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	module.exports = __webpack_require__(4).Object.setPrototypeOf;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(16);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(43).set});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var getDesc  = __webpack_require__(11).getDesc
	  , isObject = __webpack_require__(35)
	  , anObject = __webpack_require__(34);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(17)(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(45), __esModule: true };

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(46);
	__webpack_require__(52);
	__webpack_require__(56);
	module.exports = __webpack_require__(4).Promise;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(47)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(49)(String, 'String', function(iterated){
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(48)
	  , defined   = __webpack_require__(30);
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
/* 48 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(36)
	  , $export        = __webpack_require__(16)
	  , redefine       = __webpack_require__(19)
	  , hide           = __webpack_require__(20)
	  , has            = __webpack_require__(13)
	  , Iterators      = __webpack_require__(50)
	  , $iterCreate    = __webpack_require__(51)
	  , setToStringTag = __webpack_require__(23)
	  , getProto       = __webpack_require__(11).getProto
	  , ITERATOR       = __webpack_require__(24)('iterator')
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
/* 50 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(11)
	  , descriptor     = __webpack_require__(21)
	  , setToStringTag = __webpack_require__(23)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(20)(IteratorPrototype, __webpack_require__(24)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	var Iterators = __webpack_require__(50);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(54)
	  , step             = __webpack_require__(55)
	  , Iterators        = __webpack_require__(50)
	  , toIObject        = __webpack_require__(27);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(49)(Array, 'Array', function(iterated, kind){
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
/* 54 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $          = __webpack_require__(11)
	  , LIBRARY    = __webpack_require__(36)
	  , global     = __webpack_require__(12)
	  , ctx        = __webpack_require__(17)
	  , classof    = __webpack_require__(57)
	  , $export    = __webpack_require__(16)
	  , isObject   = __webpack_require__(35)
	  , anObject   = __webpack_require__(34)
	  , aFunction  = __webpack_require__(18)
	  , strictNew  = __webpack_require__(58)
	  , forOf      = __webpack_require__(59)
	  , setProto   = __webpack_require__(43).set
	  , same       = __webpack_require__(64)
	  , SPECIES    = __webpack_require__(24)('species')
	  , speciesConstructor = __webpack_require__(65)
	  , asap       = __webpack_require__(66)
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
	    if(works && __webpack_require__(14)){
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
	  __webpack_require__(71)(P.prototype, {
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
	__webpack_require__(23)(P, PROMISE);
	__webpack_require__(72)(PROMISE);
	Wrapper = __webpack_require__(4)[PROMISE];
	
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
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(73)(function(iter){
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(29)
	  , TAG = __webpack_require__(24)('toStringTag')
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
/* 58 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(17)
	  , call        = __webpack_require__(60)
	  , isArrayIter = __webpack_require__(61)
	  , anObject    = __webpack_require__(34)
	  , toLength    = __webpack_require__(62)
	  , getIterFn   = __webpack_require__(63);
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(34);
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(50)
	  , ITERATOR   = __webpack_require__(24)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(48)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(24)('iterator')
	  , Iterators = __webpack_require__(50);
	module.exports = __webpack_require__(4).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(34)
	  , aFunction = __webpack_require__(18)
	  , SPECIES   = __webpack_require__(24)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(12)
	  , macrotask = __webpack_require__(67).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(29)(process) == 'process'
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(17)
	  , invoke             = __webpack_require__(68)
	  , html               = __webpack_require__(69)
	  , cel                = __webpack_require__(70)
	  , global             = __webpack_require__(12)
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
	  if(__webpack_require__(29)(process) == 'process'){
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
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(12).document && document.documentElement;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(35)
	  , document = __webpack_require__(12).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(19);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(4)
	  , $           = __webpack_require__(11)
	  , DESCRIPTORS = __webpack_require__(14)
	  , SPECIES     = __webpack_require__(24)('species');
	
	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(24)('iterator')
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _isIterable2 = __webpack_require__(75);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(78);
	
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(46);
	module.exports = __webpack_require__(77);

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(24)('iterator')
	  , Iterators = __webpack_require__(50);
	module.exports = __webpack_require__(4).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(52);
	__webpack_require__(46);
	module.exports = __webpack_require__(80);

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(34)
	  , get      = __webpack_require__(63);
	module.exports = __webpack_require__(4).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 81 */
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3Qva2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsSUFBSSxHQUFHLENBQUM7QUFDUixDQUFDLFVBQVUsR0FBRyxFQUFFO0FBQ1osUUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLE9BQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLGFBQVMsTUFBTSxHQUFHO0FBQ2QsZUFBTyxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7S0FDN0I7QUFDRCxPQUFHLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUN2QixDQUFBLENBQUUsR0FBRyxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDLENBQUM7a0JBQ1AsR0FBRyIsImZpbGUiOiJrZXkuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgS2V5LlNFTlRJTkVMID0gbnVsbDtcbiAgICBmdW5jdGlvbiB1bmlxdWUoKSB7XG4gICAgICAgIHJldHVybiBcInNfXCIgKyB1bmlxdWVLZXkrKztcbiAgICB9XG4gICAgS2V5LnVuaXF1ZSA9IHVuaXF1ZTtcbn0pKEtleSB8fCAoS2V5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEtleTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtleS5qcy5tYXAiXX0=

/***/ },
/* 82 */
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvZW50cnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBTyxJQUFJLEtBQUssV0FBTCxLQUFLLFlBQUEsQ0FBQztBQUNqQixDQUFDLFVBQVUsS0FBSyxFQUFFO0FBQ2QsYUFBUyxHQUFHLENBQUMsS0FBSyxFQUFFO0FBQ2hCLGVBQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1QjtBQUNELFNBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLGFBQVMsS0FBSyxDQUFDLEtBQUssRUFBRTtBQUNsQixlQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtBQUNELFNBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLGFBQVMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDdEIsZUFBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekQ7QUFDRCxTQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztDQUNqQixDQUFBLENBQUUsS0FBSyxhQWRHLEtBQUssR0FjSCxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztrQkFDWCxLQUFLIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgRW50cnk7XG4oZnVuY3Rpb24gKEVudHJ5KSB7XG4gICAgZnVuY3Rpb24ga2V5KGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeSAmJiBlbnRyeVswXTtcbiAgICB9XG4gICAgRW50cnkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIHZhbHVlKGVudHJ5KSB7XG4gICAgICAgIHJldHVybiBlbnRyeVsxXTtcbiAgICB9XG4gICAgRW50cnkudmFsdWUgPSB2YWx1ZTtcbiAgICBmdW5jdGlvbiBpcyhlbnRyeSwgb3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIGVudHJ5WzBdID09PSBvdGhlclswXSAmJiBlbnRyeVsxXSA9PT0gb3RoZXJbMV07XG4gICAgfVxuICAgIEVudHJ5LmlzID0gaXM7XG59KShFbnRyeSB8fCAoRW50cnkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgRW50cnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnRyeS5qcy5tYXAiXX0=

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Position = exports.Range = undefined;
	
	var _slicedToArray2 = __webpack_require__(74);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _key = __webpack_require__(81);
	
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
	//# sourceMappingURL=data:application/json;base64,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QUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDaEc7QUFDRCxZQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztDQUM5QixDQUFBLENBQUUsUUFBUSxhQWRBLFFBQVEsR0FjSCxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztrQkFDakIsS0FBSyIsImZpbGUiOiJyYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBSYW5nZTtcbihmdW5jdGlvbiAoUmFuZ2UpIHtcbiAgICBSYW5nZS5hbGwgPSBbeyBuZXh0OiBLZXkuU0VOVElORUwgfSwgeyBwcmV2OiBLZXkuU0VOVElORUwgfV07XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShbZnJvbSwgdG9dKSB7XG4gICAgICAgIHJldHVybiBbUG9zaXRpb24ucmV2ZXJzZSh0byksIFBvc2l0aW9uLnJldmVyc2UoZnJvbSldO1xuICAgIH1cbiAgICBSYW5nZS5yZXZlcnNlID0gcmV2ZXJzZTtcbn0pKFJhbmdlIHx8IChSYW5nZSA9IHt9KSk7XG5leHBvcnQgdmFyIFBvc2l0aW9uO1xuKGZ1bmN0aW9uIChQb3NpdGlvbikge1xuICAgIGZ1bmN0aW9uIGlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAncHJldicgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uID0gaXNQcmV2UG9zaXRpb247XG4gICAgZnVuY3Rpb24gaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICduZXh0JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24gPSBpc05leHRQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikgPyB7IG5leHQ6IHBvc2l0aW9uLnByZXYgfSA6IHsgcHJldjogcG9zaXRpb24ubmV4dCB9O1xuICAgIH1cbiAgICBQb3NpdGlvbi5yZXZlcnNlID0gcmV2ZXJzZTtcbn0pKFBvc2l0aW9uIHx8IChQb3NpdGlvbiA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBSYW5nZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcCJdfQ==

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Cache = undefined;
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _create = __webpack_require__(38);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _key = __webpack_require__(81);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _exceptions = __webpack_require__(85);
	
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
	    var NONE = {};
	    function create() {
	        var cache = {
	            get: (0, _create2.default)(null),
	            prev: (0, _create2.default)(null),
	            next: (0, _create2.default)(null)
	        };
	        function get(key) {
	            var value = arguments.length <= 1 || arguments[1] === undefined ? NONE : arguments[1];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
	                var string;
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                string = (0, _stringify2.default)(key);
	
	                                if (!(value === NONE)) {
	                                    _context.next = 5;
	                                    break;
	                                }
	
	                                if (string in cache.get) {
	                                    _context.next = 4;
	                                    break;
	                                }
	
	                                throw new _exceptions.NotFound();
	
	                            case 4:
	                                return _context.abrupt("return", cache.get[string]);
	
	                            case 5:
	                                return _context.abrupt("return", cache.get[string] = _promise2.default.resolve(value));
	
	                            case 6:
	                            case "end":
	                                return _context.stop();
	                        }
	                    }
	                }, _callee, this);
	            }));
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	            var prevKey = arguments.length <= 1 || arguments[1] === undefined ? NONE : arguments[1];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
	                var string;
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                string = (0, _stringify2.default)(key);
	
	                                if (!(prevKey === NONE)) {
	                                    _context2.next = 5;
	                                    break;
	                                }
	
	                                if (string in cache.prev) {
	                                    _context2.next = 4;
	                                    break;
	                                }
	
	                                throw new _exceptions.NotFound();
	
	                            case 4:
	                                return _context2.abrupt("return", cache.prev[string]);
	
	                            case 5:
	                                return _context2.abrupt("return", cache.prev[string] = _promise2.default.resolve(prevKey));
	
	                            case 6:
	                            case "end":
	                                return _context2.stop();
	                        }
	                    }
	                }, _callee2, this);
	            }));
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	            var nextKey = arguments.length <= 1 || arguments[1] === undefined ? NONE : arguments[1];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
	                var string;
	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                string = (0, _stringify2.default)(key);
	
	                                if (!(nextKey === NONE)) {
	                                    _context3.next = 5;
	                                    break;
	                                }
	
	                                if (string in cache.next) {
	                                    _context3.next = 4;
	                                    break;
	                                }
	
	                                return _context3.abrupt("return", _promise2.default.reject(new _exceptions.NotFound()));
	
	                            case 4:
	                                return _context3.abrupt("return", cache.next[string]);
	
	                            case 5:
	                                return _context3.abrupt("return", cache.next[string] = _promise2.default.resolve(nextKey));
	
	                            case 6:
	                            case "end":
	                                return _context3.stop();
	                        }
	                    }
	                }, _callee3, this);
	            }));
	        }
	        return { get: get, prev: prev, next: next };
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
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
	                return _regenerator2.default.wrap(function _callee4$(_context4) {
	                    while (1) {
	                        switch (_context4.prev = _context4.next) {
	                            case 0:
	                                return _context4.abrupt("return", cache.get(key).catch(function (reason) {
	                                    if (reason instanceof _exceptions.NotFound) return cache.get(key, state.get(key));
	                                    throw reason;
	                                }));
	
	                            case 1:
	                            case "end":
	                                return _context4.stop();
	                        }
	                    }
	                }, _callee4, this);
	            }));
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                return _context5.abrupt("return", cache.prev(key).catch(function (reason) {
	                                    if (reason instanceof _exceptions.NotFound) return cache.prev(key, state.prev(key));
	                                    throw reason;
	                                }));
	
	                            case 1:
	                            case "end":
	                                return _context5.stop();
	                        }
	                    }
	                }, _callee5, this);
	            }));
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2.default.SENTINEL : arguments[0];
	
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
	                return _regenerator2.default.wrap(function _callee6$(_context6) {
	                    while (1) {
	                        switch (_context6.prev = _context6.next) {
	                            case 0:
	                                return _context6.abrupt("return", cache.next(key).catch(function (reason) {
	                                    if (reason instanceof _exceptions.NotFound) return cache.next(key, state.next(key));
	                                    throw reason;
	                                }));
	
	                            case 1:
	                            case "end":
	                                return _context6.stop();
	                        }
	                    }
	                }, _callee6, this);
	            }));
	        }
	        return { get: get, prev: prev, next: next };
	    }
	    Cache.apply = apply;
	})(Cache || (exports.Cache = Cache = {}));
	exports.default = Cache;
	//# sourceMappingURL=cache.js.map
	//# sourceMappingURL=data:application/json;base64,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QVMsSUFBSSxHQUFxQjtnQkFBcEIsR0FBRyx5REFBRyxjQUFJLFFBQVE7O0FBQzVCLG1CQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLGdEQUFXOzs7OztrRUFDN0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDbkMsd0NBQUksTUFBTSx3QkE1RXJCLFFBQVEsQUE0RWlDLEVBQzFCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzVDLDBDQUFNLE1BQU0sQ0FBQztpQ0FDaEIsQ0FBQzs7Ozs7Ozs7YUFDTCxFQUFDLENBQUM7U0FDTjtBQUNELGVBQU8sRUFBRSxHQUFHLEVBQUgsR0FBRyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsSUFBSSxFQUFKLElBQUksRUFBRSxDQUFDO0tBQzlCO0FBQ0QsU0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Q0FDdkIsQ0FBQSxDQUFFLEtBQUssYUFwRkcsS0FBSyxHQW9GSCxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztrQkFDWCxLQUFLIiwiZmlsZSI6ImNhY2hlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgeyBOb3RGb3VuZCB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5leHBvcnQgdmFyIENhY2hlO1xuKGZ1bmN0aW9uIChDYWNoZSkge1xuICAgIGNvbnN0IE5PTkUgPSB7fTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXksIHZhbHVlID0gTk9ORSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBOT05FKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHN0cmluZyBpbiBjYWNoZS5nZXQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUuZ2V0W3N0cmluZ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5nZXRbc3RyaW5nXSA9IFByb21pc2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5TRU5USU5FTCwgcHJldktleSA9IE5PTkUpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShrZXkpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2S2V5ID09PSBOT05FKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHN0cmluZyBpbiBjYWNoZS5wcmV2KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnByZXZbc3RyaW5nXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnByZXZbc3RyaW5nXSA9IFByb21pc2UucmVzb2x2ZShwcmV2S2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LlNFTlRJTkVMLCBuZXh0S2V5ID0gTk9ORSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRLZXkgPT09IE5PTkUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoc3RyaW5nIGluIGNhY2hlLm5leHQpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5uZXh0W3N0cmluZ107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5uZXh0W3N0cmluZ10gPSBQcm9taXNlLnJlc29sdmUobmV4dEtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgQ2FjaGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGV4dGVuZChjYWNoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gYXBwbHkoc3RhdGUsIGNhY2hlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uIGluc3RhbmNlb2YgTm90Rm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSwgc3RhdGUuZ2V0KGtleSkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZWFzb247XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5TRU5USU5FTCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnByZXYoa2V5KS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uIGluc3RhbmNlb2YgTm90Rm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUucHJldihrZXksIHN0YXRlLnByZXYoa2V5KSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGUubmV4dChrZXkpLmNhdGNoKHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFzb24gaW5zdGFuY2VvZiBOb3RGb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5uZXh0KGtleSwgc3RhdGUubmV4dChrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIENhY2hlLmFwcGx5ID0gYXBwbHk7XG59KShDYWNoZSB8fCAoQ2FjaGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQ2FjaGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jYWNoZS5qcy5tYXAiXX0=

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.NotFound = undefined;
	
	var _classCallCheck2 = __webpack_require__(86);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NotFound = exports.NotFound = function NotFound() {
	  (0, _classCallCheck3.default)(this, NotFound);
	};
	
	;
	//# sourceMappingURL=exceptions.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvZXhjZXB0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBQWEsUUFBUSxXQUFSLFFBQVEsWUFBUixRQUFRO3NDQUFSLFFBQVE7OztBQUVyQjs7QUFBQyIsImZpbGUiOiJleGNlcHRpb25zLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOb3RGb3VuZCB7XG59XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGNlcHRpb25zLmpzLm1hcCJdfQ==

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	
	exports.__esModule = true;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsyncIterator = undefined;
	
	var _slicedToArray2 = __webpack_require__(74);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _keys = __webpack_require__(88);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _create = __webpack_require__(38);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _exceptions = __webpack_require__(85);
	
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
	        return create(next);
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
	        return create(next);
	    }
	    AsyncIterator.scan = scan;
	    function zip(iterator, other) {
	        var zipFn = arguments.length <= 2 || arguments[2] === undefined ? function (t, u) {
	            return [t, u];
	        } : arguments[2];
	
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
	                                _context16.next = 12;
	                                return zipFn(result.value, otherResult.value);
	
	                            case 12:
	                                _context16.t0 = _context16.sent;
	                                return _context16.abrupt("return", {
	                                    done: false,
	                                    value: _context16.t0
	                                });
	
	                            case 14:
	                            case "end":
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
	                                return _context18.abrupt("return", iterator.next());
	
	                            case 4:
	                            case "end":
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
	            return __awaiter(_this6, void 0, _promise2.default, _regenerator2.default.mark(function _callee19() {
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
	                                return _context19.abrupt("return", !cache[u] || (cache[u] = true));
	
	                            case 5:
	                            case "end":
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
	                return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee20() {
	                    var result;
	                    return _regenerator2.default.wrap(function _callee20$(_context20) {
	                        while (1) {
	                            switch (_context20.prev = _context20.next) {
	                                case 0:
	                                    if (!iterated) {
	                                        _context20.next = 2;
	                                        break;
	                                    }
	
	                                    return _context20.abrupt("return", iterator.next());
	
	                                case 2:
	                                    _context20.next = 4;
	                                    return memo.next();
	
	                                case 4:
	                                    result = _context20.sent;
	
	                                    if (result.done) {
	                                        _context20.next = 7;
	                                        break;
	                                    }
	
	                                    return _context20.abrupt("return", result);
	
	                                case 7:
	                                    iterated = true;
	                                    return _context20.abrupt("return", iterator.next());
	
	                                case 9:
	                                case "end":
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
	            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee21() {
	                return _regenerator2.default.wrap(function _callee21$(_context21) {
	                    while (1) {
	                        switch (_context21.prev = _context21.next) {
	                            case 0:
	                                return _context21.abrupt("return", ++current >= array.length ? AsyncIterator.done : { done: false, value: array[current] });
	
	                            case 1:
	                            case "end":
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
	//# sourceMappingURL=data:application/json;base64,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QyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUM7YUFDbkM7U0FDSixDQUFDO0tBQ0w7QUFDRCxpQkFBYSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDakMsQ0FBQSxDQUFFLGFBQWEsYUFyTkwsYUFBYSxHQXFOSCxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztrQkFDM0IsYUFBYSIsImZpbGUiOiJhc3luY19pdGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IE5vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb25zJztcbmV4cG9ydCB2YXIgQXN5bmNJdGVyYXRvcjtcbihmdW5jdGlvbiAoQXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jSXRlcmF0b3IuZG9uZSA9IHsgZG9uZTogdHJ1ZSB9O1xuICAgIEFzeW5jSXRlcmF0b3IuRW1wdHkgPSB7XG4gICAgICAgIG5leHQ6ICgpID0+IFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLmRvbmUpXG4gICAgfTtcbiAgICBmdW5jdGlvbiBldmVyeShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHdoaWxlICgocmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoISh5aWVsZCBwcmVkaWNhdGUocmVzdWx0LnZhbHVlKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5ldmVyeSA9IGV2ZXJ5O1xuICAgIGZ1bmN0aW9uIHNvbWUoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhKHlpZWxkIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiAhKHlpZWxkIHByZWRpY2F0ZSh2YWx1ZSkpOyB9KSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zb21lID0gc29tZTtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKGl0ZXJhdG9yLCBmbikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7IGZuKHZhbHVlKTsgcmV0dXJuIHRydWU7IH0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gcmVkdWNlKGl0ZXJhdG9yLCBmbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIGZvckVhY2goaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgbWVtbyA9IHlpZWxkIGZuKG1lbW8sIHZhbHVlKTsgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnJlZHVjZSA9IHJlZHVjZTtcbiAgICBmdW5jdGlvbiBmaW5kKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgaWYgKHlpZWxkIHNvbWUoaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgcmV0dXJuICEoeWllbGQgcHJlZGljYXRlKHZhbHVlKSkgPyBmYWxzZSA6IChyZXN1bHQgPSB2YWx1ZSwgdHJ1ZSk7IH0pKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbmQgPSBmaW5kO1xuICAgIGZ1bmN0aW9uIGluZGV4T2YoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBpZiAoeWllbGQgc29tZShpdGVyYXRvciwgdiA9PiAoaW5kZXgrKywgdmFsdWUgPT0gdikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pbmRleE9mID0gaW5kZXhPZjtcbiAgICBmdW5jdGlvbiBhdChpdGVyYXRvciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZpbmQoaXRlcmF0b3IsICgpID0+IDAgPT09IGluZGV4LS0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmF0ID0gYXQ7XG4gICAgZnVuY3Rpb24gc2l6ZShpdGVyYXRvcikge1xuICAgICAgICB2YXIgY291bnQgPSAtMTtcbiAgICAgICAgcmV0dXJuIGZvckVhY2goaXRlcmF0b3IsICgpID0+IHsgY291bnQrKzsgfSkudGhlbigoKSA9PiBjb3VudCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc2l6ZSA9IHNpemU7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoaXRlcmF0b3IsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb250YWlucyA9IGNvbnRhaW5zO1xuICAgIGZ1bmN0aW9uIGlzKGl0ZXJhdG9yLCBvdGhlciwgZXF1YWxzID0gKGEsIGIpID0+IGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKHlpZWxkIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIG90aGVyLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXJlc3VsdC5kb25lICYmIGVxdWFscyh2YWx1ZSwgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pKSkgJiYgKHlpZWxkIG90aGVyLm5leHQoKSkuZG9uZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBtYXAoaXRlcmF0b3IsIG1hcEZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IEFzeW5jSXRlcmF0b3IuZG9uZSA6IHsgZG9uZTogZmFsc2UsIHZhbHVlOiB5aWVsZCBtYXBGbihyZXN1bHQudmFsdWUpIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIoaXRlcmF0b3IsIGZpbHRlckZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICBpZiAoeWllbGQgZmlsdGVyRm4ocmVzdWx0LnZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gc2NhbihpdGVyYXRvciwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICBtZW1vID0geWllbGQgc2NhbkZuKG1lbW8sIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBtZW1vIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHppcChpdGVyYXRvciwgb3RoZXIsIHppcEZuID0gKHQsIHUpID0+IFt0LCB1XSkge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICAgICAgdmFyIG90aGVyUmVzdWx0ID0geWllbGQgb3RoZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlclJlc3VsdC5kb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5kb25lO1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogeWllbGQgemlwRm4ocmVzdWx0LnZhbHVlLCBvdGhlclJlc3VsdC52YWx1ZSkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuemlwID0gemlwO1xuICAgIGZ1bmN0aW9uIHRha2UoaXRlcmF0b3IsIGNvdW50KSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiArK2kgPiBjb3VudCA/IEFzeW5jSXRlcmF0b3IuZG9uZSA6IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudGFrZSA9IHRha2U7XG4gICAgZnVuY3Rpb24gc2tpcChpdGVyYXRvciwgY291bnQpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBjb3VudClcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgc29tZShpdGVyYXRvciwgKCkgPT4gKytpID49IGNvdW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5za2lwID0gc2tpcDtcbiAgICBmdW5jdGlvbiB1bmlxdWUoaXRlcmF0b3IsIHVuaXF1ZUZuKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbHRlcihpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHUgPSBKU09OLnN0cmluZ2lmeSh5aWVsZCB1bmlxdWVGbih2YWx1ZSkpO1xuICAgICAgICAgICAgcmV0dXJuICghY2FjaGVbdV0pIHx8IChjYWNoZVt1XSA9IHRydWUpO1xuICAgICAgICB9KSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudW5pcXVlID0gdW5pcXVlO1xuICAgIGZ1bmN0aW9uIGNvbmNhdCguLi5pdGVyYXRvcnMpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9ycy5yZWR1Y2UoKG1lbW8sIGl0ZXJhdG9yKSA9PiB7XG4gICAgICAgICAgICB2YXIgaXRlcmF0ZWQgPSBmYWxzZSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgbWVtby5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgICAgICB9LCBBc3luY0l0ZXJhdG9yLkVtcHR5KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb25jYXQgPSBjb25jYXQ7XG4gICAgZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gLTEsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICsrY3VycmVudCA+PSBhcnJheS5sZW5ndGggPyBBc3luY0l0ZXJhdG9yLmRvbmUgOiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogYXJyYXlbY3VycmVudF0gfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmcm9tQXJyYXkoT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoa2V5ID0+IFtrZXksIG9iamVjdFtrZXldXSkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlKSA9PiAobWVtby5wdXNoKHZhbHVlKSwgbWVtbyksIFtdKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgW2tleSwgdmFsdWVdKSA9PiAobWVtb1trZXldID0gdmFsdWUsIG1lbW8pLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b09iamVjdCA9IHRvT2JqZWN0O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShuZXh0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbihuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jcmVhdGUgPSBjcmVhdGU7XG59KShBc3luY0l0ZXJhdG9yIHx8IChBc3luY0l0ZXJhdG9yID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEFzeW5jSXRlcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3luY19pdGVyYXRvci5qcy5tYXAiXX0=

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(90);
	module.exports = __webpack_require__(4).Object.keys;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(91);
	
	__webpack_require__(92)('keys', function($keys){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(30);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(16)
	  , core    = __webpack_require__(4)
	  , fails   = __webpack_require__(15);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tree = exports.Path = undefined;
	
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
	    function head(path) {
	        return path ? path[0] : null;
	    }
	    Path.head = head;
	    function tail(path) {
	        return path ? path[1] : null;
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
	        var head = Path.head(path),
	            tail = Path.tail(path),
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
	//# sourceMappingURL=data:application/json;base64,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LENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTthQUFBLENBQUM7U0FBQSxDQUFDLENBQUM7S0FDekg7QUFDRCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNwQixDQUFBLENBQUUsSUFBSSxhQXpCSSxJQUFJLEdBeUJILElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2tCQUNULElBQUkiLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmV4cG9ydCB2YXIgUGF0aDtcbihmdW5jdGlvbiAoUGF0aCkge1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIHRhaWwocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMV0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLnRhaWwgPSB0YWlsO1xufSkoUGF0aCB8fCAoUGF0aCA9IHt9KSk7XG5leHBvcnQgdmFyIFRyZWU7XG4oZnVuY3Rpb24gKFRyZWUpIHtcbiAgICBmdW5jdGlvbiBnZXQodHJlZSwgcGF0aCkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKTtcbiAgICAgICAgcmV0dXJuIHRyZWUuZ2V0KGhlYWQpLnRoZW4oc3RhdGUgPT4gc3RhdGUuZ2V0KHRhaWwpKTtcbiAgICB9XG4gICAgVHJlZS5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gcHJldih0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpLCBwcmV2cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUucHJldigpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5wcmV2KCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCksIG5leHRzID0gU3RhdGUuZmlsdGVyKFN0YXRlLm1hcCh0cmVlLCBzdGF0ZSA9PiBzdGF0ZS5uZXh0KCkpLCBmaXJzdCA9PiBmaXJzdCAhPSBudWxsKSwgcGF0aHMgPSBTdGF0ZS5tYXAobmV4dHMsIChmaXJzdCwga2V5KSA9PiBba2V5LCBmaXJzdF0pO1xuICAgICAgICBpZiAoaGVhZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gcGF0aHMuZ2V0KG5leHQpIDogbnVsbCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKVxuICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gc3RhdGUubmV4dCh0YWlsKSlcbiAgICAgICAgICAgIC50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gW2hlYWQsIG5leHRdIDogcGF0aHMubmV4dChoZWFkKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gcGF0aHMuZ2V0KG5leHQpIDogbnVsbCkpO1xuICAgIH1cbiAgICBUcmVlLm5leHQgPSBuZXh0O1xufSkoVHJlZSB8fCAoVHJlZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBUcmVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZS5qcy5tYXAiXX0=

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Store = undefined;
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(74);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(81);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _patch = __webpack_require__(95);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _state = __webpack_require__(1);
	
	var _state2 = _interopRequireDefault(_state);
	
	var _range = __webpack_require__(83);
	
	var _tree = __webpack_require__(93);
	
	var _observable = __webpack_require__(96);
	
	var _async_iterator = __webpack_require__(87);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
	var _exceptions = __webpack_require__(85);
	
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
	    function reverse(parent) {
	        var state = _state2.default.reverse(parent.state),
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: _range.Range.reverse(patch.range),
	                added: patch.added ? _state2.default.reverse(patch.added) : undefined
	            };
	        });
	        return create(state, dispatcher);
	    }
	    Store.reverse = reverse;
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
	
	                                return _context.abrupt("return", _key2.default.SENTINEL);
	
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
	                                if (!(position.next === _key2.default.SENTINEL)) {
	                                    _context2.next = 11;
	                                    break;
	                                }
	
	                                return _context2.abrupt("return", { next: _key2.default.SENTINEL });
	
	                            case 11:
	                                _context2.next = 13;
	                                return find(state, [position, { next: _key2.default.SENTINEL }]);
	
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
	            return _state2.default.has(_state2.default.slice(parentState, patch.range), key);
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
	        return create(state, dispatcher_);
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
	            return __awaiter(_this2, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
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
	
	                                                        return _context4.abrupt("return", { prev: _key2.default.SENTINEL });
	
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
	                                                        return _context4.abrupt("return", {
	                                                            prev: _context4.t2
	                                                        });
	
	                                                    case 13:
	                                                        if (!(position.next === _key2.default.SENTINEL)) {
	                                                            _context4.next = 15;
	                                                            break;
	                                                        }
	
	                                                        return _context4.abrupt("return", { next: _key2.default.SENTINEL });
	
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
	                                                        return _context4.abrupt("return", {
	                                                            next: _context4.t5
	                                                        });
	
	                                                    case 23:
	                                                    case "end":
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
	                                return _context5.abrupt("return", { range: range, added: patch.added ? _state2.default.keyBy(patch.added, keyFn) : undefined });
	
	                            case 9:
	                            case "end":
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
	
	        var store,
	            state = _state2.default.scan(parent.state, scanFn, memo),
	            dispatcher = _observable.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this3, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
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
	                                    return __awaiter(_this4, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
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
	                                                        return _context6.abrupt("return", _context6.t0.scan.call(_context6.t0, _context6.t1, _context6.t2, _context6.t4));
	
	                                                    case 15:
	                                                    case "end":
	                                                        return _context6.stop();
	                                                }
	                                            }
	                                        }, _callee6, this);
	                                    }));
	                                });
	                                return _context7.abrupt("return", { range: [from, { prev: null }], added: added });
	
	                            case 7:
	                            case "end":
	                                return _context7.stop();
	                        }
	                    }
	                }, _callee7, this);
	            }));
	        });
	        return store = create(state, dispatcher);
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
	            return __awaiter(_this5, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
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
	                                return _context8.abrupt("return", {
	                                    range: patch.range,
	                                    added: _state2.default.take(_state2.default.map(patch.added, function (_ref7) {
	                                        var _ref8 = (0, _slicedToArray3.default)(_ref7, 2);
	
	                                        var index = _ref8[0];
	                                        var value = _ref8[1];
	                                        return value;
	                                    }), count - (index + 1))
	                                });
	
	                            case 16:
	                            case "end":
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
	        var _this6 = this;
	
	        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _patch2.default.apply : arguments[2];
	
	        var subject = _observable.Subject.create();
	        var statePatches = _observable.Observable.scan(dispatcher, function (_ref9, patch) {
	            var _ref10 = (0, _slicedToArray3.default)(_ref9, 1);
	
	            var state = _ref10[0];
	            return __awaiter(_this6, void 0, _promise2.default, _regenerator2.default.mark(function _callee9() {
	                return _regenerator2.default.wrap(function _callee9$(_context9) {
	                    while (1) {
	                        switch (_context9.prev = _context9.next) {
	                            case 0:
	                                _context9.next = 2;
	                                return reducer(state, patch);
	
	                            case 2:
	                                _context9.t0 = _context9.sent;
	                                _context9.t1 = patch;
	                                return _context9.abrupt("return", [_context9.t0, _context9.t1]);
	
	                            case 5:
	                            case "end":
	                                return _context9.stop();
	                        }
	                    }
	                }, _callee9, this);
	            }));
	        }, [state, null]);
	        _observable.Observable.forEach(statePatches, function (_ref11) {
	            var _ref12 = (0, _slicedToArray3.default)(_ref11, 2);
	
	            var state = _ref12[0];
	            var patch = _ref12[1];
	
	            store.state = state;
	            return subject.onNext(patch);
	        });
	        var store = { state: state, dispatcher: { subscribe: subject.subscribe, onNext: _observable.Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined } };
	        return store;
	    }
	    Store.create = create;
	})(Store || (exports.Store = Store = {}));
	exports.default = Store;
	//# sourceMappingURL=store.js.map
	//# sourceMappingURL=data:application/json;base64,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QUs7Ozs7Ozs7OzthQUFJLEVBQUM7U0FBQSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDbkwsb0JBekxDLFVBQVUsQ0F5TEEsT0FBTyxDQUFDLFlBQVksRUFBRSxrQkFBb0I7OztnQkFBbEIsS0FBSztnQkFBRSxLQUFLOztBQUMzQyxpQkFBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDcEIsbUJBQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQyxDQUFDLENBQUM7QUFDSCxZQUFJLEtBQUssR0FBRyxFQUFFLEtBQUssRUFBTCxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFlBN0w1RCxPQUFPLENBNkw2RCxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUUsRUFBRSxDQUFDO0FBQzNJLGVBQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0QsU0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Q0FDekIsQ0FBQSxDQUFFLEtBQUssYUE5TEcsS0FBSyxHQThMSCxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztrQkFDWCxLQUFLIiwiZmlsZSI6InN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBSYW5nZSwgUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7IFRyZWUgfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IE5vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb25zJztcbmV4cG9ydCB2YXIgU3RvcmU7XG4oZnVuY3Rpb24gKFN0b3JlKSB7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUucmV2ZXJzZShwYXJlbnQuc3RhdGUpLCBkaXNwYXRjaGVyID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LmRpc3BhdGNoZXIsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogUmFuZ2UucmV2ZXJzZShwYXRjaC5yYW5nZSksXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5yZXZlcnNlKHBhdGNoLmFkZGVkKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIGRpc3BhdGNoZXIpO1xuICAgIH1cbiAgICBTdG9yZS5yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5tYXAocGFyZW50LnN0YXRlLCBtYXBGbiksIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4gKHtcbiAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbWFwRm4pIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgIGZ1bmN0aW9uIGZpbmQoc3RhdGUsIHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgW2tleV0gPSB5aWVsZCBBc3luY0l0ZXJhdG9yLmZpbmQoU3RhdGUuZW50cmllcyhzdGF0ZSwgcmFuZ2UpLCAoW2tleSwgdmFsdWVdKSA9PiBmaWx0ZXJGbih2YWx1ZSwga2V5KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RGb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBLZXkuU0VOVElORUw7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoc3RhdGUsIHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVsZXRlZCA9IFN0YXRlLnNsaWNlKFN0YXRlLnJldmVyc2Uoc3RhdGUpLCBSYW5nZS5yZXZlcnNlKHJhbmdlKSksIHBvc2l0aW9uID0gcmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISh5aWVsZCBTdGF0ZS5lbXB0eShkZWxldGVkKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBuZXh0OiB5aWVsZCBmaW5kKGRlbGV0ZWQsIFJhbmdlLmFsbCkgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IEtleS5TRU5USU5FTCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBwcmV2OiB5aWVsZCBmaW5kKHN0YXRlLCBbcG9zaXRpb24sIHsgbmV4dDogS2V5LlNFTlRJTkVMIH1dKSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gKHlpZWxkIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBtb3ZlKFN0YXRlLnJldmVyc2UocGFyZW50U3RhdGUpLCBSYW5nZS5yZXZlcnNlKHBhdGNoLnJhbmdlKSkudGhlbihQb3NpdGlvbi5yZXZlcnNlKSxcbiAgICAgICAgICAgICAgICBtb3ZlKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSlcbiAgICAgICAgICAgIF0pKTtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmlsdGVyKHBhdGNoLmFkZGVkLCBmaWx0ZXJGbikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbiksIGRpc3BhdGNoZXIpO1xuICAgIH1cbiAgICBTdG9yZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIHN0YXRlID0gU3RhdGUuem9vbShwYXJlbnQuc3RhdGUsIGtleSksIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChPYnNlcnZhYmxlLmZpbHRlcihwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4gU3RhdGUuaGFzKFN0YXRlLnNsaWNlKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSksIGtleSkpLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IFJhbmdlLmFsbCxcbiAgICAgICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS56b29tKHBhdGNoLmFkZGVkLCBrZXkpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBkaXNwYXRjaGVyXyA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIHZhciBwYXJlbnRfID0gY2FjaGUobWFwKHBhcmVudCwgKChzdG9yZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLm1hcChzdG9yZS5kaXNwYXRjaGVyLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBwYXRjaC5yYW5nZVswXSwgdG8gPSBwYXRjaC5yYW5nZVsxXTtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnByZXYgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZS5zdGF0ZS5wcmV2KEtleS5TRU5USU5FTCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFtrZXksIG5leHRdIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHByZXY6IFtrZXksIHBvc2l0aW9uLnByZXZdIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdG9yZS5zdGF0ZS5uZXh0KEtleS5TRU5USU5FTCkudGhlbihwcmV2ID0+ICh7IHByZXY6IFtrZXksIHByZXZdIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IFtrZXksIHBvc2l0aW9uLm5leHRdIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBwYXRjaC5hZGRlZCA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoZGlzcGF0Y2hlcl8pO1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlO1xuICAgICAgICB9KSkpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgdmFyIGZyb20gPSBwYXRjaC5yYW5nZVswXSwgdG8gPSBwYXRjaC5yYW5nZVsxXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5wcmV2ID09PSBLZXkuU0VOVElORUwgPyBQcm9taXNlLnJlc29sdmUoeyBwcmV2OiBLZXkuU0VOVElORUwgfSkgOiBUcmVlLm5leHQocGFyZW50Xy5zdGF0ZSwgW3Bvc2l0aW9uLnByZXYsIG51bGxdKS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0gS2V5LlNFTlRJTkVMID8gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogS2V5LlNFTlRJTkVMIH0pIDogVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0LCBudWxsXSkudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7IHJhbmdlOiByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmxhdHRlbihTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIHN0b3JlID0+IHN0b3JlLnN0YXRlKSkgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICB9KS5zdWJzY3JpYmUoZGlzcGF0Y2hlcl8pO1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mbGF0dGVuKHBhcmVudF8uc3RhdGUpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBkaXNwYXRjaGVyXyk7XG4gICAgfVxuICAgIFN0b3JlLmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGZsYXRNYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICByZXR1cm4gU3RvcmUuZmxhdHRlbihTdG9yZS5tYXAocGFyZW50LCBtYXBGbikpO1xuICAgIH1cbiAgICBTdG9yZS5mbGF0TWFwID0gZmxhdE1hcDtcbiAgICBmdW5jdGlvbiBrZXlCeShwYXJlbnQsIGtleUZuLCByZXZlcnNlS2V5Rm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUua2V5QnkocGFyZW50LnN0YXRlLCBrZXlGbiwgcmV2ZXJzZUtleUZuKSwgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIFtmcm9tLCB0b10gPSBwYXRjaC5yYW5nZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgcHJldjogS2V5LlNFTlRJTkVMIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBwcmV2OiB5aWVsZCBrZXlGbih5aWVsZCBwYXJlbnRTdGF0ZS5nZXQocG9zaXRpb24ucHJldiksIHBvc2l0aW9uLnByZXYpIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IEtleS5TRU5USU5FTCB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmV4dDogeWllbGQga2V5Rm4oeWllbGQgcGFyZW50U3RhdGUuZ2V0KHBvc2l0aW9uLm5leHQpLCBwb3NpdGlvbi5uZXh0KSB9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSAoeWllbGQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIG1hcFBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIG1hcFBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUua2V5QnkocGF0Y2guYWRkZWQsIGtleUZuKSA6IHVuZGVmaW5lZCB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIGRpc3BhdGNoZXIpO1xuICAgIH1cbiAgICBTdG9yZS5rZXlCeSA9IGtleUJ5O1xuICAgIGZ1bmN0aW9uIHNjYW4ocGFyZW50LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHN0b3JlLCBzdGF0ZSA9IFN0YXRlLnNjYW4ocGFyZW50LnN0YXRlLCBzY2FuRm4sIG1lbW8pLCBkaXNwYXRjaGVyID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LmRpc3BhdGNoZXIsIChwYXRjaCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgc3RvcmVTdGF0ZSA9IHN0b3JlLnN0YXRlLCBbZnJvbSwgdG9dID0gcGF0Y2gucmFuZ2U7XG4gICAgICAgICAgICB2YXIgYWRkZWQgPSBTdGF0ZS5sYXp5KCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSB5aWVsZCBTdGF0ZS5sYXN0KHN0b3JlU3RhdGUsIFt7IG5leHQ6IG51bGwgfSwgZnJvbV0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBTdGF0ZS5zY2FuKFN0YXRlLnNsaWNlKHBhcmVudFN0YXRlLCBbeyBuZXh0OiBsYXN0IH0sIHsgcHJldjogbnVsbCB9XSksIHNjYW5GbiwgbGFzdCAhPT0gS2V5LlNFTlRJTkVMID8geWllbGQgc3RvcmVTdGF0ZS5nZXQobGFzdCkgOiBtZW1vKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBbZnJvbSwgeyBwcmV2OiBudWxsIH1dLCBhZGRlZCB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBzdG9yZSA9IGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHRha2UocGFyZW50LCBjb3VudCkge1xuICAgICAgICB2YXIgc3RvcmUsIHN0YXRlID0gU3RhdGUudGFrZShwYXJlbnQuc3RhdGUsIGNvdW50KTtcbiAgICAgICAgdmFyIGluZGV4ZWQgPSBTdG9yZS5zY2FuKHBhcmVudCwgKFtpbmRleF0sIHZhbHVlKSA9PiBbaW5kZXggKyAxLCB2YWx1ZV0sIFstMSwgbnVsbF0pO1xuICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IE9ic2VydmFibGUubWFwKGluZGV4ZWQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIFtmcm9tXSA9IHBhdGNoLnJhbmdlLCBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgaW5kZXhlZFN0YXRlID0gaW5kZXhlZC5zdGF0ZTtcbiAgICAgICAgICAgIHZhciBrZXkgPSB5aWVsZCBTdGF0ZS5sYXN0KGluZGV4ZWRTdGF0ZSwgW3sgbmV4dDogbnVsbCB9LCBmcm9tXSk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBrZXkgPT09IEtleS5TRU5USU5FTCA/IC0xIDogKHlpZWxkIGluZGV4ZWRTdGF0ZS5nZXQoa2V5KSlbMF07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDogU3RhdGUudGFrZShTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIChbaW5kZXgsIHZhbHVlXSkgPT4gdmFsdWUpLCBjb3VudCAtIChpbmRleCArIDEpKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBkaXNwYXRjaGVyKTtcbiAgICB9XG4gICAgU3RvcmUudGFrZSA9IHRha2U7XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4gKHtcbiAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLmNhY2hlKHBhdGNoLmFkZGVkKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBTdG9yZS5jcmVhdGUoc3RhdGUsIGRpc3BhdGNoZXIpO1xuICAgIH1cbiAgICBTdG9yZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIHN0YXRlcyhzdG9yZSkge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5tYXAoc3RvcmUuZGlzcGF0Y2hlciwgKCkgPT4gc3RvcmUuc3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5zdGF0ZXMgPSBzdGF0ZXM7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXRlLCBkaXNwYXRjaGVyLCByZWR1Y2VyID0gUGF0Y2guYXBwbHkpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICB2YXIgc3RhdGVQYXRjaGVzID0gT2JzZXJ2YWJsZS5zY2FuKGRpc3BhdGNoZXIsIChbc3RhdGVdLCBwYXRjaCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIFt5aWVsZCByZWR1Y2VyKHN0YXRlLCBwYXRjaCksIHBhdGNoXTsgfSksIFtzdGF0ZSwgbnVsbF0pO1xuICAgICAgICBPYnNlcnZhYmxlLmZvckVhY2goc3RhdGVQYXRjaGVzLCAoW3N0YXRlLCBwYXRjaF0pID0+IHtcbiAgICAgICAgICAgIHN0b3JlLnN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdC5vbk5leHQocGF0Y2gpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHN0b3JlID0geyBzdGF0ZSwgZGlzcGF0Y2hlcjogeyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlLCBvbk5leHQ6IFN1YmplY3QuaXNTdWJqZWN0KGRpc3BhdGNoZXIpID8gZGlzcGF0Y2hlci5vbk5leHQgOiB1bmRlZmluZWQgfSB9O1xuICAgICAgICByZXR1cm4gc3RvcmU7XG4gICAgfVxuICAgIFN0b3JlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN0b3JlIHx8IChTdG9yZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBTdG9yZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0b3JlLmpzLm1hcCJdfQ==

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
	//# sourceMappingURL=data:application/json;base64,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Q0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ3RCLGVBQU8sR0FBRyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMxQztBQUNELFNBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLGFBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDekIsZUFBTyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzFDO0FBQ0QsU0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDeEIsYUFBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ2pCLGVBQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDcEQ7QUFDRCxTQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUN6QixDQUFBLENBQUUsS0FBSyxhQTFCRyxLQUFLLEdBMEJILEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2tCQUNYLEtBQUsiLCJmaWxlIjoicGF0Y2guanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xuICAgIGZ1bmN0aW9uIGFkZCh2YWx1ZSwga2V5LCBwb3NpdGlvbiA9IHsgcHJldjogbnVsbCB9KSB7XG4gICAgICAgIHJldHVybiB7IGFkZGVkOiBTdGF0ZS51bml0KHZhbHVlLCBrZXkpLCByYW5nZTogW3Bvc2l0aW9uLCBwb3NpdGlvbl0gfTtcbiAgICB9XG4gICAgUGF0Y2guYWRkID0gYWRkO1xuICAgIGZ1bmN0aW9uIHNldCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiB7IGFkZGVkOiBTdGF0ZS51bml0KHZhbHVlLCBrZXkpLCByYW5nZTogW3sgcHJldjoga2V5IH0sIHsgbmV4dDoga2V5IH1dIH07XG4gICAgfVxuICAgIFBhdGNoLnNldCA9IHNldDtcbiAgICBmdW5jdGlvbiBwdXNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGFkZCh2YWx1ZSwga2V5LCB7IHByZXY6IG51bGwgfSk7XG4gICAgfVxuICAgIFBhdGNoLnB1c2ggPSBwdXNoO1xuICAgIGZ1bmN0aW9uIHVuc2hpZnQodmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gYWRkKHZhbHVlLCBrZXksIHsgbmV4dDogbnVsbCB9KTtcbiAgICB9XG4gICAgUGF0Y2gudW5zaGlmdCA9IHVuc2hpZnQ7XG4gICAgZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogW3sgcHJldjoga2V5IH0sIHsgbmV4dDoga2V5IH1dIH07XG4gICAgfVxuICAgIFBhdGNoLnJlbW92ZSA9IHJlbW92ZTtcbn0pKFBhdGNoIHx8IChQYXRjaCA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQYXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGNoLmpzLm1hcCJdfQ==

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Subject = exports.Observable = exports.Disposable = undefined;
	
	var _keys = __webpack_require__(88);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(38);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _key = __webpack_require__(81);
	
	var _key2 = _interopRequireDefault(_key);
	
	var _async_iterator = __webpack_require__(87);
	
	var _async_iterator2 = _interopRequireDefault(_async_iterator);
	
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
	
	                                return _context.abrupt("return", { done: true });
	
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
	
	                                return _context.abrupt("return", { done: false, value: values.shift() });
	
	                            case 6:
	                                deferred = defer();
	
	                                deferreds.push(deferred);
	                                return _context.abrupt("return", deferred.promise);
	
	                            case 9:
	                            case "end":
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
	                                return _context2.abrupt("return", current = current.then(function () {
	                                    return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                                        return observers[key].onNext(value);
	                                    })).then(function () {});
	                                }));
	
	                            case 1:
	                            case "end":
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
	                                return _context3.abrupt("return", current = current.then(function () {
	                                    return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                                        return observers[key].onComplete ? observers[key].onComplete(res) : undefined;
	                                    })).then(function () {
	                                        observers = null;
	                                    });
	                                }));
	
	                            case 3:
	                            case "end":
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
	                                return _context4.abrupt("return", current = current.then(function () {
	                                    return _promise2.default.all((0, _keys2.default)(observers).map(function (key) {
	                                        return observers[key].onError ? observers[key].onError(reason) : undefined;
	                                    })).then(function () {
	                                        observers = null;
	                                    });
	                                }));
	
	                            case 3:
	                            case "end":
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
	//# sourceMappingURL=data:application/json;base64,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QUFZLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7K0NBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFNBQVM7cUNBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQU07QUFBRSxpREFBUyxHQUFHLElBQUksQ0FBQztxQ0FBRSxDQUFDO2lDQUFBLENBQUM7Ozs7Ozs7O2FBQzdMLEVBQUMsQ0FBQztTQUNOO0FBQ0QsZUFBTyxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxVQUFVLEVBQVYsVUFBVSxFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsQ0FBQztLQUNyRDtBQUNELFdBQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQzNCLENBQUEsQ0FBRSxPQUFPLGFBM0NDLE9BQU8sR0EyQ0gsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDOztBQUFDIiwiZmlsZSI6Im9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuZXhwb3J0IHZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGRpc3Bvc2VyKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcG9zZXIpXG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIERpc3Bvc2FibGUuY3JlYXRlID0gY3JlYXRlO1xufSkoRGlzcG9zYWJsZSB8fCAoRGlzcG9zYWJsZSA9IHt9KSk7XG5leHBvcnQgdmFyIE9ic2VydmFibGU7XG4oZnVuY3Rpb24gKE9ic2VydmFibGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoZm4pIHtcbiAgICAgICAgdmFyIHN1YmplY3Q7XG4gICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICAgICAgaWYgKCFzdWJqZWN0KSB7XG4gICAgICAgICAgICAgICAgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgICAgICAgICBmbihzdWJqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdWJqZWN0LnN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIHBpcGUob2JzZXJ2YWJsZSwgb2JzZXJ2ZXIpIHtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4gb2JzZXJ2ZXI7XG4gICAgfVxuICAgIE9ic2VydmFibGUucGlwZSA9IHBpcGU7XG4gICAgZnVuY3Rpb24gbWFwKG9ic2VydmFibGUsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3ViamVjdCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUobWFwRm4odmFsdWUpKS50aGVuKHN1YmplY3Qub25OZXh0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIob2JzZXJ2YWJsZSwgZmlsdGVyRm4pIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShmaWx0ZXJGbih2YWx1ZSkpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdCA/IHN1YmplY3Qub25OZXh0KHZhbHVlKSA6IHVuZGVmaW5lZClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5maWx0ZXIgPSBmaWx0ZXI7XG4gICAgZnVuY3Rpb24gc2NhbihvYnNlcnZhYmxlLCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyByZXR1cm4gc3ViamVjdC5vbk5leHQodmFsdWUpOyB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIGZvckVhY2gob2JzZXJ2YWJsZSwgZm4pIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogZm5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gZnJvbVByb21pc2UocHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKHN1YmplY3Qub25OZXh0KS50aGVuKHN1YmplY3Qub25Db21wbGV0ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZyb21Qcm9taXNlID0gZnJvbVByb21pc2U7XG4gICAgZnVuY3Rpb24gdG9Qcm9taXNlKG9ic2VydmFibGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBvbk5leHQ6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZTogcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICBvbkVycm9yOiByZWplY3RcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS50b1Byb21pc2UgPSB0b1Byb21pc2U7XG4gICAgZnVuY3Rpb24gZnJvbUl0ZXJhdG9yKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoKGl0ZXJhdG9yLCBzdWJqZWN0Lm9uTmV4dCk7XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZTogc3ViamVjdC5zdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5mcm9tSXRlcmF0b3IgPSBmcm9tSXRlcmF0b3I7XG4gICAgZnVuY3Rpb24gdG9JdGVyYXRvcihvYnNlcnZhYmxlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlZmVyKCkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmUsIHJlamVjdCwgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICAgICAgICAgICAgcmVqZWN0ID0gcmVqO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNvbHZlLCByZWplY3QsIHByb21pc2UgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIHZhciBkZWZlcnJlZHMgPSBbXTtcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXJyZWRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRzLnBvcCgpLnJlc29sdmUoeyBkb25lOiBmYWxzZSwgdmFsdWUgfSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXJyZWRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRzLnBvcCgpLnJlc29sdmUoeyBkb25lOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRXJyb3IocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkcy5wb3AoKS5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHJlYXNvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSAmJiAhdmFsdWVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcmVkICYmICF2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWVzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiB2YWx1ZXMuc2hpZnQoKSB9O1xuICAgICAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgICAgICAgICAgICAgZGVmZXJyZWRzLnB1c2goZGVmZXJyZWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnRvSXRlcmF0b3IgPSB0b0l0ZXJhdG9yO1xufSkoT2JzZXJ2YWJsZSB8fCAoT2JzZXJ2YWJsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFN1YmplY3Q7XG4oZnVuY3Rpb24gKFN1YmplY3QpIHtcbiAgICBmdW5jdGlvbiBpc1N1YmplY3Qob2JqKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqW1wib25OZXh0XCJdID09PSBcImZ1bmN0aW9uXCI7XG4gICAgfVxuICAgIFN1YmplY3QuaXNTdWJqZWN0ID0gaXNTdWJqZWN0O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgdmFyIG9ic2VydmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCksIGN1cnJlbnQgPSBQcm9taXNlLnJlc29sdmUoKSwgY29tcGxldGVkID0gZmFsc2UsIHJlc3VsdCwgZXJyb3JlZCA9IGZhbHNlLCBlcnJvcjtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCgpID0+IG9ic2VydmVyLm9uQ29tcGxldGUocmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERpc3Bvc2FibGUuY3JlYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZXJyb3JlZCkge1xuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgoKSA9PiBvYnNlcnZlci5vbkVycm9yKGVycm9yKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIERpc3Bvc2FibGUuY3JlYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkudW5pcXVlKCk7XG4gICAgICAgICAgICBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gZGVsZXRlIG9ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uTmV4dCh2YWx1ZSkpKS50aGVuKCgpID0+IHsgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Db21wbGV0ZShyZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGNvbXBsZXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbkNvbXBsZXRlID8gb2JzZXJ2ZXJzW2tleV0ub25Db21wbGV0ZShyZXMpIDogdW5kZWZpbmVkKSkudGhlbigoKSA9PiB7IG9ic2VydmVycyA9IG51bGw7IH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3IocmVhc29uKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHJlYXNvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25FcnJvciA/IG9ic2VydmVyc1trZXldLm9uRXJyb3IocmVhc29uKSA6IHVuZGVmaW5lZCkpLnRoZW4oKCkgPT4geyBvYnNlcnZlcnMgPSBudWxsOyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUsIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciB9O1xuICAgIH1cbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN1YmplY3QgfHwgKFN1YmplY3QgPSB7fSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2YWJsZS5qcy5tYXAiXX0=

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.PromiseUtils = undefined;
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcHJvbWlzZV91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxTQUFTLEdBQUcsQUFBQyxhQUFRLFVBQUssU0FBUyxJQUFLLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQzNGLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQzFDLGlCQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEQsaUJBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUFFLG1CQUFPLEtBQUssWUFBWSxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQUUsdUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUFFLENBQUMsQ0FBQztTQUFFO0FBQ3hKLGlCQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsa0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdEY7QUFDRCxZQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0NBQ04sQ0FBQztBQUNLLElBQUksWUFBWSxXQUFaLFlBQVksWUFBQSxDQUFDO0FBQ3hCLENBQUMsVUFBVSxZQUFZLEVBQUU7QUFDckIsYUFBUyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3BCLFlBQUksT0FBTyxDQUFDO0FBQ1osaUJBQVMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUU7QUFDbkMsZ0JBQUksT0FBTyxFQUNQLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDakQsbUJBQU8sQ0FBQyxPQUFPLEdBQUcsc0JBQVksUUFBUSxDQUFDLENBQUEsQ0FBRSxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzFFO0FBQ0QsZUFBTyxrQkFBUSxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUosSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwQztBQUNELGdCQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUM1QixDQUFBLENBQUUsWUFBWSxhQVpKLFlBQVksR0FZSCxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztrQkFDekIsWUFBWSIsImZpbGUiOiJwcm9taXNlX3V0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuZXhwb3J0IHZhciBQcm9taXNlVXRpbHM7XG4oZnVuY3Rpb24gKFByb21pc2VVdGlscykge1xuICAgIGZ1bmN0aW9uIGxhenkoZXhlY3V0b3IpIHtcbiAgICAgICAgdmFyIHByb21pc2U7XG4gICAgICAgIGZ1bmN0aW9uIHRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIChwcm9taXNlID0gbmV3IFByb21pc2UoZXhlY3V0b3IpKS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdGhlbiB9KTtcbiAgICB9XG4gICAgUHJvbWlzZVV0aWxzLmxhenkgPSBsYXp5O1xufSkoUHJvbWlzZVV0aWxzIHx8IChQcm9taXNlVXRpbHMgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZVV0aWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvbWlzZV91dGlscy5qcy5tYXAiXX0=

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
	//# sourceMappingURL=data:application/json;base64,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QUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDakMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEMsZUFBTyxPQWhCTixLQUFLLENBZ0JPLE1BQU0sQ0FBQyxnQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDMUg7QUFDRCxRQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztDQUMxQixDQUFBLENBQUUsSUFBSSxhQWpCSSxJQUFJLEdBaUJILElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2tCQUNULElBQUkiLCJmaWxlIjoibGVucy5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgTGVucztcbihmdW5jdGlvbiAoTGVucykge1xuICAgIGZ1bmN0aW9uIGNvbXBvc2UocGFyZW50LCBsZW5zKSB7XG4gICAgICAgIHZhciBnZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKSwgc2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLmdldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUoZ2V0U3ViamVjdCk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHNldFN1YmplY3QsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxlbnMuc2V0KSB9O1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XG4gICAgICAgIH0pLnN1YnNjcmliZShwYXJlbnQuZGlzcGF0Y2hlcik7XG4gICAgICAgIHJldHVybiBTdG9yZS5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XG4gICAgfVxuICAgIExlbnMuY29tcG9zZSA9IGNvbXBvc2U7XG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExlbnM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZW5zLmpzLm1hcCJdfQ==

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sonic.browser.js.map