import State from './state';
import StateIterator from './state_iterator';
import { Subject } from './observable';
import { Patch, Operation } from './patch';
export class List {
    constructor(initial) {
        Object.keys(StateIterator).forEach((key) => this[key] = (...args) => StateIterator[key](this.state, ...args));
        Object.keys(List).forEach((key) => this[key] = (...args) => List[key](this, ...args));
        if (initial != null)
            this.state = initial;
        this._subject = new Subject();
    }
    get get() {
        return this.state.get;
    }
    get prev() {
        return this.state.prev;
    }
    get next() {
        return this.state.next;
    }
    add(key, value) {
        return this.onInvalidate([{ type: Operation[Operation.add], key, value }]);
    }
    replace(key, value) {
        return this.state.get(key).then(old => this.onInvalidate([{ type: Operation[Operation.replace], key, value, oldValue: old }]));
    }
    remove(key) {
        return this.onInvalidate([{ type: Operation[Operation.remove], key }]);
    }
    observe(observer) {
        return this._subject.observe(observer);
    }
    onInvalidate(patches) {
        console.log("Number of events received:", patches.length);
        patches.forEach((patch) => {
            switch (patch.type) {
                case Operation[Operation.add]:
                    this.state = State.add(this.state, patch.key, patch.value);
                    break;
                case Operation[Operation.remove]:
                    this.state = State.remove(this.state, patch.key);
                    break;
                case Operation[Operation.replace]:
                    this.state = State.replace(this.state, patch.key, patch.value);
                    break;
            }
        });
        return Promise.resolve(this._subject.notify(patches));
    }
    ;
}
(function (List) {
    function reverse(old) {
        var state = old.state, list = new List(State.reverse(state));
        old.observe({
            onInvalidate(patches) {
                return Promise.all(patches.map(patch => Patch.reverse(patch, state))).then((res) => list.onInvalidate(res));
            }
        });
        return list;
    }
    List.reverse = reverse;
    function map(old, mapFn) {
        var list = new List(State.map(old.state, mapFn));
        old.observe({
            onInvalidate(patches) {
                return Promise.all(patches.map(patch => Patch.map(patch, mapFn))).then((res) => list.onInvalidate(res));
            }
        });
        return list;
    }
    List.map = map;
    function filter(old, filterFn) {
        var state = old.state, list = new List(State.filter(old.state, filterFn));
        old.observe({
            onInvalidate(patches) {
                return Promise.all(patches.map(patch => Patch.filter(patch, filterFn, state)))
                    .then(res => res.filter(event => event != null))
                    .then((res) => res.length ? list.onInvalidate(res) : undefined);
            }
        });
        return list;
    }
    List.filter = filter;
})(List || (List = {}));
export default List;
