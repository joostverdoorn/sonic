(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Signal = _interopRequire(require("./signal"));

var Iterator = _interopRequire(require("./iterator"));

var AbstractList,
    __slice = [].slice;

AbstractList = (function () {
  function AbstractList() {
    this._byId = {};
    this._prev = {};
    this._next = {};
    this._events = new Signal();
  }

  AbstractList.prototype._add = function (value, options) {
    var id;
    if (options != null && options.id != null) {
      id = options.id;
    } else {
      id = Sonic.uniqueId();
    }
    this._byId[id] = value;
    if (options && (options.prev != null || options.next != null)) {
      this._move(id, options);
    }
    return id;
  };

  AbstractList.prototype._set = function (id, value, options) {
    if (!(id !== 0 && this.has(id))) {
      return false;
    }
    this._byId[id] = value;
    if (!(options != null ? options.silent : void 0)) {
      this._invalidate(this._prev[id], this._next[id]);
    }
    return true;
  };

  AbstractList.prototype._delete = function (id, options) {
    if (!(id !== 0 && this._remove(id, options))) {
      return false;
    }
    delete this._byId[id];
    delete this._next[id];
    delete this._prev[id];
    return true;
  };

  AbstractList.prototype._remove = function (id, options) {
    var next, prev;
    if (!this.has(id)) {
      return false;
    }
    prev = this._prev[id];
    next = this._next[id];
    if (prev != null) {
      this._prev[next] = prev;
    }
    if (next != null) {
      this._next[prev] = next;
    }
    if (next != null || prev != null && !(options != null ? options.silent : void 0)) {
      this._invalidate(prev, next);
    }
    return true;
  };

  AbstractList.prototype._move = function (id, options) {
    var next, prev;
    if (!this.has(id)) {
      return false;
    }
    this._remove(id);
    prev = options != null ? options.prev : void 0;
    next = options != null ? options.next : void 0;
    if (next != null && prev == null) {
      prev = this._prev[next];
    }
    if (prev != null && next == null) {
      next = this._next[prev];
    }
    if (prev != null) {
      this._prev[id] = prev;
      this._next[prev] = id;
    }
    if (next != null) {
      this._next[id] = next;
      this._prev[next] = id;
    }
    if (!(options != null ? options.silent : void 0)) {
      this._invalidate(prev, next);
    }
    return true;
  };

  AbstractList.prototype._slice = function (prev, next) {
    var id;
    if (prev != null) {
      while ((id = this._next[id || prev]) && id !== next) {
        this._delete(id, {
          silent: true
        });
      }
    }
    if (next != null) {
      while ((id = this._prev[id || next]) && id !== prev) {
        this._delete(id, {
          silent: true
        });
      }
    }
    return this._invalidate(prev, next);
  };

  AbstractList.prototype.get = function (id) {
    return this._byId[id];
  };

  AbstractList.prototype.has = function (id) {
    return id in this._byId || id === 0;
  };

  AbstractList.prototype.prev = function (id) {
    if (id == null) {
      id = 0;
    }
    return this._prev[id] || null;
  };

  AbstractList.prototype.next = function (id) {
    if (id == null) {
      id = 0;
    }
    return this._next[id] || null;
  };

  AbstractList.prototype.getIterator = function (start) {
    return new Iterator(this, start);
  };

  AbstractList.prototype.idAt = function (index) {
    var i, iterator;
    i = -1;
    iterator = this.getIterator();
    while (iterator.moveNext()) {
      if (++i === index) {
        return iterator.currentId;
      }
    }
    return void 0;
  };

  AbstractList.prototype.at = function (index) {
    var id;
    if (id = this.idAt(index)) {
      return this.get(id);
    }
    return void 0;
  };

  AbstractList.prototype.idOf = function (value) {
    var iterator;
    iterator = this.getIterator();
    while (iterator.moveNext()) {
      if (iterator.current() === value) {
        return iterator.currentId;
      }
    }
    return void 0;
  };

  AbstractList.prototype.indexOf = function (value, limit) {
    var index, iterator;
    if (limit == null) {
      limit = Infinity;
    }
    index = -1;
    iterator = this.getIterator();
    while (iterator.moveNext() && ++index < limit) {
      if (iterator.current() === value) {
        return index;
      }
    }
    return -1;
  };

  AbstractList.prototype.contains = function (value, limit) {
    if (limit == null) {
      limit = Infinity;
    }
    return this.indexOf(value, limit) !== -1;
  };

  AbstractList.prototype.forEach = function (fn) {
    return this.each(fn);
  };

  AbstractList.prototype.each = function (fn) {
    var iterator;
    iterator = this.getIterator();
    while (iterator.moveNext()) {
      if (fn(iterator.current()) === false) {
        return false;
      }
    }
    return true;
  };

  AbstractList.prototype.any = function (predicate) {
    return this.some(predicate);
  };

  AbstractList.prototype.some = function (predicate) {
    var index, _i, _ref;
    for (index = _i = 0, _ref = this.length(); 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
      if (predicate(this.at(index))) {
        return true;
      }
    }
    return false;
  };

  AbstractList.prototype.find = function (fn) {
    var result;
    result = void 0;
    this.each(function (value) {
      if (fn(value)) {
        result = value;
        return false;
      }
    });
    return result;
  };

  AbstractList.prototype.reduce = function (reduceFn, memo) {
    if (memo == null) {
      memo = 0;
    }
    this.each(function (value) {
      return memo = reduceFn(value, memo);
    });
    return memo;
  };

  AbstractList.prototype.first = function () {
    return this.get(this.next());
  };

  AbstractList.prototype.skip = function (count) {
    return this.rest(count);
  };

  AbstractList.prototype.tail = function (count) {
    return this.rest(count);
  };

  AbstractList.prototype.drop = function (count) {
    return this.rest(count);
  };

  AbstractList.prototype.rest = function (count) {};

  AbstractList.prototype.initial = function (count) {};

  AbstractList.prototype.last = function (count) {
    return this.get(this.prev());
  };

  AbstractList.prototype.pluck = function (key) {
    return this.map(function (value) {
      return value[key];
    });
  };

  AbstractList.prototype.invoke = function () {
    var args, key;
    key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.map(function (value) {
      return value[key].apply(value, args);
    });
  };

  AbstractList.prototype.toArray = function () {
    var values;
    values = [];
    this.each(function (value) {
      return values.push(value);
    });
    return values;
  };

  AbstractList.prototype._invalidate = function (prev, next) {
    var event;
    event = {
      prev: prev,
      next: next
    };
    return this._events["yield"](event);
  };

  AbstractList.prototype.onInvalidate = function (callback) {
    return this._events.forEach(callback);
  };

  return AbstractList;
})();

module.exports = AbstractList;

//# sourceMappingURL=abstract_list.js.map
},{"./iterator":4,"./signal":6}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var Unit = _interopRequire(require("./unit"));

