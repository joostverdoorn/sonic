import Key from './key';
import State from './state';
export var Path;
(function (Path) {
    function head(path) {
        return path ? path[0] : Key.SENTINEL;
    }
    Path.head = head;
    function tail(path) {
        return path ? path[1] : Key.SENTINEL;
    }
    Path.tail = tail;
})(Path || (Path = {}));
export var Tree;
(function (Tree) {
    function get(tree, path) {
        var head = Path.head(path), tail = Path.tail(path);
        return tree.get(head).then(state => state.get(tail));
    }
    Tree.get = get;
    function prev(tree, path) {
        var head = Path.head(path), tail = Path.tail(path), prevs = State.filter(State.map(tree, state => state.prev()), first => first !== Key.SENTINEL), paths = State.map(prevs, (first, key) => [key, first]);
        if (head === Key.SENTINEL)
            return paths.prev().then(prev => prev !== Key.SENTINEL ? paths.get(prev) : Key.SENTINEL);
        return tree.get(head)
            .then(state => state.prev(tail))
            .then(prev => prev !== Key.SENTINEL ? [head, prev] : paths.prev(head).then(prev => prev !== Key.SENTINEL ? paths.get(prev) : Key.SENTINEL));
    }
    Tree.prev = prev;
    function next(tree, path) {
        var head = Path.head(path), tail = Path.tail(path), nexts = State.filter(State.map(tree, state => state.next()), first => first !== Key.SENTINEL), paths = State.map(nexts, (first, key) => [key, first]);
        if (head === Key.SENTINEL)
            return paths.next().then(next => next !== Key.SENTINEL ? paths.get(next) : Key.SENTINEL);
        return tree.get(head)
            .then(state => state.next(tail))
            .then(next => next !== Key.SENTINEL ? [head, next] : paths.next(head).then(next => next !== Key.SENTINEL ? paths.get(next) : Key.SENTINEL));
    }
    Tree.next = next;
})(Tree || (Tree = {}));
export default Tree;
//# sourceMappingURL=tree.js.map