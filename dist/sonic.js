(function() {
  var AbstractList, ConcatenatedIterator, ConcatenatedList, FilteredList, GeneratedList, Generator, Iterator, MappedEntry, MappedList, MappedSignal, Observable, ReversedIterator, ReversedList, Signal, SimpleList, Sonic, SortedEntry, SortedIterator, SortedList, TailingEntry, TailingIterator, TailingList, TakeList, TransformedList, Transformer, UniqueList,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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

  Observable = (function() {
    function Observable() {
      this._events = {};
    }

    Observable.prototype.on = function(name, callback, context) {
      var _ref;
      ((_ref = this._events[name]) != null ? _ref.push({
        callback: callback,
        context: context
      }) : void 0) || (this._events[name] = [
        {
          callback: callback,
          context: context
        }
      ]);
      return true;
    };

    Observable.prototype.off = function(name, callback, context) {
      var event, events, i, _i, _ref;
      if (!this._events) {
        return false;
      }
      events = this._events[name];
      for (i = _i = 0, _ref = events.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        event = events[i];
        if ((!callback || callback === event.callback) && (!context || context === event.context)) {
          events.splice(i, 1);
        }
      }
      return true;
    };

    Observable.prototype.once = function(name, callback, context) {
      var fn;
      fn = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        callback.apply(null, args);
        return this.off(name, fn, context);
      };
      this.on(name, fn, context);
      return true;
    };

    Observable.prototype.trigger = function() {
      var args, event, events, name, _i, _len;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!this._events) {
        return false;
      }
      events = this._events[name];
      if (!(events && events.length > 0)) {
        return;
      }
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        event.callback.apply(event.context || this, args);
      }
      if (name !== '*') {
        this.trigger.apply(this, ['*', name].concat(__slice.call(args)));
      }
      return true;
    };

    return Observable;

  })();

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

  MappedSignal = (function(_super) {
    __extends(MappedSignal, _super);

    function MappedSignal(source, mapFn) {
      if (mapFn == null) {
        mapFn = this._noop;
      }
      if (this._source = source) {
        this._source.each(this["yield"]);
      }
      this._mapFn = mapFn;
      MappedSignal.__super__.constructor.call(this, void 0);
    }

    MappedSignal.prototype.value = function() {
      return this._value != null ? this._value : this._value = this._mapFn(this._source.value());
    };

    MappedSignal.prototype["yield"] = function(value) {
      return MappedSignal.__super__["yield"].call(this, this._mapFn(value));
    };

    MappedSignal.prototype.root = function() {
      var _ref;
      return (_ref = this._source) != null ? _ref.root() : void 0;
    };

    MappedSignal.prototype._noop = function(item) {
      return item;
    };

    return MappedSignal;

  })(Signal);

  Transformer = (function() {
    function Transformer(transformation) {
      this._transformation = transformation;
    }

    Transformer.prototype.transform = function(signal) {
      var newSignal;
      newSignal = new Signal();
      signal.forEach((function(_this) {
        return function(value) {
          var newValue;
          newValue = _this._transformation(value);
          return newSignal.set(newValue);
        };
      })(this));
      return newSignal;
    };

    return Transformer;

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

  TailingIterator = (function(_super) {
    __extends(TailingIterator, _super);

    function TailingIterator() {
      return TailingIterator.__super__.constructor.apply(this, arguments);
    }

    TailingIterator.prototype.moveNext = function() {
      if (!this.entry.next) {
        this.attachNext();
      }
      return TailingIterator.__super__.moveNext.apply(this, arguments);
    };

    TailingIterator.prototype.movePrevious = function() {
      if (!this.entry.previous) {
        this.attachPrevious();
      }
      return TailingIterator.__super__.movePrevious.apply(this, arguments);
    };

    return TailingIterator;

  })(Iterator);

  SortedIterator = (function(_super) {
    __extends(SortedIterator, _super);

    function SortedIterator() {
      return SortedIterator.__super__.constructor.apply(this, arguments);
    }

    SortedIterator.prototype.moveNext = function() {
      var parentNode, right, sortValue;
      if (right = this.entry.right) {
        this.entry = right.leftMost();
        return this.entry !== this.list.tailEntry;
      } else if (parentNode = this.entry.parent) {
        if (this.entry.isLeft()) {
          this.entry = parentNode;
          return this.entry !== this.list.tailEntry;
        } else {
          sortValue = this.entry.sortValue();
          while (parentNode && parentNode.sortValue() <= sortValue) {
            parentNode = parentNode.parent;
          }
          this.entry = parentNode;
          return this.entry !== this.list.tailEntry;
        }
      }
      return false;
    };

    SortedIterator.prototype.movePrevious = function() {
      var left, parentNode, sortValue;
      if (left = this.entry.left) {
        this.entry = left.rightMost();
        return true;
      } else if (parentNode = this.entry.parent) {
        if (this.entry.isRight()) {
          this.entry = parentNode;
          return true;
        } else {
          sortValue = this.entry.sortValue();
          while (parentNode && parentNode.sortValue() > sortValue) {
            parentNode = parentNode.parent;
          }
          this.entry = parentNode;
          return true;
        }
      }
      return false;
    };

    return SortedIterator;

  })(TailingIterator);

  ReversedIterator = (function(_super) {
    __extends(ReversedIterator, _super);

    function ReversedIterator() {
      return ReversedIterator.__super__.constructor.apply(this, arguments);
    }

    ReversedIterator.prototype.attachNext = function() {
      var iterator, next;
      if (this.entry.next) {
        return true;
      }
      iterator = this.entry.source.getIterator();
      while (iterator.movePrevious()) {
        next = this.list.getBySource(iterator.entry);
        if (next) {
          break;
        }
      }
      if (!next) {
        return false;
      }
      this.entry.attachNext(next);
      return true;
    };

    ReversedIterator.prototype.attachPrevious = function() {
      var iterator, previous;
      if (this.entry.previous) {
        return true;
      }
      iterator = this.entry.source.getIterator();
      while (iterator.moveNext()) {
        previous = this.list.getBySource(iterator.entry);
        if (previous) {
          break;
        }
      }
      if (!previous) {
        return false;
      }
      this.entry.attachPrevious(previous);
      return true;
    };

    return ReversedIterator;

  })(TailingIterator);

  ConcatenatedIterator = (function(_super) {
    __extends(ConcatenatedIterator, _super);

    function ConcatenatedIterator() {
      return ConcatenatedIterator.__super__.constructor.apply(this, arguments);
    }

    ConcatenatedIterator.prototype._attachNext = function() {
      var next, nextSource, nextSourceList;
      if (this.entry.next) {
        return true;
      }
      nextSource = this.entry.source.getIterator().next().entry;
      if (!nextSource) {
        return false;
      }
      if (nextSource === this.source.list.tailEntry) {
        nextSourceList = this.list.sources.after(this.source.list);
        if (nextSourceList) {
          nextSource = nextSourceList.headEntry.next;
        }
      }
      next = this.list.getBySource(nextSource);
      this.entry.attachNext(next);
      return true;
    };

    ConcatenatedIterator.prototype._attachPrevious = function() {
      var previousSourceList, sourcePrevious;
      if (this._previous != null) {
        return this._previous;
      }
      sourcePrevious = this.source.previous;
      if (sourcePrevious === this.source.list.headEntry) {
        previousSourceList = this.list.sources.before(this.source.list);
        if (previousSourceList) {
          sourcePrevious = nextSourceList.tailEntry.previous;
        }
      }
      return this._previous || (this._previous = this.tail(sourcePrevious));
    };

    return ConcatenatedIterator;

  })(TailingIterator);

  Generator = (function(_super) {
    __extends(Generator, _super);

    function Generator() {
      return Generator.__super__.constructor.apply(this, arguments);
    }

    Generator.prototype.attachNext = function() {
      var next, nextSource, nextSourceId, nextVal;
      if (this.entry.next) {
        return true;
      }
      nextVal = this.list.generatorFn(this.list.source);
      nextSourceId = this.list.source.push(nextVal, {
        silent: true
      });
      nextSource = this.list.source.getEntry(nextSourceId);
      next = this.list.getBySource(nextSource);
      this.entry.attachNext(next);
      return true;
    };

    return Generator;

  })(TailingIterator);

  TailingEntry = (function() {
    function TailingEntry(source, options) {
      if (options == null) {
        options = {};
      }
      this.source = source || options.source;
      if (this.source) {
        this.source.on('update', this._onSourceUpdate, this);
      }
      TailingEntry.__super__.constructor.call(this, void 0, options);
    }

    TailingEntry.prototype.root = function() {
      return this.source.root();
    };

    TailingEntry.prototype.value = function() {
      return this._value != null ? this._value : this._value = this.source.value();
    };

    TailingEntry.prototype._onSourceUpdate = function() {
      this._value = void 0;
      return this.trigger('update', this);
    };

    return TailingEntry;

  })();

  MappedEntry = (function(_super) {
    __extends(MappedEntry, _super);

    function MappedEntry() {
      return MappedEntry.__super__.constructor.apply(this, arguments);
    }

    MappedEntry.prototype.value = function() {
      return this._value != null ? this._value : this._value = this.list.mapFn(this.source.value());
    };

    return MappedEntry;

  })(TailingEntry);

  SortedEntry = (function(_super) {
    __extends(SortedEntry, _super);

    function SortedEntry(source, options) {
      var leftSize, rightSize;
      if (options == null) {
        options = {};
      }
      SortedEntry.__super__.constructor.call(this, source, options);
      this._sortValue = options.sortValue;
      this.left = null;
      this.right = null;
      this.parent = null;
      leftSize = void 0;
      rightSize = void 0;
    }

    SortedEntry.prototype.setValue = function(value) {
      this._sortValue = void 0;
      return SortedEntry.__super__.setValue.call(this, value);
    };

    SortedEntry.prototype.sortValue = function() {
      return this._sortValue != null ? this._sortValue : this._sortValue = this.list.sortFn(this.value());
    };

    SortedEntry.prototype.size = function() {
      var _ref, _ref1;
      if (this.leftSize == null) {
        this.leftSize = ((_ref = this.left) != null ? _ref.size() : void 0) || 0;
      }
      if (this.rightSize == null) {
        this.rightSize = ((_ref1 = this.right) != null ? _ref1.size() : void 0) || 0;
      }
      return this.leftSize + this.rightSize + 1;
    };

    SortedEntry.prototype.depth = function() {
      return 1 + Math.log(this.size()) / Math.LN2;
    };

    SortedEntry.prototype.balance = function() {
      var _ref, _ref1;
      return (((_ref = this.right) != null ? _ref.depth() : void 0) || 0) - (((_ref1 = this.left) != null ? _ref1.depth() : void 0) || 0);
    };

    SortedEntry.prototype.isRoot = function() {
      return !this.parent;
    };

    SortedEntry.prototype.isLeaf = function() {
      return !this.left && !this.right;
    };

    SortedEntry.prototype.leftMost = function() {
      var left;
      if (left = this.left) {
        return left.leftMost();
      }
      return this;
    };

    SortedEntry.prototype.rightMost = function() {
      var right;
      if (right = this.right) {
        return right.rightMost();
      }
      return this;
    };

    SortedEntry.prototype.isLeft = function() {
      var parent;
      if (parent = this.parent) {
        return this === parent.left;
      }
      return false;
    };

    SortedEntry.prototype.isRight = function() {
      var parent;
      if (parent = this.parent) {
        return this === parent.right;
      }
      return false;
    };

    SortedEntry.prototype.detach = function() {
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

    SortedEntry.prototype.detachLeft = function() {
      var left;
      if (!(left = this.left)) {
        return null;
      }
      left.parent = null;
      this.left = null;
      this.leftSize = 0;
      return left;
    };

    SortedEntry.prototype.detachRight = function() {
      var right;
      if (!(right = this.right)) {
        return null;
      }
      this.right.parent = null;
      this.right = null;
      this.rightSize = 0;
      return right;
    };

    SortedEntry.prototype.attach = function(node) {
      if (!node) {
        return false;
      }
      if (node.sortValue() < this.sortValue()) {
        return this.attachLeft(node);
      } else {
        return this.attachRight(node);
      }
    };

    SortedEntry.prototype.attachLeft = function(node) {
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

    SortedEntry.prototype.attachRight = function(node) {
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

    SortedEntry.prototype.remove = function() {
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

    SortedEntry.prototype.insert = function(node) {
      var left, otherValue, parent, right, value;
      value = this.sortValue();
      otherValue = node.sortValue();
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

    SortedEntry.prototype.normalize = function() {
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

    SortedEntry.prototype.rotateLeft = function() {
      var parent, pivot;
      pivot = this.right;
      if (pivot.sortValue() <= this.sortValue()) {
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

    SortedEntry.prototype.rotateRight = function() {
      var parent, pivot;
      pivot = this.left;
      if (pivot.sortValue() > this.sortValue()) {
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

    return SortedEntry;

  })(TailingEntry);

  AbstractList = (function() {
    AbstractList.prototype.Iterator = Iterator;

    function AbstractList() {
      this._onSignalUpdate = __bind(this._onSignalUpdate, this);
      this._byId = {};
      this._next = {};
      this._previous = {};
      this._headSignal = {
        id: Sonic.uniqueId()
      };
      this._tailSignal = {
        id: Sonic.uniqueId()
      };
      this._byId[this._headSignal.id] = this._headSignal;
      this._byId[this._tailSignal.id] = this._tailSignal;
      this.events = new Signal(null);
    }

    AbstractList.prototype._onSignalUpdate = function(value, signal) {
      if (!this._byId[signal.id]) {
        return false;
      }
      return this.events["yield"]({
        type: 'update',
        object: this,
        key: signal.id,
        value: signal
      });
    };

    AbstractList.prototype._create = function(value, options) {
      var signal;
      signal = new Signal(value);
      signal.forEach(this._onSignalUpdate);
      this._add(signal, options);
      return signal;
    };

    AbstractList.prototype._createBefore = function(value, other, options) {
      if (other == null) {
        other = this._tailSignal;
      }
      if (options == null) {
        options = {};
      }
      options.before = other;
      return this._create(value, options);
    };

    AbstractList.prototype._createAfter = function(value, other, options) {
      if (other == null) {
        other = this._headSignal;
      }
      if (options == null) {
        options = {};
      }
      options.after = other;
      return this._create(value, options);
    };

    AbstractList.prototype._add = function(signal, options) {
      if (!this._byId[signal.id]) {
        this._byId[signal.id] = signal;
      }
      if (!(options != null ? options.silent : void 0)) {
        this.events["yield"]({
          type: 'add',
          object: this,
          key: signal.id,
          value: signal
        });
      }
      if (options && (options.before || options.after)) {
        this._move(signal, options);
      }
      return true;
    };

    AbstractList.prototype._addBefore = function(signal, other, options) {
      if (other == null) {
        other = this._tailSignal;
      }
      if (options == null) {
        options = {};
      }
      options.before = other;
      return this._add(signal, options);
    };

    AbstractList.prototype._addAfter = function(signal, other, options) {
      if (other == null) {
        other = this._headSignal;
      }
      if (options == null) {
        options = {};
      }
      options.after = other;
      return this._add(signal, options);
    };

    AbstractList.prototype._delete = function(signal, options) {
      var id;
      this._remove(signal);
      id = signal.id;
      delete this._byId[id];
      delete this._next[id];
      delete this._previous[id];
      if (!(options != null ? options.silent : void 0)) {
        this.events["yield"]({
          type: 'delete',
          object: this,
          key: signal.id,
          value: signal
        });
      }
      return true;
    };

    AbstractList.prototype._remove = function(signal) {
      return this._move(signal);
    };

    AbstractList.prototype._move = function(signal, options) {
      var id, next, previous;
      id = signal.id;
      if (this._next[id]) {
        this._previous[this._next[id].id] = this._previous[id];
      }
      if (this._previous[id]) {
        this._next[this._previous[id].id] = this._next[id];
      }
      if (options && (options.before || options.after)) {
        previous = options.after || (options.before ? this._previous[options.before.id] : void 0);
        next = options.before || (options.after ? this._next[options.after.id] : void 0);
        this._previous[id] = previous;
        this._next[id] = next;
        if (previous) {
          this._next[previous.id] = signal;
        }
        if (next) {
          this._previous[next.id] = signal;
        }
      }
      if (!(options != null ? options.silent : void 0)) {
        this.events["yield"]({
          type: 'move',
          object: this,
          key: signal.id,
          value: signal
        });
      }
      return true;
    };

    AbstractList.prototype._moveBefore = function(signal, other) {
      return this._move(signal, {
        before: other
      });
    };

    AbstractList.prototype._moveAfter = function(signal, other) {
      return this._move(signal, {
        after: other
      });
    };

    AbstractList.prototype.getIterator = function(start) {
      start || (start = this._headSignal);
      return new this.Iterator(this, start);
    };

    AbstractList.prototype.before = function(signal) {
      var previous;
      previous = this._previous[(signal != null ? signal.id : void 0) || this._tailSignal.id];
      if (previous === this._headSignal) {
        return null;
      }
      return previous;
    };

    AbstractList.prototype.after = function(signal) {
      var next;
      next = this._next[(signal != null ? signal.id : void 0) || this._headSignal.id];
      if (next === this._tailSignal) {
        return null;
      }
      return next;
    };

    AbstractList.prototype.getSignal = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.get = function(id) {
      var _ref;
      return (_ref = this.getSignal(id)) != null ? _ref.value() : void 0;
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
      var id, signal, _i, _len, _ref;
      _ref = Object.keys(this._byId);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        signal = this._byId[id];
        if (signal === this._headSignal || signal === this._tailSignal) {
          continue;
        }
        if ((signal != null ? signal.value() : void 0) === value) {
          return signal;
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
      var i, iterator;
      if (limit == null) {
        limit = Infinity;
      }
      i = -1;
      iterator = this.getIterator();
      while (iterator.moveNext() && ++i < limit) {
        if (iterator.current() === value) {
          return i;
        }
      }
      return -1;
    };

    AbstractList.prototype.contains = function(value) {
      return this.idOf(value) != null;
    };

    AbstractList.prototype.forEach = function(fn) {
      return this.each(fn);
    };

    AbstractList.prototype.each = function(fn) {
      return this.eachSignal(function(signal) {
        return fn(signal.value());
      });
    };

    AbstractList.prototype.eachSignal = function(fn) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (fn(iterator.signal) === false) {
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
      return this.findSignal(function(signal) {
        return fn(signal.value());
      });
    };

    AbstractList.prototype.findSignal = function(fn) {
      var result;
      result = void 0;
      this.eachSignal(function(signal) {
        if (fn(signal)) {
          result = signal;
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
      return new SortedList(this, sortFn);
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

    AbstractList.prototype.union = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.concat.apply(this, others).uniq();
    };

    AbstractList.prototype.take = function(count) {
      return new TakeList(this, count);
    };

    AbstractList.prototype.first = function(count) {
      if (count) {
        return this.take(count);
      } else {
        return this.getIterator(this.headSignal).next().value;
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
        return this.before(this._tailSignal).value();
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

    return AbstractList;

  })();

  SimpleList = (function(_super) {
    __extends(SimpleList, _super);

    function SimpleList(values) {
      var previous, signal, value, _i, _len;
      SimpleList.__super__.constructor.apply(this, arguments);
      this._previous[this._tailSignal.id] = this._headSignal;
      this._next[this._headSignal.id] = this._tailSignal;
      previous = this._headSignal;
      for (_i = 0, _len = values.length; _i < _len; _i++) {
        value = values[_i];
        signal = new Signal(value);
        this._previous[signal.id] = previous;
        this._next[previous.id] = signal;
        previous = signal;
      }
      this._previous[this._tailSignal.id] = previous;
      this._next[previous.id] = this._tailSignal;
    }

    SimpleList.prototype.set = function(id, value, options) {
      var signal;
      if (options == null) {
        options = {};
      }
      signal = this.getSignal(id);
      if (!signal) {
        return false;
      }
      signal["yield"](value);
      return true;
    };

    SimpleList.prototype.push = function(value, options) {
      if (options == null) {
        options = {};
      }
      return this._createBefore(value).id;
    };

    SimpleList.prototype.unshift = function(value, options) {
      if (options == null) {
        options = {};
      }
      return this._createAfter(value).id;
    };

    SimpleList.prototype.pop = function(options) {
      var signal;
      signal = this.before(this._tailSignal);
      this._delete(signal, options);
      return signal.value();
    };

    SimpleList.prototype.shift = function(options) {
      var signal;
      signal = this.after(this._headSignal);
      this._delete(signal, options);
      return signal.value();
    };

    SimpleList.prototype.add = function(value, options) {
      return this.push(value, options);
    };

    SimpleList.prototype.remove = function(value, options) {
      var signal;
      signal = this.signalOf(value);
      return this._delete(signal, options);
    };

    SimpleList.prototype["delete"] = function(id, options) {
      var signal;
      signal = this.getSignal(id);
      return this._delete(signal, options);
    };

    return SimpleList;

  })(AbstractList);

  TailingList = (function(_super) {
    __extends(TailingList, _super);

    TailingList.prototype.Iterator = TailingIterator;

    function TailingList(source, options) {
      if (options == null) {
        options = {};
      }
      this.source = source;
      this._bySourceId = {};
      this.source.on('create', this._onSourceCreate, this);
      this.source.on('delete', this._onSourceDelete, this);
      this.source.on('move', this._onSourceMove, this);
      TailingList.__super__.constructor.call(this, options);
    }

    return TailingList;

  })(AbstractList);

  MappedList = (function(_super) {
    __extends(MappedList, _super);

    function MappedList(source, mapFn) {
      this._source = source;
      this._byRootId = {};
      this._mapFn = mapFn;
      MappedList.__super__.constructor.call(this);
    }

    MappedList.prototype._create = function(other, options) {
      var signal;
      signal = new MappedSignal(other, this._mapFn);
      this._byRootId[signal.id] = other;
      this._add(signal, options);
      return signal;
    };

    MappedList.prototype.before = function(signal) {
      var before, beforeRoot, root;
      before = MappedList.__super__.before.call(this, signal);
      if (before !== void 0) {
        return before;
      }
      root = signal != null ? typeof signal.root === "function" ? signal.root() : void 0 : void 0;
      beforeRoot = this._source.before(root);
      if (!beforeRoot) {
        return beforeRoot;
      }
      before = this._byRootId[beforeRoot.id];
      if (before) {
        return before;
      }
      before = this._createBefore(beforeRoot, signal, {
        silent: true
      });
      return before;
    };

    MappedList.prototype.after = function(signal) {
      var after, afterRoot, root;
      after = MappedList.__super__.after.call(this, signal);
      if (after !== void 0) {
        return after;
      }
      root = signal != null ? typeof signal.root === "function" ? signal.root() : void 0 : void 0;
      afterRoot = this._source.after(root);
      if (!afterRoot) {
        return afterRoot;
      }
      after = this._byRootId[afterRoot.id];
      if (after) {
        return after;
      }
      after = this._createAfter(afterRoot, signal, {
        silent: true
      });
      return after;
    };

    return MappedList;

  })(AbstractList);

  FilteredList = (function(_super) {
    __extends(FilteredList, _super);

    function FilteredList(source, filterFn) {
      this._source = source;
      this._byRootId = {};
      this._filterFn = filterFn;
      FilteredList.__super__.constructor.call(this);
    }

    FilteredList.prototype._add = function(signal, options) {
      if (!this._filterFn(signal.value())) {
        return false;
      }
      return FilteredList.__super__._add.call(this, signal, options);
    };

    FilteredList.prototype.before = function(signal) {
      var before, beforeRoot, root;
      before = FilteredList.__super__.before.call(this, signal);
      if (before !== void 0) {
        return before;
      }
      root = typeof signal.root === "function" ? signal.root() : void 0;
      beforeRoot = this._source.before(root);
      if (!beforeRoot) {
        return beforeRoot;
      }
      while (!this._add(beforeRoot.value())) {
        beforeRoot = this._source.before(beforeRoot);
        if (!beforeRoot) {
          return beforeRoot;
        }
      }
      return beforeRoot;
    };

    FilteredList.prototype.after = function(signal) {
      var after, afterRoot, root;
      after = FilteredList.__super__.after.call(this, signal);
      if (after !== void 0) {
        return after;
      }
      root = typeof signal.root === "function" ? signal.root() : void 0;
      afterRoot = this._source.after(root);
      if (!afterRoot) {
        return afterRoot;
      }
      while (!this._add(afterRoot.value())) {
        afterRoot = this._source.after(afterRoot);
        if (!afterRoot) {
          return afterRoot;
        }
      }
      return afterRoot;
    };

    return FilteredList;

  })(AbstractList);

  ConcatenatedList = (function(_super) {
    __extends(ConcatenatedList, _super);

    ConcatenatedList.prototype.Iterator = ConcatenatedIterator;

    function ConcatenatedList(sources, options) {
      var source;
      if (options == null) {
        options = {};
      }
      this.sources = Sonic.create(sources);
      source = {
        headEntry: this.sources.first().headEntry,
        tailEntry: this.sources.last().tailEntry
      };
      ConcatenatedList.__super__.constructor.call(this, source, options);
    }

    ConcatenatedList.prototype.getBySource = function(sourceEntry) {
      var listId, sourceList;
      listId = this.sources.idOf(sourceEntry.list);
      sourceList = this.sources.entryOf(listId);
      return this._bySourceId[listId][sourceEntry.id] || this._create(sourceEntry, {
        silent: true
      });
    };

    ConcatenatedList.prototype._create = function(sourceEntry, options) {
      var entry;
      if (options == null) {
        options = {};
      }
      entry = ConcatenatedList.__super__._create.call(this, sourceEntry, options);
      this._bySourceId[sourceEntry.id] = entry;
      return entry;
    };

    return ConcatenatedList;

  })(TailingList);

  UniqueList = (function(_super) {
    __extends(UniqueList, _super);

    function UniqueList(source, options) {
      if (options == null) {
        options = {};
      }
      UniqueList.__super__.constructor.call(this, source, options);
      this._duplicates = new SimpleList();
      if (typeof Map !== "undefined" && Map !== null) {
        this._map = new Map();
      }
      this.on('update', this._onUpdate, this);
    }

    UniqueList.prototype._create = function(sourceEntry, options) {
      var entry;
      if (this.contains(sourceEntry.value())) {
        this._duplicates.push(sourceEntry);
        return null;
      }
      entry = UniqueList.__super__._create.call(this, sourceEntry, options);
      if (this._map) {
        this._map.set(entry.value(), entry);
      }
      return entry;
    };

    UniqueList.prototype._delete = function(entry, options) {
      var value, wrapper;
      value = entry.value();
      if (!UniqueList.__super__._delete.call(this, entry, options)) {
        return false;
      }
      if (this._map) {
        this._map["delete"](value);
      }
      wrapper = this._duplicates.findEntry(function(wrapper) {
        return value === wrapper.value().value();
      });
      if (wrapper) {
        this._duplicates["delete"](wrapper.id);
        this._insert(wrapper.value());
      }
      return true;
    };

    UniqueList.prototype.entryOf = function(value) {
      if (this._map) {
        return this._map.get(value);
      } else {
        return UniqueList.__super__.entryOf.apply(this, arguments);
      }
    };

    UniqueList.prototype._onUpdate = function(entry) {
      this._delete(entry);
      return this._insert(entry.source);
    };

    return UniqueList;

  })(TailingList);

  SortedList = (function(_super) {
    __extends(SortedList, _super);

    SortedList.prototype.Entry = SortedEntry;

    SortedList.prototype.Iterator = SortedIterator;

    SortedList.prototype.HeadEntry = function() {
      return new this.Entry(null, {
        list: this,
        source: this.source.headEntry,
        sortValue: -Infinity
      });
    };

    SortedList.prototype.TailEntry = function() {
      return new this.Entry(null, {
        list: this,
        source: this.source.tailEntry,
        sortValue: Infinity
      });
    };

    function SortedList(source, options) {
      if (options == null) {
        options = {};
      }
      this.sortFn = options.sortFn;
      this._evaluated = false;
      SortedList.__super__.constructor.call(this, source, options);
      this.headEntry.insert(this.tailEntry);
      this.evaluate();
    }

    SortedList.prototype.evaluate = function() {
      var iterator, sourceEntry;
      if (this._evaluated) {
        return false;
      }
      iterator = this.source.getIterator();
      while (iterator.moveNext()) {
        sourceEntry = iterator.entry;
        if (!this._bySourceId[sourceEntry.id]) {
          this._insert(sourceEntry, {
            silent: true
          });
        }
      }
      return this._evaluated = true;
    };

    SortedList.prototype._move = function(entry, options) {
      if (options == null) {
        options = {};
      }
      entry.remove();
      this.headEntry.insert(entry);
      if (!options.silent) {
        this.trigger('move', entry.id);
      }
      return true;
    };

    SortedList.prototype._onEntryEvent = function(event, entry) {
      if (event === 'update') {
        this._move(entry);
      }
      return SortedList.__super__._onEntryEvent.apply(this, arguments);
    };

    return SortedList;

  })(TailingList);

  ReversedList = (function(_super) {
    __extends(ReversedList, _super);

    function ReversedList() {
      return ReversedList.__super__.constructor.apply(this, arguments);
    }

    return ReversedList;

  })(FilteredList);

  TakeList = (function(_super) {
    __extends(TakeList, _super);

    TakeList.prototype.HeadEntry = function() {
      return new this.Entry(null, {
        list: this,
        source: this.source.headEntry
      });
    };

    TakeList.prototype.TailEntry = function() {
      return new this.Entry(null, {
        list: this,
        source: this.source.entryAt(this.count)
      });
    };

    function TakeList(source, options) {
      if (options == null) {
        options = {};
      }
      this.count = options.count;
      TakeList.__super__.constructor.call(this, source, options);
    }

    TakeList.prototype._create = function(sourceEntry, options) {
      if (options == null) {
        options = {};
      }
      if (this.source.indexOfEntry(sourceEntry, this.count) > -1) {
        return TakeList.__super__._create.call(this, sourceEntry, options);
      }
      return null;
    };

    return TakeList;

  })(TailingList);

  GeneratedList = (function(_super) {
    __extends(GeneratedList, _super);

    GeneratedList.prototype.Iterator = Generator;

    function GeneratedList(fn, options) {
      var source;
      if (options == null) {
        options = {};
      }
      this.generatorFn = fn;
      source = Sonic.create(options.init);
      GeneratedList.__super__.constructor.call(this, source, options);
    }

    GeneratedList.prototype.toArray = function() {
      return this.source.toArray();
    };

    return GeneratedList;

  })(TailingList);

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
      this._mapFn = options.mapFn || function(value) {
        return value;
      };
      this._filterFn = options.filterFn || function(value) {
        return true;
      };
      TransformedList.__super__.constructor.apply(this, arguments);
    }

    TransformedList.prototype._transformer = function(sourceSignal, signal) {
      var value;
      if (this._filterFn(sourceSignal.value())) {
        value = this._mapFn(sourceSignal.value());
        if (signal) {
          signal["yield"](value);
        } else {
          signal = new Signal(value);
        }
        return signal;
      } else {
        return null;
      }
    };

    TransformedList.prototype._create = function(sourceSignal, options) {
      var signal;
      signal = this._transformer(sourceSignal);
      if (!signal) {
        return signal;
      }
      this._add(signal, sourceSignal, options);
      return signal;
    };

    TransformedList.prototype._add = function(signal, sourceSignal, options) {
      this._bySourceId[sourceSignal.id] = signal;
      this._sourceById[signal.id] = sourceSignal;
      return TransformedList.__super__._add.call(this, signal, options);
    };

    TransformedList.prototype._move = function(signal) {
      TransformedList.__super__._move.call(this, signal, {
        silent: true
      });
      this.before(signal);
      this.after(signal);
      this.events["yield"]({
        type: 'move',
        object: this,
        key: signal.id,
        value: signal
      });
      return true;
    };

    TransformedList.prototype._delete = function(signal, options) {
      var id, source;
      id = signal.id;
      source = this._bySourceId[id];
      delete this._bySourceId[source.id];
      delete this._sourceById[id];
      return TransformedList.__super__._delete.call(this, signal, options);
    };

    TransformedList.prototype._onSourceEvent = function(event) {
      var oldSignal, signal, sourceSignal;
      sourceSignal = event.value;
      switch (event.type) {
        case 'add':
          signal = this._create(sourceSignal);
          break;
        case 'delete':
          signal = this._bySourceId[sourceSignal.id];
          if (signal) {
            this._delete(signal);
          }
          break;
        case 'update':
          oldSignal = this._bySourceId[sourceSignal.id];
          signal = this._transformer(sourceSignal);
          if (oldSignal === signal) {
            this.events["yield"]({
              type: 'update',
              object: this,
              key: signal.id,
              value: signal
            });
          } else {
            if (oldSignal) {
              this._delete(oldSignal);
            }
            if (signal) {
              this._add(signal, sourceSignal);
            }
          }
      }
      return true;
    };

    TransformedList.prototype.before = function(signal) {
      var before, beforeSource, other, source;
      if (!signal) {
        return this.before(this._tailSignal);
      }
      before = TransformedList.__super__.before.call(this, signal);
      if (before !== void 0) {
        return before;
      }
      source = this._sourceById[signal.id];
      beforeSource = this._source.before(source);
      if (!beforeSource) {
        return beforeSource;
      }
      while (!(other = this._createBefore(beforeSource, signal))) {
        beforeSource = this._source.before(beforeSource);
        if (!beforeSource) {
          return beforeSource;
        }
      }
      return other;
    };

    TransformedList.prototype.after = function(signal) {
      var after, afterSource, other, source;
      if (!signal) {
        return this.after(this._headSignal);
      }
      after = TransformedList.__super__.after.call(this, signal);
      if (after !== void 0) {
        return after;
      }
      source = this._sourceById[signal.id];
      afterSource = this._source.after(source);
      if (!afterSource) {
        return afterSource;
      }
      while (!(other = this._createAfter(afterSource, signal))) {
        afterSource = this._source.after(afterSource);
        if (!afterSource) {
          return afterSource;
        }
      }
      return other;
    };

    return TransformedList;

  })(AbstractList);

  Sonic.factory = function(exports) {
    exports._ = Sonic;
    exports.create = Sonic.create;
    exports.Observable = Observable;
    exports.Signal = Signal;
    exports.MappedSignal = MappedSignal;
    exports.Transformer = Transformer;
    exports.Iterator = Iterator;
    exports.TailingIterator = TailingIterator;
    exports.SortedIterator = SortedIterator;
    exports.ReversedIterator = ReversedIterator;
    exports.ConcatenatedIterator = ConcatenatedIterator;
    exports.Generator = Generator;
    exports.AbstractList = AbstractList;
    exports.SimpleList = SimpleList;
    exports.TailingList = TailingList;
    exports.FilteredList = FilteredList;
    exports.MappedList = MappedList;
    exports.ConcatenatedList = ConcatenatedList;
    exports.UniqueList = UniqueList;
    exports.SortedList = SortedList;
    exports.ReversedList = ReversedList;
    exports.TakeList = TakeList;
    exports.GeneratedList = GeneratedList;
    return exports.TransformedList = TransformedList;
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
