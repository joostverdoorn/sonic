export var Range;
(function (Range) {
    function prev(list, range = [null, null]) {
        if (Array.isArray(range))
            return Promise.resolve(range[0]);
        else
            return list.prev(range);
    }
    Range.prev = prev;
    function next(list, range = [null, null]) {
        if (Array.isArray(range))
            return Promise.resolve(range[1]);
        else
            return list.next(range);
    }
    Range.next = next;
    function first(list, range = [null, null]) {
        if (Array.isArray(range))
            return list.next(range[0]);
        return Promise.resolve(range);
    }
    Range.first = first;
    function last(list, range = [null, null]) {
        if (Array.isArray(range))
            return list.prev(range[1]);
        return Promise.resolve(range);
    }
    Range.last = last;
})(Range || (Range = {}));
export default Range;
