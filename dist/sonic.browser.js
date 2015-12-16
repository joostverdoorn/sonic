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
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3Qvc29uaWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSSxTQUFTLEdBQUcsQUFBQyxhQUFRLFVBQUssU0FBUyxJQUFLLFVBQVUsT0FBTyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFO0FBQzNGLFdBQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQzFDLGlCQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDaEQsaUJBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUFFLG1CQUFPLEtBQUssWUFBWSxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxPQUFPLEdBQUcsS0FBSyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFO0FBQUUsdUJBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUFFLENBQUMsQ0FBQztTQUFFO0FBQ3hKLGlCQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUU7QUFBRSxnQkFBSTtBQUFFLG9CQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUFFLHNCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUFFO0FBQ25GLGlCQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEMsa0JBQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDdEY7QUFDRCxZQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0NBQ04sQ0FBQzs7QUFZRixTQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUU7QUFDaEIsUUFBSSxHQUFHLFlBQVksS0FBSyxFQUNwQixPQUFPLE9BWE4sS0FBSyxDQVdRLE1BQU0sQ0FBQyxnQkFBTyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsWUFSM0MsT0FBTyxDQVE2QyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ25FLFFBQUksR0FBRyxZQUFZLE1BQU0sRUFDckIsT0FBTyxPQWJOLEtBQUssQ0FhUSxNQUFNLENBQUMsZ0JBQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBVjVDLE9BQU8sQ0FVOEMsTUFBTSxFQUFFLENBQUMsQ0FBQztDQUN2RTtBQUNELElBQUksS0FBSyxDQUFDO0FBQ1YsQ0FBQyxVQUFVLEtBQUssRUFBRTtBQUNkLFNBQUssQ0FBQyxLQUFLLGtCQUFTLENBQUM7QUFDckIsU0FBSyxDQUFDLGFBQWEsMkJBQWlCLENBQUM7QUFDckMsU0FBSyxDQUFDLEtBQUssVUFuQk4sS0FBSyxBQW1CVSxDQUFDO0FBQ3JCLFNBQUssQ0FBQyxJQUFJLFNBbkJMLElBQUksQUFtQlMsQ0FBQztBQUNuQixTQUFLLENBQUMsSUFBSSxTQXBCVSxJQUFJLEFBb0JOLENBQUM7QUFDbkIsU0FBSyxDQUFDLE9BQU8sZUFuQlIsT0FBTyxBQW1CWSxDQUFDO0FBQ3pCLFNBQUssQ0FBQyxVQUFVLGVBcEJVLFVBQVUsQUFvQk4sQ0FBQztBQUMvQixTQUFLLENBQUMsS0FBSyxrQkFBUyxDQUFDO0FBQ3JCLFNBQUssQ0FBQyxZQUFZLDBCQUFnQixDQUFDO0FBQ25DLFNBQUssQ0FBQyxJQUFJLGlCQUFRLENBQUM7QUFDbkIsU0FBSyxDQUFDLEtBQUssa0JBQVMsQ0FBQztBQUNyQixTQUFLLENBQUMsS0FBSyxVQXBCTixLQUFLLEFBb0JVLENBQUM7QUFDckIsU0FBSyxDQUFDLFFBQVEsVUFyQlEsUUFBUSxBQXFCSixDQUFDO0FBQzNCLFNBQUssQ0FBQyxRQUFRLGVBdkJULFFBQVEsQUF1QmEsQ0FBQztDQUM5QixDQUFBLENBQUUsS0FBSyxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDLENBQUM7QUFDMUIsQ0FBQztrQkFDYyxLQUFLOztBQUNwQixNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUs7O0FBQUMiLCJmaWxlIjoic29uaWMuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwodGhpc0FyZywgX2FyZ3VtZW50cyk7XG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgICAgIGZ1bmN0aW9uIG9uZnVsZmlsbCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwibmV4dFwiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gb25yZWplY3QodmFsdWUpIHsgdHJ5IHsgc3RlcChcInRocm93XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZ2VuZXJhdG9yW3ZlcmJdKHZhbHVlKTtcbiAgICAgICAgICAgIHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogY2FzdChyZXN1bHQudmFsdWUpLnRoZW4ob25mdWxmaWxsLCBvbnJlamVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgc3RlcChcIm5leHRcIiwgdm9pZCAwKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgX1N0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IF9Bc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuaW1wb3J0IHsgU3RvcmUgYXMgX1N0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBUcmVlIGFzIF9UcmVlLCBQYXRoIGFzIF9QYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCBfQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgeyBTdWJqZWN0IGFzIF9TdWJqZWN0LCBPYnNlcnZhYmxlIGFzIF9PYnNlcnZhYmxlIH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBfUHJvbWlzZVV0aWxzIGZyb20gJy4vcHJvbWlzZV91dGlscyc7XG5pbXBvcnQgX0xlbnMgZnJvbSAnLi9sZW5zJztcbmltcG9ydCBfUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgeyBOb3RGb3VuZCBhcyBfTm90Rm91bmQgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHsgUmFuZ2UgYXMgX1JhbmdlLCBQb3NpdGlvbiBhcyBfUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9TdG9yZS5jcmVhdGUoX1N0YXRlLmZyb21BcnJheShvYmopLCBfU3ViamVjdC5jcmVhdGUoKSk7XG4gICAgaWYgKG9iaiBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgcmV0dXJuIF9TdG9yZS5jcmVhdGUoX1N0YXRlLmZyb21PYmplY3Qob2JqKSwgX1N1YmplY3QuY3JlYXRlKCkpO1xufVxudmFyIFNvbmljO1xuKGZ1bmN0aW9uIChTb25pYykge1xuICAgIFNvbmljLlN0YXRlID0gX1N0YXRlO1xuICAgIFNvbmljLkFzeW5jSXRlcmF0b3IgPSBfQXN5bmNJdGVyYXRvcjtcbiAgICBTb25pYy5TdG9yZSA9IF9TdG9yZTtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuUGF0aCA9IF9QYXRoO1xuICAgIFNvbmljLlN1YmplY3QgPSBfU3ViamVjdDtcbiAgICBTb25pYy5PYnNlcnZhYmxlID0gX09ic2VydmFibGU7XG4gICAgU29uaWMuQ2FjaGUgPSBfQ2FjaGU7XG4gICAgU29uaWMuUHJvbWlzZVV0aWxzID0gX1Byb21pc2VVdGlscztcbiAgICBTb25pYy5MZW5zID0gX0xlbnM7XG4gICAgU29uaWMuUGF0Y2ggPSBfUGF0Y2g7XG4gICAgU29uaWMuUmFuZ2UgPSBfUmFuZ2U7XG4gICAgU29uaWMuUG9zaXRpb24gPSBfUG9zaXRpb247XG4gICAgU29uaWMuTm90Rm91bmQgPSBfTm90Rm91bmQ7XG59KShTb25pYyB8fCAoU29uaWMgPSB7fSkpO1xuO1xuZXhwb3J0IGRlZmF1bHQgU29uaWM7XG5tb2R1bGUuZXhwb3J0cyA9IFNvbmljO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29uaWMuanMubWFwIl19

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
	                                        _context14.next = 8;
	                                        break;
	                                    }
	
	                                    exhausted = true;
	                                    cache.prev(_key2.default.SENTINEL, currentKey);
	                                    cache.next(currentKey, _key2.default.SENTINEL);
	                                    return _context14.abrupt("return", _async_iterator2.default.done);
	
	                                case 8:
	                                    _result$value = (0, _slicedToArray3.default)(result.value, 2);
	                                    key = _result$value[0];
	                                    value = _result$value[1];
	
	                                    cache.prev(key, currentKey);
	                                    cache.next(currentKey, key);
	                                    cache.get(key, value);
	                                    currentKey = key;
	                                    return _context14.abrupt("return", { done: false, value: [key, value] });
	
	                                case 16:
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
	//# sourceMappingURL=data:application/json;base64,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MllILEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2tCQUNYLEtBQUsiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUHJvbWlzZSwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGNhc3QodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUHJvbWlzZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gUHJvbWlzZSA/IHZhbHVlIDogbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHZlcmIsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xyXG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xyXG4gICAgfSk7XHJcbn07XHJcbmltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xyXG5pbXBvcnQgRW50cnkgZnJvbSAnLi9lbnRyeSc7XHJcbmltcG9ydCB7IFBvc2l0aW9uLCBSYW5nZSB9IGZyb20gJy4vcmFuZ2UnO1xyXG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XHJcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xyXG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnLi90cmVlJztcclxuaW1wb3J0IHsgTm90Rm91bmQgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xyXG5leHBvcnQgdmFyIFN0YXRlO1xyXG4oZnVuY3Rpb24gKFN0YXRlKSB7XHJcbiAgICBTdGF0ZS5FbXB0eSA9IHtcclxuICAgICAgICBnZXQ6IChrZXkpID0+IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCksXHJcbiAgICAgICAgcHJldjogKGtleSA9IEtleS5TRU5USU5FTCkgPT4ga2V5ID09PSBLZXkuU0VOVElORUwgPyBQcm9taXNlLnJlc29sdmUoS2V5LlNFTlRJTkVMKSA6IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCksXHJcbiAgICAgICAgbmV4dDogKGtleSA9IEtleS5TRU5USU5FTCkgPT4ga2V5ID09PSBLZXkuU0VOVElORUwgPyBQcm9taXNlLnJlc29sdmUoS2V5LlNFTlRJTkVMKSA6IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZClcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XHJcbiAgICAgICAgdmFyIHN0YXRlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xyXG4gICAgICAgIGlmIChnZXQpXHJcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcclxuICAgICAgICBpZiAocHJldilcclxuICAgICAgICAgICAgc3RhdGUucHJldiA9IHByZXY7XHJcbiAgICAgICAgaWYgKG5leHQpXHJcbiAgICAgICAgICAgIHN0YXRlLm5leHQgPSBuZXh0O1xyXG4gICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxuICAgIFN0YXRlLmV4dGVuZCA9IGV4dGVuZDtcclxuICAgIGZ1bmN0aW9uIGZpcnN0KHN0YXRlLCBbZnJvbSwgdG9dID0gUmFuZ2UuYWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IGZyb20ucHJldiA6IHN0YXRlLm5leHQoZnJvbS5uZXh0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmZpcnN0ID0gZmlyc3Q7XHJcbiAgICBmdW5jdGlvbiBsYXN0KHN0YXRlLCBbZnJvbSwgdG9dID0gUmFuZ2UuYWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyB0by5uZXh0IDogc3RhdGUucHJldih0by5wcmV2KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmxhc3QgPSBsYXN0O1xyXG4gICAgZnVuY3Rpb24gaGFzKHN0YXRlLCBrZXkpIHtcclxuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHN0YXRlLmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RGb3VuZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuaGFzID0gaGFzO1xyXG4gICAgZnVuY3Rpb24gaXMoc3RhdGUsIG90aGVyKSB7XHJcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gZW50cmllcyhzdGF0ZSksIG90aGVySXRlcmF0b3IgPSBlbnRyaWVzKG90aGVyKTtcclxuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5pcyhpdGVyYXRvciwgb3RoZXJJdGVyYXRvciwgRW50cnkuaXMpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuaXMgPSBpcztcclxuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKHN0YXRlLCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUoZW50cmllcyhzdGF0ZSksIGVudHJ5ID0+IGVudHJ5WzFdID09PSB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5jb250YWlucyA9IGNvbnRhaW5zO1xyXG4gICAgZnVuY3Rpb24gZW1wdHkoc3RhdGUpIHtcclxuICAgICAgICByZXR1cm4gc3RhdGUubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ID09PSBLZXkuU0VOVElORUwpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZW1wdHkgPSBlbXB0eTtcclxuICAgIGZ1bmN0aW9uIGFueShzdGF0ZSkge1xyXG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT09IEtleS5TRU5USU5FTCk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5hbnkgPSBhbnk7XHJcbiAgICBmdW5jdGlvbiBzaXplKHN0YXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc2l6ZShrZXlzKHN0YXRlKSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5zaXplID0gc2l6ZTtcclxuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcclxuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoZW50cmllcyhwYXJlbnQsIHJhbmdlKSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5zbGljZSA9IHNsaWNlO1xyXG4gICAgZnVuY3Rpb24gc3BsaWNlKHBhcmVudCwgcmFuZ2UsIGNoaWxkKSB7XHJcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XHJcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXHJcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZDtcclxuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XHJcbiAgICAgICAgYnJpZGdlZENoaWxkID0gZXh0ZW5kKGNoaWxkLCB7XHJcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBjaGlsZC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBLZXkuU0VOVElORUwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmV2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IFByb21pc2UucmVzb2x2ZShmcm9tLm5leHQpIDogcGFyZW50LnByZXYoZnJvbS5wcmV2KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0ICE9PSBLZXkuU0VOVElORUwpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXh0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgPyBQcm9taXNlLnJlc29sdmUodG8ucHJldikgOiBwYXJlbnQubmV4dCh0by5uZXh0KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBicmlkZ2VkUGFyZW50ID0gZXh0ZW5kKGZpbHRlcmVkLCB7XHJcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBwYXJlbnQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHByZXYgPT09IHRvLm5leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5TRU5USU5FTCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIHByZXYpLnRoZW4ocmVzID0+IHJlcyA/IFByb21pc2UucmVqZWN0KG5ldyBOb3RGb3VuZCkgOiBwcmV2KTtcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgbmV4dCA9PT0gZnJvbS5wcmV2KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuU0VOVElORUwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiByZXMgPyBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpIDogbmV4dCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzKGNoaWxkLCBrZXkpLnRoZW4ocmVzID0+IHJlcyA/IGJyaWRnZWRDaGlsZC5nZXQoa2V5KSA6IGJyaWRnZWRQYXJlbnQuZ2V0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5TRU5USU5FTCkge1xyXG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGtleSA9PT0gdG8ucHJldilcclxuICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQucHJldihLZXkuU0VOVElORUwpO1xyXG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IEtleS5TRU5USU5FTCkge1xyXG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLm5leHQoS2V5LlNFTlRJTkVMKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhhcyhicmlkZ2VkQ2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLm5leHQoa2V5KSA6IGJyaWRnZWRQYXJlbnQubmV4dChrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5zcGxpY2UgPSBzcGxpY2U7XHJcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBhcmVudCkge1xyXG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XHJcbiAgICAgICAgICAgIHByZXY6IHBhcmVudC5uZXh0LFxyXG4gICAgICAgICAgICBuZXh0OiBwYXJlbnQucHJldlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdGUucmV2ZXJzZSA9IHJldmVyc2U7XHJcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFwRm4oeWllbGQgcGFyZW50LmdldChrZXkpLCBrZXkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHsgZ2V0IH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdGUubWFwID0gbWFwO1xyXG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcclxuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG4gICAgICAgIGZ1bmN0aW9uIGhhdmUoa2V5KSB7XHJcbiAgICAgICAgICAgIHZhciBzdHJpbmdpZmllZEtleSA9IEpTT04uc3RyaW5naWZ5KGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJpbmdpZmllZEtleSBpbiBjYWNoZSA/IGNhY2hlW3N0cmluZ2lmaWVkS2V5XSA6IGNhY2hlW3N0cmluZ2lmaWVkS2V5XSA9IHBhcmVudC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IGZpbHRlckZuKHZhbHVlLCBrZXkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh5aWVsZCAoaGF2ZShrZXkpKSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5wcmV2KGtleSkudGhlbihwID0+IHAgPT09IEtleS5TRU5USU5FTCA/IEtleS5TRU5USU5FTCA6IGhhdmUocCkudGhlbihyZXMgPT4gcmVzID8gcCA6IHByZXYocCkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KGtleSkudGhlbihuID0+IG4gPT09IEtleS5TRU5USU5FTCA/IEtleS5TRU5USU5FTCA6IGhhdmUobikudGhlbihyZXMgPT4gcmVzID8gbiA6IG5leHQobikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHsgZ2V0LCBwcmV2LCBuZXh0IH0pO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xyXG4gICAgZnVuY3Rpb24gc2NhbihwYXJlbnQsIHNjYW5GbiwgbWVtbykge1xyXG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLnNjYW4oZW50cmllcyhwYXJlbnQpLCAobWVtb0VudHJ5LCBlbnRyeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vRW50cnlbMV0sIGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4ocmVzdWx0ID0+IFtlbnRyeVswXSwgcmVzdWx0XSk7XHJcbiAgICAgICAgfSwgW0tleS5TRU5USU5FTCwgbWVtb10pKTtcclxuICAgIH1cclxuICAgIFN0YXRlLnNjYW4gPSBzY2FuO1xyXG4gICAgZnVuY3Rpb24gcGljayhwYXJlbnQsIHBpY2tlZCkge1xyXG4gICAgICAgIHJldHVybiBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gaGFzKHBpY2tlZCwga2V5KSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5waWNrID0gcGljaztcclxuICAgIGZ1bmN0aW9uIG9taXQocGFyZW50LCBvbWl0dGVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkgeyByZXR1cm4gISh5aWVsZCBoYXMob21pdHRlZCwga2V5KSk7IH0pKTtcclxuICAgIH1cclxuICAgIFN0YXRlLm9taXQgPSBvbWl0O1xyXG4gICAgZnVuY3Rpb24gemlwKHBhcmVudCwgb3RoZXIpIHtcclxuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci56aXAoQXN5bmNJdGVyYXRvci56aXAoa2V5cyhwYXJlbnQpLCBrZXlzKG90aGVyKSksIEFzeW5jSXRlcmF0b3IuemlwKHZhbHVlcyhwYXJlbnQpLCB2YWx1ZXMob3RoZXIpKSkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuemlwID0gemlwO1xyXG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xyXG4gICAgICAgIHZhciBoYXZlO1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChrKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IGtleSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldChrZXkpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbmV4dChrID0gS2V5LlNFTlRJTkVMKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgIT09IGtleSAmJiBrICE9PSBLZXkuU0VOVElORUwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xyXG4gICAgICAgICAgICAgICAgaWYgKCEoeWllbGQgaGFzKHBhcmVudCwga2V5KSkpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vdEZvdW5kO1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IEtleS5TRU5USU5FTClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGsgPT09IGtleSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gS2V5LlNFTlRJTkVMO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2OiBuZXh0LCBuZXh0IH07XHJcbiAgICB9XHJcbiAgICBTdGF0ZS56b29tID0gem9vbTtcclxuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcclxuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gVHJlZS5nZXQocGFyZW50LCBrZXkpLFxyXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gVHJlZS5wcmV2KHBhcmVudCwga2V5KSxcclxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IFRyZWUubmV4dChwYXJlbnQsIGtleSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmZsYXR0ZW4gPSBmbGF0dGVuO1xyXG4gICAgZnVuY3Rpb24gZmxhdE1hcChwYXJlbnQsIG1hcEZuKSB7XHJcbiAgICAgICAgcmV0dXJuIFN0YXRlLmZsYXR0ZW4oU3RhdGUubWFwKHBhcmVudCwgbWFwRm4pKTtcclxuICAgIH1cclxuICAgIFN0YXRlLmZsYXRNYXAgPSBmbGF0TWFwO1xyXG4gICAgZnVuY3Rpb24gZ3JvdXBCeShwYXJlbnQsIGdyb3VwRm4pIHtcclxuICAgICAgICB2YXIgc3RhdGVzID0ge307XHJcbiAgICAgICAgdmFyIGl0ID0gZW50cmllcyhwYXJlbnQpO1xyXG4gICAgICAgIHZhciBncm91cEtleWVkID0gQXN5bmNJdGVyYXRvci5tYXAoaXQsIChba2V5LCB2YWx1ZV0pID0+IHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShncm91cEZuKHZhbHVlLCBrZXkpKS50aGVuKGdyb3VwS2V5ID0+IFtncm91cEtleSwgdmFsdWVdKTsgfSk7XHJcbiAgICAgICAgdmFyIGZpbHRlcmVkID0gQXN5bmNJdGVyYXRvci5maWx0ZXIoZ3JvdXBLZXllZCwgKFtncm91cEtleSwgdmFsdWVdKSA9PiAhKEpTT04uc3RyaW5naWZ5KGdyb3VwS2V5KSBpbiBzdGF0ZXMpKTtcclxuICAgICAgICB2YXIgbWFwcGVkID0gQXN5bmNJdGVyYXRvci5tYXAoZmlsdGVyZWQsIChbZ3JvdXBLZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKGdyb3VwRm4odmFsdWUsIGtleSkpLnRoZW4oZ2sgPT4gZ2sgPT09IGdyb3VwS2V5KSk7XHJcbiAgICAgICAgICAgIHJldHVybiBbZ3JvdXBLZXksIHN0YXRlc1tKU09OLnN0cmluZ2lmeShncm91cEtleSldID0gc3RhdGVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhtYXBwZWQpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZ3JvdXBCeSA9IGdyb3VwQnk7XHJcbiAgICBmdW5jdGlvbiB1bmlxdWUocGFyZW50LCB1bmlxdWVGbikge1xyXG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLnVuaXF1ZShlbnRyaWVzKHBhcmVudCksIChba2V5LCB2YWx1ZV0pID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB1bmlxdWVGbih2YWx1ZSwga2V5KTsgfSkpKTtcclxuICAgIH1cclxuICAgIFN0YXRlLnVuaXF1ZSA9IHVuaXF1ZTtcclxuICAgIGZ1bmN0aW9uIHVuaW9uKHN0YXRlLCBvdGhlciwgdW5pcXVlRm4pIHtcclxuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci51bmlxdWUoQXN5bmNJdGVyYXRvci5jb25jYXQoZW50cmllcyhzdGF0ZSksIGVudHJpZXMob3RoZXIpKSwgKFtrZXksIHZhbHVlXSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgcmV0dXJuIHVuaXF1ZUZuKHZhbHVlLCBrZXkpOyB9KSkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUudW5pb24gPSB1bmlvbjtcclxuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4sIHJldmVyc2VLZXlGbikge1xyXG4gICAgICAgIGlmICghcmV2ZXJzZUtleUZuKVxyXG4gICAgICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5tYXAoZW50cmllcyhwYXJlbnQpLCBlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleUZuKGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4oa2V5ID0+IFtrZXksIGVudHJ5WzFdXSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXQoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldCh5aWVsZCByZXZlcnNlS2V5Rm4oa2V5KSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcHJldihrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2ID0geWllbGQgcGFyZW50LnByZXYoeWllbGQgcmV2ZXJzZUtleUZuKGtleSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlGbih5aWVsZCBwYXJlbnQuZ2V0KHByZXYpLCBwcmV2KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuZXh0KGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSB5aWVsZCBwYXJlbnQubmV4dCh5aWVsZCByZXZlcnNlS2V5Rm4oa2V5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleUZuKHlpZWxkIHBhcmVudC5nZXQobmV4dCksIG5leHQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgU3RhdGUua2V5QnkgPSBrZXlCeTtcclxuICAgIGZ1bmN0aW9uIHRha2UocGFyZW50LCBjb3VudCkge1xyXG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLnRha2UoZW50cmllcyhwYXJlbnQpLCBjb3VudCkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUudGFrZSA9IHRha2U7XHJcbiAgICBmdW5jdGlvbiBza2lwKHBhcmVudCwgY291bnQpIHtcclxuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5za2lwKGVudHJpZXMocGFyZW50KSwgY291bnQpKTtcclxuICAgIH1cclxuICAgIFN0YXRlLnNraXAgPSBza2lwO1xyXG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHBhcmVudCwgQ2FjaGUuY3JlYXRlKCkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuY2FjaGUgPSBjYWNoZTtcclxuICAgIGZ1bmN0aW9uIHVuaXQodmFsdWUsIGtleSA9IEtleS51bmlxdWUoKSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldDogayA9PiBrID09PSBrZXkgPyBQcm9taXNlLnJlc29sdmUodmFsdWUpIDogUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKSxcclxuICAgICAgICAgICAgcHJldjogKGsgPSBLZXkuU0VOVElORUwpID0+IFByb21pc2UucmVzb2x2ZShrID09PSBLZXkuU0VOVElORUwgPyBrZXkgOiBLZXkuU0VOVElORUwpLFxyXG4gICAgICAgICAgICBuZXh0OiAoayA9IEtleS5TRU5USU5FTCkgPT4gUHJvbWlzZS5yZXNvbHZlKGsgPT09IEtleS5TRU5USU5FTCA/IGtleSA6IEtleS5TRU5USU5FTClcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgU3RhdGUudW5pdCA9IHVuaXQ7XHJcbiAgICBmdW5jdGlvbiBlbnRyaWVzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50ID0gS2V5LlNFTlRJTkVMLCBkb25lID0gZmFsc2UsIFtmcm9tLCB0b10gPSByYW5nZTtcclxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IEtleS5TRU5USU5FTClcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZG9uZSA9IHRydWUsIFByb21pc2UucmVzb2x2ZShBc3luY0l0ZXJhdG9yLmRvbmUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4odmFsdWUgPT4gKGN1cnJlbnQgPSBrZXksIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBba2V5LCB2YWx1ZV0gfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBpdGVyYXRlKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIHRvLnByZXYgPT09IG5leHQpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuU0VOVElORUwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldChuZXh0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgZnJvbS5wcmV2ID09PSB0by5wcmV2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuU0VOVElORUwpO1xyXG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIGZyb20ubmV4dCA9PT0gdG8ubmV4dClcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LlNFTlRJTkVMKTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IEtleS5TRU5USU5FTClcclxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IGdldChmcm9tLnByZXYpIDogaXRlcmF0ZShmcm9tLm5leHQpO1xyXG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHRvLm5leHQgPT09IGN1cnJlbnQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5TRU5USU5FTCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKGN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5jcmVhdGUobmV4dCk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5lbnRyaWVzID0gZW50cmllcztcclxuICAgIGZ1bmN0aW9uIGtleXMoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IubWFwKGVudHJpZXMoc3RhdGUsIHJhbmdlKSwgRW50cnkua2V5KTtcclxuICAgIH1cclxuICAgIFN0YXRlLmtleXMgPSBrZXlzO1xyXG4gICAgZnVuY3Rpb24gdmFsdWVzKHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xyXG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLm1hcChlbnRyaWVzKHN0YXRlLCByYW5nZSksIEVudHJ5LnZhbHVlKTtcclxuICAgIH1cclxuICAgIFN0YXRlLnZhbHVlcyA9IHZhbHVlcztcclxuICAgIGZ1bmN0aW9uIGZyb21FbnRyaWVzKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgdmFyIGNhY2hlID0gQ2FjaGUuY3JlYXRlKCksIGV4aGF1c3RlZCA9IGZhbHNlLCBjdXJyZW50S2V5ID0gS2V5LlNFTlRJTkVMLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcclxuICAgICAgICB2YXIgY2FjaGluZ0l0ZXJhdG9yID0ge1xyXG4gICAgICAgICAgICBuZXh0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXhoYXVzdGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FjaGUucHJldihLZXkuU0VOVElORUwsIGN1cnJlbnRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZS5uZXh0KGN1cnJlbnRLZXksIEtleS5TRU5USU5FTCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBba2V5LCB2YWx1ZV0gPSByZXN1bHQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUucHJldihrZXksIGN1cnJlbnRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhY2hlLm5leHQoY3VycmVudEtleSwga2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBjYWNoZS5nZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEtleSA9IGtleTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IFtrZXksIHZhbHVlXSB9O1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcclxuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgTm90Rm91bmQpO1xyXG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbihFbnRyeS52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKTtcclxuICAgICAgICAgICAgICAgIHlpZWxkIEFzeW5jSXRlcmF0b3Iuc29tZShjYWNoaW5nSXRlcmF0b3IsIGVudHJ5ID0+IGVudHJ5WzBdID09PSBrZXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlLnByZXYoa2V5KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LlNFTlRJTkVMKSB7XHJcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IE5vdEZvdW5kKTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gS2V5LlNFTlRJTkVMIDogcmVzdWx0LnZhbHVlWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZmluZChjYWNoaW5nSXRlcmF0b3IsIGVudHJ5ID0+IGVudHJ5WzBdID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyBLZXkuU0VOVElORUwgOiByZXN1bHQudmFsdWVbMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkoeyBnZXQsIHByZXYsIG5leHQgfSwgY2FjaGUpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZnJvbUVudHJpZXMgPSBmcm9tRW50cmllcztcclxuICAgIGZ1bmN0aW9uIGZyb21LZXlzKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3IubWFwKGl0ZXJhdG9yLCBrZXkgPT4gW2tleSwgbnVsbF0pKTtcclxuICAgIH1cclxuICAgIFN0YXRlLmZyb21LZXlzID0gZnJvbUtleXM7XHJcbiAgICBmdW5jdGlvbiBmcm9tVmFsdWVzKGl0ZXJhdG9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKEFzeW5jSXRlcmF0b3Iuc2NhbihpdGVyYXRvciwgKHByZXYsIHZhbHVlKSA9PiBbcHJldlswXSArIDEsIHZhbHVlXSwgWy0xLCBudWxsXSkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUuZnJvbVZhbHVlcyA9IGZyb21WYWx1ZXM7XHJcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZyb21WYWx1ZXMoQXN5bmNJdGVyYXRvci5mcm9tQXJyYXkodmFsdWVzKSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XHJcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QodmFsdWVzKSk7XHJcbiAgICB9XHJcbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcclxuICAgIGZ1bmN0aW9uIGxhenkoZm4pIHtcclxuICAgICAgICB2YXIgc3RhdGUsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gc3RhdGUgOiBzdGF0ZSA9IHlpZWxkIGZuKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZSA/IHN0YXRlLmdldChrZXkpIDogcXVldWUudGhlbihjcmVhdGVTdGF0ZSkudGhlbihzID0+IHMuZ2V0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5wcmV2KGtleSkgOiBxdWV1ZS50aGVuKGNyZWF0ZVN0YXRlKS50aGVuKHMgPT4gcy5wcmV2KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5uZXh0KGtleSkgOiBxdWV1ZS50aGVuKGNyZWF0ZVN0YXRlKS50aGVuKHMgPT4gcy5uZXh0KGtleSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcclxuICAgIH1cclxuICAgIFN0YXRlLmxhenkgPSBsYXp5O1xyXG4gICAgZnVuY3Rpb24gdG9PYmplY3Qoc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IudG9PYmplY3QoZW50cmllcyhzdGF0ZSwgcmFuZ2UpKTtcclxuICAgIH1cclxuICAgIFN0YXRlLnRvT2JqZWN0ID0gdG9PYmplY3Q7XHJcbiAgICBmdW5jdGlvbiB0b0FycmF5KHN0YXRlLCByYW5nZSA9IFJhbmdlLmFsbCkge1xyXG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnRvQXJyYXkodmFsdWVzKHN0YXRlLCByYW5nZSkpO1xyXG4gICAgfVxyXG4gICAgU3RhdGUudG9BcnJheSA9IHRvQXJyYXk7XHJcbn0pKFN0YXRlIHx8IChTdGF0ZSA9IHt9KSk7XHJcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXAiXX0=

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
	
	var _promise = __webpack_require__(44);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _create = __webpack_require__(38);
	
	var _create2 = _interopRequireDefault(_create);
	
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
	                                    return _context.abrupt("return", cacher(t));
	
	                                case 4:
	                                    _context.prev = 4;
	                                    _context.t0 = _context["catch"](0);
	
	                                    if (!(_context.t0 instanceof _exceptions.NotFound)) {
	                                        _context.next = 12;
	                                        break;
	                                    }
	
	                                    _context.t1 = t;
	                                    _context.next = 10;
	                                    return fn(t);
	
	                                case 10:
	                                    _context.t2 = _context.sent;
	                                    return _context.abrupt("return", cacher(_context.t1, _context.t2));
	
	                                case 12:
	                                    throw _context.t0;
	
	                                case 13:
	                                case "end":
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
	//# sourceMappingURL=data:application/json;base64,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OiJjYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCB7IE5vdEZvdW5kIH0gZnJvbSAnLi9leGNlcHRpb25zJztcbmV4cG9ydCB2YXIgQ2FjaGU7XG4oZnVuY3Rpb24gKENhY2hlKSB7XG4gICAgY29uc3QgTk9ORSA9IHt9O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3QgY2FjaGUgPSB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVDYWNoZShjKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQsIHUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IEpTT04uc3RyaW5naWZ5KHQpO1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNbbGFiZWxdID0gdTtcbiAgICAgICAgICAgICAgICBpZiAobGFiZWwgaW4gYylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNbbGFiZWxdO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBjcmVhdGVDYWNoZShjYWNoZS5nZXQpLFxuICAgICAgICAgICAgcHJldjogY3JlYXRlQ2FjaGUoY2FjaGUucHJldiksXG4gICAgICAgICAgICBuZXh0OiBjcmVhdGVDYWNoZShjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gZXh0ZW5kKGNhY2hlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IE9iamVjdC5jcmVhdGUoY2FjaGUuZ2V0KSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUoY2FjaGUucHJldiksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKGNhY2hlLm5leHQpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgY2FjaGUpIHtcbiAgICAgICAgZnVuY3Rpb24gY2FjaGVGbihmbiwgY2FjaGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gKHQpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hlcih0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKHJlYXNvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uIGluc3RhbmNlb2YgTm90Rm91bmQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVyKHQsIHlpZWxkIGZuKHQpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgcmVhc29uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IGNhY2hlRm4oc3RhdGUuZ2V0LCBjYWNoZS5nZXQpLFxuICAgICAgICAgICAgcHJldjogY2FjaGVGbihzdGF0ZS5wcmV2LCBjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IGNhY2hlRm4oc3RhdGUubmV4dCwgY2FjaGUubmV4dClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuYXBwbHkgPSBhcHBseTtcbn0pKENhY2hlIHx8IChDYWNoZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBDYWNoZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhY2hlLmpzLm1hcCJdfQ==

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
	                                                    _context4.next = 2;
	                                                    return fn(value);
	
	                                                case 2:
	                                                    return _context4.abrupt("return", true);
	
	                                                case 3:
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
	//# sourceMappingURL=data:application/json;base64,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LElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQzthQUNuQztTQUNKLENBQUM7S0FDTDtBQUNELGlCQUFhLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUNqQyxDQUFBLENBQUUsYUFBYSxhQXJOTCxhQUFhLEdBcU5ILGFBQWEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2tCQUMzQixhQUFhIiwiZmlsZSI6ImFzeW5jX2l0ZXJhdG9yLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgTm90Rm91bmQgfSBmcm9tICcuL2V4Y2VwdGlvbnMnO1xuZXhwb3J0IHZhciBBc3luY0l0ZXJhdG9yO1xuKGZ1bmN0aW9uIChBc3luY0l0ZXJhdG9yKSB7XG4gICAgQXN5bmNJdGVyYXRvci5kb25lID0geyBkb25lOiB0cnVlIH07XG4gICAgQXN5bmNJdGVyYXRvci5FbXB0eSA9IHtcbiAgICAgICAgbmV4dDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKEFzeW5jSXRlcmF0b3IuZG9uZSlcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV2ZXJ5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICAgICAgd2hpbGUgKChyZXN1bHQgPSB5aWVsZCBpdGVyYXRvci5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgICAgICAgICAgICAgIGlmICghKHlpZWxkIHByZWRpY2F0ZShyZXN1bHQudmFsdWUpKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmV2ZXJ5ID0gZXZlcnk7XG4gICAgZnVuY3Rpb24gc29tZShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuICEoeWllbGQgZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgcmV0dXJuICEoeWllbGQgcHJlZGljYXRlKHZhbHVlKSk7IH0pKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNvbWUgPSBzb21lO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goaXRlcmF0b3IsIGZuKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHsgeWllbGQgZm4odmFsdWUpOyByZXR1cm4gdHJ1ZTsgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiByZWR1Y2UoaXRlcmF0b3IsIGZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgZm9yRWFjaChpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkgeyBtZW1vID0geWllbGQgZm4obWVtbywgdmFsdWUpOyB9KSk7XG4gICAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IucmVkdWNlID0gcmVkdWNlO1xuICAgIGZ1bmN0aW9uIGZpbmQoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoeWllbGQgc29tZShpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkgeyByZXR1cm4gISh5aWVsZCBwcmVkaWNhdGUodmFsdWUpKSA/IGZhbHNlIDogKHJlc3VsdCA9IHZhbHVlLCB0cnVlKTsgfSkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBOb3RGb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZCA9IGZpbmQ7XG4gICAgZnVuY3Rpb24gaW5kZXhPZihpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGlmICh5aWVsZCBzb21lKGl0ZXJhdG9yLCB2ID0+IChpbmRleCsrLCB2YWx1ZSA9PSB2KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgTm90Rm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmluZGV4T2YgPSBpbmRleE9mO1xuICAgIGZ1bmN0aW9uIGF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZmluZChpdGVyYXRvciwgKCkgPT4gMCA9PT0gaW5kZXgtLSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuYXQgPSBhdDtcbiAgICBmdW5jdGlvbiBzaXplKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjb3VudCA9IC0xO1xuICAgICAgICByZXR1cm4gZm9yRWFjaChpdGVyYXRvciwgKCkgPT4geyBjb3VudCsrOyB9KS50aGVuKCgpID0+IGNvdW50KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zaXplID0gc2l6ZTtcbiAgICBmdW5jdGlvbiBjb250YWlucyhpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHYgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgZnVuY3Rpb24gaXMoaXRlcmF0b3IsIG90aGVyLCBlcXVhbHMgPSAoYSwgYikgPT4gYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoeWllbGQgZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgb3RoZXIubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiAhcmVzdWx0LmRvbmUgJiYgZXF1YWxzKHZhbHVlLCByZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgfSkpKSAmJiAoeWllbGQgb3RoZXIubmV4dCgpKS5kb25lO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pcyA9IGlzO1xuICAgIGZ1bmN0aW9uIG1hcChpdGVyYXRvciwgbWFwRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gQXN5bmNJdGVyYXRvci5kb25lIDogeyBkb25lOiBmYWxzZSwgdmFsdWU6IHlpZWxkIG1hcEZuKHJlc3VsdC52YWx1ZSkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihpdGVyYXRvciwgZmlsdGVyRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5kb25lO1xuICAgICAgICAgICAgICAgIGlmICh5aWVsZCBmaWx0ZXJGbihyZXN1bHQudmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKGl0ZXJhdG9yLCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5kb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5kb25lO1xuICAgICAgICAgICAgICAgIG1lbW8gPSB5aWVsZCBzY2FuRm4obWVtbywgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IG1lbW8gfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gemlwKGl0ZXJhdG9yLCBvdGhlciwgemlwRm4gPSAodCwgdSkgPT4gW3QsIHVdKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICB2YXIgb3RoZXJSZXN1bHQgPSB5aWVsZCBvdGhlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyUmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiB5aWVsZCB6aXBGbihyZXN1bHQudmFsdWUsIG90aGVyUmVzdWx0LnZhbHVlKSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gdGFrZShpdGVyYXRvciwgY291bnQpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICsraSA+IGNvdW50ID8gQXN5bmNJdGVyYXRvci5kb25lIDogaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50YWtlID0gdGFrZTtcbiAgICBmdW5jdGlvbiBza2lwKGl0ZXJhdG9yLCBjb3VudCkge1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGNvdW50KVxuICAgICAgICAgICAgICAgICAgICB5aWVsZCBzb21lKGl0ZXJhdG9yLCAoKSA9PiArK2kgPj0gY291bnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNraXAgPSBza2lwO1xuICAgIGZ1bmN0aW9uIHVuaXF1ZShpdGVyYXRvciwgdW5pcXVlRm4pIHtcbiAgICAgICAgdmFyIGNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZmlsdGVyKGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgdSA9IEpTT04uc3RyaW5naWZ5KHlpZWxkIHVuaXF1ZUZuKHZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm4gKCFjYWNoZVt1XSkgfHwgKGNhY2hlW3VdID0gdHJ1ZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci51bmlxdWUgPSB1bmlxdWU7XG4gICAgZnVuY3Rpb24gY29uY2F0KC4uLml0ZXJhdG9ycykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JzLnJlZHVjZSgobWVtbywgaXRlcmF0b3IpID0+IHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRlZCA9IGZhbHNlLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBtZW1vLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgICAgIH0sIEFzeW5jSXRlcmF0b3IuRW1wdHkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbmNhdCA9IGNvbmNhdDtcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSAtMSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKytjdXJyZW50ID49IGFycmF5Lmxlbmd0aCA/IEFzeW5jSXRlcmF0b3IuZG9uZSA6IHsgZG9uZTogZmFsc2UsIHZhbHVlOiBhcnJheVtjdXJyZW50XSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tQXJyYXkgPSBmcm9tQXJyYXk7XG4gICAgZnVuY3Rpb24gZnJvbU9iamVjdChvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZyb21BcnJheShPYmplY3Qua2V5cyhvYmplY3QpLm1hcChrZXkgPT4gW2tleSwgb2JqZWN0W2tleV1dKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XG4gICAgZnVuY3Rpb24gdG9BcnJheShpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgdmFsdWUpID0+IChtZW1vLnB1c2godmFsdWUpLCBtZW1vKSwgW10pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRvQXJyYXkgPSB0b0FycmF5O1xuICAgIGZ1bmN0aW9uIHRvT2JqZWN0KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCBba2V5LCB2YWx1ZV0pID0+IChtZW1vW2tleV0gPSB2YWx1ZSwgbWVtbyksIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRvT2JqZWN0ID0gdG9PYmplY3Q7XG4gICAgZnVuY3Rpb24gY3JlYXRlKG5leHQpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcXVldWUgPSBxdWV1ZS50aGVuKG5leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKEFzeW5jSXRlcmF0b3IgfHwgKEFzeW5jSXRlcmF0b3IgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQXN5bmNJdGVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jX2l0ZXJhdG9yLmpzLm1hcCJdfQ==

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
	
	        function getState() {
	            return _state2.default.scan(parent.state, scanFn, memo);
	        }
	        var store,
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
	                return __awaiter(_this6, void 0, _promise2.default, _regenerator2.default.mark(function _callee9() {
	                    return _regenerator2.default.wrap(function _callee9$(_context9) {
	                        while (1) {
	                            switch (_context9.prev = _context9.next) {
	                                case 0:
	                                    _context9.next = 2;
	                                    return reducer(store.state, patch);
	
	                                case 2:
	                                    store.state = _context9.sent;
	                                    return _context9.abrupt("return", subject.onNext(patch));
	
	                                case 4:
	                                case "end":
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
	//# sourceMappingURL=data:application/json;base64,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QyxLQUFLO3VCQUFLLFNBQVMsU0FBTyxLQUFLLENBQUMsZ0RBQVc7Ozs7OzsyQ0FDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDOzs7QUFBL0MseUNBQUssQ0FBQyxLQUFLO3NFQUNKLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7OztpQkFDL0IsRUFBQzthQUFBO1NBQ0wsQ0FBQyxDQUFDO0FBQ0gsWUFBTSxLQUFLLEdBQUc7QUFDVixpQkFBSyxFQUFMLEtBQUs7QUFDTCxzQkFBVSxFQUFFO0FBQ1IseUJBQVMsRUFBRSxPQUFPLENBQUMsU0FBUztBQUM1QixzQkFBTSxFQUFFLFlBaE5ILE9BQU8sQ0FnTkksU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEdBQUcsU0FBUzthQUN4RTtTQUNKLENBQUM7QUFDRixlQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNELFNBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0NBQ3pCLENBQUEsQ0FBRSxLQUFLLGFBbk5HLEtBQUssR0FtTkgsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7a0JBQ1gsS0FBSyIsImZpbGUiOiJzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQcm9taXNlLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IuY2FsbCh0aGlzQXJnLCBfYXJndW1lbnRzKTtcbiAgICAgICAgZnVuY3Rpb24gY2FzdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQcm9taXNlICYmIHZhbHVlLmNvbnN0cnVjdG9yID09PSBQcm9taXNlID8gdmFsdWUgOiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICAgICAgZnVuY3Rpb24gb25mdWxmaWxsKHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJuZXh0XCIsIHZhbHVlKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBvbnJlamVjdCh2YWx1ZSkgeyB0cnkgeyBzdGVwKFwidGhyb3dcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAodmVyYiwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBnZW5lcmF0b3JbdmVyYl0odmFsdWUpO1xuICAgICAgICAgICAgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBjYXN0KHJlc3VsdC52YWx1ZSkudGhlbihvbmZ1bGZpbGwsIG9ucmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgICBzdGVwKFwibmV4dFwiLCB2b2lkIDApO1xuICAgIH0pO1xufTtcbmltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IFBhdGNoIGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuaW1wb3J0IHsgUmFuZ2UsIFBvc2l0aW9uIH0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgeyBUcmVlIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBOb3RGb3VuZCB9IGZyb20gJy4vZXhjZXB0aW9ucyc7XG5leHBvcnQgdmFyIFN0b3JlO1xuKGZ1bmN0aW9uIChTdG9yZSkge1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocGFyZW50KSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFN0YXRlLnJldmVyc2UocGFyZW50LnN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LmRpc3BhdGNoZXIsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogUmFuZ2UucmV2ZXJzZShwYXRjaC5yYW5nZSksXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5yZXZlcnNlKHBhdGNoLmFkZGVkKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoZ2V0U3RhdGUoKSwgZGlzcGF0Y2hlciwgZ2V0U3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBTdGF0ZS5tYXAocGFyZW50LnN0YXRlLCBtYXBGbik7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzcGF0Y2hlciA9IE9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiAoe1xuICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBtYXBGbikgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKGdldFN0YXRlKCksIGRpc3BhdGNoZXIsIGdldFN0YXRlKTtcbiAgICB9XG4gICAgU3RvcmUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihwYXJlbnQsIGZpbHRlckZuKSB7XG4gICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGUuZmlsdGVyKHBhcmVudC5zdGF0ZSwgZmlsdGVyRm4pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZpbmQoc3RhdGUsIHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgW2tleV0gPSB5aWVsZCBBc3luY0l0ZXJhdG9yLmZpbmQoU3RhdGUuZW50cmllcyhzdGF0ZSwgcmFuZ2UpLCAoW2tleSwgdmFsdWVdKSA9PiBmaWx0ZXJGbih2YWx1ZSwga2V5KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBOb3RGb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBLZXkuU0VOVElORUw7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoc3RhdGUsIHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGVsZXRlZCA9IFN0YXRlLnNsaWNlKFN0YXRlLnJldmVyc2Uoc3RhdGUpLCBSYW5nZS5yZXZlcnNlKHJhbmdlKSksIHBvc2l0aW9uID0gcmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISh5aWVsZCBTdGF0ZS5lbXB0eShkZWxldGVkKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBuZXh0OiB5aWVsZCBmaW5kKGRlbGV0ZWQsIFJhbmdlLmFsbCkgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IEtleS5TRU5USU5FTCB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBwcmV2OiB5aWVsZCBmaW5kKHN0YXRlLCBbcG9zaXRpb24sIHsgbmV4dDogS2V5LlNFTlRJTkVMIH1dKSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gKHlpZWxkIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBtb3ZlKFN0YXRlLnJldmVyc2UocGFyZW50U3RhdGUpLCBSYW5nZS5yZXZlcnNlKHBhdGNoLnJhbmdlKSkudGhlbihQb3NpdGlvbi5yZXZlcnNlKSxcbiAgICAgICAgICAgICAgICBtb3ZlKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSlcbiAgICAgICAgICAgIF0pKTtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmlsdGVyKHBhdGNoLmFkZGVkLCBmaWx0ZXJGbikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyLCBnZXRTdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGUuem9vbShwYXJlbnQuc3RhdGUsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzcGF0Y2hlciA9IE9ic2VydmFibGUubWFwKE9ic2VydmFibGUuZmlsdGVyKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiBTdGF0ZS5oYXMoU3RhdGUuc2xpY2UocGFyZW50U3RhdGUsIHBhdGNoLnJhbmdlKSwga2V5KSksIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogUmFuZ2UuYWxsLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLnpvb20ocGF0Y2guYWRkZWQsIGtleSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3JlYXRlKGdldFN0YXRlKCksIGRpc3BhdGNoZXIsIGdldFN0YXRlKTtcbiAgICB9XG4gICAgU3RvcmUuem9vbSA9IHpvb207XG4gICAgZnVuY3Rpb24gZmxhdHRlbihwYXJlbnQpIHtcbiAgICAgICAgdmFyIGRpc3BhdGNoZXJfID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgdmFyIHBhcmVudF8gPSBjYWNoZShtYXAocGFyZW50LCAoKHN0b3JlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIE9ic2VydmFibGUubWFwKHN0b3JlLmRpc3BhdGNoZXIsIHBhdGNoID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ucHJldiA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlLnByZXYoS2V5LlNFTlRJTkVMKS50aGVuKG5leHQgPT4gKHsgbmV4dDogW2tleSwgbmV4dF0gfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogW2tleSwgcG9zaXRpb24ucHJldl0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcE5leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0gS2V5LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlLm5leHQoS2V5LlNFTlRJTkVMKS50aGVuKHByZXYgPT4gKHsgcHJldjogW2tleSwgcHJldl0gfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogW2tleSwgcG9zaXRpb24ubmV4dF0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHBhdGNoLmFkZGVkIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShkaXNwYXRjaGVyXyk7XG4gICAgICAgICAgICByZXR1cm4gc3RvcmUuc3RhdGU7XG4gICAgICAgIH0pKSk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLnByZXYgPT09IEtleS5TRU5USU5FTCA/IFByb21pc2UucmVzb2x2ZSh7IHByZXY6IEtleS5TRU5USU5FTCB9KSA6IFRyZWUubmV4dChwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ucHJldiwgbnVsbF0pLnRoZW4ocHJldiA9PiAoeyBwcmV2IH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcE5leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5uZXh0ID09PSBLZXkuU0VOVElORUwgPyBQcm9taXNlLnJlc29sdmUoeyBuZXh0OiBLZXkuU0VOVElORUwgfSkgOiBUcmVlLnByZXYocGFyZW50Xy5zdGF0ZSwgW3Bvc2l0aW9uLm5leHQsIG51bGxdKS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgc3RvcmUgPT4gc3RvcmUuc3RhdGUpKSA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgIH0pLnN1YnNjcmliZShkaXNwYXRjaGVyXyk7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmZsYXR0ZW4ocGFyZW50Xy5zdGF0ZSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIGRpc3BhdGNoZXJfKTtcbiAgICB9XG4gICAgU3RvcmUuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gZmxhdE1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBTdG9yZS5mbGF0dGVuKFN0b3JlLm1hcChwYXJlbnQsIG1hcEZuKSk7XG4gICAgfVxuICAgIFN0b3JlLmZsYXRNYXAgPSBmbGF0TWFwO1xuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4sIHJldmVyc2VLZXlGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5rZXlCeShwYXJlbnQuc3RhdGUsIGtleUZuLCByZXZlcnNlS2V5Rm4pLCBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgZGlzcGF0Y2hlciA9IE9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCAocGF0Y2gpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgW2Zyb20sIHRvXSA9IHBhdGNoLnJhbmdlO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLnByZXYgPT09IEtleS5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBwcmV2OiBLZXkuU0VOVElORUwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHByZXY6IHlpZWxkIGtleUZuKHlpZWxkIHBhcmVudFN0YXRlLmdldChwb3NpdGlvbi5wcmV2KSwgcG9zaXRpb24ucHJldikgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5uZXh0ID09PSBLZXkuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgbmV4dDogS2V5LlNFTlRJTkVMIH07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBuZXh0OiB5aWVsZCBrZXlGbih5aWVsZCBwYXJlbnRTdGF0ZS5nZXQocG9zaXRpb24ubmV4dCksIHBvc2l0aW9uLm5leHQpIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByYW5nZSA9ICh5aWVsZCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgbWFwUG9zaXRpb24oZnJvbSksXG4gICAgICAgICAgICAgICAgbWFwUG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5rZXlCeShwYXRjaC5hZGRlZCwga2V5Rm4pIDogdW5kZWZpbmVkIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24gc2NhbihwYXJlbnQsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBTdGF0ZS5zY2FuKHBhcmVudC5zdGF0ZSwgc2NhbkZuLCBtZW1vKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RvcmUsIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlLCBzdG9yZVN0YXRlID0gc3RvcmUuc3RhdGUsIFtmcm9tLCB0b10gPSBwYXRjaC5yYW5nZTtcbiAgICAgICAgICAgIHZhciBhZGRlZCA9IFN0YXRlLmxhenkoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdCA9IHlpZWxkIFN0YXRlLmxhc3Qoc3RvcmVTdGF0ZSwgW3sgbmV4dDogbnVsbCB9LCBmcm9tXSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0YXRlLnNjYW4oU3RhdGUuc2xpY2UocGFyZW50U3RhdGUsIFt7IG5leHQ6IGxhc3QgfSwgeyBwcmV2OiBudWxsIH1dKSwgc2NhbkZuLCBsYXN0ICE9PSBLZXkuU0VOVElORUwgPyB5aWVsZCBzdG9yZVN0YXRlLmdldChsYXN0KSA6IG1lbW8pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IFtmcm9tLCB7IHByZXY6IG51bGwgfV0sIGFkZGVkIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHN0b3JlID0gY3JlYXRlKGdldFN0YXRlKCksIGRpc3BhdGNoZXIpO1xuICAgIH1cbiAgICBTdG9yZS5zY2FuID0gc2NhbjtcbiAgICBmdW5jdGlvbiB0YWtlKHBhcmVudCwgY291bnQpIHtcbiAgICAgICAgdmFyIHN0b3JlLCBzdGF0ZSA9IFN0YXRlLnRha2UocGFyZW50LnN0YXRlLCBjb3VudCk7XG4gICAgICAgIHZhciBpbmRleGVkID0gU3RvcmUuc2NhbihwYXJlbnQsIChbaW5kZXhdLCB2YWx1ZSkgPT4gW2luZGV4ICsgMSwgdmFsdWVdLCBbLTEsIG51bGxdKTtcbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSBPYnNlcnZhYmxlLm1hcChpbmRleGVkLmRpc3BhdGNoZXIsIChwYXRjaCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBbZnJvbV0gPSBwYXRjaC5yYW5nZSwgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIGluZGV4ZWRTdGF0ZSA9IGluZGV4ZWQuc3RhdGU7XG4gICAgICAgICAgICB2YXIga2V5ID0geWllbGQgU3RhdGUubGFzdChpbmRleGVkU3RhdGUsIFt7IG5leHQ6IG51bGwgfSwgZnJvbV0pO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0ga2V5ID09PSBLZXkuU0VOVElORUwgPyAtMSA6ICh5aWVsZCBpbmRleGVkU3RhdGUuZ2V0KGtleSkpWzBdO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLnRha2UoU3RhdGUubWFwKHBhdGNoLmFkZGVkLCAoW2luZGV4LCB2YWx1ZV0pID0+IHZhbHVlKSwgY291bnQgLSAoaW5kZXggKyAxKSlcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLnRha2UgPSB0YWtlO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gU3RvcmUuY3JlYXRlKFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhcmVudC5kaXNwYXRjaGVyLCAoc3RhdGUsIHBhdGNoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gU3RhdGUuY2FjaGUoUGF0Y2guYXBwbHkoc3RhdGUsIHBhdGNoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdG9yZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIHN0YXRlcyhzdG9yZSkge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5tYXAoc3RvcmUuZGlzcGF0Y2hlciwgKCkgPT4gc3RvcmUuc3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5zdGF0ZXMgPSBzdGF0ZXM7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXRlLCBkaXNwYXRjaGVyLCByZWR1Y2VyID0gUGF0Y2guYXBwbHkpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBkaXNwYXRjaGVyLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IChwYXRjaCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5zdGF0ZSA9IHlpZWxkIHJlZHVjZXIoc3RvcmUuc3RhdGUsIHBhdGNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViamVjdC5vbk5leHQocGF0Y2gpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHN0b3JlID0ge1xuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICBkaXNwYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSxcbiAgICAgICAgICAgICAgICBvbk5leHQ6IFN1YmplY3QuaXNTdWJqZWN0KGRpc3BhdGNoZXIpID8gZGlzcGF0Y2hlci5vbk5leHQgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHN0b3JlO1xuICAgIH1cbiAgICBTdG9yZS5jcmVhdGUgPSBjcmVhdGU7XG59KShTdG9yZSB8fCAoU3RvcmUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgU3RvcmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yZS5qcy5tYXAiXX0=

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
	//# sourceMappingURL=data:application/json;base64,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QUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHOytDQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxTQUFTO3FDQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQUUsaURBQVMsR0FBRyxJQUFJLENBQUM7cUNBQUUsQ0FBQztpQ0FBQSxDQUFDOzs7Ozs7OzthQUM3TCxFQUFDLENBQUM7U0FDTjtBQUNELGVBQU8sRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFLE1BQU0sRUFBTixNQUFNLEVBQUUsVUFBVSxFQUFWLFVBQVUsRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLENBQUM7S0FDckQ7QUFDRCxXQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztDQUMzQixDQUFBLENBQUUsT0FBTyxhQTNDQyxPQUFPLEdBMkNILE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQzs7QUFBQyIsImZpbGUiOiJvYnNlcnZhYmxlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFByb21pc2UsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvci5jYWxsKHRoaXNBcmcsIF9hcmd1bWVudHMpO1xuICAgICAgICBmdW5jdGlvbiBjYXN0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFByb21pc2UgJiYgdmFsdWUuY29uc3RydWN0b3IgPT09IFByb21pc2UgPyB2YWx1ZSA6IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgICAgICBmdW5jdGlvbiBvbmZ1bGZpbGwodmFsdWUpIHsgdHJ5IHsgc3RlcChcIm5leHRcIiwgdmFsdWUpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIG9ucmVqZWN0KHZhbHVlKSB7IHRyeSB7IHN0ZXAoXCJ0aHJvd1wiLCB2YWx1ZSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcCh2ZXJiLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGdlbmVyYXRvclt2ZXJiXSh2YWx1ZSk7XG4gICAgICAgICAgICByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGNhc3QocmVzdWx0LnZhbHVlKS50aGVuKG9uZnVsZmlsbCwgb25yZWplY3QpO1xuICAgICAgICB9XG4gICAgICAgIHN0ZXAoXCJuZXh0XCIsIHZvaWQgMCk7XG4gICAgfSk7XG59O1xuaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgRGlzcG9zYWJsZTtcbihmdW5jdGlvbiAoRGlzcG9zYWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaXNwb3Nlcikge1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChkaXNwb3NlcilcbiAgICAgICAgICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlIHx8IChEaXNwb3NhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgT2JzZXJ2YWJsZTtcbihmdW5jdGlvbiAoT2JzZXJ2YWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShmbikge1xuICAgICAgICB2YXIgc3ViamVjdDtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICBpZiAoIXN1YmplY3QpIHtcbiAgICAgICAgICAgICAgICBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAoZm4pXG4gICAgICAgICAgICAgICAgICAgIGZuKHN1YmplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3Quc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gcGlwZShvYnNlcnZhYmxlLCBvYnNlcnZlcikge1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZShvYnNlcnZlcik7XG4gICAgICAgIHJldHVybiBvYnNlcnZlcjtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5waXBlID0gcGlwZTtcbiAgICBmdW5jdGlvbiBtYXAob2JzZXJ2YWJsZSwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShtYXBGbih2YWx1ZSkpLnRoZW4oc3ViamVjdC5vbk5leHQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihvYnNlcnZhYmxlLCBmaWx0ZXJGbikge1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gc3ViamVjdC5vbk5leHQodmFsdWUpIDogdW5kZWZpbmVkKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKG9ic2VydmFibGUsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKHNjYW5GbihtZW1vLCB2YWx1ZSkpLnRoZW4odmFsdWUgPT4geyBtZW1vID0gdmFsdWU7IHJldHVybiBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUuc2NhbiA9IHNjYW47XG4gICAgZnVuY3Rpb24gZm9yRWFjaChvYnNlcnZhYmxlLCBmbikge1xuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiBmblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3ViamVjdCA9PiB7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3ViamVjdC5vbk5leHQpLnRoZW4oc3ViamVjdC5vbkNvbXBsZXRlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUuZnJvbVByb21pc2UgPSBmcm9tUHJvbWlzZTtcbiAgICBmdW5jdGlvbiB0b1Byb21pc2Uob2JzZXJ2YWJsZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogcmVzb2x2ZSxcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiByZXNvbHZlLFxuICAgICAgICAgICAgICAgIG9uRXJyb3I6IHJlamVjdFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnRvUHJvbWlzZSA9IHRvUHJvbWlzZTtcbiAgICBmdW5jdGlvbiBmcm9tSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBBc3luY0l0ZXJhdG9yLmZvckVhY2goaXRlcmF0b3IsIHN1YmplY3Qub25OZXh0KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZyb21JdGVyYXRvciA9IGZyb21JdGVyYXRvcjtcbiAgICBmdW5jdGlvbiB0b0l0ZXJhdG9yKG9ic2VydmFibGUpIHtcbiAgICAgICAgZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgICAgICAgICB2YXIgcmVzb2x2ZSwgcmVqZWN0LCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSA9IHJlcztcbiAgICAgICAgICAgICAgICByZWplY3QgPSByZWo7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7IHJlc29sdmUsIHJlamVjdCwgcHJvbWlzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgdmFyIGRlZmVycmVkcyA9IFtdO1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3JlZCA9IGZhbHNlO1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJlZHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZHMucG9wKCkucmVzb2x2ZSh7IGRvbmU6IGZhbHNlLCB2YWx1ZSB9KTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgIGlmIChkZWZlcnJlZHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBkZWZlcnJlZHMucG9wKCkucmVzb2x2ZSh7IGRvbmU6IHRydWUgfSk7XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25FcnJvcihyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXJyZWRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRzLnBvcCgpLnJlamVjdChyZWFzb24pO1xuICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9yID0gcmVhc29uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lICYmICF2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yZWQgJiYgIXZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IHZhbHVlcy5zaGlmdCgpIH07XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5jcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIE9ic2VydmFibGUudG9JdGVyYXRvciA9IHRvSXRlcmF0b3I7XG59KShPYnNlcnZhYmxlIHx8IChPYnNlcnZhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGlzU3ViamVjdChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmpbXCJvbk5leHRcIl0gPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG4gICAgU3ViamVjdC5pc1N1YmplY3QgPSBpc1N1YmplY3Q7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKSwgY3VycmVudCA9IFByb21pc2UucmVzb2x2ZSgpLCBjb21wbGV0ZWQgPSBmYWxzZSwgcmVzdWx0LCBlcnJvcmVkID0gZmFsc2UsIGVycm9yO1xuICAgICAgICBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKCkgPT4gb2JzZXJ2ZXIub25Db21wbGV0ZShyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcmVkKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCgpID0+IG9ic2VydmVyLm9uRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvYnNlcnZlcktleSA9IEtleS51bmlxdWUoKTtcbiAgICAgICAgICAgIG9ic2VydmVyc1tvYnNlcnZlcktleV0gPSBvYnNlcnZlcjtcbiAgICAgICAgICAgIHJldHVybiBEaXNwb3NhYmxlLmNyZWF0ZSgoKSA9PiBkZWxldGUgb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25OZXh0KHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgUHJvbWlzZSwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25OZXh0KHZhbHVlKSkpLnRoZW4oKCkgPT4geyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkNvbXBsZXRlKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIFByb21pc2UsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgY29tcGxldGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXM7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uQ29tcGxldGUgPyBvYnNlcnZlcnNba2V5XS5vbkNvbXBsZXRlKHJlcykgOiB1bmRlZmluZWQpKS50aGVuKCgpID0+IHsgb2JzZXJ2ZXJzID0gbnVsbDsgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvcihyZWFzb24pIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCBQcm9taXNlLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVycm9yID0gcmVhc29uO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbkVycm9yID8gb2JzZXJ2ZXJzW2tleV0ub25FcnJvcihyZWFzb24pIDogdW5kZWZpbmVkKSkudGhlbigoKSA9PiB7IG9ic2VydmVycyA9IG51bGw7IH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSwgb25OZXh0LCBvbkNvbXBsZXRlLCBvbkVycm9yIH07XG4gICAgfVxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xufSkoU3ViamVjdCB8fCAoU3ViamVjdCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcCJdfQ==

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