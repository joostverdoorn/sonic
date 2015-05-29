var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var key_1 = require('./key');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var LinkedList = (function (_super) {
    __extends(LinkedList, _super);
    function LinkedList(values) {
        var _this = this;
        _super.call(this);
        this.has = function (key) {
            return key in _this._byKey;
        };
        this.get = function (key) {
            return _this._byKey[key];
        };
        this.prev = function (key) {
            if (key === void 0) { key = null; }
            var prev = _this._prev[key];
            return prev == null ? null : prev;
        };
        this.next = function (key) {
            if (key === void 0) { key = null; }
            var next = _this._next[key];
            return next == null ? null : next;
        };
        this.set = function (key, value) {
            if (!_this.has(key))
                return null;
            _this._byKey[key] = value;
            _this._invalidate(_this._prev[key], _this._next[key]);
            return key;
        };
        this.splice = function (prev, next) {
            if (prev === void 0) { prev = null; }
            if (next === void 0) { next = null; }
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            var key, value;
            key = prev;
            while ((key = _this._next[key]) != null) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next)
                    break;
                delete _this._byKey[key];
            }
            key = next;
            while ((key = _this._prev[key]) != null) {
                delete _this._prev[_this._next[key]];
                delete _this._next[key];
                if (key == prev)
                    break;
                delete _this._byKey[key];
            }
            var _key = prev;
            for (var _a = 0; _a < values.length; _a++) {
                value = values[_a];
                key = key_1.default.create();
                _this._byKey[key] = value;
                _this._prev[key] = _key;
                _this._next[_key] = key;
                _key = key;
            }
            _this._prev[next] = _key;
            _this._next[_key] = next;
            _this._invalidate(prev, next);
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
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[null] = null;
        this._next[null] = null;
        this.splice.apply(this, [null, null].concat(values));
    }
    return LinkedList;
})(mutable_list_1.MutableList);
exports.default = LinkedList;
