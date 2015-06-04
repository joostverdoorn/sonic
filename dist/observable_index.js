var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var index_1 = require('./index');
var observable_1 = require('./observable');
var ObservableIndex = (function (_super) {
    __extends(ObservableIndex, _super);
    function ObservableIndex(list) {
        var _this = this;
        _super.call(this, list);
        this.has = function (index) {
            if (index >= 0 && index < _this._byIndex.length)
                return true;
            var next, last = _this._byIndex.length - 1;
            while (last != index) {
                next = _this._list.next(_this._byIndex[last]);
                if (next == null)
                    return false;
                _this._byIndex[++last] = next;
                _this._byKey[next] = last;
            }
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            var prevIndex = _this._byKey[prev], length = _this._byIndex.length, index = prevIndex;
            while (++index < length)
                delete _this._byKey[_this._byIndex[index]];
            _this._byIndex.splice(prevIndex + 1);
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prevIndex, null);
            });
        };
        this._byKey = Object.create(null);
        this._subject = new observable_1.Subject();
        list.observe(this);
    }
    return ObservableIndex;
})(index_1.default);
exports.ObservableIndex = ObservableIndex;
exports.default = ObservableIndex;
