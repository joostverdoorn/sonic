import ObservableCache from './observable_cache';
export class MutableCache extends ObservableCache {
    constructor(list) {
        super(list);
        this.set = (key, value) => {
            return this._list.set(key, value);
        };
        this.splice = (prev, next, ...values) => {
            return this._list.splice(prev, next, ...values);
        };
    }
}
export default MutableCache;
