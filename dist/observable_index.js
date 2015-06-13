import Index from './index';
import { Subject } from './observable';
export class ObservableIndex extends Index {
    constructor(list) {
        super(list);
        this.has = (index) => {
            if (index >= 0 && index < this._byIndex.length)
                return true;
            var next, last = this._byIndex.length - 1;
            while (last != index) {
                next = this._list.next(this._byIndex[last]);
                if (next == null)
                    return false;
                this._byIndex[++last] = next;
                this._byKey[next] = last;
            }
            return true;
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this.onInvalidate = (prev, next) => {
            var prevIndex = this._byKey[prev], length = this._byIndex.length, index = prevIndex;
            while (++index < length)
                delete this._byKey[this._byIndex[index]];
            this._byIndex.splice(prevIndex + 1);
            this._subject.notify(function (observer) {
                observer.onInvalidate(prevIndex, null);
            });
        };
        this._byKey = Object.create(null);
        this._subject = new Subject();
        list.observe(this);
    }
}
export default ObservableIndex;
