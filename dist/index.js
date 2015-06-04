var Index = (function () {
    function Index(list) {
        var _this = this;
        this.has = function (index) {
            if (index >= 0 && index < _this._byIndex.length)
                return true;
            var next, last = _this._byIndex.length - 1;
            while (last != index) {
                next = _this._list.next(_this._byIndex[last]);
                if (next == null)
                    return false;
                _this._byIndex[++last] = next;
            }
            return true;
        };
        this.get = function (index) {
            return _this.has(index) ? _this._list.get(_this._byIndex[index]) : undefined;
        };
        this.prev = function (index) {
            if (_this.has(index - 1))
                return index - 1;
            if (index == null && _this._byIndex.length)
                return _this._byIndex.length - 1;
            return null;
        };
        this.next = function (index) {
            if (index === void 0) { index = -1; }
            if (_this.has(index + 1))
                return index + 1;
            return null;
        };
        this._byIndex = [];
        this._list = list;
    }
    return Index;
})();
exports.Index = Index;
exports.default = Index;
