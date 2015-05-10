var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList(source) {
        _super.call(this, source);
    }
    MutableList.prototype.set = function (id, value) { return this._source.set(id, value); };
    MutableList.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        return (_a = this._source).splice.apply(_a, [prev, next].concat(values));
        var _a;
    };
    return MutableList;
})(list_1.List);
exports.MutableList = MutableList;
var MutableList;
(function (MutableList) {
    function isMutableList(obj) {
        return list_1.List.isList(obj) && !!obj['set'] && !!obj['splice'];
    }
    MutableList.isMutableList = isMutableList;
    function create(list) {
        return new MutableList(list);
    }
    MutableList.create = create;
    function push(list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    }
    MutableList.push = push;
    function unshift(list, value) {
        list.splice(list.next(), null, value);
        return list.next();
    }
    MutableList.unshift = unshift;
    function pop(list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    }
    MutableList.pop = pop;
    function shift(list) {
        var value = list.get(list.next());
        list.splice(list.next(list.next()), null);
        return value;
    }
    MutableList.shift = shift;
    function del(list, id) {
        if (!list.has(id))
            return false;
        return list.splice(list.prev(id), list.next(id));
    }
    MutableList.del = del;
    function remove(list, value) {
        var id = list_1.List.idOf(list, value);
        return delete (list, id);
    }
    MutableList.remove = remove;
})(MutableList = exports.MutableList || (exports.MutableList = {}));
Object.keys(MutableList).forEach(function (key) {
    MutableList.prototype[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        MutableList[key].apply(MutableList, [this].concat(args));
    };
});
exports.default = MutableList;
