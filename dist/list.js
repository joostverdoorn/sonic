var tree_1 = require('./tree');
var cache_1 = require('./cache');
var index_1 = require('./index');
var key_by_1 = require('./key_by');
var List = (function () {
    function List(list) {
        var _this = this;
        this.has = function (key) {
            throw new Error("Not implemented");
        };
        this.get = function (key) {
            throw new Error("Not implemented");
        };
        this.prev = function (key) {
            throw new Error("Not implemented");
        };
        this.next = function (key) {
            throw new Error("Not implemented");
        };
        this.first = function () {
            return List.first(_this);
        };
        this.last = function () {
            return List.last(_this);
        };
        this.forEach = function (fn) {
            return List.forEach(_this, fn);
        };
        this.reduce = function (fn, memo) {
            return List.reduce(_this, fn);
        };
        this.toArray = function () {
            return List.toArray(_this);
        };
        this.findKey = function (fn) {
            return List.findKey(_this, fn);
        };
        this.find = function (fn) {
            return List.find(_this, fn);
        };
        this.keyOf = function (value) {
            return List.keyOf(_this, value);
        };
        this.indexOf = function (value) {
            return List.indexOf(_this, value);
        };
        this.keyAt = function (index) {
            return List.keyAt(_this, index);
        };
        this.at = function (index) {
            return List.at(_this, index);
        };
        this.every = function (predicate) {
            return List.every(_this, predicate);
        };
        this.some = function (predicate) {
            return List.some(_this, predicate);
        };
        this.contains = function (value) {
            return List.contains(_this, value);
        };
        this.reverse = function () {
            return List.create(List.reverse(_this));
        };
        this.map = function (mapFn) {
            return List.create(List.map(_this, mapFn));
        };
        this.filter = function (filterFn) {
            return List.create(List.filter(_this, filterFn));
        };
        this.flatten = function () {
            return List.create(List.flatten(_this));
        };
        this.flatMap = function (flatMapFn) {
            return List.create(List.flatMap(_this, flatMapFn));
        };
        this.cache = function () {
            return List.create(List.cache(_this));
        };
        this.index = function () {
            return List.create(List.index(_this));
        };
        this.keyBy = function (keyFn) {
            return List.create(List.keyBy(_this, keyFn));
        };
        this.zip = function (other, zipFn) {
            return List.create(List.zip(_this, other, zipFn));
        };
        this.skip = function (k) {
            return List.create(List.skip(_this, k));
        };
        this.take = function (n) {
            return List.create(List.take(_this, n));
        };
        this.range = function (k, n) {
            return List.create(List.range(_this, k, n));
        };
        this.scan = function (scanFn, memo) {
            return List.create(List.scan(_this, scanFn, memo));
        };
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }
    ;
    List.isList = function (obj) {
        return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    List.create = function (list) {
        return new List({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next
        });
    };
    List.first = function (list) {
        return list.get(list.next());
    };
    List.last = function (list) {
        return list.get(list.prev());
    };
    List.forEach = function (list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            fn(list.get(key), key);
    };
    List.reduce = function (list, fn, memo) {
        var key;
        while ((key = list.next(key)) != null)
            memo = fn(memo, list.get(key), key);
        return memo;
    };
    List.toArray = function (list) {
        var key, index = 0, array = [];
        while ((key = list.next(key)) != null)
            array[index++] = list.get(key);
        return array;
    };
    List.findKey = function (list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            if (fn(list.get(key), key))
                return key;
    };
    List.find = function (list, fn) {
        return list.get(List.findKey(list, fn));
    };
    List.keyOf = function (list, value) {
        return List.findKey(list, function (v) { return v === value; });
    };
    List.indexOf = function (list, value) {
        var key, i = 0;
        while ((key = list.next(key)) != null) {
            if (list.get(key) === value)
                return i;
            i++;
        }
    };
    List.keyAt = function (list, index) {
        var key, i = 0;
        while ((key = list.next(key)) != null)
            if (i++ == index)
                return key;
        return null;
    };
    List.at = function (list, index) {
        return list.get(List.keyAt(list, index));
    };
    List.every = function (list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (!predicate(list.get(key), key))
                return false;
        return true;
    };
    List.some = function (list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (predicate(list.get(key), key))
                return true;
        return false;
    };
    List.contains = function (list, value) {
        return List.some(list, function (v) { return v === value; });
    };
    List.reverse = function (list) {
        var has = list.has, get = list.get;
        function prev(key) {
            return list.next(key);
        }
        function next(key) {
            return list.prev(key);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(key) {
            return has(key) ? mapFn(list.get(key), key) : undefined;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.filter = function (list, filterFn) {
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
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatten = function (list) {
        function has(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Tree.has(list, path, 1);
        }
        function get(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Tree.get(list, path, 1);
        }
        function prev(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Path.key(tree_1.Tree.prev(list, path, 1));
        }
        function next(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Path.key(tree_1.Tree.next(list, path, 1));
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        return new cache_1.default(list);
    };
    List.index = function (list) {
        return new index_1.default(list);
    };
    List.keyBy = function (list, keyFn) {
        return new key_by_1.default(list, keyFn);
    };
    List.zip = function (list, other, zipFn) {
        list = List.index(list);
        other = List.index(other);
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
        return { has: has, get: get, prev: prev, next: next };
    };
    List.skip = function (list, k) {
        return List.filter(List.index(list), function (value, key) {
            return key >= k;
        });
    };
    List.take = function (list, n) {
        return List.filter(List.index(list), function (value, key) {
            return key < n;
        });
    };
    List.range = function (list, k, n) {
        return List.filter(List.index(list), function (value, key) {
            return key >= k && key < n + k;
        });
    };
    List.scan = function (list, scanFn, memo) {
        var has = list.has, prev = list.prev, next = list.next, scanList;
        function get(key) {
            var prev = scanList.prev(key);
            return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
        }
        scanList = List.cache({ has: has, get: get, prev: prev, next: next });
        return scanList;
    };
    return List;
})();
exports.List = List;
exports.default = List;
