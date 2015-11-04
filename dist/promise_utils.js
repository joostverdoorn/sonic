// type Just<V> = [V];
// type Nothing<V> = Array<V> & { 0: void }
// type Maybe<V> = Just<V> | Nothing<V>;
export var PromiseUtils;
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
})(PromiseUtils || (PromiseUtils = {}));
export default PromiseUtils;

//# sourceMappingURL=promise_utils.js.map
