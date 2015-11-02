import Key from './key';
export var Disposable;
(function (Disposable) {
    function create(disposer) {
        var done = false;
        return {
            dispose: () => {
                if (done)
                    return;
                done = true;
                disposer();
            }
        };
    }
    Disposable.create = create;
})(Disposable || (Disposable = {}));
export var Observable;
(function (Observable) {
    function map(observable, mapFn) {
        const subject = Subject.create();
        observable.subscribe({
            onNext: value => Promise.resolve(mapFn(value)).then(subject.onNext)
        });
        return { subscribe: subject.subscribe };
    }
    Observable.map = map;
    function filter(observable, filterFn) {
        const subject = Subject.create();
        observable.subscribe({
            onNext: value => Promise.resolve(filterFn(value)).then(result => result ? subject.onNext(value) : undefined)
        });
        return { subscribe: subject.subscribe };
    }
    Observable.filter = filter;
    function scan(observable, scanFn, memo) {
        const subject = Subject.create();
        observable.subscribe({
            onNext: value => Promise.resolve(scanFn(memo, value)).then(value => { memo = value; subject.onNext(value); })
        });
        return { subscribe: subject.subscribe };
    }
    Observable.scan = scan;
})(Observable || (Observable = {}));
export var Subject;
(function (Subject) {
    function create() {
        const observers = Object.create(null);
        var current = Promise.resolve();
        function subscribe(observer) {
            var observerKey = Key.create();
            observers[observerKey] = observer;
            return Disposable.create(() => delete observers[observerKey]);
        }
        function onNext(value) {
            return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onNext(value))).then(() => { }));
        }
        return { subscribe, onNext };
    }
    Subject.create = create;
})(Subject || (Subject = {}));
//# sourceMappingURL=observable.js.map