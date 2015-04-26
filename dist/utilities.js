(function() {
  var __slice = [].slice;

  module.exports = {
    getIterator: function(start) {
      var Iterator;
      Iterator = require('./iterator');
      return new Iterator(this, start);
    },
    each: function(fn, prev, next) {
      return this.forEach(fn, prev, next);
    },
    forEach: function(fn, prev, next) {
      var id;
      id = prev;
      while ((id = this.next(id)) != null) {
        if (id === next) {
          break;
        }
        if (fn(this.get(id), id) === false) {
          return false;
        }
      }
      return true;
    },
    findId: function(fn) {
      var result;
      result = void 0;
      this.forEach(function(value, id) {
        if (fn(value)) {
          result = id;
          return false;
        }
      });
      return result;
    },
    find: function(fn) {
      return this.get(this.findId(fn));
    },
    idAt: function(index) {
      var i;
      i = 0;
      return this.findId(function() {
        if (i++ === index) {
          return true;
        }
      });
    },
    idOf: function(value) {
      return this.findId(function(v) {
        return v === value;
      });
    },
    at: function(index) {
      return this.get(this.idAt(index));
    },
    indexOf: function(value) {
      var i;
      i = -1;
      if (this.some(function(v) {
        i++;
        return v === value;
      })) {
        return i;
      }
      return -1;
    },
    some: function(predicate) {
      return !this.each(function() {
        return !predicate.apply(null, arguments);
      });
    },
    any: function(predicate) {
      return this.some(predicate);
    },
    contains: function(value) {
      return this.some(function(v) {
        return v === value;
      });
    },
    first: function() {
      return this.get(this.next());
    },
    last: function() {
      return this.get(this.prev());
    },
    reduce: function(reduceFn, memo) {
      this.each(function(value, id) {
        return reduceFn(memo, value, id);
      });
      return memo;
    },
    flatMap: function(flatMapFn) {
      var FlatMapList;
      FlatMapList = require('./flat_map_list');
      return new FlatMapList(this, flatMapFn);
    },
    group: function(groupFn) {
      var GroupList;
      GroupList = require('./group_list');
      return new GroupList(this, groupFn);
    },
    range: function(start, count) {
      var RangeList;
      RangeList = require('./range_list');
      return new RangeList(this, start, count);
    },
    take: function(count) {
      return this.range(0, count);
    },
    map: function(mapFn) {
      var Unit, factory, flatMapFn;
      factory = require('./factory');
      Unit = require('./unit');
      flatMapFn = factory(mapFn).flatMap(function(mapFn) {
        return new Unit(function(value, id) {
          return new Unit(mapFn(value, id));
        });
      });
      return this.flatMap(flatMapFn);
    },
    pluck: function(key) {
      var factory, mapFn;
      factory = require('./factory');
      mapFn = factory(key).map(function(key) {
        return function(value) {
          return value[key];
        };
      });
      return this.map(mapFn);
    },
    invoke: function() {
      var args, factory, key, mapFn;
      key = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      factory = require('./factory');
      mapFn = factory(key).map(function(key) {
        return function(value) {
          return value[key].apply(value, args);
        };
      });
      return this.map(mapFn);
    },
    filter: function(filterFn) {
      var Unit, factory, flatMapFn;
      factory = require('./factory');
      Unit = require('./unit');
      flatMapFn = factory(filterFn).map(function(filterFn) {
        return function(value, id) {
          return filterFn(value, id) && new Unit(value) || new Unit();
        };
      });
      return this.flatMap(flatMapFn);
    },
    append: function(lists) {
      var Unit, factory;
      factory = require('./factory');
      Unit = require('./unit');
      return factory([new Unit(this), factory(lists)]).flatten().flatten();
    },
    concat: function() {
      var lists;
      lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.append(lists);
    },
    flatten: function() {
      return this.flatMap(function(list) {
        return list;
      });
    },
    uniq: function(groupFn) {
      if (groupFn == null) {
        groupFn = function(x) {
          return x;
        };
      }
      return this.group(groupFn).flatMap(function(list) {
        return list.take(1);
      });
    },
    union: function(lists) {
      return this.concat(lists).uniq();
    },
    intersection: function(other) {
      return this.filter(other.contains);
    },
    proxy: function(fns) {
      var AbstractList, fn, key, proxy;
      if (fns == null) {
        fns = {
          'get': 'get',
          'has': 'has',
          'prev': 'prev',
          'next': 'next',
          'onInvalidate': 'onInvalidate'
        };
      }
      AbstractList = require('./abstract_list');
      proxy = new AbstractList;
      for (key in fns) {
        fn = fns[key];
        proxy[key] = this[fn].bind(this);
      }
      return proxy;
    },
    reverse: function() {
      var fns, proxy;
      fns = {
        'get': 'get',
        'has': 'has',
        'prev': 'next',
        'next': 'prev'
      };
      proxy = this.proxy(fns);
      proxy.onInvalidate = (function(_this) {
        return function(callback) {
          return _this.onInvalidate(function(prev, next) {
            return callback(next, prev);
          });
        };
      })(this);
      return proxy;
    },
    indexBy: function(indexFn) {
      var idBySourceId, list, sourceIdById;
      indexFn || (indexFn = require('./unique_id'));
      list = this;
      idBySourceId = {};
      sourceIdById = {};
      return Sonic({
        has: function(id) {
          return list.has(sourceIdById[id]);
        },
        get: function(id) {
          return list.get(sourceIdById[id]);
        },
        prev: function(id) {
          var prev;
          prev = list.prev(sourceIdById[id]);
          if (prev == null) {
            return prev;
          }
          if ((id = idBySourceId[prev]) == null) {
            id = indexFn(list.get(prev));
            idBySourceId[prev] = id;
            sourceIdById[id] = prev;
          }
          return id;
        },
        next: function(id) {
          var next;
          next = list.next(sourceIdById[id]);
          if (next == null) {
            return next;
          }
          if ((id = idBySourceId[next]) == null) {
            id = indexFn(list.get(next));
            idBySourceId[next] = id;
            sourceIdById[id] = next;
          }
          return id;
        },
        onInvalidate: function(fn) {
          return list.onInvalidate(function(prev, next) {
            return fn(idBySourceId[prev], idBySourceId[next]);
          });
        },
        removeListener: function(handlerId) {
          return list.removeListener(handlerId);
        }
      });
    },
    zoom: function(id) {
      return this.filter(function(value, _id) {
        return id === _id;
      });
    },
    toArray: function() {
      return this.reduce((function(memo, value) {
        return memo.push(value);
      }), []);
    }
  };

}).call(this);

//# sourceMappingURL=utilities.js.map
