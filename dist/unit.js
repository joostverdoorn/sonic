var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
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
            // this._notify();
            return true;
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                return _this.set(unique_id_1.default(), values[0]);
            delete _this._id;
            delete _this._value;
            // this._invalidate();
            return true;
        };
        if (arguments.length > 2)
            this.splice(null, null, value);
    }
    return Unit;
})(mutable_list_1.default);
exports.default = Unit;