var FlatMapList,
    __bind = function __bind(fn, me) {
  return function () {
    return fn.apply(me, arguments);
  };
},
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

FlatMapList = (function (_super) {
  __extends(FlatMapList, _super);

  function FlatMapList(source, flatMapFn) {
    this._onListInvalidate = __bind(this._onListInvalidate, this);
    this._onSourceInvalidate = __bind(this._onSourceInvalidate, this);
    FlatMapList.__super__.constructor.call(this);
    this._source = Sonic.create(source);
    this._source.onInvalidate(this._onSourceInvalidate);
    this._sourceIdById = {};
    this._listBySourceId = {};
    this._flatMapFn = flatMapFn || Sonic.unit;
  }

  FlatMapList.prototype.get = function (id) {
    var list;
    if (list = this._getListById(id)) {
      return list.get(id);
    }
  };

  FlatMapList.prototype.has = function (id) {
    return id in this._sourceIdById || id === 0;
  };

  FlatMapList.prototype.prev = function (id) {
    var list, prev, sourceId;
    if (id == null) {
      id = 0;
    }
    if (!id) {
      sourceId = this._source.prev();
    } else {
      sourceId = this._sourceIdById[id];
    }
    if (!sourceId) {
      return;
    }
    list = this._getListBySourceId(sourceId);
    prev = list.prev(id);
    while (!prev) {
      if (!(sourceId = this._source.prev(sourceId))) {
        return;
      }
      list = this._getListBySourceId(sourceId);
      prev = list.prev();
    }
    this._sourceIdById[prev] = sourceId;
    return prev;
  };

  FlatMapList.prototype.next = function (id) {
    var list, next, sourceId;
    if (id == null) {
      id = 0;
    }
    if (!id) {
      sourceId = this._source.next();
    } else {
      sourceId = this._sourceIdById[id];
    }
    if (!sourceId) {
      return;
    }
    list = this._getListBySourceId(sourceId);
    next = list.next(id);
    while (!next) {
      if (!(sourceId = this._source.next(sourceId))) {
        return;
      }
      list = this._getListBySourceId(sourceId);
      next = list.next();
    }
    this._sourceIdById[next] = sourceId;
    return next;
  };

  FlatMapList.prototype._getListById = function (id) {
    var sourceId;
    if (sourceId = this._sourceIdById[id]) {
      return this._getListBySourceId(sourceId);
    }
  };

  FlatMapList.prototype._getListBySourceId = function (sourceId) {
    var list;
    if (list = this._listBySourceId[sourceId]) {
      return list;
    }
    if (!this._source.has(sourceId)) {
      return;
    }
    list = this._flatMapFn(this._source.get(sourceId));
    list.onInvalidate((function (_this) {
      return function (event) {
        return _this._onListInvalidate(event, sourceId);
      };
    })(this));
    this._listBySourceId[sourceId] = list;
    return list;
  };

  FlatMapList.prototype._onSourceInvalidate = function (event) {
    var next, prev, _ref, _ref1;
    prev = (_ref = this._getListBySourceId(event.prev)) != null ? _ref.prev(0, {
      lazy: true
    }) : void 0;
    next = (_ref1 = this._getListBySourceId(event.next)) != null ? _ref1.next(0, {
      lazy: true
    }) : void 0;
    return this._invalidate(prev, next);
  };

  FlatMapList.prototype._onListInvalidate = function (event, sourceId) {
    var next, prev;
    if (!(prev = event.prev)) {
      prev = this._getListBySourceId(this._source.prev(sourceId)).prev();
    }
    if (!(next = event.next)) {
      next = this._getListBySourceId(this._source.next(sourceId)).next();
    }
    return this._invalidate(prev, next);
  };

  return FlatMapList;
})(AbstractList);

