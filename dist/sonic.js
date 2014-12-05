(function() {
  var AbstractList, ConcatenatedList, Iterator, Node, ProxyList, ReversedList, Signal, SimpleList, Sonic, SortedList, TakeList, TransformedList, UniqueList,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Sonic = {
    _uniqueCounter: 0,
    create: function(items) {
      if (items == null) {
        items = [];
      }
      if (items instanceof AbstractList) {
        return items;
      }
      return new SimpleList(items);
    },
    uniqueId: function() {
      var uniqueId;
      uniqueId = Sonic._uniqueCounter++;
      return uniqueId;
    }
  };

  Signal = (function() {
    function Signal(value) {
      this.id = Sonic.uniqueId();
      this._handlers = [];
      this._value = value;
    }

    Signal.prototype.value = function() {
      return this._value;
    };

    Signal.prototype["yield"] = function(value) {
      var index, item, toRemove, _i, _len;
      this._value = value;
      toRemove = [];
      this._handlers.forEach((function(_this) {
        return function(handler) {
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

    Signal.prototype.each = function(handler) {
      return this.forEach(handler);
    };

    Signal.prototype.forEach = function(handler) {
      return this._handlers.push(handler);
    };

    Signal.prototype.root = function() {
      return this;
    };

    return Signal;

  })();

  Node = (function() {
    function Node(signal, options) {
      if (options == null) {
        options = {};
      }
      this.signal = signal;
      this.value = options.value;
      this.left = null;
      this.right = null;
      this.parent = null;
    }

    Node.prototype.size = function() {
      var _ref, _ref1;
      if (this.leftSize == null) {
        this.leftSize = ((_ref = this.left) != null ? _ref.size() : void 0) || 0;
      }
      if (this.rightSize == null) {
        this.rightSize = ((_ref1 = this.right) != null ? _ref1.size() : void 0) || 0;
      }
      return this.leftSize + this.rightSize + 1;
    };

    Node.prototype.depth = function() {
      return 1 + Math.log(this.size()) / Math.LN2;
    };

    Node.prototype.balance = function() {
      var _ref, _ref1;
      return (((_ref = this.right) != null ? _ref.depth() : void 0) || 0) - (((_ref1 = this.left) != null ? _ref1.depth() : void 0) || 0);
    };

    Node.prototype.isRoot = function() {
      return !this.parent;
    };

    Node.prototype.isLeaf = function() {
      return !this.left && !this.right;
    };

    Node.prototype.leftMost = function() {
      var left;
      if (left = this.left) {
        return left.leftMost();
      }
      return this;
    };

    Node.prototype.rightMost = function() {
      var right;
      if (right = this.right) {
        return right.rightMost();
      }
      return this;
    };

    Node.prototype.isLeft = function() {
      var parent;
      if (parent = this.parent) {
        return this === parent.left;
      }
      return false;
    };

    Node.prototype.isRight = function() {
      var parent;
      if (parent = this.parent) {
        return this === parent.right;
      }
      return false;
    };

    Node.prototype.detach = function() {
      var parent;
      if (!(parent = this.parent)) {
        return null;
      }
      if (this.isLeft()) {
        this.parent.detachLeft();
      } else {
        this.parent.detachRight();
      }
      return parent;
    };

    Node.prototype.detachLeft = function() {
      var left;
      if (!(left = this.left)) {
        return null;
      }
      left.parent = null;
      this.left = null;
      this.leftSize = 0;
      return left;
    };

    Node.prototype.detachRight = function() {
      var right;
      if (!(right = this.right)) {
        return null;
      }
      this.right.parent = null;
      this.right = null;
      this.rightSize = 0;
      return right;
    };

    Node.prototype.attach = function(node) {
      if (!node) {
        return false;
      }
      if (node.value < this.value) {
        return this.attachLeft(node);
      } else {
        return this.attachRight(node);
      }
    };

    Node.prototype.attachLeft = function(node) {
      if (this.left) {
        this.left.parent = null;
      }
      if (node) {
        node.detach();
        node.parent = this;
      }
      this.left = node;
      this.leftSize = void 0;
      return true;
    };

    Node.prototype.attachRight = function(node) {
      if (this.right) {
        this.right.parent = null;
      }
      if (node) {
        node.detach();
        node.parent = this;
      }
      this.right = node;
      this.rightSize = void 0;
      return true;
    };

    Node.prototype.remove = function() {
      var left, parent, pivot, right;
      left = this.left;
      right = this.right;
      parent = this.parent;
      this.detach();
      this.detachLeft();
      this.detachRight();
      if (left) {
        pivot = left.rightMost();
        if (pivot !== left) {
          pivot.parent.attachRight(pivot.left);
        }
      } else if (right) {
        pivot = right.leftMost();
        if (pivot !== right) {
          pivot.parent.attachLeft(pivot.right);
        }
      } else {
        return;
      }
      if (pivot !== left) {
        pivot.attach(left);
      }
      if (pivot !== right) {
        pivot.attach(right);
      }
      parent.attach(pivot);
      pivot.normalize();
      return true;
    };

    Node.prototype.insert = function(node) {
      var left, otherValue, parent, right, value;
      value = this.value;
      otherValue = node.value;
      left = this.left;
      right = this.right;
      parent = this.parent;
      switch (false) {
        case otherValue !== value:
          this.detach();
          this.detachLeft();
          node.attach(this);
          if (left) {
            node.attach(left);
          }
          parent.attach(node);
          break;
        case !(otherValue < value):
          if (left) {
            left.insert(node);
            this.leftSize = void 0;
          } else {
            this.attachLeft(node);
          }
          break;
        case !(otherValue > value):
          if (right) {
            right.insert(node);
            this.rightSize = void 0;
          } else {
            this.attachRight(node);
          }
          break;
        case !isNaN(otherValue):
          return false;
      }
      this.normalize();
      return true;
    };

    Node.prototype.normalize = function() {
      var balance;
      if (this.isRoot()) {
        return;
      }
      balance = this.balance();
      if (balance <= -2) {
        this.rotateRight();
        return true;
      } else if (balance >= 2) {
        this.rotateLeft();
        return true;
      }
      return false;
    };

    Node.prototype.rotateLeft = function() {
      var parent, pivot;
      pivot = this.right;
      if (pivot.value <= this.value) {
        return false;
      }
      if (pivot.balance() === -1) {
        pivot.rotateRight();
      }
      pivot = this.right;
      parent = this.parent;
      this.attachRight(pivot.left);
      pivot.attachLeft(this);
      parent.attach(pivot);
      return true;
    };

    Node.prototype.rotateRight = function() {
      var parent, pivot;
      pivot = this.left;
      if (pivot.value > this.value) {
        return false;
      }
      if (pivot.balance() === 1) {
        pivot.rotateLeft();
      }
      pivot = this.left;
      parent = this.parent;
      this.attachLeft(pivot.right);
      pivot.attachRight(this);
      parent.attach(pivot);
      return true;
    };

    return Node;

  })();

  Iterator = (function() {
    function Iterator(list, signal) {
      this.list = list;
      this.start = this.signal = signal;
    }

    Iterator.prototype.current = function() {
      return this.signal.value();
    };

    Iterator.prototype.reset = function() {
      this.signal = this.start;
      return this;
    };

    Iterator.prototype.moveNext = function() {
      this.signal = this.list.after(this.signal);
      return this.signal != null;
    };

    Iterator.prototype.movePrevious = function() {
      this.signal = this.list.before(this.signal);
      return this.signal != null;
    };

    Iterator.prototype.next = function() {
      if (this.moveNext()) {
        return {
          value: this.current(),
          done: false,
          signal: this.signal
        };
      } else {
        return {
          done: true,
          signal: this.signal
        };
      }
    };

    Iterator.prototype.previous = function() {
      if (this.movePrevious()) {
        return {
          value: this.current(),
          done: false,
          signal: this.signal
        };
      } else {
        return {
          done: true,
          signal: this.signal
        };
      }
    };

    return Iterator;

  })();

  AbstractList = (function() {
    AbstractList.prototype._sentinel = {
      id: Sonic.uniqueId()
    };

    function AbstractList() {
      this._onSignalUpdate = __bind(this._onSignalUpdate, this);
      this._byId = {};
      this._next = {};
      this._prev = {};
      this.events = new Signal;
    }

    AbstractList.prototype._add = function(signal, options) {
      this._byId[signal.id] = signal;
      if (!(options != null ? options.silent : void 0)) {
        this.events["yield"]({
          type: 'add',
          id: signal.id,
          signal: signal,
          list: this
        });
      }
      if (options && (options.before || options.after)) {
        this._move(signal, options);
      }
      return true;
    };

    AbstractList.prototype._create = function(value, options) {
      var signal;
      signal = new Signal(value);
      signal.forEach(this._onSignalUpdate);
      this._add(signal, options);
      return signal;
    };

    AbstractList.prototype._set = function(signal, value) {
      signal["yield"](value);
      return true;
    };

    AbstractList.prototype._delete = function(signal, options) {
      var id;
      this._remove(signal);
      id = signal.id;
      delete this._byId[id];
      delete this._next[id];
      delete this._prev[id];
      if (!(options != null ? options.silent : void 0)) {
        this.events["yield"]({
          type: 'delete',
          id: signal.id,
          signal: signal,
          list: this
        });
      }
      return true;
    };

    AbstractList.prototype._remove = function(signal, options) {
      return this._move(signal, options);
    };

    AbstractList.prototype._move = function(signal, options) {
      var id, next, prev;
      id = signal.id;
      if (this._next[id]) {
        this._prev[this._next[id].id] = this._prev[id];
      }
      if (this._prev[id]) {
        this._next[this._prev[id].id] = this._next[id];
      }
      if (options && (options.before || options.after)) {
        prev = options.after || (options.before ? this._prev[options.before.id] : void 0);
        next = options.before || (options.after ? this._next[options.after.id] : void 0);
        this._prev[id] = prev;
        this._next[id] = next;
        if (prev) {
          this._next[prev.id] = signal;
        }
        if (next) {
          this._prev[next.id] = signal;
        }
      }
      if (!(options != null ? options.silent : void 0)) {
        this.events["yield"]({
          type: 'move',
          id: signal.id,
          signal: signal,
          list: this
        });
      }
      return true;
    };

    AbstractList.prototype.getIterator = function(start) {
      return new Iterator(this, start);
    };

    AbstractList.prototype.before = function(signal) {
      var prev;
      if (signal == null) {
        signal = this._sentinel;
      }
      prev = this._prev[signal.id];
      if (prev === this._sentinel) {
        return null;
      }
      return prev;
    };

    AbstractList.prototype.after = function(signal) {
      var next;
      if (signal == null) {
        signal = this._sentinel;
      }
      next = this._next[signal.id];
      if (next === this._sentinel) {
        return null;
      }
      return next;
    };

    AbstractList.prototype.get = function(id) {
      var _ref;
      return (_ref = this._byId[id]) != null ? _ref.value() : void 0;
    };

    AbstractList.prototype.signalAt = function(index) {
      var i, iterator;
      i = -1;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (++i === index) {
          return iterator.signal;
        }
      }
      return void 0;
    };

    AbstractList.prototype.idAt = function(index) {
      var signal;
      if (signal = this.signalAt(index)) {
        return signal.id;
      }
      return void 0;
    };

    AbstractList.prototype.at = function(index) {
      var signal;
      if (signal = this.signalAt(index)) {
        return signal.value();
      }
      return void 0;
    };

    AbstractList.prototype.signalOf = function(value) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (iterator.signal.value() === value) {
          return iterator.signal;
        }
      }
      return void 0;
    };

    AbstractList.prototype.idOf = function(value) {
      var _ref;
      return (_ref = this.signalOf(value)) != null ? _ref.id : void 0;
    };

    AbstractList.prototype.indexOfSignal = function(signal, limit) {
      var i, iterator;
      if (limit == null) {
        limit = Infinity;
      }
      i = -1;
      iterator = this.getIterator();
      while (iterator.moveNext() && ++i < limit) {
        if (iterator.signal === signal) {
          return i;
        }
      }
      return -1;
    };

    AbstractList.prototype.indexOf = function(value, limit) {
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

    AbstractList.prototype.contains = function(value, limit) {
      if (limit == null) {
        limit = Infinity;
      }
      return this.indexOf(value, limit) !== -1;
    };

    AbstractList.prototype.forEach = function(fn) {
      return this.each(fn);
    };

    AbstractList.prototype.each = function(fn) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (fn(iterator.current()) === false) {
          return false;
        }
      }
      return true;
    };

    AbstractList.prototype.any = function(predicate) {
      return this.some(predicate);
    };

    AbstractList.prototype.some = function(predicate) {
      var index, _i, _ref;
      for (index = _i = 0, _ref = this.length(); 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
        if (predicate(this.at(index))) {
          return true;
        }
      }
      return false;
    };

    AbstractList.prototype.find = function(fn) {
      var result;
      result = void 0;
      this.each(function(value) {
        if (fn(value)) {
          result = value;
          return false;
        }
      });
      return result;
    };

    AbstractList.prototype.reduce = function(reduceFn, memo) {
      if (memo == null) {
        memo = 0;
      }
      this.each(function(value) {
        return memo = reduceFn(value, memo);
      });
      return memo;
    };

    AbstractList.prototype.transform = function(options) {
      return new TransformedList(this, options);
    };

    AbstractList.prototype.map = function(mapFn) {
      return this.transform({
        mapFn: mapFn
      });
    };

    AbstractList.prototype.filter = function(filterFn) {
      return this.transform({
        filterFn: filterFn
      });
    };

    AbstractList.prototype.sort = function(sortFn) {
      return new SortedList(this, {
        sortFn: sortFn
      });
    };

    AbstractList.prototype.concat = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new ConcatenatedList([this].concat(others));
    };

    AbstractList.prototype.flatten = function() {
      return new ConcatenatedList(this);
    };

    AbstractList.prototype.reverse = function() {
      return new ReversedList(this);
    };

    AbstractList.prototype.unique = function() {
      return this.uniq();
    };

    AbstractList.prototype.uniq = function() {
      return new UniqueList(this);
    };

    AbstractList.prototype.duplicates = function() {
      var duplicates, iterated, iterator, value;
      iterated = [];
      duplicates = [];
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        value = iterator.current();
        if (__indexOf.call(iterated, value) >= 0) {
          duplicates.push(value);
        } else {
          iterated.push(value);
        }
      }
      return Sonic.create(duplicates);
    };

    AbstractList.prototype.union = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.concat.apply(this, others).uniq();
    };

    AbstractList.prototype.intersection = function(other) {
      return this.filter(other.contains);
    };

    AbstractList.prototype.take = function(count) {
      return new TakeList(this, count);
    };

    AbstractList.prototype.first = function(count) {
      if (count) {
        return this.take(count);
      } else {
        return this.getIterator(this._sentinel).next().value;
      }
    };

    AbstractList.prototype.skip = function(count) {
      return this.rest(count);
    };

    AbstractList.prototype.tail = function(count) {
      return this.rest(count);
    };

    AbstractList.prototype.drop = function(count) {
      return this.rest(count);
    };

    AbstractList.prototype.rest = function(count) {};

    AbstractList.prototype.initial = function(count) {};

    AbstractList.prototype.last = function(count) {
      if (!count) {
        return this.before(this._sentinel).value();
      }
    };

    AbstractList.prototype.pluck = function(key) {
      return this.map(function(value) {
        return value[key];
      });
    };

    AbstractList.prototype.invoke = function() {
      var args, key;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.map(function(value) {
        return value[key].apply(value, args);
      });
    };

    AbstractList.prototype.toArray = function() {
      var values;
      values = [];
      this.each(function(value) {
        return values.push(value);
      });
      return values;
    };

    AbstractList.prototype._onSignalUpdate = function(value, signal) {
      return this.events["yield"]({
        type: 'update',
        id: signal.id,
        signal: signal,
        list: this
      });
    };

    return AbstractList;

  })();

  SimpleList = (function(_super) {
    __extends(SimpleList, _super);

    function SimpleList(values) {
      var prev, signal, value, _i, _len;
      SimpleList.__super__.constructor.apply(this, arguments);
      this._prev[this._sentinel.id] = this._sentinel;
      this._next[this._sentinel.id] = this._sentinel;
      prev = this._sentinel;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        signal = new Signal(value);
        this._prev[signal.id] = prev;
        this._next[prev.id] = signal;
        prev = signal;
      }
      this._prev[this._sentinel.id] = prev;
      this._next[prev.id] = this._sentinel;
    }

    SimpleList.prototype.set = function(id, value, options) {
      var signal;
      if (options == null) {
        options = {};
      }
      signal = this._byId[id];
      if (!signal) {
        return false;
      }
      signal["yield"](value);
      return true;
    };

    SimpleList.prototype.push = function(value, options) {
      var signal;
      if (options == null) {
        options = {};
      }
      signal = this._create(value, {
        before: this._sentinel
      });
      return signal.id;
    };

    SimpleList.prototype.unshift = function(value, options) {
      var signal;
      if (options == null) {
        options = {};
      }
      signal = this._create(value, {
        after: this._sentinel
      });
      return signal.id;
    };

    SimpleList.prototype.pop = function(options) {
      var signal;
      signal = this.before(this._sentinel);
      this._delete(signal, options);
      return signal.value();
    };

    SimpleList.prototype.shift = function(options) {
      var signal;
      signal = this.after(this._sentinel);
      this._delete(signal, options);
      return signal.value();
    };

    SimpleList.prototype.add = function(value, options) {
      var signal;
      signal = this.push(value, options);
      return signal;
    };

    SimpleList.prototype.remove = function(value, options) {
      var signal;
      signal = this.signalOf(value);
      if (signal != null) {
        return this._delete(signal, options);
      }
    };

    SimpleList.prototype["delete"] = function(id, options) {
      var signal;
      signal = this.getSignal(id);
      return this._delete(signal, options);
    };

    return SimpleList;

  })(AbstractList);

  ProxyList = (function(_super) {
    __extends(ProxyList, _super);

    function ProxyList(source) {
      this._addSource = __bind(this._addSource, this);
      this._source = source;
      this._byId = this._source._byId;
      this._prev = this._source._prev;
      this._next = this._source._next;
      this.events = this._source.events;
    }

    ProxyList.prototype._addSource = function(source) {
      return source.events.each(this._onSourceEvent);
    };

    ProxyList.prototype.before = function() {};

    ProxyList.prototype.after = function() {};

    return ProxyList;

  })(AbstractList);

  TransformedList = (function(_super) {
    __extends(TransformedList, _super);

    function TransformedList(source, options) {
      if (options == null) {
        options = {};
      }
      this._onSourceEvent = __bind(this._onSourceEvent, this);
      this._source = source;
      this._source.events.forEach(this._onSourceEvent);
      this._bySourceId = {};
      this._sourceById = {};
      this._bySourceId[this._sentinel.id] = this._sentinel;
      this._sourceById[this._sentinel.id] = this._sentinel;
      this._mapFn = options.mapFn || function(value) {
        return value;
      };
      this._filterFn = options.filterFn || function(value) {
        return true;
      };
      TransformedList.__super__.constructor.call(this);
    }

    TransformedList.prototype._transformer = function(source, signal) {
      var value;
      if (!this._filterFn(source.value())) {
        return void 0;
      }
      value = this._mapFn(source.value());
      signal || (signal = new Signal);
      signal["yield"](value);
      return signal;
    };

    TransformedList.prototype._create = function(source, options) {
      var signal;
      signal = this._transformer(source, signal);
      if (!signal) {
        return void 0;
      }
      this._add(signal, source, options);
      return signal;
    };

    TransformedList.prototype._add = function(signal, source, options) {
      this._bySourceId[source.id] = signal;
      this._sourceById[signal.id] = source;
      return TransformedList.__super__._add.call(this, signal, options);
    };

    TransformedList.prototype._set = function(signal, source) {
      var transformed;
      transformed = this._transformer(source, signal);
      if (transformed !== signal) {
        this._delete(signal);
        if (transformed) {
          this._add(transformed, source);
        }
      }
      return true;
    };

    TransformedList.prototype._align = function(signal) {
      var after, before, iterator, source;
      source = this._sourceById[signal.id];
      iterator = this._source.getIterator(source);
      while (iterator.movePrevious() && !before) {
        before = this._bySourceId[iterator.signal.id];
      }
      if (before) {
        return this._move(signal, {
          before: before
        });
      }
      iterator.reset();
      while (iterator.moveNext() && !after) {
        after = this._bySourceId[iterator.signal.id];
      }
      return this._move(signal, {
        after: after
      });
    };

    TransformedList.prototype._delete = function(signal, options) {
      var source;
      source = this._sourceById[signal.id];
      delete this._sourceById[signal.id];
      delete this._bySourceId[source.id];
      return TransformedList.__super__._delete.call(this, signal, options);
    };

    TransformedList.prototype.before = function(signal) {
      var before, source;
      if (signal == null) {
        signal = this._sentinel;
      }
      before = TransformedList.__super__.before.call(this, signal);
      if (before !== void 0) {
        return before;
      }
      source = this._sourceById[signal.id];
      while (!(before || !(source = this._source.before(source)))) {
        before = this._transformer(source);
      }
      if (!(before && source)) {
        return null;
      }
      this._add(before, source, {
        before: signal,
        silent: true
      });
      return before;
    };

    TransformedList.prototype.after = function(signal) {
      var after, source;
      if (signal == null) {
        signal = this._sentinel;
      }
      after = TransformedList.__super__.after.call(this, signal);
      if (after !== void 0) {
        return after;
      }
      source = this._sourceById[signal.id];
      while (!(after || !(source = this._source.after(source)))) {
        after = this._transformer(source);
      }
      if (!(after && source)) {
        return null;
      }
      this._add(after, source, {
        after: signal,
        silent: true
      });
      return after;
    };

    TransformedList.prototype._onSourceEvent = function(event) {
      var signal, source;
      source = event.signal;
      signal = this._bySourceId[source.id];
      switch (event.type) {
        case 'add':
          return this._create(source);
        case 'update':
          return signal && this._set(signal, source);
        case 'move':
          return signal && this._align(signal);
        case 'delete':
          return signal && this._delete(signal);
      }
    };

    return TransformedList;

  })(AbstractList);

  ConcatenatedList = (function(_super) {
    __extends(ConcatenatedList, _super);

    function ConcatenatedList(sources) {
      ConcatenatedList.__super__.constructor.call(this);
      this._sources = Sonic.create(sources);
      this._sources.each(this._addSource);
      this._sources.events.each(this._onSourcesEvent);
    }

    ConcatenatedList._addSource = function(source) {
      return ConcatenatedList._source.events.each(ConcatenatedList._onSourceEvent);
    };

    ConcatenatedList._onSourceEvent = function(event) {
      return ConcatenatedList.events["yield"]({
        type: event.type,
        id: event.signal.id,
        signal: event.signal,
        list: ConcatenatedList
      });
    };

    ConcatenatedList._onSourcesEvent = function(event) {
      switch (event.type) {
        case 'add':
          return ConcatenatedList._addSource(event.signal.value());
        case 'delete':
          return ConcatenatedList._removeSource(event.signal.value());
      }
    };

    return ConcatenatedList;

  })(AbstractList);

  UniqueList = (function(_super) {
    __extends(UniqueList, _super);

    function UniqueList(source) {
      var duplicates, filterFn, iterated, iterator, value;
      this._duplicates = source.duplicates();
      console.log(this._duplicates.toArray());
      iterated = [];
      duplicates = [];
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        value = iterator.current();
        if (__indexOf.call(iterated, value) >= 0) {
          duplicates.push(value);
        } else {
          iterated.push(value);
        }
      }
      return Sonic.create(duplicates);
      filterFn = (function(_this) {
        return function(value) {
          return !_this._duplicates.contains(value);
        };
      })(this);
      UniqueList.__super__.constructor.call(this, source, {
        filterFn: filterFn
      });
    }

    return UniqueList;

  })(TransformedList);

  SortedList = (function(_super) {
    __extends(SortedList, _super);

    function SortedList(source, options) {
      this._transformer = __bind(this._transformer, this);
      var iterator;
      SortedList.__super__.constructor.call(this, source);
      this._sortFn = options.sortFn;
      this._nodeBySignalId = {};
      this._root = new Node(this._sentinel, {
        value: -Infinity
      });
      this._nodeBySignalId[this._sentinel.id] = this._root;
      iterator = this._source.getIterator();
      while (iterator.moveNext()) {
        this._create(iterator.signal, {
          silent: true
        });
      }
    }

    SortedList.prototype._transformer = function(source, signal) {
      var node, value;
      value = this._sortFn(source.value());
      if (this._nodeBySignalId[source.id] == null) {
        node = new Node(source, {
          value: value
        });
        this._nodeBySignalId[source.id] = node;
        this._root.insert(node);
      } else if (this._nodeBySignalId[source.id].value !== value) {
        this._root.remove(this._nodeBySignalId[source.id]);
        node = new Node(source, {
          value: value
        });
        this._nodeBySignalId[source.id] = node;
        this._root.insert(node);
      }
      return source;
    };

    SortedList.prototype.before = function(signal) {
      var before, left, node, parentNode, value;
      if (signal == null) {
        signal = this._sentinel;
      }
      node = this._nodeBySignalId[signal.id];
      if (node === this._root) {
        before = this._root.rightMost();
      } else if (left = node.left) {
        before = left.rightMost();
      } else if (parentNode = node.parent) {
        if (parentNode.isRight()) {
          before = parentNode;
        } else {
          value = before.value;
          while (parentNode && parentNode.value > value) {
            parentNode = parentNode.parent;
          }
          before = parentNode;
        }
      }
      if (before != null) {
        return before.signal;
      }
    };

    SortedList.prototype.after = function(signal) {
      var after, node, parentNode, right, value;
      if (signal == null) {
        signal = this._sentinel;
      }
      node = this._nodeBySignalId[signal.id];
      if (right = node.right) {
        after = right.leftMost();
      } else if (parentNode = node.parent) {
        if (parentNode.isLeft()) {
          after = parentNode;
        } else {
          value = node.value;
          while (parentNode && parentNode.value <= value) {
            parentNode = parentNode.parent;
          }
          after = parentNode;
        }
      }
      if (after != null) {
        return after.signal;
      }
    };

    return SortedList;

  })(TransformedList);

  ReversedList = (function(_super) {
    __extends(ReversedList, _super);

    function ReversedList(source) {
      this._source = source;
      this._byId = this._source._byId;
      this._prev = this._source._prev;
      this._next = this._source._next;
      this.events = this._source.events;
    }

    ReversedList.prototype.before = function(signal) {
      return this._source.after(signal);
    };

    ReversedList.prototype.after = function(signal) {
      return this._source.before(signal);
    };

    return ReversedList;

  })(ProxyList);

  TakeList = (function(_super) {
    __extends(TakeList, _super);

    function TakeList() {
      return TakeList.__super__.constructor.apply(this, arguments);
    }

    return TakeList;

  })(TransformedList);

  Sonic.factory = function(exports) {
    exports._ = Sonic;
    exports.create = Sonic.create;
    exports.Signal = Signal;
    exports.Node = Node;
    exports.Iterator = Iterator;
    exports.AbstractList = AbstractList;
    exports.SimpleList = SimpleList;
    exports.ProxyList = ProxyList;
    exports.TransformedList = TransformedList;
    exports.ConcatenatedList = ConcatenatedList;
    exports.UniqueList = UniqueList;
    exports.SortedList = SortedList;
    exports.ReversedList = ReversedList;
    return exports.TakeList = TakeList;
  };

  if (typeof exports === 'object') {
    Sonic.factory(exports);
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      Sonic.factory(this.Sonic = exports);
      return exports;
    });
  } else {
    Sonic.factory(this.Sonic = {});
  }

}).call(this);
