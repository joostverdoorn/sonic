(function() {
  var AbstractList, ConcatenatedEntry, ConcatenatedList, Entry, Events, FilteredEntry, FilteredList, Iterator, MappedEntry, MappedList, SimpleList, Sonic, SortedList, TailingEntry, TailingList, UniqueList,
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

  Entry = (function() {
    function Entry(value, options) {
      this._value = value || options.value;
      if (options) {
        this.id = options.id;
        this.list = options.list;
        this._next = options.next;
        this._previous = options.previous;
      }
    }

    Entry.prototype.root = function() {
      return this;
    };

    Entry.prototype.value = function() {
      return this._value;
    };

    Entry.prototype.next = function() {
      return this._next;
    };

    Entry.prototype.setNext = function(next) {
      return this._next = next;
    };

    Entry.prototype.previous = function() {
      return this._previous;
    };

    Entry.prototype.setPrevious = function(previous) {
      return this._previous = previous;
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
      var next, sourceNext;
      next = this._next;
      if (next) {
        return next;
      }
      if (sourceNext = this.source.next()) {
        next = this.list.getBySource(sourceNext) || this.list.createBySource(sourceNext, {
          silent: true,
          previous: this
        }) || null;
        return this._next = next;
      }
      return null;
    };

    TailingEntry.prototype.previous = function() {
      var previous, sourcePrevious;
      previous = this._previous;
      if (previous) {
        return previous;
      }
      if (sourcePrevious = this.source.previous()) {
        previous = this.list.getBySource(sourcePrevious) || this.list.createBySource(sourcePrevious, {
          silent: true,
          next: this
        }) || null;
        return this._previous = previous;
      }
      return null;
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

    FilteredEntry.prototype.value = function() {
      return this._value || (this._value = this.source.value());
    };

    FilteredEntry.prototype.next = function() {
      var next, source;
      next = this._next;
      if (next) {
        return next;
      }
      source = this.source;
      while (source = source.next()) {
        if (this.list.filterFn(source.value())) {
          break;
        }
      }
      if (source) {
        next = this.list.getBySource(source) || this.list.createBySource(source, {
          silent: true,
          previous: this
        }) || null;
        return this._next = next;
      }
      return null;
    };

    FilteredEntry.prototype.previous = function() {
      var previous, source;
      previous = this._previous;
      if (previous) {
        return previous;
      }
      source = this.source;
      while (!this.list.filterFn(source.previous())) {
        source = source.previous();
      }
      if (source) {
        previous = this.list.getBySource(source) || this.list.createBySource(source, {
          silent: true,
          previous: this
        }) || null;
        return this._previous = previous;
      }
      return null;
    };

    return FilteredEntry;

  })(TailingEntry);

  ConcatenatedEntry = (function(_super) {
    __extends(ConcatenatedEntry, _super);

    function ConcatenatedEntry(source, options) {
      if (options == null) {
        options = {};
      }
      ConcatenatedEntry.__super__.constructor.call(this, source, options);
    }

    ConcatenatedEntry.prototype.value = function() {
      return this._value || (this._value = this.source.value());
    };

    ConcatenatedEntry.prototype.next = function() {
      var next, nextSourceList, sourceNext;
      next = this._next;
      if (next) {
        return next;
      }
      sourceNext = this.source.next();
      if (sourceNext === this.source.list.tailEntry) {
        nextSourceList = this.list.sources.after(this.source.list);
        if (nextSourceList) {
          sourceNext = nextSourceList.headEntry.next();
        }
      }
      if (sourceNext) {
        next = this.list.getBySource(sourceNext) || this.list.createBySource(sourceNext, {
          silent: true,
          previous: this
        }) || null;
        return this._next = next;
      }
      return null;
    };

    ConcatenatedEntry.prototype.previous = function() {
      var previous, previousSourceList, sourcePrevious;
      previous = this._previous;
      if (previous) {
        return previous;
      }
      sourcePrevious = this.source.previous();
      if (sourcePrevious === this.source.list.headEntry) {
        previousSourceList = this.list.sources.before(this.source.list);
        if (previousSourceList) {
          sourcePrevious = nextSourceList.tailEntry.previous();
        }
      }
      if (sourcePrevious) {
        previous = this.list.getBySource(sourcePrevious) || this.list.createBySource(sourcePrevious, {
          silent: true,
          next: this
        }) || null;
        return this._previous = previous;
      }
      return null;
    };

    return ConcatenatedEntry;

  })(TailingEntry);

  AbstractList = (function() {
    var fn, key;

    AbstractList.prototype.Entry = Entry;

    for (key in Events) {
      fn = Events[key];
      AbstractList.prototype[key] = fn;
    }

    function AbstractList() {
      this._byId = {};
      this.headEntry = new this.Entry(null, {
        list: this
      });
      this.tailEntry = new this.Entry(null, {
        list: this
      });
      this.length = 0;
    }

    AbstractList.prototype._create = function(value, options) {
      var entry, entryOptions, id;
      if (options == null) {
        options = {};
      }
      id = Sonic.uniqueId();
      entryOptions = options.entryOptions || {};
      entryOptions.id = id;
      entryOptions.list = this;
      entry = new this.Entry(value, entryOptions);
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

    AbstractList.prototype.getEntry = function(id) {
      return this._byId[id];
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

    AbstractList.prototype._entryOf = function(value) {
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

    AbstractList.prototype._entryAt = function(index) {
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

    AbstractList.prototype.getIterator = function(start) {
      return new Iterator(this, start || this.headEntry);
    };

    AbstractList.prototype.get = function(id) {
      var entry;
      entry = this.getEntry(id);
      if (entry) {
        return entry.value();
      }
      return void 0;
    };

    AbstractList.prototype.set = function(id, value, options) {
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

    AbstractList.prototype.at = function(index) {
      var entry;
      entry = this._entryAt(index);
      return this.get(id);
    };

    AbstractList.prototype.before = function(value) {
      var entry, previous;
      entry = this._entryOf(value);
      previous = entry.previous();
      if (previous !== this.headEntry) {
        return previous.value();
      }
      return void 0;
    };

    AbstractList.prototype.after = function(value) {
      var entry, next;
      entry = this._entryOf(value);
      next = entry.next();
      if (next !== this.tailEntry) {
        return next.value();
      }
      return void 0;
    };

    AbstractList.prototype.idOf = function(value) {
      var _ref;
      return (_ref = this._entryOf(value)) != null ? _ref.id : void 0;
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
      entry = this._entryOf(value);
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

    function TailingList(source, options) {
      if (options == null) {
        options = {};
      }
      TailingList.__super__.constructor.call(this, options);
      this.source = source;
      this._bySourceId = [];
      this.headEntry.source = this.source.headEntry;
      this.tailEntry.source = this.source.tailEntry;
    }

    TailingList.prototype.getBySource = function(sourceEntry) {
      if (sourceEntry) {
        return this._bySourceId[sourceEntry.id];
      }
      return void 0;
    };

    TailingList.prototype.createBySource = function(sourceEntry, options) {
      var entry;
      if (sourceEntry === this.source.headEntry) {
        return this.headEntry;
      }
      if (sourceEntry === this.source.tailEntry) {
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

    function SortedList(source, sortFn) {
      this.source = source;
      this.sortFn = sortFn;
      SortedList.__super__.constructor.apply(this, arguments);
    }

    SortedList.prototype.before = function(id) {
      if (!this._evaluated) {
        this._evaluate();
      }
      return SortedList.__super__.before.call(this, id);
    };

    SortedList.prototype.after = function(id) {
      if (!this._evaluated) {
        this._evaluate();
      }
      return SortedList.__super__.after.call(this, id);
    };

    SortedList.prototype.move = function(id, options) {
      if (options == null) {
        options = {};
      }
    };

    SortedList.prototype._sort = function(headEntry, length) {
      var half, midId;
      if (headEntry == null) {
        headEntry = this.headEntry;
      }
      if (length == null) {
        length = this.length;
      }
      half = Math.ceil(length / 2);
      midId = this.idAt(half);
      return this._merge(this._sort(left, half), this._sort(right, length - half));
    };

    SortedList.prototype._merge = function(headEntry, length) {};

    SortedList.prototype._evaluate = function() {
      var id, iterator, sourceId, _results;
      this._evaluated = true;
      iterator = this.source.getIterator();
      _results = [];
      while (iterator.moveNext()) {
        sourceId = iterator.id;
        id = this.insert(iterator.current(), {
          before: this.tailEntry
        });
        this._sourceIdById[id] = sourceId;
        _results.push(this._idBySourceId[sourceId] = id);
      }
      return _results;
    };

    return SortedList;

  })(AbstractList);

  Sonic.factory = function(exports) {
    exports._ = Sonic;
    exports.create = Sonic.create;
    exports.Iterator = Iterator;
    exports.Event = Event;
    exports.Entry = Entry;
    exports.TailingEntry = TailingEntry;
    exports.MappedEntry = MappedEntry;
    exports.FilteredEntry = FilteredEntry;
    exports.ConcatenatedEntry = ConcatenatedEntry;
    exports.AbstractList = AbstractList;
    exports.SimpleList = SimpleList;
    exports.TailingList = TailingList;
    exports.FilteredList = FilteredList;
    exports.MappedList = MappedList;
    exports.ConcatenatedList = ConcatenatedList;
    exports.UniqueList = UniqueList;
    return exports.SortedList = SortedList;
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
