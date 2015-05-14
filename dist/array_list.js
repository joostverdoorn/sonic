var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var ArrayList = (function (_super) {
    __extends(ArrayList, _super);
    function ArrayList(array) {
        var _this = this;
        if (array === void 0) { array = []; }
        _super.call(this);
        this.has = function (id) {
            return id != null && -1 < id && id < _this._array.length;
        };
        this.get = function (id) {
            if (_this.has(id))
                return _this._array[id];
            return;
        };
        this.prev = function (id) {
            if (id == null && _this._array.length)
                return _this._array.length - 1;
            if (_this._array.length > 0 && id != null && _this.has(id) && _this.has(id - 1))
                return id - 1;
            return null;
        };
        this.next = function (id) {
            if (id == null && _this._array.length)
                return 0;
            if (_this._array.length > 0 && id != null && _this.has(id) && _this.has(id + 1))
                return id + 1;
            return null;
        };
        this.set = function (id, value) {
            if (!_this.has(id))
                return false;
            _this._array[id] = value;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (prev == null)
                prev = -1;
            else if (!_this.has(prev))
                return false;
            if (next == null)
                next = _this._array.length;
            else if (!_this.has(next))
                return false;
            (_a = _this._array).splice.apply(_a, [prev + 1, next - prev - 1].concat(values));
            _this._invalidate(prev, null);
            return true;
            var _a;
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
        this._array = array;
    }
    return ArrayList;
})(mutable_list_1.default);
exports.ArrayList = ArrayList;
exports.default = ArrayList;
