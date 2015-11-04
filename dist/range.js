import Key from './key';
export var Range;
(function (Range) {
    Range.all = [{ next: Key.sentinel }, { prev: Key.sentinel }];
})(Range || (Range = {}));
export var Position;
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
})(Position || (Position = {}));
export default Range;

//# sourceMappingURL=range.js.map
