export function bind(fn, context) {
    return (...args) => fn.apply(context, args);
}
export default bind;
//# sourceMappingURL=bind.js.map