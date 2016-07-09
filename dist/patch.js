"use strict";
const state_1 = require('./state');
;
var Patch;
(function (Patch) {
    function apply(state, patch) {
        return state_1.default.splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
    function add(value, key, position = { prev: null }) {
        return { added: state_1.default.unit(value, key), range: [position, position] };
    }
    Patch.add = add;
    function set(value, key) {
        return { added: state_1.default.unit(value, key), range: [{ prev: key }, { next: key }] };
    }
    Patch.set = set;
    function push(value, key) {
        return add(value, key, { prev: null });
    }
    Patch.push = push;
    function unshift(value, key) {
        return add(value, key, { next: null });
    }
    Patch.unshift = unshift;
    function remove(key) {
        return { range: [{ prev: key }, { next: key }] };
    }
    Patch.remove = remove;
})(Patch = exports.Patch || (exports.Patch = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Patch;
//# sourceMappingURL=patch.js.map