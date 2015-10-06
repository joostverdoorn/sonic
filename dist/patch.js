export var Operation;
(function (Operation) {
    Operation[Operation["add"] = 0] = "add";
    Operation[Operation["remove"] = 1] = "remove";
    Operation[Operation["replace"] = 2] = "replace";
})(Operation || (Operation = {}));
export var Patch;
(function (Patch) {
    function reverse(patch, original) {
        return Promise.resolve(patch);
    }
    Patch.reverse = reverse;
    function map(patch, mapFn) {
        return Promise.resolve(mapFn(patch.value, patch.key)).then((value) => {
            return { type: patch.type, key: patch.key, value };
        });
    }
    Patch.map = map;
    function filter(patch, filterFn, old) {
        if (patch.type == Operation[Operation.add] && filterFn(patch.value, patch.key))
            return Promise.resolve(patch);
        if (patch.type == Operation[Operation.replace]) {
            if (filterFn(patch.oldValue, patch.key) && (!filterFn(patch.value, patch.key))) {
                return Promise.resolve({ type: Operation[Operation.remove], key: patch.key });
            }
            if ((!filterFn(patch.oldValue, patch.key)) && (filterFn(patch.value, patch.key))) {
                return Promise.resolve({ type: Operation[Operation.add], key: patch.key, value: patch.value });
            }
            if (filterFn(patch.oldValue, patch.key) && filterFn(patch.value, patch.key)) {
                return Promise.resolve(patch);
            }
        }
        if (patch.type == Operation[Operation.remove]) {
            return old.get(patch.key).then(value => filterFn(value, patch.key) ? patch : null);
        }
        return null;
    }
    Patch.filter = filter;
})(Patch || (Patch = {}));
export default Patch;
