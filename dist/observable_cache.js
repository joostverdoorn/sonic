import Cache from './cache';
import { ListSubject } from './observable_list';
export class ObservableCache extends Cache {
    constructor(list) {
        super(list);
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this.onInvalidate = (range) => {
            if (!Array.isArray(range)) {
                var prev = this._prev[range], next = this._next[range];
                if (prev != null) {
                    delete this._next[prev];
                    delete this._prev[range];
                }
                if (next != null) {
                    delete this._prev[next];
                    delete this._next[range];
                }
                return this._subject.onInvalidate(range);
            }
            var [prev, next] = range, key;
            key = prev;
            while ((key = this._next[key]) !== undefined) {
                delete this._next[this._prev[key]];
                delete this._prev[key];
                if (key == next)
                    break;
                delete this._byKey[key];
            }
            key = next;
            while ((key = this._prev[key]) !== undefined) {
                delete this._prev[this._next[key]];
                delete this._next[key];
                if (key == prev)
                    break;
                delete this._byKey[key];
            }
            this._subject.onInvalidate(range);
        };
        this._subject = new ListSubject();
        list.observe(this);
    }
}
export default ObservableCache;
