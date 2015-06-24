import { List } from './list';
;
export var Path;
(function (Path) {
    function key(path) {
        return JSON.stringify(path);
    }
    Path.key = key;
    function fromKey(key) {
        return key == null ? null : JSON.parse(key.toString());
    }
    Path.fromKey = fromKey;
    function toKey(path) {
        return path == null ? null : JSON.stringify(path);
    }
    Path.toKey = toKey;
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
    function get(list, path, depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path);
        return list.get(head).then(value => {
            if (tail.length == 0 || depth == 0)
                return value;
            return Tree.get(value, tail, depth);
        });
    }
    Tree.get = get;
    function prev(list, path = [], depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path);
        if ((head == null || !tail.length) && depth > 0) {
            return list.prev(head).then(key => {
                if (key == null)
                    return null;
                return list.get(key).then(value => {
                    if (List.isList(value))
                        return Tree.prev(value, null, depth - 1).then(prev => {
                            return prev == null ? null : Path.append(key, prev);
                        });
                    return [key];
                });
            });
        }
        if (tail.length && depth > 0) {
            return list.get(head)
                .then(list => Tree.prev(list, tail, depth - 1))
                .then(prev => {
                if (prev != null)
                    return Path.append(head, prev);
                return list.prev(head).then(prev => {
                    return prev == null ? null : list.get(prev).then(list => Tree.prev(list, null, depth - 1)).then(tail => Path.append(prev, tail));
                });
            });
        }
        return list.prev(head).then(prev => prev != null ? [prev] : null);
    }
    Tree.prev = prev;
    function next(list, path = [], depth = Infinity) {
        var head = Path.head(path), tail = Path.tail(path);
        if ((head == null || !tail.length) && depth > 0) {
            return list.next(head).then(key => {
                if (key == null)
                    return null;
                return list.get(key).then(value => {
                    if (List.isList(value))
                        return Tree.next(value, null, depth - 1).then(next => {
                            return next == null ? null : Path.append(key, next);
                        });
                    return [key];
                });
            });
        }
        if (tail.length && depth > 0) {
            return list.get(head)
                .then(list => Tree.next(list, tail, depth - 1))
                .then(next => {
                if (next != null)
                    return Path.append(head, next);
                return list.next(head).then(next => {
                    return next == null ? null : list.get(next).then(list => Tree.next(list, null, depth - 1)).then(tail => Path.append(next, tail));
                });
            });
        }
        return list.next(head).then(next => next != null ? [next] : null);
    }
    Tree.next = next;
})(Tree || (Tree = {}));
export default Tree;
