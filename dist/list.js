export function isList(obj) {
    return !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
}
export var utilities;
(function (utilities) {
    function forEach(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            fn(list.get(id), id);
    }
    utilities.forEach = forEach;
    function reduce(list, fn, memo) {
        var id;
        while ((id = list.next(id)) != null)
            memo = fn(memo, list.get(id), id);
        return memo;
    }
    utilities.reduce = reduce;
    function findId(list, fn) {
        var id;
        while ((id = list.next(id)) != null)
            if (fn(list.get(id), id))
                return id;
    }
    utilities.findId = findId;
    function find(list, fn) {
        return list.get(findId(list, fn));
    }
    utilities.find = find;
    function idOf(list, value) {
        var id;
        return findId(list, v => v === value);
    }
    utilities.idOf = idOf;
    function indexOf(list, value) {
        var id, i = 0;
        while ((id = list.next(id)) != null) {
            if (list.get(id) === value)
                return i;
            i++;
        }
    }
    utilities.indexOf = indexOf;
    function idAt(list, index) {
        var id, i = 0;
        while ((id = list.next(id)) != null)
            if (i++ == index)
                return id;
        return null;
    }
    utilities.idAt = idAt;
    function at(list, index) {
        return list.get(idAt(list, index));
    }
    utilities.at = at;
    function every(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (!predicate(list.get(id), id))
                return false;
        return true;
    }
    utilities.every = every;
    function some(list, predicate) {
        var id;
        while ((id = list.next(id)) != null)
            if (predicate(list.get(id), id))
                return true;
        return false;
    }
    utilities.some = some;
    function contains(list, value) {
        return some(list, v => v === value);
    }
    utilities.contains = contains;
    function first(list) {
        return list.get(list.next());
    }
    utilities.first = first;
    function last(list) {
        return list.get(list.prev());
    }
    utilities.last = last;
    function flatMap(list, getFn) {
        return null;
    }
    utilities.flatMap = flatMap;
    function map(list, getFn) {
        return null;
    }
    utilities.map = map;
})(utilities || (utilities = {}));
