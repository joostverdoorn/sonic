import KeyBy from './key_by';
import { Subject } from './observable';
export class ObservableKeyBy extends KeyBy {
    constructor(list, keyFn) {
        super(list, keyFn);
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this.onInvalidate = (prev, next) => {
            this._subject.notify(function (observer) {
                observer.onInvalidate(this._keyBySourceKey[prev], this._keyBySourceKey[next]);
            });
        };
        this._subject = new Subject();
        list.observe(this);
    }
}
export default ObservableKeyBy;
