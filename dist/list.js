var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_1 = require('./observable');
var List = (function (_super) {
    __extends(List, _super);
    function List(source) {
        _super.call(this);
        this._source = source;
    }
    List.prototype.has = function (id) { return this._source.has(id); };
    List.prototype.get = function (id) { return this._source.get(id); };
    List.prototype.prev = function (id) { return this._source.prev(id); };
    List.prototype.next = function (id) { return this._source.next(id); };
    List.prototype._invalidate = function (prev, next) {
        if (!this.has(prev))
            prev = null;
        if (!this.has(next))
            next = null;
        _super.prototype._invalidate.call(this, prev, next);
    };
    return List;
})(observable_1.default);
exports.List = List;
var List;
(function (List) {
    function isList(obj) {
        return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    }
    List.isList = isList;
    function create(list) {
        return new List(list);
    }
    List.create = create;
    function forEach(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            fn(list.get(id), id);
    }
    List.forEach = forEach;
    function reduce(list, fn, memo) {
        var id;
        while ((id = list.next(id)) != null)
            memo = fn(memo, list.get(id), id);
        return memo;
    }
    List.reduce = reduce;
    function toArray(list) {
        return reduce(list, function (memo, v) { memo.push(v); return memo; }, []);
    }
    List.toArray = toArray;
    function findId(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            if (fn(list.get(id), id))
                return id;
    }
    List.findId = findId;
    function find(list, fn) {
        return list.get(findId(list, fn));
    }
    List.find = find;
    function idOf(list, value) {
        var id;
        return findId(list, function (v) { return v === value; });
    }
    List.idOf = idOf;
    function indexOf(list, value) {
        var id, i = 0;
        while ((id = list.next(id)) != null) {
            if (list.get(id) === value)
                return i;
            i++;
        }
    }
    List.indexOf = indexOf;
    function idAt(list, index) {
        var id, i = 0;
        while ((id = list.next(id)) != null)
            if (i++ == index)
                return id;
        return null;
    }
    List.idAt = idAt;
    function at(list, index) {
        return list.get(idAt(list, index));
    }
    List.at = at;
    function every(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (!predicate(list.get(id), id))
                return false;
        return true;
    }
    List.every = every;
    function some(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (predicate(list.get(id), id))
                return true;
        return false;
    }
    List.some = some;
    function contains(list, value) {
        return some(list, function (v) { return v === value; });
    }
    List.contains = contains;
    function first(list) {
        return list.get(list.next());
    }
    List.first = first;
    function last(list) {
        return list.get(list.prev());
    }
    List.last = last;
    function reverse(list) {
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
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.reverse = reverse;
    function map(list, mapFn) {
        function has(id) {
            return list.has(id);
        }
        function get(id) {
            return mapFn(list.get(id));
        }
        function prev(id) {
            return list.prev(id);
        }
        function next(id) {
            return list.next(id);
        }
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.map = map;
    function filter(list, filterFn) {
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
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.filter = filter;
    function flatten(list) {
        function has(id) {
            if (list.has(id[0]))
                return list.get(id[0]).has(id[1]);
            return false;
        }
        function get(id) {
            if (list.has(id[0]))
                return list.get(id[0]).get(id[1]);
            return;
        }
        function prev(id) {
            if (id == null)
                return [list.prev(), last(list).prev()];
            var prev, listId = id[0];
            if (list.has(listId)) {
                prev = list.get(listId).prev(id[1]);
                if (prev != null)
                    return [listId, prev];
                while ((listId = list.prev(listId)) != null) {
                    if ((prev = list.get(listId).prev()) != null)
                        return [listId, prev];
                }
            }
            return null;
        }
        function next(id) {
            if (id == null)
                return [list.next(), first(list).next()];
            var next, listId = id[0];
            if (list.has(listId)) {
                if ((next = list.get(listId).next(id[1])) != null)
                    return [listId, next];
                while ((listId = list.next(listId)) != null) {
                    if ((next = list.get(listId).next()) != null)
                        return [listId, next];
                }
            }
            return null;
        }
        return create({ has: has, get: get, prev: prev, next: next });
    }
    List.flatten = flatten;
    function flatMap(list, flatMapFn) {
        return flatten(map(list, flatMapFn));
    }
    List.flatMap = flatMap;
})(List = exports.List || (exports.List = {}));
Object.keys(List).forEach(function (key) {
    List.prototype[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        List[key].apply(List, [this].concat(args));
    };
});
exports.default = List;
