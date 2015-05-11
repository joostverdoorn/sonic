var List = (function () {
    function List() {
        var _this = this;
        this.forEach = function (fn) { return List.forEach(_this, fn); };
        this.reduce = function (fn, memo) { return List.reduce(_this, fn); };
        this.toArray = function () { return List.toArray(_this); };
        this.findId = function (fn) { return List.findId(_this, fn); };
        this.find = function (fn) { return List.find(_this, fn); };
        this.idOf = function (value) { return List.idOf(_this, value); };
        this.indexOf = function (value) { return List.indexOf(_this, value); };
        this.idAt = function (index) { return List.idAt(_this, index); };
        this.at = function (index) { return List.at(_this, index); };
        this.every = function (predicate) { return List.every(_this, predicate); };
        this.some = function (predicate) { return List.some(_this, predicate); };
        this.contains = function (value) { return List.contains(_this, value); };
        this.first = function () { return List.first(_this); };
        this.last = function () { return List.last(_this); };
        this.reverse = function () { return List.reverse(_this); };
        this.map = function (mapFn) { return List.map(_this, mapFn); };
        this.filter = function (filterFn) { return List.filter(_this, filterFn); };
        this.flatten = function () { return List.flatten(_this); };
        this.flatMap = function (flatMapFn) { return List.flatMap(_this, flatMapFn); };
    }
    List.isList = function (obj) {
        return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    ;
    List.create = function (list) {
        var obj = {
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next
        };
        List.call(obj);
        return obj;
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
    List.first = function (list) {
        return list.get(list.next());
    };
    List.last = function (list) {
        return list.get(list.prev());
    };
    List.reverse = function (list) {
        function has(id) {
            return list.has(id);
        }
        function get(id) {
            return list.get(id);
        }
        function prev(id) {
            return list.next(id);
        }
        function next(id) {
            return list.prev(id);
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(id) {
            return mapFn(list.get(id));
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.filter = function (list, filterFn) {
        function has(id) {
            return list.has(id) && filterFn(list.get(id));
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
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.flatten = function (list) {
        function has(id) {
            if (list.has(id[0]))
                return (list.get(id[0])).has(id[1]);
            return false;
        }
        function get(id) {
            if (list.has(id[0]))
                return (list.get(id[0])).get(id[1]);
            return;
        }
        function prev(id) {
            if (id == null)
                return [].concat(list.prev()).concat((List.last(list)).prev());
            var prev, listId = id[0];
            if (list.has(listId)) {
                prev = (list.get(listId)).prev(id[1]);
                if (prev != null)
                    return [listId, prev];
                while ((listId = list.prev(listId)) != null) {
                    if ((prev = (list.get(listId)).prev()) != null)
                        return [listId, prev];
                }
            }
            return null;
        }
        function next(id) {
            if (id == null)
                return [].concat(list.next()).concat((List.first(list)).next());
            var next, listId = id[0];
            if (list.has(listId)) {
                if ((next = (list.get(listId)).next(id[1])) != null)
                    return [listId, next];
                while ((listId = list.next(listId)) != null) {
                    if ((next = (list.get(listId)).next()) != null)
                        return [listId, next];
                }
            }
            return null;
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        var _get = Object.create(null), _next = Object.create(null), _prev = Object.create(null);
        function has(id) {
            if (id == null)
                return null;
            return id.toString() in _get || list.has(id);
        }
        function get(id) {
            if (!has(id))
                return null;
            var idString = id.toString(), res = _get[idString];
            if (res == null) {
                res = _get[idString] = list.get(id);
            }
            return res;
        }
        function prev(id) {
            if (!has(id))
                res = list.prev();
            else {
                var idString = id.toString(), res = _prev[idString];
                if (res == null) {
                    res = _prev[idString] = list.prev(id);
                }
            }
            return res;
        }
        function next(id) {
            if (!has(id))
                res = list.next();
            else {
                var idString = id.toString(), res = _next[idString];
                if (res == null) {
                    res = _next[idString] = list.next(id);
                }
            }
            return res;
        }
        return List.create({ has: has, get: get, prev: prev, next: next });
    };
    return List;
})();
exports.List = List;
exports.default = List;
