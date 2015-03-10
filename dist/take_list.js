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
