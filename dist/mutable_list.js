var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_list_1 = require('./observable_list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList(list) {
        _super.call(this, list);
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
            this.observe = list.observe;
            this.set = list.set;
            this.splice = list.splice;
        }
    }
    MutableList.prototype.set = function (id, value) {
        throw new Error("Not implemented");
    };
    MutableList.prototype.splice = function (prev, next) {
        var values = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            values[_i - 2] = arguments[_i];
        }
        throw new Error("Not implemented");
    };
    MutableList.prototype.push = function (value) {
        return MutableList.push(this, value);
    };
    MutableList.prototype.unshift = function (value) {
        return MutableList.unshift(this, value);
    };
    MutableList.prototype.pop = function () {
        return MutableList.pop(this);
    };
    MutableList.prototype.shift = function () {
        return MutableList.shift(this);
    };
    MutableList.prototype.delete = function (id) {
        return MutableList.delete(this, id);
    };
    MutableList.prototype.remove = function (value) {
        return MutableList.remove(this, value);
    };
    MutableList.isMutableList = function (obj) {
        return observable_list_1.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    };
    MutableList.create = function (list) {
        return new MutableList({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list),
            observe: list.observe.bind(list),
            set: list.set.bind(list),
            splice: list.splice.bind(list)
        });
    };
    MutableList.push = function (list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    };
    MutableList.unshift = function (list, value) {
        list.splice(list.next(), null, value);
        return list.next();
    };
    MutableList.pop = function (list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    };
    MutableList.shift = function (list) {
        var value = list.get(list.next());
        list.splice(list.next(list.next()), null);
        return value;
    };
    MutableList.delete = function (list, id) {
        if (!list.has(id))
            return false;
        return list.splice(list.prev(id), list.next(id));
    };
    MutableList.remove = function (list, value) {
        var id = MutableList.idOf(list, value);
        return delete (list, id);
    };
    return MutableList;
})(observable_list_1.ObservableList);
exports.MutableList = MutableList;
exports.default = MutableList;
