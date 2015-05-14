var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var id_1 = require('./id');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(value) {
        var _this = this;
        _super.call(this);
        this.has = function (id) {
            return _this._id == id;
        };
        this.get = function (id) {
            if (_this.has(id))
                return _this._value;
        };
        this.prev = function (id) {
            if (id == null)
                return _this._id;
            return null;
        };
        this.next = function (id) {
            if (id == null)
                return _this._id;
            return null;
        };
        this.set = function (id, value) {
            _this._id = id;
            _this._value = value;
            _this._invalidate();
            return true;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                return _this.set(id_1.default.create(), values[0]);
            delete _this._id;
            delete _this._value;
            _this._invalidate();
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new observable_1.Subject();
        if (arguments.length > 2)
            this.splice(null, null, value);
    }
    return Unit;
})(mutable_list_1.default);
exports.Unit = Unit;
exports.default = Unit;
