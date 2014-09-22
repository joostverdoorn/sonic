(function() {
  var AbstractList, ConcatenatedList, Events, FilteredList, Iterator, MappedList, SimpleList, Sonic, SortedList, UniqueList,
    __slice = [].slice,
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
    function Iterator(list, id) {
      this.list = list;
      this.id = id;
    }

    Iterator.prototype.current = function() {
      return this.list.get(this.id);
    };

    Iterator.prototype.moveNext = function() {
      if (this.id = this.list.after(this.id)) {
        return true;
      }
      return false;
    };

    Iterator.prototype.movePrevious = function() {
      if (this.id = this.list.before(this.id)) {
        return true;
      }
      return false;
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

  AbstractList = (function() {
    var fn, key;

    for (key in Events) {
      fn = Events[key];
      AbstractList.prototype[key] = fn;
    }

    function AbstractList() {
      this._uniqueCounter = 0;
      this._byId = {};
      this._before = {};
      this._after = {};
      this.headId = this._uniqueId();
      this.tailId = this._uniqueId();
      this.length = 0;
    }

    AbstractList.prototype._uniqueId = function() {
      return (++this._uniqueCounter).toString();
    };

    AbstractList.prototype.getIterator = function(start) {
      if (start == null) {
        start = this.headId;
      }
      return new Iterator(this, start);
    };

    AbstractList.prototype.create = function(item, options) {
      var id;
      if (options == null) {
        options = {};
      }
      id = this._uniqueId();
      this._byId[id] = item;
      this.length++;
      if (!options.silent) {
        this.trigger('create', id);
      }
      return id;
    };

    AbstractList.prototype["delete"] = function(id, options) {
      if (options == null) {
        options = {};
      }
      if (this._byId[id] == null) {
        return false;
      }
      this.move(id, {
        before: null,
        after: null
      });
      delete this._byId[id];
      this.length--;
      if (!options.silent) {
        this.trigger('delete', id);
      }
      return true;
    };

    AbstractList.prototype.get = function(id) {
      return this._byId[id];
    };

    AbstractList.prototype.set = function(id, value, options) {
      if (options == null) {
        options = {};
      }
      if (this._byId[id] == null) {
        return false;
      }
      this._byId[id] = value;
      if (!options.silent) {
        this.trigger('change', id, value);
      }
      return true;
    };

    AbstractList.prototype.move = function(id, options) {
      var afterId, beforeId;
      if (options == null) {
        options = {};
      }
      if (this._byId[id] == null) {
        return false;
      }
      beforeId = this._before[id];
      afterId = this._after[id];
      if (afterId) {
        this._before[afterId] = beforeId;
      }
      if (beforeId) {
        this._after[beforeId] = afterId;
      }
      afterId = options.before || this._after[options.after];
      beforeId = options.after || this._before[options.before];
      if (afterId) {
        this._after[id] = afterId;
        this._before[afterId] = id;
      }
      if (beforeId) {
        this._before[id] = beforeId;
        this._after[beforeId] = id;
      }
      if (!options.silent) {
        this.trigger('move', id);
      }
      return true;
    };

    AbstractList.prototype.swap = function(idA, idB) {
      var afterIdA, afterIdB, beforeIdA, beforeIdB;
      if (!((this._byId[idA] != null) && (this._byId[idB] != null))) {
        return false;
      }
      beforeIdA = this._before[idA];
      beforeIdB = this._before[idB];
      afterIdA = this._after[idA];
      afterIdB = this._after[idB];
      if (beforeIdA !== idB || afterIdB !== idA) {
        return this.move(idA, {
          before: afterIdB
        }) && this.move(idB, {
          after: beforeIdA
        });
      } else {
        return this.move(idA, {
          after: beforeIdB
        }) && this.move(idB, {
          before: afterIdA
        });
      }
    };

    AbstractList.prototype.remove = function(item) {
      var id;
      id = this.idOf(item);
      return this["delete"](id);
    };

    AbstractList.prototype.insert = function(item, options) {
      var after, before, id, silent;
      if (options == null) {
        options = {};
      }
      before = options.before, after = options.after, silent = options.silent;
      id = this.create(item, {
        silent: silent
      });
      this.move(id, {
        before: before,
        after: after,
        silent: silent
      });
      return id;
    };

    AbstractList.prototype.idAt = function(index) {
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
      var id;
      id = this.idAt(index);
      return this.get(id);
    };

    AbstractList.prototype.idOf = function(item) {
      var id, ids, _i, _len;
      ids = Object.keys(this._byId);
      for (_i = 0, _len = ids.length; _i < _len; _i++) {
        id = ids[_i];
        if (this.get(id) === item) {
          return id;
        }
      }
      return void 0;
    };

    AbstractList.prototype.indexOf = function(item) {
      var i, iterator;
      i = -1;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        i++;
        if (iterator.current() === item) {
          return i;
        }
      }
      return -1;
    };

    AbstractList.prototype.before = function(id) {
      var beforeId;
      beforeId = this._before[id];
      if (beforeId !== this.headId) {
        return beforeId;
      }
    };

    AbstractList.prototype.after = function(id) {
      var afterId;
      afterId = this._after[id];
      if (afterId !== this.tailId) {
        return afterId;
      }
    };

    AbstractList.prototype.contains = function(item) {
      return this.idOf(item) != null;
    };

    AbstractList.prototype.forEach = function(fn) {
      return this.each(fn);
    };

    AbstractList.prototype.each = function(fn) {
      var iterator;
      iterator = this.getIterator();
      while (iterator.moveNext()) {
        if (fn(iterator.current()) === false) {
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
        return this.get(this.after(this.headId));
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
        return this.get(this.before(this.tailId));
      }
    };

    AbstractList.prototype.pluck = function(key) {
      return this.map(function(item) {
        return item[key];
      });
    };

    AbstractList.prototype.toArray = function() {
      var items;
      items = [];
      this.each(function(item) {
        return items.push(item);
      });
      return items;
    };

    return AbstractList;

  })();

  SimpleList = (function(_super) {
    __extends(SimpleList, _super);

    function SimpleList(items) {
      var id, item, length, previous, _i, _len;
      SimpleList.__super__.constructor.apply(this, arguments);
      previous = this.headId;
      if (items != null) {
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          id = this._uniqueId();
          this._byId[id] = item;
          if (previous != null) {
            this._after[previous] = id;
            this._before[id] = previous;
          }
          previous = id;
        }
        length = items.length;
      }
      this._after[previous] = this.tailId;
      this._before[this.tailId] = previous;
    }

    SimpleList.prototype.push = function(item, options) {
      if (options == null) {
        options = {};
      }
      options.before = this.tailId;
      return this.insert(item, options);
    };

    SimpleList.prototype.add = function(item, options) {
      if (options == null) {
        options = {};
      }
      return this.push(item, options);
    };

    SimpleList.prototype.unshift = function(item, options) {
      if (options == null) {
        options = {};
      }
      options.after = this.headId;
      return this.insert(item, options);
    };

    SimpleList.prototype.pop = function(options) {
      var id, item;
      id = this.before(this.tailId);
      item = this._byId[id];
      this["delete"](id, options);
      return item;
    };

    SimpleList.prototype.shift = function(options) {
      var id, item;
      id = this.after(this.headId);
      item = this._byId[id];
      this["delete"](id, options);
      return item;
    };

    return SimpleList;

  })(AbstractList);

  MappedList = (function(_super) {
    __extends(MappedList, _super);

    function MappedList(source, mapFn) {
      this.source = source;
      this.mapFn = mapFn;
      MappedList.__super__.constructor.apply(this, arguments);
      this._sourceIdById = {};
      this._idBySourceId = {};
      this._sourceIdById[this.headId] = this.source.headId;
      this._sourceIdById[this.tailId] = this.source.tailId;
      this._idBySourceId[this.source.headId] = this.headId;
      this._idBySourceId[this.source.tailId] = this.tailId;
      this.source.on('create', (function(_this) {
        return function(sourceId) {
          var id, item, sourceItem;
          sourceItem = _this.source.get(sourceId);
          item = _this.mapFn(sourceItem);
          id = _this.create(item);
          _this._sourceIdById[id] = sourceId;
          return _this._idBySourceId[sourceId] = id;
        };
      })(this));
      this.source.on('delete', (function(_this) {
        return function(sourceId) {
          var id;
          id = _this._idBySourceId[sourceId];
          _this["delete"](id);
          delete _this._idBySourceId[sourceId];
          return delete _this._sourceIdById[id];
        };
      })(this));
      this.source.on('move', (function(_this) {
        return function(sourceId) {
          var afterId, afterSourceId, beforeId, beforeSourceId, id;
          id = _this._idBySourceId[sourceId];
          beforeSourceId = _this.source.before(sourceId);
          afterSourceId = _this.source.after(sourceId);
          beforeId = _this._idBySourceId[beforeId];
          afterId = _this._idBySourceId[afterId];
          return _this.move(id, {
            before: beforeId,
            after: afterId
          });
        };
      })(this));
      this.source.on('change', function(sourceId, sourceItem) {
        var id, item;
        id = this._idBySourceId[sourceId];
        item = this.mapFn(sourceItem);
        return this.set(id, item);
      });
    }

    MappedList.prototype.before = function(id) {
      var beforeId, beforeSourceId, item, sourceId;
      beforeId = this._before[id];
      if (beforeId) {
        if (beforeId !== this.headId) {
          return beforeId;
        }
        return void 0;
      }
      sourceId = this._sourceIdById[id];
      beforeSourceId = this.source.before(sourceId);
      if (beforeSourceId) {
        beforeId = this._idBySourceId[beforeSourceId];
        if (beforeId) {
          this.move(beforeId, {
            before: id
          });
          return beforeId;
        }
        item = this.mapFn(this.source.get(beforeSourceId));
        beforeId = this.insert(item, {
          before: id,
          silent: true
        });
        this._sourceIdById[beforeId] = beforeSourceId;
        this._idBySourceId[beforeSourceId] = beforeId;
        return beforeId;
      }
      return void 0;
    };

    MappedList.prototype.after = function(id) {
      var afterId, afterSourceId, item, sourceId;
      afterId = this._after[id];
      if (afterId) {
        if (afterId !== this.tailId) {
          return afterId;
        }
        return void 0;
      }
      sourceId = this._sourceIdById[id];
      afterSourceId = this.source.after(sourceId);
      if (afterSourceId) {
        afterId = this._idBySourceId[afterSourceId];
        if (afterId) {
          this.move(afterId, {
            after: id,
            silent: true
          });
          return afterId;
        }
        item = this.mapFn(this.source.get(afterSourceId));
        afterId = this.insert(item, {
          after: id,
          silent: true
        });
        this._sourceIdById[afterId] = afterSourceId;
        this._idBySourceId[afterSourceId] = afterId;
        return afterId;
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
      this._sourceIdById[this.headId] = this.source.headId;
      this._sourceIdById[this.tailId] = this.source.tailId;
      this._idBySourceId[this.source.headId] = this.headId;
      this._idBySourceId[this.source.tailId] = this.tailId;
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
      if ((beforeId != null) && beforeId !== this.headId) {
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
      if ((afterId != null) && afterId !== this.tailId) {
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

  UniqueList = (function(_super) {
    __extends(UniqueList, _super);

    function UniqueList(source) {
      this.source = source;
      this.built = false;
      UniqueList.__super__.constructor.apply(this, arguments);
    }

    UniqueList.prototype.length = function() {
      if (!this.built) {
        this.build();
      }
      return UniqueList.__super__.length.apply(this, arguments);
    };

    UniqueList.prototype.get = function(id) {
      var item;
      item = this.source.get(id);
      return item;
    };

    UniqueList.prototype.idAt = function(index) {
      if (!this.built) {
        this.build();
      }
      return UniqueList.__super__.idAt.apply(this, arguments);
    };

    UniqueList.prototype.build = function() {
      var found, id, index, item, sourceId, _i, _j, _len, _ref, _ref1, _results;
      _results = [];
      for (index = _i = 0, _ref = this.source.length(); 0 <= _ref ? _i < _ref : _i > _ref; index = 0 <= _ref ? ++_i : --_i) {
        sourceId = this.source.idAt(index);
        item = this.source.get(sourceId);
        found = false;
        _ref1 = this.ids;
        for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
          id = _ref1[_j];
          if (this.items[id] === item) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.items[sourceId] = item;
          _results.push(this.ids.push(sourceId));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return UniqueList;

  })(AbstractList);

  SortedList = (function(_super) {
    __extends(SortedList, _super);

    function SortedList(source, sortFn) {
      this.source = source;
      this.sortFn = sortFn;
      SortedList.__super__.constructor.apply(this, arguments);
      this._sourceIdById = {};
      this._idBySourceId = {};
      this._sourceIdById[this.headId] = this.source.headId;
      this._sourceIdById[this.tailId] = this.source.tailId;
      this._idBySourceId[this.source.headId] = this.headId;
      this._idBySourceId[this.source.tailId] = this.tailId;
      this._after[this.headId] = this.tailId;
      this._before[this.tailId] = this.headId;
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

    SortedList.prototype._sort = function(headId, length) {
      var half, midId;
      if (headId == null) {
        headId = this.headId;
      }
      if (length == null) {
        length = this.length;
      }
      half = Math.ceil(length / 2);
      midId = this.idAt(half);
      return this._merge(this._sort(left, half), this._sort(right, length - half));
    };

    SortedList.prototype._merge = function(headId, length) {};

    SortedList.prototype._evaluate = function() {
      var id, iterator, sourceId, _results;
      this._evaluated = true;
      iterator = this.source.getIterator();
      _results = [];
      while (iterator.moveNext()) {
        sourceId = iterator.id;
        id = this.insert(iterator.current(), {
          before: this.tailId
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
