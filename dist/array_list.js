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
        this.has = function (key) {
            return key != null && -1 < key && key < _this._array.length;
        };
        this.get = function (key) {
            if (_this.has(key))
                return _this._array[key];
            return;
        };
        this.prev = function (key) {
            if (key == null && _this._array.length)
                return _this._array.length - 1;
            if (_this._array.length > 0 && key != null && _this.has(key) && _this.has(key - 1))
                return key - 1;
            return null;
        };
        this.next = function (key) {
            if (key == null && _this._array.length)
                return 0;
            if (_this._array.length > 0 && key != null && _this.has(key) && _this.has(key + 1))
                return key + 1;
            return null;
        };
        this.set = function (key, value) {
            if (!_this.has(key))
                return null;
            _this._array[key] = value;
            return key;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (prev == null)
                prev = -1;
            else if (!_this.has(prev))
                return;
            if (next == null)
                next = _this._array.length;
            else if (!_this.has(next))
                return;
            (_a = _this._array).splice.apply(_a, [prev + 1, next - (prev + 1)].concat(values));
            _this._invalidate(prev, null);
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
})(mutable_list_1.MutableList);
exports.default = ArrayList;
