import Key from './key';
export var Range;
(function (Range) {
    Range.all = [Key.None, Key.None];
    function from(key) {
        return [key, Key.None];
    }
    Range.from = from;
    function to(key) {
        return [Key.None, key];
    }
    Range.to = to;
    function between(a, b) {
        return [a, b];
    }
    Range.between = between;
})(Range || (Range = {}));
export default Range;
