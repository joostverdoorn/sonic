import State from './state';
;
export var Patch;
(function (Patch) {
    function apply(patch, state) {
        return State.splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
})(Patch || (Patch = {}));
export default Patch;
