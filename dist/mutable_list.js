(function() {
  var AbstractList, MutableList,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AbstractList = require('./abstract_list');

  MutableList = (function(_super) {
    __extends(MutableList, _super);

    function MutableList() {
      MutableList.__super__.constructor.apply(this, arguments);
    }

    MutableList.prototype["delete"] = function(id) {
      return this.splice(this.prev(id), this.next(id));
    };

    MutableList.prototype.push = function(value) {
      return this.splice(this.prev(), null, value);
    };

    MutableList.prototype.unshift = function(value) {
      return this.splice(null, this.prev, value);
    };

    MutableList.prototype.pop = function() {
      return this.splice(this.prev(this.prev()), null);
    };

    MutableList.prototype.shift = function() {
      return this.splice(null, this.next(this.next()));
    };

    MutableList.prototype.remove = function(value) {
      var id;
      id = this.idOf(value);
      return this._delete(id);
    };

    return MutableList;

  })(AbstractList);

  module.exports = MutableList;

}).call(this);

//# sourceMappingURL=mutable_list.js.map
