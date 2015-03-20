(function() {
  var AbstractList, FlatMapList, GroupList, Iterator, List, Signal, Sonic, TakeList, Unit, fns, uniqueId,
    __slice = [].slice;

  uniqueId = require('./unique_id');

  Signal = require('./signal');

  Iterator = require('./iterator');

  AbstractList = require('./abstract_list');

  List = require('./list');

  Unit = require('./unit');

  FlatMapList = require('./flat_map_list');

  GroupList = require('./group_list');

  TakeList = require('./take_list');

  Sonic = function(items) {
    if (items == null) {
      items = [];
    }
    if (items instanceof AbstractList) {
      return items;
    }
    return new List(items);
  };

  Sonic.unit = function(item) {
    return new Unit(item);
  };

  Sonic.empty = function() {
    return new Unit();
  };

  Sonic.getIterator = function(list, start) {
    list = Sonic(list);
    return new Iterator(list, start);
  };

  Sonic.each = function(list, fn) {
    list = Sonic(list);
    return Sonic.forEach(list, fn);
  };

  Sonic.forEach = function(list, fn) {
    var iterator;
    list = Sonic(list);
    iterator = Sonic.getIterator(list);
    while (iterator.moveNext()) {
      if (fn(iterator.current(), iterator.currentId) === false) {
        return false;
      }
    }
    return true;
  };

  Sonic.findId = function(list, fn) {
    var result;
    list = Sonic(list);
    result = void 0;
    Sonic.each(list, function(value, id) {
      if (fn(value)) {
        result = id;
        return false;
      }
    });
    return result;
  };

  Sonic.find = function(list, fn) {
    list = Sonic(list);
    return list.get(Sonic.findId(list, fn));
  };

  Sonic.idAt = function(list, index) {
    var i;
    list = Sonic(list);
    i = 0;
    return Sonic.findId(list, function() {
      if (i++ === index) {
        return true;
      }
    });
  };

  Sonic.idOf = function(list, value) {
    list = Sonic(list);
    return Sonic.findId(list, function(v) {
      return v === value;
    });
  };

  Sonic.at = function(list, index) {
    list = Sonic(list);
    return list.get(Sonic.idAt(list, index));
  };

  Sonic.indexOf = function(list, value) {
    var i;
    list = Sonic(list);
    i = -1;
    if (Sonic.some(list, function(v) {
      i++;
      return v === value;
    })) {
      return i;
    } else {
      return -1;
    }
  };

  Sonic.some = function(list, predicate) {
    list = Sonic(list);
    return !Sonic.each(list, function() {
      return !predicate.apply(null, arguments);
    });
  };

  Sonic.any = function(list, predicate) {
    list = Sonic(list);
    return Sonic.some(list, predicate);
  };

  Sonic.contains = function(list, value) {
    list = Sonic(list);
    return Sonic.some(list, function(v) {
      return v === value;
    });
  };

  Sonic.first = function(list) {
    list = Sonic(list);
    return list.get(list.next());
  };

  Sonic.last = function(list) {
    list = Sonic(list);
    return list.get(list.prev());
  };

  Sonic.reduce = function(list, reduceFn, memo) {
    list = Sonic(list);
    Sonic.each(list, function(value, id) {
      return reduceFn(memo, value, id);
    });
    return memo;
  };

  Sonic.flatMap = function(list, flatMapFn) {
    list = Sonic(list);
    return new FlatMapList(list, flatMapFn);
  };

  Sonic.group = function(list, groupFn) {
    list = Sonic(list);
    return new GroupList(list, groupFn);
  };

  Sonic.sort = function(list, sortFn) {
    list = Sonic(list);
    return new SortedList(list, {
      sortFn: sortFn
    });
  };

  Sonic.take = function(list, count) {
    list = Sonic(list);
    return new TakeList(list, count);
  };

  Sonic.map = function(list, mapFn) {
    list = Sonic(list);
    return Sonic.flatMap(list, function(value) {
      return new Unit(mapFn(value));
    });
  };

  Sonic.pluck = function(list, key) {
    list = Sonic(list);
    return Sonic.map(list, function(value) {
      return value[key];
    });
  };

  Sonic.invoke = function() {
    var args, key, list;
    list = arguments[0], key = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    list = Sonic(list);
    return Sonic.map(list, function(value) {
      return value[key].apply(value, args);
    });
  };

  Sonic.filter = function(list, filterFn) {
    list = Sonic(list);
    return Sonic.flatMap(list, function(value) {
      if (filterFn(value)) {
        return new Unit(value);
      } else {
        return new Unit();
      }
    });
  };

  Sonic.concat = function() {
    var list, lists;
    lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    list = Sonic(list);
    return Sonic.flatMap(lists, function(list) {
      return list;
    });
  };

  Sonic.flatten = function(list) {
    list = Sonic(list);
    return Sonic.flatMap(list, function(list) {
      return list;
    });
  };

  Sonic.uniq = function(list, groupFn) {
    if (groupFn == null) {
      groupFn = function(x) {
        return x;
      };
    }
    list = Sonic(list);
    return Sonic.flatMap(Sonic.group(list, groupFn), function(list) {
      return list.take(1);
    });
  };

  Sonic.union = function() {
    var list, lists;
    lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    list = Sonic(list);
    return Sonic.concat.apply(Sonic, lists).uniq();
  };

  Sonic.intersection = function(list, other) {
    list = Sonic(list);
    return Sonic.filter(list, other.contains);
  };

  Sonic.proxy = function(list, fns) {
    var fn, key, proxy;
    if (fns == null) {
      fns = {
        'get': 'get',
        'has': 'has',
        'prev': 'prev',
        'next': 'next',
        'onInvalidate': 'onInvalidate'
      };
    }
    list = Sonic(list);
    proxy = new AbstractList;
    for (key in fns) {
      fn = fns[key];
      proxy[key] = list[fn].bind(list);
    }
    return proxy;
  };

  Sonic.reverse = function(list) {
    var fns, proxy;
    list = Sonic(list);
    fns = {
      'get': 'get',
      'has': 'has',
      'prev': 'next',
      'next': 'prev'
    };
    proxy = Sonic.proxy(list, fns);
    proxy.onInvalidate = function(callback) {
      return list.onInvalidate(function(event) {
        return callback({
          prev: event.next,
          next: event.prev
        });
      });
    };
    return proxy;
  };

  Sonic.toArray = function(list) {
    list = Sonic(list);
    return Sonic.reduce(list, (function(memo, value) {
      return memo.push(value);
    }), []);
  };

  Sonic.uniqueId = uniqueId;

  Sonic.Signal = Signal;

  Sonic.Iterator = Iterator;

  Sonic.AbstractList = AbstractList;

  Sonic.Unit = Unit;

  Sonic.List = List;

  Sonic.FlatMapList = FlatMapList;

  Sonic.GroupList = GroupList;

  Sonic.TakeList = TakeList;

  fns = ['getIterator', 'each', 'forEach', 'at', 'idAt', 'idOf', 'indexOf', 'contains', 'any', 'some', 'find', 'reduce', 'first', 'last', 'toArray', 'flatMap', 'group', 'sort', 'take', 'map', 'pluck', 'invoke', 'filter', 'concat', 'flatten', 'uniq', 'union', 'intersection', 'proxy', 'reverse'];

  fns.forEach(function(fn) {
    return AbstractList.prototype[fn] = function() {
      return Sonic[fn].apply(Sonic, [this].concat(__slice.call(arguments)));
    };
  });

  module.exports = Sonic;

}).call(this);

//# sourceMappingURL=sonic.js.map
