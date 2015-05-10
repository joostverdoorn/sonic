var i_list_1 = require('./i_list');
var IMutableList;
(function (IMutableList) {
    function isMutableList(obj) {
        return i_list_1.default.isList(obj) && !!obj['set'] && !!obj['splice'];
    }
    IMutableList.isMutableList = isMutableList;
    function create(list) {
        var obj = Object.create(i_list_1.default.create(list));
        Object.keys(i_list_1.default).forEach(function (key) {
            obj[key] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var res = i_list_1.default[key].apply(i_list_1.default, [obj].concat(args));
                if (isMutableList(res)) {
                    return create(res);
                }
                else if (i_list_1.default.isList(res)) {
                    return i_list_1.default.create(res);
                }
                else {
                    return res;
                }
            };
        });
        return obj;
    }
    IMutableList.create = create;
    function push(list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    }
    IMutableList.push = push;
    function unshift(list, value) {
        list.splice(list.next(), null, value);
        return list.next();
    }
    IMutableList.unshift = unshift;
    function pop(list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    }
    IMutableList.pop = pop;
    function shift(list) {
        var value = list.get(list.next());
        list.splice(list.next(list.next()), null);
        return value;
    }
    IMutableList.shift = shift;
    function del(list, id) {
        if (!list.has(id))
            return false;
        return list.splice(list.prev(id), list.next(id));
    }
    IMutableList.del = del;
    function remove(list, value) {
        var id = i_list_1.default.idOf(list, value);
        return delete (list, id);
    }
    IMutableList.remove = remove;
    function flatMap(list, getFn, setFn) {
        return null;
    }
    IMutableList.flatMap = flatMap;
    function map(list, getFn, setFn) {
        return null;
    }
    IMutableList.map = map;
})(IMutableList || (IMutableList = {}));
exports.default = IMutableList;
