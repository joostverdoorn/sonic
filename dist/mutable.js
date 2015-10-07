import { Subject } from './observable';
import { Patch } from './patch';
import { factory as ListFactory } from './list';
import StateIterator from './state_iterator';
export var Mutable;
(function (Mutable) {
    function splice(mutable, range, values) {
        var reduceFn = (memo, value, key) => {
            return Promise.resolve(memo).then(() => set(mutable, key, value, range[1]));
        };
        return StateIterator.reduce(values, reduceFn, StateIterator.every(mutable.state, (value, key) => del(mutable, key).then(() => true)).then(() => { }));
    }
    Mutable.splice = splice;
    function set(mutable, key, value, before) {
        var patch = {
            operation: Patch.SET,
            key,
            value
        };
        if (before !== undefined)
            patch.before = before;
        return mutable.modify(patch);
    }
    Mutable.set = set;
    function del(mutable, key) {
        var patch = {
            operation: Patch.DELETE,
            key
        };
        return mutable.modify(patch);
    }
    Mutable.del = del;
})(Mutable || (Mutable = {}));
export var factory;
(function (factory) {
    function create(state) {
        const subject = new Subject, list = ListFactory.create(state, subject);
        return {
            get state() { return list.state; },
            subscribe: list.subscribe,
            // onNext: subject.onNext,
            modify: (patch) => subject.onNext(patch)
        };
    }
    factory.create = create;
})(factory || (factory = {}));
export default Mutable;
