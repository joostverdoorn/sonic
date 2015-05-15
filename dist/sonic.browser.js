(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(array) {
        var _this = this;
        if (array === void 0) { array = []; }
        _super.call(this);
        this.has = function (id) {
            return id != null && -1 < id && id < _this._array.length;
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
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            if (!_this.has(prev))
                prev = null;
            if (!_this.has(next))
                next = null;
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new observable_1.Subject();
        this._array = array;
    }
    return ArrayList;
})(mutable_list_1.default);
exports.ArrayList = ArrayList;
exports.default = ArrayList;

},{"./mutable_list":6,"./observable":7}],2:[function(require,module,exports){
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

},{"./array_list":1,"./list":5,"./mutable_list":6,"./observable_list":8,"./unit":10}],3:[function(require,module,exports){
var Id;
(function (Id) {
    var uniqueId = 0;
    function key(id) {
        return id.toString();
    }
    Id.key = key;
    function create() {
        return uniqueId++;
    }
    Id.create = create;
})(Id || (Id = {}));
exports.default = Id;

},{}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var id_1 = require('./id');
var observable_1 = require('./observable');
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
            if (id === void 0) { id = null; }
            var prev = _this._prev[id];
            return prev == null ? null : prev;
        };
        this.next = function (id) {
            if (id === void 0) { id = null; }
            var next = _this._next[id];
            return next == null ? null : next;
        };
        this.set = function (id, value) {
            if (!_this.has(id))
                return false;
            _this._byId[id] = value;
            _this._invalidate(_this._prev[id], _this._next[id]);
            return true;
        };
        this.splice = function (prev, next) {
            if (prev === void 0) { prev = null; }
            if (next === void 0) { next = null; }
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            var id, value;
            id = prev;
            while ((id = _this._next[id]) != null) {
                delete _this._next[_this._prev[id]];
                delete _this._prev[id];
                if (id == next)
                    break;
                delete _this._byId[id];
            }
            id = next;
            while ((id = _this._prev[id]) != null) {
                delete _this._prev[_this._next[id]];
                delete _this._next[id];
                if (id == prev)
                    break;
                delete _this._byId[id];
            }
            var _id = prev;
            for (var _a = 0; _a < values.length; _a++) {
                value = values[_a];
                id = id_1.default.create();
                _this._byId[id] = value;
                _this._prev[id] = _id;
                _this._next[_id] = id;
                _id = id;
            }
            _this._prev[next] = _id;
            _this._next[_id] = next;
            _this._invalidate(prev, next);
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            if (!_this.has(prev))
                prev = null;
            if (!_this.has(next))
                next = null;
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new observable_1.Subject();
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice.apply(this, [null, null].concat(array));
    }
    return LinkedList;
})(mutable_list_1.default);
exports.default = LinkedList;

},{"./id":3,"./mutable_list":6,"./observable":7}],5:[function(require,module,exports){
var tree_1 = require('./tree');
var List = (function () {
    function List(list) {
        var _this = this;
        this.has = function (id) {
            throw new Error("Not implemented");
        };
        this.get = function (id) {
            throw new Error("Not implemented");
        };
        this.prev = function (id) {
            throw new Error("Not implemented");
        };
        this.next = function (id) {
            throw new Error("Not implemented");
        };
        this.first = function () {
            return List.first(_this);
        };
        this.last = function () {
            return List.last(_this);
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
        this.findId = function (fn) {
            return List.findId(_this, fn);
        };
        this.find = function (fn) {
            return List.find(_this, fn);
        };
        this.idOf = function (value) {
            return List.idOf(_this, value);
        };
        this.indexOf = function (value) {
            return List.indexOf(_this, value);
        };
        this.idAt = function (index) {
            return List.idAt(_this, index);
        };
        this.at = function (index) {
            return List.at(_this, index);
        };
        this.every = function (predicate) {
            return List.every(_this, predicate);
        };
        this.some = function (predicate) {
            return List.some(_this, predicate);
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
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }
    ;
    List.isList = function (obj) {
        return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    List.create = function (list) {
        return new List({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next
        });
    };
    List.first = function (list) {
        return list.get(list.next());
    };
    List.last = function (list) {
        return list.get(list.prev());
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
    List.reverse = function (list) {
        var has = list.has, get = list.get;
        function prev(id) {
            return list.next(id);
        }
        function next(id) {
            return list.prev(id);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(id) {
            return has(id) ? mapFn(list.get(id), id) : undefined;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.filter = function (list, filterFn) {
        function has(id) {
            return list.has(id) && filterFn(list.get(id), id);
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
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatten = function (list) {
        function has(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Tree.has(list, path, 1);
        }
        function get(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Tree.get(list, path, 1);
        }
        function prev(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Path.id(tree_1.Tree.prev(list, path, 1));
        }
        function next(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Path.id(tree_1.Tree.next(list, path, 1));
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        var valueCache = Object.create(null), nextCache = Object.create(null), prevCache = Object.create(null);
        function has(id) {
            return id in valueCache || list.has(id);
        }
        function get(id) {
            if (id in valueCache)
                return valueCache[id];
            if (list.has(id))
                return valueCache[id] = list.get(id);
            return;
        }
        function prev(id) {
            if (id in prevCache)
                return prevCache[id];
            var prevId = list.prev(id);
            if (prevId != null) {
                prevCache[id] = prevId;
                nextCache[prevId] = id;
            }
            return prevId;
        }
        function next(id) {
            if (id in nextCache)
                return nextCache[id];
            var nextId = list.next(id);
            if (nextId != null) {
                nextCache[id] = nextId;
                prevCache[nextId] = id;
            }
            return nextId;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.index = function (list) {
        var ids = [];
        function has(id) {
            if (0 <= id && id < ids.length)
                return true;
            var last = ids.length - 1;
            while ((last = next(last)) != null)
                if (last == id)
                    return true;
            return false;
        }
        function get(id) {
            return has(id) ? list.get(ids[id]) : undefined;
        }
        function prev(id) {
            if (has(id))
                return id ? id - 1 : null;
            else if (id == null)
                return ids.length ? ids.length - 1 : null;
        }
        function next(id) {
            if (id == null && ids.length)
                return 0;
            if (0 <= id && id < ids.length - 1)
                return id + 1;
            var next, last = ids.length ? ids[ids.length - 1] : null;
            while ((last = list.next(last)) != null) {
                var next = ids.push(last) - 1;
                if (next == (id != null ? id + 1 : 0))
                    return next;
            }
            return null;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.zip = function (list, other, zipFn) {
        list = List.index(list);
        other = List.index(other);
        function has(id) {
            return list.has(id) && other.has(id);
        }
        function get(id) {
            return has(id) ? zipFn(list.get(id), other.get(id)) : undefined;
        }
        function prev(id) {
            var prev = list.prev(id);
            return prev != null && prev == other.prev(id) ? prev : null;
        }
        function next(id) {
            var next = list.next(id);
            return next != null && next == other.next(id) ? next : null;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.skip = function (list, k) {
        return List.filter(List.index(list), function (value, id) {
            return id >= k;
        });
    };
    List.take = function (list, n) {
        return List.filter(List.index(list), function (value, id) {
            return id < n;
        });
    };
    List.range = function (list, k, n) {
        return List.filter(List.index(list), function (value, id) {
            return id >= k && id < n + k;
        });
    };
    List.scan = function (list, scanFn, memo) {
        list = List.index(list);
        var memoCache = [memo];
        function get(id) {
            if (!list.has(id))
                return;
            var memo = memoCache[id];
            while (id + 1 >= memoCache.length) {
                memoCache.push(memo = scanFn(memo, list.get(id)));
            }
            return memoCache[id + 1];
        }
        return { has: list.has, get: get, prev: list.prev, next: list.next };
    };
    return List;
})();
exports.List = List;
exports.default = List;

},{"./tree":9}],6:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_list_1 = require('./observable_list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList(list) {
        var _this = this;
        _super.call(this, list);
        this.set = function (id, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            throw new Error("Not implemented");
        };
        this.push = function (value) {
            return MutableList.push(_this, value);
        };
        this.unshift = function (value) {
            return MutableList.unshift(_this, value);
        };
        this.pop = function () {
            return MutableList.pop(_this);
        };
        this.shift = function () {
            return MutableList.shift(_this);
        };
        this.delete = function (id) {
            return MutableList.delete(_this, id);
        };
        this.remove = function (value) {
            return MutableList.remove(_this, value);
        };
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
            this.observe = list.observe;
            this.set = list.set;
            this.splice = list.splice;
        }
    }
    MutableList.isMutableList = function (obj) {
        return observable_list_1.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    };
    MutableList.create = function (list) {
        return new MutableList({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list),
            observe: list.observe.bind(list),
            set: list.set.bind(list),
            splice: list.splice.bind(list)
        });
    };
    MutableList.push = function (list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    };
    MutableList.unshift = function (list, value) {
        list.splice(null, list.next(), value);
        return list.next();
    };
    MutableList.pop = function (list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    };
    MutableList.shift = function (list) {
        var value = list.get(list.next());
        list.splice(null, list.next(list.next()));
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
exports.default = MutableList;

},{"./observable_list":8}],7:[function(require,module,exports){
var id_1 = require('./id');
var Subject = (function () {
    function Subject() {
        var _this = this;
        this.observe = function (observer) {
            var observerId = id_1.default.create();
            _this._observers[observerId] = observer;
            return {
                unsubscribe: function () { delete _this._observers[observerId]; }
            };
        };
        this.notify = function (notifier) {
            for (var observerId in _this._observers)
                notifier(_this._observers[observerId]);
        };
        this._observers = Object.create(null);
    }
    return Subject;
})();
exports.Subject = Subject;

},{"./id":3}],8:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var tree_1 = require('./tree');
var observable_1 = require('./observable');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(list) {
        var _this = this;
        _super.call(this, list);
        this.observe = function (observer) {
            throw new Error("Not implemented");
        };
        this.reverse = function () {
            return ObservableList.create(ObservableList.reverse(_this));
        };
        this.map = function (mapFn) {
            return ObservableList.create(ObservableList.map(_this, mapFn));
        };
        this.filter = function (filterFn) {
            return ObservableList.create(ObservableList.filter(_this, filterFn));
        };
        this.flatten = function () {
            return ObservableList.create(ObservableList.flatten(_this));
        };
        this.flatMap = function (flatMapFn) {
            return ObservableList.create(ObservableList.flatMap(_this, flatMapFn));
        };
        this.cache = function () {
            return ObservableList.create(ObservableList.cache(_this));
        };
        if (list != null) {
            this.observe = list.observe;
        }
    }
    ObservableList.isObservableList = function (obj) {
        return list_1.List.isList(obj) && !!obj['observe'];
    };
    ObservableList.create = function (list) {
        return new ObservableList({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list),
            observe: list.observe.bind(list)
        });
    };
    ObservableList.reverse = function (list) {
        var _a = list_1.List.reverse(list), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe(observer);
        }
        return { has: has, get: get, prev: prev, next: next, observe: observe };
    };
    ObservableList.map = function (list, mapFn) {
        var _a = list_1.List.map(list, mapFn), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
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
        return { has: has, get: get, prev: prev, next: next, observe: observe };
    };
    ObservableList.flatten = function (list) {
        var cache;
        var subscriptions = Object.create(null);
        var subject = new observable_1.Subject();
        list.observe({
            onInvalidate: function (prev, next) {
                var id;
                id = prev;
                while ((id = cache.next(id)) != null && id != next) {
                    var subscription = subscriptions[id];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id];
                    }
                }
                id = next;
                while ((id = cache.prev(id)) != null && id != prev) {
                    var subscription = subscriptions[id];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id];
                    }
                }
            }
        });
        cache = ObservableList.cache(ObservableList.map(list, function (value, id) {
            subscriptions[id] = value.observe({
                onInvalidate: function (prev, next) {
                    var prevId, nextId, prevPath = tree_1.Path.append(id, prev), nextPath = tree_1.Path.append(id, next);
                    if (prev == null)
                        prevPath = tree_1.Tree.prev(list, tree_1.Tree.next(list, prevPath));
                    if (next == null)
                        nextPath = tree_1.Tree.next(list, tree_1.Tree.prev(list, nextPath));
                    prevId = tree_1.Path.id(prevPath);
                    nextId = tree_1.Path.id(nextPath);
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevId, nextId);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var prevId = tree_1.Path.id(tree_1.Tree.prev(list, [prev])), nextId = tree_1.Path.id(tree_1.Tree.next(list, [next]));
                subject.notify(function (observer) {
                    observer.onInvalidate(prevId, nextId);
                });
            }
        });
        var _a = list_1.List.flatten(cache), has = _a.has, get = _a.get, next = _a.next, prev = _a.prev;
        return { has: has, get: get, next: next, prev: prev, observe: subject.observe };
    };
    ObservableList.flatMap = function (list, flatMapFn) {
        return ObservableList.flatten(ObservableList.map(list, flatMapFn));
    };
    ObservableList.cache = function (list) {
        var valueCache = Object.create(null), nextCache = Object.create(null), prevCache = Object.create(null);
        function has(id) {
            return id in valueCache || list.has(id);
        }
        function get(id) {
            if (id in valueCache)
                return valueCache[id];
            if (list.has(id))
                return valueCache[id] = list.get(id);
            return;
        }
        function prev(id) {
            if (id in prevCache)
                return prevCache[id];
            var prevId = list.prev(id);
            if (prevId != null) {
                prevCache[id] = prevId;
                nextCache[prevId] = id;
            }
            return prevId;
        }
        function next(id) {
            if (id in nextCache)
                return nextCache[id];
            var nextId = list.next(id);
            if (nextId != null) {
                nextCache[id] = nextId;
                prevCache[nextId] = id;
            }
            return nextId;
        }
        list.observe({
            onInvalidate: function (prev, next) {
                var id;
                id = prev;
                while ((id = nextCache[id]) != null) {
                    delete nextCache[prevCache[id]];
                    delete prevCache[id];
                    if (id == next)
                        break;
                    delete valueCache[id];
                }
                while ((id = prevCache[id]) != null) {
                    delete prevCache[nextCache[id]];
                    delete nextCache[id];
                    if (id == prev)
                        break;
                    delete valueCache[id];
                }
            }
        });
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;

},{"./list":5,"./observable":7,"./tree":9}],9:[function(require,module,exports){
var list_1 = require('./list');
;
var Path;
(function (Path) {
    function id(path) {
        return JSON.stringify(path);
    }
    Path.id = id;
    function create(id) {
        return id == null ? null : JSON.parse(id.toString());
    }
    Path.create = create;
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
})(Path = exports.Path || (exports.Path = {}));
var Tree;
(function (Tree) {
    function has(list, path, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path);
        return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth));
    }
    Tree.has = has;
    function get(list, path, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path);
        if (!list.has(head))
            return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0)
            return value;
        return Tree.get(value, tail, depth);
    }
    Tree.get = get;
    function prev(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), id = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(id);
            if (!list_1.List.isList(value) || depth == 0) {
                if (id != null && id != head)
                    return [id];
            }
            else {
                var prevPath = Tree.prev(value, tail, depth - 1);
                if (prevPath != null)
                    return Path.append(id, prevPath);
                tail = [];
            }
        } while ((id = list.prev(id)) != null);
    }
    Tree.prev = prev;
    function next(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), id = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(id);
            if (!list_1.List.isList(value) || depth == 0) {
                if (id != null && id != head)
                    return [id];
            }
            else {
                var nextPath = Tree.next(value, tail, depth - 1);
                if (nextPath != null)
                    return Path.append(id, nextPath);
                tail = [];
            }
        } while ((id = list.next(id)) != null);
    }
    Tree.next = next;
})(Tree = exports.Tree || (exports.Tree = {}));

},{"./list":5}],10:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var id_1 = require('./id');
var observable_1 = require('./observable');
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
            _this._invalidate();
            return true;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                return _this.set(id_1.default.create(), values[0]);
            delete _this._id;
            delete _this._value;
            _this._invalidate();
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new observable_1.Subject();
        if (arguments.length)
            this.splice(null, null, value);
    }
    return Unit;
})(mutable_list_1.default);
exports.Unit = Unit;
exports.default = Unit;

},{"./id":3,"./mutable_list":6,"./observable":7}],11:[function(require,module,exports){
var factory_1 = require('./factory');
var list_1 = require('./list');
var observable_list_1 = require('./observable_list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
var linked_list_1 = require('./linked_list');
var tree_1 = require('./tree');
function Sonic(obj) {
    return factory_1.default(obj);
}
Sonic['List'] = list_1.default;
Sonic['ObservableList'] = observable_list_1.default;
Sonic['MutableList'] = mutable_list_1.default;
Sonic['Unit'] = unit_1.default;
Sonic['ArrayList'] = array_list_1.default;
Sonic['LinkedList'] = linked_list_1.default;
Sonic['Tree'] = tree_1.Tree;
module.exports = Sonic;

},{"./array_list":1,"./factory":2,"./linked_list":4,"./list":5,"./mutable_list":6,"./observable_list":8,"./tree":9,"./unit":10}]},{},[11])(11)
});