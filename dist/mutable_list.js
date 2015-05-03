import { utilities as listUtilities } from 'list';
export var utilities;
(function (utilities) {
    function push(list, value) {
        list.splice(list.prev(), null, value);
        return list.prev();
    }
    utilities.push = push;
    function unshift(list, value) {
        list.splice(list.next(), null, value);
        return list.next();
    }
    utilities.unshift = unshift;
    function pop(list) {
        var value = list.get(list.prev());
        list.splice(list.prev(list.prev()), null);
        return value;
    }
    utilities.pop = pop;
    function shift(list) {
        var value = list.get(list.next());
        list.splice(list.next(list.next()), null);
        return value;
    }
    utilities.shift = shift;
    function del(list, id) {
        if (!list.has(id))
            return false;
        return list.splice(list.prev(id), list.next(id));
    }
    utilities.del = del;
    function remove(list, value) {
        var id = listUtilities.idOf(list, value);
        return delete (list, id);
    }
    utilities.remove = remove;
    function flatMap(list, getFn, setFn) {
        return null;
    }
    utilities.flatMap = flatMap;
    function map(list, getFn, setFn) {
        return null;
    }
    utilities.map = map;
})(utilities || (utilities = {}));
