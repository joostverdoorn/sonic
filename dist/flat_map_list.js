"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var AbstractList = _interopRequire(require("./abstract_list"));

var Unit = _interopRequire(require("./unit"));

var FlatMapList,
    __bind = function __bind(fn, me) {
  return function () {
    return fn.apply(me, arguments);
  };
},
    __hasProp = ({}).hasOwnProperty,
    __extends = function __extends(child, parent) {
  for (var key in parent) {
    if (__hasProp.call(parent, key)) child[key] = parent[key];
  }function ctor() {
    this.constructor = child;
  }ctor.prototype = parent.prototype;child.prototype = new ctor();child.__super__ = parent.prototype;return child;
};

console.log("AbstractList:", AbstractList);

FlatMapList = (function (_super) {
  __extends(FlatMapList, _super);

  function FlatMapList(source, flatMapFn) {
    this._onListEvent = __bind(this._onListEvent, this);
    this._onSourceEvent = __bind(this._onSourceEvent, this);
    FlatMapList.__super__.constructor.call(this);
    this._source = Sonic.create(source);
    this._source.events.forEach(this._onSourceEvent);
    this._sourceIdById = {};
    this._listBySourceId = {};
    this._flatMapFn = flatMapFn || Sonic.unit;
  }

  FlatMapList.prototype._getListById = function (id) {
    var sourceId;
    if (sourceId = this._sourceIdById[id]) {
      return this._getListBySourceId(sourceId);
    }
  };

  FlatMapList.prototype._getListBySourceId = function (sourceId) {
    var list;
    if (list = this._listBySourceId[sourceId]) {
      return list;
    }
    if (!this._source.has(sourceId)) {
      return;
    }
    list = this._flatMapFn(this._source.get(sourceId));
    list.events.forEach((function (_this) {
      return function (event) {
        return _this._onListEvent(event, sourceId);
      };
    })(this));
    this._listBySourceId[sourceId] = list;
    return list;
  };

  FlatMapList.prototype.prev = function (id) {
    var list, prev, sourceId;
    if (id == null) {
      id = 0;
    }
    if (!id) {
      sourceId = this._source.prev();
    } else {
      sourceId = this._sourceIdById[id];
    }
    if (!sourceId) {
      return;
    }
    list = this._getListBySourceId(sourceId);
    prev = list.prev(id);
    while (!prev) {
      if (!(sourceId = this._source.prev(sourceId))) {
        return;
      }
      list = this._getListBySourceId(sourceId);
      prev = list.prev();
    }
    this._sourceIdById[prev] = sourceId;
    return prev;
  };

  FlatMapList.prototype.next = function (id) {
    var list, next, sourceId;
    if (id == null) {
      id = 0;
    }
    if (!id) {
      sourceId = this._source.next();
    } else {
      sourceId = this._sourceIdById[id];
    }
    if (!sourceId) {
      return;
    }
    list = this._getListBySourceId(sourceId);
    next = list.next(id);
    while (!next) {
      if (!(sourceId = this._source.next(sourceId))) {
        return;
      }
      list = this._getListBySourceId(sourceId);
      next = list.next();
    }
    this._sourceIdById[next] = sourceId;
    return next;
  };

  FlatMapList.prototype.get = function (id) {
    var list;
    if (list = this._getListById(id)) {
      return list.get(id);
    }
  };

  FlatMapList.prototype.has = function (id) {
    return id in this._sourceIdById || id === 0;
  };

  FlatMapList.prototype._onSourceEvent = function (event) {
    var next, prev, _ref, _ref1;
    prev = (_ref = this._getListBySourceId(event.prev)) != null ? _ref.prev(0, {
      lazy: true
    }) : void 0;
    next = (_ref1 = this._getListBySourceId(event.next)) != null ? _ref1.next(0, {
      lazy: true
    }) : void 0;
    return this._invalidate(prev, next);
  };

  FlatMapList.prototype._onListEvent = function (event, sourceId) {
    var next, prev;
    if (!(prev = event.prev)) {
      prev = this._getListBySourceId(this._origin.prev(sourceId)).prev();
    }
    if (!(next = event.next)) {
      next = this._getListBySourceId(this._origin.next(sourceId)).next();
    }
    return this._invalidate(prev, next);
  };

  return FlatMapList;
})(AbstractList);

module.exports = FlatMapList;

//# sourceMappingURL=flat_map_list.js.map