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
        var _this = this;
        _super.call(this, list);
        this.set = function (key, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            throw new Error("Not implemented");
        };
        this.addBefore = function (key, value) {
            return MutableList.addBefore(_this, key, value);
        };
        this.addAfter = function (key, value) {
            return MutableList.addAfter(_this, key, value);
        };
        this.push = function (value) {
            return MutableList.push(_this, value);
        };
        this.unshift = function (value) {
            return MutableList.unshift(_this, value);
        };
        this.delete = function (key) {
            return MutableList.delete(_this, key);
        };
        this.deleteBefore = function (key) {
            return MutableList.deleteBefore(_this, key);
        };
        this.deleteAfter = function (key) {
            return MutableList.deleteAfter(_this, key);
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
    MutableList.addBefore = function (list, key, value) {
        list.splice(list.prev(key), key, value);
        return list.prev(key);
    };
    MutableList.addAfter = function (list, key, value) {
        list.splice(key, list.next(key), value);
        return list.next(key);
    };
    MutableList.push = function (list, value) {
        return MutableList.addBefore(list, null, value);
    };
    MutableList.unshift = function (list, value) {
        return MutableList.addAfter(list, null, value);
    };
    MutableList.delete = function (list, key) {
        if (!list.has(key))
            return;
        var value = list.get(key);
        list.splice(list.prev(key), list.next(key));
        return value;
    };
    MutableList.deleteBefore = function (list, key) {
        return MutableList.delete(list, list.prev(key));
    };
    MutableList.deleteAfter = function (list, key) {
        return MutableList.delete(list, list.next(key));
    };
    MutableList.pop = function (list) {
        return MutableList.deleteBefore(list, null);
    };
    MutableList.shift = function (list) {
        return MutableList.deleteAfter(list, null);
    };
    MutableList.remove = function (list, value) {
        var key = MutableList.keyOf(list, value);
        if (key == null)
            return false;
        delete (list, key);
        return true;
    };
    return MutableList;
})(observable_list_1.ObservableList);
exports.MutableList = MutableList;
exports.default = MutableList;
