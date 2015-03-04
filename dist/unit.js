"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var Unit,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

Unit = (function (_super) {
  __extends(Unit, _super);

  function Unit(value) {
    Unit.__super__.constructor.apply(this, arguments);
    this._id = Sonic.uniqueId();
    if (arguments.length) {
      this._value = value;
    }
  }

  Unit.prototype.set = function (value) {
    return this._value = value;
  };

  Unit.prototype["delete"] = function () {
    return delete this._value;
  };

  Unit.prototype.get = function () {
    return this._value;
  };

  Unit.prototype.has = function () {
    return "_value" in this;
  };

  Unit.prototype.next = function (id) {
    if (id == null) {
      id = 0;
    }
    if (id === 0 && this.has()) {
      return this._id;
    }
  };

  Unit.prototype.prev = function (id) {
    if (id == null) {
      id = 0;
    }
    if (id === 0 && this.has()) {
      return this._id;
    }
  };

  return Unit;
})(AbstractList);

module.exports = Unit;

//# sourceMappingURL=unit.js.map