(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var AbstractList, uniqueId;

  uniqueId = require('./unique_id');

  AbstractList = (function() {
    function AbstractList() {
      this._byId = {};
      this._prev = {};
      this._next = {};
      this._handlers = {};
    }

    AbstractList.prototype.get = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.has = function(id) {
      return !!id && id in this._byId;
    };

    AbstractList.prototype.prev = function(id) {
      if (id == null) {
        id = 0;
      }
      return this._prev[id] || null;
    };

    AbstractList.prototype.next = function(id) {
      if (id == null) {
        id = 0;
      }
      return this._next[id] || null;
    };

    AbstractList.prototype.onInvalidate = function(handler) {
      return this._handlers[uniqueId()] = handler;
    };

    AbstractList.prototype._splice = function(prev, next, first, last) {
      var _next, _prev;
      if (last == null) {
        last = first;
      }
      if (!((prev === 0 || this.has(prev)) || (next === 0 || this.has(next)))) {
        return false;
      }
      while (_next = this._next[_next || prev]) {
        delete this._next[this._prev[_next]];
        delete this._prev[_next];
        if (_next === next) {
          break;
        }
        delete this._byId[_next];
      }
      while (_prev = this._prev[_prev || next]) {
        delete this._prev[this._next[_prev]];
        delete this._next[_prev];
        if (_prev === prev) {
          break;
        }
        delete this._byId[_prev];
      }
      if ((first != null) && (prev != null)) {
        this._next[prev] = first;
        this._prev[first] = prev;
      }
      if ((last != null) && (next != null)) {
        this._prev[next] = last;
        this._next[last] = next;
      }
      this._invalidate(prev, next);
      return true;
    };

    AbstractList.prototype._add = function(value, prev, next) {
      var id;
      id = uniqueId();
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      if (!this._splice(prev, next, id)) {
        return null;
      }
      this._byId[id] = value;
      return id;
    };

    AbstractList.prototype._set = function(id, value) {
      if (!this.has(id)) {
        return false;
      }
      this._byId[id] = value;
      this._invalidate(this._prev[id], this._next[id]);
      return true;
    };

    AbstractList.prototype._delete = function(id) {
      return id !== 0 && this._splice(this._prev[id], this._next[id], this._next[id], this._prev[id]);
    };

    AbstractList.prototype._move = function(id, prev, next) {
      var oldNext, oldPrev;
      if ((oldPrev = this._prev[id]) != null) {
        this._splice(oldPrev, id);
      }
      if ((oldNext = this._next[id]) != null) {
        this._splice(id, oldNext);
      }
      this._splice(oldPrev, oldNext, oldNext, oldPrev);
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      return this._splice(prev, next, id);
    };

    AbstractList.prototype._invalidate = function(prev, next) {
      var handler, id, _ref, _results;
      _ref = this._handlers;
      _results = [];
      for (id in _ref) {
        handler = _ref[id];
        if (handler(prev, next) === false) {
          _results.push(delete this._handlers[id]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return AbstractList;

  })();

  module.exports = AbstractList;

}).call(this);

//# sourceMappingURL=abstract_list.js.map

},{"./unique_id":9}],2:[function(require,module,exports){
(function() {
  var AbstractList, FlatMapList, Unit,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require('./abstract_list');

  Unit = require('./unit');

  FlatMapList = (function(_super) {
    __extends(FlatMapList, _super);

    function FlatMapList(source, flatMapFn) {
      this._onListInvalidate = __bind(this._onListInvalidate, this);
      this._onSourceInvalidate = __bind(this._onSourceInvalidate, this);
      FlatMapList.__super__.constructor.call(this);
      this._source = source;
      this._source.onInvalidate(this._onSourceInvalidate);
      this._sourceIdById = {};
      this._listBySourceId = {};
      this._flatMapFn = flatMapFn || Sonic.unit;
    }

    FlatMapList.prototype.get = function(id) {
      var list;
      if (list = this._getListById(id)) {
        return list.get(id);
      }
    };

    FlatMapList.prototype.has = function(id) {
      return id in this._sourceIdById || id === 0;
    };

    FlatMapList.prototype.prev = function(id) {
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

    FlatMapList.prototype.next = function(id) {
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

    FlatMapList.prototype._getListById = function(id) {
      var sourceId;
      if (sourceId = this._sourceIdById[id]) {
        return this._getListBySourceId(sourceId);
      }
    };

    FlatMapList.prototype._getListBySourceId = function(sourceId, lazy) {
      var list;
      if (lazy == null) {
        lazy = false;
      }
      if ((list = this._listBySourceId[sourceId]) || lazy) {
        return list;
      }
      if (!this._source.has(sourceId)) {
        return;
      }
      list = this._flatMapFn(this._source.get(sourceId));
      list.onInvalidate((function(_this) {
        return function(event) {
          return _this._onListInvalidate(event, sourceId);
        };
      })(this));
      this._listBySourceId[sourceId] = list;
      return list;
    };

    FlatMapList.prototype._onSourceInvalidate = function(event) {
      var iterator, next, nextList, prev, prevList;
      prev = event.prev;
      if (!(prevList = this._getListBySourceId(prev, {
        lazy: true
      }))) {
        while (!(prevList = this._getListBySourceId(prev, {
            lazy: true
          }))) {
          prev = this._source.prev(prev);
        }
      }
      prev = prevList.prev(0);
      next = event.next;
      if (!(nextList = this._getListBySourceId(next, {
        lazy: true
      }))) {
        while (!(nextList = this._getListBySourceId(next, {
            lazy: true
          }))) {
          next = this._source.next(next);
        }
      }
      next = nextList.next(0);
      iterator = this._source.getIterator(prev);
      while (iterator.moveNext() && iterator.current() !== next) {
        delete this._sourceIdById[iterator.currentId];
      }
      return this._invalidate(prev, next);
    };

    FlatMapList.prototype._onListInvalidate = function(event, sourceId) {
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

}).call(this);

//# sourceMappingURL=flat_map_list.js.map

},{"./abstract_list":1,"./unit":10}],3:[function(require,module,exports){
(function() {
  var FlatMapList, GroupList, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('es6-collections');

  FlatMapList = require('./flat_map_list');

  Unit = require('./unit');

  GroupList = (function(_super) {
    __extends(GroupList, _super);

    function GroupList(source, groupFn) {
      var flatMapFn;
      console.log(JSON.stringify(Object.keys(Map)));
      this._byValue = new Map;
      this._groupFn = groupFn || function(x) {
        return x;
      };
      flatMapFn = function(value) {
        var groupValue, list;
        groupValue = this._groupFn(value);
        if (this._byValue.has(groupValue)) {
          return new Unit();
        }
        list = this._source.filter((function(_this) {
          return function(value) {
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

}).call(this);

//# sourceMappingURL=group_list.js.map

},{"./flat_map_list":2,"./unit":10,"es6-collections":11}],4:[function(require,module,exports){
(function() {
  var Iterator;

  Iterator = (function() {
    function Iterator(list, startId) {
      this.list = list;
      this.currentId = this.startId = startId;
    }

    Iterator.prototype.current = function() {
      return this.list.get(this.currentId);
    };

    Iterator.prototype.reset = function() {
      this.currentId = this.startId;
      return this;
    };

    Iterator.prototype.moveNext = function() {
      this.currentId = this.list.next(this.currentId);
      return this.currentId != null;
    };

    Iterator.prototype.movePrevious = function() {
      this.currentId = this.list.prev(this.currentId);
      return this.currentId != null;
    };

    Iterator.prototype.next = function() {
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

    Iterator.prototype.previous = function() {
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

}).call(this);

//# sourceMappingURL=iterator.js.map

},{}],5:[function(require,module,exports){
(function() {
  var AbstractList, List,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require('./abstract_list');

  List = (function(_super) {
    __extends(List, _super);

    function List(values) {
      var value, _i, _len;
      List.__super__.constructor.call(this);
      this._move(0, 0);
      if (values != null) {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          this._add(value, null, 0);
        }
      }
    }

    List.prototype.set = function(id, value) {
      return this._set(id, value);
    };

    List.prototype.push = function(value) {
      return this._add(value, null, 0);
    };

    List.prototype.unshift = function(value) {
      return this._add(value, 0);
    };

    List.prototype.pop = function() {
      var id, value;
      id = this.prev();
      value = this.get(id);
      if (this._delete(id)) {
        return value;
      }
    };

    List.prototype.shift = function() {
      var id, value;
      id = this.next();
      value = this.get(id);
      if (this._delete(id)) {
        return value;
      }
    };

    List.prototype.remove = function(value) {
      var id;
      id = this.idOf(value);
      return this._delete(id);
    };

    List.prototype["delete"] = function(id) {
      return this._delete(id);
    };

    return List;

  })(AbstractList);

  module.exports = List;

}).call(this);

//# sourceMappingURL=list.js.map

},{"./abstract_list":1}],6:[function(require,module,exports){
(function() {
  var Signal;

  Signal = (function() {
    function Signal(value) {
      this.id = Sonic.uniqueId();
      this._handlers = [];
      this._value = value;
    }

    Signal.prototype.value = function() {
      return this._value;
    };

    Signal.prototype["yield"] = function(value) {
      var index, item, toRemove, _i, _len;
      this._value = value;
      toRemove = [];
      this._handlers.forEach((function(_this) {
        return function(handler) {
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

    Signal.prototype.each = function(handler) {
      return this.forEach(handler);
    };

    Signal.prototype.forEach = function(handler) {
      return this._handlers.push(handler);
    };

    Signal.prototype.root = function() {
      return this;
    };

    return Signal;

  })();

  module.exports = Signal;

}).call(this);

//# sourceMappingURL=signal.js.map

},{}],7:[function(require,module,exports){
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

},{"./abstract_list":1,"./flat_map_list":2,"./group_list":3,"./iterator":4,"./list":5,"./signal":6,"./take_list":8,"./unique_id":9,"./unit":10}],8:[function(require,module,exports){
(function() {
  var AbstractList, TakeList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require("./abstract_list");

  TakeList = (function(_super) {
    __extends(TakeList, _super);

    function TakeList(source, count) {
      this._indexById = {
        0: 0
      };
      this._source = source;
      this._count = count;
      TakeList.__super__.constructor.call(this);
      this._source.onInvalidate((function(_this) {
        return function(event) {
          return _this._invalidate(event.prev);
        };
      })(this));
      this.onInvalidate((function(_this) {
        return function(event) {
          var id, _results;
          _results = [];
          while (id = _this._source.next(id || event.prev)) {
            _results.push(delete _this._indexById[id]);
          }
          return _results;
        };
      })(this));
    }

    TakeList.prototype.get = function(id) {
      return this._source.get(id);
    };

    TakeList.prototype.has = function(id) {
      return this._source.has(id);
    };

    TakeList.prototype.prev = function(id) {
      if (id == null) {
        id = 0;
      }
    };

    TakeList.prototype.next = function(id) {
      var i, next, prev;
      if (id == null) {
        id = 0;
      }
      if ((i = this._indexById[id]) == null) {
        while (prev = this._source.prev(prev || id)) {
          if (i = this._indexById[id]) {
            break;
          }
        }
        while (next = this._source.next(next || prev)) {
          this._indexById[next] = i++;
          if (next === id) {
            break;
          }
        }
      }
      if (i >= this._count) {
        return;
      }
      next = this._source.next(next || id);
      this._indexById[next] = ++i;
      return next;
    };

    return TakeList;

  })(AbstractList);

  module.exports = TakeList;

}).call(this);

//# sourceMappingURL=take_list.js.map

},{"./abstract_list":1}],9:[function(require,module,exports){
(function() {
  var counter;

  counter = 1;

  module.exports = function() {
    return counter++;
  };

}).call(this);

//# sourceMappingURL=unique_id.js.map

},{}],10:[function(require,module,exports){
(function() {
  var List, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  List = require('./list');

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit(value) {
      var values;
      values = arguments.length ? [value] : [];
      Unit.__super__.constructor.call(this, values);
    }

    Unit.prototype.push = function(value) {
      return this._add(value, 0, 0);
    };

    Unit.prototype.unshift = function(value) {
      return this.push(value);
    };

    Unit.prototype.pop = function() {
      var value;
      value = this.last();
      this._splice(0, 0);
      return value;
    };

    Unit.prototype.shift = function() {
      return this.pop();
    };

    return Unit;

  })(List);

  module.exports = Unit;

}).call(this);

//# sourceMappingURL=unit.js.map

},{"./list":5}],11:[function(require,module,exports){
(function (global){
(function (exports) {'use strict';
  //shared pointer
  var i;
  //shortcuts
  var defineProperty = Object.defineProperty, is = function(a,b) { return isNaN(a)? isNaN(b): a === b; };


  //Polyfill global objects
  if (typeof WeakMap == 'undefined') {
    exports.WeakMap = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakMap#clear():
      clear: sharedClear,
      // WeakMap#get(key:void*):void*
      get: sharedGet,
      // WeakMap#has(key:void*):boolean
      has: mapHas,
      // WeakMap#set(key:void*, value:void*):void
      set: sharedSet
    }, true);
  }

  if (typeof Map == 'undefined') {
    exports.Map = createCollection({
      // WeakMap#delete(key:void*):boolean
      'delete': sharedDelete,
      //:was Map#get(key:void*[, d3fault:void*]):void*
      // Map#has(key:void*):boolean
      has: mapHas,
      // Map#get(key:void*):boolean
      get: sharedGet,
      // Map#set(key:void*, value:void*):void
      set: sharedSet,
      // Map#keys(void):Iterator
      keys: sharedKeys,
      // Map#values(void):Iterator
      values: sharedValues,
      // Map#entries(void):Iterator
      entries: mapEntries,
      // Map#forEach(callback:Function, context:void*):void ==> callback.call(context, key, value, mapObject) === not in specs`
      forEach: sharedForEach,
      // Map#clear():
      clear: sharedClear
    });
  }

  if (typeof Set == 'undefined') {
    exports.Set = createCollection({
      // Set#has(value:void*):boolean
      has: setHas,
      // Set#add(value:void*):boolean
      add: sharedAdd,
      // Set#delete(key:void*):boolean
      'delete': sharedDelete,
      // Set#clear():
      clear: sharedClear,
      // Set#keys(void):Iterator
      keys: sharedValues, // specs actually say "the same function object as the initial value of the values property"
      // Set#values(void):Iterator
      values: sharedValues,
      // Set#entries(void):Iterator
      entries: setEntries,
      // Set#forEach(callback:Function, context:void*):void ==> callback.call(context, value, index) === not in specs
      forEach: sharedSetIterate
    });
  }

  if (typeof WeakSet == 'undefined') {
    exports.WeakSet = createCollection({
      // WeakSet#delete(key:void*):boolean
      'delete': sharedDelete,
      // WeakSet#add(value:void*):boolean
      add: sharedAdd,
      // WeakSet#clear():
      clear: sharedClear,
      // WeakSet#has(value:void*):boolean
      has: setHas
    }, true);
  }


  /**
   * ES6 collection constructor
   * @return {Function} a collection class
   */
  function createCollection(proto, objectOnly){
    function Collection(a){
      if (!this || this.constructor !== Collection) return new Collection(a);
      this._keys = [];
      this._values = [];
      this.objectOnly = objectOnly;

      //parse initial iterable argument passed
      if (a) init.call(this, a);
    }

    //define size for non object-only collections
    if (!objectOnly) {
      defineProperty(proto, 'size', {
        get: sharedSize
      });
    }

    //set prototype
    proto.constructor = Collection;
    Collection.prototype = proto;

    return Collection;
  }


  /** parse initial iterable argument passed */
  function init(a){
    var i;
    //init Set argument, like `[1,2,3,{}]`
    if (this.add)
      a.forEach(this.add, this);
    //init Map argument like `[[1,2], [{}, 4]]`
    else
      a.forEach(function(a){this.set(a[0],a[1])}, this);
  }


  /** delete */
  function sharedDelete(key) {
    if (this.has(key)) {
      this._keys.splice(i, 1);
      this._values.splice(i, 1);
    }
    // Aurora here does it while Canary doesn't
    return -1 < i;
  };

  function sharedGet(key) {
    return this.has(key) ? this._values[i] : undefined;
  }

  function has(list, key) {
    if (this.objectOnly && key !== Object(key))
      throw new TypeError("Invalid value used as weak collection key");
    //NaN or 0 passed
    if (key != key || key === 0) for (i = list.length; i-- && !is(list[i], key);){}
    else i = list.indexOf(key);
    return -1 < i;
  }

  function setHas(value) {
    return has.call(this, this._values, value);
  }

  function mapHas(value) {
    return has.call(this, this._keys, value);
  }

  /** @chainable */
  function sharedSet(key, value) {
    this.has(key) ?
      this._values[i] = value
      :
      this._values[this._keys.push(key) - 1] = value
    ;
    return this;
  }

  /** @chainable */
  function sharedAdd(value) {
    if (!this.has(value)) this._values.push(value);
    return this;
  }

  function sharedClear() {
    this._values.length = 0;
  }

  /** keys, values, and iterate related methods */
  function sharedKeys() {
    return sharedIterator(this._keys);
  }

  function sharedValues() {
    return sharedIterator(this._values);
  }

  function mapEntries() {
    return sharedIterator(this._keys, this._values);
  }

  function setEntries() {
    return sharedIterator(this._values, this._values);
  }

  function sharedIterator(array, array2) {
    var j = 0, done = false;
    return {
      next: function() {
        var v;
        if (!done && j < array.length) {
          v = array2 ? [array[j], array2[j]]: array[j];
          j += 1;
        } else {
          done = true;
        }
        return { done: done, value: v };
      }
    };
  }

  function sharedSize() {
    return this._values.length;
  }

  function sharedForEach(callback, context) {
    var self = this;
    var values = self._values.slice();
    self._keys.slice().forEach(function(key, n){
      callback.call(context, values[n], key, self);
    });
  }

  function sharedSetIterate(callback, context) {
    var self = this;
    self._values.slice().forEach(function(value){
      callback.call(context, value, value, self);
    });
  }

})(typeof exports != 'undefined' && typeof global != 'undefined' ? global : window );

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[7])(7)
});