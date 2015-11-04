import State from './state';
;
export var Patch;
(function (Patch) {
    function apply(state, patch) {
        return State.splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
})(Patch || (Patch = {}));
export default Patch;

//# sourceMappingURL=patch.js.map
