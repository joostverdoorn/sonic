var unique_id_1 = require('./unique_id');
var Observable = (function () {
    function Observable(fn) {
        var _this = this;
        this.observe = function (observer) {
            var observerId = unique_id_1.default();
            var observers = _this._observers;
            observers[observerId] = observer;
            return {
                unsubscribe: function () { delete observers[observerId]; }
            };
        };
        if (typeof fn == 'function')
            fn(this._notify);
        this._observers = Object.create(null);
    }
    Observable.prototype._notify = function (notifier) {
        for (var observerId in this._observers)
            notifier(this._observers[observerId]);
    };
    return Observable;
})();
exports.Observable = Observable;
exports.default = Observable;
