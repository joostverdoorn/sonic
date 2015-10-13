export var Maybe;
(function (Maybe) {
    Maybe.None = [];
    Maybe.Some = (value) => {
        return [value];
    };
    function isSome(maybe) {
        return maybe && maybe instanceof Array && maybe.length === 1;
    }
    Maybe.isSome = isSome;
    function isNone(maybe) {
        return !isSome(maybe);
    }
    Maybe.isNone = isNone;
    function get(maybe) {
        if (isSome(maybe))
            return maybe[0];
        throw new Error;
    }
    Maybe.get = get;
    function bind(maybe, binder) {
        if (isSome(maybe))
            return Maybe.Some(binder(get(maybe)));
        return Maybe.None;
    }
    Maybe.bind = bind;
})(Maybe || (Maybe = {}));
var x = [];
Maybe.isNone(x) || x;
export default Maybe;
