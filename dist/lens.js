export var Lens;
(function (Lens) {
    function compose(x, y) {
        return {
            get: (a) => y.get(x.get(a)),
            set: (a, c) => x.set(a, y.set(x.get(a), c))
        };
    }
    Lens.compose = compose;
})(Lens || (Lens = {}));
export default Lens;
