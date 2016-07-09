"use strict";
function bind(fn, context) {
    return (...args) => fn.apply(context, args);
}
exports.bind = bind;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = bind;
//# sourceMappingURL=bind.js.map