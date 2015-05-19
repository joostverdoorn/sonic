var list_1 = require('./list');
;
var Path;
(function (Path) {
    function id(path) {
        return JSON.stringify(path);
    }
    Path.id = id;
    function create(id) {
        return id == null ? null : JSON.parse(id.toString());
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
})(Path = exports.Path || (exports.Path = {}));
var Tree;
(function (Tree) {
    function has(list, path, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path);
        return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth));
    }
    Tree.has = has;
    function get(list, path, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path);
        if (!list.has(head))
            return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0)
            return value;
        return Tree.get(value, tail, depth);
    }
    Tree.get = get;
    function prev(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), id = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(id);
            if (!list_1.List.isList(value) || depth == 0) {
                if (id != null && id != head)
                    return [id];
            }
            else {
                var prevPath = Tree.prev(value, tail, depth - 1);
                if (prevPath != null)
                    return Path.append(id, prevPath);
                tail = [];
            }
        } while ((id = list.prev(id)) != null);
    }
    Tree.prev = prev;
    function next(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), id = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(id);
            if (!list_1.List.isList(value) || depth == 0) {
                if (id != null && id != head)
                    return [id];
            }
            else {
                var nextPath = Tree.next(value, tail, depth - 1);
                if (nextPath != null)
                    return Path.append(id, nextPath);
                tail = [];
            }
        } while ((id = list.next(id)) != null);
    }
    Tree.next = next;
})(Tree = exports.Tree || (exports.Tree = {}));
exports.default = Tree;