module.exports = FlatMapList;

//# sourceMappingURL=flat_map_list.js.map
},{"./abstract_list":1,"./unit":9}],3:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var FlatMapList = _interopRequire(require("./flat_map_list"));

var Unit = _interopRequire(require("./unit"));

var GroupList,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

GroupList = (function (_super) {
  __extends(GroupList, _super);

  function GroupList(source, groupFn) {
    var flatMapFn;
    this._byValue = new Map();
    this._groupFn = groupFn || function (x) {
      return x;
    };
    flatMapFn = function (value) {
      var groupValue, list;
      groupValue = this._groupFn(value);
      if (this._byValue.has(groupValue)) {
        return new Unit();
      }
      list = this._source.filter((function (_this) {
        return function (value) {
          return _this._groupFn(value) === groupValue;
        };
      })(this));
      this._byValue.set(groupValue, list);
      return new Unit(list);
    };
    GroupList.__super__.constructor.call(this, source, flatMapFn);
  }

  return GroupList;
})(FlatMapList);

module.exports = GroupList;

//# sourceMappingURL=group_list.js.map
},{"./flat_map_list":2,"./unit":9}],4:[function(require,module,exports){
"use strict";

var Iterator;

Iterator = (function () {
  function Iterator(list, startId) {
    this.list = list;
    this.currentId = this.startId = startId;
  }

  Iterator.prototype.current = function () {
    return this.list.get(this.currentId);
  };

  Iterator.prototype.reset = function () {
    this.currentId = this.startId;
    return this;
  };

  Iterator.prototype.moveNext = function () {
    this.currentId = this.list.next(this.currentId);
    return this.currentId != null;
  };

  Iterator.prototype.movePrevious = function () {
    this.currentId = this.list.prev(this.currentId);
    return this.currentId != null;
  };

  Iterator.prototype.next = function () {
    if (this.moveNext()) {
      return {
        value: this.current(),
        done: false,
        id: this.currentId
      };
    } else {
      return {
        done: true,
        id: this.currentId
      };
    }
  };

  Iterator.prototype.previous = function () {
    if (this.movePrevious()) {
      return {
        value: this.current(),
        done: false,
        id: this.currentId
      };
    } else {
      return {
        done: true,
        id: this.currentId
      };
    }
  };

  return Iterator;
})();

module.exports = Iterator;

//# sourceMappingURL=iterator.js.map
},{}],5:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var List,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

