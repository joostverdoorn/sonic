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
    function get(tree, path) {
        var head = Path.get(path, 0), tail = Path.get(path, 1);
        return tree.get(head).then(state => state.get(tail));
    }
    Tree.get = get;
    function prev(state, path = [null, null]) {
        var head = Path.get(path, 0), tail = Path.get(path, 1);
        return null;
    }
    Tree.prev = prev;
    function next(tree, path = [null, null]) {
        var head = Path.get(path, 0), tail = Path.get(path, 1);
        return tree.get(head)
            .then(state => state.next(tail))
            .then(next => {
            if (next != null)
                return [head, next];
            return tree.next(head).then(nextHead => tree.get(nextHead).then(state => state.next().then(first => [nextHead, first])));
        });
    }
    Tree.next = next;
})(Tree || (Tree = {}));
export default Tree;
