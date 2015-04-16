(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  var AbstractList, key, uniqueId, utilities, value;

  uniqueId = require('./unique_id');

  utilities = require('./utilities');

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
      var handlerId;
      handlerId = uniqueId();
      this._handlers[handlerId] = handler;
      return handlerId;
    };

    AbstractList.prototype.removeListener = function(handlerId) {
      if (!this._handlers[handlerId]) {
        return false;
      }
      delete this._handlers[handlerId];
      return true;
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
      this._byId[id] = value;
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      this._splice(prev, next, id);
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
      var handler, handlers, id, _results;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      handlers = this._handlers;
      _results = [];
      for (id in handlers) {
        handler = handlers[id];
        _results.push((function(id, handler) {
          return setTimeout(function() {
            if (handler(prev, next) === false) {
              return delete handlers[id];
            }
          }, 0);
        })(id, handler));
      }
      return _results;
    };

    return AbstractList;

  })();

  for (key in utilities) {
    value = utilities[key];
    AbstractList.prototype[key] = value;
  }

  module.exports = AbstractList;

}).call(this);

//# sourceMappingURL=abstract_list.js.map

},{"./unique_id":9,"./utilities":11}],2:[function(require,module,exports){
(function() {
  var AbstractList, List, Unit;

  AbstractList = require('./abstract_list');

  List = require('./list');

  Unit = require('./unit');

  module.exports = function(items) {
    if (items instanceof AbstractList) {
      return items;
    } else if (Array.isArray(items)) {
      return new List(items);
    } else if (arguments.length) {
      return new Unit(items);
    } else {
      return new Unit();
    }
  };

}).call(this);

//# sourceMappingURL=factory.js.map

},{"./abstract_list":1,"./list":6,"./unit":10}],3:[function(require,module,exports){
(function() {
  var AbstractList, FlatMapList, Unit, factory,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  factory = require('./factory');

  AbstractList = require('./abstract_list');

  Unit = require('./unit');

  FlatMapList = (function(_super) {
    __extends(FlatMapList, _super);

    function FlatMapList(source, flatMapFn) {
      this._onFlatMapFnInvalidate = __bind(this._onFlatMapFnInvalidate, this);
      this._onListInvalidate = __bind(this._onListInvalidate, this);
      this._onSourceInvalidate = __bind(this._onSourceInvalidate, this);
      FlatMapList.__super__.constructor.call(this);
      this._sourceIdById = {};
      this._listBySourceId = {};
      this._source = factory(source);
      this._source.onInvalidate(this._onSourceInvalidate);
      this._flatMapFn = factory(flatMapFn || function(value) {
        return new Unit(value);
      });
      this._flatMapFn.onInvalidate(this._onFlatMapFnInvalidate);
    }

    FlatMapList.prototype.get = function(id) {
      var list;
      if (list = this._getListById(id)) {
        return list.get(id);
      }
    };

    FlatMapList.prototype.has = function(id) {
      return !!id && id in this._sourceIdById;
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
        return null;
      }
      list = this._getListBySourceId(sourceId);
      prev = list.prev(id);
      while (!prev) {
        if (!(sourceId = this._source.prev(sourceId))) {
          return null;
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
        return null;
      }
      list = this._getListBySourceId(sourceId);
      next = list.next(id);
      while (!next) {
        if (!(sourceId = this._source.next(sourceId))) {
          return null;
        }
        list = this._getListBySourceId(sourceId);
        next = list.next();
      }
      this._sourceIdById[next] = sourceId;
      return next;
    };

    FlatMapList.prototype._getListBySourceId = function(sourceId) {
      var list;
      if (list = this._listBySourceId[sourceId]) {
        return list;
      }
      if (!this._source.has(sourceId)) {
        return;
      }
      list = this._flatMapFn.last()(this._source.get(sourceId));
      list.onInvalidate((function(_this) {
        return function(prev, next) {
          return _this._onListInvalidate(sourceId, prev, next);
        };
      })(this));
      this._listBySourceId[sourceId] = list;
      return list;
    };

    FlatMapList.prototype._getListById = function(id) {
      return this._getListBySourceId(this._sourceIdById[id]);
    };

    FlatMapList.prototype._onSourceInvalidate = function(sourcePrev, sourceNext) {
      var next, nextList, prev, prevList;
      while (sourcePrev = this._source.prev(sourcePrev)) {
        if (prevList = this._listBySourceId[sourcePrev]) {
          break;
        }
      }
      prev = (prevList != null ? prevList.prev() : void 0) || 0;
      while (sourceNext = this._source.next(sourceNext)) {
        if (nextList = this._listBySourceId[sourceNext]) {
          break;
        }
      }
      next = (nextList != null ? nextList.next() : void 0) || 0;
      this._invalidate(prev, next);
      return true;
    };

    FlatMapList.prototype._onListInvalidate = function(sourceId, prev, next) {
      var list, _ref, _ref1;
      if (!(list = this._listBySourceId[sourceId])) {
        return false;
      }
      prev || (prev = ((_ref = this._getListBySourceId(this._source.prev(sourceId))) != null ? _ref.prev() : void 0) || 0);
      next || (next = ((_ref1 = this._getListBySourceId(this._source.next(sourceId))) != null ? _ref1.next() : void 0) || 0);
      this._invalidate(prev, next);
      return true;
    };

    FlatMapList.prototype._onFlatMapFnInvalidate = function(prev, next) {
      if (!next) {
        this._invalidate();
      }
      return true;
    };

    FlatMapList.prototype._invalidate = function(prev, next) {
      var sourceNext, sourcePrev;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      sourcePrev = this._sourceIdById[prev];
      sourceNext = this._sourceIdById[next];
      while (sourcePrev = this._source.next(sourcePrev)) {
        if (sourcePrev === sourceNext) {
          break;
        }
        delete this._listBySourceId[sourcePrev];
      }
      while (sourceNext = this._source.next(sourceNext)) {
        if (sourceNext === sourcePrev) {
          break;
        }
        delete this._listBySourceId[sourceNext];
      }
      return FlatMapList.__super__._invalidate.call(this, prev, next);
    };

    return FlatMapList;

  })(AbstractList);

  module.exports = FlatMapList;

}).call(this);

//# sourceMappingURL=flat_map_list.js.map

},{"./abstract_list":1,"./factory":2,"./unit":10}],4:[function(require,module,exports){
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

},{"./flat_map_list":3,"./unit":10,"es6-collections":12}],5:[function(require,module,exports){
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
      return !!this.currentId;
    };

    Iterator.prototype.movePrevious = function() {
      this.currentId = this.list.prev(this.currentId);
      return !!this.currentId;
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

},{}],6:[function(require,module,exports){
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
      this._next[0] = 0;
      this._prev[0] = 0;
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

},{"./abstract_list":1}],7:[function(require,module,exports){
(function() {
  var AbstractList, RangeList, factory,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  factory = require("./factory");

  AbstractList = require("./abstract_list");

  RangeList = (function(_super) {
    __extends(RangeList, _super);

    function RangeList(source, start, count) {
      this._onCountInvalidate = __bind(this._onCountInvalidate, this);
      this._onStartInvalidate = __bind(this._onStartInvalidate, this);
      this._onSourceInvalidate = __bind(this._onSourceInvalidate, this);
      RangeList.__super__.constructor.call(this);
      this._indexById = {};
      this._idByIndex = {};
      this._source = factory(source);
      this._source.onInvalidate(this._onSourceInvalidate);
      this._start = factory(start || 0);
      this._start.onInvalidate(this._onStartInvalidate);
      this._count = factory(count || 0);
      this._count.onInvalidate(this._onCountInvalidate);
      start = this._start.last();
      this._indexById[0] = -start - 1;
      this._idByIndex[-start - 1] = 0;
    }

    RangeList.prototype.get = function(id) {
      return this._source.get(id);
    };

    RangeList.prototype.has = function(id) {
      var count, start, _ref;
      start = this._start.last();
      count = this._count.last();
      return (0 <= (_ref = this._indexById[id]) && _ref < count);
    };

    RangeList.prototype.prev = function(id) {
      var count, index, next, _ref;
      if (id == null) {
        id = 0;
      }
      count = this._count.last();
      if (id === 0) {
        return this._idByIndex[count - 1] || this.idAt(count - 1);
      }
      if ((index = this._indexById[id]) != null) {
        if ((0 <= (_ref = index - 1) && _ref < count)) {
          return this._idByIndex[index - 1];
        } else {
          return null;
        }
      }
      while (next = this.next(next)) {
        if (next === id) {
          return this._source.prev(next);
        }
      }
      return null;
    };

    RangeList.prototype.next = function(id) {
      var count, current, index, next, _ref;
      if (id == null) {
        id = 0;
      }
      current = id;
      count = this._count.last();
      index = (_ref = this._indexById[id]) != null ? _ref : -this._start.last() - 1;
      while (++index < count) {
        if (!(next = this._idByIndex[index])) {
          this._idByIndex[index] = next = this._source.next(current);
          this._indexById[next] = index;
        }
        if ((id && current === id) || (!id && index === 0)) {
          return next;
        }
        current = next;
      }
      return null;
    };

    RangeList.prototype._onSourceInvalidate = function(prev, next) {
      if (prev in this._indexById) {
        this._invalidate(prev);
      }
      return true;
    };

    RangeList.prototype._onStartInvalidate = function(prev, next) {
      var start;
      if (next === 0) {
        start = this._start.last();
        this._invalidate();
        this._indexById[0] = -start - 1;
        this._idByIndex[-start - 1] = 0;
      }
      return true;
    };

    RangeList.prototype._onCountInvalidate = function(prev, next) {
      var count, id;
      if (next === 0) {
        count = this._count.last();
        if (id = this._idByIndex[count]) {
          this.invalidate(id);
        }
      }
      return true;
    };

    RangeList.prototype._invalidate = function(prev, next) {
      var id, index;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      if (!(index = this._indexById[prev])) {
        return;
      }
      while (id = this._idByIndex[++index]) {
        delete this._idByIndex[index];
        delete this._indexById[id];
      }
      return RangeList.__super__._invalidate.call(this, prev, 0);
    };

    return RangeList;

  })(AbstractList);

  module.exports = RangeList;

}).call(this);

//# sourceMappingURL=range_list.js.map

},{"./abstract_list":1,"./factory":2}],8:[function(require,module,exports){
(function() {
  var Sonic, key, value, _fn, _ref,
    __slice = [].slice;

  Sonic = function() {
    return Sonic.factory.apply(Sonic, arguments);
  };

  Sonic.unit = function(item) {
    return new Sonic.Unit(item);
  };

  Sonic.empty = function() {
    return new Sonic.Unit();
  };

  Sonic.utilities = require('./utilities');

  Sonic.uniqueId = require('./unique_id');

  Sonic.factory = require('./factory');

  Sonic.Iterator = require('./iterator');

  Sonic.AbstractList = require('./abstract_list');

  Sonic.List = require('./list');

  Sonic.Unit = require('./unit');

  Sonic.FlatMapList = require('./flat_map_list');

  Sonic.GroupList = require('./group_list');

  Sonic.RangeList = require('./range_list');

  _ref = Sonic.utilities;
  _fn = (function(_this) {
    return function(key, value) {
      if (value instanceof Function) {
        return Sonic[key] = function() {
          var args, list;
          list = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
          return value.apply(Sonic.factory(list), args);
        };
      } else {
        return Sonic[key] = value;
      }
    };
  })(this);
  for (key in _ref) {
    value = _ref[key];
    _fn(key, value);
  }

  module.exports = Sonic;

}).call(this);

//# sourceMappingURL=sonic.js.map

},{"./abstract_list":1,"./factory":2,"./flat_map_list":3,"./group_list":4,"./iterator":5,"./list":6,"./range_list":7,"./unique_id":9,"./unit":10,"./utilities":11}],9:[function(require,module,exports){
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

},{"./list":6}],11:[function(require,module,exports){
(function() {
  var __slice = [].slice;

  module.exports = {
    getIterator: function(start) {
      var Iterator;
      Iterator = require('./iterator');
      return new Iterator(this, start);
    },
    each: function(fn) {
      return this.forEach(fn);
    },
    forEach: function(fn) {
      var id;
      while (id = this.next(id)) {
        if (fn(this.get(id), id) === false) {
          return false;
        }
      }
      return true;
    },
    findId: function(fn) {
      var result;
      result = void 0;
      this.forEach(function(value, id) {
        if (fn(value)) {
          result = id;
          return false;
        }
      });
      return result;
    },
    find: function(fn) {
      return this.get(this.findId(fn));
    },
    idAt: function(index) {
      var i;
      i = 0;
      return this.findId(function() {
        if (i++ === index) {
          return true;
        }
      });
    },
    idOf: function(value) {
      return this.findId(function(v) {
        return v === value;
      });
    },
    at: function(index) {
      return this.get(this.idAt(index));
    },
    indexOf: function(value) {
      var i;
      i = -1;
      if (this.some(function(v) {
        i++;
        return v === value;
      })) {
        return i;
      }
      return -1;
    },
    some: function(predicate) {
      return !this.each(function() {
        return !predicate.apply(null, arguments);
      });
    },
    any: function(predicate) {
      return this.some(predicate);
    },
    contains: function(value) {
      return this.some(function(v) {
        return v === value;
      });
    },
    first: function() {
      return this.get(this.next());
    },
    last: function() {
      return this.get(this.prev());
    },
    reduce: function(reduceFn, memo) {
      this.each(function(value, id) {
        return reduceFn(memo, value, id);
      });
      return memo;
    },
    flatMap: function(flatMapFn) {
      var FlatMapList;
      FlatMapList = require('./flat_map_list');
      return new FlatMapList(this, flatMapFn);
    },
    group: function(groupFn) {
      var GroupList;
      GroupList = require('./group_list');
      return new GroupList(this, groupFn);
    },
    range: function(start, count) {
      var RangeList;
      RangeList = require('./range_list');
      return new RangeList(this, start, count);
    },
    take: function(count) {
      return this.range(0, count);
    },
    map: function(mapFn) {
      var Unit, factory, flatMapFn;
      factory = require('./factory');
      Unit = require('./unit');
      flatMapFn = factory(mapFn).flatMap(function(mapFn) {
        return new Unit(function(value) {
          return new Unit(mapFn(value));
        });
      });
      return this.flatMap(flatMapFn);
    },
    pluck: function(key) {
      var factory, mapFn;
      factory = require('./factory');
      mapFn = factory(key).map(function(key) {
        return function(value) {
          return value[key];
        };
      });
      return this.map(mapFn);
    },
    invoke: function() {
      var args, factory, key, mapFn;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      factory = require('./factory');
      mapFn = factory(key).map(function(key) {
        return function(value) {
          return value[key].apply(value, args);
        };
      });
      return this.map(mapFn);
    },
    filter: function(filterFn) {
      var Unit, factory, flatMapFn;
      factory = require('./factory');
      Unit = require('./unit');
      flatMapFn = factory(filterFn).map(function(filterFn) {
        return function(value) {
          return filterFn(value) && new Unit(value) || new Unit();
        };
      });
      return this.flatMap(flatMapFn);
    },
    append: function(lists) {
      var Unit, factory;
      factory = require('./factory');
      Unit = require('./unit');
      return factory([new Unit(this), factory(lists)]).flatten().flatten();
    },
    concat: function() {
      var lists;
      lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.append(lists);
    },
    flatten: function() {
      return this.flatMap(function(list) {
        return list;
      });
    },
    uniq: function(groupFn) {
      if (groupFn == null) {
        groupFn = function(x) {
          return x;
        };
      }
      return this.group(groupFn).flatMap(function(list) {
        return list.take(1);
      });
    },
    union: function(lists) {
      return this.concat(lists).uniq();
    },
    intersection: function(other) {
      return this.filter(other.contains);
    },
    proxy: function(fns) {
      var AbstractList, fn, key, proxy;
      if (fns == null) {
        fns = {
          'get': 'get',
          'has': 'has',
          'prev': 'prev',
          'next': 'next',
          'onInvalidate': 'onInvalidate'
        };
      }
      AbstractList = require('./abstract_list');
      proxy = new AbstractList;
      for (key in fns) {
        fn = fns[key];
        proxy[key] = this[fn].bind(this);
      }
      return proxy;
    },
    reverse: function() {
      var fns, proxy;
      fns = {
        'get': 'get',
        'has': 'has',
        'prev': 'next',
        'next': 'prev'
      };
      proxy = this.proxy(fns);
      proxy.onInvalidate = (function(_this) {
        return function(callback) {
          return _this.onInvalidate(function(prev, next) {
            return callback(next, prev);
          });
        };
      })(this);
      return proxy;
    },
    toArray: function() {
      return this.reduce((function(memo, value) {
        return memo.push(value);
      }), []);
    }
  };

}).call(this);

//# sourceMappingURL=utilities.js.map

},{"./abstract_list":1,"./factory":2,"./flat_map_list":3,"./group_list":4,"./iterator":5,"./range_list":7,"./unit":10}],12:[function(require,module,exports){
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
},{}]},{},[8])(8)
});