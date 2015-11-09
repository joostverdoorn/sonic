import State from './state';
export var Path;
(function (Path) {
    function key(path) {
        return path == null ? null : JSON.stringify(path);
    }
    Path.key = key;
    function fromKey(key) {
        return key == null ? null : key.toString().split('/');
    }
    Path.fromKey = fromKey;
    function toKey(path) {
        return path == null ? null : path.join('/');
    }
    Path.toKey = toKey;
    function head(path) {
        return path ? path[0] : null;
    }
    Path.head = head;
    function get(path, index) {
        return path ? path[index] : null;
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
    function get(tree, path) {
        var head = Path.get(path, 0), tail = Path.get(path, 1);
        return tree.get(head).then(state => state.get(tail));
    }
    Tree.get = get;
    function prev(tree, path) {
        var head = Path.get(path, 0), tail = Path.get(path, 1), prevs = State.filter(State.map(tree, state => state.prev()), first => first != null), paths = State.map(prevs, (first, key) => [key, first]);
        if (head == null)
            return paths.prev().then(prev => prev != null ? paths.get(prev) : null);
        return tree.get(head)
            .then(state => state.prev(tail))
            .then(prev => prev != null ? [head, prev] : paths.prev(head).then(prev => prev != null ? paths.get(prev) : null));
    }
    Tree.prev = prev;
    function next(tree, path) {
        var head = Path.get(path, 0), tail = Path.get(path, 1), nexts = State.filter(State.map(tree, state => state.next()), first => first != null), paths = State.map(nexts, (first, key) => [key, first]);
        if (head == null)
            return paths.next().then(next => next != null ? paths.get(next) : null);
        return tree.get(head)
            .then(state => state.next(tail))
            .then(next => next != null ? [head, next] : paths.next(head).then(next => next != null ? paths.get(next) : null));
    }
    Tree.next = next;
})(Tree || (Tree = {}));
export default Tree;

//# sourceMappingURL=tree.js.map
