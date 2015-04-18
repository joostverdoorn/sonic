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
      if (!this.has(id)) {
        return false;
      }
      return this.splice(this.prev(id), this.next(id));
    };

    MutableList.prototype.push = function(value) {
      this.splice(this.prev(), null, value);
      return this.prev();
    };

    MutableList.prototype.unshift = function(value) {
      this.splice(null, this.prev, value);
      return this.next();
    };

    MutableList.prototype.pop = function() {
      var value;
      value = this.last();
      this.splice(this.prev(this.prev()), null);
      return value;
    };

    MutableList.prototype.shift = function() {
      var value;
      value = this.first();
      this.splice(null, this.next(this.next()));
      return value;
    };

    MutableList.prototype.remove = function(value) {
      var id;
      id = this.idOf(value);
      return this["delete"](id);
    };

    return MutableList;

  })(AbstractList);

  module.exports = MutableList;

}).call(this);

//# sourceMappingURL=mutable_list.js.map
