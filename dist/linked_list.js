var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var id_1 = require('./id');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var LinkedList = (function (_super) {
    __extends(LinkedList, _super);
    function LinkedList(array) {
        var _this = this;
        _super.call(this);
        this.has = function (id) {
            return id in _this._byId;
        };
        this.get = function (id) {
            return _this._byId[id];
        };
        this.prev = function (id) {
            if (id === void 0) { id = null; }
            var prev = _this._prev[id];
            return prev == null ? null : prev;
        };
        this.next = function (id) {
            if (id === void 0) { id = null; }
            var next = _this._next[id];
            return next == null ? null : next;
        };
        this.set = function (id, value) {
            if (!_this.has(id))
                return false;
            _this._byId[id] = value;
            _this._invalidate(_this._prev[id], _this._next[id]);
            return true;
        };
        this.splice = function (prev, next) {
            if (prev === void 0) { prev = null; }
            if (next === void 0) { next = null; }
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            var id, value;
            id = prev;
            while ((id = _this._next[id]) != null) {
                delete _this._next[_this._prev[id]];
                delete _this._prev[id];
                if (id == next)
                    break;
                delete _this._byId[id];
            }
            id = next;
            while ((id = _this._prev[id]) != null) {
                delete _this._prev[_this._next[id]];
                delete _this._next[id];
                if (id == prev)
                    break;
                delete _this._byId[id];
            }
            var _id = prev;
            for (var _a = 0; _a < values.length; _a++) {
                value = values[_a];
                id = id_1.default.create();
                _this._byId[id] = value;
                _this._prev[id] = _id;
                _this._next[_id] = id;
                _id = id;
            }
            _this._prev[next] = _id;
            _this._next[_id] = next;
            _this._invalidate(prev, next);
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            if (!_this.has(prev))
                prev = null;
            if (!_this.has(next))
                next = null;
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new observable_1.Subject();
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice.apply(this, [null, null].concat(array));
    }
    return LinkedList;
})(mutable_list_1.default);
exports.default = LinkedList;
