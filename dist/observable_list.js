var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var observable_1 = require('./observable');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(list) {
        _super.call(this, list);
        if (list != null) {
            this.observe = list.observe;
        }
    }
    ObservableList.prototype.observe = function (observer) {
        throw new Error("Not implemented");
    };
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
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
    };
    ObservableList.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next, observe = list.observe;
        function get(id) {
            return mapFn(list.get(id), id);
        }
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
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
        return ObservableList.create({ has: has, get: get, prev: prev, next: next, observe: observe });
    };
    ObservableList.flatten = function (list) {
        var cache;
        var subscriptions = Object.create(null);
        var notify;
        var observable = new observable_1.Observable(function (n) { notify = n; });
        list.observe({
            onInvalidate: function (prev, next) {
                var id;
                id = prev;
                while ((id = cache.next(id)) != null && id != next) {
                    var subscription = subscriptions[id.toString()];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id.toString()];
                    }
                }
                id = next;
                while ((id = cache.prev(id)) != null && id != prev) {
                    var subscription = subscriptions[id.toString()];
                    if (subscription) {
                        subscription.unsubscribe();
                        delete subscriptions[id.toString()];
                    }
                }
            }
        });
        cache = ObservableList.cache(ObservableList.map(list, function (value, id) {
            subscriptions[id.toString()] = value.observe({
                onInvalidate: function (prev, next) {
                    notify(function (observer) {
                        var p = [].concat(id).concat(prev), n = [].concat(id).concat(next);
                        observer.onInvalidate(p, n);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var _prev = cache.get(prev).prev(), _next = cache.get(next).next();
                notify(function (observer) {
                    var p = [].concat(prev).concat(_prev), n = [].concat(next).concat(_next);
                    observer.onInvalidate(p, n);
                });
            }
        });
        var _a = list_1.List.flatten(cache), has = _a.has, get = _a.get, next = _a.next, prev = _a.prev;
        return { has: has, get: get, next: next, prev: prev, observe: observable.observe };
    };
    ObservableList.cache = function (list) {
        var _get = Object.create(null), _next = Object.create(null), _prev = Object.create(null);
        function has(id) {
            if (id == null)
                return false;
            return id.toString() in _get || list.has(id);
        }
        function get(id) {
            if (id == null)
                return undefined;
            var idString = id.toString();
            if (idString in _get) {
                return _get[idString];
            }
            if (list.has(id)) {
                return _get[idString] = list.get(id);
            }
        }
        function prev(id) {
            if (id == null)
                return list.prev();
            var idString = id.toString();
            if (idString in _prev) {
                return _prev[idString];
            }
            if (list.prev(id) != null) {
                var prevId = _prev[idString] = list.prev(id);
                _next[prevId.toString()] = id;
                return prevId;
            }
        }
        function next(id) {
            if (id == null)
                return list.next();
            var idString = id.toString();
            if (idString in _next) {
                return _next[idString];
            }
            if (list.next(id) != null) {
                var nextId = _next[idString] = list.next(id);
                _prev[nextId.toString()] = id;
                return nextId;
            }
        }
        list.observe({
            onInvalidate: function (prev, next) {
                var nextId = prev, prevId = next;
                while (nextId != null && (nextId = _next[nextId.toString()])) {
                    delete _next[_prev[nextId.toString()]];
                    delete _prev[nextId.toString()];
                    if (next != null && nextId.toString() == next.toString())
                        break;
                    delete _get[nextId.toString()];
                }
                while (prevId != null && (prevId = _prev[prevId.toString()])) {
                    delete _prev[_next[prevId.toString()]];
                    delete _next[prevId.toString()];
                    if (prev != null && prevId.toString() == prev.toString())
                        break;
                    delete _get[prevId.toString()];
                }
            }
        });
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;
