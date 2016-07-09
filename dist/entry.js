"use strict";
var Entry;
(function (Entry) {
    function key(entry) {
        return entry && entry[0];
    }
    Entry.key = key;
    function value(entry) {
        return entry[1];
    }
    Entry.value = value;
    function is(entry, other) {
        return entry[0] === other[0] && entry[1] === other[1];
    }
    Entry.is = is;
})(Entry = exports.Entry || (exports.Entry = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Entry;
//# sourceMappingURL=entry.js.map