(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sonic = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__observable__,
    $__mutable_95_list__;
var Subject = ($__observable__ = require("./observable"), $__observable__ && $__observable__.__esModule && $__observable__ || {default: $__observable__}).Subject;
var MutableList = ($__mutable_95_list__ = require("./mutable_list"), $__mutable_95_list__ && $__mutable_95_list__.__esModule && $__mutable_95_list__ || {default: $__mutable_95_list__}).MutableList;
var ArrayList = function ArrayList() {
  var array = arguments[0] !== (void 0) ? arguments[0] : [];
  var $__2 = this;
  $traceurRuntime.superConstructor($ArrayList).call(this);
  this.has = (function(key) {
    return key != null && -1 < key && key < $__2._array.length;
  });
  this.get = (function(key) {
    if ($__2.has(key))
      return $__2._array[key];
    return;
  });
  this.prev = (function(key) {
    if (key == null && $__2._array.length)
      return $__2._array.length - 1;
    if ($__2._array.length > 0 && key != null && $__2.has(key) && $__2.has(key - 1))
      return key - 1;
    return null;
  });
  this.next = (function(key) {
    if (key == null && $__2._array.length)
      return 0;
    if ($__2._array.length > 0 && key != null && $__2.has(key) && $__2.has(key + 1))
      return key + 1;
    return null;
  });
  this.set = (function(key, value) {
    if (!$__2.has(key))
      return null;
    $__2._array[key] = value;
    return key;
  });
  this.splice = (function(prev, next) {
    var $__5;
    for (var values = [],
        $__4 = 2; $__4 < arguments.length; $__4++)
      values[$__4 - 2] = arguments[$__4];
    if (prev == null)
      prev = -1;
    else if (!$__2.has(prev))
      return;
    if (next == null)
      next = $__2._array.length;
    else if (!$__2.has(next))
      return;
    ($__5 = $__2._array).splice.apply($__5, $traceurRuntime.spread([prev + 1, next - (prev + 1)], values));
    $__2._invalidate(prev, null);
  });
  this.observe = (function(observer) {
    return $__2._subject.observe(observer);
  });
  this._invalidate = (function(prev, next) {
    if (!$__2.has(prev))
      prev = null;
    if (!$__2.has(next))
      next = null;
    $__2._subject.notify(function(observer) {
      observer.onInvalidate(prev, next);
    });
  });
  this._subject = new Subject();
  this._array = array;
};
var $ArrayList = ArrayList;
($traceurRuntime.createClass)(ArrayList, {}, {}, MutableList);
var $__default = ArrayList;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/array_list.js
},{"./mutable_list":10,"./observable":11}],2:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  AsyncList: {get: function() {
      return AsyncList;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var AsyncList = function AsyncList(list, scheduler) {
  var $__0 = this;
  this.has = (function(key) {
    return new Promise((function(resolve, reject) {
      $__0._scheduler((function() {
        Promise.resolve($__0._list.has(key)).then(resolve).catch(reject);
      }));
    }));
  });
  this.get = (function(key) {
    return new Promise((function(resolve, reject) {
      $__0.has(key).then((function(has) {
        return has ? resolve($__0._list.get(key)) : reject();
      })).catch(reject);
    }));
  });
  this.prev = (function(key) {
    return new Promise((function(resolve, reject) {
      $__0._scheduler((function() {
        Promise.resolve($__0._list.prev(key)).then((function(prev) {
          return prev != null ? resolve(prev) : reject();
        })).catch(reject);
      }));
    }));
  });
  this.next = (function(key) {
    return new Promise((function(resolve, reject) {
      $__0._scheduler((function() {
        Promise.resolve($__0._list.next(key)).then((function(prev) {
          return prev != null ? resolve(prev) : reject();
        })).catch(reject);
      }));
    }));
  });
  this._list = list;
  this._scheduler = scheduler || window.setTimeout;
};
var $AsyncList = AsyncList;
($traceurRuntime.createClass)(AsyncList, {}, {
  create: function(list) {
    return new $AsyncList(list);
  },
  map: function(list, mapFn) {
    var $__2 = list,
        has = $__2.has,
        prev = $__2.prev,
        next = $__2.next;
    function get(key) {
      return list.get(key).then(mapFn);
    }
    return new $AsyncList({
      has: has,
      get: get,
      prev: prev,
      next: next
    });
  }
});
var $__default = AsyncList;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/async_list.js
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Cache: {get: function() {
      return Cache;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var Cache = function Cache(list) {
  var $__0 = this;
  this.has = (function(key) {
    return key in $__0._byKey || $__0._list.has(key);
  });
  this.get = (function(key) {
    if (key in $__0._byKey)
      return $__0._byKey[key];
    if ($__0._list.has(key))
      return $__0._byKey[key] = $__0._list.get(key);
    return;
  });
  this.prev = (function(key) {
    if (key in $__0._prev)
      return $__0._prev[key];
    var prevKey = $__0._list.prev(key);
    if (prevKey == null)
      prevKey = null;
    $__0._prev[key] = prevKey;
    $__0._next[prevKey] = key;
    return prevKey;
  });
  this.next = (function() {
    var key = arguments[0] !== (void 0) ? arguments[0] : null;
    if (key in $__0._next)
      return $__0._next[key];
    var nextKey = $__0._list.next(key);
    if (nextKey == null)
      nextKey = null;
    $__0._next[key] = nextKey;
    $__0._prev[nextKey] = key;
    return nextKey;
  });
  this._byKey = Object.create(null), this._next = Object.create(null), this._prev = Object.create(null);
  this._list = list;
};
($traceurRuntime.createClass)(Cache, {}, {});
var $__default = Cache;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/cache.js
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  fromPromise: {get: function() {
      return fromPromise;
    }},
  fromIterator: {get: function() {
      return fromIterator;
    }},
  __esModule: {value: true}
});
var $__list__,
    $__observable_95_list__,
    $__mutable_95_list__,
    $__unit__,
    $__array_95_list__;
var List = ($__list__ = require("./list"), $__list__ && $__list__.__esModule && $__list__ || {default: $__list__}).List;
var ObservableList = ($__observable_95_list__ = require("./observable_list"), $__observable_95_list__ && $__observable_95_list__.__esModule && $__observable_95_list__ || {default: $__observable_95_list__}).ObservableList;
var MutableList = ($__mutable_95_list__ = require("./mutable_list"), $__mutable_95_list__ && $__mutable_95_list__.__esModule && $__mutable_95_list__ || {default: $__mutable_95_list__}).MutableList;
var Unit = ($__unit__ = require("./unit"), $__unit__ && $__unit__.__esModule && $__unit__ || {default: $__unit__}).default;
var ArrayList = ($__array_95_list__ = require("./array_list"), $__array_95_list__ && $__array_95_list__.__esModule && $__array_95_list__ || {default: $__array_95_list__}).default;
function factory(obj) {
  if (MutableList.isMutableList(obj))
    return MutableList.create(obj);
  if (ObservableList.isObservableList(obj))
    return ObservableList.create(obj);
  if (List.isList(obj))
    return List.create(obj);
  if (Array.isArray(obj))
    return new ArrayList(obj);
  return Unit.create(obj);
}
var $__default = factory;
function fromPromise(promise) {
  var unit = new Unit();
  promise.then((function(value) {
    unit.push(value);
  }));
  return ObservableList.create(unit);
}
function fromIterator(iterator) {
  var list = {
    has: function(key) {
      return null;
    },
    get: function(key) {
      return null;
    },
    prev: function(key) {
      return null;
    },
    next: function(key) {
      return null;
    }
  };
  return list;
}

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/factory.js
},{"./array_list":1,"./list":9,"./mutable_list":10,"./observable_list":15,"./unit":17}],5:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Index: {get: function() {
      return Index;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var Index = function Index(list) {
  var $__0 = this;
  this.has = (function(index) {
    if (index >= 0 && index < $__0._byIndex.length)
      return true;
    var next,
        last = $__0._byIndex.length - 1;
    while (last != index) {
      next = $__0._list.next($__0._byIndex[last]);
      if (next == null)
        return false;
      $__0._byIndex[++last] = next;
    }
    return true;
  });
  this.get = (function(index) {
    return $__0.has(index) ? $__0._list.get($__0._byIndex[index]) : undefined;
  });
  this.prev = (function(index) {
    if ($__0.has(index - 1))
      return index - 1;
    if (index == null && $__0._byIndex.length)
      return $__0._byIndex.length - 1;
    return null;
  });
  this.next = (function() {
    var index = arguments[0] !== (void 0) ? arguments[0] : -1;
    if ($__0.has(index + 1))
      return index + 1;
    return null;
  });
  this._byIndex = [];
  this._list = list;
};
($traceurRuntime.createClass)(Index, {}, {});
var $__default = Index;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/index.js
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var Key;
(function(Key) {
  var uniqueKey = 0;
  function key(key) {
    return key.toString();
  }
  Key.key = key;
  function create() {
    return uniqueKey++;
  }
  Key.create = create;
})(Key || (Key = {}));
var $__default = Key;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/key.js
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  KeyBy: {get: function() {
      return KeyBy;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var KeyBy = function KeyBy(list, keyFn) {
  var $__0 = this;
  this.has = (function(key) {
    if (key in $__0._sourceKeyByKey)
      return true;
    var last = null;
    while ((last = $__0.next(last)) != null)
      if (last == key)
        return true;
    return false;
  });
  this.get = (function(key) {
    return $__0.has(key) ? $__0._list.get($__0._sourceKeyByKey[key]) : undefined;
  });
  this.prev = (function(key) {
    if ($__0.has(key) || key == null)
      return $__0._keyBySourceKey[$__0._list.prev($__0._sourceKeyByKey[key])];
  });
  this.next = (function() {
    var key = arguments[0] !== (void 0) ? arguments[0] : null;
    var sourceKey,
        sourceNext,
        res;
    if (key in $__0._sourceKeyByKey)
      sourceKey = $__0._sourceKeyByKey[key];
    else
      sourceKey = null;
    while (key != null && !(key in $__0._sourceKeyByKey)) {
      sourceKey = $__0._list.next(sourceKey);
      if (!(sourceKey in $__0._keyBySourceKey)) {
        if (sourceKey == null)
          return null;
        res = $__0._keyFn($__0._list.get(sourceKey), sourceKey);
        $__0._keyBySourceKey[sourceKey] = res;
        $__0._sourceKeyByKey[res] = sourceKey;
        if (res == key)
          break;
      }
    }
    sourceKey = $__0._list.next(sourceKey);
    if (sourceKey == null)
      return null;
    res = $__0._keyFn($__0._list.get(sourceKey), sourceKey);
    $__0._keyBySourceKey[sourceKey] = res;
    $__0._sourceKeyByKey[res] = sourceKey;
    return res;
  });
  this._list = list;
  this._keyFn = keyFn;
  this._sourceKeyByKey = Object.create(null);
  this._keyBySourceKey = Object.create(null);
};
($traceurRuntime.createClass)(KeyBy, {}, {});
var $__default = KeyBy;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/key_by.js
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__key__,
    $__observable__,
    $__mutable_95_list__;
var Key = ($__key__ = require("./key"), $__key__ && $__key__.__esModule && $__key__ || {default: $__key__}).default;
var Subject = ($__observable__ = require("./observable"), $__observable__ && $__observable__.__esModule && $__observable__ || {default: $__observable__}).Subject;
var MutableList = ($__mutable_95_list__ = require("./mutable_list"), $__mutable_95_list__ && $__mutable_95_list__.__esModule && $__mutable_95_list__ || {default: $__mutable_95_list__}).MutableList;
var LinkedList = function LinkedList(values, keyFn) {
  var $__8;
  var $__3 = this;
  $traceurRuntime.superConstructor($LinkedList).call(this);
  this._keyFn = Key.create;
  this.has = (function(key) {
    return key in $__3._byKey;
  });
  this.get = (function(key) {
    return $__3._byKey[key];
  });
  this.prev = (function() {
    var key = arguments[0] !== (void 0) ? arguments[0] : null;
    var prev = $__3._prev[key];
    return prev == null ? null : prev;
  });
  this.next = (function() {
    var key = arguments[0] !== (void 0) ? arguments[0] : null;
    var next = $__3._next[key];
    return next == null ? null : next;
  });
  this.set = (function(key, value) {
    if (!$__3.has(key))
      return null;
    $__3._byKey[key] = value;
    $__3._invalidate($__3._prev[key], $__3._next[key]);
    return key;
  });
  this.splice = (function() {
    var prev = arguments[0] !== (void 0) ? arguments[0] : null;
    var next = arguments[1] !== (void 0) ? arguments[1] : null;
    for (var values = [],
        $__7 = 2; $__7 < arguments.length; $__7++)
      values[$__7 - 2] = arguments[$__7];
    var key,
        value;
    key = prev;
    while ((key = $__3._next[key]) != null) {
      delete $__3._next[$__3._prev[key]];
      delete $__3._prev[key];
      if (key == next)
        break;
      delete $__3._byKey[key];
    }
    key = next;
    while ((key = $__3._prev[key]) != null) {
      delete $__3._prev[$__3._next[key]];
      delete $__3._next[key];
      if (key == prev)
        break;
      delete $__3._byKey[key];
    }
    var _key = prev;
    for (var $__5 = values[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__6; !($__6 = $__5.next()).done; ) {
      value = $__6.value;
      {
        key = $__3._keyFn(value);
        $__3._byKey[key] = value;
        $__3._prev[key] = _key;
        $__3._next[_key] = key;
        _key = key;
      }
    }
    $__3._prev[next] = _key;
    $__3._next[_key] = next;
    $__3._invalidate(prev, next);
  });
  this.observe = (function(observer) {
    return $__3._subject.observe(observer);
  });
  this._invalidate = (function(prev, next) {
    if (!$__3.has(prev))
      prev = null;
    if (!$__3.has(next))
      next = null;
    $__3._subject.notify(function(observer) {
      observer.onInvalidate(prev, next);
    });
  });
  if (keyFn)
    this._keyFn = keyFn;
  this._subject = new Subject();
  this._byKey = Object.create(null);
  this._prev = Object.create(null);
  this._next = Object.create(null);
  this._prev[null] = null;
  this._next[null] = null;
  ($__8 = this).splice.apply($__8, $traceurRuntime.spread([null, null], values));
};
var $LinkedList = LinkedList;
($traceurRuntime.createClass)(LinkedList, {}, {}, MutableList);
var $__default = LinkedList;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/linked_list.js
},{"./key":6,"./mutable_list":10,"./observable":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  List: {get: function() {
      return List;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__tree__,
    $__cache__,
    $__index__,
    $__key_95_by__,
    $__async_95_list__;
var $__0 = ($__tree__ = require("./tree"), $__tree__ && $__tree__.__esModule && $__tree__ || {default: $__tree__}),
    Tree = $__0.Tree,
    Path = $__0.Path;
var Cache = ($__cache__ = require("./cache"), $__cache__ && $__cache__.__esModule && $__cache__ || {default: $__cache__}).default;
var Index = ($__index__ = require("./index"), $__index__ && $__index__.__esModule && $__index__ || {default: $__index__}).default;
var KeyBy = ($__key_95_by__ = require("./key_by"), $__key_95_by__ && $__key_95_by__.__esModule && $__key_95_by__ || {default: $__key_95_by__}).default;
var AsyncList = ($__async_95_list__ = require("./async_list"), $__async_95_list__ && $__async_95_list__.__esModule && $__async_95_list__ || {default: $__async_95_list__}).AsyncList;
var List = function List(list) {
  var $__5 = this;
  this.has = (function(key) {
    throw new Error("Not implemented");
  });
  this.get = (function(key) {
    throw new Error("Not implemented");
  });
  this.prev = (function(key) {
    throw new Error("Not implemented");
  });
  this.next = (function(key) {
    throw new Error("Not implemented");
  });
  this.first = (function() {
    return $List.first($__5);
  });
  this.last = (function() {
    return $List.last($__5);
  });
  this.forEach = (function(fn) {
    return $List.forEach($__5, fn);
  });
  this.reduce = (function(fn, memo) {
    return $List.reduce($__5, fn);
  });
  this.toArray = (function() {
    return $List.toArray($__5);
  });
  this.findKey = (function(fn) {
    return $List.findKey($__5, fn);
  });
  this.find = (function(fn) {
    return $List.find($__5, fn);
  });
  this.keyOf = (function(value) {
    return $List.keyOf($__5, value);
  });
  this.indexOf = (function(value) {
    return $List.indexOf($__5, value);
  });
  this.keyAt = (function(index) {
    return $List.keyAt($__5, index);
  });
  this.at = (function(index) {
    return $List.at($__5, index);
  });
  this.every = (function(predicate) {
    return $List.every($__5, predicate);
  });
  this.some = (function(predicate) {
    return $List.some($__5, predicate);
  });
  this.contains = (function(value) {
    return $List.contains($__5, value);
  });
  this.reverse = (function() {
    return $List.create($List.reverse($__5));
  });
  this.map = (function(mapFn) {
    return $List.create($List.map($__5, mapFn));
  });
  this.filter = (function(filterFn) {
    return $List.create($List.filter($__5, filterFn));
  });
  this.flatten = (function() {
    return $List.create($List.flatten($__5));
  });
  this.flatMap = (function(flatMapFn) {
    return $List.create($List.flatMap($__5, flatMapFn));
  });
  this.cache = (function() {
    return $List.create($List.cache($__5));
  });
  this.index = (function() {
    return $List.create($List.index($__5));
  });
  this.keyBy = (function(keyFn) {
    return $List.create($List.keyBy($__5, keyFn));
  });
  this.zip = (function(other, zipFn) {
    return $List.create($List.zip($__5, other, zipFn));
  });
  this.skip = (function(k) {
    return $List.create($List.skip($__5, k));
  });
  this.take = (function(n) {
    return $List.create($List.take($__5, n));
  });
  this.range = (function(k, n) {
    return $List.create($List.range($__5, k, n));
  });
  this.scan = (function(scanFn, memo) {
    return $List.create($List.scan($__5, scanFn, memo));
  });
  if (list != null) {
    this.has = list.has;
    this.get = list.get;
    this.prev = list.prev;
    this.next = list.next;
  }
};
var $List = List;
($traceurRuntime.createClass)(List, {}, {
  isList: function(obj) {
    return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
  },
  create: function(list) {
    return new $List({
      has: list.has,
      get: list.get,
      prev: list.prev,
      next: list.next
    });
  },
  first: function(list) {
    return list.get(list.next());
  },
  last: function(list) {
    return list.get(list.prev());
  },
  forEach: function(list, fn) {
    var key;
    while ((key = list.next(key)) != null)
      fn(list.get(key), key);
  },
  reduce: function(list, fn, memo) {
    var key;
    while ((key = list.next(key)) != null)
      memo = fn(memo, list.get(key), key);
    return memo;
  },
  toArray: function(list) {
    var key,
        index = 0,
        array = [];
    while ((key = list.next(key)) != null)
      array[index++] = list.get(key);
    return array;
  },
  findKey: function(list, fn) {
    var key;
    while ((key = list.next(key)) != null)
      if (fn(list.get(key), key))
        return key;
  },
  find: function(list, fn) {
    return list.get($List.findKey(list, fn));
  },
  keyOf: function(list, value) {
    return $List.findKey(list, (function(v) {
      return v === value;
    }));
  },
  indexOf: function(list, value) {
    var key,
        i = 0;
    while ((key = list.next(key)) != null) {
      if (list.get(key) === value)
        return i;
      i++;
    }
  },
  keyAt: function(list, index) {
    var key,
        i = 0;
    while ((key = list.next(key)) != null)
      if (i++ == index)
        return key;
    return null;
  },
  at: function(list, index) {
    return list.get($List.keyAt(list, index));
  },
  every: function(list, predicate) {
    var key;
    while ((key = list.next(key)) != null)
      if (!predicate(list.get(key), key))
        return false;
    return true;
  },
  some: function(list, predicate) {
    var key;
    while ((key = list.next(key)) != null)
      if (predicate(list.get(key), key))
        return true;
    return false;
  },
  contains: function(list, value) {
    return $List.some(list, (function(v) {
      return v === value;
    }));
  },
  reverse: function(list) {
    var $__7 = list,
        has = $__7.has,
        get = $__7.get;
    function prev(key) {
      return list.next(key);
    }
    function next(key) {
      return list.prev(key);
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next
    };
  },
  map: function(list, mapFn) {
    var $__7 = list,
        has = $__7.has,
        prev = $__7.prev,
        next = $__7.next;
    function get(key) {
      return has(key) ? mapFn(list.get(key), key) : undefined;
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next
    };
  },
  filter: function(list, filterFn) {
    function has(key) {
      return list.has(key) && filterFn(list.get(key), key);
    }
    function get(key) {
      if (has(key))
        return list.get(key);
      return;
    }
    function prev(key) {
      var prev = key;
      while ((prev = list.prev(prev)) != null)
        if (has(prev))
          return prev;
      return null;
    }
    function next(key) {
      var next = key;
      while ((next = list.next(next)) != null)
        if (has(next))
          return next;
      return null;
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next
    };
  },
  flatten: function(list) {
    function has(key) {
      var path = Path.create(key);
      return Tree.has(list, path, 1);
    }
    function get(key) {
      var path = Path.create(key);
      return Tree.get(list, path, 1);
    }
    function prev(key) {
      var path = Path.create(key);
      return Path.key(Tree.prev(list, path, 1));
    }
    function next(key) {
      var path = Path.create(key);
      return Path.key(Tree.next(list, path, 1));
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next
    };
  },
  flatMap: function(list, flatMapFn) {
    return $List.flatten($List.map(list, flatMapFn));
  },
  cache: function(list) {
    return new Cache(list);
  },
  index: function(list) {
    return new Index(list);
  },
  keyBy: function(list, keyFn) {
    return new KeyBy(list, keyFn);
  },
  zip: function(list, other, zipFn) {
    list = $List.index(list);
    other = $List.index(other);
    function has(key) {
      return list.has(key) && other.has(key);
    }
    function get(key) {
      return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
    }
    function prev(key) {
      var prev = list.prev(key);
      return prev != null && prev == other.prev(key) ? prev : null;
    }
    function next(key) {
      var next = list.next(key);
      return next != null && next == other.next(key) ? next : null;
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next
    };
  },
  skip: function(list, k) {
    return $List.filter($List.index(list), function(value, key) {
      return key >= k;
    });
  },
  take: function(list, n) {
    return $List.filter($List.index(list), function(value, key) {
      return key < n;
    });
  },
  range: function(list, k, n) {
    return $List.filter($List.index(list), function(value, key) {
      return key >= k && key < n + k;
    });
  },
  scan: function(list, scanFn, memo) {
    var $__7 = list,
        has = $__7.has,
        prev = $__7.prev,
        next = $__7.next,
        scanList;
    function get(key) {
      var prev = scanList.prev(key);
      return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
    }
    scanList = $List.cache({
      has: has,
      get: get,
      prev: prev,
      next: next
    });
    return scanList;
  },
  async: function(list, scheduler) {
    return new AsyncList(list);
  }
});
var $__default = List;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/list.js
},{"./async_list":2,"./cache":3,"./index":5,"./key_by":7,"./tree":16}],10:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  MutableList: {get: function() {
      return MutableList;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__observable_95_list__;
var ObservableList = ($__observable_95_list__ = require("./observable_list"), $__observable_95_list__ && $__observable_95_list__.__esModule && $__observable_95_list__ || {default: $__observable_95_list__}).ObservableList;
var MutableList = function MutableList(list) {
  var $__1 = this;
  $traceurRuntime.superConstructor($MutableList).call(this, list);
  this.set = (function(key, value) {
    throw new Error("Not implemented");
  });
  this.splice = (function(prev, next) {
    for (var values = [],
        $__3 = 2; $__3 < arguments.length; $__3++)
      values[$__3 - 2] = arguments[$__3];
    throw new Error("Not implemented");
  });
  this.addBefore = (function(key, value) {
    return $MutableList.addBefore($__1, key, value);
  });
  this.addAfter = (function(key, value) {
    return $MutableList.addAfter($__1, key, value);
  });
  this.push = (function(value) {
    return $MutableList.push($__1, value);
  });
  this.unshift = (function(value) {
    return $MutableList.unshift($__1, value);
  });
  this.delete = (function(key) {
    return $MutableList.delete($__1, key);
  });
  this.deleteBefore = (function(key) {
    return $MutableList.deleteBefore($__1, key);
  });
  this.deleteAfter = (function(key) {
    return $MutableList.deleteAfter($__1, key);
  });
  this.pop = (function() {
    return $MutableList.pop($__1);
  });
  this.shift = (function() {
    return $MutableList.shift($__1);
  });
  this.remove = (function(value) {
    return $MutableList.remove($__1, value);
  });
  this.compose = (function(lens) {
    return $MutableList.create($MutableList.compose($__1, lens));
  });
  if (list != null) {
    this.set = list.set;
    this.splice = list.splice;
  }
};
var $MutableList = MutableList;
($traceurRuntime.createClass)(MutableList, {}, {
  isMutableList: function(obj) {
    return ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
  },
  create: function(list) {
    return new $MutableList({
      has: list.has,
      get: list.get,
      prev: list.prev,
      next: list.next,
      observe: list.observe,
      set: list.set,
      splice: list.splice
    });
  },
  addBefore: function(list, key, value) {
    list.splice(list.prev(key), key, value);
    return list.prev(key);
  },
  addAfter: function(list, key, value) {
    list.splice(key, list.next(key), value);
    return list.next(key);
  },
  push: function(list, value) {
    return $MutableList.addBefore(list, null, value);
  },
  unshift: function(list, value) {
    return $MutableList.addAfter(list, null, value);
  },
  delete: function(list, key) {
    if (!list.has(key))
      return;
    var value = list.get(key);
    list.splice(list.prev(key), list.next(key));
    return value;
  },
  deleteBefore: function(list, key) {
    return $MutableList.delete(list, list.prev(key));
  },
  deleteAfter: function(list, key) {
    return $MutableList.delete(list, list.next(key));
  },
  pop: function(list) {
    return $MutableList.deleteBefore(list, null);
  },
  shift: function(list) {
    return $MutableList.deleteAfter(list, null);
  },
  remove: function(list, value) {
    var key = $MutableList.keyOf(list, value);
    if (key == null)
      return false;
    delete(list, key);
    return true;
  },
  compose: function(list, lens) {
    function get(key) {
      return lens.get(list.get(key));
    }
    function set(key, value) {
      list.set(key, lens.set(list.get(key), value));
    }
    function splice(prev, next) {
      var $__4;
      for (var values = [],
          $__3 = 2; $__3 < arguments.length; $__3++)
        values[$__3 - 2] = arguments[$__3];
      ($__4 = list).splice.apply($__4, $traceurRuntime.spread([prev, next], values.map((function(val) {
        return lens.set(null, val);
      }))));
    }
    return {
      has: list.has,
      get: get,
      set: set,
      splice: splice,
      prev: list.prev,
      next: list.next,
      observe: list.observe
    };
  }
}, ObservableList);
var $__default = MutableList;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/mutable_list.js
},{"./observable_list":15}],11:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Subject: {get: function() {
      return Subject;
    }},
  __esModule: {value: true}
});
var $__key__;
var Key = ($__key__ = require("./key"), $__key__ && $__key__.__esModule && $__key__ || {default: $__key__}).default;
var Subject = function Subject() {
  var $__1 = this;
  this.observe = (function(observer) {
    var observerKey = Key.create();
    $__1._observers[observerKey] = observer;
    return {unsubscribe: (function() {
        delete $__1._observers[observerKey];
      })};
  });
  this.notify = (function(notifier) {
    for (var observerKey in $__1._observers)
      notifier($__1._observers[observerKey]);
  });
  this._observers = Object.create(null);
};
($traceurRuntime.createClass)(Subject, {}, {});

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/observable.js
},{"./key":6}],12:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ObservableCache: {get: function() {
      return ObservableCache;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__cache__;
var Cache = ($__cache__ = require("./cache"), $__cache__ && $__cache__.__esModule && $__cache__ || {default: $__cache__}).default;
var ObservableCache = function ObservableCache(list) {
  var $__1 = this;
  $traceurRuntime.superConstructor($ObservableCache).call(this, list);
  this.observe = (function(observer) {
    return $__1._list.observe(observer);
  });
  this.onInvalidate = (function(prev, next) {
    var key;
    key = prev;
    while ((key = $__1._next[key]) !== undefined) {
      delete $__1._next[$__1._prev[key]];
      delete $__1._prev[key];
      if (key == next)
        break;
      delete $__1._byKey[key];
    }
    while ((key = $__1._prev[key]) !== undefined) {
      delete $__1._prev[$__1._next[key]];
      delete $__1._next[key];
      if (key == prev)
        break;
      delete $__1._byKey[key];
    }
  });
  list.observe(this);
};
var $ObservableCache = ObservableCache;
($traceurRuntime.createClass)(ObservableCache, {}, {}, Cache);
var $__default = ObservableCache;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/observable_cache.js
},{"./cache":3}],13:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ObservableIndex: {get: function() {
      return ObservableIndex;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__index__,
    $__observable__;
var Index = ($__index__ = require("./index"), $__index__ && $__index__.__esModule && $__index__ || {default: $__index__}).default;
var Subject = ($__observable__ = require("./observable"), $__observable__ && $__observable__.__esModule && $__observable__ || {default: $__observable__}).Subject;
var ObservableIndex = function ObservableIndex(list) {
  var $__2 = this;
  $traceurRuntime.superConstructor($ObservableIndex).call(this, list);
  this.has = (function(index) {
    if (index >= 0 && index < $__2._byIndex.length)
      return true;
    var next,
        last = $__2._byIndex.length - 1;
    while (last != index) {
      next = $__2._list.next($__2._byIndex[last]);
      if (next == null)
        return false;
      $__2._byIndex[++last] = next;
      $__2._byKey[next] = last;
    }
    return true;
  });
  this.observe = (function(observer) {
    return $__2._subject.observe(observer);
  });
  this.onInvalidate = (function(prev, next) {
    var prevIndex = $__2._byKey[prev],
        length = $__2._byIndex.length,
        index = prevIndex;
    while (++index < length)
      delete $__2._byKey[$__2._byIndex[index]];
    $__2._byIndex.splice(prevIndex + 1);
    $__2._subject.notify(function(observer) {
      observer.onInvalidate(prevIndex, null);
    });
  });
  this._byKey = Object.create(null);
  this._subject = new Subject();
  list.observe(this);
};
var $ObservableIndex = ObservableIndex;
($traceurRuntime.createClass)(ObservableIndex, {}, {}, Index);
var $__default = ObservableIndex;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/observable_index.js
},{"./index":5,"./observable":11}],14:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ObservableKeyBy: {get: function() {
      return ObservableKeyBy;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__key_95_by__,
    $__observable__;
var KeyBy = ($__key_95_by__ = require("./key_by"), $__key_95_by__ && $__key_95_by__.__esModule && $__key_95_by__ || {default: $__key_95_by__}).default;
var Subject = ($__observable__ = require("./observable"), $__observable__ && $__observable__.__esModule && $__observable__ || {default: $__observable__}).Subject;
var ObservableKeyBy = function ObservableKeyBy(list, keyFn) {
  var $__2 = this;
  $traceurRuntime.superConstructor($ObservableKeyBy).call(this, list, keyFn);
  this.observe = (function(observer) {
    return $__2._subject.observe(observer);
  });
  this.onInvalidate = (function(prev, next) {
    $__2._subject.notify(function(observer) {
      observer.onInvalidate(this._keyBySourceKey[prev], this._keyBySourceKey[next]);
    });
  });
  this._subject = new Subject();
  list.observe(this);
};
var $ObservableKeyBy = ObservableKeyBy;
($traceurRuntime.createClass)(ObservableKeyBy, {}, {}, KeyBy);
var $__default = ObservableKeyBy;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/observable_key_by.js
},{"./key_by":7,"./observable":11}],15:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  ObservableList: {get: function() {
      return ObservableList;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__list__,
    $__tree__,
    $__observable__,
    $__observable_95_cache__,
    $__observable_95_index__,
    $__observable_95_key_95_by__;
var List = ($__list__ = require("./list"), $__list__ && $__list__.__esModule && $__list__ || {default: $__list__}).List;
var $__1 = ($__tree__ = require("./tree"), $__tree__ && $__tree__.__esModule && $__tree__ || {default: $__tree__}),
    Tree = $__1.Tree,
    Path = $__1.Path;
var Subject = ($__observable__ = require("./observable"), $__observable__ && $__observable__.__esModule && $__observable__ || {default: $__observable__}).Subject;
var ObservableCache = ($__observable_95_cache__ = require("./observable_cache"), $__observable_95_cache__ && $__observable_95_cache__.__esModule && $__observable_95_cache__ || {default: $__observable_95_cache__}).default;
var ObservableIndex = ($__observable_95_index__ = require("./observable_index"), $__observable_95_index__ && $__observable_95_index__.__esModule && $__observable_95_index__ || {default: $__observable_95_index__}).default;
var ObservableKeyBy = ($__observable_95_key_95_by__ = require("./observable_key_by"), $__observable_95_key_95_by__ && $__observable_95_key_95_by__.__esModule && $__observable_95_key_95_by__ || {default: $__observable_95_key_95_by__}).default;
;
var ObservableList = function ObservableList(list) {
  var $__6 = this;
  $traceurRuntime.superConstructor($ObservableList).call(this, list);
  this.observe = (function(observer) {
    throw new Error("Not implemented");
  });
  this.reverse = (function() {
    return $ObservableList.create($ObservableList.reverse($__6));
  });
  this.map = (function(mapFn) {
    return $ObservableList.create($ObservableList.map($__6, mapFn));
  });
  this.filter = (function(filterFn) {
    return $ObservableList.create($ObservableList.filter($__6, filterFn));
  });
  this.flatten = (function() {
    return $ObservableList.create($ObservableList.flatten($__6));
  });
  this.flatMap = (function(flatMapFn) {
    return $ObservableList.create($ObservableList.flatMap($__6, flatMapFn));
  });
  this.cache = (function() {
    return $ObservableList.create($ObservableList.cache($__6));
  });
  this.index = (function() {
    return $ObservableList.create($ObservableList.index($__6));
  });
  this.keyBy = (function(keyFn) {
    return $ObservableList.create($ObservableList.keyBy($__6, keyFn));
  });
  this.zip = (function(other, zipFn) {
    return $ObservableList.create($ObservableList.zip($__6, other, zipFn));
  });
  this.skip = (function(k) {
    return $ObservableList.create($ObservableList.skip($__6, k));
  });
  this.take = (function(n) {
    return $ObservableList.create($ObservableList.take($__6, n));
  });
  this.range = (function(k, n) {
    return $ObservableList.create($ObservableList.range($__6, k, n));
  });
  this.scan = (function(scanFn, memo) {
    return $ObservableList.create($ObservableList.scan($__6, scanFn, memo));
  });
  if (list != null)
    this.observe = list.observe;
};
var $ObservableList = ObservableList;
($traceurRuntime.createClass)(ObservableList, {}, {
  isObservableList: function(obj) {
    return List.isList(obj) && !!obj['observe'];
  },
  create: function(list) {
    return new $ObservableList({
      has: list.has,
      get: list.get,
      prev: list.prev,
      next: list.next,
      observe: list.observe
    });
  },
  reverse: function(list) {
    var $__8 = List.reverse(list),
        has = $__8.has,
        get = $__8.get,
        prev = $__8.prev,
        next = $__8.next;
    function observe(observer) {
      return list.observe({onInvalidate: function(prev, next) {
          observer.onInvalidate(next, prev);
        }});
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next,
      observe: observe
    };
  },
  map: function(list, mapFn) {
    var $__8 = List.map(list, mapFn),
        has = $__8.has,
        get = $__8.get,
        prev = $__8.prev,
        next = $__8.next;
    return {
      has: has,
      get: get,
      prev: prev,
      next: next,
      observe: list.observe
    };
  },
  filter: function(list, filterFn) {
    var $__8 = List.filter(list, filterFn),
        has = $__8.has,
        get = $__8.get,
        prev = $__8.prev,
        next = $__8.next;
    function observe(observer) {
      return list.observe({onInvalidate: function(p, n) {
          p = has(p) ? p : prev(p);
          n = has(n) ? n : next(n);
          observer.onInvalidate(p, n);
        }});
    }
    return {
      has: has,
      get: get,
      prev: prev,
      next: next,
      observe: observe
    };
  },
  flatten: function(list) {
    var cache;
    var subscriptions = Object.create(null);
    var subject = new Subject();
    list.observe({onInvalidate: function(prev, next) {
        var key;
        key = prev;
        while ((key = cache.next(key)) != null && key != next) {
          var subscription = subscriptions[key];
          if (subscription) {
            subscription.unsubscribe();
            delete subscriptions[key];
          }
        }
        key = next;
        while ((key = cache.prev(key)) != null && key != prev) {
          var subscription = subscriptions[key];
          if (subscription) {
            subscription.unsubscribe();
            delete subscriptions[key];
          }
        }
      }});
    cache = $ObservableList.cache($ObservableList.map(list, function(value, key) {
      subscriptions[key] = value.observe({onInvalidate: function(prev, next) {
          var prevKey,
              nextKey,
              prevPath = Path.append(key, prev),
              nextPath = Path.append(key, next);
          if (prev == null)
            prevPath = Tree.prev(list, Tree.next(list, prevPath));
          if (next == null)
            nextPath = Tree.next(list, Tree.prev(list, nextPath));
          prevKey = Path.key(prevPath);
          nextKey = Path.key(nextPath);
          subject.notify(function(observer) {
            observer.onInvalidate(prevKey, nextKey);
          });
        }});
      return value;
    }));
    cache.observe({onInvalidate: function(prev, next) {
        var prevKey = Path.key(Tree.prev(list, [prev])),
            nextKey = Path.key(Tree.next(list, [next]));
        subject.notify(function(observer) {
          observer.onInvalidate(prevKey, nextKey);
        });
      }});
    var $__8 = List.flatten(cache),
        has = $__8.has,
        get = $__8.get,
        next = $__8.next,
        prev = $__8.prev;
    return {
      has: has,
      get: get,
      next: next,
      prev: prev,
      observe: subject.observe
    };
  },
  flatMap: function(list, flatMapFn) {
    return $ObservableList.flatten($ObservableList.map(list, flatMapFn));
  },
  cache: function(list) {
    return new ObservableCache(list);
  },
  index: function(list) {
    return new ObservableIndex(list);
  },
  keyBy: function(list, keyFn) {
    return new ObservableKeyBy(list, keyFn);
  },
  zip: function(list, other, zipFn) {
    list = $ObservableList.index(list);
    other = $ObservableList.index(other);
    function has(key) {
      return list.has(key) && other.has(key);
    }
    function get(key) {
      return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
    }
    function prev(key) {
      var prev = list.prev(key);
      return prev != null && prev == other.prev(key) ? prev : null;
    }
    function next(key) {
      var next = list.next(key);
      return next != null && next == other.next(key) ? next : null;
    }
    var subject = new Subject(),
        observer = {onInvalidate: function(prev, next) {
            subject.notify(function(_observer) {
              _observer.onInvalidate(prev, next);
            });
          }};
    list.observe(observer);
    other.observe(observer);
    return {
      has: has,
      get: get,
      prev: prev,
      next: next,
      observe: subject.observe
    };
  },
  skip: function(list, k) {
    return $ObservableList.filter($ObservableList.index(list), function(value, key) {
      return key >= k;
    });
  },
  take: function(list, n) {
    return $ObservableList.filter($ObservableList.index(list), function(value, key) {
      return key < n;
    });
  },
  range: function(list, k, n) {
    return $ObservableList.filter($ObservableList.index(list), function(value, key) {
      return key >= k && key < n + k;
    });
  },
  scan: function(list, scanFn, memo) {
    var $__8 = list,
        has = $__8.has,
        prev = $__8.prev,
        next = $__8.next,
        scanList;
    function get(key) {
      var prev = scanList.prev(key);
      return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
    }
    function observe(observer) {
      return list.observe({onInvalidate: function(prev, next) {
          observer.onInvalidate(prev, null);
        }});
    }
    scanList = $ObservableList.cache({
      has: has,
      get: get,
      prev: prev,
      next: next,
      observe: observe
    });
    return scanList;
  }
}, List);
var $__default = ObservableList;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/observable_list.js
},{"./list":9,"./observable":11,"./observable_cache":12,"./observable_index":13,"./observable_key_by":14,"./tree":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  Path: {get: function() {
      return Path;
    }},
  Tree: {get: function() {
      return Tree;
    }},
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__list__;
var List = ($__list__ = require("./list"), $__list__ && $__list__.__esModule && $__list__ || {default: $__list__}).List;
;
var Path;
(function(Path) {
  function key(path) {
    return JSON.stringify(path);
  }
  Path.key = key;
  function create(key) {
    return key == null ? null : JSON.parse(key.toString());
  }
  Path.create = create;
  function head(path) {
    return path ? path[0] : null;
  }
  Path.head = head;
  function get(path, index) {
    return path[index];
  }
  Path.get = get;
  function tail(path) {
    return path == null ? [] : path.slice(1, path.length);
  }
  Path.tail = tail;
  function append(a, b) {
    return [].concat(a).concat(b);
  }
  Path.append = append;
})(Path || (Path = {}));
var Tree;
(function(Tree) {
  function has(list, path) {
    var depth = arguments[2] !== (void 0) ? arguments[2] : Infinity;
    var head = Path.head(path),
        tail = Path.tail(path);
    return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth));
  }
  Tree.has = has;
  function get(list, path) {
    var depth = arguments[2] !== (void 0) ? arguments[2] : Infinity;
    var head = Path.head(path),
        tail = Path.tail(path);
    if (!list.has(head))
      return;
    var value = list.get(head);
    if (tail.length == 0 || depth == 0)
      return value;
    return Tree.get(value, tail, depth);
  }
  Tree.get = get;
  function prev(list) {
    var path = arguments[1] !== (void 0) ? arguments[1] : [];
    var depth = arguments[2] !== (void 0) ? arguments[2] : Infinity;
    var head = Path.head(path),
        tail = Path.tail(path),
        key = head,
        value;
    if (head != null && !list.has(head))
      return;
    do {
      value = list.get(key);
      if (!List.isList(value) || depth == 0) {
        if (key != null && key != head)
          return [key];
      } else {
        var prevPath = Tree.prev(value, tail, depth - 1);
        if (prevPath != null)
          return Path.append(key, prevPath);
        tail = [];
      }
    } while ((key = list.prev(key)) != null);
  }
  Tree.prev = prev;
  function next(list) {
    var path = arguments[1] !== (void 0) ? arguments[1] : [];
    var depth = arguments[2] !== (void 0) ? arguments[2] : Infinity;
    var head = Path.head(path),
        tail = Path.tail(path),
        key = head,
        value;
    if (head != null && !list.has(head))
      return;
    do {
      value = list.get(key);
      if (!List.isList(value) || depth == 0) {
        if (key != null && key != head)
          return [key];
      } else {
        var nextPath = Tree.next(value, tail, depth - 1);
        if (nextPath != null)
          return Path.append(key, nextPath);
        tail = [];
      }
    } while ((key = list.next(key)) != null);
  }
  Tree.next = next;
})(Tree || (Tree = {}));
var $__default = Tree;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/tree.js
},{"./list":9}],17:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__key__,
    $__observable__,
    $__mutable_95_list__;
