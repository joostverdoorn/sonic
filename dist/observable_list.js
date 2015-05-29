var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var tree_1 = require('./tree');
var observable_1 = require('./observable');
var observable_cache_1 = require('./observable_cache');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(list) {
        var _this = this;
        _super.call(this, list);
        this.observe = function (observer) {
            throw new Error("Not implemented");
        };
        this.reverse = function () {
            return ObservableList.create(ObservableList.reverse(_this));
        };
        this.map = function (mapFn) {
            return ObservableList.create(ObservableList.map(_this, mapFn));
        };
        this.filter = function (filterFn) {
            return ObservableList.create(ObservableList.filter(_this, filterFn));
        };
        this.flatten = function () {
            return ObservableList.create(ObservableList.flatten(_this));
        };
        this.flatMap = function (flatMapFn) {
            return ObservableList.create(ObservableList.flatMap(_this, flatMapFn));
        };
        this.cache = function () {
            return ObservableList.create(ObservableList.cache(_this));
        };
        if (list != null)
            this.observe = list.observe;
    }
    ObservableList.isObservableList = function (obj) {
        return list_1.List.isList(obj) && !!obj['observe'];
    };
    ObservableList.create = function (list) {
        return new ObservableList({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list),
            observe: list.observe.bind(list)
        });
    };
    ObservableList.reverse = function (list) {
        var _a = list_1.List.reverse(list), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe(observer);
        }
        return { has: has, get: get, prev: prev, next: next, observe: observe };
    };
    ObservableList.map = function (list, mapFn) {
        var _a = list_1.List.map(list, mapFn), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
    };
    ObservableList.filter = function (list, filterFn) {
        var _a = list_1.List.filter(list, filterFn), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe({
                onInvalidate: function (p, n) {
                    p = has(p) ? p : prev(p);
                    n = has(n) ? n : next(n);
                    observer.onInvalidate(p, n);
                }
            });
        }
        return { has: has, get: get, prev: prev, next: next, observe: observe };
    };
    ObservableList.flatten = function (list) {
        var cache;
        var subscriptions = Object.create(null);
        var subject = new observable_1.Subject();
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
                    var prevKey, nextKey, prevPath = tree_1.Path.append(key, prev), nextPath = tree_1.Path.append(key, next);
                    if (prev == null)
                        prevPath = tree_1.Tree.prev(list, tree_1.Tree.next(list, prevPath));
                    if (next == null)
                        nextPath = tree_1.Tree.next(list, tree_1.Tree.prev(list, nextPath));
                    prevKey = tree_1.Path.key(prevPath);
                    nextKey = tree_1.Path.key(nextPath);
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevKey, nextKey);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var prevKey = tree_1.Path.key(tree_1.Tree.prev(list, [prev])), nextKey = tree_1.Path.key(tree_1.Tree.next(list, [next]));
                subject.notify(function (observer) {
                    observer.onInvalidate(prevKey, nextKey);
                });
            }
        });
        var _a = list_1.List.flatten(cache), has = _a.has, get = _a.get, next = _a.next, prev = _a.prev;
        return { has: has, get: get, next: next, prev: prev, observe: subject.observe };
    };
    ObservableList.flatMap = function (list, flatMapFn) {
        return ObservableList.flatten(ObservableList.map(list, flatMapFn));
    };
    ObservableList.cache = function (list) {
        return new observable_cache_1.default(list);
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;
