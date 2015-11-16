var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
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