(function() {
  var AbstractList, ScanList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require("./abstract_list");

  ScanList = (function(_super) {
    __extends(ScanList, _super);

    function ScanList(source, scanFn, initialValue) {
      this._source = source;
      this._scanFn = scanFn;
      this._byId[0] = initialValue;
      ScanList.__super__.constructor.call(this);
      this._source.onInvalidate((function(_this) {
        return function(event) {
          return _this._invalidate(event.prev);
        };
      })(this));
      this.onInvalidate(function(event) {
        var id, _results;
        _results = [];
        while (id = this._source.next(id || event.prev)) {
          _results.push(delete this._byId[id]);
        }
        return _results;
      });
    }

    ScanList.prototype.get = function(id) {
      if (this._source.has(id)) {
        return this.next(this.prev(id));
      }
    };

    ScanList.prototype.has = function(id) {
      var _ref;
      return (_ref = this._source).has.apply(_ref, arguments);
    };

    ScanList.prototype.prev = function() {
      var _ref;
      return (_ref = this._source).prev.apply(_ref, arguments);
    };

    ScanList.prototype.next = function() {
      var _ref;
      return (_ref = this._source).next.apply(_ref, arguments);
    };

    return ScanList;

  })(AbstractList);

  module.exports = ScanList;

}).call(this);

//# sourceMappingURL=scan_list.js.map
