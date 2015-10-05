import Key from './key';
export class Subject {
    constructor() {
        this.observe = (observer) => {
            var observerKey = Key.create();
            this._observers[observerKey] = observer;
            return {
                unsubscribe: () => { delete this._observers[observerKey]; }
            };
        };
        this.notify = (notifier) => {
            return Promise.all(Object.keys(this._observers).map(key => notifier(this._observers[key]))).then(() => { });
            // for(var observerKey in this._observers) notifier(this._observers[observerKey]);
        };
        this._observers = Object.create(null);
    }
}
