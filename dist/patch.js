;
;
;
export var Patch;
(function (Patch) {
    Patch.SET = "set";
    Patch.DELETE = "delete";
    function setPatch(key, value, before) {
        return {
            operation: Patch.SET,
            key: key,
            value: value,
            before: before
        };
    }
    Patch.setPatch = setPatch;
    function deletePatch(key) {
        return {
            operation: Patch.DELETE,
            key: key
        };
    }
    Patch.deletePatch = deletePatch;
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
