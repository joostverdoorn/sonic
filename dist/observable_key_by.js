var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var key_by_1 = require('./key_by');
var observable_1 = require('./observable');
var ObservableKeyBy = (function (_super) {
    __extends(ObservableKeyBy, _super);
    function ObservableKeyBy(list, keyFn) {
        var _this = this;
        _super.call(this, list, keyFn);
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            _this._subject.notify(function (observer) {
                observer.onInvalidate(this._keyBySourceKey[prev], this._keyBySourceKey[next]);
            });
        };
        this._subject = new observable_1.Subject();
        list.observe(this);
    }
    return ObservableKeyBy;
})(key_by_1.default);
exports.ObservableKeyBy = ObservableKeyBy;
exports.default = ObservableKeyBy;
