(function() {
  var AbstractList, FlatMapList, Iterator, List, Signal, Sonic, Unit,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Sonic = {
    _uniqueCounter: 1,
    create: function(items) {
      if (items == null) {
        items = [];
      }
      if (items instanceof AbstractList) {
        return items;
      }
      return new List(items);
    },
    unit: function(item) {
      return new Unit(item);
    },
    empty: function() {
      return new Unit();
    },
    uniqueId: function() {
      return Sonic._uniqueCounter++;
    }
  };

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

  AbstractList = (function() {
    function AbstractList() {
      this._byId = {};
      this._prev = {};
      this._next = {};
      this.events = new Signal;
    }

    AbstractList.prototype._add = function(value, options) {
      var id;
      if (options && (options.id != null)) {
        id = options.id;
      } else {
        id = Sonic.uniqueId();
      }
      this._byId[id] = value;
      if (options && ((options.prev != null) || (options.next != null))) {
        this._move(id, options);
      }
      return id;
    };

    AbstractList.prototype._set = function(id, value) {
      if (!(id !== 0 && this.has(id))) {
        return false;
      }
      this._byId[id] = value;
      this._invalidate(this._prev[id], this._next[id]);
      return true;
    };

    AbstractList.prototype._delete = function(id) {
      if (!(id !== 0 && this._remove(id))) {
        return false;
      }
      delete this._byId[id];
      delete this._next[id];
      delete this._prev[id];
      return true;
    };

    AbstractList.prototype._remove = function(id) {
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
      if ((next != null) || (prev != null)) {
        this._invalidate(prev, next);
      }
      return true;
    };

    AbstractList.prototype._move = function(id, options) {
      var next, prev;
      if (!this.has(id)) {
        return false;
      }
      this._remove(id);
      prev = options.prev;
      next = options.next;
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
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
      this._invalidate(prev, next);
      return true;
    };

    AbstractList.prototype.getIterator = function(start) {
      return new Iterator(this, start);
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

    AbstractList.prototype.get = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.has = function(id) {
      return id in this._byId || id === 0;
    };

    AbstractList.prototype.idAt = function(index) {
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

    AbstractList.prototype.at = function(index) {
      var id;
      if (id = this.idAt(index)) {
        return this.get(id);
      }
      return void 0;
    };

    AbstractList.prototype.idOf = function(value) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (iterator.current() === value) {
          return iterator.currentId;
        }
      }
      return void 0;
    };

    AbstractList.prototype.indexOf = function(value, limit) {
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

    AbstractList.prototype.contains = function(value, limit) {
      if (limit == null) {
        limit = Infinity;
      }
      return this.indexOf(value, limit) !== -1;
    };

    AbstractList.prototype.forEach = function(fn) {
      return this.each(fn);
    };

    AbstractList.prototype.each = function(fn) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (fn(iterator.current()) === false) {
          return false;
        }
      }
      return true;
    };

    AbstractList.prototype.any = function(predicate) {
      return this.some(predicate);
    };

    AbstractList.prototype.some = function(predicate) {
      var index, _i, _ref;
      for (index = _i = 0, _ref = this.length(); 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
        if (predicate(this.at(index))) {
          return true;
        }
      }
      return false;
    };

    AbstractList.prototype.find = function(fn) {
      var result;
      result = void 0;
      this.each(function(value) {
        if (fn(value)) {
          result = value;
          return false;
        }
      });
      return result;
    };

    AbstractList.prototype.reduce = function(reduceFn, memo) {
      if (memo == null) {
        memo = 0;
      }
      this.each(function(value) {
        return memo = reduceFn(value, memo);
      });
      return memo;
    };

    AbstractList.prototype.flatMap = function(flatMapFn) {
      return new FlatMapList(this, flatMapFn);
    };

    AbstractList.prototype.map = function(mapFn) {
      return this.flatMap(function(value) {
        return Sonic.unit(mapFn(value));
      });
    };

    AbstractList.prototype.filter = function(filterFn) {
      return this.flatMap(function(value) {
        if (filterFn(value)) {
          return Sonic.unit(value);
        } else {
          return Sonic.empty();
        }
      });
    };

    AbstractList.prototype.sort = function(sortFn) {
      return new SortedList(this, {
        sortFn: sortFn
      });
    };

    AbstractList.prototype.concat = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new FlatMapList([this].concat(others), function(list) {
        return list;
      });
    };

    AbstractList.prototype.flatten = function() {
      return this.flatMap(function(list) {
        return list;
      });
    };

    AbstractList.prototype.reverse = function() {
      return new ReversedList(this);
    };

    AbstractList.prototype.unique = function() {
      return this.uniq();
    };

    AbstractList.prototype.uniq = function() {
      return new UniqueList(this);
    };

    AbstractList.prototype.duplicates = function() {
      var duplicates, iterated, iterator, value;
      iterated = [];
      duplicates = [];
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        value = iterator.current();
        if (__indexOf.call(iterated, value) >= 0) {
          duplicates.push(value);
        } else {
          iterated.push(value);
        }
      }
      return Sonic.create(duplicates);
    };

    AbstractList.prototype.union = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.concat.apply(this, others).uniq();
    };

    AbstractList.prototype.intersection = function(other) {
      return this.filter(other.contains);
    };

    AbstractList.prototype.take = function(count) {
      return new TakeList(this, count);
    };

    AbstractList.prototype.first = function() {
      return this.get(this.next());
    };

    AbstractList.prototype.skip = function(count) {
      return this.rest(count);
    };

    AbstractList.prototype.tail = function(count) {
      return this.rest(count);
    };

    AbstractList.prototype.drop = function(count) {
      return this.rest(count);
    };

    AbstractList.prototype.rest = function(count) {};

    AbstractList.prototype.initial = function(count) {};

    AbstractList.prototype.last = function(count) {
      return this.get(this.prev());
    };

    AbstractList.prototype.pluck = function(key) {
      return this.map(function(value) {
        return value[key];
      });
    };

    AbstractList.prototype.invoke = function() {
      var args, key;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.map(function(value) {
        return value[key].apply(value, args);
      });
    };

    AbstractList.prototype.toArray = function() {
      var values;
      values = [];
      this.each(function(value) {
        return values.push(value);
      });
      return values;
    };

    AbstractList.prototype._invalidate = function(prev, next) {
      var event;
      event = {
        type: 'invalidate',
        list: this
      };
      if (prev != null) {
        event.prev = prev;
      }
      if (next != null) {
        event.next = next;
      }
      return this.events["yield"](event);
    };

    return AbstractList;

  })();

  List = (function(_super) {
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

    List.prototype.set = function(id, value) {
      return this._set(id, value);
    };

    List.prototype.push = function(value) {
      return this._add(value, {
        next: 0
      });
    };

    List.prototype.unshift = function(value) {
      return this._add(value, {
        prev: 0
      });
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

    List.prototype.add = function(value) {
      return this.push(value);
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

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit(value) {
      Unit.__super__.constructor.apply(this, arguments);
      this._id = Sonic.uniqueId();
      if (arguments.length) {
        this._add(value, {
          id: this._id,
          next: 0,
          prev: 0
        });
      }
    }

    Unit.prototype.set = function(value) {
      return this._set(this._id, value);
    };

    Unit.prototype["delete"] = function() {
      return this._delete(this._id);
    };

    Unit.prototype.get = function() {
      return Unit.__super__.get.call(this, this._id);
    };

    Unit.prototype.has = function() {
      return Unit.__super__.has.call(this, this._id);
    };

    return Unit;

  })(AbstractList);

  FlatMapList = (function(_super) {
    __extends(FlatMapList, _super);

    function FlatMapList(origin, flatMapFn) {
      this._onSourceEvent = __bind(this._onSourceEvent, this);
      this._onOriginEvent = __bind(this._onOriginEvent, this);
      this._sourceIdById = {};
      this._sourceBySourceId = {};
      FlatMapList.__super__.constructor.call(this);
      this._origin = Sonic.create(origin);
      this._origin.events.forEach(this._onOriginEvent);
      this._flatMapFn = flatMapFn || function(value) {
        return Sonic.unit(value);
      };
    }

    FlatMapList.prototype._getSourceBySourceId = function(sourceId) {
      var source, value;
      if (!this._origin.has(sourceId)) {
        return;
      }
      if (!(source = this._sourceBySourceId[sourceId])) {
        value = this._origin.get(sourceId);
        source = this._flatMapFn(value);
        source.events.forEach(function(event) {
          return this._onSourceEvent(event, sourceId);
        });
        this._sourceBySourceId[sourceId] = source;
      }
      return source;
    };

    FlatMapList.prototype.get = function(id) {
      var source;
      if (source = this._getSourceBySourceId(this._sourceIdById[id])) {
        return source.get(id);
      }
    };

    FlatMapList.prototype.has = function(id) {
      return this._sourceIdById.hasOwnProperty(id);
    };

    FlatMapList.prototype.prev = function(id) {
      var prevId, source, sourceId;
      if (id == null) {
        id = 0;
      }
      sourceId = id !== 0 ? this._sourceIdById[id] : this._origin.prev();
      if (!sourceId) {
        return null;
      }
      source = this._getSourceBySourceId(sourceId);
      prevId = source.prev(id);
      while (!prevId) {
        if (!(sourceId = this._origin.prev(sourceId))) {
          return null;
        }
        source = this._getSourceBySourceId(sourceId);
        prevId = source.prev();
      }
      this._sourceIdById[prevId] = sourceId;
      return prevId;
    };

    FlatMapList.prototype.next = function(id) {
      var nextId, source, sourceId;
      if (id == null) {
        id = 0;
      }
      sourceId = id !== 0 ? this._sourceIdById[id] : this._origin.next();
      if (!sourceId) {
        return null;
      }
      source = this._getSourceBySourceId(sourceId);
      nextId = source.next(id);
      while (!nextId) {
        if (!(sourceId = this._origin.next(sourceId))) {
          return null;
        }
        source = this._getSourceBySourceId(sourceId);
        nextId = source.next();
      }
      this._sourceIdById[nextId] = sourceId;
      return nextId;
    };

    FlatMapList.prototype._onOriginEvent = function(event) {
      var iterator, next, prev, _ref, _ref1;
      iterator = this._origin.getIterator(event.prev);
      while (iterator.moveNext() && iterator.currentId !== event.next) {
        delete this._sourceBySourceId[iterator.currentId];
      }
      prev = (_ref = this._getSourceBySourceId(event.prev)) != null ? _ref.prev() : void 0;
      next = (_ref1 = this._getSourceBySourceId(event.next)) != null ? _ref1.next() : void 0;
      return this._invalidate(prev, next);
    };

    FlatMapList.prototype._onSourceEvent = function(event, sourceId) {
      var next, prev;
      if (!(prev = event.prev)) {
        prev = this._getSourceBySourceId(this._origin.prev(sourceId)).prev();
      }
      if (!(next = event.next)) {
        next = this._getSourceBySourceId(this._origin.next(sourceId)).next();
      }
      return this._invalidate(prev, next);
    };

    return FlatMapList;

  })(AbstractList);

  Sonic.factory = function(exports) {
    exports._ = Sonic;
    exports.create = Sonic.create;
    exports.unit = Sonic.unit;
    exports.empty = Sonic.empty;
    exports.Signal = Signal;
    exports.Iterator = Iterator;
    exports.AbstractList = AbstractList;
    exports.List = List;
    exports.Unit = Unit;
    return exports.FlatMapList = FlatMapList;
  };

  if (typeof exports === 'object') {
    Sonic.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Sonic.factory(this.Sonic = exports);
      return exports;
    });
  } else {
    Sonic.factory(this.Sonic = {});
  }

}).call(this);
