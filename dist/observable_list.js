var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var tree_1 = require('./tree');
var observable_1 = require('./observable');
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
        if (list != null) {
            this.observe = list.observe;
        }
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
                var id;
                id = prev;
                while ((id = cache.next(id)) != null && id != next) {
                    var subscription = subscriptions[id];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id];
                    }
                }
                id = next;
                while ((id = cache.prev(id)) != null && id != prev) {
                    var subscription = subscriptions[id];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id];
                    }
                }
            }
        });
        cache = ObservableList.cache(ObservableList.map(list, function (value, id) {
            subscriptions[id] = value.observe({
                onInvalidate: function (prev, next) {
                    var prevId, nextId, prevPath = tree_1.Path.append(id, prev), nextPath = tree_1.Path.append(id, next);
                    if (prev == null)
                        prevPath = tree_1.Tree.prev(list, tree_1.Tree.next(list, prevPath));
                    if (next == null)
                        nextPath = tree_1.Tree.next(list, tree_1.Tree.prev(list, nextPath));
                    prevId = tree_1.Path.id(prevPath);
                    nextId = tree_1.Path.id(nextPath);
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevId, nextId);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var prevId = tree_1.Path.id(tree_1.Tree.prev(list, [prev])), nextId = tree_1.Path.id(tree_1.Tree.next(list, [next]));
                subject.notify(function (observer) {
                    observer.onInvalidate(prevId, nextId);
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
        var valueCache = Object.create(null), nextCache = Object.create(null), prevCache = Object.create(null);
        function has(id) {
            return id in valueCache || list.has(id);
        }
        function get(id) {
            if (id in valueCache)
                return valueCache[id];
            if (list.has(id))
                return valueCache[id] = list.get(id);
            return;
        }
        function prev(id) {
            if (id in prevCache)
                return prevCache[id];
            var prevId = list.prev(id);
            if (prevId != null) {
                prevCache[id] = prevId;
                nextCache[prevId] = id;
            }
            return prevId;
        }
        function next(id) {
            if (id in nextCache)
                return nextCache[id];
            var nextId = list.next(id);
            if (nextId != null) {
                nextCache[id] = nextId;
                prevCache[nextId] = id;
            }
            return nextId;
        }
        list.observe({
            onInvalidate: function (prev, next) {
                var id;
                id = prev;
                while ((id = nextCache[id]) != null) {
                    delete nextCache[prevCache[id]];
                    delete prevCache[id];
                    if (id == next)
                        break;
                    delete valueCache[id];
                }
                while ((id = prevCache[id]) != null) {
                    delete prevCache[nextCache[id]];
                    delete nextCache[id];
                    if (id == prev)
                        break;
                    delete valueCache[id];
                }
            }
        });
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;
