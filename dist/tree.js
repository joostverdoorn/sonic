"use strict";
const key_1 = require('./key');
const state_1 = require('./state');
var Path;
(function (Path) {
    function head(path) {
        return path ? path[0] : key_1.default.SENTINEL;
    }
    Path.head = head;
    function tail(path) {
        return path ? path[1] : key_1.default.SENTINEL;
    }
    Path.tail = tail;
})(Path = exports.Path || (exports.Path = {}));
var Tree;
(function (Tree) {
    function get(tree, path) {
        var head = Path.head(path), tail = Path.tail(path);
        return tree.get(head).then(state => state.get(tail));
    }
    Tree.get = get;
    function prev(tree, path) {
        var head = Path.head(path), tail = Path.tail(path), prevs = state_1.default.filter(state_1.default.map(tree, state => state.prev()), first => first !== key_1.default.SENTINEL), paths = state_1.default.map(prevs, (first, key) => [key, first]);
        if (head === key_1.default.SENTINEL)
            return paths.prev().then(prev => prev !== key_1.default.SENTINEL ? paths.get(prev) : key_1.default.SENTINEL);
        return tree.get(head)
            .then(state => state.prev(tail))
            .then(prev => prev !== key_1.default.SENTINEL ? [head, prev] : paths.prev(head).then(prev => prev !== key_1.default.SENTINEL ? paths.get(prev) : key_1.default.SENTINEL));
    }
    Tree.prev = prev;
    function next(tree, path) {
        var head = Path.head(path), tail = Path.tail(path), nexts = state_1.default.filter(state_1.default.map(tree, state => state.next()), first => first !== key_1.default.SENTINEL), paths = state_1.default.map(nexts, (first, key) => [key, first]);
        if (head === key_1.default.SENTINEL)
            return paths.next().then(next => next !== key_1.default.SENTINEL ? paths.get(next) : key_1.default.SENTINEL);
        return tree.get(head)
            .then(state => state.next(tail))
            .then(next => next !== key_1.default.SENTINEL ? [head, next] : paths.next(head).then(next => next !== key_1.default.SENTINEL ? paths.get(next) : key_1.default.SENTINEL));
    }
    Tree.next = next;
})(Tree = exports.Tree || (exports.Tree = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
//# sourceMappingURL=tree.js.map