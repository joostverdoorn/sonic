var unique_id_1 = require('./unique_id');
var Observable = (function () {
    function Observable() {
        this._observers = Object.create(null);
    }
    Observable.prototype.observe = function (observer) {
        var observerId = unique_id_1.default();
        var observers = this._observers;
        observers[observerId] = observer;
        return {
            unsubscribe: function () { delete observers[observerId]; }
        };
    };
    Observable.prototype._notify = function (notifier) {
        for (var observerId in this._observers)
            notifier(this._observers[observerId]);
    };
    return Observable;
})();
exports.Observable = Observable;
