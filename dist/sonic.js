(function() {
  var AbstractList, ConcatenatedList, Entry, Events, FilteredList, Iterator, MappedEntry, MappedList, SimpleList, Sonic, SortedList,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Sonic = {
    create: function(items) {
      if (items == null) {
        items = [];
      }
      if (items instanceof AbstractList) {
        return items;
      }
      return new SimpleList(items);
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
    function Entry(options) {
      if (options) {
        this.id = options.id;
        this.list = options.list;
        this._value = options.value;
        this._next = options.next;
        this._previous = options.previous;
      }
    }

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

  MappedEntry = (function(_super) {
    __extends(MappedEntry, _super);

    function MappedEntry(options) {
      this.value = __bind(this.value, this);
      if (options) {
        this.source = options.source;
      }
      MappedEntry.__super__.constructor.apply(this, arguments);
    }

    MappedEntry.prototype.value = function() {
      return this._value || (this._value = this.list.mapFn(this.source.value()));
    };

    MappedEntry.prototype.next = function() {
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

    MappedEntry.prototype.previous = function() {
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

    return MappedEntry;

  })(Entry);

  AbstractList = (function() {
    var fn, key;

    AbstractList.prototype.entry = Entry;

    for (key in Events) {
      fn = Events[key];
      AbstractList.prototype[key] = fn;
    }

    function AbstractList() {
      this._uniqueCounter = 0;
      this._byId = [];
      this.headEntry = new this.entry({
        list: this
      });
      this.tailEntry = new this.entry({
        list: this
      });
      this.length = 0;
    }

    AbstractList.prototype._uniqueId = function() {
      return ++this._uniqueCounter;
    };

    AbstractList.prototype._create = function(value, options) {
      var entry, id;
      if (options == null) {
        options = {};
      }
      id = this._uniqueId();
      entry = new this.entry({
        id: id,
        value: value,
        list: this
      });
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
      var entry, _i, _len, _ref;
      _ref = this._byId;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        entry = _ref[_i];
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

    AbstractList.prototype.before = function(entry) {
      var before;
      before = entry.previous();
      if (before !== this.headEntry) {
        return before;
      }
      return void 0;
    };

    AbstractList.prototype.after = function(entry) {
      var after;
      after = entry.next();
      if (after !== this.tailEntry) {
        return after;
      }
      return void 0;
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
      return new MappedList(this, mapFn);
    };

    AbstractList.prototype.filter = function(filterFn) {
      return new FilteredList(this, filterFn);
    };

    AbstractList.prototype.sort = function(sortFn) {
      return new SortedList(this, sortFn);
    };

    AbstractList.prototype.concat = function() {
      var others;
      others = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new ConcatenatedList([this].concat(others));
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
        return this.after(this.headEntry).value();
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
        return this.before(this.tailEntry).value();
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
      var entry, id, length, previous, value, _i, _len;
      SimpleList.__super__.constructor.apply(this, arguments);
      previous = this.headEntry;
      if (values != null) {
        for (_i = 0, _len = values.length; _i < _len; _i++) {
          value = values[_i];
          id = this._uniqueId();
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
      entry = this.before(this.tailEntry);
      this._delete(entry, options);
      return entry.value();
    };

    SimpleList.prototype.shift = function(options) {
      var entry;
      entry = this.after(this.headEntry);
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

  MappedList = (function(_super) {
    __extends(MappedList, _super);

    MappedList.prototype.entry = MappedEntry;

    function MappedList(source, mapFn) {
      this.source = source;
      this.mapFn = mapFn;
      MappedList.__super__.constructor.apply(this, arguments);
      this._bySourceId = [];
      this.headEntry.source = this.source.headEntry;
      this.tailEntry.source = this.source.tailEntry;
      this.source.on('create', (function(_this) {
        return function(sourceEntry) {
          return _this._createBySourceEntry(sourceEntry);
        };
      })(this));
      this.source.on('delete', (function(_this) {
        return function(sourceEntry) {
          return _this._deleteBySourceEntry(sourceEntry);
        };
      })(this));
      this.source.on('move', (function(_this) {
        return function(sourceEntry) {
          var after, afterSourceEntry, before, beforeSourceEntry, entry;
          entry = _this._bySourceId[sourceEntry.id];
          beforeSourceEntry = _this.source.before(sourceEntry);
          afterSourceEntry = _this.source.after(sourceEntry);
          before = _this._bySourceId[beforeSourceEntry.id];
          return after = _this._bySourceId[afterSourceEntry.id];
        };
      })(this));
      this.source.on('change', function(sourceId, sourceItem) {
        var id, value;
        id = this._idBySourceId[sourceId];
        value = this.mapFn(sourceItem);
        return this.set(id, value);
      });
    }

    MappedList.prototype.getBySource = function(sourceEntry) {
      if (sourceEntry) {
        return this._bySourceId[sourceEntry.id];
      }
      return void 0;
    };

    MappedList.prototype.createBySource = function(sourceEntry, options) {
      var entry, value;
      if (sourceEntry === this.source.headEntry) {
        return this.headEntry;
      }
      if (sourceEntry === this.source.tailEntry) {
        return this.tailEntry;
      }
      value = this.mapFn(sourceEntry.value());
      entry = this._create(value, options);
      entry.source = sourceEntry;
      this._bySourceId[sourceEntry.id] = entry;
      return entry;
    };

    MappedList.prototype.deleteBySource = function(sourceEntry, options) {
      var entry, sourceId;
      sourceId = sourceEntry.id;
      entry = this._bySourceId[sourceId];
      this._delete(entry, options);
      return delete this._bySourceId[sourceId];
    };

    MappedList.prototype.before = function(id) {
      var entry, previous;
      entry = this.getEntry(id);
      if (previous = entry.previous()) {
        return previous;
      }
      return void 0;
    };

    MappedList.prototype.after = function(id) {
      var entry, next;
      entry = this.getEntry(id);
      if (next = entry.next()) {
        return next;
      }
      return void 0;
    };

    return MappedList;

  })(AbstractList);

  FilteredList = (function(_super) {
    __extends(FilteredList, _super);

    function FilteredList(source, filterFn) {
      this.source = source;
      this.filterFn = filterFn;
      FilteredList.__super__.constructor.apply(this, arguments);
      this._sourceIdById = {};
      this._idBySourceId = {};
      this._sourceIdById[this.headEntry] = this.source.headEntry;
      this._sourceIdById[this.tailEntry] = this.source.tailEntry;
      this._idBySourceId[this.source.headEntry] = this.headEntry;
      this._idBySourceId[this.source.tailEntry] = this.tailEntry;
      this.source.on('create', (function(_this) {
        return function(sourceId) {
          var id, sourceItem;
          sourceItem = _this.source.get(sourceId);
          if (_this.filterFn(sourceItem)) {
            id = _this.create(sourceItem);
            _this._sourceIdById[id] = sourceId;
            return _this._idBySourceId[sourceId] = id;
          }
        };
      })(this));
      this.source.on('delete', (function(_this) {
        return function(sourceId) {
          var id;
          id = _this._idBySourceId[sourceId];
          if (id != null) {
            _this["delete"](id);
            delete _this._idBySourceId[sourceId];
            return delete _this._sourceIdById[id];
          }
        };
      })(this));
      this.source.on('move', (function(_this) {
        return function(sourceId) {
          var afterId, afterSourceId, beforeId, beforeSourceId, id, iterator, _results;
          id = _this._idBySourceId[sourceId];
          beforeSourceId = _this.source.before(sourceId);
          afterSourceId = _this.source.after(sourceId);
          iterator = _this.source.getIterator(sourceId);
          _results = [];
          while (iterator.moveNext()) {
            afterSourceId = iterator.id;
            afterId = _this._idBySourceId[afterSourceId];
            if (afterId != null) {
              iterator = _this.source.getIterator(sourceId);
              while (iterator.movePrevious()) {
                beforeSourceId = iterator.id;
                beforeId = _this._idBySourceId[beforeSourceId];
                if ((beforeId != null) && _this._before[afterId] === beforeId && _this._after[beforeId] === afterId) {
                  _this.move(id, {
                    before: beforeId,
                    after: afterId
                  });
                  break;
                }
              }
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
      this.source.on('change', (function(_this) {
        return function(sourceId, sourceItem) {
          var id;
          id = _this._idBySourceId[sourceId];
          if (id == null) {
            return false;
          }
          if (_this.filterFn(sourceItem)) {
            return _this.set(id, sourceItem);
          } else {
            return _this["delete"](id);
          }
        };
      })(this));
    }

    FilteredList.prototype.before = function(id) {
      var beforeId, beforeSourceId, item, iterator, sourceId;
      beforeId = this._before[id];
      if ((beforeId != null) && beforeId !== this.headEntry) {
        return beforeId;
      }
      sourceId = this._sourceIdById[id];
      iterator = this.source.getIterator(sourceId);
      while (iterator.movePrevious()) {
        beforeSourceId = iterator.id;
        item = this.source.get(beforeSourceId);
        if (this.filterFn(item)) {
          beforeId = this.insert(item, {
            before: id,
            silent: true
          });
          this._sourceIdById[beforeId] = beforeSourceId;
          this._idBySourceId[beforeSourceId] = beforeId;
          return beforeId;
        }
      }
      return void 0;
    };

    FilteredList.prototype.after = function(id) {
      var afterId, afterSourceId, item, iterator, sourceId;
      afterId = this._after[id];
      if ((afterId != null) && afterId !== this.tailEntry) {
        return afterId;
      }
      sourceId = this._sourceIdById[id];
      iterator = this.source.getIterator(sourceId);
      while (iterator.moveNext()) {
        afterSourceId = iterator.id;
        item = this.source.get(afterSourceId);
        if (this.filterFn(item)) {
          afterId = this.insert(item, {
            after: id,
            silent: true
          });
          this._sourceIdById[afterId] = afterSourceId;
          this._idBySourceId[afterSourceId] = afterId;
          return afterId;
        }
      }
      return void 0;
    };

    return FilteredList;

  })(AbstractList);

  ConcatenatedList = (function(_super) {
    __extends(ConcatenatedList, _super);

    function ConcatenatedList(sources) {
      this._sources = Sonic.create(sources);
      this.built = false;
      ConcatenatedList.__super__.constructor.apply(this, arguments);
    }

    ConcatenatedList.prototype.length = function() {
      if (!this.built) {
        this.build();
      }
      return ConcatenatedList.__super__.length.apply(this, arguments);
    };

    ConcatenatedList.prototype.get = function(id) {
      var item, source, _i, _len, _ref;
      _ref = this.sources;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source = _ref[_i];
        if (item = source.get(id)) {
          this.items[id] = item;
          return item;
        }
      }
      return void 0;
    };

    ConcatenatedList.prototype.idAt = function(index) {
      if (!this.built) {
        this.build();
      }
      return ConcatenatedList.__super__.idAt.apply(this, arguments);
    };

    ConcatenatedList.prototype.build = function() {
      var id, index, item, source, _i, _j, _len, _ref, _ref1;
      _ref = this.sources;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source = _ref[_i];
        for (index = _j = 0, _ref1 = source.length(); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; index = 0 <= _ref1 ? ++_j : --_j) {
          id = source.idAt(index);
          item = source.get(id);
          this.items[id] = item;
          this.ids.push(id);
        }
      }
      return this.built = true;
    };

    return ConcatenatedList;

  })(AbstractList);

  SortedList = (function(_super) {
    __extends(SortedList, _super);

    function SortedList(source, sortFn) {
      this.source = source;
      this.sortFn = sortFn;
      SortedList.__super__.constructor.apply(this, arguments);
      this._sourceIdById = {};
      this._idBySourceId = {};
      this._sourceIdById[this.headEntry] = this.source.headEntry;
      this._sourceIdById[this.tailEntry] = this.source.tailEntry;
      this._idBySourceId[this.source.headEntry] = this.headEntry;
      this._idBySourceId[this.source.tailEntry] = this.tailEntry;
      this._after[this.headEntry] = this.tailEntry;
      this._before[this.tailEntry] = this.headEntry;
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
    exports.AbstractList = AbstractList;
    exports.SimpleList = SimpleList;
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
