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
        this.observe(this);
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
        this._subject.notify((observer) => observer.onInvalidate({ type: EventType.add, key, value }));
        return Promise.resolve();
    }
    replace(key, value) {
        this._subject.notify((observer) => observer.onInvalidate({ type: EventType.replace, key, value }));
        return Promise.resolve();
    }
    remove(key) {
        this._subject.notify((observer) => observer.onInvalidate({ type: EventType.remove, key }));
        return Promise.resolve();
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
    }
    ;
}
(function (List) {
    function map(old, mapFn) {
        var list = new List(State.map(old.state, mapFn));
        old.observe({
            onInvalidate(...events) {
                Promise.all(events.map((event) => {
                    return Promise.resolve(mapFn(event.value, event.key)).then((value) => {
                        return { type: event.type, key: event.key, value };
                    });
                })).then((res) => list.onInvalidate(...res));
            }
        });
        return list;
    }
    List.map = map;
})(List || (List = {}));
export default List;
