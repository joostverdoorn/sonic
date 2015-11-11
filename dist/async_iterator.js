import Key from './key';
export var AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.sentinel = { done: true };
    AsyncIterator.Empty = {
        next: () => Promise.resolve(AsyncIterator.sentinel)
    };
    function every(iterator, predicate) {
        function loop() {
            return iterator.next().then(result => result.done ? true : Promise.resolve(predicate(result.value)).then(satisfied => satisfied ? loop() : false));
        }
        return loop();
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return every(iterator, value => Promise.resolve(predicate(value)).then(result => !result)).then(result => !result);
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return every(iterator, (value) => Promise.resolve(fn(value)).then(() => true)).then(() => { });
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return forEach(iterator, (value) => Promise.resolve(fn(memo, value)).then(value => { memo = value; })).then(() => memo);
    }
    AsyncIterator.reduce = reduce;
    function find(iterator, predicate) {
        var result;
        return some(iterator, value => Promise.resolve(predicate(value)).then(satisfied => satisfied ? (result = value, true) : false)).then(satisfied => satisfied ? result : Key.NOT_FOUND);
    }
    AsyncIterator.find = find;
    function indexOf(iterator, value) {
        var index = -1;
        return some(iterator, v => (index++, value == v)).then(found => found ? index : Key.NOT_FOUND);
    }
    AsyncIterator.indexOf = indexOf;
    function at(iterator, index) {
        return find(iterator, () => 0 === index--);
    }
    AsyncIterator.at = at;
    function contains(iterator, value) {
        return some(iterator, v => v === value);
    }
    AsyncIterator.contains = contains;
    function is(iterator, other, equals = (a, b) => a === b) {
        return AsyncIterator.every(iterator, value => {
            return other.next().then(result => !result.done && equals(result.value, value));
        }).then(res => res ? other.next().then(result => result.done) : false);
    }
    AsyncIterator.is = is;
    function map(iterator, mapFn) {
        return {
            next: () => iterator.next().then(result => {
                return result.done ? Promise.resolve(AsyncIterator.sentinel) : Promise.resolve(mapFn(result.value)).then(value => ({ done: false, value }));
            })
        };
    }
    AsyncIterator.map = map;
    function filter(iterator, filterFn) {
        function next() {
            return iterator.next().then(result => result.done ? result : Promise.resolve(filterFn(result.value)).then(satisfied => satisfied ? result : next()));
        }
        return { next };
    }
    AsyncIterator.filter = filter;
    function scan(iterator, scanFn, memo) {
        return {
            next: () => iterator.next().then(result => {
                return result.done ? Promise.resolve(AsyncIterator.sentinel) : Promise.resolve(scanFn(memo, result.value)).then(value => ({ done: false, value: memo = value }));
            })
        };
    }
    AsyncIterator.scan = scan;
    function zip(iterator, other) {
        return {
            next: () => Promise.all([iterator.next(), other.next()]).then(([result, otherResult]) => {
                if (result.done || otherResult.done)
                    return AsyncIterator.sentinel;
                return { done: false, value: [result.value, otherResult.value] };
            })
        };
    }
    AsyncIterator.zip = zip;
    function take(iterator, count) {
        var i = 0;
        return {
            next: () => ++i > count ? Promise.resolve(AsyncIterator.sentinel) : iterator.next()
        };
    }
    AsyncIterator.take = take;
    function skip(iterator, count) {
        var i = 0;
        function next() {
            return i++ < count ? iterator.next().then(next) : iterator.next();
        }
        return { next };
    }
    AsyncIterator.skip = skip;
    function concat(...iterators) {
        return iterators.reduce((memo, value) => {
            var iterated = false, queue = Promise.resolve(null);
            return {
                next: () => queue = queue.then(() => { }, () => { }).then(() => iterated ? value.next() : memo.next().then(result => result.done ? (iterated = true, value.next()) : result))
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromArray(array) {
        var current = -1, queue = Promise.resolve(null);
        return {
            next: () => queue = queue.then(() => { }, () => { }).then(() => Promise.resolve(++current >= array.length ? AsyncIterator.sentinel : { done: false, value: array[current] }))
        };
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromArray(Object.keys(object).map(key => [key, object[key]]));
    }
    AsyncIterator.fromObject = fromObject;
    function toArray(iterator) {
        return reduce(iterator, (memo, value) => (memo.push(value), memo), []);
    }
    AsyncIterator.toArray = toArray;
    function toObject(iterator) {
        return reduce(iterator, (memo, [key, value]) => (memo[key] = value, memo), Object.create(null));
    }
    AsyncIterator.toObject = toObject;
})(AsyncIterator || (AsyncIterator = {}));
export default AsyncIterator;

//# sourceMappingURL=async_iterator.js.map
