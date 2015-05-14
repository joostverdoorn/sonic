var id_1 = require('./id');
var Subject = (function () {
    function Subject() {
        var _this = this;
        this.observe = function (observer) {
            var observerId = id_1.default.create();
            _this._observers[observerId] = observer;
            return {
                unsubscribe: function () { delete _this._observers[observerId]; }
            };
        };
        this.notify = function (notifier) {
            for (var observerId in _this._observers)
                notifier(_this._observers[observerId]);
        };
        this._observers = Object.create(null);
    }
    return Subject;
})();
exports.Subject = Subject;
