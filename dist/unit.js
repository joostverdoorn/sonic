(function() {
  var MutableList, Unit,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  MutableList = require('./mutable_list');

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit(value) {
      var values;
      values = arguments.length ? [value] : [];
      Unit.__super__.constructor.call(this, values);
    }

    Unit.prototype.push = function(value) {
      return this._add(value, 0, 0);
    };

    Unit.prototype.unshift = function(value) {
      return this.push(value);
    };

    Unit.prototype.pop = function() {
      var value;
      value = this.last();
      this._splice(0, 0);
      return value;
    };

    Unit.prototype.shift = function() {
      return this.pop();
    };

    return Unit;

  })(MutableList);

  module.exports = Unit;

}).call(this);

//# sourceMappingURL=unit.js.map
