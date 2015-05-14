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
        this._array = array;
        new observable_1.default(function (notifier) {
            _this._invalidate = function (prev, next) {
                notifier(function (observer) {
                    observer.onInvalidate(prev, next);
                });
            };
        });
    }
    ArrayList.prototype.has = function (id) {
        return -1 < id && id < this._array.length;
    };
    ArrayList.prototype.get = function (id) {
        if (this.has(id))
            return this._array[id];
        return;
    };
    ArrayList.prototype.prev = function (id) {
        if (id == null && this._array.length)
            return this._array.length - 1;
        if (this._array.length > 0 && id != null && this.has(id) && this.has(id - 1))
            return id - 1;
        return null;
    };
    ArrayList.prototype.next = function (id) {
        if (id == null && this._array.length)
            return 0;
        if (this._array.length > 0 && id != null && this.has(id) && this.has(id + 1))
            return id + 1;
        return null;
    };
    ArrayList.prototype.set = function (id, value) {
        if (!this.has(id))
            return false;
        this._array[id] = value;
    };
    ArrayList.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        if (prev == null)
            prev = -1;
        else if (!this.has(prev))
            return false;
        if (next == null)
            next = this._array.length;
        else if (!this.has(next))
            return false;
        (_a = this._array).splice.apply(_a, [prev + 1, next - prev - 1].concat(values));
        this._invalidate(prev, null);
        return true;
        var _a;
    };
    return ArrayList;
})(mutable_list_1.default);
exports.ArrayList = ArrayList;
exports.default = ArrayList;
