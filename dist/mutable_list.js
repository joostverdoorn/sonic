var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_list_1 = require('./observable_list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList(list) {
        var _this = this;
        _super.call(this, list);
        this.set = function (id, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            throw new Error("Not implemented");
        };
        this.addBefore = function (id, value) {
            return MutableList.addBefore(_this, id, value);
        };
        this.addAfter = function (id, value) {
            return MutableList.addAfter(_this, id, value);
        };
        this.push = function (value) {
            return MutableList.push(_this, value);
        };
        this.unshift = function (value) {
            return MutableList.unshift(_this, value);
        };
        this.delete = function (id) {
            return MutableList.delete(_this, id);
        };
        this.deleteBefore = function (id) {
            return MutableList.deleteBefore(_this, id);
        };
        this.deleteAfter = function (id) {
            return MutableList.deleteAfter(_this, id);
        };
        this.pop = function () {
            return MutableList.pop(_this);
        };
        this.shift = function () {
            return MutableList.shift(_this);
        };
        this.remove = function (value) {
            return MutableList.remove(_this, value);
        };
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
    MutableList.isMutableList = function (obj) {
        return observable_list_1.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    };
    MutableList.create = function (list) {
        return new MutableList({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe,
            set: list.set,
            splice: list.splice
        });
    };
    MutableList.addBefore = function (list, id, value) {
        list.splice(list.prev(id), id, value);
        return list.prev(id);
    };
    MutableList.addAfter = function (list, id, value) {
        list.splice(id, list.next(id), value);
        return list.next(id);
    };
    MutableList.push = function (list, value) {
        return MutableList.addAfter(list, null, value);
    };
    MutableList.unshift = function (list, value) {
        return MutableList.addBefore(list, null, value);
    };
    MutableList.delete = function (list, id) {
        if (!list.has(id))
            return;
        var value = list.get(id);
        list.splice(list.prev(id), list.next(id));
        return value;
    };
    MutableList.deleteBefore = function (list, id) {
        return MutableList.delete(list, list.prev(id));
    };
    MutableList.deleteAfter = function (list, id) {
        return MutableList.delete(list, list.next(id));
    };
    MutableList.pop = function (list) {
        return MutableList.deleteBefore(list, null);
    };
    MutableList.shift = function (list) {
        return MutableList.deleteAfter(list, null);
    };
    MutableList.remove = function (list, value) {
        var id = MutableList.idOf(list, value);
        if (id == null)
            return false;
        delete (list, id);
        return true;
    };
    return MutableList;
})(observable_list_1.ObservableList);
exports.MutableList = MutableList;
exports.default = MutableList;
