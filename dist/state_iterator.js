import State from './state';
export class StateIterator {
    constructor(state, range = [null, null]) {
        this.get = () => {
            return this.state.get(this.current);
        };
        this.prev = () => {
            return this.state.prev(this.current == null ? this.range[1] : this.current).then((prev) => {
                if (prev == this.range[0])
                    return this.current = null;
                return this.current = prev;
            });
        };
        this.next = () => {
            return this.state.next(this.current == null ? this.range[0] : this.current).then((next) => {
                if (next == this.range[1])
                    return this.current = null;
                return this.current = next;
            });
        };
        this.state = state;
        this.range = range;
    }
}
(function (StateIterator) {
    function first(state, range = [null, null]) {
        return state.next(range[0]).then(state.get);
    }
    StateIterator.first = first;
    function last(state, range = [null, null]) {
        return state.prev(range[1]).then(state.get);
    }
    StateIterator.last = last;
    function every(state, predicate, range) {
        var iterator = new StateIterator(state, range);
        function loop() {
            return iterator.next().then(key => key == null || iterator.get().then(value => predicate(value, key)).then(result => result ? loop() : false));
        }
        return loop();
    }
    StateIterator.every = every;
    function some(state, predicate, range) {
        return every(state, (value, key) => Promise.resolve(predicate(value, key)).then(result => !result), range).then(result => !result);
    }
    StateIterator.some = some;
    function forEach(state, fn, range) {
        return every(state, (value, key) => Promise.resolve(fn(value, key)).then(() => true), range).then(() => { });
    }
    StateIterator.forEach = forEach;
    function reduce(state, fn, memo, range) {
        return forEach(state, (value, key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value; }), range).then(() => memo);
    }
    StateIterator.reduce = reduce;
    function toArray(state, range) {
        return reduce(state, (memo, value) => (memo.push(value), memo), [], range);
    }
    StateIterator.toArray = toArray;
    function toObject(state, range) {
        return reduce(state, (memo, value, key) => (memo[key] = value, memo), Object.create(null), range);
    }
    StateIterator.toObject = toObject;
    function findKey(state, predicate, range) {
        var key;
        return some(state, (v, k) => Promise.resolve(predicate(v, k)).then(res => res ? (key = k, true) : false), range)
            .then(found => found ? key : null);
    }
    StateIterator.findKey = findKey;
    function find(state, predicate, range) {
        return findKey(state, predicate, range).then(state.get);
    }
    StateIterator.find = find;
    function keyOf(state, value, range) {
        return findKey(state, v => v === value, range);
    }
    StateIterator.keyOf = keyOf;
    function indexOf(state, value, range) {
        var index = -1;
        return some(state, (v, k) => (index++, value == v), range).then((found) => { if (found) {
            return index;
        }
        else
            State.NOT_FOUND; });
    }
    StateIterator.indexOf = indexOf;
    function keyAt(state, index, range) {
        return findKey(state, () => 0 === index--, range);
    }
    StateIterator.keyAt = keyAt;
    function at(state, index, range) {
        return keyAt(state, index, range).then(state.get);
    }
    StateIterator.at = at;
    function contains(state, value, range) {
        return some(state, v => v === value, range);
    }
    StateIterator.contains = contains;
})(StateIterator || (StateIterator = {}));
export default StateIterator;
