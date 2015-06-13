;
export function compose(f, g) {
    return (x) => {
        return f(g(x));
    };
}
;
export default compose;
