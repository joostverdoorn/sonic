var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(value) {
        var _this = this;
        _super.call(this);
        if (arguments.length > 2)
            this.splice(null, null, value);
        new observable_1.default(function (notifier) {
            _this._invalidate = function (prev, next) {
                notifier(function (observer) {
                    observer.onInvalidate(prev, next);
                });
            };
        });
    }
    Unit.prototype.has = function (id) {
        return this._id == id;
    };
    Unit.prototype.get = function (id) {
        if (this.has(id))
            return this._value;
    };
    Unit.prototype.prev = function (id) {
        if (id == null)
            return this._id;
        return null;
    };
    Unit.prototype.next = function (id) {
        if (id == null)
            return this._id;
        return null;
    };
    Unit.prototype.set = function (id, value) {
        this._id = id;
        this._value = value;
        this._invalidate();
        return true;
    };
    Unit.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        if (values.length)
            return this.set(unique_id_1.default(), values[0]);
        delete this._id;
        delete this._value;
        this._invalidate();
        return true;
    };
    return Unit;
})(mutable_list_1.default);
exports.default = Unit;
