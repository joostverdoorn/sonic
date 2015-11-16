var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import State from './state';
;
export var Patch;
(function (Patch) {
    function apply(state, patch) {
        return State.splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
    function add(value, key, position = { prev: null }) {
        return { added: State.unit(value, key), range: [position, position] };
    }
    Patch.add = add;
    function set(value, key) {
        return { added: State.unit(value, key), range: [{ prev: key }, { next: key }] };
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
})(Patch || (Patch = {}));
export default Patch;
//# sourceMappingURL=patch.js.map