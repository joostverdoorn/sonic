;
function compose(f, g) {
    return function (x) {
        return f(g(x));
    };
}
exports.compose = compose;
;
exports.default = compose;
