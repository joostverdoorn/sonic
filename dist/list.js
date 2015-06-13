import { Tree, Path } from './tree';
import Cache from './cache';
import Index from './index';
import KeyBy from './key_by';
import { AsyncList } from './async_list';
export class List {
    constructor(list) {
        this.has = (key) => {
            throw new Error("Not implemented");
        };
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
        this.forEach = (fn) => {
            return List.forEach(this, fn);
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
        this.every = (predicate) => {
            return List.every(this, predicate);
        };
        this.some = (predicate) => {
            return List.some(this, predicate);
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
        this.index = () => {
            return List.create(List.index(this));
        };
        this.keyBy = (keyFn) => {
            return List.create(List.keyBy(this, keyFn));
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
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }
    ;
    static isList(obj) {
        return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    }
    static create(list) {
        return new List({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next
        });
    }
    static first(list) {
        return list.get(list.next());
    }
    static last(list) {
        return list.get(list.prev());
    }
    static forEach(list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            fn(list.get(key), key);
    }
    static reduce(list, fn, memo) {
        var key;
        while ((key = list.next(key)) != null)
            memo = fn(memo, list.get(key), key);
        return memo;
    }
    static toArray(list) {
        var key, index = 0, array = [];
        while ((key = list.next(key)) != null)
            array[index++] = list.get(key);
        return array;
    }
    static findKey(list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            if (fn(list.get(key), key))
                return key;
    }
    static find(list, fn) {
        return list.get(List.findKey(list, fn));
    }
    static keyOf(list, value) {
        return List.findKey(list, v => v === value);
    }
    static indexOf(list, value) {
        var key, i = 0;
        while ((key = list.next(key)) != null) {
            if (list.get(key) === value)
                return i;
            i++;
        }
    }
    static keyAt(list, index) {
        var key, i = 0;
        while ((key = list.next(key)) != null)
            if (i++ == index)
                return key;
        return null;
    }
    static at(list, index) {
        return list.get(List.keyAt(list, index));
    }
    static every(list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (!predicate(list.get(key), key))
                return false;
        return true;
    }
    static some(list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (predicate(list.get(key), key))
                return true;
        return false;
    }
    static contains(list, value) {
        return List.some(list, v => v === value);
    }
    static reverse(list) {
        var { has, get } = list;
        function prev(key) {
            return list.next(key);
        }
        function next(key) {
            return list.prev(key);
        }
        return { has, get, prev, next };
    }
    static map(list, mapFn) {
        var { has, prev, next } = list;
        function get(key) {
            return has(key) ? mapFn(list.get(key), key) : undefined;
        }
        return { has, get, prev, next };
    }
    static filter(list, filterFn) {
        function has(key) {
            return list.has(key) && filterFn(list.get(key), key);
        }
        function get(key) {
            if (has(key))
                return list.get(key);
            return;
        }
        function prev(key) {
            var prev = key;
            while ((prev = list.prev(prev)) != null)
                if (has(prev))
                    return prev;
            return null;
        }
        function next(key) {
            var next = key;
            while ((next = list.next(next)) != null)
                if (has(next))
                    return next;
            return null;
        }
        return { has, get, prev, next };
    }
    static flatten(list) {
        function has(key) {
            var path = Path.create(key);
            return Tree.has(list, path, 1);
        }
        function get(key) {
            var path = Path.create(key);
            return Tree.get(list, path, 1);
        }
        function prev(key) {
            var path = Path.create(key);
            return Path.key(Tree.prev(list, path, 1));
        }
        function next(key) {
            var path = Path.create(key);
            return Path.key(Tree.next(list, path, 1));
        }
        return { has, get, prev, next };
    }
    static flatMap(list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    }
    static cache(list) {
        return new Cache(list);
    }
    static index(list) {
        return new Index(list);
    }
    static keyBy(list, keyFn) {
        return new KeyBy(list, keyFn);
    }
    static zip(list, other, zipFn) {
        list = List.index(list);
        other = List.index(other);
        function has(key) {
            return list.has(key) && other.has(key);
        }
        function get(key) {
            return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
        }
        function prev(key) {
            var prev = list.prev(key);
            return prev != null && prev == other.prev(key) ? prev : null;
        }
        function next(key) {
            var next = list.next(key);
            return next != null && next == other.next(key) ? next : null;
        }
        return { has, get, prev, next };
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
        var { has, prev, next } = list, scanList;
        function get(key) {
            var prev = scanList.prev(key);
            return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
        }
        scanList = List.cache({ has, get, prev, next });
        return scanList;
    }
    static async(list, scheduler) {
        return new AsyncList(list);
    }
}
export default List;
