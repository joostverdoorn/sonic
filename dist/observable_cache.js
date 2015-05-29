var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cache_1 = require('./cache');
var ObservableCache = (function (_super) {
    __extends(ObservableCache, _super);
    function ObservableCache(list) {
        var _this = this;
        _super.call(this, list);
        list.observe({
            onInvalidate: function (prev, next) {
                var key;
                key = prev;
                while ((key = _this._next[key]) !== undefined) {
                    delete _this._next[_this._prev[key]];
                    delete _this._prev[key];
                    if (key == next)
                        break;
                    delete _this._byKey[key];
                }
                while ((key = _this._prev[key]) !== undefined) {
                    delete _this._prev[_this._next[key]];
                    delete _this._next[key];
                    if (key == prev)
                        break;
                    delete _this._byKey[key];
                }
            }
        });
    }
    ObservableCache.prototype.observe = function (observer) {
        return this._list.observe(observer);
    };
    return ObservableCache;
})(cache_1.default);
exports.default = ObservableCache;
