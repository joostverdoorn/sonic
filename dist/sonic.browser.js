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
($traceurRuntime.createClass)(AsyncList, {}, {create: function(list) {
    return new $AsyncList(list);
  }});
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
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__factory__,
    $__list__,
    $__observable_95_list__,
    $__mutable_95_list__,
    $__unit__,
    $__array_95_list__,
    $__linked_95_list__,
    $__tree__;
var factory = ($__factory__ = require("./factory"), $__factory__ && $__factory__.__esModule && $__factory__ || {default: $__factory__}).default;
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
  function fromPromise(promise) {
    var unit = new Sonic.Unit();
    promise.then((function(value) {
      unit.push(value);
    }));
    return Sonic.ObservableList.create(unit);
  }
  Sonic.fromPromise = fromPromise;
  function fromIterator(iterator) {}
  Sonic.fromIterator = fromIterator;
})(Sonic || (Sonic = {}));
var $__default = Sonic;

//# sourceURL=/home/joost/Documents/Projects/sonic/dist/sonic.js
},{"./array_list":1,"./factory":4,"./linked_list":8,"./list":9,"./mutable_list":10,"./observable_list":15,"./tree":16,"./unit":17}]},{},[18])(18)
});