List = (function (_super) {
  __extends(List, _super);

  function List(values) {
    var value, _i, _len;
    List.__super__.constructor.call(this);
    this._move(0, {
      next: 0
    });
    if (values != null) {
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        this._add(value, {
          next: 0
        });
      }
    }
  }

  List.prototype.set = function (id, value) {
    return this._set(id, value);
  };

  List.prototype.push = function (value) {
    return this._add(value, {
      next: 0
    });
  };

  List.prototype.unshift = function (value) {
    return this._add(value, {
      prev: 0
    });
  };

  List.prototype.pop = function () {
    var id, value;
    id = this.prev();
    value = this.get(id);
    if (this._delete(id)) {
      return value;
    }
  };

  List.prototype.shift = function () {
    var id, value;
    id = this.next();
    value = this.get(id);
    if (this._delete(id)) {
      return value;
    }
  };

  List.prototype.add = function (value) {
    return this.push(value);
  };

  List.prototype.remove = function (value) {
    var id;
    id = this.idOf(value);
    return this._delete(id);
  };

  List.prototype["delete"] = function (id) {
    return this._delete(id);
  };

  return List;
})(AbstractList);

module.exports = List;

//# sourceMappingURL=list.js.map
},{"./abstract_list":1}],6:[function(require,module,exports){
"use strict";

var Signal;

Signal = (function () {
  function Signal(value) {
    this.id = Sonic.uniqueId();
    this._handlers = [];
    this._value = value;
  }

  Signal.prototype.value = function () {
    return this._value;
  };

  Signal.prototype["yield"] = function (value) {
    var index, item, toRemove, _i, _len;
    this._value = value;
    toRemove = [];
    this._handlers.forEach((function (_this) {
      return function (handler) {
        var res;
        res = handler(value, _this);
        if (!res) {
          toRemove.push(res);
        }
        return res;
      };
    })(this));
    for (_i = 0, _len = toRemove.length; _i < _len; _i++) {
      item = toRemove[_i];
      index = this._handlers.indexOf(item);
      this._handlers.splice(index, 1);
    }
    return true;
  };

  Signal.prototype.each = function (handler) {
    return this.forEach(handler);
  };

  Signal.prototype.forEach = function (handler) {
    return this._handlers.push(handler);
  };

  Signal.prototype.root = function () {
    return this;
  };

  return Signal;
})();

module.exports = Signal;

//# sourceMappingURL=signal.js.map
},{}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Signal = _interopRequire(require("./signal"));

var Iterator = _interopRequire(require("./iterator"));

var AbstractList = _interopRequire(require("./abstract_list"));

var List = _interopRequire(require("./list"));

var Unit = _interopRequire(require("./unit"));

var FlatMapList = _interopRequire(require("./flat_map_list"));

var GroupList = _interopRequire(require("./group_list"));

var TakeList = _interopRequire(require("./take_list"));

var Sonic,
    exports,
    __slice = [].slice;

Sonic = {
  _uniqueCounter: 1,
  uniqueId: function uniqueId() {
    return Sonic._uniqueCounter++;
  },
  create: function create(items) {
    if (items == null) {
      items = [];
    }
    if (items instanceof AbstractList) {
      return items;
    }
    return new List(items);
  },
  unit: function unit(item) {
    return new Unit(item);
  },
  empty: function empty() {
    return new Unit();
  },
  flatMap: function flatMap(list, flatMapFn) {
    return new FlatMapList(list, flatMapFn);
  },
  group: function group(list, groupFn) {
    return new GroupList(list, groupFn);
  },
  sort: function sort(list, sortFn) {
    return new SortedList(list, {
      sortFn: sortFn
    });
  },
  take: function take(list, count) {
    return new TakeList(list, count);
  },
  map: function map(list, mapFn) {
    return Sonic.flatMap(list, function (value) {
      return new Unit(mapFn(value));
    });
  },
  filter: function filter(list, filterFn) {
    return Sonic.flatMap(list, function (value) {
      if (filterFn(value)) {
        return new Unit(value);
      } else {
        return new Unit();
      }
    });
  },
  concat: function concat() {
    var lists;
    lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return Sonic.flatMap(lists, function (list) {
      return list;
    });
  },
  flatten: function flatten(list) {
    return Sonic.flatMap(list, function (list) {
      return list;
    });
  },
  uniq: function uniq(list, groupFn) {
    if (groupFn == null) {
      groupFn = function (x) {
        return x;
      };
    }
    return Sonic.flatMap(Sonic.group(list, groupFn), function (list) {
      return list.take(1);
    });
  },
  union: function union() {
    var lists;
    lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return Sonic.concat.apply(Sonic, lists).uniq();
  },
  intersection: function intersection(list, other) {
    return Sonic.filter(list, other.contains);
  },
  proxy: (function (_proxy) {
    var _proxyWrapper = function proxy(_x, _x2) {
      return _proxy.apply(this, arguments);
    };

    _proxyWrapper.toString = function () {
      return _proxy.toString();
    };

    return _proxyWrapper;
  })(function (list, fns) {
    var fn, key, proxy;
    if (fns == null) {
      fns = {
        get: "get",
        has: "has",
        prev: "prev",
        next: "next",
        onInvalidate: "onInvalidate"
      };
    }
    proxy = new AbstractList();
    for (key in fns) {
      fn = fns[key];
      proxy[key] = list[fn].bind(list);
    }
    return proxy;
  }),
  reverse: function reverse(list) {
    var fns, proxy;
    fns = {
      get: "get",
      has: "has",
      prev: "next",
      next: "prev"
    };
    proxy = Sonic.proxy(list, fns);
    proxy.onInvalidate = function (callback) {
      return list.onInvalidate(function (event) {
        return callback({
          prev: event.next,
          next: event.prev
        });
      });
    };
    return proxy;
  },
  Signal: Signal,
  Iterator: Iterator,
  AbstractList: AbstractList,
  Unit: Unit,
  List: List,
  FlatMapList: FlatMapList,
  GroupList: GroupList,
  TakeList: TakeList
};

exports = ["flatMap", "group", "sort", "take", "map", "filter", "concat", "flatten", "uniq", "union", "intersection", "proxy", "reverse"];

exports.forEach(function (fn) {
  return AbstractList.prototype[fn] = function () {
    return Sonic[fn].apply(Sonic, [this].concat(__slice.call(arguments)));
  };
});

module.exports = Sonic;

//# sourceMappingURL=sonic.js.map
},{"./abstract_list":1,"./flat_map_list":2,"./group_list":3,"./iterator":4,"./list":5,"./signal":6,"./take_list":8,"./unit":9}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var TakeList,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

