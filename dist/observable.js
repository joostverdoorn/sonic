import Key from './key';
export class Subject {
    constructor() {
        this._observers = Object.create(null);
    }
    observe(observer) {
        var observerKey = Key.create();
        this._observers[observerKey] = observer;
        return {
            dispose: () => delete this._observers[observerKey]
        };
    }
    onInvalidate(patches) {
        return Promise.all(Object.keys(this._observers).map(key => this._observers[key].onInvalidate(patches))).then(() => { });
    }
}
