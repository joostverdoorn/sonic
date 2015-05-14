var tree_1 = require('./tree');
var List = (function () {
    function List(list) {
        var _this = this;
        this.has = function (id) {
            throw new Error("Not implemented");
        };
        this.get = function (id) {
            throw new Error("Not implemented");
        };
        this.prev = function (id) {
            throw new Error("Not implemented");
        };
        this.next = function (id) {
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
        this.findId = function (fn) {
            return List.findId(_this, fn);
        };
        this.find = function (fn) {
            return List.find(_this, fn);
        };
        this.idOf = function (value) {
            return List.idOf(_this, value);
        };
        this.indexOf = function (value) {
            return List.indexOf(_this, value);
        };
        this.idAt = function (index) {
            return List.idAt(_this, index);
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
        var id;
        while ((id = list.next(id)) != null)
            fn(list.get(id), id);
    };
    List.reduce = function (list, fn, memo) {
        var id;
        while ((id = list.next(id)) != null)
            memo = fn(memo, list.get(id), id);
        return memo;
    };
    List.toArray = function (list) {
        return List.reduce(list, function (memo, v) { memo.push(v); return memo; }, []);
    };
    List.findId = function (list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            if (fn(list.get(id), id))
                return id;
    };
    List.find = function (list, fn) {
        return list.get(List.findId(list, fn));
    };
    List.idOf = function (list, value) {
        return List.findId(list, function (v) { return v === value; });
    };
    List.indexOf = function (list, value) {
        var id, i = 0;
        while ((id = list.next(id)) != null) {
            if (list.get(id) === value)
                return i;
            i++;
        }
    };
    List.idAt = function (list, index) {
        var id, i = 0;
        while ((id = list.next(id)) != null)
            if (i++ == index)
                return id;
        return null;
    };
    List.at = function (list, index) {
        return list.get(List.idAt(list, index));
    };
    List.every = function (list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (!predicate(list.get(id), id))
                return false;
        return true;
    };
    List.some = function (list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (predicate(list.get(id), id))
                return true;
        return false;
    };
    List.contains = function (list, value) {
        return List.some(list, function (v) { return v === value; });
    };
    List.reverse = function (list) {
        var has = list.has, get = list.get;
        function prev(id) {
            return list.next(id);
        }
        function next(id) {
            return list.prev(id);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(id) {
            return has(id) ? mapFn(list.get(id), id) : undefined;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.filter = function (list, filterFn) {
        function has(id) {
            return list.has(id) && filterFn(list.get(id), id);
        }
        function get(id) {
            if (has(id))
                return list.get(id);
            return;
        }
        function prev(id) {
            var prev = id;
            while ((prev = list.prev(prev)) != null)
                if (has(prev))
                    return prev;
            return null;
        }
        function next(id) {
            var next = id;
            while ((next = list.next(next)) != null)
                if (has(next))
                    return next;
            return null;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatten = function (list) {
        function has(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Tree.has(list, path, 1);
        }
        function get(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Tree.get(list, path, 1);
        }
        function prev(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Path.id(tree_1.Tree.prev(list, path, 1));
        }
        function next(id) {
            var path = tree_1.Path.create(id);
            return tree_1.Path.id(tree_1.Tree.next(list, path, 1));
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        var valueCache = Object.create(null), nextCache = Object.create(null), prevCache = Object.create(null);
        function has(id) {
            return id in valueCache || list.has(id);
        }
        function get(id) {
            if (id in valueCache)
                return valueCache[id];
            if (list.has(id))
                return valueCache[id] = list.get(id);
            return;
        }
        function prev(id) {
            if (id == null)
                return list.prev();
            if (id in prevCache)
                return prevCache[id];
            var prevId = list.prev(id);
            if (prevId != null) {
                prevCache[id] = prevId;
                nextCache[prevId] = id;
            }
            return prevId;
        }
        function next(id) {
            if (id == null)
                return list.next();
            if (id in nextCache)
                return nextCache[id];
            var nextId = list.next(id);
            if (nextId != null) {
                nextCache[id] = nextId;
                prevCache[nextId] = id;
            }
            return nextId;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    return List;
})();
exports.List = List;
exports.default = List;
