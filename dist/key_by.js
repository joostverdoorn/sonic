var KeyBy = (function () {
    function KeyBy(list, keyFn) {
        var _this = this;
        this.has = function (key) {
            if (key in _this._sourceKeyByKey)
                return true;
            var last = null;
            while ((last = _this.next(last)) != null)
                if (last == key)
                    return true;
            return false;
        };
        this.get = function (key) {
            return _this.has(key) ? _this._list.get(_this._sourceKeyByKey[key]) : undefined;
        };
        this.prev = function (key) {
            if (_this.has(key) || key == null)
                return _this._keyBySourceKey[_this._list.prev(_this._sourceKeyByKey[key])];
        };
        this.next = function (key) {
            if (key === void 0) { key = null; }
            var sourceKey, sourceNext, res;
            if (key in _this._sourceKeyByKey)
                sourceKey = _this._sourceKeyByKey[key];
            else
                sourceKey = null;
            while (key != null && !(key in _this._sourceKeyByKey)) {
                sourceKey = _this._list.next(sourceKey);
                if (!(sourceKey in _this._keyBySourceKey)) {
                    if (sourceKey == null)
                        return null;
                    res = _this._keyFn(_this._list.get(sourceKey), sourceKey);
                    _this._keyBySourceKey[sourceKey] = res;
                    _this._sourceKeyByKey[res] = sourceKey;
                    if (res == key)
                        break;
                }
            }
            sourceKey = _this._list.next(sourceKey);
            if (sourceKey == null)
                return null;
            res = _this._keyFn(_this._list.get(sourceKey), sourceKey);
            _this._keyBySourceKey[sourceKey] = res;
            _this._sourceKeyByKey[res] = sourceKey;
            return res;
        };
        this._list = list;
        this._keyFn = keyFn;
        this._sourceKeyByKey = Object.create(null);
        this._keyBySourceKey = Object.create(null);
    }
    return KeyBy;
})();
exports.KeyBy = KeyBy;
exports.default = KeyBy;
