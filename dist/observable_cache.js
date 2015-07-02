import Cache from './cache';
import { ListSubject } from './observable_list';
export class ObservableCache extends Cache {
    constructor(list) {
        super(list);
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this.onInvalidate = (prev, next) => {
            var key;
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
            this._subject.onInvalidate(prev, next);
        };
        this._subject = new ListSubject();
        list.observe(this);
    }
}
export default ObservableCache;
