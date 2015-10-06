import List from './list';
import { Operation } from './patch';
export class Cache extends List {
    constructor(list) {
        super();
        this._list = list;
        this._get = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        list.observe(this);
    }
    get state() {
        var _get = this._get, _prev = this._prev, _next = this._next, old = this._list.state;
        var state = {
            get: (key) => {
                if (_get[key] == Cache.DELETED)
                    return Promise.reject(new Error);
                return _get[key] == null ? (old.get(key).then((res) => _get[key] = res)) : Promise.resolve(_get[key]);
            },
            prev: (key) => {
                return _prev[key] == null ? (old.prev(key).then((res) => (_next[res] = key, _prev[key] = res))) : Promise.resolve(_prev[key]);
            },
            next: (key) => {
                return _next[key] == null ? (old.next(key).then((res) => (_prev[res] = key, _next[key] = res))) : Promise.resolve(_next[key]);
            }
        };
        return state;
    }
    onInvalidate(patches) {
        this._get = Object.create(this._get);
        this._prev = Object.create(this._prev);
        this._next = Object.create(this._next);
        patches.forEach((event) => {
            var key = event.key, value = event.value;
            switch (event.type) {
                case Operation[Operation.add]:
                    this._get[key] = value;
                    var prev = this._prev['null'], next = null;
                    this._prev[next] = key;
                    this._next[key] = next;
                    this._prev[key] = prev;
                    this._next[prev] = key;
                    break;
                case Operation[Operation.remove]:
                    this._get[key] = Cache.DELETED;
                    var prev = this._prev[key], next = this._next[key];
                    this._prev[next] = prev;
                    this._next[prev] = next;
                    break;
                case Operation[Operation.replace]:
                    this._get[key] = value;
                    break;
            }
        });
        return this._subject.notify(patches);
    }
}
Cache.DELETED = {};
export default Cache;
