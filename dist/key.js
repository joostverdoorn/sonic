import PromiseUtils from './promise_utils';
var Key;
(function (Key) {
    Key.NOT_FOUND_ERROR = new Error("No entry at the specified key");
    Key.NOT_FOUND = PromiseUtils.lazy((resolve, reject) => reject(Key.NOT_FOUND_ERROR));
    Key.sentinel = null;
    var uniqueKey = 0;
    function key(key) {
        return key.toString();
    }
    Key.key = key;
    function create() {
        return "s_" + uniqueKey++;
    }
    Key.create = create;
})(Key || (Key = {}));
export default Key;
//# sourceMappingURL=key.js.map