var Key = ($__key__ = require("./key"), $__key__ && $__key__.__esModule && $__key__ || {default: $__key__}).default;
var Subject = ($__observable__ = require("./observable"), $__observable__ && $__observable__.__esModule && $__observable__ || {default: $__observable__}).Subject;
var MutableList = ($__mutable_95_list__ = require("./mutable_list"), $__mutable_95_list__ && $__mutable_95_list__.__esModule && $__mutable_95_list__ || {default: $__mutable_95_list__}).MutableList;
var Unit = function Unit(value) {
  var $__3 = this;
  $traceurRuntime.superConstructor($Unit).call(this);
  this.has = (function(key) {
    return $__3._key == key;
  });
  this.get = (function(key) {
    if ($__3.has(key))
      return $__3._value;
  });
  this.prev = (function(key) {
    if (key == null)
      return $__3._key;
    return null;
  });
  this.next = (function(key) {
    if (key == null)
      return $__3._key;
    return null;
  });
  this.set = (function(key, value) {
    $__3._key = key;
    $__3._value = value;
    $__3._invalidate();
  });
  this.splice = (function(prev, next) {
    for (var values = [],
        $__5 = 2; $__5 < arguments.length; $__5++)
      values[$__5 - 2] = arguments[$__5];
    if (values.length)
      return $__3.set(Key.create(), values[0]);
    delete $__3._key;
    delete $__3._value;
    $__3._invalidate();
  });
  this.observe = (function(observer) {
    return $__3._subject.observe(observer);
  });
  this._invalidate = (function(prev, next) {
    $__3._subject.notify(function(observer) {
      observer.onInvalidate(prev, next);
    });
  });
  this._subject = new Subject();
  if (arguments.length)
    this.splice(null, null, value);
};
var $Unit = Unit;
($traceurRuntime.createClass)(Unit, {}, {}, MutableList);
var $__default = Unit;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/unit.js
},{"./key":6,"./mutable_list":10,"./observable":11}],18:[function(require,module,exports){
(function (process){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":19}],19:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],20:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function isPrivateName(s) {
    return privateNames[s];
  }
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isShimSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isShimSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  freeze(SymbolValue.prototype);
  function isSymbolString(s) {
    return symbolValues[s] || privateNames[s];
  }
  function toProperty(name) {
    if (isShimSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function removeSymbolKeys(array) {
    var rv = [];
    for (var i = 0; i < array.length; i++) {
      if (!isSymbolString(array[i])) {
        rv.push(array[i]);
      }
    }
    return rv;
  }
  function getOwnPropertyNames(object) {
    return removeSymbolKeys($getOwnPropertyNames(object));
  }
  function keys(object) {
    return removeSymbolKeys($keys(object));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol) {
        rv.push(symbol);
      }
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function defineProperty(object, name, descriptor) {
    if (isShimSymbol(name)) {
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    $defineProperty(Object, 'keys', {value: keys});
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (isSymbolString(name))
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function polyfillSymbol(global, Symbol) {
    if (!global.Symbol) {
      global.Symbol = Symbol;
      Object.getOwnPropertySymbols = getOwnPropertySymbols;
    }
    if (!global.Symbol.iterator) {
      global.Symbol.iterator = Symbol('Symbol.iterator');
    }
  }
  function setupGlobals(global) {
    polyfillSymbol(global, Symbol);
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    checkObjectCoercible: checkObjectCoercible,
    createPrivateName: createPrivateName,
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    isObject: isObject,
    isPrivateName: isPrivateName,
    isSymbolString: isSymbolString,
    keys: $keys,
    setupGlobals: setupGlobals,
    toObject: toObject,
    toProperty: toProperty,
    typeof: typeOf
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
(function() {
  'use strict';
  var path;
  function relativeRequire(callerPath, requiredPath) {
    path = path || typeof require !== 'undefined' && require('path');
    function isDirectory(path) {
      return path.slice(-1) === '/';
    }
    function isAbsolute(path) {
      return path[0] === '/';
    }
    function isRelative(path) {
      return path[0] === '.';
    }
    if (isDirectory(requiredPath) || isAbsolute(requiredPath))
      return;
    return isRelative(requiredPath) ? require(path.resolve(path.dirname(callerPath), requiredPath)) : require(requiredPath);
  }
  $traceurRuntime.require = relativeRequire;
})();
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  var $__0 = Object,
      getOwnPropertyNames = $__0.getOwnPropertyNames,
      getOwnPropertySymbols = $__0.getOwnPropertySymbols;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superConstructor(ctor) {
    return ctor.__proto__;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError(("super has no setter '" + name + "'."));
  }
  function getDescriptors(object) {
    var descriptors = {};
    var names = getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    var symbols = getOwnPropertySymbols(object);
    for (var i = 0; i < symbols.length; i++) {
      var symbol = symbols[i];
      descriptors[$traceurRuntime.toProperty(symbol)] = $getOwnPropertyDescriptor(object, $traceurRuntime.toProperty(symbol));
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superConstructor = superConstructor;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
  if (typeof $traceurRuntime !== 'object') {
    throw new Error('traceur runtime not found.');
  }
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function() {
  'use strict';
  var types = {
    any: {name: 'any'},
    boolean: {name: 'boolean'},
    number: {name: 'number'},
    string: {name: 'string'},
    symbol: {name: 'symbol'},
    void: {name: 'void'}
  };
  var GenericType = function GenericType(type, argumentTypes) {
    this.type = type;
    this.argumentTypes = argumentTypes;
  };
  ($traceurRuntime.createClass)(GenericType, {}, {});
  var typeRegister = Object.create(null);
  function genericType(type) {
    for (var argumentTypes = [],
        $__1 = 1; $__1 < arguments.length; $__1++)
      argumentTypes[$__1 - 1] = arguments[$__1];
    var typeMap = typeRegister;
    var key = $traceurRuntime.getOwnHashObject(type).hash;
    if (!typeMap[key]) {
      typeMap[key] = Object.create(null);
    }
    typeMap = typeMap[key];
    for (var i = 0; i < argumentTypes.length - 1; i++) {
      key = $traceurRuntime.getOwnHashObject(argumentTypes[i]).hash;
      if (!typeMap[key]) {
        typeMap[key] = Object.create(null);
      }
      typeMap = typeMap[key];
    }
    var tail = argumentTypes[argumentTypes.length - 1];
    key = $traceurRuntime.getOwnHashObject(tail).hash;
    if (!typeMap[key]) {
      typeMap[key] = new GenericType(type, argumentTypes);
    }
    return typeMap[key];
  }
  $traceurRuntime.GenericType = GenericType;
  $traceurRuntime.genericType = genericType;
  $traceurRuntime.type = types;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime,
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  };
  var $ModuleEvaluationError = ModuleEvaluationError;
  ($traceurRuntime.createClass)(ModuleEvaluationError, {
    stripError: function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    },
    stripCause: function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    },
    loadedBy: function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    },
    stripStack: function(causeStack) {
      var stack = [];
      causeStack.split('\n').some((function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      }));
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    }
  }, {}, Error);
  function beforeLines(lines, number) {
    var result = [];
    var first = number - 3;
    if (first < 0)
      first = 0;
    for (var i = first; i < number; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function afterLines(lines, number) {
    var last = number + 1;
    if (last > lines.length - 1)
      last = lines.length - 1;
    var result = [];
    for (var i = number; i <= last; i++) {
      result.push(lines[i]);
    }
    return result;
  }
  function columnSpacing(columns) {
    var result = '';
    for (var i = 0; i < columns - 1; i++) {
      result += '-';
    }
    return result;
  }
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superConstructor($UncoatedModuleInstantiator).call(this, url, null);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        var relativeRequire;
        if (typeof $traceurRuntime !== undefined) {
          relativeRequire = $traceurRuntime.require.bind(null, this.url);
        }
        return this.value_ = this.func.call(global, relativeRequire);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        if (ex.stack) {
          var lines = this.func.toString().split('\n');
          var evaled = [];
          ex.stack.split('\n').some(function(frame) {
            if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
              return true;
            var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
            if (m) {
              var line = parseInt(m[2], 10);
              evaled = evaled.concat(beforeLines(lines, line));
              evaled.push(columnSpacing(m[3]) + '^');
              evaled = evaled.concat(afterLines(lines, line));
              evaled.push('= = = = = = = = =');
            } else {
              evaled.push(frame);
            }
          });
          ex.stack = evaled.join('\n');
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== 'string')
        throw new TypeError('module name must be a string, not ' + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, deps, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, deps, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  var moduleStoreModule = new Module({ModuleStore: ModuleStore});
  ModuleStore.set('@traceur/src/runtime/ModuleStore', moduleStoreModule);
  ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    registerModule: ModuleStore.registerModule.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/utils.js";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach((function(f) {
      return f(global);
    }));
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Map.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Map.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      isObject = $__0.isObject,
      maybeAddIterator = $__0.maybeAddIterator,
      registerPolyfill = $__0.registerPolyfill;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__2 = iterable[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3; !($__3 = $__2.next()).done; ) {
        var $__4 = $__3.value,
            key = $__4[0],
            value = $__4[1];
        {
          this.set(key, value);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
        return true;
      }
      return false;
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0; i < this.entries_.length; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__5() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__5, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__6() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return key;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__6, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__7() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__7, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function polyfillMap(global) {
    var $__4 = global,
        Object = $__4.Object,
        Symbol = $__4.Symbol;
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries === undefined)
      global.Map = Map;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Map.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Set.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Set.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      isObject = $__0.isObject,
      maybeAddIterator = $__0.maybeAddIterator,
      registerPolyfill = $__0.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Map.js").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__4 = iterable[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__5; !($__5 = $__4.next()).done; ) {
        var item = $__5.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__2 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__2);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__7() {
      var $__8,
          $__9;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__8 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__9 = $__8[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__9.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__9.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__9.value;
            default:
              return $ctx.end();
          }
      }, $__7, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__10() {
      var $__11,
          $__12;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__11 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__12 = $__11[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__12.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__12.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__12.value;
            default:
              return $ctx.end();
          }
      }, $__10, this);
    })
  }, {});
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function polyfillSet(global) {
    var $__6 = global,
        Object = $__6.Object,
        Symbol = $__6.Symbol;
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Set.js" + '');
System.registerModule("traceur-runtime@0.0.79/node_modules/rsvp/lib/rsvp/asap.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/node_modules/rsvp/lib/rsvp/asap.js";
  var len = 0;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Promise.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Promise.js";
  var async = System.get("traceur-runtime@0.0.79/node_modules/rsvp/lib/rsvp/asap.js").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js").registerPolyfill;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        if (isPromise(x)) {
          return x;
        }
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Promise.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/StringIterator.js", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/StringIterator.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      createIteratorResultObject = $__0.createIteratorResultObject,
      isObject = $__0.isObject;
  var toProperty = $traceurRuntime.toProperty;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__2 = {}, Object.defineProperty($__2, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty.call(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
      }
      var s = o[toProperty(iteratedString)];
      if (s === undefined) {
        return createIteratorResultObject(undefined, true);
      }
      var position = o[toProperty(stringIteratorNextIndex)];
      var len = s.length;
      if (position >= len) {
        o[toProperty(iteratedString)] = undefined;
        return createIteratorResultObject(undefined, true);
      }
      var first = s.charCodeAt(position);
      var resultString;
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
          resultString = String.fromCharCode(first);
        } else {
          resultString = String.fromCharCode(first) + String.fromCharCode(second);
        }
      }
      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
      return createIteratorResultObject(resultString, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__2, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2), {});
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/String.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/String.js";
  var createStringIterator = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/StringIterator.js").createStringIterator;
  var $__1 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function includes(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    if (search && $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (pos != pos) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    if (searchLength + start > stringLength) {
      return false;
    }
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'endsWith', endsWith, 'includes', includes, 'repeat', repeat, 'startsWith', startsWith]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get includes() {
      return includes;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/String.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/ArrayIterator.js", [], function() {
  "use strict";
  var $__2;
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/ArrayIterator.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      toObject = $__0.toObject,
      toUint32 = $__0.toUint32,
      createIteratorResultObject = $__0.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__2 = {}, Object.defineProperty($__2, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__2, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__2), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Array.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Array.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/ArrayIterator.js"),
      entries = $__0.entries,
      keys = $__0.keys,
      values = $__0.values;
  var $__1 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      checkIterable = $__1.checkIterable,
      isCallable = $__1.isCallable,
      isConstructor = $__1.isConstructor,
      maybeAddFunctions = $__1.maybeAddFunctions,
      maybeAddIterator = $__1.maybeAddIterator,
      registerPolyfill = $__1.registerPolyfill,
      toInteger = $__1.toInteger,
      toLength = $__1.toLength,
      toObject = $__1.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__2 = items[$traceurRuntime.toProperty(Symbol.iterator)](),
          $__3; !($__3 = $__2.next()).done; ) {
        var item = $__3.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__4 = 0; $__4 < arguments.length; $__4++)
      items[$__4] = arguments[$__4];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      var value = object[i];
      if (predicate.call(thisArg, value, i, object)) {
        return returnIndex ? i : value;
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__5 = global,
        Array = $__5.Array,
        Object = $__5.Object,
        Symbol = $__5.Symbol;
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Array.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Object.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Object.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill;
  var $__1 = $traceurRuntime,
      defineProperty = $__1.defineProperty,
      getOwnPropertyDescriptor = $__1.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__1.getOwnPropertyNames,
      isPrivateName = $__1.isPrivateName,
      keys = $__1.keys;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = source == null ? [] : keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (isPrivateName(name))
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (isPrivateName(name))
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Object.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/Number.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/Number.js";
  var $__0 = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js"),
      isNumber = $__0.isNumber,
      maybeAddConsts = $__0.maybeAddConsts,
      maybeAddFunctions = $__0.maybeAddFunctions,
      registerPolyfill = $__0.registerPolyfill,
      toInteger = $__0.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/Number.js" + '');
System.registerModule("traceur-runtime@0.0.79/src/runtime/polyfills/polyfills.js", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.79/src/runtime/polyfills/polyfills.js";
  var polyfillAll = System.get("traceur-runtime@0.0.79/src/runtime/polyfills/utils.js").polyfillAll;
  polyfillAll(Reflect.global);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
System.get("traceur-runtime@0.0.79/src/runtime/polyfills/polyfills.js" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":19,"path":18}],21:[function(require,module,exports){
"use strict";
var $__factory__,
    $__list__,
    $__observable_95_list__,
    $__mutable_95_list__,
    $__unit__,
    $__array_95_list__,
    $__linked_95_list__,
    $__tree__;
var $__0 = ($__factory__ = require("./factory"), $__factory__ && $__factory__.__esModule && $__factory__ || {default: $__factory__}),
    factory = $__0.default,
    _fromPromise = $__0.fromPromise,
    _fromIterator = $__0.fromIterator;
var _List = ($__list__ = require("./list"), $__list__ && $__list__.__esModule && $__list__ || {default: $__list__}).default;
var _ObservableList = ($__observable_95_list__ = require("./observable_list"), $__observable_95_list__ && $__observable_95_list__.__esModule && $__observable_95_list__ || {default: $__observable_95_list__}).default;
var _MutableList = ($__mutable_95_list__ = require("./mutable_list"), $__mutable_95_list__ && $__mutable_95_list__.__esModule && $__mutable_95_list__ || {default: $__mutable_95_list__}).default;
var _Unit = ($__unit__ = require("./unit"), $__unit__ && $__unit__.__esModule && $__unit__ || {default: $__unit__}).default;
var _ArrayList = ($__array_95_list__ = require("./array_list"), $__array_95_list__ && $__array_95_list__.__esModule && $__array_95_list__ || {default: $__array_95_list__}).default;
var _LinkedList = ($__linked_95_list__ = require("./linked_list"), $__linked_95_list__ && $__linked_95_list__.__esModule && $__linked_95_list__ || {default: $__linked_95_list__}).default;
var _Tree = ($__tree__ = require("./tree"), $__tree__ && $__tree__.__esModule && $__tree__ || {default: $__tree__}).default;
function Sonic(obj) {
  return factory(obj);
}
var Sonic;
(function(Sonic) {
  Sonic.List = _List;
  Sonic.ObservableList = _ObservableList;
  Sonic.MutableList = _MutableList;
  Sonic.Unit = _Unit;
  Sonic.ArrayList = _ArrayList;
  Sonic.LinkedList = _LinkedList;
  Sonic.Tree = _Tree;
  Sonic.fromPromise = _fromPromise;
  Sonic.fromIterator = _fromIterator;
})(Sonic || (Sonic = {}));
module['exports'] = Sonic;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/sonic.js
},{"./array_list":1,"./factory":4,"./linked_list":8,"./list":9,"./mutable_list":10,"./observable_list":15,"./tree":16,"./unit":17}]},{},[20,21])(21)
});