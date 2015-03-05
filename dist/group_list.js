"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var FlatMapList = _interopRequire(require("./flat_map_list"));

var Unit = _interopRequire(require("./unit"));

var GroupList,
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

GroupList = (function (_super) {
  __extends(GroupList, _super);

  function GroupList(source, groupFn) {
    var flatMapFn;
    this._byValue = new Map();
    this._groupFn = groupFn || function (x) {
      return x;
    };
    flatMapFn = function (value) {
      var groupValue, list;
      groupValue = this._groupFn(value);
      if (this._byValue.has(groupValue)) {
        return new Unit();
      }
      list = this._source.filter((function (_this) {
        return function (value) {
          return _this._groupFn(value) === groupValue;
        };
      })(this));
      this._byValue.set(groupValue, list);
      return new Unit(list);
    };
    GroupList.__super__.constructor.call(this, source, flatMapFn);
  }

  return GroupList;
})(FlatMapList);

module.exports = GroupList;

//# sourceMappingURL=group_list.js.map