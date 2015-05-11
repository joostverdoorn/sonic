var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var compose_1 = require('./compose');
var unique_id_1 = require('./unique_id');
var list_1 = require('./list');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList() {
        var _this = this;
        _super.call(this);
        this.observe = function (observer) {
            var observerId = unique_id_1.default();
            var observers = _this._observers;
            observers[observerId] = observer;
            return {
                unsubscribe: function () { delete observers[observerId]; }
            };
        };
        this._invalidate = function (prev, next) {
            if (!_this.has(prev))
                prev = null;
            if (!_this.has(next))
                next = null;
            _this._notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._observers = Object.create(null);
    }
    ObservableList.isObservableList = function (obj) {
        return list_1.List.isList(obj) && !!obj['observe'];
    };
    ObservableList.prototype._notify = function (notifier) {
        for (var observerId in this._observers)
            notifier(this._observers[observerId]);
    };
    ObservableList.create = function (list) {
        var obj = {
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe
        };
        return ObservableList.call(obj);
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
        return ObservableList.create({ has: has, get: compose_1.default(mapFn, list.get), prev: prev, next: next, observe: observe });
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
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
