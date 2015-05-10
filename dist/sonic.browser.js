(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./array_list":2,"./factory":3,"./linked_list":4,"./list":5,"./mutable_list":6,"./unit":9}],2:[function(require,module,exports){
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
        if (array === void 0) { array = []; }
        _super.call(this);
        this._array = array;
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

},{"./mutable_list":6}],3:[function(require,module,exports){
var list_1 = require('./list');
var mutable_list_1 = require('./mutable_list');
var unit_1 = require('./unit');
var array_list_1 = require('./array_list');
function factory(obj) {
    if (mutable_list_1.MutableList.isMutableList(obj))
        return mutable_list_1.MutableList.create(obj);
    if (list_1.List.isList(obj))
        return list_1.List.create(obj);
    if (Array.isArray(obj))
        return new array_list_1.default(obj);
    return unit_1.default.create(obj);
}
exports.default = factory;

},{"./array_list":2,"./list":5,"./mutable_list":6,"./unit":9}],4:[function(require,module,exports){
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
        _super.call(this);
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[-1] = -1;
        this._next[-1] = -1;
        this.splice.apply(this, [null, null].concat(array));
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

},{"./mutable_list":6,"./unique_id":8}],5:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_1 = require('./observable');
var List = (function (_super) {
    __extends(List, _super);
    function List(source) {
        _super.call(this);
        this._source = source;
    }
    List.prototype.has = function (id) { return this._source.has(id); };
    List.prototype.get = function (id) { return this._source.get(id); };
    List.prototype.prev = function (id) { return this._source.prev(id); };
    List.prototype.next = function (id) { return this._source.next(id); };
    List.prototype._invalidate = function (prev, next) {
        if (!this.has(prev))
            prev = null;
        if (!this.has(next))
            next = null;
        _super.prototype._invalidate.call(this, prev, next);
    };
    return List;
})(observable_1.default);
exports.List = List;
var List;
(function (List) {
    function isList(obj) {
        return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    }
    List.isList = isList;
    function create(list) {
        return new List(list);
    }
    List.create = create;
    function forEach(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            fn(list.get(id), id);
    }
    List.forEach = forEach;
    function reduce(list, fn, memo) {
        var id;
        while ((id = list.next(id)) != null)
            memo = fn(memo, list.get(id), id);
        return memo;
    }
    List.reduce = reduce;
    function toArray(list) {
        return reduce(list, function (memo, v) { memo.push(v); return memo; }, []);
    }
    List.toArray = toArray;
    function findId(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            if (fn(list.get(id), id))
                return id;
    }
    List.findId = findId;
    function find(list, fn) {
        return list.get(findId(list, fn));
    }
    List.find = find;
    function idOf(list, value) {
        var id;
        return findId(list, function (v) { return v === value; });
    }
    List.idOf = idOf;
    function indexOf(list, value) {
        var id, i = 0;
        while ((id = list.next(id)) != null) {
            if (list.get(id) === value)
                return i;
            i++;
        }
    }
    List.indexOf = indexOf;
    function idAt(list, index) {
        var id, i = 0;
        while ((id = list.next(id)) != null)
            if (i++ == index)
                return id;
        return null;
    }
    List.idAt = idAt;
    function at(list, index) {
        return list.get(idAt(list, index));
    }
    List.at = at;
    function every(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (!predicate(list.get(id), id))
                return false;
        return true;
    }
    List.every = every;
    function some(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (predicate(list.get(id), id))
                return true;
        return false;
    }
    List.some = some;
    function contains(list, value) {
        return some(list, function (v) { return v === value; });
    }
    List.contains = contains;
    function first(list) {
        return list.get(list.next());
    }
    List.first = first;
    function last(list) {
        return list.get(list.prev());
    }
    List.last = last;
    function reverse(list) {
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
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.reverse = reverse;
    function map(list, mapFn) {
        function has(id) {
            return list.has(id);
        }
        function get(id) {
            return mapFn(list.get(id));
        }
        function prev(id) {
            return list.prev(id);
        }
        function next(id) {
            return list.next(id);
        }
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.map = map;
    function filter(list, filterFn) {
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
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.filter = filter;
    function flatten(list) {
        function has(id) {
            if (list.has(id[0]))
                return list.get(id[0]).has(id[1]);
            return false;
        }
        function get(id) {
            if (list.has(id[0]))
                return list.get(id[0]).get(id[1]);
            return;
        }
        function prev(id) {
            if (id == null)
                return [list.prev(), last(list).prev()];
            var prev, listId = id[0];
            if (list.has(listId)) {
                prev = list.get(listId).prev(id[1]);
                if (prev != null)
                    return [listId, prev];
                while ((listId = list.prev(listId)) != null) {
                    if ((prev = list.get(listId).prev()) != null)
                        return [listId, prev];
                }
            }
            return null;
        }
        function next(id) {
            if (id == null)
                return [list.next(), first(list).next()];
            var next, listId = id[0];
            if (list.has(listId)) {
                if ((next = list.get(listId).next(id[1])) != null)
                    return [listId, next];
                while ((listId = list.next(listId)) != null) {
                    if ((next = list.get(listId).next()) != null)
                        return [listId, next];
                }
            }
            return null;
        }
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.flatten = flatten;
    function flatMap(list, flatMapFn) {
        return flatten(map(list, flatMapFn));
    }
    List.flatMap = flatMap;
})(List = exports.List || (exports.List = {}));
Object.keys(List).forEach(function (key) {
    List.prototype[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        List[key].apply(List, [this].concat(args));
    };
});
exports.default = List;

},{"./observable":7}],6:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList(source) {
        _super.call(this, source);
    }
    MutableList.prototype.set = function (id, value) { return this._source.set(id, value); };
    MutableList.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return (_a = this._source).splice.apply(_a, [prev, next].concat(values));
        var _a;
    };
    return MutableList;
})(list_1.List);
exports.MutableList = MutableList;
var MutableList;
(function (MutableList) {
    function isMutableList(obj) {
        return list_1.List.isList(obj) && !!obj['set'] && !!obj['splice'];
    }
    MutableList.isMutableList = isMutableList;
    function create(list) {
        return new MutableList(list);
    }
    MutableList.create = create;
    function push(list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    }
    MutableList.push = push;
    function unshift(list, value) {
        list.splice(list.next(), null, value);
        return list.next();
    }
    MutableList.unshift = unshift;
    function pop(list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    }
    MutableList.pop = pop;
    function shift(list) {
        var value = list.get(list.next());
        list.splice(list.next(list.next()), null);
        return value;
    }
    MutableList.shift = shift;
    function del(list, id) {
        if (!list.has(id))
            return false;
        return list.splice(list.prev(id), list.next(id));
    }
    MutableList.del = del;
    function remove(list, value) {
        var id = list_1.List.idOf(list, value);
        return delete (list, id);
    }
    MutableList.remove = remove;
})(MutableList = exports.MutableList || (exports.MutableList = {}));
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

},{"./list":5}],7:[function(require,module,exports){
var unique_id_1 = require('./unique_id');
function isObservable(obj) {
    return false;
}
exports.isObservable = isObservable;
var Observable = (function () {
    function Observable() {
        this._observers = Object.create(null);
    }
    Observable.prototype.subscribe = function (observer) {
        var observerId = unique_id_1.default();
        var observers = this._observers;
        observers[observerId] = observer;
        return {
            unsubscribe: function () { delete observers[observerId]; }
        };
    };
    Observable.prototype._invalidate = function (prev, next) {
        for (var observerId in this._observers) {
            this._observers[observerId];
        }
    };
    return Observable;
})();
exports.Observable = Observable;
exports.default = Observable;

},{"./unique_id":8}],8:[function(require,module,exports){
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
        _super.call(this);
        if (arguments.length > 2)
            this.splice(null, null, value);
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
    Unit.prototype.splice = function (prev, next, value) {
        if (arguments.length > 2)
            return this.set(unique_id_1.default(), value);
        delete this._id;
        delete this._value;
        this._invalidate();
        return true;
    };
    return Unit;
})(mutable_list_1.default);
exports.default = Unit;

},{"./mutable_list":6,"./unique_id":8}]},{},[1])(1)
});