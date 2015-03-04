"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Signal = _interopRequire(require("./signal"));

var Iterator = _interopRequire(require("./iterator"));

var AbstractList = _interopRequire(require("./abstract_list"));

var List = _interopRequire(require("./list"));

var Unit = _interopRequire(require("./unit"));

var FlatMapList = _interopRequire(require("./flat_map_list"));

var GroupList = _interopRequire(require("./group_list"));

var Sonic,
    exports,
    __slice = [].slice;

Sonic = {
  _uniqueCounter: 1,
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
  uniqueId: function uniqueId() {
    return Sonic._uniqueCounter++;
  },
  flatMap: function flatMap(list, flatMapFn) {
    return new FlatMapList(list, flatMapFn);
  },
  map: function map(list, mapFn) {
    return list.flatMap(function (value) {
      return new Unit(mapFn(value));
    });
  },
  filter: function filter(list, filterFn) {
    return list.flatMap(function (value) {
      if (filterFn(value)) {
        return new Unit(value);
      } else {
        return new Unit();
      }
    });
  },
  group: function group(list, groupFn) {
    return new GroupList(list, groupFn);
  },
  sort: function sort(list, sortFn) {
    return new SortedList(list, {
      sortFn: sortFn
    });
  },
  concat: function concat() {
    var list, others;
    list = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return new FlatMapList([list].concat(others), function (list) {
      return list;
    });
  },
  flatten: function flatten(list) {
    return list.flatMap(function (list) {
      return list;
    });
  },
  reverse: function reverse(list) {
    return new ReversedList(list);
  },
  unique: function unique(list) {
    return list.uniq();
  },
  uniq: function uniq(list, groupFn) {
    if (groupFn == null) {
      groupFn = function (x) {
        return x;
      };
    }
    return list.group(groupFn).flatMap(function (list) {
      return new Unit(list.first());
    });
  },
  union: function union() {
    var list, others;
    list = arguments[0], others = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return list.concat.apply(list, others).uniq();
  },
  intersection: function intersection(list, other) {
    return list.filter(other.contains);
  },
  take: function take(list, count) {
    return new TakeList(list, count);
  },
  Signal: Signal,
  Iterator: Iterator,
  AbstractList: AbstractList,
  Unit: Unit,
  List: List,
  FlatMapList: FlatMapList,
  GroupList: GroupList
};

exports = ["flatMap", "map", "filter", "group", "sort", "concat", "flatten", "reverse", "unique", "uniq", "union", "intersection", "take"];

exports.forEach(function (fn) {
  return AbstractList.prototype[fn] = function () {
    return Sonic[fn].apply(Sonic, [this].concat(__slice.call(arguments)));
  };
});

module.exports = Sonic;

//# sourceMappingURL=sonic.js.map