var id_1 = require('./id');
var List = (function () {
    function List(list) {
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.prev;
        }
    }
    ;
    List.prototype.has = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.get = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.prev = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.next = function (id) {
        throw new Error("Not implemented");
    };
    List.prototype.first = function () {
        return List.first(this);
    };
    List.prototype.last = function () {
        return List.last(this);
    };
    List.prototype.forEach = function (fn) {
        return List.forEach(this, fn);
    };
    List.prototype.reduce = function (fn, memo) {
        return List.reduce(this, fn);
    };
    List.prototype.toArray = function () {
        return List.toArray(this);
    };
    List.prototype.findId = function (fn) {
        return List.findId(this, fn);
    };
    List.prototype.find = function (fn) {
        return List.find(this, fn);
    };
    List.prototype.idOf = function (value) {
        return List.idOf(this, value);
    };
    List.prototype.indexOf = function (value) {
        return List.indexOf(this, value);
    };
    List.prototype.idAt = function (index) {
        return List.idAt(this, index);
    };
    List.prototype.at = function (index) {
        return List.at(this, index);
    };
    List.prototype.every = function (predicate) {
        return List.every(this, predicate);
    };
    List.prototype.some = function (predicate) {
        return List.some(this, predicate);
    };
    List.prototype.contains = function (value) {
        return List.contains(this, value);
    };
    List.prototype.reverse = function () {
        return List.create(List.reverse(this));
    };
    List.prototype.map = function (mapFn) {
        return List.create(List.map(this, mapFn));
    };
    List.prototype.filter = function (filterFn) {
        return List.create(List.filter(this, filterFn));
    };
    List.prototype.flatten = function () {
        return List.create(List.flatten(this));
    };
    List.prototype.flatMap = function (flatMapFn) {
        return List.create(List.flatMap(this, flatMapFn));
    };
    List.prototype.cache = function () {
        return List.create(List.cache(this));
    };
    List.isList = function (obj) {
        return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    List.create = function (list) {
        return new List({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list)
        });
    };
    List.has = function (list, id, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = id_1.default.head(id), tail = id_1.default.tail(id);
        return list.has(head) && (tail.length == 0 || depth == 0 || List.has(list.get(head), tail, depth));
    };
    List.get = function (list, id, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = id_1.default.head(id), tail = id_1.default.tail(id);
        if (!list.has(head))
            return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0)
            return value;
        return List.get(value, tail, depth);
    };
    List.next = function (list, id, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = id_1.default.head(id), tail = id_1.default.tail(id), value;
        if (head != null && !list.has(head))
            return;
        if (depth == 0)
            return list.next(head);
        if (head == null) {
            var first = list.next();
            return;
        }
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
            return mapFn(list.get(id), id);
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
    // static // flatten<V>(list: IList<IList<V>>): IList<V>;
    List.flatten = function (list) {
        function has(id) {
            var head = id_1.default.head(id), scnd = id_1.default.get(id, 1);
            return list.has(head) && list.get(head).has(scnd);
        }
        function get(id) {
            var head = id_1.default.head(id), scnd = id_1.default.get(id, 1);
            return list.has(head) ? list.get(head).get(scnd) : undefined;
        }
        function prev(id) {
            var head = id_1.default.head(id), scnd = id_1.default.get(id, 1);
            if (head == null) {
                head = list.prev();
            }
            else if (!list.has(head))
                return;
            scnd = list.get(head).prev(scnd);
            while (scnd == null) {
                head = list.prev(head);
                scnd = list.get(head).prev();
            }
            return id_1.default.append(head, scnd);
            //
            //
            // head = Id.head(id),
            // scnd = Id.get(id, 1);
            //
            // // var prev: Id, listId = id[0];
            //
            //
            //
            // if(list.has(head)) {
            //
            //
            //   while(scnd == null) {
            //     head = list.prev(head);
            //     scnd = list.get(head).prev()
            //   }
            //
            //   return Id.append(head, scnd);
            // }
            //
            // return null;
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
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        var valueCache = Object.create(null), nextCache = Object.create(null), prevCache = Object.create(null);
        function has(id) {
            return id_1.default.key(id) in valueCache || list.has(id);
        }
        function get(id) {
            var key = id_1.default.key(id);
            if (key in valueCache)
                return valueCache[key];
            if (list.has(id))
                return valueCache[key] = list.get(id);
            return;
        }
        function prev(id) {
            if (id == null)
                return list.prev();
            var key = id_1.default.key(id);
            if (key in prevCache)
                return prevCache[key];
            return prevCache[key] = list.prev(id);
        }
        function next(id) {
            if (id == null)
                return list.prev();
            var key = id_1.default.key(id);
            if (key in prevCache)
                return prevCache[key];
            return prevCache[key] = list.prev(id);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    return List;
})();
exports.List = List;
exports.default = List;
