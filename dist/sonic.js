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
  getIterator: function getIterator(list, start) {
    return new Iterator(list, start);
  },
  each: function each(list, fn) {
    return Sonic.forEach(list, fn);
  },
  forEach: function forEach(list, fn) {
    var iterator;
    iterator = Sonic.getIterator(list);
    while (iterator.moveNext()) {
      if (fn(iterator.current(), iterator.currentId) === false) {
        return false;
      }
    }
    return true;
  },
  findId: function findId(list, fn) {
    var result;
    result = void 0;
    Sonic.each(list, function (value, id) {
      if (fn(value)) {
        result = id;
        return false;
      }
    });
    return result;
  },
  find: function find(list, fn) {
    return list.get(Sonic.findId(list, fn));
  },
  idAt: function idAt(list, index) {
    var i;
    i = 0;
    return Sonic.findId(list, function () {
      if (i++ === index) {
        return true;
      }
    });
  },
  idOf: function idOf(list, value) {
    return Sonic.findId(list, function (v) {
      return v === value;
    });
  },
  at: function at(list, index) {
    return list.get(Sonic.idAt(list, index));
  },
  indexOf: function indexOf(list, value) {
    var i;
    i = -1;
    if (Sonic.some(list, function (v) {
      i++;
      return v === value;
    })) {
      return i;
    } else {
      return -1;
    }
  },
  some: function some(list, predicate) {
    return !Sonic.each(list, function () {
      return !predicate.apply(null, arguments);
    });
  },
  any: function any(list, predicate) {
    return Sonic.some(list, predicate);
  },
  contains: function contains(list, value) {
    return Sonic.some(list, function (v) {
      return v === value;
    });
  },
  first: function first(list) {
    return list.get(list.next());
  },
  last: function last(list) {
    return list.get(list.prev());
  },
  reduce: function reduce(list, reduceFn, memo) {
    Sonic.each(list, function (value, id) {
      return reduceFn(memo, value, id);
    });
    return memo;
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
  pluck: function pluck(list, key) {
    return Sonic.map(list, function (value) {
      return value[key];
    });
  },
  invoke: function invoke() {
    var args, key, list;
    list = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    return Sonic.map(list, function (value) {
      return value[key].apply(value, args);
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
  toArray: function toArray(list) {
    return Sonic.reduce(list, function (memo, value) {
      return memo.push(value);
    }, []);
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

exports = ["getIterator", "each", "forEach", "at", "idAt", "idOf", "indexOf", "contains", "any", "some", "find", "reduce", "first", "last", "toArray", "flatMap", "group", "sort", "take", "map", "pluck", "invoke", "filter", "concat", "flatten", "uniq", "union", "intersection", "proxy", "reverse"];

exports.forEach(function (fn) {
  return AbstractList.prototype[fn] = function () {
    return Sonic[fn].apply(Sonic, [this].concat(__slice.call(arguments)));
  };
});

module.exports = Sonic;

//# sourceMappingURL=sonic.js.map