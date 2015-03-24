(function() {
  var AbstractList, key, uniqueId, utilities, value;

  uniqueId = require('./unique_id');

  utilities = require('./utilities');

  AbstractList = (function() {
    function AbstractList() {
      this._byId = {};
      this._prev = {};
      this._next = {};
      this._handlers = {};
    }

    AbstractList.prototype.get = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.has = function(id) {
      return !!id && id in this._byId;
    };

    AbstractList.prototype.prev = function(id) {
      if (id == null) {
        id = 0;
      }
      return this._prev[id] || null;
    };

    AbstractList.prototype.next = function(id) {
      if (id == null) {
        id = 0;
      }
      return this._next[id] || null;
    };

    AbstractList.prototype.onInvalidate = function(handler) {
      var handlerId;
      handlerId = uniqueId();
      this._handlers[handlerId] = handler;
      return handlerId;
    };

    AbstractList.prototype.removeListener = function(handlerId) {
      if (!this._handlers[handlerId]) {
        return false;
      }
      delete this._handlers[handlerId];
      return true;
    };

    AbstractList.prototype._splice = function(prev, next, first, last) {
      var _next, _prev;
      if (last == null) {
        last = first;
      }
      if (!((prev === 0 || this.has(prev)) || (next === 0 || this.has(next)))) {
        return false;
      }
      while (_next = this._next[_next || prev]) {
        delete this._next[this._prev[_next]];
        delete this._prev[_next];
        if (_next === next) {
          break;
        }
        delete this._byId[_next];
      }
      while (_prev = this._prev[_prev || next]) {
        delete this._prev[this._next[_prev]];
        delete this._next[_prev];
        if (_prev === prev) {
          break;
        }
        delete this._byId[_prev];
      }
      if ((first != null) && (prev != null)) {
        this._next[prev] = first;
        this._prev[first] = prev;
      }
      if ((last != null) && (next != null)) {
        this._prev[next] = last;
        this._next[last] = next;
      }
      this._invalidate(prev, next);
      return true;
    };

    AbstractList.prototype._add = function(value, prev, next) {
      var id;
      id = uniqueId();
      this._byId[id] = value;
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      this._splice(prev, next, id);
      return id;
    };

    AbstractList.prototype._set = function(id, value) {
      if (!this.has(id)) {
        return false;
      }
      this._byId[id] = value;
      this._invalidate(this._prev[id], this._next[id]);
      return true;
    };

    AbstractList.prototype._delete = function(id) {
      return id !== 0 && this._splice(this._prev[id], this._next[id], this._next[id], this._prev[id]);
    };

    AbstractList.prototype._move = function(id, prev, next) {
      var oldNext, oldPrev;
      if ((oldPrev = this._prev[id]) != null) {
        this._splice(oldPrev, id);
      }
      if ((oldNext = this._next[id]) != null) {
        this._splice(id, oldNext);
      }
      this._splice(oldPrev, oldNext, oldNext, oldPrev);
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      return this._splice(prev, next, id);
    };

    AbstractList.prototype._invalidate = function(prev, next) {
      var handler, id, _ref, _results;
      if (prev == null) {
        prev = 0;
      }
      if (next == null) {
        next = 0;
      }
      _ref = this._handlers;
      _results = [];
      for (id in _ref) {
        handler = _ref[id];
        if (handler(prev, next) === false) {
          _results.push(delete this._handlers[id]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return AbstractList;

  })();

  for (key in utilities) {
    value = utilities[key];
    AbstractList.prototype[key] = value;
  }

  module.exports = AbstractList;

}).call(this);

//# sourceMappingURL=abstract_list.js.map
