;
;
;
export var Patch;
(function (Patch) {
    Patch.SET = "set";
    Patch.DELETE = "delete";
    function isSetPatch(patch) {
        return patch.operation === Patch.SET;
    }
    Patch.isSetPatch = isSetPatch;
    function isDeletePatch(patch) {
        return patch.operation === Patch.DELETE;
    }
    Patch.isDeletePatch = isDeletePatch;
})(Patch || (Patch = {}));
export default Patch;
