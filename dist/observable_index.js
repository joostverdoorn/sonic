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
        this.onInvalidate = (range) => {
            var index, length = this._byIndex.length;
            var index = Array.isArray(range) ? this._byKey[range[0]] : this._byKey[range];
            while (index++ < length)
                delete this._byKey[this._byIndex[index]];
            this._byIndex.splice(index);
            this._subject.onInvalidate([index == 0 ? null : index - 1, null]);
        };
        this._byKey = Object.create(null);
        this._subject = new ListSubject();
        list.observe(this);
    }
}
export default ObservableIndex;
