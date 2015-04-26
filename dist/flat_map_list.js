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
      if (sourceId == null) {
        return null;
      }
      list = this._getListBySourceId(sourceId);
      prev = list.prev(id);
      while (prev == null) {
        if ((sourceId = this._source.prev(sourceId)) == null) {
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
      if (sourceId == null) {
        return null;
      }
      list = this._getListBySourceId(sourceId);
      next = list.next(id);
      while (next == null) {
        if ((sourceId = this._source.next(sourceId)) == null) {
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
      list = this._flatMapFn.last()(this._source.get(sourceId), sourceId).indexBy();
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
      if (sourcePrev != null) {
        while (sourcePrev = this._source.prev(sourcePrev)) {
          if (prevList = this._listBySourceId[sourcePrev]) {
            break;
          }
        }
        prev = (prevList != null ? prevList.prev() : void 0) || 0;
      } else {
        prev = this._source.next();
      }
      if (sourceNext != null) {
        while (sourceNext = this._source.next(sourceNext)) {
          if (nextList = this._listBySourceId[sourceNext]) {
            break;
          }
        }
        next = (nextList != null ? nextList.next() : void 0) || 0;
      } else {
        next = this._source.prev();
      }
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
