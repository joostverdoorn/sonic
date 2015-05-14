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
        this._array = array;
        new observable_1.default(function (notifier) {
            _this._invalidate = function (prev, next) {
                notifier(function (observer) {
                    observer.onInvalidate(prev, next);
                });
            };
        });
    }
    ArrayList.prototype.has = function (id) {
        return -1 < id && id < this._array.length;
    };
    ArrayList.prototype.get = function (id) {
        if (this.has(id))
            return this._array[id];
        return;
    };
    ArrayList.prototype.prev = function (id) {
        if (id == null && this._array.length)
            return this._array.length - 1;
        if (this._array.length > 0 && id != null && this.has(id) && this.has(id - 1))
            return id - 1;
        return null;
    };
    ArrayList.prototype.next = function (id) {
        if (id == null && this._array.length)
            return 0;
        if (this._array.length > 0 && id != null && this.has(id) && this.has(id + 1))
            return id + 1;
        return null;
    };
    ArrayList.prototype.set = function (id, value) {
        if (!this.has(id))
            return false;
        this._array[id] = value;
    };
    ArrayList.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        if (prev == null)
            prev = -1;
        else if (!this.has(prev))
            return false;
        if (next == null)
            next = this._array.length;
        else if (!this.has(next))
            return false;
        (_a = this._array).splice.apply(_a, [prev + 1, next - prev - 1].concat(values));
        this._invalidate(prev, null);
        return true;
        var _a;
    };
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
    function key(id) {
        return id.toString();
    }
    Id.key = key;
    function get(id, index) {
        if (id instanceof Array)
            return id[index];
        if (index == 0)
            return id;
        return;
    }
    Id.get = get;
    function head(id) {
        return get(id, 0);
    }
    Id.head = head;
    function tail(id) {
        return id instanceof Array ? id.slice(1, id.length) : [];
    }
    Id.tail = tail;
    function append(a, b) {
        return [].concat(a).concat(b);
    }
    Id.append = append;
})(Id = exports.Id || (exports.Id = {}));
exports.default = Id;

},{}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var LinkedList = (function (_super) {
    __extends(LinkedList, _super);
    function LinkedList(array) {
        var _this = this;
        _super.call(this);
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[-1] = -1;
        this._next[-1] = -1;
        this.splice.apply(this, [null, null].concat(array));
        new observable_1.default(function (notifier) {
            _this._invalidate = function (prev, next) {
                notifier(function (observer) {
                    observer.onInvalidate(prev, next);
                });
            };
        });
    }
    LinkedList.prototype.has = function (id) {
        return id in this._byId;
    };
    LinkedList.prototype.get = function (id) {
        return this._byId[id];
    };
    LinkedList.prototype.prev = function (id) {
        if (id === void 0) { id = -1; }
        return this._prev[id];
    };
    LinkedList.prototype.next = function (id) {
        if (id === void 0) { id = -1; }
        return this._next[id];
    };
    LinkedList.prototype.set = function (id, value) {
        if (!this.has(id))
            return false;
        this._byId[id] = value;
        this._invalidate(this._prev[id], this._next[id]);
        return true;
    };
    LinkedList.prototype.splice = function (prev, next) {
        if (prev === void 0) { prev = -1; }
        if (next === void 0) { next = -1; }
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        var _next, _prev, value, id;
        while (_next = this._next[_next || prev]) {
            delete this._next[this._prev[_next]];
            delete this._next[_prev];
            if (_next == next)
                break;
            delete this._byId[_next];
        }
        while (_prev = this._prev[_prev || next]) {
            delete this._prev[this._next[_prev]];
            delete this._prev[_prev];
            if (_prev == prev)
                break;
            delete this._byId[_next];
        }
        for (var _a = 0; _a < values.length; _a++) {
            value = values[_a];
            id = unique_id_1.default();
            this._byId[id] = value;
            this._prev[id] = prev;
            this._next[prev] = id;
            prev = id;
        }
        this._prev[next] = prev;
        this._next[prev] = next;
        this._invalidate(prev, next);
        return true;
    };
    return LinkedList;
})(mutable_list_1.default);
exports.default = LinkedList;

},{"./mutable_list":6,"./observable":7,"./unique_id":9}],5:[function(require,module,exports){
var id_1 = require('./id');
var List = (function () {
    function List(list) {
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.prev;
        }
    }
    ;
    List.prototype.has = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.get = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.prev = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.next = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.first = function () {
        return List.first(this);
    };
    List.prototype.last = function () {
        return List.last(this);
    };
    List.prototype.forEach = function (fn) {
        return List.forEach(this, fn);
    };
    List.prototype.reduce = function (fn, memo) {
        return List.reduce(this, fn);
    };
    List.prototype.toArray = function () {
        return List.toArray(this);
    };
    List.prototype.findId = function (fn) {
        return List.findId(this, fn);
    };
    List.prototype.find = function (fn) {
        return List.find(this, fn);
    };
    List.prototype.idOf = function (value) {
        return List.idOf(this, value);
    };
    List.prototype.indexOf = function (value) {
        return List.indexOf(this, value);
    };
    List.prototype.idAt = function (index) {
        return List.idAt(this, index);
    };
    List.prototype.at = function (index) {
        return List.at(this, index);
    };
    List.prototype.every = function (predicate) {
        return List.every(this, predicate);
    };
    List.prototype.some = function (predicate) {
        return List.some(this, predicate);
    };
    List.prototype.contains = function (value) {
        return List.contains(this, value);
    };
    List.prototype.reverse = function () {
        return List.create(List.reverse(this));
    };
    List.prototype.map = function (mapFn) {
        return List.create(List.map(this, mapFn));
    };
    List.prototype.filter = function (filterFn) {
        return List.create(List.filter(this, filterFn));
    };
    List.prototype.flatten = function () {
        return List.create(List.flatten(this));
    };
    List.prototype.flatMap = function (flatMapFn) {
        return List.create(List.flatMap(this, flatMapFn));
    };
    List.prototype.cache = function () {
        return List.create(List.cache(this));
    };
    List.isList = function (obj) {
        return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    List.create = function (list) {
        return new List({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list)
        });
    };
    List.has = function (list, id, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = id_1.default.head(id), tail = id_1.default.tail(id);
        return list.has(head) && (tail.length == 0 || depth == 0 || List.has(list.get(head), tail, depth));
    };
    List.get = function (list, id, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = id_1.default.head(id), tail = id_1.default.tail(id);
        if (!list.has(head))
            return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0)
            return value;
        return List.get(value, tail, depth);
    };
    List.next = function (list, id, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = id_1.default.head(id), tail = id_1.default.tail(id), value;
        if (head != null && !list.has(head))
            return;
        if (depth == 0)
            return list.next(head);
        if (head == null) {
            var first = list.next();
            return;
        }
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
            return mapFn(list.get(id), id);
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
    // static // flatten<V>(list: IList<IList<V>>): IList<V>;
    List.flatten = function (list) {
        function has(id) {
            var head = id_1.default.head(id), scnd = id_1.default.get(id, 1);
            return list.has(head) && list.get(head).has(scnd);
        }
        function get(id) {
            var head = id_1.default.head(id), scnd = id_1.default.get(id, 1);
            return list.has(head) ? list.get(head).get(scnd) : undefined;
        }
        function prev(id) {
            var head = id_1.default.head(id), scnd = id_1.default.get(id, 1);
            if (head == null) {
                head = list.prev();
            }
            else if (!list.has(head))
                return;
            scnd = list.get(head).prev(scnd);
            while (scnd == null) {
                head = list.prev(head);
                scnd = list.get(head).prev();
            }
            return id_1.default.append(head, scnd);
            //
            //
            // head = Id.head(id),
            // scnd = Id.get(id, 1);
            //
            // // var prev: Id, listId = id[0];
            //
            //
            //
            // if(list.has(head)) {
            //
            //
            //   while(scnd == null) {
            //     head = list.prev(head);
            //     scnd = list.get(head).prev()
            //   }
            //
            //   return Id.append(head, scnd);
            // }
            //
            // return null;
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
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        var valueCache = Object.create(null), nextCache = Object.create(null), prevCache = Object.create(null);
        function has(id) {
            return id_1.default.key(id) in valueCache || list.has(id);
        }
        function get(id) {
            var key = id_1.default.key(id);
            if (key in valueCache)
                return valueCache[key];
            if (list.has(id))
                return valueCache[key] = list.get(id);
            return;
        }
        function prev(id) {
            if (id == null)
                return list.prev();
            var key = id_1.default.key(id);
            if (key in prevCache)
                return prevCache[key];
            return prevCache[key] = list.prev(id);
        }
        function next(id) {
            if (id == null)
                return list.prev();
            var key = id_1.default.key(id);
            if (key in prevCache)
                return prevCache[key];
            return prevCache[key] = list.prev(id);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    return List;
})();
exports.List = List;
exports.default = List;

},{"./id":3}],6:[function(require,module,exports){
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
        _super.call(this, list);
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
    MutableList.prototype.set = function (id, value) {
        throw new Error("Not implemented");
    };
    MutableList.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        throw new Error("Not implemented");
    };
    MutableList.prototype.push = function (value) {
        return MutableList.push(this, value);
    };
    MutableList.prototype.unshift = function (value) {
        return MutableList.unshift(this, value);
    };
    MutableList.prototype.pop = function () {
        return MutableList.pop(this);
    };
    MutableList.prototype.shift = function () {
        return MutableList.shift(this);
    };
    MutableList.prototype.delete = function (id) {
        return MutableList.delete(this, id);
    };
    MutableList.prototype.remove = function (value) {
        return MutableList.remove(this, value);
    };
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
exports.default = MutableList;

},{"./observable_list":8}],7:[function(require,module,exports){
var unique_id_1 = require('./unique_id');
var Observable = (function () {
    function Observable(fn) {
        var _this = this;
        this.observe = function (observer) {
            var observerId = unique_id_1.default();
            var observers = _this._observers;
            observers[observerId] = observer;
            return {
                unsubscribe: function () { delete observers[observerId]; }
            };
        };
        if (typeof fn == 'function')
            fn(this._notify);
        this._observers = Object.create(null);
    }
    Observable.prototype._notify = function (notifier) {
        for (var observerId in this._observers)
            notifier(this._observers[observerId]);
    };
    return Observable;
})();
exports.Observable = Observable;
exports.default = Observable;

},{"./unique_id":9}],8:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var observable_1 = require('./observable');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(list) {
        _super.call(this, list);
        if (list != null) {
            this.observe = list.observe;
        }
    }
    ObservableList.prototype.observe = function (observer) {
        throw new Error("Not implemented");
    };
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
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
    };
    ObservableList.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next, observe = list.observe;
        function get(id) {
            return mapFn(list.get(id), id);
        }
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
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
    ObservableList.flatten = function (list) {
        var cache;
        var subscriptions = Object.create(null);
        var notify;
        var observable = new observable_1.Observable(function (n) { notify = n; });
        list.observe({
            onInvalidate: function (prev, next) {
                var id;
                id = prev;
                while ((id = cache.next(id)) != null && id != next) {
                    var subscription = subscriptions[id.toString()];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id.toString()];
                    }
                }
                id = next;
                while ((id = cache.prev(id)) != null && id != prev) {
                    var subscription = subscriptions[id.toString()];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id.toString()];
                    }
                }
            }
        });
        cache = ObservableList.cache(ObservableList.map(list, function (value, id) {
            subscriptions[id.toString()] = value.observe({
                onInvalidate: function (prev, next) {
                    notify(function (observer) {
                        var p = [].concat(id).concat(prev), n = [].concat(id).concat(next);
                        observer.onInvalidate(p, n);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var _prev = cache.get(prev).prev(), _next = cache.get(next).next();
                notify(function (observer) {
                    var p = [].concat(prev).concat(_prev), n = [].concat(next).concat(_next);
                    observer.onInvalidate(p, n);
                });
            }
        });
        var _a = list_1.List.flatten(cache), has = _a.has, get = _a.get, next = _a.next, prev = _a.prev;
        return { has: has, get: get, next: next, prev: prev, observe: observable.observe };
    };
    ObservableList.cache = function (list) {
        var _get = Object.create(null), _next = Object.create(null), _prev = Object.create(null);
        function has(id) {
            if (id == null)
                return false;
            return id.toString() in _get || list.has(id);
        }
        function get(id) {
            if (id == null)
                return undefined;
            var idString = id.toString();
            if (idString in _get) {
                return _get[idString];
            }
            if (list.has(id)) {
                return _get[idString] = list.get(id);
            }
        }
        function prev(id) {
            if (id == null)
                return list.prev();
            var idString = id.toString();
            if (idString in _prev) {
                return _prev[idString];
            }
            if (list.prev(id) != null) {
                var prevId = _prev[idString] = list.prev(id);
                _next[prevId.toString()] = id;
                return prevId;
            }
        }
        function next(id) {
            if (id == null)
                return list.next();
            var idString = id.toString();
            if (idString in _next) {
                return _next[idString];
            }
            if (list.next(id) != null) {
                var nextId = _next[idString] = list.next(id);
                _prev[nextId.toString()] = id;
                return nextId;
            }
        }
        list.observe({
            onInvalidate: function (prev, next) {
                var nextId = prev, prevId = next;
                while (nextId != null && (nextId = _next[nextId.toString()])) {
                    delete _next[_prev[nextId.toString()]];
                    delete _prev[nextId.toString()];
                    if (next != null && nextId.toString() == next.toString())
                        break;
                    delete _get[nextId.toString()];
                }
                while (prevId != null && (prevId = _prev[prevId.toString()])) {
                    delete _prev[_next[prevId.toString()]];
                    delete _next[prevId.toString()];
                    if (prev != null && prevId.toString() == prev.toString())
                        break;
                    delete _get[prevId.toString()];
                }
            }
        });
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;

},{"./list":5,"./observable":7}],9:[function(require,module,exports){
var id = 0;
function uniqueId() {
    return ++id;
}
exports.uniqueId = uniqueId;
exports.default = uniqueId;

},{}],10:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(value) {
        var _this = this;
        _super.call(this);
        if (arguments.length > 2)
            this.splice(null, null, value);
        new observable_1.default(function (notifier) {
            _this._invalidate = function (prev, next) {
                notifier(function (observer) {
                    observer.onInvalidate(prev, next);
                });
            };
        });
    }
    Unit.prototype.has = function (id) {
        return this._id == id;
    };
    Unit.prototype.get = function (id) {
        if (this.has(id))
            return this._value;
    };
    Unit.prototype.prev = function (id) {
        if (id == null)
            return this._id;
        return null;
    };
    Unit.prototype.next = function (id) {
        if (id == null)
            return this._id;
        return null;
    };
    Unit.prototype.set = function (id, value) {
        this._id = id;
        this._value = value;
        this._invalidate();
        return true;
    };
    Unit.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        if (values.length)
            return this.set(unique_id_1.default(), values[0]);
        delete this._id;
        delete this._value;
        this._invalidate();
        return true;
    };
    return Unit;
})(mutable_list_1.default);
exports.default = Unit;

},{"./mutable_list":6,"./observable":7,"./unique_id":9}],11:[function(require,module,exports){
var factory_1 = require('./factory');
var list_1 = require('./list');
var observable_list_1 = require('./observable_list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
var linked_list_1 = require('./linked_list');
function Sonic(obj) {
    return factory_1.default(obj);
}
Sonic['List'] = list_1.default;
Sonic['ObservableList'] = observable_list_1.default;
Sonic['MutableList'] = mutable_list_1.default;
Sonic['Unit'] = unit_1.default;
Sonic['ArrayList'] = array_list_1.default;
Sonic['LinkedList'] = linked_list_1.default;
module.exports = Sonic;

},{"./array_list":1,"./factory":2,"./linked_list":4,"./list":5,"./mutable_list":6,"./observable_list":8,"./unit":10}]},{},[11])(11)
});