(function() {
  var LinkedList, MutableList, uniqueId,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  MutableList = require('./mutable_list');

  uniqueId = require('./unique_id');

  LinkedList = (function(_super) {
    __extends(LinkedList, _super);

    function LinkedList(source) {
      LinkedList.__super__.constructor.call(this);
      this._byId = {};
      this._next = {
        '-1': -1
      };
      this._prev = {
        '-1': -1
      };
      if (source) {
        this.splice.apply(this, [null, null].concat(__slice.call(source)));
      }
    }

    LinkedList.prototype.get = function(id) {
      return this._byId[id];
    };

    LinkedList.prototype.has = function(id) {
      return !!~id && id in this._byId;
    };

    LinkedList.prototype.prev = function(id) {
      var prev;
      if (id == null) {
        id = -1;
      }
      prev = this._prev[id];
      if (!!~prev && (prev != null)) {
        return prev;
      }
      return null;
    };

    LinkedList.prototype.next = function(id) {
      var next;
      if (id == null) {
        id = -1;
      }
      next = this._next[id];
      if (!!~next && (next != null)) {
        return next;
      }
      return null;
    };

    LinkedList.prototype.set = function(id, value) {
      if (!this.has(id)) {
        return false;
      }
      this._byId[id] = value;
      this._invalidate(this._prev[id], this._next[id]);
      return true;
    };

    LinkedList.prototype.splice = function() {
      var id, next, prev, value, values, _i, _len, _next, _prev;
      prev = arguments[0], next = arguments[1], values = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      if (prev == null) {
        prev = -1;
      }
      if (next == null) {
        next = -1;
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
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        id = uniqueId();
        this._byId[id] = value;
        this._prev[id] = prev;
        this._next[prev] = id;
        prev = id;
      }
      this._prev[next] = prev;
      this._next[prev] = next;
      this._invalidate(prev, next);
      return true;
    };

    return LinkedList;

  })(MutableList);

  module.exports = LinkedList;

}).call(this);

//# sourceMappingURL=linked_list.js.map
