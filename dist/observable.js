import Key from './key';
export function disposable(disposer) {
    return { dispose: disposer };
}
export class Subject {
    constructor() {
        this.subscribe = (observer) => {
            var observerKey = Key.create();
            this._observers[observerKey] = observer;
            return disposable(() => delete this._observers[observerKey]);
        };
        this.onNext = (value) => {
            return Promise.all(Object.keys(this._observers).map(key => this._observers[key].onNext(value))).then(() => { });
        };
        this._observers = Object.create(null);
    }
}
export var Observable;
(function (Observable) {
    function map(observable, mapFn) {
        const subject = new Subject;
        observable.subscribe({
            onNext: value => Promise.resolve(mapFn(value)).then(subject.onNext)
        });
        return { subscribe: subject.subscribe };
    }
    Observable.map = map;
    function filter(observable, filterFn) {
        const subject = new Subject();
        observable.subscribe({
            onNext: value => Promise.resolve(filterFn(value)).then(result => result ? subject.onNext(value) : undefined)
        });
        return { subscribe: subject.subscribe };
    }
    Observable.filter = filter;
})(Observable || (Observable = {}));
