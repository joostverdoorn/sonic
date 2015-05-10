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
        _super.call(this);
        if (arguments.length > 2)
            this.splice(null, null, value);
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
    Unit.prototype.splice = function (prev, next, value) {
        if (arguments.length > 2)
            return this.set(unique_id_1.default(), value);
        delete this._id;
        delete this._value;
        this._invalidate();
        return true;
    };
    return Unit;
})(mutable_list_1.default);
exports.default = Unit;