TakeList = (function (_super) {
  __extends(TakeList, _super);

  function TakeList(source, count) {
    this._orderById = {
      0: 0
    };
    this._source = source;
    this._count = count;
    TakeList.__super__.constructor.call(this);
    this._source.onInvalidate((function (_this) {
      return function (event) {
        return _this._invalidate(event.prev);
      };
    })(this));
  }

  TakeList.prototype._invalidate = function (prev) {
    var id;
    while (id = this._source.next(id || prev)) {
      delete this._orderById[id];
    }
    return TakeList.__super__._invalidate.call(this, prev);
  };

  TakeList.prototype.prev = function (id) {};

  TakeList.prototype.next = function (id) {
    var i, next, prev;
    if (id == null) {
      id = 0;
    }
    if ((i = this._orderById[id]) == null) {
      while (prev = this._source.prev(prev || id)) {
        if (i = this._orderById[id]) {
          break;
        }
      }
      while (next = this._source.next(next || prev)) {
        this._orderById[next] = i++;
        if (next === id) {
          break;
        }
      }
    }
    if (i >= this._count) {
      return;
    }
    next = this._source.next(next || id);
    this._orderById[next] = ++i;
    return next;
  };

  TakeList.prototype.get = function (id) {
    return this._source.get(id);
  };

  TakeList.prototype.has = function (id) {
    return this._source.has(id);
  };

  return TakeList;
})(AbstractList);

module.exports = TakeList;

//# sourceMappingURL=take_list.js.map
},{"./abstract_list":1}],9:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var Unit,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

Unit = (function (_super) {
  __extends(Unit, _super);

  function Unit(value) {
    Unit.__super__.constructor.apply(this, arguments);
    this._id = Sonic.uniqueId();
    if (arguments.length) {
      this._value = value;
    }
  }

  Unit.prototype.set = function (value) {
    return this._value = value;
  };

  Unit.prototype["delete"] = function () {
    return delete this._value;
  };

  Unit.prototype.get = function () {
    return this._value;
  };

  Unit.prototype.has = function () {
    return "_value" in this;
  };

  Unit.prototype.next = function (id) {
    if (id == null) {
      id = 0;
    }
    if (id === 0 && this.has()) {
      return this._id;
    }
  };

  Unit.prototype.prev = function (id) {
    if (id == null) {
      id = 0;
    }
    if (id === 0 && this.has()) {
      return this._id;
    }
  };

  return Unit;
})(AbstractList);

module.exports = Unit;

//# sourceMappingURL=unit.js.map
},{"./abstract_list":1}]},{},[7])(7)
});