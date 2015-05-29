var key_1 = require('./key');
var Subject = (function () {
    function Subject() {
        var _this = this;
        this.observe = function (observer) {
            var observerKey = key_1.default.create();
            _this._observers[observerKey] = observer;
            return {
                unsubscribe: function () { delete _this._observers[observerKey]; }
            };
        };
        this.notify = function (notifier) {
            for (var observerKey in _this._observers)
                notifier(_this._observers[observerKey]);
        };
        this._observers = Object.create(null);
    }
    return Subject;
})();
exports.Subject = Subject;
