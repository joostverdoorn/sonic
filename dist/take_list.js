"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var TakeList,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

TakeList = (function (_super) {
  __extends(TakeList, _super);

  function TakeList(source, count) {
    this._orderById = {
      0: 0
    };
    this._source = source;
    this._count = count;
    TakeList.__super__.constructor.call(this);
    this._source.onInvalidate((function (_this) {
      return function (event) {
        return _this._invalidate(event.prev);
      };
    })(this));
  }

  TakeList.prototype._invalidate = function (prev) {
    var id;
    while (id = this._source.next(id || prev)) {
      delete this._orderById[id];
    }
    return TakeList.__super__._invalidate.call(this, prev);
  };

  TakeList.prototype.prev = function (id) {};

  TakeList.prototype.next = function (id) {
    var i, next, prev;
    if (id == null) {
      id = 0;
    }
    if ((i = this._orderById[id]) == null) {
      while (prev = this._source.prev(prev || id)) {
        if (i = this._orderById[id]) {
          break;
        }
      }
      while (next = this._source.next(next || prev)) {
        this._orderById[next] = i++;
        if (next === id) {
          break;
        }
      }
    }
    if (i >= this._count) {
      return;
    }
    next = this._source.next(next || id);
    this._orderById[next] = ++i;
    return next;
  };

  TakeList.prototype.get = function (id) {
    return this._source.get(id);
  };

  TakeList.prototype.has = function (id) {
    return this._source.has(id);
  };

  return TakeList;
})(AbstractList);

module.exports = TakeList;

//# sourceMappingURL=take_list.js.map