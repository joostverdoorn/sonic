import bind from './bind';
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
    static _add(list, key, value) {
        function get(k) {
            if (k == key)
                return Promise.resolve(value);
            return list.get(k);
        }
        function prev(k) {
            if (k == null)
                return Promise.resolve(key);
            if (k == key)
                return list.prev();
            return list.prev(k);
        }
        function next(k) {
            if (k == key)
                return Promise.resolve(null);
            return list.next(k).then(n => n == null ? key : n);
        }
        return { get, prev, next };
    }
    static _remove(list, key) {
        function get(k) {
            if (k == key)
                return Promise.reject(new Error);
            return list.get(k);
        }
        function prev(k) {
            if (k == key)
                return Promise.reject(new Error);
            return list.prev(k).then(p => p == key ? list.prev(p) : p);
        }
        function next(k) {
            if (k == key)
                return Promise.reject(new Error);
            return list.next(k).then(n => n == key ? list.next(n) : n);
        }
        return { get, prev, next };
    }
    _add(key, value) {
        return List.create(List._add(this, key, value));
    }
    _remove(key) {
        return List.create(List._remove(this, key));
    }
    // 
    // first(): Promise<V> {
    //   return List.first(this);
    // }
    //
    // last(): Promise<V> {
    //   return List.last(this);
    // }
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
            return scanList.prev(key).then(p => p == null ? memo : scanList.get(p)).then(memo => list.get(key).then(value => scanFn(memo, value, key)));
        }
        scanList = List.cache({ get, prev, next });
        return scanList;
    }
}
export default List;
