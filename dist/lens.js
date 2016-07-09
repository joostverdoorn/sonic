"use strict";
const state_1 = require('./state');
const store_1 = require('./store');
const observable_1 = require('./observable');
var Lens;
(function (Lens) {
    function compose(parent, lens) {
        var getSubject = observable_1.Subject.create(), setSubject = observable_1.Subject.create();
        observable_1.Observable.map(parent.dispatcher, patch => {
            if (patch.added)
                return { range: patch.range, added: state_1.default.map(patch.added, lens.get) };
            return { range: patch.range };
        }).subscribe(getSubject);
        observable_1.Observable.map(setSubject, patch => {
            if (patch.added)
                return { range: patch.range, added: state_1.default.map(patch.added, lens.set) };
            return { range: patch.range };
        }).subscribe(parent.dispatcher);
        return store_1.Store.create(state_1.default.map(parent.state, lens.get), { subscribe: getSubject.subscribe, onNext: setSubject.onNext });
    }
    Lens.compose = compose;
})(Lens = exports.Lens || (exports.Lens = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Lens;
//# sourceMappingURL=lens.js.map