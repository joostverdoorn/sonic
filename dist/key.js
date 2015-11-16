var Key;
(function (Key) {
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