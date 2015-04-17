(function() {
  var AbstractList, ArrayList, Unit, factory, isList, isMutable, isObservable, listFns, mutableFns, observableFns, utilities;

  AbstractList = require('./abstract_list');

  ArrayList = require('./array_list');

  Unit = require('./unit');

  utilities = require('./utilities');

  listFns = ['has', 'get', 'prev', 'next'];

  mutableFns = ['splice'];

  observableFns = ['onInvalidate', 'removeListener'];

  isList = function(obj) {
    var key, memo, _i, _len;
    memo = true;
    for (_i = 0, _len = listFns.length; _i < _len; _i++) {
      key = listFns[_i];
      memo = memo && (obj[key] != null);
    }
    return memo;
  };

  isMutable = function(obj) {
    return obj['splice'] != null;
  };

  isObservable = function(obj) {
    return (obj['onInvalidate'] != null) && (obj['removeListener'] != null);
  };

  factory = function(items) {
    var key, list, _i, _j, _k, _len, _len1, _len2;
    if (items instanceof AbstractList) {
      return items;
    } else if (isList(items)) {
      list = new AbstractList;
      for (_i = 0, _len = listFns.length; _i < _len; _i++) {
        key = listFns[_i];
        list[key] = items[key].bind(items);
      }
      if (isMutable(items)) {
        for (_j = 0, _len1 = mutableFns.length; _j < _len1; _j++) {
          key = mutableFns[_j];
          list[key] = items[key].bind(items);
        }
      }
      if (isObservable(items)) {
        for (_k = 0, _len2 = observableFns.length; _k < _len2; _k++) {
          key = observableFns[_k];
          list[key] = items[key].bind(items);
        }
      }
      return list;
    } else if (Array.isArray(items)) {
      return new ArrayList(items);
    } else if (arguments.length) {
      return new Unit(items);
    } else {
      return new Unit();
    }
  };

  module.exports = factory;

}).call(this);

//# sourceMappingURL=factory.js.map
