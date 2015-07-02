import { Tree, Path } from './tree';
import Cache from './cache';
import Index from './index';
export class List {
    constructor(list) {
        this.get = (key) => {
            throw new Error("Not implemented");
        };
        this.prev = (key) => {
            throw new Error("Not implemented");
        };
        this.next = (key) => {
            throw new Error("Not implemented");
        };
        this.first = () => {
            return List.first(this);
        };
        this.last = () => {
            return List.last(this);
        };
        this.every = (predicate) => {
            return List.every(this, predicate);
        };
        this.some = (predicate) => {
            return List.some(this, predicate);
        };
        this.forEach = (fn, prev, next) => {
            return List.forEach(this, fn, prev, next);
        };
        this.reduce = (fn, memo) => {
            return List.reduce(this, fn);
        };
        this.toArray = () => {
            return List.toArray(this);
        };
        this.findKey = (fn) => {
            return List.findKey(this, fn);
        };
        this.find = (fn) => {
            return List.find(this, fn);
        };
        this.keyOf = (value) => {
            return List.keyOf(this, value);
        };
        this.indexOf = (value) => {
            return List.indexOf(this, value);
        };
        this.keyAt = (index) => {
            return List.keyAt(this, index);
        };
        this.at = (index) => {
            return List.at(this, index);
        };
        this.contains = (value) => {
            return List.contains(this, value);
        };
        this.reverse = () => {
            return List.create(List.reverse(this));
        };
        this.map = (mapFn) => {
            return List.create(List.map(this, mapFn));
        };
        this.filter = (filterFn) => {
            return List.create(List.filter(this, filterFn));
        };
        this.flatten = () => {
            return List.create(List.flatten(this));
        };
        this.flatMap = (flatMapFn) => {
            return List.create(List.flatMap(this, flatMapFn));
        };
        this.cache = () => {
            return List.create(List.cache(this));
        };
        this.group = (groupFn) => {
            return List.create(List.group(this, groupFn)).map(List.create).cache();
        };
        this.index = () => {
            return List.create(List.index(this));
        };
        this.zip = (other, zipFn) => {
            return List.create(List.zip(this, other, zipFn));
        };
        this.skip = (k) => {
            return List.create(List.skip(this, k));
        };
        this.take = (n) => {
            return List.create(List.take(this, n));
        };
        this.range = (k, n) => {
            return List.create(List.range(this, k, n));
        };
        this.scan = (scanFn, memo) => {
            return List.create(List.scan(this, scanFn, memo));
        };
        if (list != null) {
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }
    ;
    static isList(obj) {
        return obj != null && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    }
    static create(list) {
        return new List({
            get: list.get,
            prev: list.prev,
            next: list.next
        });
    }
    static first(list) {
        return list.next().then(list.get);
    }
    static last(list) {
        return list.prev().then(list.get);
    }
    static every(list, predicate, prev, next) {
        var loop = (key) => list.next(key).then(key => {
            return key == next ? true : list.get(key).then(value => predicate(value, key) === true ? loop(key) : false);
        });
        return loop(prev);
    }
    static some(list, predicate, prev, next) {
        var loop = (key) => list.next(key).then(key => {
            return key == next ? false : list.get(key).then(value => Promise.resolve(predicate(value, key)).then(res => res === true ? true : loop(key)));
        });
        return loop(prev);
    }
    static forEach(list, fn, prev, next) {
        return List.every(list, (value, key) => { fn(value, key); return true; }, prev, next).then(() => { });
    }
    static reduce(list, fn, memo) {
        return List.forEach(list, (value, key) => memo = fn(memo, value, key)).then(() => memo);
    }
    static toArray(list) {
        return List.reduce(list, (memo, value) => (memo.push(value), memo), []);
    }
    static findKey(list, fn, prev, next) {
        var key;
        return List.some(list, (v, k) => Promise.resolve(fn(v, k)).then(res => res ? (!!(key = k) || true) : false), prev, next).then(found => found ? key : null);
    }
    static find(list, fn, prev, next) {
        return List.findKey(list, fn, prev, next).then(list.get);
    }
    static keyOf(list, value, prev, next) {
        return List.findKey(list, v => v === value, prev, next);
    }
    static indexOf(list, value, prev, next) {
        var index = -1;
        return List.some(list, (v, k) => value == v ? (!!(index++) || true) : false, prev, next).then((found) => { if (found) {
            return index;
        }
        else {
            throw new Error();
        } });
    }
    static keyAt(list, index, prev, next) {
        return List.findKey(list, () => 0 === index--);
    }
    static at(list, index) {
        return List.keyAt(list, index).then(list.get);
    }
    static contains(list, value) {
        return List.some(list, v => v === value);
    }
    static reverse(list) {
        var { get } = list;
        function prev(key) {
            return list.next(key);
        }
        function next(key) {
            return list.prev(key);
        }
        return { get, prev, next };
    }
    static map(list, mapFn) {
        var { prev, next } = list;
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
            return List.findKey(List.reverse(list), filterFn, key);
        }
        function next(key) {
            return List.findKey(list, filterFn, key);
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
