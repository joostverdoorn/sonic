(function() {
  var AbstractList, Signal;

  Signal = require('./signal');

  AbstractList = (function() {
    function AbstractList() {
      this._byId = {};
      this._prev = {};
      this._next = {};
      this._events = new Signal;
    }

    AbstractList.prototype._splice = function(prev, next, first, last) {
      var id, oldNext, oldPrev, _next, _prev;
      if (last == null) {
        last = first;
      }
      if (!(((prev === 0 || this.has(prev)) || (next === 0 || this.has(next))) && (!first || this.has(first)) && (!last || first === last || this.has(last)))) {
        return false;
      }
      _next = this._next[prev];
      while ((id = _next) && id !== next) {
        _next = this._next[id];
        delete this._byId[id];
        delete this._prev[id];
        delete this._next[id];
      }
      _prev = this._prev[next];
      while ((id = _prev) && id !== prev) {
        _prev = this._prev[id];
        delete this._byId[id];
        delete this._prev[id];
        delete this._next[id];
      }
      if (first != null) {
        oldPrev = this._prev[first];
        this._prev[first] = prev;
      }
      if (last != null) {
        oldNext = this._next[last];
        this._next[last] = next;
      }
      if (oldPrev === 0 || this.has(oldPrev)) {
        this._next[oldPrev] = oldNext;
      }
      if (oldNext === 0 || this.has(oldNext)) {
        this._prev[oldNext] = oldPrev;
      }
      if (next != null) {
        this._prev[next] = last;
      }
      if (prev != null) {
        this._next[prev] = first;
      }
      this._invalidate(prev, next);
      return true;
    };

    AbstractList.prototype._add = function(value, prev, next) {
      var id;
      id = Sonic.uniqueId();
      this._byId[id] = value;
      if (!this._move(id, prev, next)) {
        delete this._byId[id];
        return null;
      }
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
      if ((next != null) && (prev == null)) {
        prev = this._prev[next];
      }
      if ((prev != null) && (next == null)) {
        next = this._next[prev];
      }
      return this._splice(prev, next, id);
    };

    AbstractList.prototype.get = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.has = function(id) {
      return id in this._byId;
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

    AbstractList.prototype.onInvalidate = function(callback) {
      return this._events.forEach(callback);
    };

    AbstractList.prototype._invalidate = function(prev, next) {
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

}).call(this);

//# sourceMappingURL=abstract_list.js.map
