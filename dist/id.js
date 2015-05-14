var Id;
(function (Id) {
    var uniqueId = 0;
    function key(id) {
        return id.toString();
    }
    Id.key = key;
    function create() {
        return uniqueId++;
    }
    Id.create = create;
})(Id || (Id = {}));
exports.default = Id;
