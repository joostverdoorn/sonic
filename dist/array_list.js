import Observable from 'observable';
export default class ArrayList extends Observable {
    constructor(source = []) {
        super();
        this._source = source;
    }
    has(id) {
        return -1 < id && id < this._source.length;
    }
    get(id) {
        if (this.has(id))
            return this._source[id];
        return;
    }
    prev(id) {
        if (this._source.length > 0 && id != null && this.has(id) && this.has(id - 1))
            return id - 1;
        return null;
    }
    next(id) {
        if (this._source.length > 0 && id != null && this.has(id) && this.has(id + 1))
            return id + 1;
        return null;
    }
    set(id, value) {
        if (!this.has(id))
            return false;
        this._source[id] = value;
    }
    splice(prev, next, ...values) {
        if (prev == null)
            prev = -1;
        else if (!this.has(prev))
            return false;
        if (next == null)
            next = this._source.length;
        else if (!this.has(next))
            return false;
        this._source.splice(prev + 1, next - prev - 1, ...values);
        this._invalidate(prev, null);
        return true;
    }
    _invalidate(prev, next) {
        if (!this.has(prev))
            prev = null;
        if (!this.has(next))
            next = null;
        return super._invalidate(prev, next);
    }
}
