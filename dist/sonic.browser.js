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
	
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(1));
	__export(__webpack_require__(92));
	__export(__webpack_require__(98));
	__export(__webpack_require__(87));
	__export(__webpack_require__(97));
	__export(__webpack_require__(89));
	__export(__webpack_require__(100));
	__export(__webpack_require__(101));
	__export(__webpack_require__(102));
	__export(__webpack_require__(99));
	__export(__webpack_require__(90));
	__export(__webpack_require__(88));
	//# sourceMappingURL=sonic.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3Qvc29uaWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsU0FBUyxRQUFULENBQWtCLENBQWxCLEVBQXFCO0FBQ2pCLFNBQUssSUFBSSxDQUFULElBQWMsQ0FBZDtBQUFpQixZQUFJLENBQUMsUUFBUSxjQUFSLENBQXVCLENBQXZCLENBQUwsRUFBZ0MsUUFBUSxDQUFSLElBQWEsRUFBRSxDQUFGLENBQWI7QUFBakQ7QUFDSDtBQUNELFNBQVMsUUFBUSxTQUFSLENBQVQ7QUFDQSxTQUFTLFFBQVEsa0JBQVIsQ0FBVDtBQUNBLFNBQVMsUUFBUSxTQUFSLENBQVQ7QUFDQSxTQUFTLFFBQVEsU0FBUixDQUFUO0FBQ0EsU0FBUyxRQUFRLFFBQVIsQ0FBVDtBQUNBLFNBQVMsUUFBUSxTQUFSLENBQVQ7QUFDQSxTQUFTLFFBQVEsY0FBUixDQUFUO0FBQ0EsU0FBUyxRQUFRLGlCQUFSLENBQVQ7QUFDQSxTQUFTLFFBQVEsUUFBUixDQUFUO0FBQ0EsU0FBUyxRQUFRLFNBQVIsQ0FBVDtBQUNBLFNBQVMsUUFBUSxjQUFSLENBQVQ7QUFDQSxTQUFTLFFBQVEsU0FBUixDQUFUIiwiZmlsZSI6InNvbmljLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gX19leHBvcnQobSkge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcbn1cbl9fZXhwb3J0KHJlcXVpcmUoJy4vc3RhdGUnKSk7XG5fX2V4cG9ydChyZXF1aXJlKCcuL2FzeW5jX2l0ZXJhdG9yJykpO1xuX19leHBvcnQocmVxdWlyZSgnLi9zdG9yZScpKTtcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZW50cnknKSk7XG5fX2V4cG9ydChyZXF1aXJlKCcuL3RyZWUnKSk7XG5fX2V4cG9ydChyZXF1aXJlKCcuL2NhY2hlJykpO1xuX19leHBvcnQocmVxdWlyZSgnLi9vYnNlcnZhYmxlJykpO1xuX19leHBvcnQocmVxdWlyZSgnLi9wcm9taXNlX3V0aWxzJykpO1xuX19leHBvcnQocmVxdWlyZSgnLi9sZW5zJykpO1xuX19leHBvcnQocmVxdWlyZSgnLi9wYXRjaCcpKTtcbl9fZXhwb3J0KHJlcXVpcmUoJy4vZXhjZXB0aW9ucycpKTtcbl9fZXhwb3J0KHJlcXVpcmUoJy4vcmFuZ2UnKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb25pYy5qcy5tYXAiXX0=

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
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
	var key_1 = __webpack_require__(86);
	var entry_1 = __webpack_require__(87);
	var range_1 = __webpack_require__(88);
	var cache_1 = __webpack_require__(89);
	var async_iterator_1 = __webpack_require__(92);
	var tree_1 = __webpack_require__(97);
	var exceptions_1 = __webpack_require__(90);
	var State;
	(function (State) {
	    State.Empty = {
	        get: function get(key) {
	            return _promise2.default.reject(new exceptions_1.NotFound());
	        },
	        prev: function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	            return key === key_1.default.SENTINEL ? _promise2.default.resolve(key_1.default.SENTINEL) : _promise2.default.reject(new exceptions_1.NotFound());
	        },
	        next: function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	            return key === key_1.default.SENTINEL ? _promise2.default.resolve(key_1.default.SENTINEL) : _promise2.default.reject(new exceptions_1.NotFound());
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
	        var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
	        var _ref3 = (0, _slicedToArray3.default)(_ref2, 2);
	
	        var from = _ref3[0];
	        var to = _ref3[1];
	
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
	            return _regenerator2.default.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            return _context.abrupt('return', range_1.Position.isPrevPosition(from) ? from.prev : state.next(from.next));
	
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
	        var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
	        var _ref5 = (0, _slicedToArray3.default)(_ref4, 2);
	
	        var from = _ref5[0];
	        var to = _ref5[1];
	
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
	            return _regenerator2.default.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            return _context2.abrupt('return', range_1.Position.isNextPosition(to) ? to.next : state.prev(to.prev));
	
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
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
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
	
	                            if (!(_context3.t0 instanceof exceptions_1.NotFound)) {
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
	        return async_iterator_1.default.is(iterator, otherIterator, entry_1.default.is);
	    }
	    State.is = is;
	    function contains(state, value) {
	        return async_iterator_1.default.some(entries(state), function (entry) {
	            return entry[1] === value;
	        });
	    }
	    State.contains = contains;
	    function empty(state) {
	        return state.next().then(function (next) {
	            return next === key_1.default.SENTINEL;
	        });
	    }
	    State.empty = empty;
	    function any(state) {
	        return state.next().then(function (next) {
	            return next !== key_1.default.SENTINEL;
	        });
	    }
	    State.any = any;
	    function size(state) {
	        return async_iterator_1.default.size(keys(state));
	    }
	    State.size = size;
	    function slice(parent) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
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
	                    if (prev !== key_1.default.SENTINEL) return prev;
	                    return range_1.Position.isNextPosition(from) ? from.next : parent.prev(from.prev);
	                });
	            },
	            next: function next(key) {
	                return child.next(key).then(function (next) {
	                    if (next !== key_1.default.SENTINEL) return next;
	                    return range_1.Position.isPrevPosition(to) ? to.prev : parent.next(to.next);
	                });
	            }
	        });
	        bridgedParent = extend(filtered, {
	            prev: function prev(key) {
	                return parent.prev(key).then(function (prev) {
	                    if (range_1.Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(key_1.default.SENTINEL);
	                    return has(deleted, prev).then(function (res) {
	                        if (res) throw new exceptions_1.NotFound();
	                        return prev;
	                    });
	                });
	            },
	            next: function next(key) {
	                return parent.next(key).then(function (next) {
	                    if (range_1.Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(key_1.default.SENTINEL);
	                    return has(deleted, next).then(function (res) {
	                        if (res) throw new exceptions_1.NotFound();
	                        return next;
	                    });
	                });
	            }
	        });
	        function get(key) {
	            return bridgedChild.get(key).catch(function (reason) {
	                if (!(reason instanceof exceptions_1.NotFound)) throw reason;
	                return bridgedParent.get(key);
	            });
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            if (range_1.Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(key_1.default.SENTINEL);
	            return has(bridgedChild, key).then(function (res) {
	                return res ? bridgedChild.prev(key) : bridgedParent.prev(key);
	            });
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            if (range_1.Position.isNextPosition(from) && key === from.next) return bridgedChild.next(key_1.default.SENTINEL);
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
	            return async_iterator_1.default.filter(keys(state, [{ next: from }, { prev: null }]), have).next().then(function (result) {
	                return result.done ? key_1.default.SENTINEL : result.value;
	            });
	        }
	        function get(key) {
	            return have(key).then(function (res) {
	                if (!res) throw new exceptions_1.NotFound();
	                return parent.get(key);
	            });
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            if (key === key_1.default.SENTINEL) return find(reverse(parent), key);
	            return have(key).then(function (res) {
	                if (!res) throw new exceptions_1.NotFound();
	            }).then(function () {
	                return find(reverse(parent), key);
	            });
	        }
	        function next() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            if (key === key_1.default.SENTINEL) return find(parent, key);
	            return have(key).then(function (res) {
	                if (!res) throw new exceptions_1.NotFound();
	            }).then(function () {
	                return find(parent, key);
	            });
	        }
	        return extend(parent, { get: get, prev: prev, next: next });
	    }
	    State.filter = filter;
	    function scan(parent, scanFn, memo) {
	        return fromEntries(async_iterator_1.default.scan(entries(parent), function (memoEntry, entry) {
	            return _promise2.default.resolve(scanFn(memoEntry[1], entry[1], entry[0])).then(function (result) {
	                return [entry[0], result];
	            });
	        }, [key_1.default.SENTINEL, memo]));
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
	        return fromEntries(async_iterator_1.default.zip(async_iterator_1.default.zip(keys(parent), keys(other)), async_iterator_1.default.zip(values(parent), values(other))));
	    }
	    State.zip = zip;
	    function zoom(parent, key) {
	        var have;
	        function get(k) {
	            if (k === key) return parent.get(key);
	            return _promise2.default.reject(new exceptions_1.NotFound());
	        }
	        function next() {
	            var k = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            if (k !== key && k !== key_1.default.SENTINEL) return _promise2.default.reject(new exceptions_1.NotFound());
	            if (k === key) return _promise2.default.resolve(key_1.default.SENTINEL);
	            if (have !== undefined) return _promise2.default.resolve(have ? key : key_1.default.SENTINEL);
	            return has(parent, key).then(function (res) {
	                return (have = res) ? key : key_1.default.SENTINEL;
	            });
	        }
	        return { get: get, prev: next, next: next };
	    }
	    State.zoom = zoom;
	    function flatten(parent) {
	        return extend(parent, {
	            get: function get(key) {
	                return tree_1.Tree.get(parent, key);
	            },
	            prev: function prev(key) {
	                return tree_1.Tree.prev(parent, key);
	            },
	            next: function next(key) {
	                return tree_1.Tree.next(parent, key);
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
	        var groupKeyed = async_iterator_1.default.map(it, function (_ref6) {
	            var _ref7 = (0, _slicedToArray3.default)(_ref6, 2);
	
	            var key = _ref7[0];
	            var value = _ref7[1];
	            return _promise2.default.resolve(groupFn(value, key)).then(function (groupKey) {
	                return [groupKey, value];
	            });
	        });
	        var filtered = async_iterator_1.default.filter(groupKeyed, function (_ref8) {
	            var _ref9 = (0, _slicedToArray3.default)(_ref8, 2);
	
	            var groupKey = _ref9[0];
	            var value = _ref9[1];
	            return !((0, _stringify2.default)(groupKey) in states);
	        });
	        var mapped = async_iterator_1.default.map(filtered, function (_ref10) {
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
	
	        return fromEntries(async_iterator_1.default.unique(entries(parent), function (_ref12) {
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
	
	        return fromEntries(async_iterator_1.default.unique(async_iterator_1.default.concat(entries(state), entries(other)), function (_ref14) {
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
	        if (!reverseKeyFn) return fromEntries(async_iterator_1.default.map(entries(parent), function (entry) {
	            return _promise2.default.resolve(keyFn(entry[1], entry[0])).then(function (key) {
	                return [key, entry[1]];
	            });
	        }));
	        return {
	            get: function get(key) {
	                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee7() {
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
	                return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee8() {
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
	        return fromEntries(async_iterator_1.default.take(entries(parent), count));
	    }
	    State.take = take;
	    function skip(parent, count) {
	        return fromEntries(async_iterator_1.default.skip(entries(parent), count));
	    }
	    State.skip = skip;
	    function cache(parent) {
	        return cache_1.default.apply(parent, cache_1.default.create());
	    }
	    State.cache = cache;
	    function unit(value) {
	        var key = arguments.length <= 1 || arguments[1] === undefined ? key_1.default.unique() : arguments[1];
	
	        return {
	            get: function get(k) {
	                return k === key ? _promise2.default.resolve(value) : _promise2.default.reject(new exceptions_1.NotFound());
	            },
	            prev: function prev() {
	                var k = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	                return _promise2.default.resolve(k === key_1.default.SENTINEL ? key : key_1.default.SENTINEL);
	            },
	            next: function next() {
	                var k = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	                return _promise2.default.resolve(k === key_1.default.SENTINEL ? key : key_1.default.SENTINEL);
	            }
	        };
	    }
	    State.unit = unit;
	    function entries(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	        var current = key_1.default.SENTINEL;var done = false;
	        var _range = (0, _slicedToArray3.default)(range, 2);
	
	        var from = _range[0];
	        var to = _range[1];
	
	        function get(key) {
	            if (key === key_1.default.SENTINEL) return done = true, _promise2.default.resolve(async_iterator_1.default.done);
	            return state.get(key).then(function (value) {
	                return current = key, { done: false, value: [key, value] };
	            });
	        }
	        function iterate(key) {
	            return state.next(key).then(function (next) {
	                if (range_1.Position.isPrevPosition(to) && to.prev === next) return get(key_1.default.SENTINEL);
	                return get(next);
	            });
	        }
	        function next() {
	            if (range_1.Position.isPrevPosition(from) && range_1.Position.isPrevPosition(to) && from.prev === to.prev) return get(key_1.default.SENTINEL);
	            if (range_1.Position.isNextPosition(from) && range_1.Position.isNextPosition(to) && from.next === to.next) return get(key_1.default.SENTINEL);
	            if (current === key_1.default.SENTINEL) return range_1.Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
	            if (range_1.Position.isNextPosition(to) && to.next === current) return get(key_1.default.SENTINEL);
	            return iterate(current);
	        }
	        return async_iterator_1.default.create(next);
	    }
	    State.entries = entries;
	    function keys(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
	        return async_iterator_1.default.map(entries(state, range), entry_1.default.key);
	    }
	    State.keys = keys;
	    function values(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
	        return async_iterator_1.default.map(entries(state, range), entry_1.default.value);
	    }
	    State.values = values;
	    function fromEntries(iterator) {
	        var _this4 = this;
	
	        var cache = cache_1.default.create(),
	            exhausted = false,
	            currentKey = key_1.default.SENTINEL,
	            queue = _promise2.default.resolve(null);
	        var cachingIterator = async_iterator_1.default.create(function () {
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
	                                cache.prev(key_1.default.SENTINEL, currentKey);
	                                cache.next(currentKey, key_1.default.SENTINEL);
	                                return _context10.abrupt('return', async_iterator_1.default.done);
	
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
	            if (exhausted) return _promise2.default.reject(new exceptions_1.NotFound());
	            return async_iterator_1.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(entry_1.default.value);
	        }
	        function prev() {
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee11() {
	                return _regenerator2.default.wrap(function _callee11$(_context11) {
	                    while (1) {
	                        switch (_context11.prev = _context11.next) {
	                            case 0:
	                                if (!exhausted) {
	                                    _context11.next = 2;
	                                    break;
	                                }
	
	                                return _context11.abrupt('return', _promise2.default.reject(new exceptions_1.NotFound()));
	
	                            case 2:
	                                _context11.next = 4;
	                                return async_iterator_1.default.some(cachingIterator, function (entry) {
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
	            var key = arguments.length <= 0 || arguments[0] === undefined ? key_1.default.SENTINEL : arguments[0];
	
	            if (exhausted) return _promise2.default.reject(new exceptions_1.NotFound());
	            if (key === currentKey) return cachingIterator.next().then(function (result) {
	                return result.done ? key_1.default.SENTINEL : result.value[0];
	            });
	            return async_iterator_1.default.find(cachingIterator, function (entry) {
	                return entry[0] === key;
	            }).then(function () {
	                return cachingIterator.next();
	            }).then(function (result) {
	                return result.done ? key_1.default.SENTINEL : result.value[0];
	            });
	        }
	        return cache_1.default.apply({ get: get, prev: prev, next: next }, cache);
	    }
	    State.fromEntries = fromEntries;
	    function fromKeys(iterator) {
	        return fromEntries(async_iterator_1.default.map(iterator, function (key) {
	            return [key, null];
	        }));
	    }
	    State.fromKeys = fromKeys;
	    function fromValues(iterator) {
	        return fromEntries(async_iterator_1.default.scan(iterator, function (prev, value) {
	            return [prev[0] + 1, value];
	        }, [-1, null]));
	    }
	    State.fromValues = fromValues;
	    function fromArray(values) {
	        return fromValues(async_iterator_1.default.fromArray(values));
	    }
	    State.fromArray = fromArray;
	    function fromObject(values) {
	        return fromEntries(async_iterator_1.default.fromObject(values));
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
	        var range = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
	        return async_iterator_1.default.toObject(entries(state, range));
	    }
	    State.toObject = toObject;
	    function toArray(state) {
	        var range = arguments.length <= 1 || arguments[1] === undefined ? range_1.Range.all : arguments[1];
	
	        return async_iterator_1.default.toArray(values(state, range));
	    }
	    State.toArray = toArray;
	})(State = exports.State || (exports.State = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = State;
	//# sourceMappingURL=state.js.map
	//# sourceMappingURL=data:application/json;base64,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Q0QsaUJBQVMsSUFBVCxDQUFjLEdBQWQsRUFBbUI7QUFDZixtQkFBTyxRQUFRLE1BQU0sSUFBTixDQUFXLEdBQVgsQ0FBUixHQUEwQixNQUFNLElBQU4sQ0FBVyxXQUFYLEVBQXdCLElBQXhCLENBQTZCO0FBQUEsdUJBQUssRUFBRSxJQUFGLENBQU8sR0FBUCxDQUFMO0FBQUEsYUFBN0IsQ0FBakM7QUFDSDtBQUNELGVBQU8sRUFBRSxRQUFGLEVBQU8sVUFBUCxFQUFhLFVBQWIsRUFBUDtBQUNIO0FBQ0QsVUFBTSxJQUFOLEdBQWEsSUFBYjtBQUNBLGFBQVMsUUFBVCxDQUFrQixLQUFsQixFQUFvRDtBQUFBLFlBQTNCLEtBQTJCLHlEQUFuQixRQUFRLEtBQVIsQ0FBYyxHQUFLOztBQUNoRCxlQUFPLGlCQUFpQixPQUFqQixDQUF5QixRQUF6QixDQUFrQyxRQUFRLEtBQVIsRUFBZSxLQUFmLENBQWxDLENBQVA7QUFDSDtBQUNELFVBQU0sUUFBTixHQUFpQixRQUFqQjtBQUNBLGFBQVMsT0FBVCxDQUFpQixLQUFqQixFQUFtRDtBQUFBLFlBQTNCLEtBQTJCLHlEQUFuQixRQUFRLEtBQVIsQ0FBYyxHQUFLOztBQUMvQyxlQUFPLGlCQUFpQixPQUFqQixDQUF5QixPQUF6QixDQUFpQyxPQUFPLEtBQVAsRUFBYyxLQUFkLENBQWpDLENBQVA7QUFDSDtBQUNELFVBQU0sT0FBTixHQUFnQixPQUFoQjtBQUNILENBelpELEVBeVpHLFFBQVEsUUFBUSxLQUFSLEtBQWtCLFFBQVEsS0FBUixHQUFnQixFQUFsQyxDQXpaWDtBQTBaQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkMsRUFBRSxPQUFPLElBQVQsRUFBN0M7QUFDQSxRQUFRLE9BQVIsR0FBa0IsS0FBbEIiLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jb25zdCBrZXlfMSA9IHJlcXVpcmUoJy4va2V5Jyk7XG5jb25zdCBlbnRyeV8xID0gcmVxdWlyZSgnLi9lbnRyeScpO1xuY29uc3QgcmFuZ2VfMSA9IHJlcXVpcmUoJy4vcmFuZ2UnKTtcbmNvbnN0IGNhY2hlXzEgPSByZXF1aXJlKCcuL2NhY2hlJyk7XG5jb25zdCBhc3luY19pdGVyYXRvcl8xID0gcmVxdWlyZSgnLi9hc3luY19pdGVyYXRvcicpO1xuY29uc3QgdHJlZV8xID0gcmVxdWlyZSgnLi90cmVlJyk7XG5jb25zdCBleGNlcHRpb25zXzEgPSByZXF1aXJlKCcuL2V4Y2VwdGlvbnMnKTtcbnZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZS5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoa2V5KSA9PiBQcm9taXNlLnJlamVjdChuZXcgZXhjZXB0aW9uc18xLk5vdEZvdW5kKSxcbiAgICAgICAgcHJldjogKGtleSA9IGtleV8xLmRlZmF1bHQuU0VOVElORUwpID0+IGtleSA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA/IFByb21pc2UucmVzb2x2ZShrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKSA6IFByb21pc2UucmVqZWN0KG5ldyBleGNlcHRpb25zXzEuTm90Rm91bmQpLFxuICAgICAgICBuZXh0OiAoa2V5ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkgPT4ga2V5ID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMID8gUHJvbWlzZS5yZXNvbHZlKGtleV8xLmRlZmF1bHQuU0VOVElORUwpIDogUHJvbWlzZS5yZWplY3QobmV3IGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZClcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIHsgZ2V0LCBwcmV2LCBuZXh0IH0pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQpO1xuICAgICAgICBpZiAoZ2V0KVxuICAgICAgICAgICAgc3RhdGUuZ2V0ID0gZ2V0O1xuICAgICAgICBpZiAocHJldilcbiAgICAgICAgICAgIHN0YXRlLnByZXYgPSBwcmV2O1xuICAgICAgICBpZiAobmV4dClcbiAgICAgICAgICAgIHN0YXRlLm5leHQgPSBuZXh0O1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIFN0YXRlLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBmaXJzdChzdGF0ZSwgW2Zyb20sIHRvXSA9IHJhbmdlXzEuUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VfMS5Qb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IGZyb20ucHJldiA6IHN0YXRlLm5leHQoZnJvbS5uZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZpcnN0ID0gZmlyc3Q7XG4gICAgZnVuY3Rpb24gbGFzdChzdGF0ZSwgW2Zyb20sIHRvXSA9IHJhbmdlXzEuUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VfMS5Qb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyB0by5uZXh0IDogc3RhdGUucHJldih0by5wcmV2KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLmxhc3QgPSBsYXN0O1xuICAgIGZ1bmN0aW9uIGhhcyhzdGF0ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHN0YXRlLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZXhjZXB0aW9uc18xLk5vdEZvdW5kKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5oYXMgPSBoYXM7XG4gICAgZnVuY3Rpb24gaXMoc3RhdGUsIG90aGVyKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGVudHJpZXMoc3RhdGUpLCBvdGhlckl0ZXJhdG9yID0gZW50cmllcyhvdGhlcik7XG4gICAgICAgIHJldHVybiBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuaXMoaXRlcmF0b3IsIG90aGVySXRlcmF0b3IsIGVudHJ5XzEuZGVmYXVsdC5pcyk7XG4gICAgfVxuICAgIFN0YXRlLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoc3RhdGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuc29tZShlbnRyaWVzKHN0YXRlKSwgZW50cnkgPT4gZW50cnlbMV0gPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBlbXB0eShzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUubmV4dCgpLnRoZW4obmV4dCA9PiBuZXh0ID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKTtcbiAgICB9XG4gICAgU3RhdGUuZW1wdHkgPSBlbXB0eTtcbiAgICBmdW5jdGlvbiBhbnkoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCAhPT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCk7XG4gICAgfVxuICAgIFN0YXRlLmFueSA9IGFueTtcbiAgICBmdW5jdGlvbiBzaXplKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuc2l6ZShrZXlzKHN0YXRlKSk7XG4gICAgfVxuICAgIFN0YXRlLnNpemUgPSBzaXplO1xuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSByYW5nZV8xLlJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoZW50cmllcyhwYXJlbnQsIHJhbmdlKSk7XG4gICAgfVxuICAgIFN0YXRlLnNsaWNlID0gc2xpY2U7XG4gICAgZnVuY3Rpb24gc3BsaWNlKHBhcmVudCwgcmFuZ2UsIGNoaWxkKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgIGJyaWRnZWRDaGlsZCA9IGV4dGVuZChjaGlsZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IGNoaWxkLnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VfMS5Qb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IGZyb20ubmV4dCA6IHBhcmVudC5wcmV2KGZyb20ucHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAhPT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlXzEuUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pID8gdG8ucHJldiA6IHBhcmVudC5uZXh0KHRvLm5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGJyaWRnZWRQYXJlbnQgPSBleHRlbmQoZmlsdGVyZWQsIHtcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiBwYXJlbnQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHByZXYgPT09IHRvLm5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQucHJldihrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzKGRlbGV0ZWQsIHByZXYpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zXzEuTm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gcGFyZW50Lm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyYW5nZV8xLlBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIG5leHQgPT09IGZyb20ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KGtleV8xLmRlZmF1bHQuU0VOVElORUwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgbmV4dCkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5nZXQoa2V5KS5jYXRjaChyZWFzb24gPT4ge1xuICAgICAgICAgICAgICAgIGlmICghKHJlYXNvbiBpbnN0YW5jZW9mIGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZCkpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IHJlYXNvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZFBhcmVudC5nZXQoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkge1xuICAgICAgICAgICAgaWYgKHJhbmdlXzEuUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGtleSA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZENoaWxkLnByZXYoa2V5XzEuZGVmYXVsdC5TRU5USU5FTCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkge1xuICAgICAgICAgICAgaWYgKHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KGtleV8xLmRlZmF1bHQuU0VOVElORUwpO1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhicmlkZ2VkQ2hpbGQsIGtleSkudGhlbihyZXMgPT4gcmVzID8gYnJpZGdlZENoaWxkLm5leHQoa2V5KSA6IGJyaWRnZWRQYXJlbnQubmV4dChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgU3RhdGUuc3BsaWNlID0gc3BsaWNlO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocGFyZW50KSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBwcmV2OiBwYXJlbnQubmV4dCxcbiAgICAgICAgICAgIG5leHQ6IHBhcmVudC5wcmV2XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5yZXZlcnNlID0gcmV2ZXJzZTtcbiAgICBmdW5jdGlvbiBtYXAocGFyZW50LCBtYXBGbikge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gbWFwRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCB9KTtcbiAgICB9XG4gICAgU3RhdGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihwYXJlbnQsIGZpbHRlckZuKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGZ1bmN0aW9uIGhhdmUoa2V5KSB7XG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBKU09OLnN0cmluZ2lmeShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIGxhYmVsIGluIGNhY2hlID8gY2FjaGVbbGFiZWxdIDogY2FjaGVbbGFiZWxdID0gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gZmlsdGVyRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGZpbmQoc3RhdGUsIGZyb20pIHtcbiAgICAgICAgICAgIHJldHVybiBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuZmlsdGVyKGtleXMoc3RhdGUsIFt7IG5leHQ6IGZyb20gfSwgeyBwcmV2OiBudWxsIH1dKSwgaGF2ZSlcbiAgICAgICAgICAgICAgICAubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA6IHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhdmUoa2V5KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zXzEuTm90Rm91bmQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZChyZXZlcnNlKHBhcmVudCksIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gaGF2ZShrZXkpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZDtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZmluZChyZXZlcnNlKHBhcmVudCksIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkge1xuICAgICAgICAgICAgaWYgKGtleSA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZChwYXJlbnQsIGtleSk7XG4gICAgICAgICAgICByZXR1cm4gaGF2ZShrZXkpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZDtcbiAgICAgICAgICAgIH0pLnRoZW4oKCkgPT4gZmluZChwYXJlbnQsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ocGFyZW50LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5zY2FuKGVudHJpZXMocGFyZW50KSwgKG1lbW9FbnRyeSwgZW50cnkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW9FbnRyeVsxXSwgZW50cnlbMV0sIGVudHJ5WzBdKSkudGhlbihyZXN1bHQgPT4gW2VudHJ5WzBdLCByZXN1bHRdKTtcbiAgICAgICAgfSwgW2tleV8xLmRlZmF1bHQuU0VOVElORUwsIG1lbW9dKSk7XG4gICAgfVxuICAgIFN0YXRlLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHBpY2socGFyZW50LCBwaWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBoYXMocGlja2VkLCBrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUucGljayA9IHBpY2s7XG4gICAgZnVuY3Rpb24gb21pdChwYXJlbnQsIG9taXR0ZWQpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiAhKHlpZWxkIGhhcyhvbWl0dGVkLCBrZXkpKTsgfSkpO1xuICAgIH1cbiAgICBTdGF0ZS5vbWl0ID0gb21pdDtcbiAgICBmdW5jdGlvbiB6aXAocGFyZW50LCBvdGhlcikge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LnppcChhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuemlwKGtleXMocGFyZW50KSwga2V5cyhvdGhlcikpLCBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuemlwKHZhbHVlcyhwYXJlbnQpLCB2YWx1ZXMob3RoZXIpKSkpO1xuICAgIH1cbiAgICBTdGF0ZS56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gem9vbShwYXJlbnQsIGtleSkge1xuICAgICAgICB2YXIgaGF2ZTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGspIHtcbiAgICAgICAgICAgIGlmIChrID09PSBrZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgZXhjZXB0aW9uc18xLk5vdEZvdW5kKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGsgPSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICBpZiAoayAhPT0ga2V5ICYmIGsgIT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBleGNlcHRpb25zXzEuTm90Rm91bmQpO1xuICAgICAgICAgICAgaWYgKGsgPT09IGtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleV8xLmRlZmF1bHQuU0VOVElORUwpO1xuICAgICAgICAgICAgaWYgKGhhdmUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGhhdmUgPyBrZXkgOiBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIHJldHVybiBoYXMocGFyZW50LCBrZXkpLnRoZW4ocmVzID0+IChoYXZlID0gcmVzKSA/IGtleSA6IGtleV8xLmRlZmF1bHQuU0VOVElORUwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldjogbmV4dCwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gdHJlZV8xLlRyZWUuZ2V0KHBhcmVudCwga2V5KSxcbiAgICAgICAgICAgIHByZXY6IGtleSA9PiB0cmVlXzEuVHJlZS5wcmV2KHBhcmVudCwga2V5KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiB0cmVlXzEuVHJlZS5uZXh0KHBhcmVudCwga2V5KVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gZmxhdE1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXJlbnQsIG1hcEZuKSk7XG4gICAgfVxuICAgIFN0YXRlLmZsYXRNYXAgPSBmbGF0TWFwO1xuICAgIGZ1bmN0aW9uIGdyb3VwQnkocGFyZW50LCBncm91cEZuKSB7XG4gICAgICAgIHZhciBzdGF0ZXMgPSB7fTtcbiAgICAgICAgdmFyIGl0ID0gZW50cmllcyhwYXJlbnQpO1xuICAgICAgICB2YXIgZ3JvdXBLZXllZCA9IGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5tYXAoaXQsIChba2V5LCB2YWx1ZV0pID0+IHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZShncm91cEZuKHZhbHVlLCBrZXkpKS50aGVuKGdyb3VwS2V5ID0+IFtncm91cEtleSwgdmFsdWVdKTsgfSk7XG4gICAgICAgIHZhciBmaWx0ZXJlZCA9IGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5maWx0ZXIoZ3JvdXBLZXllZCwgKFtncm91cEtleSwgdmFsdWVdKSA9PiAhKEpTT04uc3RyaW5naWZ5KGdyb3VwS2V5KSBpbiBzdGF0ZXMpKTtcbiAgICAgICAgdmFyIG1hcHBlZCA9IGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5tYXAoZmlsdGVyZWQsIChbZ3JvdXBLZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gZmlsdGVyKHBhcmVudCwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShncm91cEZuKHZhbHVlLCBrZXkpKS50aGVuKGdrID0+IGdrID09PSBncm91cEtleSkpO1xuICAgICAgICAgICAgcmV0dXJuIFtncm91cEtleSwgc3RhdGVzW0pTT04uc3RyaW5naWZ5KGdyb3VwS2V5KV0gPSBzdGF0ZV07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMobWFwcGVkKTtcbiAgICB9XG4gICAgU3RhdGUuZ3JvdXBCeSA9IGdyb3VwQnk7XG4gICAgZnVuY3Rpb24gdW5pcXVlKHBhcmVudCwgdW5pcXVlRm4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC51bmlxdWUoZW50cmllcyhwYXJlbnQpLCAoW2tleSwgdmFsdWVdKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB1bmlxdWVGbih2YWx1ZSwga2V5KTsgfSkpKTtcbiAgICB9XG4gICAgU3RhdGUudW5pcXVlID0gdW5pcXVlO1xuICAgIGZ1bmN0aW9uIHVuaW9uKHN0YXRlLCBvdGhlciwgdW5pcXVlRm4pIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC51bmlxdWUoYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LmNvbmNhdChlbnRyaWVzKHN0YXRlKSwgZW50cmllcyhvdGhlcikpLCAoW2tleSwgdmFsdWVdKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiB1bmlxdWVGbih2YWx1ZSwga2V5KTsgfSkpKTtcbiAgICB9XG4gICAgU3RhdGUudW5pb24gPSB1bmlvbjtcbiAgICBmdW5jdGlvbiBrZXlCeShwYXJlbnQsIGtleUZuLCByZXZlcnNlS2V5Rm4pIHtcbiAgICAgICAgaWYgKCFyZXZlcnNlS2V5Rm4pXG4gICAgICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0Lm1hcChlbnRyaWVzKHBhcmVudCksIGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleUZuKGVudHJ5WzFdLCBlbnRyeVswXSkpLnRoZW4oa2V5ID0+IFtrZXksIGVudHJ5WzFdXSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5nZXQoeWllbGQgcmV2ZXJzZUtleUZuKGtleSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXYoa2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXYgPSB5aWVsZCBwYXJlbnQucHJldih5aWVsZCByZXZlcnNlS2V5Rm4oa2V5KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlGbih5aWVsZCBwYXJlbnQuZ2V0KHByZXYpLCBwcmV2KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0KGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0geWllbGQgcGFyZW50Lm5leHQoeWllbGQgcmV2ZXJzZUtleUZuKGtleSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5Rm4oeWllbGQgcGFyZW50LmdldChuZXh0KSwgbmV4dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0YXRlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24gdGFrZShwYXJlbnQsIGNvdW50KSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQudGFrZShlbnRyaWVzKHBhcmVudCksIGNvdW50KSk7XG4gICAgfVxuICAgIFN0YXRlLnRha2UgPSB0YWtlO1xuICAgIGZ1bmN0aW9uIHNraXAocGFyZW50LCBjb3VudCkge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LnNraXAoZW50cmllcyhwYXJlbnQpLCBjb3VudCkpO1xuICAgIH1cbiAgICBTdGF0ZS5za2lwID0gc2tpcDtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlXzEuZGVmYXVsdC5hcHBseShwYXJlbnQsIGNhY2hlXzEuZGVmYXVsdC5jcmVhdGUoKSk7XG4gICAgfVxuICAgIFN0YXRlLmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24gdW5pdCh2YWx1ZSwga2V5ID0ga2V5XzEuZGVmYXVsdC51bmlxdWUoKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBrID0+IGsgPT09IGtleSA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZSkgOiBQcm9taXNlLnJlamVjdChuZXcgZXhjZXB0aW9uc18xLk5vdEZvdW5kKSxcbiAgICAgICAgICAgIHByZXY6IChrID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkgPT4gUHJvbWlzZS5yZXNvbHZlKGsgPT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwgPyBrZXkgOiBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKSxcbiAgICAgICAgICAgIG5leHQ6IChrID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkgPT4gUHJvbWlzZS5yZXNvbHZlKGsgPT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwgPyBrZXkgOiBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBTdGF0ZS51bml0ID0gdW5pdDtcbiAgICBmdW5jdGlvbiBlbnRyaWVzKHN0YXRlLCByYW5nZSA9IHJhbmdlXzEuUmFuZ2UuYWxsKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCwgZG9uZSA9IGZhbHNlLCBbZnJvbSwgdG9dID0gcmFuZ2U7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkb25lID0gdHJ1ZSwgUHJvbWlzZS5yZXNvbHZlKGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5kb25lKSk7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiAoY3VycmVudCA9IGtleSwgeyBkb25lOiBmYWxzZSwgdmFsdWU6IFtrZXksIHZhbHVlXSB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VfMS5Qb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgdG8ucHJldiA9PT0gbmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KG5leHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIGlmIChyYW5nZV8xLlBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIHJhbmdlXzEuUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KGtleV8xLmRlZmF1bHQuU0VOVElORUwpO1xuICAgICAgICAgICAgaWYgKHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYgcmFuZ2VfMS5Qb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgZnJvbS5uZXh0ID09PSB0by5uZXh0KVxuICAgICAgICAgICAgICAgIHJldHVybiBnZXQoa2V5XzEuZGVmYXVsdC5TRU5USU5FTCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTClcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VfMS5Qb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IGdldChmcm9tLnByZXYpIDogaXRlcmF0ZShmcm9tLm5leHQpO1xuICAgICAgICAgICAgaWYgKHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHRvLm5leHQgPT09IGN1cnJlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldChrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKTtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlKGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBTdGF0ZS5lbnRyaWVzID0gZW50cmllcztcbiAgICBmdW5jdGlvbiBrZXlzKHN0YXRlLCByYW5nZSA9IHJhbmdlXzEuUmFuZ2UuYWxsKSB7XG4gICAgICAgIHJldHVybiBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQubWFwKGVudHJpZXMoc3RhdGUsIHJhbmdlKSwgZW50cnlfMS5kZWZhdWx0LmtleSk7XG4gICAgfVxuICAgIFN0YXRlLmtleXMgPSBrZXlzO1xuICAgIGZ1bmN0aW9uIHZhbHVlcyhzdGF0ZSwgcmFuZ2UgPSByYW5nZV8xLlJhbmdlLmFsbCkge1xuICAgICAgICByZXR1cm4gYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0Lm1hcChlbnRyaWVzKHN0YXRlLCByYW5nZSksIGVudHJ5XzEuZGVmYXVsdC52YWx1ZSk7XG4gICAgfVxuICAgIFN0YXRlLnZhbHVlcyA9IHZhbHVlcztcbiAgICBmdW5jdGlvbiBmcm9tRW50cmllcyhpdGVyYXRvcikge1xuICAgICAgICB2YXIgY2FjaGUgPSBjYWNoZV8xLmRlZmF1bHQuY3JlYXRlKCksIGV4aGF1c3RlZCA9IGZhbHNlLCBjdXJyZW50S2V5ID0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHZhciBjYWNoaW5nSXRlcmF0b3IgPSBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuY3JlYXRlKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBleGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhY2hlLnByZXYoa2V5XzEuZGVmYXVsdC5TRU5USU5FTCwgY3VycmVudEtleSk7XG4gICAgICAgICAgICAgICAgY2FjaGUubmV4dChjdXJyZW50S2V5LCBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LmRvbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgW2tleSwgdmFsdWVdID0gcmVzdWx0LnZhbHVlO1xuICAgICAgICAgICAgY2FjaGUucHJldihrZXksIGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgY2FjaGUubmV4dChjdXJyZW50S2V5LCBrZXkpO1xuICAgICAgICAgICAgY2FjaGUuZ2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgY3VycmVudEtleSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogW2tleSwgdmFsdWVdIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZCk7XG4gICAgICAgICAgICByZXR1cm4gYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCBlbnRyeSA9PiBlbnRyeVswXSA9PT0ga2V5KS50aGVuKGVudHJ5XzEuZGVmYXVsdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkgPSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgZXhjZXB0aW9uc18xLk5vdEZvdW5kKTtcbiAgICAgICAgICAgICAgICB5aWVsZCBhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuc29tZShjYWNoaW5nSXRlcmF0b3IsIGVudHJ5ID0+IGVudHJ5WzBdID09PSBrZXkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZS5wcmV2KGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSA9IGtleV8xLmRlZmF1bHQuU0VOVElORUwpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBleGNlcHRpb25zXzEuTm90Rm91bmQpO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gY3VycmVudEtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IGtleV8xLmRlZmF1bHQuU0VOVElORUwgOiByZXN1bHQudmFsdWVbMF0pO1xuICAgICAgICAgICAgcmV0dXJuIGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5maW5kKGNhY2hpbmdJdGVyYXRvciwgZW50cnkgPT4gZW50cnlbMF0gPT09IGtleSkudGhlbigoKSA9PiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IGtleV8xLmRlZmF1bHQuU0VOVElORUwgOiByZXN1bHQudmFsdWVbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWNoZV8xLmRlZmF1bHQuYXBwbHkoeyBnZXQsIHByZXYsIG5leHQgfSwgY2FjaGUpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tRW50cmllcyA9IGZyb21FbnRyaWVzO1xuICAgIGZ1bmN0aW9uIGZyb21LZXlzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQubWFwKGl0ZXJhdG9yLCBrZXkgPT4gW2tleSwgbnVsbF0pKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUtleXMgPSBmcm9tS2V5cztcbiAgICBmdW5jdGlvbiBmcm9tVmFsdWVzKGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhhc3luY19pdGVyYXRvcl8xLmRlZmF1bHQuc2NhbihpdGVyYXRvciwgKHByZXYsIHZhbHVlKSA9PiBbcHJldlswXSArIDEsIHZhbHVlXSwgWy0xLCBudWxsXSkpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tVmFsdWVzID0gZnJvbVZhbHVlcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmcm9tVmFsdWVzKGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5mcm9tQXJyYXkodmFsdWVzKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LmZyb21PYmplY3QodmFsdWVzKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIGxhenkoZm4pIHtcbiAgICAgICAgdmFyIHN0YXRlLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gc3RhdGUgOiBzdGF0ZSA9IHlpZWxkIGZuKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUgPyBzdGF0ZS5nZXQoa2V5KSA6IHF1ZXVlLnRoZW4oY3JlYXRlU3RhdGUpLnRoZW4ocyA9PiBzLmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gc3RhdGUucHJldihrZXkpIDogcXVldWUudGhlbihjcmVhdGVTdGF0ZSkudGhlbihzID0+IHMucHJldihrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlID8gc3RhdGUubmV4dChrZXkpIDogcXVldWUudGhlbihjcmVhdGVTdGF0ZSkudGhlbihzID0+IHMubmV4dChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgU3RhdGUubGF6eSA9IGxhenk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3Qoc3RhdGUsIHJhbmdlID0gcmFuZ2VfMS5SYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC50b09iamVjdChlbnRyaWVzKHN0YXRlLCByYW5nZSkpO1xuICAgIH1cbiAgICBTdGF0ZS50b09iamVjdCA9IHRvT2JqZWN0O1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoc3RhdGUsIHJhbmdlID0gcmFuZ2VfMS5SYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC50b0FycmF5KHZhbHVlcyhzdGF0ZSwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUudG9BcnJheSA9IHRvQXJyYXk7XG59KShTdGF0ZSA9IGV4cG9ydHMuU3RhdGUgfHwgKGV4cG9ydHMuU3RhdGUgPSB7fSkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdGF0ZS5qcy5tYXAiXX0=

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
	
	var Key;
	(function (Key) {
	    var uniqueKey = 0;
	    Key.SENTINEL = null;
	    function unique() {
	        return "s_" + uniqueKey++;
	    }
	    Key.unique = unique;
	})(Key || (Key = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Key;
	//# sourceMappingURL=key.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3Qva2V5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQUNBLElBQUksR0FBSjtBQUNBLENBQUMsVUFBVSxHQUFWLEVBQWU7QUFDWixRQUFJLFlBQVksQ0FBaEI7QUFDQSxRQUFJLFFBQUosR0FBZSxJQUFmO0FBQ0EsYUFBUyxNQUFULEdBQWtCO0FBQ2QsZUFBTyxPQUFPLFdBQWQ7QUFDSDtBQUNELFFBQUksTUFBSixHQUFhLE1BQWI7QUFDSCxDQVBELEVBT0csUUFBUSxNQUFNLEVBQWQsQ0FQSDtBQVFBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFLE9BQU8sSUFBVCxFQUE3QztBQUNBLFFBQVEsT0FBUixHQUFrQixHQUFsQiIsImZpbGUiOiJrZXkuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgS2V5O1xuKGZ1bmN0aW9uIChLZXkpIHtcbiAgICB2YXIgdW5pcXVlS2V5ID0gMDtcbiAgICBLZXkuU0VOVElORUwgPSBudWxsO1xuICAgIGZ1bmN0aW9uIHVuaXF1ZSgpIHtcbiAgICAgICAgcmV0dXJuIFwic19cIiArIHVuaXF1ZUtleSsrO1xuICAgIH1cbiAgICBLZXkudW5pcXVlID0gdW5pcXVlO1xufSkoS2V5IHx8IChLZXkgPSB7fSkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gS2V5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9a2V5LmpzLm1hcCJdfQ==

/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";
	
	var Entry;
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
	})(Entry = exports.Entry || (exports.Entry = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Entry;
	//# sourceMappingURL=entry.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvZW50cnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSSxLQUFKO0FBQ0EsQ0FBQyxVQUFVLEtBQVYsRUFBaUI7QUFDZCxhQUFTLEdBQVQsQ0FBYSxLQUFiLEVBQW9CO0FBQ2hCLGVBQU8sU0FBUyxNQUFNLENBQU4sQ0FBaEI7QUFDSDtBQUNELFVBQU0sR0FBTixHQUFZLEdBQVo7QUFDQSxhQUFTLEtBQVQsQ0FBZSxLQUFmLEVBQXNCO0FBQ2xCLGVBQU8sTUFBTSxDQUFOLENBQVA7QUFDSDtBQUNELFVBQU0sS0FBTixHQUFjLEtBQWQ7QUFDQSxhQUFTLEVBQVQsQ0FBWSxLQUFaLEVBQW1CLEtBQW5CLEVBQTBCO0FBQ3RCLGVBQU8sTUFBTSxDQUFOLE1BQWEsTUFBTSxDQUFOLENBQWIsSUFBeUIsTUFBTSxDQUFOLE1BQWEsTUFBTSxDQUFOLENBQTdDO0FBQ0g7QUFDRCxVQUFNLEVBQU4sR0FBVyxFQUFYO0FBQ0gsQ0FiRCxFQWFHLFFBQVEsUUFBUSxLQUFSLEtBQWtCLFFBQVEsS0FBUixHQUFnQixFQUFsQyxDQWJYO0FBY0EsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUUsT0FBTyxJQUFULEVBQTdDO0FBQ0EsUUFBUSxPQUFSLEdBQWtCLEtBQWxCIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIEVudHJ5O1xuKGZ1bmN0aW9uIChFbnRyeSkge1xuICAgIGZ1bmN0aW9uIGtleShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMF07XG4gICAgfVxuICAgIEVudHJ5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiB2YWx1ZShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnlbMV07XG4gICAgfVxuICAgIEVudHJ5LnZhbHVlID0gdmFsdWU7XG4gICAgZnVuY3Rpb24gaXMoZW50cnksIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBlbnRyeVswXSA9PT0gb3RoZXJbMF0gJiYgZW50cnlbMV0gPT09IG90aGVyWzFdO1xuICAgIH1cbiAgICBFbnRyeS5pcyA9IGlzO1xufSkoRW50cnkgPSBleHBvcnRzLkVudHJ5IHx8IChleHBvcnRzLkVudHJ5ID0ge30pKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IEVudHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZW50cnkuanMubWFwIl19

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slicedToArray2 = __webpack_require__(9);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var key_1 = __webpack_require__(86);
	var Range;
	(function (Range) {
	    Range.all = [{ next: key_1.default.SENTINEL }, { prev: key_1.default.SENTINEL }];
	    function reverse(_ref) {
	        var _ref2 = (0, _slicedToArray3.default)(_ref, 2);
	
	        var from = _ref2[0];
	        var to = _ref2[1];
	
	        return [Position.reverse(to), Position.reverse(from)];
	    }
	    Range.reverse = reverse;
	})(Range = exports.Range || (exports.Range = {}));
	var Position;
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
	})(Position = exports.Position || (exports.Position = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Range;
	//# sourceMappingURL=range.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcmFuZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBQ0EsSUFBTSxRQUFRLFFBQVEsT0FBUixDQUFkO0FBQ0EsSUFBSSxLQUFKO0FBQ0EsQ0FBQyxVQUFVLEtBQVYsRUFBaUI7QUFDZCxVQUFNLEdBQU4sR0FBWSxDQUFDLEVBQUUsTUFBTSxNQUFNLE9BQU4sQ0FBYyxRQUF0QixFQUFELEVBQW1DLEVBQUUsTUFBTSxNQUFNLE9BQU4sQ0FBYyxRQUF0QixFQUFuQyxDQUFaO0FBQ0EsYUFBUyxPQUFULE9BQTZCO0FBQUE7O0FBQUEsWUFBWCxJQUFXO0FBQUEsWUFBTCxFQUFLOztBQUN6QixlQUFPLENBQUMsU0FBUyxPQUFULENBQWlCLEVBQWpCLENBQUQsRUFBdUIsU0FBUyxPQUFULENBQWlCLElBQWpCLENBQXZCLENBQVA7QUFDSDtBQUNELFVBQU0sT0FBTixHQUFnQixPQUFoQjtBQUNILENBTkQsRUFNRyxRQUFRLFFBQVEsS0FBUixLQUFrQixRQUFRLEtBQVIsR0FBZ0IsRUFBbEMsQ0FOWDtBQU9BLElBQUksUUFBSjtBQUNBLENBQUMsVUFBVSxRQUFWLEVBQW9CO0FBQ2pCLGFBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixlQUFPLFVBQVUsUUFBakI7QUFDSDtBQUNELGFBQVMsY0FBVCxHQUEwQixjQUExQjtBQUNBLGFBQVMsY0FBVCxDQUF3QixRQUF4QixFQUFrQztBQUM5QixlQUFPLFVBQVUsUUFBakI7QUFDSDtBQUNELGFBQVMsY0FBVCxHQUEwQixjQUExQjtBQUNBLGFBQVMsT0FBVCxDQUFpQixRQUFqQixFQUEyQjtBQUN2QixlQUFPLFNBQVMsY0FBVCxDQUF3QixRQUF4QixJQUFvQyxFQUFFLE1BQU0sU0FBUyxJQUFqQixFQUFwQyxHQUE4RCxFQUFFLE1BQU0sU0FBUyxJQUFqQixFQUFyRTtBQUNIO0FBQ0QsYUFBUyxPQUFULEdBQW1CLE9BQW5CO0FBQ0gsQ0FiRCxFQWFHLFdBQVcsUUFBUSxRQUFSLEtBQXFCLFFBQVEsUUFBUixHQUFtQixFQUF4QyxDQWJkO0FBY0EsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUUsT0FBTyxJQUFULEVBQTdDO0FBQ0EsUUFBUSxPQUFSLEdBQWtCLEtBQWxCIiwiZmlsZSI6InJhbmdlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3Qga2V5XzEgPSByZXF1aXJlKCcuL2tleScpO1xudmFyIFJhbmdlO1xuKGZ1bmN0aW9uIChSYW5nZSkge1xuICAgIFJhbmdlLmFsbCA9IFt7IG5leHQ6IGtleV8xLmRlZmF1bHQuU0VOVElORUwgfSwgeyBwcmV2OiBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMIH1dO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UoW2Zyb20sIHRvXSkge1xuICAgICAgICByZXR1cm4gW1Bvc2l0aW9uLnJldmVyc2UodG8pLCBQb3NpdGlvbi5yZXZlcnNlKGZyb20pXTtcbiAgICB9XG4gICAgUmFuZ2UucmV2ZXJzZSA9IHJldmVyc2U7XG59KShSYW5nZSA9IGV4cG9ydHMuUmFuZ2UgfHwgKGV4cG9ydHMuUmFuZ2UgPSB7fSkpO1xudmFyIFBvc2l0aW9uO1xuKGZ1bmN0aW9uIChQb3NpdGlvbikge1xuICAgIGZ1bmN0aW9uIGlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAncHJldicgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uID0gaXNQcmV2UG9zaXRpb247XG4gICAgZnVuY3Rpb24gaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICduZXh0JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24gPSBpc05leHRQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikgPyB7IG5leHQ6IHBvc2l0aW9uLnByZXYgfSA6IHsgcHJldjogcG9zaXRpb24ubmV4dCB9O1xuICAgIH1cbiAgICBQb3NpdGlvbi5yZXZlcnNlID0gcmV2ZXJzZTtcbn0pKFBvc2l0aW9uID0gZXhwb3J0cy5Qb3NpdGlvbiB8fCAoZXhwb3J0cy5Qb3NpdGlvbiA9IHt9KSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBSYW5nZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJhbmdlLmpzLm1hcCJdfQ==

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _stringify = __webpack_require__(2);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	var _create = __webpack_require__(65);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
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
	var exceptions_1 = __webpack_require__(90);
	var Cache;
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
	                throw new exceptions_1.NotFound();
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
	                return __awaiter(_this, void 0, void 0, _regenerator2.default.mark(function _callee() {
	                    return _regenerator2.default.wrap(function _callee$(_context) {
	                        while (1) {
	                            switch (_context.prev = _context.next) {
	                                case 0:
	                                    _context.prev = 0;
	                                    return _context.abrupt("return", cacher(t));
	
	                                case 4:
	                                    _context.prev = 4;
	                                    _context.t0 = _context["catch"](0);
	
	                                    if (!(_context.t0 instanceof exceptions_1.NotFound)) {
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
	})(Cache = exports.Cache || (exports.Cache = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Cache;
	//# sourceMappingURL=cache.js.map
	//# sourceMappingURL=data:application/json;base64,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O0FBQUE7QUFBQTtBQUFBLHFFQUUvQixPQUFPLENBQVAsQ0FGK0I7O0FBQUE7QUFBQTtBQUFBOztBQUFBLDBDQUtsQyx1QkFBa0IsYUFBYSxRQUxHO0FBQUE7QUFBQTtBQUFBOztBQUFBLGtEQU1wQixDQU5vQjtBQUFBO0FBQUEsMkNBTVgsR0FBRyxDQUFILENBTlc7O0FBQUE7QUFBQTtBQUFBLHFFQU0zQixNQU4yQjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFoQyxFQUFQO0FBQUEsYUFBUDtBQVVIO0FBQ0QsZUFBTztBQUNILGlCQUFLLFFBQVEsTUFBTSxHQUFkLEVBQW1CLE1BQU0sR0FBekIsQ0FERjtBQUVILGtCQUFNLFFBQVEsTUFBTSxJQUFkLEVBQW9CLE1BQU0sSUFBMUIsQ0FGSDtBQUdILGtCQUFNLFFBQVEsTUFBTSxJQUFkLEVBQW9CLE1BQU0sSUFBMUI7QUFISCxTQUFQO0FBS0g7QUFDRCxVQUFNLEtBQU4sR0FBYyxLQUFkO0FBQ0gsQ0FyREQsRUFxREcsUUFBUSxRQUFRLEtBQVIsS0FBa0IsUUFBUSxLQUFSLEdBQWdCLEVBQWxDLENBckRYO0FBc0RBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFLE9BQU8sSUFBVCxFQUE3QztBQUNBLFFBQVEsT0FBUixHQUFrQixLQUFsQiIsImZpbGUiOiJjYWNoZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLnRocm93KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMpKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNvbnN0IGV4Y2VwdGlvbnNfMSA9IHJlcXVpcmUoJy4vZXhjZXB0aW9ucycpO1xudmFyIENhY2hlO1xuKGZ1bmN0aW9uIChDYWNoZSkge1xuICAgIGNvbnN0IE5PTkUgPSB7fTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IGNhY2hlID0ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlQ2FjaGUoYykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0LCB1KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBKU09OLnN0cmluZ2lmeSh0KTtcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjW2xhYmVsXSA9IHU7XG4gICAgICAgICAgICAgICAgaWYgKGxhYmVsIGluIGMpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjW2xhYmVsXTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXhjZXB0aW9uc18xLk5vdEZvdW5kKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IGNyZWF0ZUNhY2hlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBjcmVhdGVDYWNoZShjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IGNyZWF0ZUNhY2hlKGNhY2hlLm5leHQpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBleHRlbmQoY2FjaGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShjYWNoZS5nZXQpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUoY2FjaGUubmV4dClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBjYWNoZSkge1xuICAgICAgICBmdW5jdGlvbiBjYWNoZUZuKGZuLCBjYWNoZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAodCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXIodCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbiBpbnN0YW5jZW9mIGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZXIodCwgeWllbGQgZm4odCkpO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyByZWFzb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogY2FjaGVGbihzdGF0ZS5nZXQsIGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBjYWNoZUZuKHN0YXRlLnByZXYsIGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogY2FjaGVGbihzdGF0ZS5uZXh0LCBjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5hcHBseSA9IGFwcGx5O1xufSkoQ2FjaGUgPSBleHBvcnRzLkNhY2hlIHx8IChleHBvcnRzLkNhY2hlID0ge30pKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IENhY2hlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGUuanMubWFwIl19

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _classCallCheck2 = __webpack_require__(91);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NotFound = function NotFound() {
	  (0, _classCallCheck3.default)(this, NotFound);
	};
	
	exports.NotFound = NotFound;
	;
	//# sourceMappingURL=exceptions.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvZXhjZXB0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7SUFDTSxROzs7O0FBRU4sUUFBUSxRQUFSLEdBQW1CLFFBQW5CO0FBQ0EiLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmNsYXNzIE5vdEZvdW5kIHtcbn1cbmV4cG9ydHMuTm90Rm91bmQgPSBOb3RGb3VuZDtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4Y2VwdGlvbnMuanMubWFwIl19

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

	"use strict";
	
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
	var exceptions_1 = __webpack_require__(90);
	var AsyncIterator;
	(function (AsyncIterator) {
	    AsyncIterator.done = { done: true };
	    AsyncIterator.Empty = {
	        next: function next() {
	            return _promise2.default.resolve(AsyncIterator.done);
	        }
	    };
	    function every(iterator, predicate) {
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
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
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
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
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee5() {
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
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee7() {
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
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee9() {
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
	                            throw new exceptions_1.NotFound();
	
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
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee10() {
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
	                            throw new exceptions_1.NotFound();
	
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
	
	        return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee12() {
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee14() {
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee17() {
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee18() {
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee21() {
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
	})(AsyncIterator = exports.AsyncIterator || (exports.AsyncIterator = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AsyncIterator;
	//# sourceMappingURL=async_iterator.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvYXN5bmNfaXRlcmF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJLFlBQWEsYUFBUSxVQUFLLFNBQWQsSUFBNEIsVUFBVSxPQUFWLEVBQW1CLFVBQW5CLEVBQStCLENBQS9CLEVBQWtDLFNBQWxDLEVBQTZDO0FBQ3JGLFdBQU8sS0FBSyxNQUFNLHFCQUFOLENBQUwsRUFBeUIsVUFBVSxPQUFWLEVBQW1CLE1BQW5CLEVBQTJCO0FBQ3ZELGlCQUFTLFNBQVQsQ0FBbUIsS0FBbkIsRUFBMEI7QUFBRSxnQkFBSTtBQUFFLHFCQUFLLFVBQVUsSUFBVixDQUFlLEtBQWYsQ0FBTDtBQUE4QixhQUFwQyxDQUFxQyxPQUFPLENBQVAsRUFBVTtBQUFFLHVCQUFPLENBQVA7QUFBWTtBQUFFO0FBQzNGLGlCQUFTLFFBQVQsQ0FBa0IsS0FBbEIsRUFBeUI7QUFBRSxnQkFBSTtBQUFFLHFCQUFLLFVBQVUsS0FBVixDQUFnQixLQUFoQixDQUFMO0FBQStCLGFBQXJDLENBQXNDLE9BQU8sQ0FBUCxFQUFVO0FBQUUsdUJBQU8sQ0FBUDtBQUFZO0FBQUU7QUFDM0YsaUJBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0I7QUFBRSxtQkFBTyxJQUFQLEdBQWMsUUFBUSxPQUFPLEtBQWYsQ0FBZCxHQUFzQyxJQUFJLENBQUosQ0FBTSxVQUFVLE9BQVYsRUFBbUI7QUFBRSx3QkFBUSxPQUFPLEtBQWY7QUFBd0IsYUFBbkQsRUFBcUQsSUFBckQsQ0FBMEQsU0FBMUQsRUFBcUUsUUFBckUsQ0FBdEM7QUFBdUg7QUFDL0ksYUFBSyxDQUFDLFlBQVksVUFBVSxLQUFWLENBQWdCLE9BQWhCLEVBQXlCLFVBQXpCLENBQWIsRUFBbUQsSUFBbkQsRUFBTDtBQUNILEtBTE0sQ0FBUDtBQU1ILENBUEQ7QUFRQSxJQUFNLGVBQWUsUUFBUSxjQUFSLENBQXJCO0FBQ0EsSUFBSSxhQUFKO0FBQ0EsQ0FBQyxVQUFVLGFB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QVMsT0FBVCxDQUFpQixRQUFqQixFQUEyQjtBQUN2QixlQUFPLE9BQU8sUUFBUCxFQUFpQixVQUFDLElBQUQsRUFBTyxLQUFQO0FBQUEsbUJBQWtCLEtBQUssSUFBTCxDQUFVLEtBQVYsR0FBa0IsSUFBcEM7QUFBQSxTQUFqQixFQUE0RCxFQUE1RCxDQUFQO0FBQ0g7QUFDRCxrQkFBYyxPQUFkLEdBQXdCLE9BQXhCO0FBQ0EsYUFBUyxRQUFULENBQWtCLFFBQWxCLEVBQTRCO0FBQ3hCLGVBQU8sT0FBTyxRQUFQLEVBQWlCLFVBQUMsSUFBRDtBQUFBOztBQUFBLGdCQUFRLEdBQVI7QUFBQSxnQkFBYSxLQUFiO0FBQUEsbUJBQXlCLEtBQUssR0FBTCxJQUFZLEtBQVosRUFBbUIsSUFBNUM7QUFBQSxTQUFqQixFQUFvRSxzQkFBYyxJQUFkLENBQXBFLENBQVA7QUFDSDtBQUNELGtCQUFjLFFBQWQsR0FBeUIsUUFBekI7QUFDQSxhQUFTLE1BQVQsQ0FBZ0IsS0FBaEIsRUFBc0I7QUFDbEIsWUFBSSxRQUFRLGtCQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsQ0FBWjtBQUNBLGVBQU87QUFDSCxnQkFERyxrQkFDSTtBQUNILHVCQUFPLFFBQVEsTUFBTSxJQUFOLENBQVcsS0FBWCxDQUFmO0FBQ0g7QUFIRSxTQUFQO0FBS0g7QUFDRCxrQkFBYyxNQUFkLEdBQXVCLE1BQXZCO0FBQ0gsQ0FwTkQsRUFvTkcsZ0JBQWdCLFFBQVEsYUFBUixLQUEwQixRQUFRLGFBQVIsR0FBd0IsRUFBbEQsQ0FwTm5CO0FBcU5BLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFLE9BQU8sSUFBVCxFQUE3QztBQUNBLFFBQVEsT0FBUixHQUFrQixhQUFsQiIsImZpbGUiOiJhc3luY19pdGVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLnRocm93KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMpKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNvbnN0IGV4Y2VwdGlvbnNfMSA9IHJlcXVpcmUoJy4vZXhjZXB0aW9ucycpO1xudmFyIEFzeW5jSXRlcmF0b3I7XG4oZnVuY3Rpb24gKEFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0l0ZXJhdG9yLmRvbmUgPSB7IGRvbmU6IHRydWUgfTtcbiAgICBBc3luY0l0ZXJhdG9yLkVtcHR5ID0ge1xuICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5kb25lKVxuICAgIH07XG4gICAgZnVuY3Rpb24gZXZlcnkoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgICAgIHdoaWxlICgocmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoISh5aWVsZCBwcmVkaWNhdGUocmVzdWx0LnZhbHVlKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5ldmVyeSA9IGV2ZXJ5O1xuICAgIGZ1bmN0aW9uIHNvbWUoaXRlcmF0b3IsIHByZWRpY2F0ZSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuICEoeWllbGQgZXZlcnkoaXRlcmF0b3IsICh2YWx1ZSkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkgeyByZXR1cm4gISh5aWVsZCBwcmVkaWNhdGUodmFsdWUpKTsgfSkpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3Iuc29tZSA9IHNvbWU7XG4gICAgZnVuY3Rpb24gZm9yRWFjaChpdGVyYXRvciwgZm4pIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHlpZWxkIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgeWllbGQgZm4odmFsdWUpOyByZXR1cm4gdHJ1ZTsgfSkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mb3JFYWNoID0gZm9yRWFjaDtcbiAgICBmdW5jdGlvbiByZWR1Y2UoaXRlcmF0b3IsIGZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB5aWVsZCBmb3JFYWNoKGl0ZXJhdG9yLCAodmFsdWUpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHsgbWVtbyA9IHlpZWxkIGZuKG1lbW8sIHZhbHVlKTsgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG1lbW87XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnJlZHVjZSA9IHJlZHVjZTtcbiAgICBmdW5jdGlvbiBmaW5kKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICBpZiAoeWllbGQgc29tZShpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7IHJldHVybiAhKHlpZWxkIHByZWRpY2F0ZSh2YWx1ZSkpID8gZmFsc2UgOiAocmVzdWx0ID0gdmFsdWUsIHRydWUpOyB9KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGV4Y2VwdGlvbnNfMS5Ob3RGb3VuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZCA9IGZpbmQ7XG4gICAgZnVuY3Rpb24gaW5kZXhPZihpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICAgICAgaWYgKHlpZWxkIHNvbWUoaXRlcmF0b3IsIHYgPT4gKGluZGV4KyssIHZhbHVlID09IHYpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBleGNlcHRpb25zXzEuTm90Rm91bmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmluZGV4T2YgPSBpbmRleE9mO1xuICAgIGZ1bmN0aW9uIGF0KGl0ZXJhdG9yLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gZmluZChpdGVyYXRvciwgKCkgPT4gMCA9PT0gaW5kZXgtLSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuYXQgPSBhdDtcbiAgICBmdW5jdGlvbiBzaXplKGl0ZXJhdG9yKSB7XG4gICAgICAgIHZhciBjb3VudCA9IC0xO1xuICAgICAgICByZXR1cm4gZm9yRWFjaChpdGVyYXRvciwgKCkgPT4geyBjb3VudCsrOyB9KS50aGVuKCgpID0+IGNvdW50KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5zaXplID0gc2l6ZTtcbiAgICBmdW5jdGlvbiBjb250YWlucyhpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsIHYgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmNvbnRhaW5zID0gY29udGFpbnM7XG4gICAgZnVuY3Rpb24gaXMoaXRlcmF0b3IsIG90aGVyLCBlcXVhbHMgPSAoYSwgYikgPT4gYSA9PT0gYikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuICh5aWVsZCBldmVyeShpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIG90aGVyLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXJlc3VsdC5kb25lICYmIGVxdWFscyh2YWx1ZSwgcmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgIH0pKSkgJiYgKHlpZWxkIG90aGVyLm5leHQoKSkuZG9uZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBtYXAoaXRlcmF0b3IsIG1hcEZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gQXN5bmNJdGVyYXRvci5kb25lIDogeyBkb25lOiBmYWxzZSwgdmFsdWU6IHlpZWxkIG1hcEZuKHJlc3VsdC52YWx1ZSkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihpdGVyYXRvciwgZmlsdGVyRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICAgICAgaWYgKHlpZWxkIGZpbHRlckZuKHJlc3VsdC52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4oaXRlcmF0b3IsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICBtZW1vID0geWllbGQgc2NhbkZuKG1lbW8sIHJlc3VsdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBtZW1vIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHppcChpdGVyYXRvciwgb3RoZXIsIHppcEZuID0gKHQsIHUpID0+IFt0LCB1XSkge1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0geWllbGQgaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZG9uZTtcbiAgICAgICAgICAgICAgICB2YXIgb3RoZXJSZXN1bHQgPSB5aWVsZCBvdGhlci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyUmVzdWx0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmRvbmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZTogZmFsc2UsIHZhbHVlOiB5aWVsZCB6aXBGbihyZXN1bHQudmFsdWUsIG90aGVyUmVzdWx0LnZhbHVlKSB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci56aXAgPSB6aXA7XG4gICAgZnVuY3Rpb24gdGFrZShpdGVyYXRvciwgY291bnQpIHtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKytpID4gY291bnQgPyBBc3luY0l0ZXJhdG9yLmRvbmUgOiBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3JlYXRlKG5leHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRha2UgPSB0YWtlO1xuICAgIGZ1bmN0aW9uIHNraXAoaXRlcmF0b3IsIGNvdW50KSB7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBjb3VudClcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgc29tZShpdGVyYXRvciwgKCkgPT4gKytpID49IGNvdW50KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5za2lwID0gc2tpcDtcbiAgICBmdW5jdGlvbiB1bmlxdWUoaXRlcmF0b3IsIHVuaXF1ZUZuKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbHRlcihpdGVyYXRvciwgKHZhbHVlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgdSA9IEpTT04uc3RyaW5naWZ5KHlpZWxkIHVuaXF1ZUZuKHZhbHVlKSk7XG4gICAgICAgICAgICByZXR1cm4gKCFjYWNoZVt1XSkgfHwgKGNhY2hlW3VdID0gdHJ1ZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci51bmlxdWUgPSB1bmlxdWU7XG4gICAgZnVuY3Rpb24gY29uY2F0KC4uLml0ZXJhdG9ycykge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JzLnJlZHVjZSgobWVtbywgaXRlcmF0b3IpID0+IHtcbiAgICAgICAgICAgIHZhciBpdGVyYXRlZCA9IGZhbHNlLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHlpZWxkIG1lbW8ubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC5kb25lKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZShuZXh0KTtcbiAgICAgICAgfSwgQXN5bmNJdGVyYXRvci5FbXB0eSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29uY2F0ID0gY29uY2F0O1xuICAgIGZ1bmN0aW9uIGZyb21BcnJheShhcnJheSkge1xuICAgICAgICB2YXIgY3VycmVudCA9IC0xLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICsrY3VycmVudCA+PSBhcnJheS5sZW5ndGggPyBBc3luY0l0ZXJhdG9yLmRvbmUgOiB7IGRvbmU6IGZhbHNlLCB2YWx1ZTogYXJyYXlbY3VycmVudF0gfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGUobmV4dCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmcm9tQXJyYXkoT2JqZWN0LmtleXMob2JqZWN0KS5tYXAoa2V5ID0+IFtrZXksIG9iamVjdFtrZXldXSkpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21PYmplY3QgPSBmcm9tT2JqZWN0O1xuICAgIGZ1bmN0aW9uIHRvQXJyYXkoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIHZhbHVlKSA9PiAobWVtby5wdXNoKHZhbHVlKSwgbWVtbyksIFtdKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b0FycmF5ID0gdG9BcnJheTtcbiAgICBmdW5jdGlvbiB0b09iamVjdChpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgW2tleSwgdmFsdWVdKSA9PiAobWVtb1trZXldID0gdmFsdWUsIG1lbW8pLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b09iamVjdCA9IHRvT2JqZWN0O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShuZXh0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5leHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHF1ZXVlID0gcXVldWUudGhlbihuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jcmVhdGUgPSBjcmVhdGU7XG59KShBc3luY0l0ZXJhdG9yID0gZXhwb3J0cy5Bc3luY0l0ZXJhdG9yIHx8IChleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSB7fSkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gQXN5bmNJdGVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzeW5jX2l0ZXJhdG9yLmpzLm1hcCJdfQ==

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

	"use strict";
	
	var key_1 = __webpack_require__(86);
	var state_1 = __webpack_require__(1);
	var Path;
	(function (Path) {
	    function head(path) {
	        return path ? path[0] : key_1.default.SENTINEL;
	    }
	    Path.head = head;
	    function tail(path) {
	        return path ? path[1] : key_1.default.SENTINEL;
	    }
	    Path.tail = tail;
	})(Path = exports.Path || (exports.Path = {}));
	var Tree;
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
	            prevs = state_1.default.filter(state_1.default.map(tree, function (state) {
	            return state.prev();
	        }), function (first) {
	            return first !== key_1.default.SENTINEL;
	        }),
	            paths = state_1.default.map(prevs, function (first, key) {
	            return [key, first];
	        });
	        if (head === key_1.default.SENTINEL) return paths.prev().then(function (prev) {
	            return prev !== key_1.default.SENTINEL ? paths.get(prev) : key_1.default.SENTINEL;
	        });
	        return tree.get(head).then(function (state) {
	            return state.prev(tail);
	        }).then(function (prev) {
	            return prev !== key_1.default.SENTINEL ? [head, prev] : paths.prev(head).then(function (prev) {
	                return prev !== key_1.default.SENTINEL ? paths.get(prev) : key_1.default.SENTINEL;
	            });
	        });
	    }
	    Tree.prev = prev;
	    function next(tree, path) {
	        var head = Path.head(path),
	            tail = Path.tail(path),
	            nexts = state_1.default.filter(state_1.default.map(tree, function (state) {
	            return state.next();
	        }), function (first) {
	            return first !== key_1.default.SENTINEL;
	        }),
	            paths = state_1.default.map(nexts, function (first, key) {
	            return [key, first];
	        });
	        if (head === key_1.default.SENTINEL) return paths.next().then(function (next) {
	            return next !== key_1.default.SENTINEL ? paths.get(next) : key_1.default.SENTINEL;
	        });
	        return tree.get(head).then(function (state) {
	            return state.next(tail);
	        }).then(function (next) {
	            return next !== key_1.default.SENTINEL ? [head, next] : paths.next(head).then(function (next) {
	                return next !== key_1.default.SENTINEL ? paths.get(next) : key_1.default.SENTINEL;
	            });
	        });
	    }
	    Tree.next = next;
	})(Tree = exports.Tree || (exports.Tree = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Tree;
	//# sourceMappingURL=tree.js.map
	//# sourceMappingURL=data:application/json;base64,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QU4sQ0FBYyxRQUExRTtBQUFBLGFBQXRCLENBQXpEO0FBQUEsU0FGSCxDQUFQO0FBR0g7QUFDRCxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0gsQ0F4QkQsRUF3QkcsT0FBTyxRQUFRLElBQVIsS0FBaUIsUUFBUSxJQUFSLEdBQWUsRUFBaEMsQ0F4QlY7QUF5QkEsT0FBTyxjQUFQLENBQXNCLE9BQXRCLEVBQStCLFlBQS9CLEVBQTZDLEVBQUUsT0FBTyxJQUFULEVBQTdDO0FBQ0EsUUFBUSxPQUFSLEdBQWtCLElBQWxCIiwiZmlsZSI6InRyZWUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBrZXlfMSA9IHJlcXVpcmUoJy4va2V5Jyk7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZSgnLi9zdGF0ZScpO1xudmFyIFBhdGg7XG4oZnVuY3Rpb24gKFBhdGgpIHtcbiAgICBmdW5jdGlvbiBoZWFkKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoWzBdIDoga2V5XzEuZGVmYXVsdC5TRU5USU5FTDtcbiAgICB9XG4gICAgUGF0aC5oZWFkID0gaGVhZDtcbiAgICBmdW5jdGlvbiB0YWlsKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoWzFdIDoga2V5XzEuZGVmYXVsdC5TRU5USU5FTDtcbiAgICB9XG4gICAgUGF0aC50YWlsID0gdGFpbDtcbn0pKFBhdGggPSBleHBvcnRzLlBhdGggfHwgKGV4cG9ydHMuUGF0aCA9IHt9KSk7XG52YXIgVHJlZTtcbihmdW5jdGlvbiAoVHJlZSkge1xuICAgIGZ1bmN0aW9uIGdldCh0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZCkudGhlbihzdGF0ZSA9PiBzdGF0ZS5nZXQodGFpbCkpO1xuICAgIH1cbiAgICBUcmVlLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwcmV2KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCksIHByZXZzID0gc3RhdGVfMS5kZWZhdWx0LmZpbHRlcihzdGF0ZV8xLmRlZmF1bHQubWFwKHRyZWUsIHN0YXRlID0+IHN0YXRlLnByZXYoKSksIGZpcnN0ID0+IGZpcnN0ICE9PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKSwgcGF0aHMgPSBzdGF0ZV8xLmRlZmF1bHQubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwpXG4gICAgICAgICAgICByZXR1cm4gcGF0aHMucHJldigpLnRoZW4ocHJldiA9PiBwcmV2ICE9PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMID8gcGF0aHMuZ2V0KHByZXYpIDoga2V5XzEuZGVmYXVsdC5TRU5USU5FTCk7XG4gICAgICAgIHJldHVybiB0cmVlLmdldChoZWFkKVxuICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gc3RhdGUucHJldih0YWlsKSlcbiAgICAgICAgICAgIC50aGVuKHByZXYgPT4gcHJldiAhPT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwgPyBwYXRocy5nZXQocHJldikgOiBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKSk7XG4gICAgfVxuICAgIFRyZWUucHJldiA9IHByZXY7XG4gICAgZnVuY3Rpb24gbmV4dCh0cmVlLCBwYXRoKSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpLCBuZXh0cyA9IHN0YXRlXzEuZGVmYXVsdC5maWx0ZXIoc3RhdGVfMS5kZWZhdWx0Lm1hcCh0cmVlLCBzdGF0ZSA9PiBzdGF0ZS5uZXh0KCkpLCBmaXJzdCA9PiBmaXJzdCAhPT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCksIHBhdGhzID0gc3RhdGVfMS5kZWZhdWx0Lm1hcChuZXh0cywgKGZpcnN0LCBrZXkpID0+IFtrZXksIGZpcnN0XSk7XG4gICAgICAgIGlmIChoZWFkID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGhzLm5leHQoKS50aGVuKG5leHQgPT4gbmV4dCAhPT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA/IHBhdGhzLmdldChuZXh0KSA6IGtleV8xLmRlZmF1bHQuU0VOVElORUwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwgPyBbaGVhZCwgbmV4dF0gOiBwYXRocy5uZXh0KGhlYWQpLnRoZW4obmV4dCA9PiBuZXh0ICE9PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMID8gcGF0aHMuZ2V0KG5leHQpIDoga2V5XzEuZGVmYXVsdC5TRU5USU5FTCkpO1xuICAgIH1cbiAgICBUcmVlLm5leHQgPSBuZXh0O1xufSkoVHJlZSA9IGV4cG9ydHMuVHJlZSB8fCAoZXhwb3J0cy5UcmVlID0ge30pKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFRyZWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD10cmVlLmpzLm1hcCJdfQ==

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _slicedToArray2 = __webpack_require__(9);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
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
	var key_1 = __webpack_require__(86);
	var patch_1 = __webpack_require__(99);
	var state_1 = __webpack_require__(1);
	var range_1 = __webpack_require__(88);
	var tree_1 = __webpack_require__(97);
	var observable_1 = __webpack_require__(100);
	var async_iterator_1 = __webpack_require__(92);
	var exceptions_1 = __webpack_require__(90);
	var Store;
	(function (Store) {
	    function reverse(parent) {
	        function getState() {
	            return state_1.default.reverse(parent.state);
	        }
	        var dispatcher = observable_1.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: range_1.Range.reverse(patch.range),
	                added: patch.added ? state_1.default.reverse(patch.added) : undefined
	            };
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.reverse = reverse;
	    function map(parent, mapFn) {
	        function getState() {
	            return state_1.default.map(parent.state, mapFn);
	        }
	        var dispatcher = observable_1.Observable.map(parent.dispatcher, function (patch) {
	            return {
	                range: patch.range,
	                added: patch.added ? state_1.default.map(patch.added, mapFn) : undefined
	            };
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.map = map;
	    function filter(parent, filterFn) {
	        var _this = this;
	
	        var parentState = parent.state;
	        function getState() {
	            return state_1.default.filter(parent.state, filterFn);
	        }
	        function find(state, range) {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
	                var _ref, _ref2, key;
	
	                return _regenerator2.default.wrap(function _callee$(_context) {
	                    while (1) {
	                        switch (_context.prev = _context.next) {
	                            case 0:
	                                _context.prev = 0;
	                                _context.next = 3;
	                                return async_iterator_1.default.find(state_1.default.entries(state, range), function (_ref3) {
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
	
	                                if (!(_context.t0 instanceof exceptions_1.NotFound)) {
	                                    _context.next = 13;
	                                    break;
	                                }
	
	                                return _context.abrupt('return', key_1.default.SENTINEL);
	
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
	                var deleted, position;
	                return _regenerator2.default.wrap(function _callee2$(_context2) {
	                    while (1) {
	                        switch (_context2.prev = _context2.next) {
	                            case 0:
	                                deleted = state_1.default.slice(state_1.default.reverse(state), range_1.Range.reverse(range)), position = range[1];
	
	                                if (!range_1.Position.isNextPosition(position)) {
	                                    _context2.next = 11;
	                                    break;
	                                }
	
	                                _context2.next = 4;
	                                return state_1.default.empty(deleted);
	
	                            case 4:
	                                if (_context2.sent) {
	                                    _context2.next = 9;
	                                    break;
	                                }
	
	                                _context2.next = 7;
	                                return find(deleted, range_1.Range.all);
	
	                            case 7:
	                                _context2.t0 = _context2.sent;
	                                return _context2.abrupt('return', {
	                                    next: _context2.t0
	                                });
	
	                            case 9:
	                                if (!(position.next === key_1.default.SENTINEL)) {
	                                    _context2.next = 11;
	                                    break;
	                                }
	
	                                return _context2.abrupt('return', { next: key_1.default.SENTINEL });
	
	                            case 11:
	                                _context2.next = 13;
	                                return find(state, [position, { next: key_1.default.SENTINEL }]);
	
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
	        var dispatcher = observable_1.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
	                var range;
	                return _regenerator2.default.wrap(function _callee3$(_context3) {
	                    while (1) {
	                        switch (_context3.prev = _context3.next) {
	                            case 0:
	                                _context3.next = 2;
	                                return _promise2.default.all([move(state_1.default.reverse(parentState), range_1.Range.reverse(patch.range)).then(range_1.Position.reverse), move(parentState, patch.range)]);
	
	                            case 2:
	                                range = _context3.sent;
	
	                                parentState = parent.state;
	                                return _context3.abrupt('return', {
	                                    range: range,
	                                    added: patch.added ? state_1.default.filter(patch.added, filterFn) : undefined
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
	            return state_1.default.zoom(parent.state, key);
	        }
	        var dispatcher = observable_1.Observable.map(observable_1.Observable.filter(parent.dispatcher, function (patch) {
	            return state_1.default.has(state_1.default.slice(parentState, patch.range), key);
	        }), function (patch) {
	            parentState = parent.state;
	            return {
	                range: range_1.Range.all,
	                added: patch.added ? state_1.default.zoom(patch.added, key) : undefined
	            };
	        });
	        return create(getState(), dispatcher, getState);
	    }
	    Store.zoom = zoom;
	    function flatten(parent) {
	        var dispatcher_ = observable_1.Subject.create();
	        var parent_ = cache(map(parent, function (store, key) {
	            observable_1.Observable.map(store.dispatcher, function (patch) {
	                var from = patch.range[0],
	                    to = patch.range[1];
	                function mapPrevPosition(position) {
	                    if (position.prev === key_1.default.SENTINEL) return store.state.prev(key_1.default.SENTINEL).then(function (next) {
	                        return { next: [key, next] };
	                    });
	                    return _promise2.default.resolve({ prev: [key, position.prev] });
	                }
	                function mapNextPosition(position) {
	                    if (position.next === key_1.default.SENTINEL) return store.state.next(key_1.default.SENTINEL).then(function (prev) {
	                        return { prev: [key, prev] };
	                    });
	                    return _promise2.default.resolve({ next: [key, position.next] });
	                }
	                return _promise2.default.all([range_1.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), range_1.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
	                    return { range: range, added: patch.added ? patch.added : undefined };
	                });
	            }).subscribe(dispatcher_);
	            return store.state;
	        }));
	        observable_1.Observable.map(parent.dispatcher, function (patch) {
	            var from = patch.range[0],
	                to = patch.range[1];
	            function mapPrevPosition(position) {
	                return position.prev === key_1.default.SENTINEL ? _promise2.default.resolve({ prev: key_1.default.SENTINEL }) : tree_1.Tree.next(parent_.state, [position.prev, null]).then(function (prev) {
	                    return { prev: prev };
	                });
	            }
	            function mapNextPosition(position) {
	                return position.next === key_1.default.SENTINEL ? _promise2.default.resolve({ next: key_1.default.SENTINEL }) : tree_1.Tree.prev(parent_.state, [position.next, null]).then(function (next) {
	                    return { next: next };
	                });
	            }
	            return _promise2.default.all([range_1.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), range_1.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
	                return { range: range, added: patch.added ? state_1.default.flatten(state_1.default.map(patch.added, function (store) {
	                        return store.state;
	                    })) : undefined };
	            });
	        }).subscribe(dispatcher_);
	        var state = state_1.default.flatten(parent_.state);
	        function getState() {
	            return state_1.default.flatten(parent_.state);
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
	
	        var state = state_1.default.keyBy(parent.state, keyFn, reverseKeyFn),
	            parentState = parent.state,
	            dispatcher = observable_1.Observable.map(parent.dispatcher, function (patch) {
	            return __awaiter(_this2, void 0, void 0, _regenerator2.default.mark(function _callee5() {
	                var _patch$range, from, to, mapPosition, range;
	
	                return _regenerator2.default.wrap(function _callee5$(_context5) {
	                    while (1) {
	                        switch (_context5.prev = _context5.next) {
	                            case 0:
	                                mapPosition = function mapPosition(position) {
	                                    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
	                                        return _regenerator2.default.wrap(function _callee4$(_context4) {
	                                            while (1) {
	                                                switch (_context4.prev = _context4.next) {
	                                                    case 0:
	                                                        if (!range_1.Position.isPrevPosition(position)) {
	                                                            _context4.next = 13;
	                                                            break;
	                                                        }
	
	                                                        if (!(position.prev === key_1.default.SENTINEL)) {
	                                                            _context4.next = 3;
	                                                            break;
	                                                        }
	
	                                                        return _context4.abrupt('return', { prev: key_1.default.SENTINEL });
	
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
	                                                        if (!(position.next === key_1.default.SENTINEL)) {
	                                                            _context4.next = 15;
	                                                            break;
	                                                        }
	
	                                                        return _context4.abrupt('return', { next: key_1.default.SENTINEL });
	
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
	                                return _context5.abrupt('return', { range: range, added: patch.added ? state_1.default.keyBy(patch.added, keyFn) : undefined });
	
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
	            return state_1.default.scan(parent.state, scanFn, memo);
	        }
	        var store,
	            dispatcher = observable_1.Observable.map(parent.dispatcher, function (patch) {
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
	                                added = state_1.default.lazy(function () {
	                                    return __awaiter(_this4, void 0, void 0, _regenerator2.default.mark(function _callee6() {
	                                        var last;
	                                        return _regenerator2.default.wrap(function _callee6$(_context6) {
	                                            while (1) {
	                                                switch (_context6.prev = _context6.next) {
	                                                    case 0:
	                                                        _context6.next = 2;
	                                                        return state_1.default.last(storeState, [{ next: null }, from]);
	
	                                                    case 2:
	                                                        last = _context6.sent;
	                                                        _context6.t0 = state_1.default;
	                                                        _context6.t1 = state_1.default.slice(parentState, [{ next: last }, { prev: null }]);
	                                                        _context6.t2 = scanFn;
	
	                                                        if (!(last !== key_1.default.SENTINEL)) {
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
	            state = state_1.default.take(parent.state, count);
	        var indexed = Store.scan(parent, function (_ref5, value) {
	            var _ref6 = (0, _slicedToArray3.default)(_ref5, 1);
	
	            var index = _ref6[0];
	            return [index + 1, value];
	        }, [-1, null]);
	        var dispatcher = observable_1.Observable.map(indexed.dispatcher, function (patch) {
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
	                                return state_1.default.last(indexedState, [{ next: null }, from]);
	
	                            case 6:
	                                key = _context8.sent;
	
	                                if (!(key === key_1.default.SENTINEL)) {
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
	                                    added: state_1.default.take(state_1.default.map(patch.added, function (_ref7) {
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
	        return Store.create(state_1.default.cache(parent.state), parent.dispatcher, function (state, patch) {
	            return state_1.default.cache(patch_1.default.apply(state, patch));
	        });
	    }
	    Store.cache = cache;
	    function states(store) {
	        return observable_1.Observable.map(store.dispatcher, function () {
	            return store.state;
	        });
	    }
	    Store.states = states;
	    function create(state, dispatcher) {
	        var _this6 = this;
	
	        var reducer = arguments.length <= 2 || arguments[2] === undefined ? patch_1.default.apply : arguments[2];
	
	        var subject = observable_1.Subject.create();
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
	                onNext: observable_1.Subject.isSubject(dispatcher) ? dispatcher.onNext : undefined
	            }
	        };
	        return store;
	    }
	    Store.create = create;
	})(Store = exports.Store || (exports.Store = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Store;
	//# sourceMappingURL=store.js.map
	//# sourceMappingURL=data:application/json;base64,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QUFPOztBQUNoRSxZQUFJLFVBQVUsYUFBYSxPQUFiLENBQXFCLE1BQXJCLEVBQWQ7QUFDQSxtQkFBVyxTQUFYLENBQXFCO0FBQ2pCLG9CQUFRLGdCQUFDLEtBQUQ7QUFBQSx1QkFBVyxrQkFBZ0IsS0FBSyxDQUFyQixFQUF3QixLQUFLLENBQTdCLDZCQUFnQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQ0FDM0IsUUFBUSxNQUFNLEtBQWQsRUFBcUIsS0FBckIsQ0FEMkI7O0FBQUE7QUFDL0MsMENBQU0sS0FEeUM7QUFBQSxzRUFFeEMsUUFBUSxNQUFSLENBQWUsS0FBZixDQUZ3Qzs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaEMsRUFBWDtBQUFBO0FBRFMsU0FBckI7QUFNQSxZQUFNLFFBQVE7QUFDVix3QkFEVTtBQUVWLHdCQUFZO0FBQ1IsMkJBQVcsUUFBUSxTQURYO0FBRVIsd0JBQVEsYUFBYSxPQUFiLENBQXFCLFNBQXJCLENBQStCLFVBQS9CLElBQTZDLFdBQVcsTUFBeEQsR0FBaUU7QUFGakU7QUFGRixTQUFkO0FBT0EsZUFBTyxLQUFQO0FBQ0g7QUFDRCxVQUFNLE1BQU4sR0FBZSxNQUFmO0FBQ0gsQ0FyTkQsRUFxTkcsUUFBUSxRQUFRLEtBQVIsS0FBa0IsUUFBUSxLQUFSLEdBQWdCLEVBQWxDLENBck5YO0FBc05BLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFLE9BQU8sSUFBVCxFQUE3QztBQUNBLFFBQVEsT0FBUixHQUFrQixLQUFsQiIsImZpbGUiOiJzdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvam9vc3QvUHJvamVjdHMvc29uaWMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLnRocm93KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMpKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbmNvbnN0IGtleV8xID0gcmVxdWlyZSgnLi9rZXknKTtcbmNvbnN0IHBhdGNoXzEgPSByZXF1aXJlKCcuL3BhdGNoJyk7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZSgnLi9zdGF0ZScpO1xuY29uc3QgcmFuZ2VfMSA9IHJlcXVpcmUoJy4vcmFuZ2UnKTtcbmNvbnN0IHRyZWVfMSA9IHJlcXVpcmUoJy4vdHJlZScpO1xuY29uc3Qgb2JzZXJ2YWJsZV8xID0gcmVxdWlyZSgnLi9vYnNlcnZhYmxlJyk7XG5jb25zdCBhc3luY19pdGVyYXRvcl8xID0gcmVxdWlyZSgnLi9hc3luY19pdGVyYXRvcicpO1xuY29uc3QgZXhjZXB0aW9uc18xID0gcmVxdWlyZSgnLi9leGNlcHRpb25zJyk7XG52YXIgU3RvcmU7XG4oZnVuY3Rpb24gKFN0b3JlKSB7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVfMS5kZWZhdWx0LnJldmVyc2UocGFyZW50LnN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gb2JzZXJ2YWJsZV8xLk9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiAoe1xuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlXzEuUmFuZ2UucmV2ZXJzZShwYXRjaC5yYW5nZSksXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBzdGF0ZV8xLmRlZmF1bHQucmV2ZXJzZShwYXRjaC5hZGRlZCkgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKGdldFN0YXRlKCksIGRpc3BhdGNoZXIsIGdldFN0YXRlKTtcbiAgICB9XG4gICAgU3RvcmUucmV2ZXJzZSA9IHJldmVyc2U7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVfMS5kZWZhdWx0Lm1hcChwYXJlbnQuc3RhdGUsIG1hcEZuKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkaXNwYXRjaGVyID0gb2JzZXJ2YWJsZV8xLk9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCBwYXRjaCA9PiAoe1xuICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gc3RhdGVfMS5kZWZhdWx0Lm1hcChwYXRjaC5hZGRlZCwgbWFwRm4pIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyLCBnZXRTdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXRlXzEuZGVmYXVsdC5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbik7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZmluZChzdGF0ZSwgcmFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIFtrZXldID0geWllbGQgYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LmZpbmQoc3RhdGVfMS5kZWZhdWx0LmVudHJpZXMoc3RhdGUsIHJhbmdlKSwgKFtrZXksIHZhbHVlXSkgPT4gZmlsdGVyRm4odmFsdWUsIGtleSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgZXhjZXB0aW9uc18xLk5vdEZvdW5kKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleV8xLmRlZmF1bHQuU0VOVElORUw7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG1vdmUoc3RhdGUsIHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIHZhciBkZWxldGVkID0gc3RhdGVfMS5kZWZhdWx0LnNsaWNlKHN0YXRlXzEuZGVmYXVsdC5yZXZlcnNlKHN0YXRlKSwgcmFuZ2VfMS5SYW5nZS5yZXZlcnNlKHJhbmdlKSksIHBvc2l0aW9uID0gcmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgaWYgKHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHlpZWxkIHN0YXRlXzEuZGVmYXVsdC5lbXB0eShkZWxldGVkKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBuZXh0OiB5aWVsZCBmaW5kKGRlbGV0ZWQsIHJhbmdlXzEuUmFuZ2UuYWxsKSB9O1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ubmV4dCA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IGtleV8xLmRlZmF1bHQuU0VOVElORUwgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcHJldjogeWllbGQgZmluZChzdGF0ZSwgW3Bvc2l0aW9uLCB7IG5leHQ6IGtleV8xLmRlZmF1bHQuU0VOVElORUwgfV0pIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlzcGF0Y2hlciA9IG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSAoeWllbGQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIG1vdmUoc3RhdGVfMS5kZWZhdWx0LnJldmVyc2UocGFyZW50U3RhdGUpLCByYW5nZV8xLlJhbmdlLnJldmVyc2UocGF0Y2gucmFuZ2UpKS50aGVuKHJhbmdlXzEuUG9zaXRpb24ucmV2ZXJzZSksXG4gICAgICAgICAgICAgICAgbW92ZShwYXJlbnRTdGF0ZSwgcGF0Y2gucmFuZ2UpXG4gICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHN0YXRlXzEuZGVmYXVsdC5maWx0ZXIocGF0Y2guYWRkZWQsIGZpbHRlckZuKSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKGdldFN0YXRlKCksIGRpc3BhdGNoZXIsIGdldFN0YXRlKTtcbiAgICB9XG4gICAgU3RvcmUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgdmFyIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZV8xLmRlZmF1bHQuem9vbShwYXJlbnQuc3RhdGUsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGlzcGF0Y2hlciA9IG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1hcChvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5maWx0ZXIocGFyZW50LmRpc3BhdGNoZXIsIHBhdGNoID0+IHN0YXRlXzEuZGVmYXVsdC5oYXMoc3RhdGVfMS5kZWZhdWx0LnNsaWNlKHBhcmVudFN0YXRlLCBwYXRjaC5yYW5nZSksIGtleSkpLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHJhbmdlXzEuUmFuZ2UuYWxsLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHN0YXRlXzEuZGVmYXVsdC56b29tKHBhdGNoLmFkZGVkLCBrZXkpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyLCBnZXRTdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBkaXNwYXRjaGVyXyA9IG9ic2VydmFibGVfMS5TdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICB2YXIgcGFyZW50XyA9IGNhY2hlKG1hcChwYXJlbnQsIChzdG9yZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5tYXAoc3RvcmUuZGlzcGF0Y2hlciwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlLnByZXYoa2V5XzEuZGVmYXVsdC5TRU5USU5FTCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFtrZXksIG5leHRdIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHByZXY6IFtrZXksIHBvc2l0aW9uLnByZXZdIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IGtleV8xLmRlZmF1bHQuU0VOVElORUwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RvcmUuc3RhdGUubmV4dChrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKS50aGVuKHByZXYgPT4gKHsgcHJldjogW2tleSwgcHJldl0gfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogW2tleSwgcG9zaXRpb24ubmV4dF0gfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBtYXBOZXh0UG9zaXRpb24oZnJvbSkgOiBtYXBQcmV2UG9zaXRpb24oZnJvbSksXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBwYXRjaC5hZGRlZCA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoZGlzcGF0Y2hlcl8pO1xuICAgICAgICAgICAgcmV0dXJuIHN0b3JlLnN0YXRlO1xuICAgICAgICB9KSk7XG4gICAgICAgIG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgdmFyIGZyb20gPSBwYXRjaC5yYW5nZVswXSwgdG8gPSBwYXRjaC5yYW5nZVsxXTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbi5wcmV2ID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjoga2V5XzEuZGVmYXVsdC5TRU5USU5FTCB9KSA6IHRyZWVfMS5UcmVlLm5leHQocGFyZW50Xy5zdGF0ZSwgW3Bvc2l0aW9uLnByZXYsIG51bGxdKS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA/IFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IGtleV8xLmRlZmF1bHQuU0VOVElORUwgfSkgOiB0cmVlXzEuVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0LCBudWxsXSkudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICByYW5nZV8xLlBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIHJhbmdlXzEuUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHN0YXRlXzEuZGVmYXVsdC5mbGF0dGVuKHN0YXRlXzEuZGVmYXVsdC5tYXAocGF0Y2guYWRkZWQsIHN0b3JlID0+IHN0b3JlLnN0YXRlKSkgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICB9KS5zdWJzY3JpYmUoZGlzcGF0Y2hlcl8pO1xuICAgICAgICB2YXIgc3RhdGUgPSBzdGF0ZV8xLmRlZmF1bHQuZmxhdHRlbihwYXJlbnRfLnN0YXRlKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGVfMS5kZWZhdWx0LmZsYXR0ZW4ocGFyZW50Xy5zdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZShnZXRTdGF0ZSgpLCBkaXNwYXRjaGVyXywgZ2V0U3RhdGUpO1xuICAgIH1cbiAgICBTdG9yZS5mbGF0dGVuID0gZmxhdHRlbjtcbiAgICBmdW5jdGlvbiBmbGF0TWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgcmV0dXJuIFN0b3JlLmZsYXR0ZW4oU3RvcmUubWFwKHBhcmVudCwgbWFwRm4pKTtcbiAgICB9XG4gICAgU3RvcmUuZmxhdE1hcCA9IGZsYXRNYXA7XG4gICAgZnVuY3Rpb24ga2V5QnkocGFyZW50LCBrZXlGbiwgcmV2ZXJzZUtleUZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlXzEuZGVmYXVsdC5rZXlCeShwYXJlbnQuc3RhdGUsIGtleUZuLCByZXZlcnNlS2V5Rm4pLCBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgZGlzcGF0Y2hlciA9IG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1hcChwYXJlbnQuZGlzcGF0Y2hlciwgKHBhdGNoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB2YXIgW2Zyb20sIHRvXSA9IHBhdGNoLnJhbmdlO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2VfMS5Qb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHByZXY6IGtleV8xLmRlZmF1bHQuU0VOVElORUwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHByZXY6IHlpZWxkIGtleUZuKHlpZWxkIHBhcmVudFN0YXRlLmdldChwb3NpdGlvbi5wcmV2KSwgcG9zaXRpb24ucHJldikgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5uZXh0ID09PSBrZXlfMS5kZWZhdWx0LlNFTlRJTkVMKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IGtleV8xLmRlZmF1bHQuU0VOVElORUwgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IG5leHQ6IHlpZWxkIGtleUZuKHlpZWxkIHBhcmVudFN0YXRlLmdldChwb3NpdGlvbi5uZXh0KSwgcG9zaXRpb24ubmV4dCkgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJhbmdlID0gKHlpZWxkIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBtYXBQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICBtYXBQb3NpdGlvbih0bylcbiAgICAgICAgICAgIF0pKTtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHN0YXRlXzEuZGVmYXVsdC5rZXlCeShwYXRjaC5hZGRlZCwga2V5Rm4pIDogdW5kZWZpbmVkIH07XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24gc2NhbihwYXJlbnQsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZV8xLmRlZmF1bHQuc2NhbihwYXJlbnQuc3RhdGUsIHNjYW5GbiwgbWVtbyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0b3JlLCBkaXNwYXRjaGVyID0gb2JzZXJ2YWJsZV8xLk9ic2VydmFibGUubWFwKHBhcmVudC5kaXNwYXRjaGVyLCAocGF0Y2gpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgc3RvcmVTdGF0ZSA9IHN0b3JlLnN0YXRlLCBbZnJvbSwgdG9dID0gcGF0Y2gucmFuZ2U7XG4gICAgICAgICAgICB2YXIgYWRkZWQgPSBzdGF0ZV8xLmRlZmF1bHQubGF6eSgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSB5aWVsZCBzdGF0ZV8xLmRlZmF1bHQubGFzdChzdG9yZVN0YXRlLCBbeyBuZXh0OiBudWxsIH0sIGZyb21dKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGVfMS5kZWZhdWx0LnNjYW4oc3RhdGVfMS5kZWZhdWx0LnNsaWNlKHBhcmVudFN0YXRlLCBbeyBuZXh0OiBsYXN0IH0sIHsgcHJldjogbnVsbCB9XSksIHNjYW5GbiwgbGFzdCAhPT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA/IHlpZWxkIHN0b3JlU3RhdGUuZ2V0KGxhc3QpIDogbWVtbyk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogW2Zyb20sIHsgcHJldjogbnVsbCB9XSwgYWRkZWQgfTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gc3RvcmUgPSBjcmVhdGUoZ2V0U3RhdGUoKSwgZGlzcGF0Y2hlcik7XG4gICAgfVxuICAgIFN0b3JlLnNjYW4gPSBzY2FuO1xuICAgIGZ1bmN0aW9uIHRha2UocGFyZW50LCBjb3VudCkge1xuICAgICAgICB2YXIgc3RvcmUsIHN0YXRlID0gc3RhdGVfMS5kZWZhdWx0LnRha2UocGFyZW50LnN0YXRlLCBjb3VudCk7XG4gICAgICAgIHZhciBpbmRleGVkID0gU3RvcmUuc2NhbihwYXJlbnQsIChbaW5kZXhdLCB2YWx1ZSkgPT4gW2luZGV4ICsgMSwgdmFsdWVdLCBbLTEsIG51bGxdKTtcbiAgICAgICAgdmFyIGRpc3BhdGNoZXIgPSBvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5tYXAoaW5kZXhlZC5kaXNwYXRjaGVyLCAocGF0Y2gpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHZhciBbZnJvbV0gPSBwYXRjaC5yYW5nZSwgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGUsIGluZGV4ZWRTdGF0ZSA9IGluZGV4ZWQuc3RhdGU7XG4gICAgICAgICAgICB2YXIga2V5ID0geWllbGQgc3RhdGVfMS5kZWZhdWx0Lmxhc3QoaW5kZXhlZFN0YXRlLCBbeyBuZXh0OiBudWxsIH0sIGZyb21dKTtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGtleSA9PT0ga2V5XzEuZGVmYXVsdC5TRU5USU5FTCA/IC0xIDogKHlpZWxkIGluZGV4ZWRTdGF0ZS5nZXQoa2V5KSlbMF07XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDogc3RhdGVfMS5kZWZhdWx0LnRha2Uoc3RhdGVfMS5kZWZhdWx0Lm1hcChwYXRjaC5hZGRlZCwgKFtpbmRleCwgdmFsdWVdKSA9PiB2YWx1ZSksIGNvdW50IC0gKGluZGV4ICsgMSkpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIGRpc3BhdGNoZXIpO1xuICAgIH1cbiAgICBTdG9yZS50YWtlID0gdGFrZTtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIFN0b3JlLmNyZWF0ZShzdGF0ZV8xLmRlZmF1bHQuY2FjaGUocGFyZW50LnN0YXRlKSwgcGFyZW50LmRpc3BhdGNoZXIsIChzdGF0ZSwgcGF0Y2gpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZV8xLmRlZmF1bHQuY2FjaGUocGF0Y2hfMS5kZWZhdWx0LmFwcGx5KHN0YXRlLCBwYXRjaCkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RvcmUuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBzdGF0ZXMoc3RvcmUpIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1hcChzdG9yZS5kaXNwYXRjaGVyLCAoKSA9PiBzdG9yZS5zdGF0ZSk7XG4gICAgfVxuICAgIFN0b3JlLnN0YXRlcyA9IHN0YXRlcztcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhdGUsIGRpc3BhdGNoZXIsIHJlZHVjZXIgPSBwYXRjaF8xLmRlZmF1bHQuYXBwbHkpIHtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBvYnNlcnZhYmxlXzEuU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgZGlzcGF0Y2hlci5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiAocGF0Y2gpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBzdG9yZS5zdGF0ZSA9IHlpZWxkIHJlZHVjZXIoc3RvcmUuc3RhdGUsIHBhdGNoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViamVjdC5vbk5leHQocGF0Y2gpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHN0b3JlID0ge1xuICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICBkaXNwYXRjaGVyOiB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSxcbiAgICAgICAgICAgICAgICBvbk5leHQ6IG9ic2VydmFibGVfMS5TdWJqZWN0LmlzU3ViamVjdChkaXNwYXRjaGVyKSA/IGRpc3BhdGNoZXIub25OZXh0IDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBzdG9yZTtcbiAgICB9XG4gICAgU3RvcmUuY3JlYXRlID0gY3JlYXRlO1xufSkoU3RvcmUgPSBleHBvcnRzLlN0b3JlIHx8IChleHBvcnRzLlN0b3JlID0ge30pKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdCA9IFN0b3JlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmUuanMubWFwIl19

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var state_1 = __webpack_require__(1);
	;
	var Patch;
	(function (Patch) {
	    function apply(state, patch) {
	        return state_1.default.splice(state, patch.range, patch.added);
	    }
	    Patch.apply = apply;
	    function add(value, key) {
	        var position = arguments.length <= 2 || arguments[2] === undefined ? { prev: null } : arguments[2];
	
	        return { added: state_1.default.unit(value, key), range: [position, position] };
	    }
	    Patch.add = add;
	    function set(value, key) {
	        return { added: state_1.default.unit(value, key), range: [{ prev: key }, { next: key }] };
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
	})(Patch = exports.Patch || (exports.Patch = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Patch;
	//# sourceMappingURL=patch.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcGF0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBTSxVQUFVLFFBQVEsU0FBUixDQUFoQjtBQUNBO0FBQ0EsSUFBSSxLQUFKO0FBQ0EsQ0FBQyxVQUFVLEtBQVYsRUFBaUI7QUFDZCxhQUFTLEtBQVQsQ0FBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCO0FBQ3pCLGVBQU8sUUFBUSxPQUFSLENBQWdCLE1BQWhCLENBQXVCLEtBQXZCLEVBQThCLE1BQU0sS0FBcEMsRUFBMkMsTUFBTSxLQUFqRCxDQUFQO0FBQ0g7QUFDRCxVQUFNLEtBQU4sR0FBYyxLQUFkO0FBQ0EsYUFBUyxHQUFULENBQWEsS0FBYixFQUFvQixHQUFwQixFQUFvRDtBQUFBLFlBQTNCLFFBQTJCLHlEQUFoQixFQUFFLE1BQU0sSUFBUixFQUFnQjs7QUFDaEQsZUFBTyxFQUFFLE9BQU8sUUFBUSxPQUFSLENBQWdCLElBQWhCLENBQXFCLEtBQXJCLEVBQTRCLEdBQTVCLENBQVQsRUFBMkMsT0FBTyxDQUFDLFFBQUQsRUFBVyxRQUFYLENBQWxELEVBQVA7QUFDSDtBQUNELFVBQU0sR0FBTixHQUFZLEdBQVo7QUFDQSxhQUFTLEdBQVQsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLEVBQXlCO0FBQ3JCLGVBQU8sRUFBRSxPQUFPLFFBQVEsT0FBUixDQUFnQixJQUFoQixDQUFxQixLQUFyQixFQUE0QixHQUE1QixDQUFULEVBQTJDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sR0FBUixFQUFELEVBQWdCLEVBQUUsTUFBTSxHQUFSLEVBQWhCLENBQWxELEVBQVA7QUFDSDtBQUNELFVBQU0sR0FBTixHQUFZLEdBQVo7QUFDQSxhQUFTLElBQVQsQ0FBYyxLQUFkLEVBQXFCLEdBQXJCLEVBQTBCO0FBQ3RCLGVBQU8sSUFBSSxLQUFKLEVBQVcsR0FBWCxFQUFnQixFQUFFLE1BQU0sSUFBUixFQUFoQixDQUFQO0FBQ0g7QUFDRCxVQUFNLElBQU4sR0FBYSxJQUFiO0FBQ0EsYUFBUyxPQUFULENBQWlCLEtBQWpCLEVBQXdCLEdBQXhCLEVBQTZCO0FBQ3pCLGVBQU8sSUFBSSxLQUFKLEVBQVcsR0FBWCxFQUFnQixFQUFFLE1BQU0sSUFBUixFQUFoQixDQUFQO0FBQ0g7QUFDRCxVQUFNLE9BQU4sR0FBZ0IsT0FBaEI7QUFDQSxhQUFTLE1BQVQsQ0FBZ0IsR0FBaEIsRUFBcUI7QUFDakIsZUFBTyxFQUFFLE9BQU8sQ0FBQyxFQUFFLE1BQU0sR0FBUixFQUFELEVBQWdCLEVBQUUsTUFBTSxHQUFSLEVBQWhCLENBQVQsRUFBUDtBQUNIO0FBQ0QsVUFBTSxNQUFOLEdBQWUsTUFBZjtBQUNILENBekJELEVBeUJHLFFBQVEsUUFBUSxLQUFSLEtBQWtCLFFBQVEsS0FBUixHQUFnQixFQUFsQyxDQXpCWDtBQTBCQSxPQUFPLGNBQVAsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkMsRUFBRSxPQUFPLElBQVQsRUFBN0M7QUFDQSxRQUFRLE9BQVIsR0FBa0IsS0FBbEIiLCJmaWxlIjoicGF0Y2guanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBzdGF0ZV8xID0gcmVxdWlyZSgnLi9zdGF0ZScpO1xuO1xudmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gc3RhdGVfMS5kZWZhdWx0LnNwbGljZShzdGF0ZSwgcGF0Y2gucmFuZ2UsIHBhdGNoLmFkZGVkKTtcbiAgICB9XG4gICAgUGF0Y2guYXBwbHkgPSBhcHBseTtcbiAgICBmdW5jdGlvbiBhZGQodmFsdWUsIGtleSwgcG9zaXRpb24gPSB7IHByZXY6IG51bGwgfSkge1xuICAgICAgICByZXR1cm4geyBhZGRlZDogc3RhdGVfMS5kZWZhdWx0LnVuaXQodmFsdWUsIGtleSksIHJhbmdlOiBbcG9zaXRpb24sIHBvc2l0aW9uXSB9O1xuICAgIH1cbiAgICBQYXRjaC5hZGQgPSBhZGQ7XG4gICAgZnVuY3Rpb24gc2V0KHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHsgYWRkZWQ6IHN0YXRlXzEuZGVmYXVsdC51bml0KHZhbHVlLCBrZXkpLCByYW5nZTogW3sgcHJldjoga2V5IH0sIHsgbmV4dDoga2V5IH1dIH07XG4gICAgfVxuICAgIFBhdGNoLnNldCA9IHNldDtcbiAgICBmdW5jdGlvbiBwdXNoKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIGFkZCh2YWx1ZSwga2V5LCB7IHByZXY6IG51bGwgfSk7XG4gICAgfVxuICAgIFBhdGNoLnB1c2ggPSBwdXNoO1xuICAgIGZ1bmN0aW9uIHVuc2hpZnQodmFsdWUsIGtleSkge1xuICAgICAgICByZXR1cm4gYWRkKHZhbHVlLCBrZXksIHsgbmV4dDogbnVsbCB9KTtcbiAgICB9XG4gICAgUGF0Y2gudW5zaGlmdCA9IHVuc2hpZnQ7XG4gICAgZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4geyByYW5nZTogW3sgcHJldjoga2V5IH0sIHsgbmV4dDoga2V5IH1dIH07XG4gICAgfVxuICAgIFBhdGNoLnJlbW92ZSA9IHJlbW92ZTtcbn0pKFBhdGNoID0gZXhwb3J0cy5QYXRjaCB8fCAoZXhwb3J0cy5QYXRjaCA9IHt9KSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBQYXRjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBhdGNoLmpzLm1hcCJdfQ==

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _keys = __webpack_require__(93);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _create = __webpack_require__(65);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _regenerator = __webpack_require__(5);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
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
	var key_1 = __webpack_require__(86);
	var async_iterator_1 = __webpack_require__(92);
	var Disposable;
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
	})(Disposable = exports.Disposable || (exports.Disposable = {}));
	var Observable;
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
	        async_iterator_1.default.forEach(iterator, subject.onNext);
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
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
	        return async_iterator_1.default.create(next);
	    }
	    Observable.toIterator = toIterator;
	})(Observable = exports.Observable || (exports.Observable = {}));
	var Subject;
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
	            var observerKey = key_1.default.unique();
	            observers[observerKey] = observer;
	            return Disposable.create(function () {
	                return delete observers[observerKey];
	            });
	        }
	        function onNext(value) {
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
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
	            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
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
	})(Subject = exports.Subject || (exports.Subject = {}));
	//# sourceMappingURL=observable.js.map
	//# sourceMappingURL=data:application/json;base64,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QTtBQUFBO0FBQUE7QUFBQTtBQUNuQywwQ0FBVSxJQUFWO0FBQ0Esd0NBQVEsTUFBUjtBQUZtQyxrRUFHNUIsVUFBVSxRQUFRLElBQVIsQ0FBYTtBQUFBLDJDQUFNLGtCQUFRLEdBQVIsQ0FBWSxvQkFBWSxTQUFaLEVBQXVCLEdBQXZCLENBQTJCO0FBQUEsK0NBQU8sVUFBVSxHQUFWLEVBQWUsT0FBZixHQUF5QixVQUFVLEdBQVYsRUFBZSxPQUFmLENBQXVCLE1BQXZCLENBQXpCLEdBQTBELFNBQWpFO0FBQUEscUNBQTNCLENBQVosRUFBb0gsSUFBcEgsQ0FBeUgsWUFBTTtBQUFFLG9EQUFZLElBQVo7QUFBbUIscUNBQXBKLENBQU47QUFBQSxpQ0FBYixDQUhrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFoQyxFQUFQO0FBS0g7QUFDRCxlQUFPLEVBQUUsb0JBQUYsRUFBYSxjQUFiLEVBQXFCLHNCQUFyQixFQUFpQyxnQkFBakMsRUFBUDtBQUNIO0FBQ0QsWUFBUSxNQUFSLEdBQWlCLE1BQWpCO0FBQ0gsQ0ExQ0QsRUEwQ0csVUFBVSxRQUFRLE9BQVIsS0FBb0IsUUFBUSxPQUFSLEdBQWtCLEVBQXRDLENBMUNiIiwiZmlsZSI6Im9ic2VydmFibGUuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvb3N0L1Byb2plY3RzL3NvbmljIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci50aHJvdyh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5jb25zdCBrZXlfMSA9IHJlcXVpcmUoJy4va2V5Jyk7XG5jb25zdCBhc3luY19pdGVyYXRvcl8xID0gcmVxdWlyZSgnLi9hc3luY19pdGVyYXRvcicpO1xudmFyIERpc3Bvc2FibGU7XG4oZnVuY3Rpb24gKERpc3Bvc2FibGUpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoZGlzcG9zZXIpIHtcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGlzcG9zZXIpXG4gICAgICAgICAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIERpc3Bvc2FibGUuY3JlYXRlID0gY3JlYXRlO1xufSkoRGlzcG9zYWJsZSA9IGV4cG9ydHMuRGlzcG9zYWJsZSB8fCAoZXhwb3J0cy5EaXNwb3NhYmxlID0ge30pKTtcbnZhciBPYnNlcnZhYmxlO1xuKGZ1bmN0aW9uIChPYnNlcnZhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGZuKSB7XG4gICAgICAgIHZhciBzdWJqZWN0O1xuICAgICAgICBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIGlmICghc3ViamVjdCkge1xuICAgICAgICAgICAgICAgIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChmbilcbiAgICAgICAgICAgICAgICAgICAgZm4oc3ViamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdC5zdWJzY3JpYmUob2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBwaXBlKG9ic2VydmFibGUsIG9ic2VydmVyKSB7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKG9ic2VydmVyKTtcbiAgICAgICAgcmV0dXJuIG9ic2VydmVyO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnBpcGUgPSBwaXBlO1xuICAgIGZ1bmN0aW9uIG1hcChvYnNlcnZhYmxlLCBtYXBGbikge1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN1YmplY3QgPT4ge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKG1hcEZuKHZhbHVlKSkudGhlbihzdWJqZWN0Lm9uTmV4dClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKG9ic2VydmFibGUsIGZpbHRlckZuKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3ViamVjdCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoZmlsdGVyRm4odmFsdWUpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSkgOiB1bmRlZmluZWQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ob2JzZXJ2YWJsZSwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3ViamVjdCA9PiB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW8sIHZhbHVlKSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgcmV0dXJuIHN1YmplY3Qub25OZXh0KHZhbHVlKTsgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5zY2FuID0gc2NhbjtcbiAgICBmdW5jdGlvbiBmb3JFYWNoKG9ic2VydmFibGUsIGZuKSB7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IGZuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdWJqZWN0ID0+IHtcbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWJqZWN0Lm9uTmV4dCkudGhlbihzdWJqZWN0Lm9uQ29tcGxldGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZSA9IGZyb21Qcm9taXNlO1xuICAgIGZ1bmN0aW9uIHRvUHJvbWlzZShvYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgb25OZXh0OiByZXNvbHZlLFxuICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgb25FcnJvcjogcmVqZWN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE9ic2VydmFibGUudG9Qcm9taXNlID0gdG9Qcm9taXNlO1xuICAgIGZ1bmN0aW9uIGZyb21JdGVyYXRvcihpdGVyYXRvcikge1xuICAgICAgICB2YXIgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIGFzeW5jX2l0ZXJhdG9yXzEuZGVmYXVsdC5mb3JFYWNoKGl0ZXJhdG9yLCBzdWJqZWN0Lm9uTmV4dCk7XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZTogc3ViamVjdC5zdWJzY3JpYmUgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS5mcm9tSXRlcmF0b3IgPSBmcm9tSXRlcmF0b3I7XG4gICAgZnVuY3Rpb24gdG9JdGVyYXRvcihvYnNlcnZhYmxlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlZmVyKCkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmUsIHJlamVjdCwgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUgPSByZXM7XG4gICAgICAgICAgICAgICAgcmVqZWN0ID0gcmVqO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4geyByZXNvbHZlLCByZWplY3QsIHByb21pc2UgfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIHZhciBkZWZlcnJlZHMgPSBbXTtcbiAgICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIGVycm9yO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXJyZWRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRzLnBvcCgpLnJlc29sdmUoeyBkb25lOiBmYWxzZSwgdmFsdWUgfSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Db21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVmZXJyZWRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZGVmZXJyZWRzLnBvcCgpLnJlc29sdmUoeyBkb25lOiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uRXJyb3IocmVhc29uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlZmVycmVkcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGRlZmVycmVkcy5wb3AoKS5yZWplY3QocmVhc29uKTtcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHJlYXNvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgICAgIGlmIChkb25lICYmICF2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yZWQgJiYgIXZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiBmYWxzZSwgdmFsdWU6IHZhbHVlcy5zaGlmdCgpIH07XG4gICAgICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgICAgICAgICAgICAgICBkZWZlcnJlZHMucHVzaChkZWZlcnJlZCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXN5bmNfaXRlcmF0b3JfMS5kZWZhdWx0LmNyZWF0ZShuZXh0KTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZS50b0l0ZXJhdG9yID0gdG9JdGVyYXRvcjtcbn0pKE9ic2VydmFibGUgPSBleHBvcnRzLk9ic2VydmFibGUgfHwgKGV4cG9ydHMuT2JzZXJ2YWJsZSA9IHt9KSk7XG52YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGlzU3ViamVjdChvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmpbXCJvbk5leHRcIl0gPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG4gICAgU3ViamVjdC5pc1N1YmplY3QgPSBpc1N1YmplY3Q7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICB2YXIgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKSwgY3VycmVudCA9IFByb21pc2UucmVzb2x2ZSgpLCBjb21wbGV0ZWQgPSBmYWxzZSwgcmVzdWx0LCBlcnJvcmVkID0gZmFsc2UsIGVycm9yO1xuICAgICAgICBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIGlmIChjb21wbGV0ZWQpIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKCkgPT4gb2JzZXJ2ZXIub25Db21wbGV0ZShyZXN1bHQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlcnJvcmVkKSB7XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCgpID0+IG9ic2VydmVyLm9uRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvYnNlcnZlcktleSA9IGtleV8xLmRlZmF1bHQudW5pcXVlKCk7XG4gICAgICAgICAgICBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gZGVsZXRlIG9ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25OZXh0KHZhbHVlKSkpLnRoZW4oKCkgPT4geyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkNvbXBsZXRlKHJlcykge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlcztcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25Db21wbGV0ZSA/IG9ic2VydmVyc1trZXldLm9uQ29tcGxldGUocmVzKSA6IHVuZGVmaW5lZCkpLnRoZW4oKCkgPT4geyBvYnNlcnZlcnMgPSBudWxsOyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yKHJlYXNvbikge1xuICAgICAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlcnJvciA9IHJlYXNvbjtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudCA9IGN1cnJlbnQudGhlbigoKSA9PiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyhvYnNlcnZlcnMpLm1hcChrZXkgPT4gb2JzZXJ2ZXJzW2tleV0ub25FcnJvciA/IG9ic2VydmVyc1trZXldLm9uRXJyb3IocmVhc29uKSA6IHVuZGVmaW5lZCkpLnRoZW4oKCkgPT4geyBvYnNlcnZlcnMgPSBudWxsOyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUsIG9uTmV4dCwgb25Db21wbGV0ZSwgb25FcnJvciB9O1xuICAgIH1cbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN1YmplY3QgPSBleHBvcnRzLlN1YmplY3QgfHwgKGV4cG9ydHMuU3ViamVjdCA9IHt9KSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcCJdfQ==

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _promise = __webpack_require__(68);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var PromiseUtils;
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
	})(PromiseUtils = exports.PromiseUtils || (exports.PromiseUtils = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PromiseUtils;
	//# sourceMappingURL=promise_utils.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvcHJvbWlzZV91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUFDQSxJQUFJLFlBQUo7QUFDQSxDQUFDLFVBQVUsWUFBVixFQUF3QjtBQUNyQixhQUFTLElBQVQsQ0FBYyxRQUFkLEVBQXdCO0FBQ3BCLFlBQUksT0FBSjtBQUNBLGlCQUFTLElBQVQsQ0FBYyxXQUFkLEVBQTJCLFVBQTNCLEVBQXVDO0FBQ25DLGdCQUFJLE9BQUosRUFDSSxPQUFPLFFBQVEsSUFBUixDQUFhLFdBQWIsRUFBMEIsVUFBMUIsQ0FBUDtBQUNKLG1CQUFPLENBQUMsVUFBVSxzQkFBWSxRQUFaLENBQVgsRUFBa0MsSUFBbEMsQ0FBdUMsV0FBdkMsRUFBb0QsVUFBcEQsQ0FBUDtBQUNIO0FBQ0QsZUFBTyxrQkFBUSxPQUFSLENBQWdCLEVBQUUsVUFBRixFQUFoQixDQUFQO0FBQ0g7QUFDRCxpQkFBYSxJQUFiLEdBQW9CLElBQXBCO0FBQ0gsQ0FYRCxFQVdHLGVBQWUsUUFBUSxZQUFSLEtBQXlCLFFBQVEsWUFBUixHQUF1QixFQUFoRCxDQVhsQjtBQVlBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFLE9BQU8sSUFBVCxFQUE3QztBQUNBLFFBQVEsT0FBUixHQUFrQixZQUFsQiIsImZpbGUiOiJwcm9taXNlX3V0aWxzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIFByb21pc2VVdGlscztcbihmdW5jdGlvbiAoUHJvbWlzZVV0aWxzKSB7XG4gICAgZnVuY3Rpb24gbGF6eShleGVjdXRvcikge1xuICAgICAgICB2YXIgcHJvbWlzZTtcbiAgICAgICAgZnVuY3Rpb24gdGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xuICAgICAgICAgICAgaWYgKHByb21pc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgICAgICByZXR1cm4gKHByb21pc2UgPSBuZXcgUHJvbWlzZShleGVjdXRvcikpLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyB0aGVuIH0pO1xuICAgIH1cbiAgICBQcm9taXNlVXRpbHMubGF6eSA9IGxhenk7XG59KShQcm9taXNlVXRpbHMgPSBleHBvcnRzLlByb21pc2VVdGlscyB8fCAoZXhwb3J0cy5Qcm9taXNlVXRpbHMgPSB7fSkpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gUHJvbWlzZVV0aWxzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJvbWlzZV91dGlscy5qcy5tYXAiXX0=

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var state_1 = __webpack_require__(1);
	var store_1 = __webpack_require__(98);
	var observable_1 = __webpack_require__(100);
	var Lens;
	(function (Lens) {
	    function compose(parent, lens) {
	        var getSubject = observable_1.Subject.create(),
	            setSubject = observable_1.Subject.create();
	        observable_1.Observable.map(parent.dispatcher, function (patch) {
	            if (patch.added) return { range: patch.range, added: state_1.default.map(patch.added, lens.get) };
	            return { range: patch.range };
	        }).subscribe(getSubject);
	        observable_1.Observable.map(setSubject, function (patch) {
	            if (patch.added) return { range: patch.range, added: state_1.default.map(patch.added, lens.set) };
	            return { range: patch.range };
	        }).subscribe(parent.dispatcher);
	        return store_1.Store.create(state_1.default.map(parent.state, lens.get), { subscribe: getSubject.subscribe, onNext: setSubject.onNext });
	    }
	    Lens.compose = compose;
	})(Lens = exports.Lens || (exports.Lens = {}));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Lens;
	//# sourceMappingURL=lens.js.map
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3QvbGVucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFDQSxJQUFNLFVBQVUsUUFBUSxTQUFSLENBQWhCO0FBQ0EsSUFBTSxVQUFVLFFBQVEsU0FBUixDQUFoQjtBQUNBLElBQU0sZUFBZSxRQUFRLGNBQVIsQ0FBckI7QUFDQSxJQUFJLElBQUo7QUFDQSxDQUFDLFVBQVUsSUFBVixFQUFnQjtBQUNiLGFBQVMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixJQUF6QixFQUErQjtBQUMzQixZQUFJLGFBQWEsYUFBYSxPQUFiLENBQXFCLE1BQXJCLEVBQWpCO0FBQUEsWUFBZ0QsYUFBYSxhQUFhLE9BQWIsQ0FBcUIsTUFBckIsRUFBN0Q7QUFDQSxxQkFBYSxVQUFiLENBQXdCLEdBQXhCLENBQTRCLE9BQU8sVUFBbkMsRUFBK0MsaUJBQVM7QUFDcEQsZ0JBQUksTUFBTSxLQUFWLEVBQ0ksT0FBTyxFQUFFLE9BQU8sTUFBTSxLQUFmLEVBQXNCLE9BQU8sUUFBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLE1BQU0sS0FBMUIsRUFBaUMsS0FBSyxHQUF0QyxDQUE3QixFQUFQO0FBQ0osbUJBQU8sRUFBRSxPQUFPLE1BQU0sS0FBZixFQUFQO0FBQ0gsU0FKRCxFQUlHLFNBSkgsQ0FJYSxVQUpiO0FBS0EscUJBQWEsVUFBYixDQUF3QixHQUF4QixDQUE0QixVQUE1QixFQUF3QyxpQkFBUztBQUM3QyxnQkFBSSxNQUFNLEtBQVYsRUFDSSxPQUFPLEVBQUUsT0FBTyxNQUFNLEtBQWYsRUFBc0IsT0FBTyxRQUFRLE9BQVIsQ0FBZ0IsR0FBaEIsQ0FBb0IsTUFBTSxLQUExQixFQUFpQyxLQUFLLEdBQXRDLENBQTdCLEVBQVA7QUFDSixtQkFBTyxFQUFFLE9BQU8sTUFBTSxLQUFmLEVBQVA7QUFDSCxTQUpELEVBSUcsU0FKSCxDQUlhLE9BQU8sVUFKcEI7QUFLQSxlQUFPLFFBQVEsS0FBUixDQUFjLE1BQWQsQ0FBcUIsUUFBUSxPQUFSLENBQWdCLEdBQWhCLENBQW9CLE9BQU8sS0FBM0IsRUFBa0MsS0FBSyxHQUF2QyxDQUFyQixFQUFrRSxFQUFFLFdBQVcsV0FBVyxTQUF4QixFQUFtQyxRQUFRLFdBQVcsTUFBdEQsRUFBbEUsQ0FBUDtBQUNIO0FBQ0QsU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNILENBaEJELEVBZ0JHLE9BQU8sUUFBUSxJQUFSLEtBQWlCLFFBQVEsSUFBUixHQUFlLEVBQWhDLENBaEJWO0FBaUJBLE9BQU8sY0FBUCxDQUFzQixPQUF0QixFQUErQixZQUEvQixFQUE2QyxFQUFFLE9BQU8sSUFBVCxFQUE3QztBQUNBLFFBQVEsT0FBUixHQUFrQixJQUFsQiIsImZpbGUiOiJsZW5zLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qb29zdC9Qcm9qZWN0cy9zb25pYyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY29uc3Qgc3RhdGVfMSA9IHJlcXVpcmUoJy4vc3RhdGUnKTtcbmNvbnN0IHN0b3JlXzEgPSByZXF1aXJlKCcuL3N0b3JlJyk7XG5jb25zdCBvYnNlcnZhYmxlXzEgPSByZXF1aXJlKCcuL29ic2VydmFibGUnKTtcbnZhciBMZW5zO1xuKGZ1bmN0aW9uIChMZW5zKSB7XG4gICAgZnVuY3Rpb24gY29tcG9zZShwYXJlbnQsIGxlbnMpIHtcbiAgICAgICAgdmFyIGdldFN1YmplY3QgPSBvYnNlcnZhYmxlXzEuU3ViamVjdC5jcmVhdGUoKSwgc2V0U3ViamVjdCA9IG9ic2VydmFibGVfMS5TdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlXzEuT2JzZXJ2YWJsZS5tYXAocGFyZW50LmRpc3BhdGNoZXIsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBzdGF0ZV8xLmRlZmF1bHQubWFwKHBhdGNoLmFkZGVkLCBsZW5zLmdldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUoZ2V0U3ViamVjdCk7XG4gICAgICAgIG9ic2VydmFibGVfMS5PYnNlcnZhYmxlLm1hcChzZXRTdWJqZWN0LCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogc3RhdGVfMS5kZWZhdWx0Lm1hcChwYXRjaC5hZGRlZCwgbGVucy5zZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhcmVudC5kaXNwYXRjaGVyKTtcbiAgICAgICAgcmV0dXJuIHN0b3JlXzEuU3RvcmUuY3JlYXRlKHN0YXRlXzEuZGVmYXVsdC5tYXAocGFyZW50LnN0YXRlLCBsZW5zLmdldCksIHsgc3Vic2NyaWJlOiBnZXRTdWJqZWN0LnN1YnNjcmliZSwgb25OZXh0OiBzZXRTdWJqZWN0Lm9uTmV4dCB9KTtcbiAgICB9XG4gICAgTGVucy5jb21wb3NlID0gY29tcG9zZTtcbn0pKExlbnMgPSBleHBvcnRzLkxlbnMgfHwgKGV4cG9ydHMuTGVucyA9IHt9KSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlZmF1bHQgPSBMZW5zO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGVucy5qcy5tYXAiXX0=

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sonic.browser.js.map