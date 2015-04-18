(function() {
  var MutableList, Unit, uniqueId,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  uniqueId = require('./unique_id');

  MutableList = require('./mutable_list');

  Unit = (function(_super) {
    __extends(Unit, _super);

    function Unit(value) {
      Unit.__super__.constructor.call(this);
      if (arguments.length) {
        this.splice(null, null, value);
      }
    }

    Unit.prototype.has = function(id) {
      return this._id && id === this._id;
    };

    Unit.prototype.get = function(id) {
      if (this.has(id)) {
        return this._value;
      }
    };

    Unit.prototype.next = function(id) {
      if (!id) {
        return this._id;
      }
      if (this.has(id)) {
        return null;
      }
    };

    Unit.prototype.prev = function(id) {
      if (!id) {
        return this._id;
      }
      if (this.has(id)) {
        return null;
      }
    };

    Unit.prototype.splice = function(prev, next, value) {
      if (arguments.length > 2) {
        this._id = uniqueId();
        this._value = value;
      } else {
        delete this._id;
        delete this._value;
      }
      return this._invalidate(null, null);
    };

    return Unit;

  })(MutableList);

  module.exports = Unit;

}).call(this);

//# sourceMappingURL=unit.js.map
