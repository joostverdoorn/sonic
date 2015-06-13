import { List } from './list';
;
export var Path;
(function (Path) {
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
export var Tree;
(function (Tree) {
    function has(list, path, depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path);
        return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth));
    }
    Tree.has = has;
    function get(list, path, depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path);
        if (!list.has(head))
            return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0)
            return value;
        return Tree.get(value, tail, depth);
    }
    Tree.get = get;
    function prev(list, path = [], depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path), key = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(key);
            if (!List.isList(value) || depth == 0) {
                if (key != null && key != head)
                    return [key];
            }
            else {
                var prevPath = Tree.prev(value, tail, depth - 1);
                if (prevPath != null)
                    return Path.append(key, prevPath);
                tail = [];
            }
        } while ((key = list.prev(key)) != null);
    }
    Tree.prev = prev;
    function next(list, path = [], depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path), key = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(key);
            if (!List.isList(value) || depth == 0) {
                if (key != null && key != head)
                    return [key];
            }
            else {
                var nextPath = Tree.next(value, tail, depth - 1);
                if (nextPath != null)
                    return Path.append(key, nextPath);
                tail = [];
            }
        } while ((key = list.next(key)) != null);
    }
    Tree.next = next;
})(Tree || (Tree = {}));
export default Tree;
