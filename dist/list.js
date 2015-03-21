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
      this._move(0, 0);
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
