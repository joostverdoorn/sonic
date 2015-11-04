import Key from './key';
export var AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.Empty = {
        get: () => Key.NOT_FOUND,
        next: () => Promise.resolve(Key.sentinel)
    };
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
            return iterator.next().then(key => key === Key.sentinel || iterator.get().then(value => predicate(value, key)).then(result => result ? loop() : false));
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
            .then(found => found ? key : Key.sentinel);
    }
    AsyncIterator.findKey = findKey;
    function find(iterator, predicate) {
        return findKey(iterator, predicate).then(key => key === Key.sentinel ? Key.NOT_FOUND : iterator.get());
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
    function concat(...iterators) {
        return iterators.reduce((memo, value) => {
            var iterated = false, queue = Promise.resolve(null);
            return {
                get: () => queue.then(() => iterated ? value.get() : memo.get()),
                next: () => queue.then(() => iterated ? value.next() : memo.next().then(key => key !== Key.sentinel ? key : (iterated = true, value.next())))
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromEntries(entries) {
        var current = -1, queue = Promise.resolve(null);
        return {
            get: () => queue = queue.then(() => current < 0 || current >= entries.length ? Key.NOT_FOUND : Promise.resolve(entries[current][1])),
            next: () => queue = queue.then(() => Promise.resolve(++current >= entries.length ? Key.sentinel : entries[current][0]))
        };
    }
    AsyncIterator.fromEntries = fromEntries;
    function fromArray(array) {
        return fromEntries(array.map((value, key) => [key, value]));
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromEntries(Object.keys(object).map(key => [key, object[key]]));
    }
    AsyncIterator.fromObject = fromObject;
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

//# sourceMappingURL=async_iterator.js.map
