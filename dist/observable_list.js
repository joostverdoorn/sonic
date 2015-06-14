import { List } from './list';
import { Tree, Path } from './tree';
import { Subject } from './observable';
import ObservableCache from './observable_cache';
import ObservableIndex from './observable_index';
import ObservableKeyBy from './observable_key_by';
;
export class ObservableList extends List {
    constructor(list) {
        super(list);
        this.observe = (observer) => {
            throw new Error("Not implemented");
        };
        this.reverse = () => {
            return ObservableList.create(ObservableList.reverse(this));
        };
        this.map = (mapFn) => {
            return ObservableList.create(ObservableList.map(this, mapFn));
        };
        this.filter = (filterFn) => {
            return ObservableList.create(ObservableList.filter(this, filterFn));
        };
        this.flatten = () => {
            return ObservableList.create(ObservableList.flatten(this));
        };
        this.flatMap = (flatMapFn) => {
            return ObservableList.create(ObservableList.flatMap(this, flatMapFn));
        };
        this.cache = () => {
            return ObservableList.create(ObservableList.cache(this));
        };
        this.index = () => {
            return ObservableList.create(ObservableList.index(this));
        };
        this.keyBy = (keyFn) => {
            return ObservableList.create(ObservableList.keyBy(this, keyFn));
        };
        this.zip = (other, zipFn) => {
            return ObservableList.create(ObservableList.zip(this, other, zipFn));
        };
        this.skip = (k) => {
            return ObservableList.create(ObservableList.skip(this, k));
        };
        this.take = (n) => {
            return ObservableList.create(ObservableList.take(this, n));
        };
        this.range = (k, n) => {
            return ObservableList.create(ObservableList.range(this, k, n));
        };
        this.scan = (scanFn, memo) => {
            return ObservableList.create(ObservableList.scan(this, scanFn, memo));
        };
        if (list != null)
            this.observe = list.observe;
    }
    static isObservableList(obj) {
        return List.isList(obj) && !!obj['observe'];
    }
    static create(list) {
        return new ObservableList({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe
        });
    }
    static reverse(list) {
        var { has, get, prev, next } = List.reverse(list);
        function observe(observer) {
            return list.observe({
                onInvalidate: function (prev, next) {
                    observer.onInvalidate(next, prev);
                }
            });
        }
        return { has, get, prev, next, observe };
    }
    static map(list, mapFn) {
        var { has, get, prev, next } = List.map(list, mapFn);
        return { has, get, prev, next, observe: list.observe };
    }
    static filter(list, filterFn) {
        var { has, get, prev, next } = List.filter(list, filterFn);
        function observe(observer) {
            return list.observe({
                onInvalidate: function (p, n) {
                    p = has(p) ? p : prev(p);
                    n = has(n) ? n : next(n);
                    observer.onInvalidate(p, n);
                }
            });
        }
        return { has, get, prev, next, observe };
    }
    static flatten(list) {
        var cache;
        var subscriptions = Object.create(null);
        var subject = new Subject();
        list.observe({
            onInvalidate: function (prev, next) {
                var key;
                key = prev;
                while ((key = cache.next(key)) != null && key != next) {
                    var subscription = subscriptions[key];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[key];
                    }
                }
                key = next;
                while ((key = cache.prev(key)) != null && key != prev) {
                    var subscription = subscriptions[key];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[key];
                    }
                }
            }
        });
        cache = ObservableList.cache(ObservableList.map(list, function (value, key) {
            subscriptions[key] = value.observe({
                onInvalidate: function (prev, next) {
                    var prevKey, nextKey, prevPath = Path.append(key, prev), nextPath = Path.append(key, next);
                    if (prev == null)
                        prevPath = Tree.prev(list, Tree.next(list, prevPath));
                    if (next == null)
                        nextPath = Tree.next(list, Tree.prev(list, nextPath));
                    prevKey = Path.key(prevPath);
                    nextKey = Path.key(nextPath);
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevKey, nextKey);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var prevKey = Path.key(Tree.prev(list, [prev])), nextKey = Path.key(Tree.next(list, [next]));
                subject.notify(function (observer) {
                    observer.onInvalidate(prevKey, nextKey);
                });
            }
        });
        var { has, get, next, prev } = List.flatten(cache);
        return { has, get, next, prev, observe: subject.observe };
    }
    static flatMap(list, flatMapFn) {
        return ObservableList.flatten(ObservableList.map(list, flatMapFn));
    }
    static cache(list) {
        return new ObservableCache(list);
    }
    static index(list) {
        return new ObservableIndex(list);
    }
    static keyBy(list, keyFn) {
        return new ObservableKeyBy(list, keyFn);
    }
    static zip(list, other, zipFn) {
        list = ObservableList.index(list);
        other = ObservableList.index(other);
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
        var subject = new Subject(), observer = {
            onInvalidate: function (prev, next) {
                subject.notify(function (_observer) {
                    _observer.onInvalidate(prev, next);
                });
            }
        };
        list.observe(observer);
        other.observe(observer);
        return { has, get, prev, next, observe: subject.observe };
    }
    static skip(list, k) {
        return ObservableList.filter(ObservableList.index(list), function (value, key) {
            return key >= k;
        });
    }
    static take(list, n) {
        return ObservableList.filter(ObservableList.index(list), function (value, key) {
            return key < n;
        });
    }
    static range(list, k, n) {
        return ObservableList.filter(ObservableList.index(list), function (value, key) {
            return key >= k && key < n + k;
        });
    }
    static scan(list, scanFn, memo) {
        var { has, prev, next } = list, scanList;
        function get(key) {
            var prev = scanList.prev(key);
            return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
        }
        function observe(observer) {
            return list.observe({
                onInvalidate: function (prev, next) {
                    observer.onInvalidate(prev, null);
                }
            });
        }
        scanList = ObservableList.cache({ has, get, prev, next, observe });
        return scanList;
    }
}
export default ObservableList;
