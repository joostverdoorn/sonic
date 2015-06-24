export class Cache {
    constructor(list) {
        this.get = (key) => {
            if (key in this._byKey)
                return Promise.resolve(this._byKey[key]);
            return this._list.get(key).then(value => this._byKey[key] = value);
        };
        this.prev = (key) => {
            if (key in this._prev)
                return Promise.resolve(this._prev[key]);
            return this._list.prev(key).then(prev => {
                this._prev[key] = prev;
                this._next[prev] = key;
                return prev;
            });
        };
        this.next = (key = null) => {
            if (key in this._next)
                return Promise.resolve(this._next[key]);
            return this._list.next(key).then(next => {
                this._next[key] = next;
                this._prev[next] = key;
                return next;
            });
        };
        this._byKey = Object.create(null),
            this._next = Object.create(null),
            this._prev = Object.create(null);
        this._list = list;
    }
}
export default Cache;
