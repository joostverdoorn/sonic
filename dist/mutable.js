import { Subject } from './observable';
import { Patch } from './patch';
import { factory as StateFactory } from './state';
import List, { factory as ListFactory } from './list';
import StateIterator from './state_iterator';
import XHR from './xhr';
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
    function compose(parent, lens) {
        var subject = new Subject, list = List.map(ListFactory.create(parent.state, subject), lens.get);
        return {
            get state() { return list.state; },
            subscribe: list.subscribe,
            modify: (patch) => {
                if (Patch.isSetPatch(patch)) {
                    if (patch.before !== undefined)
                        return parent.modify({
                            operation: patch.operation,
                            key: patch.key,
                            value: lens.set(undefined, patch.value),
                            before: patch.before
                        });
                    return parent.state.get(patch.key).then(value => parent.modify({
                        operation: patch.operation,
                        key: patch.key,
                        value: lens.set(value, patch.value)
                    })).then(() => subject.onNext(patch));
                }
                return parent.modify(patch).then(() => subject.onNext(patch));
            }
        };
    }
    Mutable.compose = compose;
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
    function fromURL(urlRoot) {
        const subject = new Subject(), list = ListFactory.create(StateFactory.fromURL(urlRoot), subject);
        return {
            get state() { return list.state; },
            subscribe: subject.subscribe,
            modify: (patch) => new Promise((resolve) => {
                if (Patch.isSetPatch(patch)) {
                    if (patch.before !== undefined)
                        return resolve(XHR.post(urlRoot, patch.value));
                    return resolve(XHR.put(urlRoot + "/" + patch.key, patch.value));
                }
                return resolve(XHR.delete(urlRoot + "/" + patch.key));
            }).then(() => subject.onNext(patch))
        };
    }
    factory.fromURL = fromURL;
})(factory || (factory = {}));
export default Mutable;
