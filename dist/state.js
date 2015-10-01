import StateIterator from './state_iterator';
export var State;
(function (State) {
    function reverse(list) {
        var { get, next: prev, prev: next } = list;
        return { get, prev, next };
    }
    State.reverse = reverse;
    function map(list, mapFn) {
        var { prev, next } = list;
        function get(key) {
            return list.get(key).then(value => mapFn(value, key));
        }
        return { get, prev, next };
    }
    State.map = map;
    function filter(list, filterFn) {
        function get(key) {
            return list.get(key).then(value => {
                if (filterFn(value))
                    return value;
                throw new Error();
            });
        }
        function prev(key) {
            return StateIterator.findKey(State.reverse(list), filterFn, [key, null]);
        }
        function next(key) {
            return StateIterator.findKey(list, filterFn, [key, null]);
        }
        return { get, prev, next };
    }
    State.filter = filter;
})(State || (State = {}));
export default State;
