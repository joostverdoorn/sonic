var Cache = (function () {
    function Cache(list) {
        this._byKey = Object.create(null),
            this._next = Object.create(null),
            this._prev = Object.create(null);
        this._list = list;
    }
    Cache.prototype.has = function (key) {
        return key in this._byKey || this._list.has(key);
    };
    Cache.prototype.get = function (key) {
        if (key in this._byKey)
            return this._byKey[key];
        if (this._list.has(key))
            return this._byKey[key] = this._list.get(key);
        return;
    };
    Cache.prototype.prev = function (key) {
        if (key in this._prev)
            return this._prev[key];
        var prevKey = this._list.prev(key);
        if (prevKey == null)
            prevKey = null;
        this._prev[key] = prevKey;
        this._next[prevKey] = key;
        return prevKey;
    };
    Cache.prototype.next = function (key) {
        if (key === void 0) { key = null; }
        if (key in this._next)
            return this._next[key];
        var nextKey = this._list.next(key);
        if (nextKey == null)
            nextKey = null;
        this._next[key] = nextKey;
        this._prev[nextKey] = key;
        return nextKey;
    };
    return Cache;
})();
exports.default = Cache;
