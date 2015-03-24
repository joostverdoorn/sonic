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
      this._onRangeInvalidate = __bind(this._onRangeInvalidate, this);
      this._onSourceInvalidate = __bind(this._onSourceInvalidate, this);
      RangeList.__super__.constructor.call(this);
      this._indexById = {
        0: -1
      };
      this._idByIndex = {
        '-1': 0
      };
      this._source = factory(source);
      this._source.onInvalidate(this._onSourceInvalidate);
      this._start = factory(start || 0);
      this._start.onInvalidate(this._onRangeInvalidate);
      this._count = factory(count || 0);
      this._count.onInvalidate(this._onRangeInvalidate);
    }

    RangeList.prototype.get = function(id) {
      return this._source.get(id);
    };

    RangeList.prototype.has = function(id) {
      return id in this._indexById;
    };

    RangeList.prototype.prev = function(id) {
      if (id == null) {
        id = 0;
      }
    };

    RangeList.prototype.next = function(id) {
      var current, end, index, next, start, _base;
      if (id == null) {
        id = 0;
      }
      start = this._start.last();
      end = start + this._count.last();
      if ((index = this._indexById[id]) && index < end) {
        if (this._indexById[index + 1] = next) {
          return next;
        }
      }
      index || (index = -1);
      while (!(++index >= end)) {
        next = (_base = this._idByIndex)[index] || (_base[index] = this._source.next(current));
        if ((id && current === id) || (!id && index === start)) {
          return next;
        }
        current = this._idByIndex[index];
      }
      return null;
    };

    RangeList.prototype._onSourceInvalidate = function(prev, next) {
      this._invalidate(prev);
      return true;
    };

    RangeList.prototype._onRangeInvalidate = function(prev, next) {
      var id;
      if (next === 0 && (id = this._idByIndex[this._start.last() + this._count.last()])) {
        this._invalidate(this._prev[id]);
      }
      return true;
    };

    RangeList.prototype._invalidate = function(prev, next) {
      var i, id;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      if (!(i = this._indexById[prev])) {
        return;
      }
      while (id = this._idByIndex[++i]) {
        delete this._idByIndex[i];
        delete this._indexById[id];
      }
      return RangeList.__super__._invalidate.call(this, prev, 0);
    };

    return RangeList;

  })(AbstractList);

  module.exports = RangeList;

}).call(this);

//# sourceMappingURL=range_list.js.map
