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
        this.notify = (patches) => {
            return Promise.all(Object.keys(this._observers).map(key => this._observers[key].onInvalidate(patches))).then(() => { });
            // for(var observerKey in this._observers) notifier(this._observers[observerKey]);
        };
        this._observers = Object.create(null);
    }
}
