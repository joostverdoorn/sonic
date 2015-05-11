var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
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
            if (id === void 0) { id = -1; }
            return _this._prev[id];
        };
        this.next = function (id) {
            if (id === void 0) { id = -1; }
            return _this._next[id];
        };
        this.set = function (id, value) {
            if (!_this.has(id))
                return false;
            _this._byId[id] = value;
            _this._invalidate(_this._prev[id], _this._next[id]);
            return true;
        };
        this.splice = function (prev, next) {
            if (prev === void 0) { prev = -1; }
            if (next === void 0) { next = -1; }
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            var _next, _prev, value, id;
            while (_next = _this._next[_next || prev]) {
                delete _this._next[_this._prev[_next]];
                delete _this._next[_prev];
                if (_next == next)
                    break;
                delete _this._byId[_next];
            }
            while (_prev = _this._prev[_prev || next]) {
                delete _this._prev[_this._next[_prev]];
                delete _this._prev[_prev];
                if (_prev == prev)
                    break;
                delete _this._byId[_next];
            }
            for (var _a = 0; _a < values.length; _a++) {
                value = values[_a];
                id = unique_id_1.default();
                _this._byId[id] = value;
                _this._prev[id] = prev;
                _this._next[prev] = id;
                prev = id;
            }
            _this._prev[next] = prev;
            _this._next[prev] = next;
            _this._invalidate(prev, next);
            return true;
        };
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[-1] = -1;
        this._next[-1] = -1;
        this.splice.apply(this, [null, null].concat(array));
    }
    return LinkedList;
})(mutable_list_1.default);
exports.default = LinkedList;
