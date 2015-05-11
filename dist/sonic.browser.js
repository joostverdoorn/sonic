(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mutable_list_1 = require('./mutable_list');
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(array) {
        var _this = this;
        if (array === void 0) { array = []; }
        _super.call(this);
        this.has = function (id) {
            return -1 < id && id < _this._array.length;
        };
        this.get = function (id) {
            if (_this.has(id))
                return _this._array[id];
            return;
        };
        this.prev = function (id) {
            if (id == null && _this._array.length)
                return _this._array.length - 1;
            if (_this._array.length > 0 && id != null && _this.has(id) && _this.has(id - 1))
                return id - 1;
            return null;
        };
        this.next = function (id) {
            if (id == null && _this._array.length)
                return 0;
            if (_this._array.length > 0 && id != null && _this.has(id) && _this.has(id + 1))
                return id + 1;
            return null;
        };
        this.set = function (id, value) {
            if (!_this.has(id))
                return false;
            _this._array[id] = value;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (prev == null)
                prev = -1;
            else if (!_this.has(prev))
                return false;
            if (next == null)
                next = _this._array.length;
            else if (!_this.has(next))
                return false;
            (_a = _this._array).splice.apply(_a, [prev + 1, next - prev - 1].concat(values));
            _this._invalidate(prev, null);
            return true;
            var _a;
        };
        this._array = array;
    }
    return ArrayList;
})(mutable_list_1.default);
exports.ArrayList = ArrayList;
exports.default = ArrayList;

},{"./mutable_list":6}],2:[function(require,module,exports){
;
function compose(f, g) {
    return function (x) {
        return f(g(x));
    };
}
exports.compose = compose;
;
exports.default = compose;

},{}],3:[function(require,module,exports){
var list_1 = require('./list');
var observable_list_1 = require('./observable_list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
function factory(obj) {
    if (mutable_list_1.MutableList.isMutableList(obj))
        return mutable_list_1.MutableList.create(obj);
    if (observable_list_1.ObservableList.isObservableList(obj))
        return observable_list_1.ObservableList.create(obj);
    if (list_1.List.isList(obj))
        return list_1.List.create(obj);
    if (Array.isArray(obj))
        return new array_list_1.default(obj);
    return unit_1.default.create(obj);
}
exports.default = factory;

},{"./array_list":1,"./list":5,"./mutable_list":6,"./observable_list":7,"./unit":9}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
var mutable_list_1 = require('./mutable_list');
var LinkedList = (function (_super) {
    __extends(LinkedList, _super);
    function LinkedList(array) {
        var _this = this;
        _super.call(this);
        this.has = function (id) {
            return id in _this._byId;
        };
        this.get = function (id) {
            return _this._byId[id];
        };
        this.prev = function (id) {
            if (id === void 0) { id = -1; }
            return _this._prev[id];
        };
        this.next = function (id) {
            if (id === void 0) { id = -1; }
            return _this._next[id];
        };
        this.set = function (id, value) {
            if (!_this.has(id))
                return false;
            _this._byId[id] = value;
            _this._invalidate(_this._prev[id], _this._next[id]);
            return true;
        };
        this.splice = function (prev, next) {
            if (prev === void 0) { prev = -1; }
            if (next === void 0) { next = -1; }
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            var _next, _prev, value, id;
            while (_next = _this._next[_next || prev]) {
                delete _this._next[_this._prev[_next]];
                delete _this._next[_prev];
                if (_next == next)
                    break;
                delete _this._byId[_next];
            }
            while (_prev = _this._prev[_prev || next]) {
                delete _this._prev[_this._next[_prev]];
                delete _this._prev[_prev];
                if (_prev == prev)
                    break;
                delete _this._byId[_next];
            }
            for (var _a = 0; _a < values.length; _a++) {
                value = values[_a];
                id = unique_id_1.default();
                _this._byId[id] = value;
                _this._prev[id] = prev;
                _this._next[prev] = id;
                prev = id;
            }
            _this._prev[next] = prev;
            _this._next[prev] = next;
            _this._invalidate(prev, next);
            return true;
        };
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[-1] = -1;
        this._next[-1] = -1;
        this.splice.apply(this, [null, null].concat(array));
    }
    return LinkedList;
})(mutable_list_1.default);
exports.default = LinkedList;

},{"./mutable_list":6,"./unique_id":8}],5:[function(require,module,exports){
var List = (function () {
    function List() {
        var _this = this;
        this.forEach = function (fn) { return List.forEach(_this, fn); };
        this.reduce = function (fn, memo) { return List.reduce(_this, fn); };
        this.toArray = function () { return List.toArray(_this); };
        this.findId = function (fn) { return List.findId(_this, fn); };
        this.find = function (fn) { return List.find(_this, fn); };
        this.idOf = function (value) { return List.idOf(_this, value); };
        this.indexOf = function (value) { return List.indexOf(_this, value); };
        this.idAt = function (index) { return List.idAt(_this, index); };
        this.at = function (index) { return List.at(_this, index); };
        this.every = function (predicate) { return List.every(_this, predicate); };
        this.some = function (predicate) { return List.some(_this, predicate); };
        this.contains = function (value) { return List.contains(_this, value); };
        this.first = function () { return List.first(_this); };
        this.last = function () { return List.last(_this); };
        this.reverse = function () { return List.reverse(_this); };
        this.map = function (mapFn) { return List.map(_this, mapFn); };
        this.filter = function (filterFn) { return List.filter(_this, filterFn); };
        this.flatten = function () { return List.flatten(_this); };
        this.flatMap = function (flatMapFn) { return List.flatMap(_this, flatMapFn); };
    }
    List.isList = function (obj) {
        return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    ;
    List.create = function (list) {
        var obj = {
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next
        };
        List.call(obj);
        return obj;
    };
    List.forEach = function (list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            fn(list.get(id), id);
    };
    List.reduce = function (list, fn, memo) {
        var id;
        while ((id = list.next(id)) != null)
            memo = fn(memo, list.get(id), id);
        return memo;
    };
    List.toArray = function (list) {
        return List.reduce(list, function (memo, v) { memo.push(v); return memo; }, []);
    };
    List.findId = function (list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            if (fn(list.get(id), id))
                return id;
    };
    List.find = function (list, fn) {
        return list.get(List.findId(list, fn));
    };
    List.idOf = function (list, value) {
        return List.findId(list, function (v) { return v === value; });
    };
    List.indexOf = function (list, value) {
        var id, i = 0;
        while ((id = list.next(id)) != null) {
            if (list.get(id) === value)
                return i;
            i++;
        }
    };
    List.idAt = function (list, index) {
        var id, i = 0;
        while ((id = list.next(id)) != null)
            if (i++ == index)
                return id;
        return null;
    };
    List.at = function (list, index) {
        return list.get(List.idAt(list, index));
    };
    List.every = function (list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (!predicate(list.get(id), id))
                return false;
        return true;
    };
    List.some = function (list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (predicate(list.get(id), id))
                return true;
        return false;
    };
    List.contains = function (list, value) {
        return List.some(list, function (v) { return v === value; });
    };
    List.first = function (list) {
        return list.get(list.next());
    };
    List.last = function (list) {
        return list.get(list.prev());
    };
    List.reverse = function (list) {
        function has(id) {
            return list.has(id);
        }
        function get(id) {
            return list.get(id);
        }
        function prev(id) {
            return list.next(id);
        }
        function next(id) {
            return list.prev(id);
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(id) {
            return mapFn(list.get(id));
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.filter = function (list, filterFn) {
        function has(id) {
            return list.has(id) && filterFn(list.get(id));
        }
        function get(id) {
            if (has(id))
                return list.get(id);
            return;
        }
        function prev(id) {
            var prev = id;
            while ((prev = list.prev(prev)) != null)
                if (has(prev))
                    return prev;
            return null;
        }
        function next(id) {
            var next = id;
            while ((next = list.next(next)) != null)
                if (has(next))
                    return next;
            return null;
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.flatten = function (list) {
        function has(id) {
            if (list.has(id[0]))
                return (list.get(id[0])).has(id[1]);
            return false;
        }
        function get(id) {
            if (list.has(id[0]))
                return (list.get(id[0])).get(id[1]);
            return;
        }
        function prev(id) {
            if (id == null)
                return [].concat(list.prev()).concat((List.last(list)).prev());
            var prev, listId = id[0];
            if (list.has(listId)) {
                prev = (list.get(listId)).prev(id[1]);
                if (prev != null)
                    return [listId, prev];
                while ((listId = list.prev(listId)) != null) {
                    if ((prev = (list.get(listId)).prev()) != null)
                        return [listId, prev];
                }
            }
            return null;
        }
        function next(id) {
            if (id == null)
                return [].concat(list.next()).concat((List.first(list)).next());
            var next, listId = id[0];
            if (list.has(listId)) {
                if ((next = (list.get(listId)).next(id[1])) != null)
                    return [listId, next];
                while ((listId = list.next(listId)) != null) {
                    if ((next = (list.get(listId)).next()) != null)
                        return [listId, next];
                }
            }
            return null;
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.indexBy = function (ids, values) {
        function has(id) {
            return id.toString() in ids;
        }
        function get(id) {
            return values[id.toString()];
        }
        function prev(id) {
            var i = ids.indexOf(id);
            if (id == null && ids.length)
                return ids[ids.length - 1];
            if (ids.length > 0 && id != null && i > 0)
                return ids[i - 1];
            return null;
        }
        function next(id) {
            var i = ids.indexOf(id);
            if (id == null && ids.length)
                return ids[0];
            if (ids.length > 0 && id != null && i < ids.length - 1)
                return ids[i + 1];
            return null;
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.cache = function (list) {
        var _get = Object.create(null), _next = Object.create(null), _prev = Object.create(null);
        function has(id) {
            if (id == null)
                return null;
            return id.toString() in _get || list.has(id);
        }
        function get(id) {
            if (!has(id))
                return null;
            var idString = id.toString(), res = _get[idString];
            if (res == null) {
                res = _get[idString] = list.get(id);
            }
            return res;
        }
        function prev(id) {
            if (!has(id))
                res = list.prev();
            else {
                var idString = id.toString(), res = _prev[idString];
                if (res == null) {
                    res = _prev[idString] = list.prev(id);
                }
            }
            return res;
        }
        function next(id) {
            if (!has(id))
                res = list.next();
            else {
                var idString = id.toString(), res = _next[idString];
                if (res == null) {
                    res = _next[idString] = list.next(id);
                }
            }
            return res;
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    return List;
})();
exports.List = List;
exports.default = List;

},{}],6:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_list_1 = require('./observable_list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList() {
        var _this = this;
        _super.call(this);
        this.push = function (value) { return MutableList.push(_this, value); };
        this.unshift = function (value) { return MutableList.unshift(_this, value); };
        this.pop = function () { return MutableList.pop(_this); };
        this.shift = function () { return MutableList.shift(_this); };
        this.delete = function (id) { return MutableList.delete(_this, id); };
        this.remove = function (value) { return MutableList.remove(_this, value); };
    }
    MutableList.isMutableList = function (obj) {
        return observable_list_1.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    };
    MutableList.create = function (list) {
        var obj = {
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe,
            set: list.set,
            splice: list.splice
        };
        return MutableList.call(list);
    };
    MutableList.push = function (list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    };
    MutableList.unshift = function (list, value) {
        list.splice(list.next(), null, value);
        return list.next();
    };
    MutableList.pop = function (list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    };
    MutableList.shift = function (list) {
        var value = list.get(list.next());
        list.splice(list.next(list.next()), null);
        return value;
    };
    MutableList.delete = function (list, id) {
        if (!list.has(id))
            return false;
        return list.splice(list.prev(id), list.next(id));
    };
    MutableList.remove = function (list, value) {
        var id = MutableList.idOf(list, value);
        return delete (list, id);
    };
    return MutableList;
})(observable_list_1.ObservableList);
exports.MutableList = MutableList;
Object.keys(MutableList).forEach(function (key) {
    MutableList.prototype[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        MutableList[key].apply(MutableList, [this].concat(args));
    };
});
exports.default = MutableList;

},{"./observable_list":7}],7:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var compose_1 = require('./compose');
var unique_id_1 = require('./unique_id');
var list_1 = require('./list');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList() {
        var _this = this;
        _super.call(this);
        this.observe = function (observer) {
            var observerId = unique_id_1.default();
            var observers = _this._observers;
            observers[observerId] = observer;
            return {
                unsubscribe: function () { delete observers[observerId]; }
            };
        };
        this._invalidate = function (prev, next) {
            if (!_this.has(prev))
                prev = null;
            if (!_this.has(next))
                next = null;
            _this._notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._observers = Object.create(null);
    }
    ObservableList.isObservableList = function (obj) {
        return list_1.List.isList(obj) && !!obj['observe'];
    };
    ObservableList.prototype._notify = function (notifier) {
        for (var observerId in this._observers)
            notifier(this._observers[observerId]);
    };
    ObservableList.create = function (list) {
        var obj = {
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe
        };
        return ObservableList.call(obj);
    };
    ObservableList.reverse = function (list) {
        var _a = list_1.List.reverse(list), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe(observer);
        }
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
    };
    ObservableList.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next, observe = list.observe;
        return ObservableList.create({ has: has, get: compose_1.default(mapFn, list.get), prev: prev, next: next, observe: observe });
    };
    ObservableList.filter = function (list, filterFn) {
        var _a = list_1.List.filter(list, filterFn), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe({
                onInvalidate: function (p, n) {
                    p = has(p) ? p : prev(p);
                    n = has(n) ? n : next(n);
                    observer.onInvalidate(p, n);
                }
            });
        }
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;

},{"./compose":2,"./list":5,"./unique_id":8}],8:[function(require,module,exports){
var id = 0;
function uniqueId() {
    return ++id;
}
exports.uniqueId = uniqueId;
exports.default = uniqueId;

},{}],9:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
var mutable_list_1 = require('./mutable_list');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(value) {
        var _this = this;
        _super.call(this);
        this.has = function (id) {
            return _this._id == id;
        };
        this.get = function (id) {
            if (_this.has(id))
                return _this._value;
        };
        this.prev = function (id) {
            if (id == null)
                return _this._id;
            return null;
        };
        this.next = function (id) {
            if (id == null)
                return _this._id;
            return null;
        };
        this.set = function (id, value) {
            _this._id = id;
            _this._value = value;
            // this._notify();
            return true;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                return _this.set(unique_id_1.default(), values[0]);
            delete _this._id;
            delete _this._value;
            // this._invalidate();
            return true;
        };
        if (arguments.length > 2)
            this.splice(null, null, value);
    }
    return Unit;
})(mutable_list_1.default);
exports.default = Unit;

},{"./mutable_list":6,"./unique_id":8}],10:[function(require,module,exports){
var factory_1 = require('./factory');
var list_1 = require('./list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
var linked_list_1 = require('./linked_list');
function Sonic(obj) {
    return factory_1.default(obj);
}
Sonic['List'] = list_1.default;
Sonic['MutableList'] = mutable_list_1.default;
Sonic['Unit'] = unit_1.default;
Sonic['ArrayList'] = array_list_1.default;
Sonic['LinkedList'] = linked_list_1.default;
module.exports = Sonic;

},{"./array_list":1,"./factory":3,"./linked_list":4,"./list":5,"./mutable_list":6,"./unit":9}]},{},[10])(10)
});