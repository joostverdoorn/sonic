var Key;
(function (Key) {
    var uniqueKey = 0;
    Key.SENTINEL = null;
    function unique() {
        return "s_" + uniqueKey++;
    }
    Key.unique = unique;
})(Key || (Key = {}));
export default Key;
//# sourceMappingURL=key.js.map