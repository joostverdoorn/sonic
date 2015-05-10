var IList;
(function (IList) {
    function isList(obj) {
        return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    }
    IList.isList = isList;
    function create(list) {
        var obj = Object.create(list);
        Object.keys(IList).forEach(function (key) {
            obj[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var res = IList[key].apply(IList, [obj].concat(args));
                if (isList(res)) {
                    return create(res);
                }
                else {
                    return res;
                }
            };
        });
        return obj;
    }
    IList.create = create;
    function forEach(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            fn(list.get(id), id);
    }
    IList.forEach = forEach;
    function reduce(list, fn, memo) {
        var id;
        while ((id = list.next(id)) != null)
            memo = fn(memo, list.get(id), id);
        return memo;
    }
    IList.reduce = reduce;
    function toArray(list) {
        return reduce(list, function (memo, v) { memo.push(v); return memo; }, []);
    }
    IList.toArray = toArray;
    function findId(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            if (fn(list.get(id), id))
                return id;
    }
    IList.findId = findId;
    function find(list, fn) {
        return list.get(findId(list, fn));
    }
    IList.find = find;
    function idOf(list, value) {
        var id;
        return findId(list, function (v) { return v === value; });
    }
    IList.idOf = idOf;
    function indexOf(list, value) {
        var id, i = 0;
        while ((id = list.next(id)) != null) {
            if (list.get(id) === value)
                return i;
            i++;
        }
    }
    IList.indexOf = indexOf;
    function idAt(list, index) {
        var id, i = 0;
        while ((id = list.next(id)) != null)
            if (i++ == index)
                return id;
        return null;
    }
    IList.idAt = idAt;
    function at(list, index) {
        return list.get(idAt(list, index));
    }
    IList.at = at;
    function every(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (!predicate(list.get(id), id))
                return false;
        return true;
    }
    IList.every = every;
    function some(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (predicate(list.get(id), id))
                return true;
        return false;
    }
    IList.some = some;
    function contains(list, value) {
        return some(list, function (v) { return v === value; });
    }
    IList.contains = contains;
    function first(list) {
        return list.get(list.next());
    }
    IList.first = first;
    function last(list) {
        return list.get(list.prev());
    }
    IList.last = last;
    function flatMap(list, flatMapFn) {
        return flatten(map(list, flatMapFn));
    }
    IList.flatMap = flatMap;
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
        return { has: has, get: get, prev: prev, next: next };
    }
    IList.map = map;
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
        return { has: has, get: get, prev: prev, next: next };
    }
    IList.filter = filter;
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
        return { has: has, get: get, prev: prev, next: next };
    }
    IList.flatten = flatten;
})(IList || (IList = {}));
exports.default = IList;
