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
        this.has = function (key) {
            return key != null && -1 < key && key < _this._array.length;
        };
        this.get = function (key) {
            if (_this.has(key))
                return _this._array[key];
            return;
        };
        this.prev = function (key) {
            if (key == null && _this._array.length)
                return _this._array.length - 1;
            if (_this._array.length > 0 && key != null && _this.has(key) && _this.has(key - 1))
                return key - 1;
            return null;
        };
        this.next = function (key) {
            if (key == null && _this._array.length)
                return 0;
            if (_this._array.length > 0 && key != null && _this.has(key) && _this.has(key + 1))
                return key + 1;
            return null;
        };
        this.set = function (key, value) {
            if (!_this.has(key))
                return null;
            _this._array[key] = value;
            return key;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (prev == null)
                prev = -1;
            else if (!_this.has(prev))
                return;
            if (next == null)
                next = _this._array.length;
            else if (!_this.has(next))
                return;
            (_a = _this._array).splice.apply(_a, [prev + 1, next - (prev + 1)].concat(values));
            _this._invalidate(prev, null);
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
})(mutable_list_1.MutableList);
exports.default = ArrayList;

},{"./mutable_list":8,"./observable":9}],2:[function(require,module,exports){
var Cache = (function () {
    function Cache(list) {
        var _this = this;
        this.has = function (key) {
            return key in _this._byKey || _this._list.has(key);
        };
        this.get = function (key) {
            if (key in _this._byKey)
                return _this._byKey[key];
            if (_this._list.has(key))
                return _this._byKey[key] = _this._list.get(key);
            return;
        };
        this.prev = function (key) {
            if (key in _this._prev)
                return _this._prev[key];
            var prevKey = _this._list.prev(key);
            if (prevKey == null)
                prevKey = null;
            _this._prev[key] = prevKey;
            _this._next[prevKey] = key;
            return prevKey;
        };
        this.next = function (key) {
            if (key === void 0) { key = null; }
            if (key in _this._next)
                return _this._next[key];
            var nextKey = _this._list.next(key);
            if (nextKey == null)
                nextKey = null;
            _this._next[key] = nextKey;
            _this._prev[nextKey] = key;
            return nextKey;
        };
        this._byKey = Object.create(null),
            this._next = Object.create(null),
            this._prev = Object.create(null);
        this._list = list;
    }
    return Cache;
})();
exports.Cache = Cache;
exports.default = Cache;

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

},{"./array_list":1,"./list":7,"./mutable_list":8,"./observable_list":12,"./unit":14}],4:[function(require,module,exports){
var Index = (function () {
    function Index(list) {
        var _this = this;
        this.has = function (index) {
            if (index >= 0 && index < _this._byIndex.length)
                return true;
            var next, last = _this._byIndex.length - 1;
            while (last != index) {
                next = _this._list.next(_this._byIndex[last]);
                if (next == null)
                    return false;
                _this._byIndex[++last] = next;
            }
            return true;
        };
        this.get = function (index) {
            return _this.has(index) ? _this._list.get(_this._byIndex[index]) : undefined;
        };
        this.prev = function (index) {
            if (_this.has(index - 1))
                return index - 1;
            if (index == null && _this._byIndex.length)
                return _this._byIndex.length - 1;
            return null;
        };
        this.next = function (index) {
            if (index === void 0) { index = -1; }
            if (_this.has(index + 1))
                return index + 1;
            return null;
        };
        this._byIndex = [];
        this._list = list;
    }
    return Index;
})();
exports.Index = Index;
exports.default = Index;

},{}],5:[function(require,module,exports){
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
exports.default = Key;

},{}],6:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var key_1 = require('./key');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var LinkedList = (function (_super) {
    __extends(LinkedList, _super);
    function LinkedList(values, keyFn) {
        var _this = this;
        _super.call(this);
        this._keyFn = key_1.default.create;
        this.has = function (key) {
            return key in _this._byKey;
        };
        this.get = function (key) {
            return _this._byKey[key];
        };
        this.prev = function (key) {
            if (key === void 0) { key = null; }
            var prev = _this._prev[key];
            return prev == null ? null : prev;
        };
        this.next = function (key) {
            if (key === void 0) { key = null; }
            var next = _this._next[key];
            return next == null ? null : next;
        };
        this.set = function (key, value) {
            if (!_this.has(key))
                return null;
            _this._byKey[key] = value;
            _this._invalidate(_this._prev[key], _this._next[key]);
            return key;
        };
        this.splice = function (prev, next) {
            if (prev === void 0) { prev = null; }
            if (next === void 0) { next = null; }
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            var key, value;
            key = prev;
            while ((key = _this._next[key]) != null) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next)
                    break;
                delete _this._byKey[key];
            }
            key = next;
            while ((key = _this._prev[key]) != null) {
                delete _this._prev[_this._next[key]];
                delete _this._next[key];
                if (key == prev)
                    break;
                delete _this._byKey[key];
            }
            var _key = prev;
            for (var _a = 0; _a < values.length; _a++) {
                value = values[_a];
                key = _this._keyFn(value);
                _this._byKey[key] = value;
                _this._prev[key] = _key;
                _this._next[_key] = key;
                _key = key;
            }
            _this._prev[next] = _key;
            _this._next[_key] = next;
            _this._invalidate(prev, next);
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
        if (keyFn)
            this._keyFn = keyFn;
        this._subject = new observable_1.Subject();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice.apply(this, [null, null].concat(values));
    }
    return LinkedList;
})(mutable_list_1.MutableList);
exports.default = LinkedList;

},{"./key":5,"./mutable_list":8,"./observable":9}],7:[function(require,module,exports){
var tree_1 = require('./tree');
var cache_1 = require('./cache');
var index_1 = require('./index');
var List = (function () {
    function List(list) {
        var _this = this;
        this.has = function (key) {
            throw new Error("Not implemented");
        };
        this.get = function (key) {
            throw new Error("Not implemented");
        };
        this.prev = function (key) {
            throw new Error("Not implemented");
        };
        this.next = function (key) {
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
        var key;
        while ((key = list.next(key)) != null)
            fn(list.get(key), key);
    };
    List.reduce = function (list, fn, memo) {
        var key;
        while ((key = list.next(key)) != null)
            memo = fn(memo, list.get(key), key);
        return memo;
    };
    List.toArray = function (list) {
        var key, index = 0, array = [];
        while ((key = list.next(key)) != null)
            array[index++] = list.get(key);
        return array;
    };
    List.findKey = function (list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            if (fn(list.get(key), key))
                return key;
    };
    List.find = function (list, fn) {
        return list.get(List.findKey(list, fn));
    };
    List.keyOf = function (list, value) {
        return List.findKey(list, function (v) { return v === value; });
    };
    List.indexOf = function (list, value) {
        var key, i = 0;
        while ((key = list.next(key)) != null) {
            if (list.get(key) === value)
                return i;
            i++;
        }
    };
    List.keyAt = function (list, index) {
        var key, i = 0;
        while ((key = list.next(key)) != null)
            if (i++ == index)
                return key;
        return null;
    };
    List.at = function (list, index) {
        return list.get(List.keyAt(list, index));
    };
    List.every = function (list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (!predicate(list.get(key), key))
                return false;
        return true;
    };
    List.some = function (list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (predicate(list.get(key), key))
                return true;
        return false;
    };
    List.contains = function (list, value) {
        return List.some(list, function (v) { return v === value; });
    };
    List.reverse = function (list) {
        var has = list.has, get = list.get;
        function prev(key) {
            return list.next(key);
        }
        function next(key) {
            return list.prev(key);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(key) {
            return has(key) ? mapFn(list.get(key), key) : undefined;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.filter = function (list, filterFn) {
        function has(key) {
            return list.has(key) && filterFn(list.get(key), key);
        }
        function get(key) {
            if (has(key))
                return list.get(key);
            return;
        }
        function prev(key) {
            var prev = key;
            while ((prev = list.prev(prev)) != null)
                if (has(prev))
                    return prev;
            return null;
        }
        function next(key) {
            var next = key;
            while ((next = list.next(next)) != null)
                if (has(next))
                    return next;
            return null;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatten = function (list) {
        function has(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Tree.has(list, path, 1);
        }
        function get(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Tree.get(list, path, 1);
        }
        function prev(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Path.key(tree_1.Tree.prev(list, path, 1));
        }
        function next(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Path.key(tree_1.Tree.next(list, path, 1));
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        return new cache_1.default(list);
    };
    List.index = function (list) {
        return new index_1.default(list);
    };
    // static keyBy<V>(list: IList<V>, keyFn: (value: V, key?: Key) => Key) {
    //   var sourceKeyByKey: {[key: string]: Key} = Object.create(null),
    //       keyBySourceKey: {[key: string]: Key} = Object.create(null);
    //
    //   function has(key: Key): boolean {
    //     if(key in sourceKeyByKey) return true;
    //
    //     var last: Key = null;
    //     while((last = next(last)) != null) if(last == key) return true;
    //     return false;
    //   }
    //
    //   function get(key: Key): V {
    //     return has(key) ? list.get(sourceKeyByKey[key]) : undefined;
    //   }
    //
    //   function prev(key: Key): Key {
    //     if(has(key) || key == null) return keyBySourceKey[list.prev(sourceKeyByKey[key])];
    //   }
    //
    //   function next(key: Key = null): Key {
    //     var sourceKey: Key, sourceNext: Key, res: Key;
    //
    //     if(key in sourceKeyByKey) sourceKey = sourceKeyByKey[key];
    //     else sourceKey = null;
    //
    //     while(key != null && !(key in sourceKeyByKey)) {
    //       sourceKey = list.next(sourceKey);
    //
    //       if (!(sourceKey in keyBySourceKey)) {
    //         if (sourceKey == null) return null;
    //         res = keyFn(list.get(sourceKey), sourceKey);
    //         keyBySourceKey[sourceKey] = res;
    //         sourceKeyByKey[res] = sourceKey;
    //
    //         if (res == key) break;
    //       }
    //     }
    //
    //     sourceKey = list.next(sourceKey);
    //     if (sourceKey == null) return null;
    //     res = keyFn(list.get(sourceKey), sourceKey);
    //     keyBySourceKey[sourceKey] = res;
    //     sourceKeyByKey[res] = sourceKey;
    //
    //     return res;
    //   }
    //
    //   return { has, get, prev, next };
    // }
    //
    List.zip = function (list, other, zipFn) {
        list = List.index(list);
        other = List.index(other);
        function has(key) {
            return list.has(key) && other.has(key);
        }
        function get(key) {
            return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
        }
        function prev(key) {
            var prev = list.prev(key);
            return prev != null && prev == other.prev(key) ? prev : null;
        }
        function next(key) {
            var next = list.next(key);
            return next != null && next == other.next(key) ? next : null;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.skip = function (list, k) {
        return List.filter(List.index(list), function (value, key) {
            return key >= k;
        });
    };
    List.take = function (list, n) {
        return List.filter(List.index(list), function (value, key) {
            return key < n;
        });
    };
    List.range = function (list, k, n) {
        return List.filter(List.index(list), function (value, key) {
            return key >= k && key < n + k;
        });
    };
    List.scan = function (list, scanFn, memo) {
        var has = list.has, prev = list.prev, next = list.next, scanList;
        function get(key) {
            var prev = list.prev(key);
            return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
        }
        scanList = List.cache({ has: has, get: get, prev: prev, next: next });
        return scanList;
    };
    return List;
})();
exports.List = List;
exports.default = List;

},{"./cache":2,"./index":4,"./tree":13}],8:[function(require,module,exports){
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
        this.set = function (key, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
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
        this.delete = function (key) {
            return MutableList.delete(_this, key);
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
    MutableList.isMutableList = function (obj) {
        return observable_list_1.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    };
    MutableList.create = function (list) {
        return new MutableList({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe,
            set: list.set,
            splice: list.splice
        });
    };
    MutableList.addBefore = function (list, key, value) {
        list.splice(list.prev(key), key, value);
        return list.prev(key);
    };
    MutableList.addAfter = function (list, key, value) {
        list.splice(key, list.next(key), value);
        return list.next(key);
    };
    MutableList.push = function (list, value) {
        return MutableList.addBefore(list, null, value);
    };
    MutableList.unshift = function (list, value) {
        return MutableList.addAfter(list, null, value);
    };
    MutableList.delete = function (list, key) {
        if (!list.has(key))
            return;
        var value = list.get(key);
        list.splice(list.prev(key), list.next(key));
        return value;
    };
    MutableList.deleteBefore = function (list, key) {
        return MutableList.delete(list, list.prev(key));
    };
    MutableList.deleteAfter = function (list, key) {
        return MutableList.delete(list, list.next(key));
    };
    MutableList.pop = function (list) {
        return MutableList.deleteBefore(list, null);
    };
    MutableList.shift = function (list) {
        return MutableList.deleteAfter(list, null);
    };
    MutableList.remove = function (list, value) {
        var key = MutableList.keyOf(list, value);
        if (key == null)
            return false;
        delete (list, key);
        return true;
    };
    return MutableList;
})(observable_list_1.ObservableList);
exports.MutableList = MutableList;
exports.default = MutableList;

},{"./observable_list":12}],9:[function(require,module,exports){
var key_1 = require('./key');
var Subject = (function () {
    function Subject() {
        var _this = this;
        this.observe = function (observer) {
            var observerKey = key_1.default.create();
            _this._observers[observerKey] = observer;
            return {
                unsubscribe: function () { delete _this._observers[observerKey]; }
            };
        };
        this.notify = function (notifier) {
            for (var observerKey in _this._observers)
                notifier(_this._observers[observerKey]);
        };
        this._observers = Object.create(null);
    }
    return Subject;
})();
exports.Subject = Subject;

},{"./key":5}],10:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cache_1 = require('./cache');
var ObservableCache = (function (_super) {
    __extends(ObservableCache, _super);
    function ObservableCache(list) {
        var _this = this;
        _super.call(this, list);
        this.observe = function (observer) {
            return _this._list.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            var key;
            key = prev;
            while ((key = _this._next[key]) !== undefined) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next)
                    break;
                delete _this._byKey[key];
            }
            while ((key = _this._prev[key]) !== undefined) {
                delete _this._prev[_this._next[key]];
                delete _this._next[key];
                if (key == prev)
                    break;
                delete _this._byKey[key];
            }
        };
        list.observe(this);
    }
    return ObservableCache;
})(cache_1.default);
exports.ObservableCache = ObservableCache;
exports.default = ObservableCache;

},{"./cache":2}],11:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var index_1 = require('./index');
var observable_1 = require('./observable');
var ObservableIndex = (function (_super) {
    __extends(ObservableIndex, _super);
    function ObservableIndex(list) {
        var _this = this;
        _super.call(this, list);
        this.has = function (index) {
            if (index >= 0 && index < _this._byIndex.length)
                return true;
            var next, last = _this._byIndex.length - 1;
            while (last != index) {
                next = _this._list.next(_this._byIndex[last]);
                if (next == null)
                    return false;
                _this._byIndex[++last] = next;
                _this._byKey[next] = last;
            }
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            var prevIndex = _this._byKey[prev], length = _this._byIndex.length, index = prevIndex;
            while (++index < length)
                delete _this._byKey[_this._byIndex[index]];
            _this._byIndex.splice(prevIndex + 1);
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prevIndex, null);
            });
        };
        this._byKey = Object.create(null);
        this._subject = new observable_1.Subject();
        list.observe(this);
    }
    return ObservableIndex;
})(index_1.default);
exports.ObservableIndex = ObservableIndex;
exports.default = ObservableIndex;

},{"./index":4,"./observable":9}],12:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var tree_1 = require('./tree');
var observable_1 = require('./observable');
var observable_cache_1 = require('./observable_cache');
var observable_index_1 = require('./observable_index');
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
        this.index = function () {
            return ObservableList.create(ObservableList.index(_this));
        };
        this.zip = function (other, zipFn) {
            return ObservableList.create(ObservableList.zip(_this, other, zipFn));
        };
        this.skip = function (k) {
            return ObservableList.create(ObservableList.skip(_this, k));
        };
        this.take = function (n) {
            return ObservableList.create(ObservableList.take(_this, n));
        };
        this.range = function (k, n) {
            return ObservableList.create(ObservableList.range(_this, k, n));
        };
        this.scan = function (scanFn, memo) {
            return ObservableList.create(ObservableList.scan(_this, scanFn, memo));
        };
        if (list != null)
            this.observe = list.observe;
    }
    ObservableList.isObservableList = function (obj) {
        return list_1.List.isList(obj) && !!obj['observe'];
    };
    ObservableList.create = function (list) {
        return new ObservableList({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe
        });
    };
    ObservableList.reverse = function (list) {
        var _a = list_1.List.reverse(list), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe({
                onInvalidate: function (prev, next) {
                    observer.onInvalidate(next, prev);
                }
            });
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
                var key;
                key = prev;
                while ((key = cache.next(key)) != null && key != next) {
                    var subscription = subscriptions[key];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[key];
                    }
                }
                key = next;
                while ((key = cache.prev(key)) != null && key != prev) {
                    var subscription = subscriptions[key];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[key];
                    }
                }
            }
        });
        cache = ObservableList.cache(ObservableList.map(list, function (value, key) {
            subscriptions[key] = value.observe({
                onInvalidate: function (prev, next) {
                    var prevKey, nextKey, prevPath = tree_1.Path.append(key, prev), nextPath = tree_1.Path.append(key, next);
                    if (prev == null)
                        prevPath = tree_1.Tree.prev(list, tree_1.Tree.next(list, prevPath));
                    if (next == null)
                        nextPath = tree_1.Tree.next(list, tree_1.Tree.prev(list, nextPath));
                    prevKey = tree_1.Path.key(prevPath);
                    nextKey = tree_1.Path.key(nextPath);
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevKey, nextKey);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var prevKey = tree_1.Path.key(tree_1.Tree.prev(list, [prev])), nextKey = tree_1.Path.key(tree_1.Tree.next(list, [next]));
                subject.notify(function (observer) {
                    observer.onInvalidate(prevKey, nextKey);
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
        return new observable_cache_1.default(list);
    };
    ObservableList.index = function (list) {
        return new observable_index_1.default(list);
    };
    ObservableList.zip = function (list, other, zipFn) {
        list = ObservableList.index(list);
        other = ObservableList.index(other);
        function has(key) {
            return list.has(key) && other.has(key);
        }
        function get(key) {
            return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
        }
        function prev(key) {
            var prev = list.prev(key);
            return prev != null && prev == other.prev(key) ? prev : null;
        }
        function next(key) {
            var next = list.next(key);
            return next != null && next == other.next(key) ? next : null;
        }
        var subject = new observable_1.Subject(), observer = {
            onInvalidate: function (prev, next) {
                subject.notify(function (_observer) {
                    _observer.onInvalidate(prev, next);
                });
            }
        };
        list.observe(observer);
        other.observe(observer);
        return { has: has, get: get, prev: prev, next: next, observe: subject.observe };
    };
    ObservableList.skip = function (list, k) {
        return ObservableList.filter(ObservableList.index(list), function (value, key) {
            return key >= k;
        });
    };
    ObservableList.take = function (list, n) {
        return ObservableList.filter(ObservableList.index(list), function (value, key) {
            return key < n;
        });
    };
    ObservableList.range = function (list, k, n) {
        return ObservableList.filter(ObservableList.index(list), function (value, key) {
            return key >= k && key < n + k;
        });
    };
    ObservableList.scan = function (list, scanFn, memo) {
        var has = list.has, prev = list.prev, next = list.next, scanList;
        function get(key) {
            var prev = scanList.prev(key);
            return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
        }
        function observe(observer) {
            return list.observe({
                onInvalidate: function (prev, next) {
                    observer.onInvalidate(prev, null);
                }
            });
        }
        scanList = ObservableList.cache({ has: has, get: get, prev: prev, next: next, observe: observe });
        return scanList;
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;

},{"./list":7,"./observable":9,"./observable_cache":10,"./observable_index":11,"./tree":13}],13:[function(require,module,exports){
var list_1 = require('./list');
;
var Path;
(function (Path) {
    function key(path) {
        return JSON.stringify(path);
    }
    Path.key = key;
    function create(key) {
        return key == null ? null : JSON.parse(key.toString());
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
        var head = Path.head(path), tail = Path.tail(path), key = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(key);
            if (!list_1.List.isList(value) || depth == 0) {
                if (key != null && key != head)
                    return [key];
            }
            else {
                var prevPath = Tree.prev(value, tail, depth - 1);
                if (prevPath != null)
                    return Path.append(key, prevPath);
                tail = [];
            }
        } while ((key = list.prev(key)) != null);
    }
    Tree.prev = prev;
    function next(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), key = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(key);
            if (!list_1.List.isList(value) || depth == 0) {
                if (key != null && key != head)
                    return [key];
            }
            else {
                var nextPath = Tree.next(value, tail, depth - 1);
                if (nextPath != null)
                    return Path.append(key, nextPath);
                tail = [];
            }
        } while ((key = list.next(key)) != null);
    }
    Tree.next = next;
})(Tree = exports.Tree || (exports.Tree = {}));
exports.default = Tree;

},{"./list":7}],14:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var key_1 = require('./key');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(value) {
        var _this = this;
        _super.call(this);
        this.has = function (key) {
            return _this._key == key;
        };
        this.get = function (key) {
            if (_this.has(key))
                return _this._value;
        };
        this.prev = function (key) {
            if (key == null)
                return _this._key;
            return null;
        };
        this.next = function (key) {
            if (key == null)
                return _this._key;
            return null;
        };
        this.set = function (key, value) {
            _this._key = key;
            _this._value = value;
            _this._invalidate();
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                return _this.set(key_1.default.create(), values[0]);
            delete _this._key;
            delete _this._value;
            _this._invalidate();
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
})(mutable_list_1.MutableList);
exports.default = Unit;

},{"./key":5,"./mutable_list":8,"./observable":9}],15:[function(require,module,exports){
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
var Sonic;
(function (Sonic) {
    Sonic.List = list_1.default;
    Sonic.ObservableList = observable_list_1.default;
    Sonic.MutableList = mutable_list_1.default;
    Sonic.Unit = unit_1.default;
    Sonic.ArrayList = array_list_1.default;
    Sonic.LinkedList = linked_list_1.default;
    Sonic.Tree = tree_1.default;
})(Sonic || (Sonic = {}));
module.exports = Sonic;

},{"./array_list":1,"./factory":3,"./linked_list":6,"./list":7,"./mutable_list":8,"./observable_list":12,"./tree":13,"./unit":14}]},{},[15])(15)
});