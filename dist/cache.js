var Cache = (function () {
    function Cache(list) {
        var _this = this;
        this.has = function (key) {
            return key in _this._byKey || _this._list.has(key);
        };
        this.get = function (key) {
            if (key in _this._byKey)
                return _this._byKey[key];
            if (_this._list.has(key))
                return _this._byKey[key] = _this._list.get(key);
            return;
        };
        this.prev = function (key) {
            if (key in _this._prev)
                return _this._prev[key];
            var prevKey = _this._list.prev(key);
            if (prevKey == null)
                prevKey = null;
            _this._prev[key] = prevKey;
            _this._next[prevKey] = key;
            return prevKey;
        };
        this.next = function (key) {
            if (key === void 0) { key = null; }
            if (key in _this._next)
                return _this._next[key];
            var nextKey = _this._list.next(key);
            if (nextKey == null)
                nextKey = null;
            _this._next[key] = nextKey;
            _this._prev[nextKey] = key;
            return nextKey;
        };
        this._byKey = Object.create(null),
            this._next = Object.create(null),
            this._prev = Object.create(null);
        this._list = list;
    }
    return Cache;
})();
exports.Cache = Cache;
exports.default = Cache;
