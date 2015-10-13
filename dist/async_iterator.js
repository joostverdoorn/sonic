import Key from './key';
export var AsyncIterator;
(function (AsyncIterator) {
    function extend(iterator, partial) {
        iterator = Object.create(iterator);
        if ('get' in partial)
            iterator.get = partial.get;
        if ('next' in partial)
            iterator.next = partial.next;
        return iterator;
    }
    AsyncIterator.extend = extend;
    function every(iterator, predicate) {
        function loop() {
            return iterator.next().then(key => key == null || iterator.get().then(value => predicate(value, key)).then(result => result ? loop() : false));
        }
        return loop();
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return every(iterator, (value, key) => Promise.resolve(predicate(value, key)).then(result => !result)).then(result => !result);
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return every(iterator, (value, key) => Promise.resolve(fn(value, key)).then(() => true)).then(() => { });
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return forEach(iterator, (value, key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value; })).then(() => memo);
    }
    AsyncIterator.reduce = reduce;
    function findKey(iterator, predicate) {
        var key;
        return some(iterator, (v, k) => Promise.resolve(predicate(v, k)).then(res => res ? (key = k, true) : false))
            .then(found => found ? key : Key.NOT_FOUND);
    }
    AsyncIterator.findKey = findKey;
    function find(iterator, predicate) {
        return findKey(iterator, predicate).then(iterator.get);
    }
    AsyncIterator.find = find;
    function keyOf(iterator, value) {
        return findKey(iterator, v => v === value);
    }
    AsyncIterator.keyOf = keyOf;
    function indexOf(iterator, value) {
        var index = -1;
        return some(iterator, (v, k) => (index++, value == v)).then(found => found ? index : Key.NOT_FOUND);
    }
    AsyncIterator.indexOf = indexOf;
    function keyAt(iterator, index) {
        return findKey(iterator, () => 0 === index--);
    }
    AsyncIterator.keyAt = keyAt;
    function at(iterator, index) {
        return keyAt(iterator, index).then(iterator.get);
    }
    AsyncIterator.at = at;
    function contains(iterator, value) {
        return some(iterator, v => v === value);
    }
    AsyncIterator.contains = contains;
    function toArray(iterator) {
        return reduce(iterator, (memo, value) => (memo.push(value), memo), []);
    }
    AsyncIterator.toArray = toArray;
    function toObject(iterator) {
        return reduce(iterator, (memo, value, key) => (memo[key] = value, memo), Object.create(null));
    }
    AsyncIterator.toObject = toObject;
})(AsyncIterator || (AsyncIterator = {}));
export default AsyncIterator;
