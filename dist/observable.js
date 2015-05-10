var unique_id_1 = require('./unique_id');
function isObservable(obj) {
    return false;
}
exports.isObservable = isObservable;
var Observable = (function () {
    function Observable() {
        this._observers = Object.create(null);
    }
    Observable.prototype.subscribe = function (observer) {
        var observerId = unique_id_1.default();
        var observers = this._observers;
        observers[observerId] = observer;
        return {
            unsubscribe: function () { delete observers[observerId]; }
        };
    };
    Observable.prototype._invalidate = function (prev, next) {
        for (var observerId in this._observers) {
            this._observers[observerId];
        }
    };
    return Observable;
})();
exports.Observable = Observable;
exports.default = Observable;
