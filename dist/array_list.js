(function() {
  var ArrayList, MutableList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  MutableList = require('./mutable_list');

  ArrayList = (function(_super) {
    __extends(ArrayList, _super);

    function ArrayList(source) {
      ArrayList.__super__.constructor.call(this);
      this._source = source || [];
    }

    ArrayList.prototype.has = function(index) {
      return (-1 < index && index < this._source.length);
    };

    ArrayList.prototype.get = function(index) {
      return this._source[index];
    };

    ArrayList.prototype.prev = function(index) {
      var length, _ref;
      length = this._source.length;
      if (!length) {
        return;
      }
      if (index == null) {
        return length - 1;
      }
      if (((-1 < (_ref = index - 1) && _ref < index) && index < length)) {
        return index - 1;
      }
    };

    ArrayList.prototype.next = function(index) {
      var length, _ref;
      length = this._source.length;
      if (!length) {
        return;
      }
      if (index == null) {
        return 0;
      }
      if (((-1 < index && index < (_ref = index + 1)) && _ref < length)) {
        return index + 1;
      }
    };

    ArrayList.prototype.set = function(index, value) {
      var next, prev;
      if (!this.has(index)) {
        return false;
      }
      this._source[index] = value;
      prev = index > 0 ? index - 1 : null;
      next = index < this._source.length - 1 ? index + 1 : null;
      this._invalidate(prev, next);
      return true;
    };

    ArrayList.prototype.splice = function() {
      var next, prev, values, _ref;
      prev = arguments[0], next = arguments[1], values = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (prev == null) {
        prev = -1;
      } else if (!this.has(prev)) {
        return false;
      }
      if (next == null) {
        next = this._source.length;
      } else if (!this.has(next)) {
        return false;
      }
      (_ref = this._source).splice.apply(_ref, [prev + 1, next - prev - 1].concat(__slice.call(values)));
      this._invalidate(prev, null);
      return true;
    };

    return ArrayList;

  })(MutableList);

  module.exports = ArrayList;

}).call(this);

//# sourceMappingURL=array_list.js.map
