"use strict";
const key_1 = require('./key');
var Range;
(function (Range) {
    Range.all = [{ next: key_1.default.SENTINEL }, { prev: key_1.default.SENTINEL }];
    function reverse([from, to]) {
        return [Position.reverse(to), Position.reverse(from)];
    }
    Range.reverse = reverse;
})(Range = exports.Range || (exports.Range = {}));
var Position;
(function (Position) {
    function isPrevPosition(position) {
        return 'prev' in position;
    }
    Position.isPrevPosition = isPrevPosition;
    function isNextPosition(position) {
        return 'next' in position;
    }
    Position.isNextPosition = isNextPosition;
    function reverse(position) {
        return Position.isPrevPosition(position) ? { next: position.prev } : { prev: position.next };
    }
    Position.reverse = reverse;
})(Position = exports.Position || (exports.Position = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Range;
//# sourceMappingURL=range.js.map