(function() {
  var ArrayList, MutableList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  MutableList = require('./mutable_list');

  ArrayList = (function(_super) {
    __extends(ArrayList, _super);

    function ArrayList(source) {
      this._source = source && source.slice(0) || [];
      ArrayList.__super__.constructor.call(this);
    }

    ArrayList.prototype.has = function(index) {
      return (0 <= index && index < this._source.length);
    };

    ArrayList.prototype.get = function(index) {
      return this._source[index];
    };

    ArrayList.prototype.prev = function(index) {
      if (!this._source.length) {
        return;
      }
      if (index == null) {
        return this._source.length - 1;
      }
      if (this.has(index) && this.has(index - 1)) {
        return index - 1;
      }
    };

    ArrayList.prototype.next = function(index) {
      if (!this._source.length) {
        return;
      }
      if (index == null) {
        return 0;
      }
      if (this.has(index) && this.has(index + 1)) {
        return index + 1;
      }
    };

    ArrayList.prototype.set = function(index, value) {
      if (!this.has(id)) {
        return false;
      }
      this._source[index] = value;
      return true;
    };

    ArrayList.prototype.splice = function() {
      var items, next, prev, _ref;
      prev = arguments[0], next = arguments[1], items = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      debugger;
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
      (_ref = this._source).splice.apply(_ref, [prev + 1, next - prev - 1].concat(__slice.call(items)));
      return true;
    };

    return ArrayList;

  })(MutableList);

  module.exports = ArrayList;

}).call(this);

//# sourceMappingURL=array_list.js.map
