var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unique_id_1 = require('./unique_id');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var LinkedList = (function (_super) {
    __extends(LinkedList, _super);
    function LinkedList(array) {
        var _this = this;
        _super.call(this);
        this._byId = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this._prev[-1] = -1;
        this._next[-1] = -1;
        this.splice.apply(this, [null, null].concat(array));
        new observable_1.default(function (notifier) {
            _this._invalidate = function (prev, next) {
                notifier(function (observer) {
                    observer.onInvalidate(prev, next);
                });
            };
        });
    }
    LinkedList.prototype.has = function (id) {
        return id in this._byId;
    };
    LinkedList.prototype.get = function (id) {
        return this._byId[id];
    };
    LinkedList.prototype.prev = function (id) {
        if (id === void 0) { id = -1; }
        return this._prev[id];
    };
    LinkedList.prototype.next = function (id) {
        if (id === void 0) { id = -1; }
        return this._next[id];
    };
    LinkedList.prototype.set = function (id, value) {
        if (!this.has(id))
            return false;
        this._byId[id] = value;
        this._invalidate(this._prev[id], this._next[id]);
        return true;
    };
    LinkedList.prototype.splice = function (prev, next) {
        if (prev === void 0) { prev = -1; }
        if (next === void 0) { next = -1; }
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        var _next, _prev, value, id;
        while (_next = this._next[_next || prev]) {
            delete this._next[this._prev[_next]];
            delete this._next[_prev];
            if (_next == next)
                break;
            delete this._byId[_next];
        }
        while (_prev = this._prev[_prev || next]) {
            delete this._prev[this._next[_prev]];
            delete this._prev[_prev];
            if (_prev == prev)
                break;
            delete this._byId[_next];
        }
        for (var _a = 0; _a < values.length; _a++) {
            value = values[_a];
            id = unique_id_1.default();
            this._byId[id] = value;
            this._prev[id] = prev;
            this._next[prev] = id;
            prev = id;
        }
        this._prev[next] = prev;
        this._next[prev] = next;
        this._invalidate(prev, next);
        return true;
    };
    return LinkedList;
})(mutable_list_1.default);
exports.default = LinkedList;
