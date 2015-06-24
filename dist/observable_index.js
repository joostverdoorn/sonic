import Index from './index';
import { ListSubject } from './observable_list';
export class ObservableIndex extends Index {
    constructor(list) {
        super(list);
        this._add = (key, index) => {
            this._byIndex[index] = key;
            this._byKey[key] = index;
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this.onInvalidate = (prev, next) => {
            var prevIndex = this._byKey[prev], length = this._byIndex.length, index = prevIndex;
            while (++index < length)
                delete this._byKey[this._byIndex[index]];
            this._byIndex.splice(prevIndex + 1);
            this._subject.onInvalidate(prevIndex, null);
        };
        this._byKey = Object.create(null);
        this._subject = new ListSubject();
        list.observe(this);
    }
}
export default ObservableIndex;
