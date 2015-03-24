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
