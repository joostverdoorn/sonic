import bind from './bind';
import Range from './range';
import { Tree, Path } from './tree';
import Cache from './cache';
import Index from './index';
export class List {
    static create(list) {
        return new class class_1 extends List {
            get(key) { return list.get(key); }
            prev(key) { return list.prev(key); }
            next(key) { return list.next(key); }
        }
        ;
    }
    first() {
        return List.first(this);
    }
    last() {
        return List.last(this);
    }
    every(predicate) {
        return List.every(this, predicate);
    }
    some(predicate) {
        return List.some(this, predicate);
    }
    forEach(fn, range) {
        return List.forEach(this, fn, range);
    }
    reduce(fn, memo, range) {
        return List.reduce(this, fn, memo, range);
    }
    toArray(range) {
        return List.toArray(this, range);
    }
    findKey(fn, range) {
        return List.findKey(this, fn, range);
    }
    find(fn, range) {
        return List.find(this, fn, range);
    }
    keyOf(value, range) {
        return List.keyOf(this, value, range);
    }
    indexOf(value, range) {
        return List.indexOf(this, value, range);
    }
    keyAt(index, range) {
        return List.keyAt(this, index, range);
    }
    at(index, range) {
        return List.at(this, index, range);
    }
    contains(value, range) {
        return List.contains(this, value, range);
    }
    reverse() {
        return List.create(List.reverse(this));
    }
    map(mapFn) {
        return List.create(List.map(this, mapFn));
    }
    filter(filterFn) {
        return List.create(List.filter(this, filterFn));
    }
    flatten() {
        return List.create(List.flatten(this));
    }
    flatMap(flatMapFn) {
        return List.create(List.flatMap(this, flatMapFn));
    }
    cache() {
        return List.create(List.cache(this));
    }
    group(groupFn) {
        return List.create(List.group(this, groupFn)).map(List.create).cache();
    }
    index() {
        return List.create(List.index(this));
    }
    zip(other, zipFn) {
        return List.create(List.zip(this, other, zipFn));
    }
    skip(k) {
        return List.create(List.skip(this, k));
    }
    take(n) {
        return List.create(List.take(this, n));
    }
    range(k, n) {
        return List.create(List.range(this, k, n));
    }
    scan(scanFn, memo) {
        return List.create(List.scan(this, scanFn, memo));
    }
    static isList(obj) {
        return obj != null && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    }
    static first(list) {
        var get = bind(list.get, list);
        return list.next().then(get);
    }
    static last(list) {
        var get = bind(list.get, list);
        return list.prev().then(get);
    }
    static every(list, predicate, range) {
        return Range.last(list, range).then(last => {
            var loop = (key) => {
                if (key == null)
                    return Promise.resolve(true);
                return list.get(key)
                    .then(value => predicate(value, key))
                    .then(res => res === false ? false : key == last ? true : list.next(key).then(loop));
            };
            return Range.first(list, range).then(loop);
        });
    }
    static some(list, predicate, range) {
        return List.every(list, (value, key) => Promise.resolve(predicate(value, key)).then(result => !result), range).then(result => !result);
    }
    static forEach(list, fn, range) {
        return List.every(list, (value, key) => Promise.resolve(fn(value, key)).then(() => true), range).then(() => { });
    }
    static reduce(list, fn, memo, range) {
        return List.forEach(list, (value, key) => Promise.resolve(fn(memo, value, key)).then(value => { memo = value; }), range).then(() => memo);
    }
    static toArray(list, range) {
        return List.reduce(list, (memo, value) => (memo.push(value), memo), [], range);
    }
    static findKey(list, fn, range) {
        var key;
        return List.some(list, (v, k) => Promise.resolve(fn(v, k)).then(res => res ? (!!(key = k) || true) : false), range).then(found => found ? key : null);
    }
    static find(list, fn, range) {
        return List.findKey(list, fn, range).then(list.get);
    }
    static keyOf(list, value, range) {
        return List.findKey(list, v => v === value, range);
    }
    static indexOf(list, value, range) {
        var index = -1;
        return List.some(list, (v, k) => value == v ? (!!(index++) || true) : false, range).then((found) => { if (found) {
            return index;
        }
        else {
            throw new Error();
        } });
    }
    static keyAt(list, index, range) {
        return List.findKey(list, () => 0 === index--);
    }
    static at(list, index, range) {
        return List.keyAt(list, index, range).then(list.get);
    }
    static contains(list, value, range) {
        return List.some(list, v => v === value, range);
    }
    static reverse(list) {
        var get = bind(list.get, list), prev = bind(list.next, list), next = bind(list.prev, list);
        return { get, prev, next };
    }
    static map(list, mapFn) {
        var prev = bind(list.prev, list), next = bind(list.next, list);
        function get(key) {
            return list.get(key).then(value => mapFn(value, key));
        }
        return { get, prev, next };
    }
    static filter(list, filterFn) {
        function get(key) {
            return list.get(key).then(value => {
                if (filterFn(value))
                    return value;
                throw new Error();
            });
        }
        function prev(key) {
            return List.findKey(List.reverse(list), filterFn, [key, null]);
        }
        function next(key) {
            return List.findKey(list, filterFn, [key, null]);
        }
        return { get, prev, next };
    }
    static flatten(list) {
        function get(key) {
            var path = Path.fromKey(key);
            return Tree.get(list, path, 1);
        }
        function prev(key) {
            var path = Path.fromKey(key);
            return Tree.prev(list, path, 1).then(Path.toKey);
        }
        function next(key) {
            var path = Path.fromKey(key);
            return Tree.next(list, path, 1).then(Path.toKey);
        }
        return { get, prev, next };
    }
    static flatMap(list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    }
    static cache(list) {
        return new Cache(list);
    }
    static group(list, groupFn) {
        var groups = Object.create(null);
        function get(groupKey) {
            return List.findKey(list, (value, key) => groupFn(value, key) === groupKey)
                .then(() => groups[groupKey] = List.filter(list, (value, key) => groupKey === groupFn(value, key)));
        }
        function prev(groupKey) {
            return List.findKey(List.reverse(list), (value, key) => {
                var _groupKey = groupFn(value, key);
                return _groupKey !== groupKey && !groups[_groupKey];
            }).then(key => key == null ? null : list.get(key).then(value => groupFn(value, key)));
        }
        function next(groupKey) {
            return List.findKey(list, (value, key) => {
                var _groupKey = groupFn(value, key);
                return _groupKey !== groupKey && !groups[_groupKey];
            }).then(key => key == null ? null : list.get(key).then(value => groupFn(value, key)));
        }
        return new Cache({ get, prev, next });
    }
    static index(list) {
        return new Index(list);
    }
    static zip(list, other, zipFn) {
        list = List.index(list);
        other = List.index(other);
        function get(key) {
            return list.get(key).then(v => other.get(key).then(w => zipFn(v, w)));
        }
        function prev(key) {
            return list.prev(key).then(() => other.prev(key));
        }
        function next(key) {
            return list.next(key).then(() => other.next(key));
        }
        return { get, prev, next };
    }
    static skip(list, k) {
        return List.filter(List.index(list), function (value, key) {
            return key >= k;
        });
    }
    static take(list, n) {
        return List.filter(List.index(list), function (value, key) {
            return key < n;
        });
    }
    static range(list, k, n) {
        return List.filter(List.index(list), function (value, key) {
            return key >= k && key < n + k;
        });
    }
    static scan(list, scanFn, memo) {
        var { prev, next } = list, scanList;
        function get(key) {
            return scanList.prev(key).then(p => p == null ? memo : scanList.get(p)).then(memo => list.get(key).then(value => scanFn(memo, value)));
        }
        scanList = List.cache({ get, prev, next });
        return scanList;
    }
}
export default List;
