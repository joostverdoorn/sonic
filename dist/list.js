import State from './state';
import StateIterator from './state_iterator';
import { Subject } from './observable';
export var EventType;
(function (EventType) {
    EventType[EventType["add"] = 0] = "add";
    EventType[EventType["remove"] = 1] = "remove";
    EventType[EventType["replace"] = 2] = "replace";
})(EventType || (EventType = {}));
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
        return this.onInvalidate({ type: EventType.add, key, value });
    }
    replace(key, value) {
        return this.state.get(key).then(old => this.onInvalidate({ type: EventType.replace, key, value, oldValue: old }));
    }
    remove(key) {
        return this.onInvalidate({ type: EventType.remove, key });
    }
    observe(observer) {
        return this._subject.observe(observer);
    }
    onInvalidate(...events) {
        events.forEach((event) => {
            switch (event.type) {
                case EventType.add:
                    this.state = State.add(this.state, event.key, event.value);
                    break;
                case EventType.remove:
                    this.state = State.remove(this.state, event.key);
                    break;
                case EventType.replace:
                    this.state = State.replace(this.state, event.key, event.value);
                    break;
            }
        });
        return Promise.resolve(this._subject.notify((observer) => observer.onInvalidate(...events)));
    }
    ;
}
(function (List) {
    // export function cache<V>(old: List<V>): List<V> {
    //   return new Cache(old);
    // }
    function map(old, mapFn) {
        var list = new List(State.map(old.state, mapFn));
        old.observe({
            onInvalidate(...events) {
                return Promise.all(events.map((event) => {
                    return Promise.resolve(mapFn(event.value, event.key)).then((value) => {
                        return { type: event.type, key: event.key, value };
                    });
                })).then((res) => list.onInvalidate(...res));
            }
        });
        return list;
    }
    List.map = map;
    function filter(old, filterFn) {
        var state = State.filter(old.state, filterFn), list = new List(state);
        old.observe({
            onInvalidate(...events) {
                return Promise.all(events
                    .map((event) => {
                    if (event.type == EventType.add && filterFn(event.value, event.key))
                        return Promise.resolve(event);
                    if (event.type == EventType.replace) {
                        if (filterFn(event.oldValue, event.key) && (!filterFn(event.value, event.key))) {
                            return Promise.resolve({ type: EventType.remove, key: event.key });
                        }
                        if ((!filterFn(event.oldValue, event.key)) && (filterFn(event.value, event.key))) {
                            return Promise.resolve({ type: EventType.add, key: event.key, value: event.value });
                        }
                        if (filterFn(event.oldValue, event.key) && filterFn(event.value, event.key)) {
                            return event;
                        }
                    }
                    if (event.type == EventType.remove) {
                        return state.get(event.key).then(value => filterFn(value, event.key) ? event : null, () => { });
                    }
                    return null;
                }))
                    .then((res) => list.onInvalidate(...res.filter(event => event != null)));
            }
        });
        return list;
    }
    List.filter = filter;
})(List || (List = {}));
export default List;
