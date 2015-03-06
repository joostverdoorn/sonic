"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Signal = _interopRequire(require("./signal"));

var Iterator = _interopRequire(require("./iterator"));

var AbstractList;

AbstractList = (function () {
  function AbstractList() {
    this._byId = {};
    this._prev = {};
    this._next = {};
    this._events = new Signal();
  }

  AbstractList.prototype._add = function (value, options) {
    var id;
    if (options != null && options.id != null) {
      id = options.id;
    } else {
      id = Sonic.uniqueId();
    }
    this._byId[id] = value;
    if (options && (options.prev != null || options.next != null)) {
      this._move(id, options);
    }
    return id;
  };

  AbstractList.prototype._set = function (id, value, options) {
    if (!(id !== 0 && this.has(id))) {
      return false;
    }
    this._byId[id] = value;
    if (!(options != null ? options.silent : void 0)) {
      this._invalidate(this._prev[id], this._next[id]);
    }
    return true;
  };

  AbstractList.prototype._delete = function (id, options) {
    if (!(id !== 0 && this._remove(id, options))) {
      return false;
    }
    delete this._byId[id];
    delete this._next[id];
    delete this._prev[id];
    return true;
  };

  AbstractList.prototype._remove = function (id, options) {
    var next, prev;
    if (!this.has(id)) {
      return false;
    }
    prev = this._prev[id];
    next = this._next[id];
    if (prev != null) {
      this._prev[next] = prev;
    }
    if (next != null) {
      this._next[prev] = next;
    }
    if (next != null || prev != null && !(options != null ? options.silent : void 0)) {
      this._invalidate(prev, next);
    }
    return true;
  };

  AbstractList.prototype._move = function (id, options) {
    var next, prev;
    if (!this.has(id)) {
      return false;
    }
    this._remove(id);
    prev = options != null ? options.prev : void 0;
    next = options != null ? options.next : void 0;
    if (next != null && prev == null) {
      prev = this._prev[next];
    }
    if (prev != null && next == null) {
      next = this._next[prev];
    }
    if (prev != null) {
      this._prev[id] = prev;
      this._next[prev] = id;
    }
    if (next != null) {
      this._next[id] = next;
      this._prev[next] = id;
    }
    if (!(options != null ? options.silent : void 0)) {
      this._invalidate(prev, next);
    }
    return true;
  };

  AbstractList.prototype._slice = function (prev, next) {
    var id;
    if (prev != null) {
      while ((id = this._next[id || prev]) && id !== next) {
        this._delete(id, {
          silent: true
        });
      }
    }
    if (next != null) {
      while ((id = this._prev[id || next]) && id !== prev) {
        this._delete(id, {
          silent: true
        });
      }
    }
    return this._invalidate(prev, next);
  };

  AbstractList.prototype.get = function (id) {
    return this._byId[id];
  };

  AbstractList.prototype.has = function (id) {
    return id in this._byId || id === 0;
  };

  AbstractList.prototype.prev = function (id) {
    if (id == null) {
      id = 0;
    }
    return this._prev[id] || null;
  };

  AbstractList.prototype.next = function (id) {
    if (id == null) {
      id = 0;
    }
    return this._next[id] || null;
  };

  AbstractList.prototype.onInvalidate = function (callback) {
    return this._events.forEach(callback);
  };

  AbstractList.prototype._invalidate = function (prev, next) {
    var event;
    event = {
      prev: prev,
      next: next
    };
    return this._events["yield"](event);
  };

  return AbstractList;
})();

module.exports = AbstractList;

//# sourceMappingURL=abstract_list.js.map