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
            for (var observerKey in this._observers)
                notifier(this._observers[observerKey]);
        };
        this._observers = Object.create(null);
    }
}
