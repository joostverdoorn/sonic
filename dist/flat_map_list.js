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
      var iterator, next, prev;
      prev = this._getListBySourceId(event.prev, {
        lazy: true
      });
      if (prev != null) {
        prev = prev.prev(0, {
          lazy: true
        });
      } else {
        event.prev;
      }
      next = this._getListBySourceId(event.next, {
        lazy: true
      });
      if (next != null) {
        next = next.next(0, {
          lazy: true
        });
      } else {
        event.next;
      }
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
