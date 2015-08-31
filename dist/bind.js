export function bind(fn, context) {
    return function (...args) { return fn.apply(context, args); };
}
export default bind;
