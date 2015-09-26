import bind from './bind';
import { List } from './list';
import { Path } from './tree';
import { Subject } from './observable';
import ObservableCache from './observable_cache';
import ObservableIndex from './observable_index';
export class ListSubject extends Subject {
    constructor(...args) {
        super(...args);
        this.onInvalidate = (range) => {
            this.notify(observer => { observer.onInvalidate(range); });
        };
    }
}
;
export class ObservableList extends List {
    static create(list) {
        return new class class_1 extends ObservableList {
            get(key) { return list.get(key); }
            prev(key) { return list.prev(key); }
            next(key) { return list.next(key); }
            observe(observer) { return list.observe(observer); }
        }
        ;
    }
    reverse() {
        return ObservableList.create(ObservableList.reverse(this));
    }
    map(mapFn) {
        return ObservableList.create(ObservableList.map(this, mapFn));
    }
    filter(filterFn) {
        return ObservableList.create(ObservableList.filter(this, filterFn));
    }
    flatten() {
        return ObservableList.create(ObservableList.flatten(this));
    }
    flatMap(flatMapFn) {
        return ObservableList.create(ObservableList.flatMap(this, flatMapFn));
    }
    cache() {
        return ObservableList.create(ObservableList.cache(this));
    }
    index() {
        return ObservableList.create(ObservableList.index(this));
    }
    zip(other, zipFn) {
        return ObservableList.create(ObservableList.zip(this, other, zipFn));
    }
    skip(k) {
        return ObservableList.create(ObservableList.skip(this, k));
    }
    take(n) {
        return ObservableList.create(ObservableList.take(this, n));
    }
    range(k, n) {
        return ObservableList.create(ObservableList.range(this, k, n));
    }
    scan(scanFn, memo) {
        return ObservableList.create(ObservableList.scan(this, scanFn, memo));
    }
    static isObservableList(obj) {
        return List.isList(obj) && !!obj['observe'];
    }
    static reverse(list) {
        var { get, prev, next } = List.reverse(list);
        function observe(observer) {
            return list.observe({
                onInvalidate: function (range) {
                    observer.onInvalidate(range);
                }
            });
        }
        return { get, prev, next, observe };
    }
    static map(list, mapFn) {
        var { get, prev, next } = List.map(list, mapFn);
        return { get, prev, next, observe: bind(list.observe, list) };
    }
    static filter(list, filterFn) {
        var { get, prev, next } = List.filter(list, filterFn), observe = bind(list.observe, list);
        return { get, prev, next, observe };
    }
    static flatten(list) {
        var flat = List.flatten(list), subject = new ListSubject(), subscriptions = Object.create(null), cache = new ObservableCache({
            get: bind(list.get, list),
            prev: bind(list.prev, list),
            next: bind(list.next, list),
            observe: (observer) => null
        });
        function createObserver(head) {
            var onInvalidate = (range) => {
                if (!Array.isArray(range))
                    return subject.onInvalidate(Path.toKey([head, range]));
                else
                    subject.onInvalidate([Path.toKey(range[0] != null ? [head, range[0]] : [head]), Path.toKey(range[1] != null ? [head, range[1]] : [head])]);
            };
            return { onInvalidate };
        }
        function prev(key) {
            return flat.prev(key).then(prev => {
                var path = Path.fromKey(prev), head = Path.head(path);
                if (head != null && !subscriptions[head]) {
                    list.get(head).then(list => subscriptions[head] = list.observe(createObserver(head)));
                }
                return prev;
            });
        }
        function next(key) {
            return flat.next(key).then(next => {
                var path = Path.fromKey(next), head = Path.head(path);
                if (head != null && !subscriptions[head]) {
                    list.get(head).then(list => subscriptions[head] = list.observe(createObserver(head)));
                }
                return next;
            });
        }
        list.observe({
            onInvalidate: (range) => {
                // Unsubscribe from all lists in the range
                List.forEach(cache, (value, key) => {
                    if (!subscriptions[key])
                        return;
                    subscriptions[key].unsubscribe();
                    delete subscriptions[key];
                }, range);
                if (!Array.isArray(range))
                    subject.onInvalidate(Path.toKey([range]));
                else
                    subject.onInvalidate([Path.toKey([range[0]]), Path.toKey([range[1]])]);
                cache.onInvalidate(range);
            }
        });
        return { get: flat.get, prev, next, observe: subject.observe };
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
    static zip(list, other, zipFn) {
        list = ObservableList.index(list);
        other = ObservableList.index(other);
        function get(key) {
            return list.get(key).then(v => other.get(key).then(w => zipFn(v, w)));
        }
        function prev(key) {
            return list.prev(key).then(() => other.prev(key));
        }
        function next(key) {
            return list.next(key).then(() => other.next(key));
        }
        var subject = new ListSubject();
        list.observe(subject);
        other.observe(subject);
        return { get, prev, next, observe: subject.observe };
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
        var prev = bind(list.prev, list), next = bind(list.next, list), scanList;
        function get(key) {
            return scanList.prev(key).then(p => p == null ? memo : scanList.get(p)).then(memo => list.get(key).then(value => scanFn(memo, value, key)));
        }
        function observe(observer) {
            return list.observe({
                onInvalidate: (range) => {
                    Range.prev(list, range).then(prev => observer.onInvalidate([prev, null]));
                }
            });
        }
        scanList = ObservableList.cache({ get, prev, next, observe });
        return scanList;
    }
}
export default ObservableList;
