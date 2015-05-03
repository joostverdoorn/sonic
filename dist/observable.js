import uniqueId from 'unique_id';
export function isObservable(obj) {
    return false;
}
export default class Observable {
    constructor() {
        this._handlers = Object.create(null);
    }
    onInvalidate(handler) {
        var handlerId = uniqueId();
        this._handlers[handlerId] = handler;
        return handlerId;
    }
    removeHandler(handlerId) {
        if (!this._handlers || !this._handlers[handlerId])
            return false;
        delete this._handlers[handlerId];
        return true;
    }
    _invalidate(prev, next) {
        if (!this._handlers)
            return false;
        setTimeout(() => {
            for (var handlerId in this._handlers) {
                var handler = this._handlers[handlerId];
                if (handler(prev, next) === false) {
                    delete this._handlers[handlerId];
                }
            }
        });
    }
}
