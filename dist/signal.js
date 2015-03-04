"use strict";

var Signal;

Signal = (function () {
  function Signal(value) {
    this.id = Sonic.uniqueId();
    this._handlers = [];
    this._value = value;
  }

  Signal.prototype.value = function () {
    return this._value;
  };

  Signal.prototype["yield"] = function (value) {
    var index, item, toRemove, _i, _len;
    this._value = value;
    toRemove = [];
    this._handlers.forEach((function (_this) {
      return function (handler) {
        var res;
        res = handler(value, _this);
        if (!res) {
          toRemove.push(res);
        }
        return res;
      };
    })(this));
    for (_i = 0, _len = toRemove.length; _i < _len; _i++) {
      item = toRemove[_i];
      index = this._handlers.indexOf(item);
      this._handlers.splice(index, 1);
    }
    return true;
  };

  Signal.prototype.each = function (handler) {
    return this.forEach(handler);
  };

  Signal.prototype.forEach = function (handler) {
    return this._handlers.push(handler);
  };

  Signal.prototype.root = function () {
    return this;
  };

  return Signal;
})();

module.exports = Signal;

//# sourceMappingURL=signal.js.map