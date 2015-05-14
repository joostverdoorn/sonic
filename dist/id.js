var Id;
(function (Id) {
    function key(id) {
        return id.toString();
    }
    Id.key = key;
    function get(id, index) {
        if (id instanceof Array)
            return id[index];
        if (index == 0)
            return id;
        return;
    }
    Id.get = get;
    function head(id) {
        return get(id, 0);
    }
    Id.head = head;
    function tail(id) {
        return id instanceof Array ? id.slice(1, id.length) : [];
    }
    Id.tail = tail;
    function append(a, b) {
        return [].concat(a).concat(b);
    }
    Id.append = append;
})(Id = exports.Id || (exports.Id = {}));
exports.default = Id;
