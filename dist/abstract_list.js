"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var Signal = _interopRequire(require("./signal"));

var Iterator = _interopRequire(require("./iterator"));

var AbstractList,
    __slice = [].slice;

AbstractList = (function () {
  function AbstractList() {
    this._byId = {};
    this._prev = {};
    this._next = {};
    this.events = new Signal();
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

  AbstractList.prototype.getIterator = function (start) {
    return new Iterator(this, start);
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

  AbstractList.prototype.get = function (id) {
    return this._byId[id];
  };

  AbstractList.prototype.has = function (id) {
    return id in this._byId || id === 0;
  };

  AbstractList.prototype.idAt = function (index) {
    var i, iterator;
    i = -1;
    iterator = this.getIterator();
    while (iterator.moveNext()) {
      if (++i === index) {
        return iterator.currentId;
      }
    }
    return void 0;
  };

  AbstractList.prototype.at = function (index) {
    var id;
    if (id = this.idAt(index)) {
      return this.get(id);
    }
    return void 0;
  };

  AbstractList.prototype.idOf = function (value) {
    var iterator;
    iterator = this.getIterator();
    while (iterator.moveNext()) {
      if (iterator.current() === value) {
        return iterator.currentId;
      }
    }
    return void 0;
  };

  AbstractList.prototype.indexOf = function (value, limit) {
    var index, iterator;
    if (limit == null) {
      limit = Infinity;
    }
    index = -1;
    iterator = this.getIterator();
    while (iterator.moveNext() && ++index < limit) {
      if (iterator.current() === value) {
        return index;
      }
    }
    return -1;
  };

  AbstractList.prototype.contains = function (value, limit) {
    if (limit == null) {
      limit = Infinity;
    }
    return this.indexOf(value, limit) !== -1;
  };

  AbstractList.prototype.forEach = function (fn) {
    return this.each(fn);
  };

  AbstractList.prototype.each = function (fn) {
    var iterator;
    iterator = this.getIterator();
    while (iterator.moveNext()) {
      if (fn(iterator.current()) === false) {
        return false;
      }
    }
    return true;
  };

  AbstractList.prototype.any = function (predicate) {
    return this.some(predicate);
  };

  AbstractList.prototype.some = function (predicate) {
    var index, _i, _ref;
    for (index = _i = 0, _ref = this.length(); 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
      if (predicate(this.at(index))) {
        return true;
      }
    }
    return false;
  };

  AbstractList.prototype.find = function (fn) {
    var result;
    result = void 0;
    this.each(function (value) {
      if (fn(value)) {
        result = value;
        return false;
      }
    });
    return result;
  };

  AbstractList.prototype.reduce = function (reduceFn, memo) {
    if (memo == null) {
      memo = 0;
    }
    this.each(function (value) {
      return memo = reduceFn(value, memo);
    });
    return memo;
  };

  AbstractList.prototype.first = function () {
    return this.get(this.next());
  };

  AbstractList.prototype.skip = function (count) {
    return this.rest(count);
  };

  AbstractList.prototype.tail = function (count) {
    return this.rest(count);
  };

  AbstractList.prototype.drop = function (count) {
    return this.rest(count);
  };

  AbstractList.prototype.rest = function (count) {};

  AbstractList.prototype.initial = function (count) {};

  AbstractList.prototype.last = function (count) {
    return this.get(this.prev());
  };

  AbstractList.prototype.pluck = function (key) {
    return this.map(function (value) {
      return value[key];
    });
  };

  AbstractList.prototype.invoke = function () {
    var args, key;
    key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return this.map(function (value) {
      return value[key].apply(value, args);
    });
  };

  AbstractList.prototype.toArray = function () {
    var values;
    values = [];
    this.each(function (value) {
      return values.push(value);
    });
    return values;
  };

  AbstractList.prototype._invalidate = function (prev, next) {
    var event;
    event = {
      type: "invalidate",
      list: this
    };
    if (prev) {
      event.prev = prev;
    }
    if (next) {
      event.next = next;
    }
    return this.events["yield"](event);
  };

  return AbstractList;
})();

module.exports = AbstractList;

//# sourceMappingURL=abstract_list.js.map