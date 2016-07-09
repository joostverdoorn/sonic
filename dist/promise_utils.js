"use strict";
var PromiseUtils;
(function (PromiseUtils) {
    function lazy(executor) {
        var promise;
        function then(onfulfilled, onrejected) {
            if (promise)
                return promise.then(onfulfilled, onrejected);
            return (promise = new Promise(executor)).then(onfulfilled, onrejected);
        }
        return Promise.resolve({ then });
    }
    PromiseUtils.lazy = lazy;
})(PromiseUtils = exports.PromiseUtils || (exports.PromiseUtils = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PromiseUtils;
//# sourceMappingURL=promise_utils.js.map