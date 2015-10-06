import Key from './key';
export function disposable(disposer) {
    return { dispose: disposer };
}
export class Subject {
    constructor() {
        this._observers = Object.create(null);
    }
    observe(observer) {
        var observerKey = Key.create();
        this._observers[observerKey] = observer;
        return disposable(() => delete this._observers[observerKey]);
    }
    onInvalidate(patches) {
        return Promise.all(Object.keys(this._observers).map(key => this._observers[key].onInvalidate(patches))).then(() => { });
    }
}
