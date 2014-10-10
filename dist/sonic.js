(function() {
  var AbstractList, ConcatenatedEntry, ConcatenatedList, Entry, Events, FilteredEntry, FilteredList, Iterator, MappedEntry, MappedList, ReversedEntry, ReversedList, SimpleList, Sonic, SortedEntry, SortedList, TailingEntry, TailingList, TreeNode, UniqueList,
    __slice = [].slice,
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

  Iterator = (function() {
    function Iterator(list, entry) {
      this.list = list;
      this.entry = entry;
    }

    Iterator.prototype.current = function() {
      return this.entry.value();
    };

    Iterator.prototype.moveNext = function() {
      this.entry = this.entry.next();
      return (this.entry != null) && this.entry !== this.list.tailEntry;
    };

    Iterator.prototype.movePrevious = function() {
      this.entry = this.entry.previous();
      return (this.entry != null) && this.entry !== this.list.headEntry;
    };

    return Iterator;

  })();

  Events = {
    on: function() {
      var bindings, callback, context, event, name;
      if (typeof arguments[0] === 'string') {
        name = arguments[0];
        callback = arguments[1];
        context = arguments[2] || null;
        if (this._events == null) {
          this._events = {};
        }
        if (this._events[name] == null) {
          this._events[name] = [];
        }
        event = {
          callback: callback,
          context: context
        };
        this._events[name].push(event);
      } else if (typeof arguments[0] === 'object') {
        bindings = arguments[0];
        for (name in bindings) {
          callback = bindings[name];
          this.on(name, callback);
        }
      }
      return this;
    },
    off: function(name, callback, context) {
      var event, names, _i, _j, _len, _len1, _ref;
      if (name == null) {
        name = null;
      }
      if (callback == null) {
        callback = null;
      }
      if (context == null) {
        context = null;
      }
      if (this._events == null) {
        return;
      }
      names = name ? [name] : _.keys(this._events);
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        if (this._events[name] == null) {
          return;
        }
        _ref = this._events[name];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          event = _ref[_j];
          if (((callback == null) || callback === event.callback) && ((context == null) || context === event.context)) {
            this._events[name] = _(this._events[name]).without(event);
          }
        }
      }
      return this;
    },
    once: function() {
      var bindings, callback, context, fn, name;
      if (typeof arguments[0] === 'string') {
        name = arguments[0];
        callback = arguments[1];
        context = arguments[2] || null;
        fn = function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          callback.apply(context, args);
          return this.off(name, arguments.callee, context);
        };
        this.on(name, fn, context);
      } else if (typeof arguments[0] === 'object') {
        bindings = arguments[0];
        for (name in bindings) {
          callback = bindings[name];
          this.once(name, callback);
        }
      }
      return this;
    },
    trigger: function(name) {
      var args, event, _i, _len, _ref, _ref1, _ref2, _ref3;
      if (this._events == null) {
        return;
      }
      if (((_ref = this._events[name]) != null ? _ref.length : void 0) > 0) {
        _ref1 = this._events[name];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          event = _ref1[_i];
          event.callback.apply((_ref2 = event.context) != null ? _ref2 : this, arguments.slice(1));
        }
      }
      if (!(name === '*' || ((_ref3 = this._events['*']) != null ? _ref3.length : void 0) === 0)) {
        args = arguments.slice();
        args.unshift('*');
        this.trigger.apply(this, args);
      }
      return this;
    }
  };

  TreeNode = (function() {
    function TreeNode(value, options) {
      var leftSize, rightSize;
      if (options == null) {
        options = {};
      }
      this.entry = options.entry;
      this.value = value;
      this.left = null;
      this.right = null;
      this.parent = null;
      leftSize = void 0;
      rightSize = void 0;
    }

    TreeNode.prototype.size = function() {
      var _ref, _ref1;
      if (this.leftSize == null) {
        this.leftSize = ((_ref = this.left) != null ? _ref.size() : void 0) || 0;
      }
      if (this.rightSize == null) {
        this.rightSize = ((_ref1 = this.right) != null ? _ref1.size() : void 0) || 0;
      }
      return this.leftSize + this.rightSize + 1;
    };

    TreeNode.prototype.depth = function() {
      return 1 + Math.log(this.size()) / Math.LN2;
    };

    TreeNode.prototype.balance = function() {
      var _ref, _ref1;
      return (((_ref = this.right) != null ? _ref.depth() : void 0) || 0) - (((_ref1 = this.left) != null ? _ref1.depth() : void 0) || 0);
    };

    TreeNode.prototype.isRoot = function() {
      return !this.parent;
    };

    TreeNode.prototype.isLeaf = function() {
      return !this.left && !this.right;
    };

    TreeNode.prototype.leftMost = function() {
      var left;
      if (left = this.left) {
        return left.leftMost();
      }
      return this;
    };

    TreeNode.prototype.rightMost = function() {
      var right;
      if (right = this.right) {
        return right.rightMost();
      }
      return this;
    };

    TreeNode.prototype.isLeft = function() {
      var parent;
      if (parent = this.parent) {
        return this === parent.left;
      }
      return false;
    };

    TreeNode.prototype.isRight = function() {
      var parent;
      if (parent = this.parent) {
        return this === parent.right;
      }
      return false;
    };

    TreeNode.prototype.detach = function() {
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

    TreeNode.prototype.detachLeft = function() {
      var left;
      if (!(left = this.left)) {
        return null;
      }
      left.parent = null;
      this.left = null;
      this.leftSize = 0;
      return left;
    };

    TreeNode.prototype.detachRight = function() {
      var right;
      if (!(right = this.right)) {
        return null;
      }
      this.right.parent = null;
      this.right = null;
      this.rightSize = 0;
      return right;
    };

    TreeNode.prototype.attach = function(node) {
      if (!node) {
        return false;
      }
      if (node.value < this.value) {
        return this.attachLeft(node);
      } else {
        return this.attachRight(node);
      }
    };

    TreeNode.prototype.attachLeft = function(node) {
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

    TreeNode.prototype.attachRight = function(node) {
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

    TreeNode.prototype.remove = function() {
      var left, parent, pivot, right;
      left = this.left;
      right = this.right;
      parent = this.parent;
      this.detach();
      this.detachLeft();
      this.detachRight();
      if (left) {
        pivot = left.rightMost();
        pivot.parent.attachRight(pivot.left);
      } else if (right) {
        pivot = right.leftMost();
        pivot.parent.attachLeft(pivot.right);
      } else {
        return;
      }
      pivot.attach(left);
      pivot.attach(right);
      parent.attach(pivot);
      pivot.normalize();
      return true;
    };

    TreeNode.prototype.insert = function(node) {
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
      }
      this.normalize();
      return true;
    };

    TreeNode.prototype.normalize = function() {
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

    TreeNode.prototype.rotateLeft = function() {
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

    TreeNode.prototype.rotateRight = function() {
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

    return TreeNode;

  })();

  Entry = (function() {
    function Entry(value, options) {
      if (value != null) {
        this._value = value;
      } else {
        this._value = options.value;
      }
      this.id = Sonic.uniqueId();
      if (options) {
        this.list = options.list;
      }
    }

    Entry.prototype.root = function() {
      return this;
    };

    Entry.prototype.value = function() {
      if (this._value != null) {
        return this._value;
      }
    };

    Entry.prototype.next = function() {
      if (this._next) {
        return this.attachNext(this._next);
      }
    };

    Entry.prototype.previous = function() {
      if (this._previous != null) {
        this._previous.setNext(this);
      }
      return this._previous;
    };

    Entry.prototype.setNext = function(next) {
      this._next = next;
      return this;
    };

    Entry.prototype.setPrevious = function(previous) {
      this._previous = previous;
      return this;
    };

    Entry.prototype.attachNext = function(next) {
      this.setNext(next);
      return this._next.setPrevious(this);
    };

    Entry.prototype.attachPrevious = function(previous) {
      this.setPrevious(previous);
      this._previous.setNext(this);
      return this;
    };

    return Entry;

  })();

  TailingEntry = (function(_super) {
    __extends(TailingEntry, _super);

    function TailingEntry(source, options) {
      if (options == null) {
        options = {};
      }
      this.source = source || options.source;
      TailingEntry.__super__.constructor.call(this, void 0, options);
    }

    TailingEntry.prototype.root = function() {
      return this.source.root();
    };

    TailingEntry.prototype.value = function() {
      return this._value || (this._value = this.source.value());
    };

    TailingEntry.prototype.next = function() {
      var sourceNext;
      sourceNext = this.source.next();
      return this._next || (this._next = TailingEntry.__super__.next.call(this) || this.tail(sourceNext));
    };

    TailingEntry.prototype.previous = function() {
      var sourcePrevious;
      sourcePrevious = this.source.previous();
      return this._previous || (this._previous = TailingEntry.__super__.previous.call(this) || this.tail(sourcePrevious));
    };

    TailingEntry.prototype.tail = function(source) {
      return this.list.getBySource(source) || this.list.createBySource(source, {
        silent: true,
        previous: this
      }) || null;
    };

    return TailingEntry;

  })(Entry);

  MappedEntry = (function(_super) {
    __extends(MappedEntry, _super);

    function MappedEntry() {
      return MappedEntry.__super__.constructor.apply(this, arguments);
    }

    MappedEntry.prototype.value = function() {
      return this._value || (this._value = this.list.mapFn(this.source.value()));
    };

    return MappedEntry;

  })(TailingEntry);

  FilteredEntry = (function(_super) {
    __extends(FilteredEntry, _super);

    function FilteredEntry() {
      return FilteredEntry.__super__.constructor.apply(this, arguments);
    }

    FilteredEntry.prototype.next = function() {
      var source;
      if (this._next != null) {
        return this._next;
      }
      source = this.source;
      while (source = source.next()) {
        if (this.list.filterFn(source.value())) {
          break;
        }
      }
      return this.attachNext(this._next || (this._next = this.tail(source)));
    };

    FilteredEntry.prototype.previous = function() {
      var source;
      if (this._previous != null) {
        return this._previous;
      }
      source = this.source;
      while (!this.list.filterFn(source.previous())) {
        source = source.previous();
      }
      return this.attachPrevious(this._previous || (this._previous = this.tail(source)));
    };

    return FilteredEntry;

  })(TailingEntry);

  ConcatenatedEntry = (function(_super) {
    __extends(ConcatenatedEntry, _super);

    function ConcatenatedEntry() {
      return ConcatenatedEntry.__super__.constructor.apply(this, arguments);
    }

    ConcatenatedEntry.prototype.next = function() {
      var nextSourceList, sourceNext;
      if (this._next != null) {
        return this._next;
      }
      sourceNext = this.source.next();
      if (sourceNext === this.source.list.tailEntry) {
        nextSourceList = this.list.sources.after(this.source.list);
        if (nextSourceList) {
          sourceNext = nextSourceList.headEntry.next();
        }
      }
      return this._next || (this._next = this.tail(sourceNext));
    };

    ConcatenatedEntry.prototype.previous = function() {
      var previousSourceList, sourcePrevious;
      if (this._previous != null) {
        return this._previous;
      }
      sourcePrevious = this.source.previous();
      if (sourcePrevious === this.source.list.headEntry) {
        previousSourceList = this.list.sources.before(this.source.list);
        if (previousSourceList) {
          sourcePrevious = nextSourceList.tailEntry.previous();
        }
      }
      return this._previous || (this._previous = this.tail(sourcePrevious));
    };

    return ConcatenatedEntry;

  })(TailingEntry);

  SortedEntry = (function(_super) {
    __extends(SortedEntry, _super);

    function SortedEntry(source, options) {
      var sortVal;
      if (options == null) {
        options = {};
      }
      SortedEntry.__super__.constructor.call(this, source, options);
      if (options.sortVal != null) {
        sortVal = options.sortVal;
      } else {
        sortVal = this.list.sortFn(this.value());
      }
      this.node = new TreeNode(sortVal, {
        entry: this
      });
    }

    SortedEntry.prototype.next = function() {
      var parentNode, right;
      if (right = this.node.right) {
        return right.leftMost().entry;
      } else if (parentNode = this.node.parent) {
        if (this.node.isLeft()) {
          return parentNode.entry;
        } else {
          while (parentNode && parentNode.value <= this.node.value) {
            parentNode = parentNode.parent;
          }
          return parentNode.entry;
        }
      } else {
        return null;
      }
    };

    SortedEntry.prototype.previous = function() {
      var left, parentNode;
      if (left = this.node.left) {
        return left.rightMost().entry;
      } else if (parentNode = this.node.parent) {
        if (this.node.isRight()) {
          return parentNode.entry;
        } else {
          while (parentNode && parentNode.value > this.node.value) {
            parentNode = parentNode.parent;
          }
          return parentNode.entry;
        }
      } else {
        return null;
      }
    };

    return SortedEntry;

  })(TailingEntry);

  ReversedEntry = (function(_super) {
    __extends(ReversedEntry, _super);

    function ReversedEntry() {
      return ReversedEntry.__super__.constructor.apply(this, arguments);
    }

    ReversedEntry.prototype.previous = function() {
      if (this === this.list.headEntry) {
        return null;
      }
      return this._previous || (this._previous = this.tail(this.source.next()));
    };

    ReversedEntry.prototype.next = function() {
      if (this === this.list.tailEntry) {
        return null;
      }
      return this._next || (this._next = this.tail(this.source.previous()));
    };

    return ReversedEntry;

  })(TailingEntry);

  AbstractList = (function() {
    var fn, key;

    AbstractList.prototype.Entry = Entry;

    AbstractList.prototype.HeadEntry = function() {
      return new this.Entry(null, {
        list: this
      });
    };

    AbstractList.prototype.TailEntry = function() {
      return new this.Entry(null, {
        list: this
      });
    };

    for (key in Events) {
      fn = Events[key];
      AbstractList.prototype[key] = fn;
    }

    function AbstractList() {
      this._byId = {};
      this.headEntry = this.HeadEntry();
      this.tailEntry = this.TailEntry();
      this.length = 0;
    }

    AbstractList.prototype._create = function(value, options) {
      var entry, id;
      if (options == null) {
        options = {};
      }
      options.list = this;
      entry = new this.Entry(value, options);
      id = entry.id;
      this._byId[id] = entry;
      this.length++;
      if (!options.silent) {
        this.trigger('create', entry);
      }
      return entry;
    };

    AbstractList.prototype._delete = function(entry, options) {
      if (options == null) {
        options = {};
      }
      if (entry == null) {
        return false;
      }
      this._move(entry, {
        before: null,
        after: null,
        silent: true
      });
      delete this._byId[entry.id];
      this.length--;
      if (!options.silent) {
        this.trigger('delete', entry);
      }
      return true;
    };

    AbstractList.prototype._set = function(entry, value, options) {
      if (options == null) {
        options = {};
      }
      entry.setValue(value);
      if (!options.silent) {
        this.trigger('change', entry, value);
      }
      return true;
    };

    AbstractList.prototype._move = function(entry, options) {
      var next, previous;
      if (options == null) {
        options = {};
      }
      previous = entry.previous();
      next = entry.next();
      if (previous) {
        previous.setNext(next);
      }
      if (next) {
        next.setPrevious(previous);
      }
      previous = options.after || (options.before ? options.before.previous() : void 0);
      next = options.before || (options.after ? options.after.next() : void 0);
      if (previous) {
        entry.setPrevious(previous);
        previous.setNext(entry);
      }
      if (next) {
        entry.setNext(next);
        next.setPrevious(entry);
      }
      if (!options.silent) {
        this.trigger('move', entry);
      }
      return true;
    };

    AbstractList.prototype._swap = function(a, b) {
      var afterA, afterB, beforeA, beforeB;
      beforeA = a.previous();
      beforeB = b.previous();
      afterA = a.next();
      afterB = b.next();
      if (beforeA !== b || afterB !== a) {
        return this._move(a, {
          before: afterB
        }) && this._move(b, {
          after: beforeA
        });
      } else {
        return this._move(a, {
          after: beforeB
        }) && this._move(b, {
          before: afterA
        });
      }
    };

    AbstractList.prototype._insert = function(value, options) {
      var after, before, entry, silent;
      if (options == null) {
        options = {};
      }
      silent = options.silent;
      before = options.before;
      after = options.after;
      entry = this._create(value, {
        silent: silent
      });
      this._move(entry, {
        before: before,
        after: after,
        silent: silent
      });
      return entry;
    };

    AbstractList.prototype.getIterator = function(start) {
      return new Iterator(this, start || this.headEntry);
    };

    AbstractList.prototype.getEntry = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.get = function(id) {
      var entry;
      entry = this.getEntry(id);
      if (entry) {
        return entry.value();
      }
      return void 0;
    };

    AbstractList.prototype.entryAt = function(index) {
      var i, iterator;
      i = -1;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (++i === index) {
          return iterator.current;
        }
      }
      return void 0;
    };

    AbstractList.prototype.at = function(index) {
      var entry;
      entry = this.entryAt(index);
      return this.get(id);
    };

    AbstractList.prototype.entryOf = function(value) {
      var entry, id, _i, _len, _ref;
      _ref = Object.keys(this._byId);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        id = _ref[_i];
        entry = this._byId[id];
        if ((entry != null ? entry.value() : void 0) === value) {
          return entry;
        }
      }
      return void 0;
    };

    AbstractList.prototype.idOf = function(value) {
      var _ref;
      return (_ref = this.entryOf(value)) != null ? _ref.id : void 0;
    };

    AbstractList.prototype.indexOf = function(value) {
      var i, iterator;
      i = -1;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        i++;
        if (iterator.current() === value) {
          return i;
        }
      }
      return -1;
    };

    AbstractList.prototype.contains = function(value) {
      return this.idOf(value) != null;
    };

    AbstractList.prototype.before = function(value) {
      var entry, previous;
      entry = this.entryOf(value);
      previous = entry.previous();
      if (previous !== this.headEntry) {
        return previous.value();
      }
      return void 0;
    };

    AbstractList.prototype.after = function(value) {
      var entry, next;
      entry = this.entryOf(value);
      next = entry.next();
      if (next !== this.tailEntry) {
        return next.value();
      }
      return void 0;
    };

    AbstractList.prototype.forEach = function(fn) {
      return this.each(fn);
    };

    AbstractList.prototype.each = function(fn) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (fn(iterator.current()) === false || iterator.entry.next() === this.tailEntry) {
          return;
        }
      }
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

    AbstractList.prototype.reduce = function(reduceFn, memo) {
      if (memo == null) {
        memo = 0;
      }
      this.each(function(value) {
        return memo = reduceFn(value, memo);
      });
      return memo;
    };

    AbstractList.prototype.map = function(mapFn) {
      return new MappedList(this, {
        mapFn: mapFn
      });
    };

    AbstractList.prototype.filter = function(filterFn) {
      return new FilteredList(this, {
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

    AbstractList.prototype.union = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.concat.apply(this, others).uniq();
    };

    AbstractList.prototype.first = function(count) {
      if (!count) {
        return this.headEntry.next().value();
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
        return this.tailEntry.previous().value();
      }
    };

    AbstractList.prototype.pluck = function(key) {
      return this.map(function(value) {
        return value[key];
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
      var entry, length, previous, value, _i, _len;
      SimpleList.__super__.constructor.apply(this, arguments);
      previous = this.headEntry;
      if (values != null) {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          entry = this._create(value, {
            silent: true
          });
          previous.setNext(entry);
          entry.setPrevious(previous);
          previous = entry;
        }
        length = values.length;
      }
      previous.setNext(this.tailEntry);
      this.tailEntry.setPrevious(previous);
    }

    SimpleList.prototype.set = function(id, value, options) {
      var entry;
      if (options == null) {
        options = {};
      }
      entry = this.getEntry(id);
      if (!entry) {
        return false;
      }
      return this._set(entry, value, options);
    };

    SimpleList.prototype.push = function(value, options) {
      if (options == null) {
        options = {};
      }
      options.before = this.tailEntry;
      return this._insert(value, options).id;
    };

    SimpleList.prototype.unshift = function(value, options) {
      if (options == null) {
        options = {};
      }
      options.after = this.headEntry;
      return this._insert(value, options).id;
    };

    SimpleList.prototype.pop = function(options) {
      var entry;
      entry = this.tailEntry.previous();
      this._delete(entry, options);
      return entry.value();
    };

    SimpleList.prototype.shift = function(options) {
      var entry;
      entry = this.headEntry.next();
      this._delete(entry, options);
      return entry.value();
    };

    SimpleList.prototype.add = function(value, options) {
      return this.push(value, options);
    };

    SimpleList.prototype.remove = function(value, options) {
      var entry;
      entry = this.entryOf(value);
      return this._delete(entry, options);
    };

    SimpleList.prototype["delete"] = function(id, options) {
      var entry;
      entry = this.getEntry(id);
      return this._delete(entry, options);
    };

    return SimpleList;

  })(AbstractList);

  TailingList = (function(_super) {
    __extends(TailingList, _super);

    TailingList.prototype.Entry = TailingEntry;

    TailingList.prototype.HeadEntry = function() {
      return new this.Entry(this.source.headEntry, {
        list: this
      });
    };

    TailingList.prototype.TailEntry = function() {
      return new this.Entry(this.source.tailEntry, {
        list: this
      });
    };

    function TailingList(source, options) {
      if (options == null) {
        options = {};
      }
      this.source = source;
      this._bySourceId = {};
      TailingList.__super__.constructor.call(this, options);
    }

    TailingList.prototype.getBySource = function(sourceEntry) {
      if (sourceEntry === this.headEntry.source) {
        return this.headEntry;
      }
      if (sourceEntry === this.tailEntry.source) {
        return this.tailEntry;
      }
      if (sourceEntry) {
        return this._bySourceId[sourceEntry.id];
      }
      return void 0;
    };

    TailingList.prototype.createBySource = function(sourceEntry, options) {
      var entry;
      if (sourceEntry === this.headEntry.source) {
        return this.headEntry;
      }
      if (sourceEntry === this.tailEntry.source) {
        return this.tailEntry;
      }
      entry = this._create(sourceEntry, options);
      this._bySourceId[sourceEntry.id] = entry;
      return entry;
    };

    TailingList.prototype.deleteBySource = function(sourceEntry, options) {
      var entry, sourceId;
      sourceId = sourceEntry.id;
      entry = this._bySourceId[sourceId];
      this._delete(entry, options);
      return delete this._bySourceId[sourceId];
    };

    return TailingList;

  })(AbstractList);

  MappedList = (function(_super) {
    __extends(MappedList, _super);

    MappedList.prototype.Entry = MappedEntry;

    function MappedList(source, options) {
      if (options == null) {
        options = {};
      }
      MappedList.__super__.constructor.call(this, source, options);
      this.mapFn = options.mapFn;
    }

    return MappedList;

  })(TailingList);

  FilteredList = (function(_super) {
    __extends(FilteredList, _super);

    FilteredList.prototype.Entry = FilteredEntry;

    function FilteredList(source, options) {
      FilteredList.__super__.constructor.call(this, source, options);
      this.filterFn = options.filterFn;
    }

    return FilteredList;

  })(TailingList);

  ConcatenatedList = (function(_super) {
    __extends(ConcatenatedList, _super);

    ConcatenatedList.prototype.Entry = ConcatenatedEntry;

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

    return ConcatenatedList;

  })(TailingList);

  UniqueList = (function(_super) {
    __extends(UniqueList, _super);

    function UniqueList(source, options) {
      if (options == null) {
        options = {};
      }
      options.filterFn = (function(_this) {
        return function(value) {
          return !_this.contains(value);
        };
      })(this);
      UniqueList.__super__.constructor.call(this, source, options);
    }

    return UniqueList;

  })(FilteredList);

  SortedList = (function(_super) {
    __extends(SortedList, _super);

    SortedList.prototype.Entry = SortedEntry;

    SortedList.prototype.HeadEntry = function() {
      return new this.Entry(this.source.headEntry, {
        list: this,
        sortVal: -Infinity
      });
    };

    SortedList.prototype.TailEntry = function() {
      return new this.Entry(this.source.tailEntry, {
        list: this,
        sortVal: Infinity
      });
    };

    function SortedList(source, options) {
      if (options == null) {
        options = {};
      }
      this.rootNode = new TreeNode(0);
      this.sortFn = options.sortFn;
      this._evaluated = false;
      SortedList.__super__.constructor.call(this, source, options);
      this.headEntry.node.insert(this.tailEntry.node);
      this.evaluate();
    }

    SortedList.prototype.evaluate = function() {
      var iterator, sourceEntry;
      if (!this._evaluated) {
        iterator = this.source.getIterator();
        while (iterator.moveNext()) {
          sourceEntry = iterator.entry;
          if (!this._bySourceId[sourceEntry.id]) {
            this.createBySource(sourceEntry, {
              silent: true
            });
          }
        }
        return this._evaluated = true;
      }
      return false;
    };

    SortedList.prototype.createBySource = function(sourceEntry, options) {
      var entry;
      if (options == null) {
        options = {};
      }
      entry = SortedList.__super__.createBySource.call(this, sourceEntry, options);
      this.headEntry.node.insert(entry.node);
      return entry;
    };

    return SortedList;

  })(TailingList);

  ReversedList = (function(_super) {
    __extends(ReversedList, _super);

    function ReversedList() {
      return ReversedList.__super__.constructor.apply(this, arguments);
    }

    ReversedList.prototype.Entry = ReversedEntry;

    ReversedList.prototype.HeadEntry = function() {
      return new this.Entry(this.source.tailEntry, {
        list: this
      });
    };

    ReversedList.prototype.TailEntry = function() {
      return new this.Entry(this.source.headEntry, {
        list: this
      });
    };

    return ReversedList;

  })(TailingList);

  Sonic.factory = function(exports) {
    exports._ = Sonic;
    exports.create = Sonic.create;
    exports.Iterator = Iterator;
    exports.Event = Event;
    exports.TreeNode = TreeNode;
    exports.Entry = Entry;
    exports.TailingEntry = TailingEntry;
    exports.MappedEntry = MappedEntry;
    exports.FilteredEntry = FilteredEntry;
    exports.ConcatenatedEntry = ConcatenatedEntry;
    exports.SortedEntry = SortedEntry;
    exports.ReversedEntry = ReversedEntry;
    exports.AbstractList = AbstractList;
    exports.SimpleList = SimpleList;
    exports.TailingList = TailingList;
    exports.FilteredList = FilteredList;
    exports.MappedList = MappedList;
    exports.ConcatenatedList = ConcatenatedList;
    exports.UniqueList = UniqueList;
    exports.SortedList = SortedList;
    return exports.ReversedList = ReversedList;
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
