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
import AsyncIterator from './async_iterator';
export var Disposable;
(function (Disposable) {
    function create(disposer) {
        var done = false;
        return {
            dispose: () => {
                if (done)
                    return;
                done = true;
                if (disposer)
                    disposer();
            }
        };
    }
    Disposable.create = create;
})(Disposable || (Disposable = {}));
export var Observable;
(function (Observable) {
    function create(fn) {
        var subject;
        function subscribe(observer) {
            if (!subject) {
                subject = Subject.create();
                if (fn)
                    fn(subject);
            }
            return subject.subscribe(observer);
        }
        return { subscribe };
    }
    Observable.create = create;
    function map(observable, mapFn) {
        return create(subject => {
            observable.subscribe({
                onNext: value => Promise.resolve(mapFn(value)).then(subject.onNext)
            });
        });
    }
    Observable.map = map;
    function filter(observable, filterFn) {
        return create(subject => {
            observable.subscribe({
                onNext: value => Promise.resolve(filterFn(value)).then(result => result ? subject.onNext(value) : undefined)
            });
        });
    }
    Observable.filter = filter;
    function scan(observable, scanFn, memo) {
        return create(subject => {
            observable.subscribe({
                onNext: value => Promise.resolve(scanFn(memo, value)).then(value => { memo = value; return subject.onNext(value); })
            });
        });
    }
    Observable.scan = scan;
    function forEach(observable, fn) {
        return observable.subscribe({
            onNext: fn
        });
    }
    Observable.forEach = forEach;
    function fromPromise(promise) {
        return create(subject => {
            promise.then(subject.onNext).then(subject.onComplete);
        });
    }
    Observable.fromPromise = fromPromise;
    function toPromise(observable) {
        return new Promise((resolve, reject) => {
            observable.subscribe({
                onNext: resolve,
                onComplete: resolve,
                onError: reject
            });
        });
    }
    Observable.toPromise = toPromise;
    function fromIterator(iterator) {
        var subject = Subject.create();
        AsyncIterator.forEach(iterator, subject.onNext);
        return { subscribe: subject.subscribe };
    }
    Observable.fromIterator = fromIterator;
    function toIterator(observable) {
        function defer() {
            var resolve, reject, promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            return { resolve, reject, promise };
        }
        var values = [];
        var deferreds = [];
        var done = false;
        var errored = false;
        var error;
        observable.subscribe({
            onNext(value) {
                if (deferreds.length)
                    deferreds.pop().resolve({ done: false, value });
                else
                    values.push(value);
            },
            onComplete() {
                if (deferreds.length)
                    deferreds.pop().resolve({ done: true });
                done = true;
            },
            onError(reason) {
                if (deferreds.length)
                    deferreds.pop().reject(reason);
                errored = true;
                error = reason;
            }
        });
        function next() {
            return __awaiter(this, void 0, Promise, function* () {
                if (done && !values.length)
                    return { done: true };
                if (errored && !values.length)
                    throw error;
                if (values.length)
                    return { done: false, value: values.shift() };
                var deferred = defer();
                deferreds.push(deferred);
                return deferred.promise;
            });
        }
        return AsyncIterator.create(next);
    }
    Observable.toIterator = toIterator;
})(Observable || (Observable = {}));
export var Subject;
(function (Subject) {
    function isSubject(obj) {
        return typeof obj["onNext"] === "function";
    }
    Subject.isSubject = isSubject;
    function create() {
        var observers = Object.create(null), current = Promise.resolve(), completed = false, result, errored = false, error;
        function subscribe(observer) {
            if (completed) {
                Promise.resolve(() => observer.onComplete(result));
                return Disposable.create();
            }
            if (errored) {
                Promise.resolve(() => observer.onError(error));
                return Disposable.create();
            }
            var observerKey = Key.unique();
            observers[observerKey] = observer;
            return Disposable.create(() => delete observers[observerKey]);
        }
        function onNext(value) {
            return __awaiter(this, void 0, Promise, function* () {
                return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onNext(value))).then(() => { }));
            });
        }
        function onComplete(res) {
            return __awaiter(this, void 0, Promise, function* () {
                completed = true;
                result = res;
                return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onComplete ? observers[key].onComplete(res) : undefined)).then(() => { observers = null; }));
            });
        }
        function onError(reason) {
            return __awaiter(this, void 0, Promise, function* () {
                errored = true;
                error = reason;
                return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onError ? observers[key].onError(reason) : undefined)).then(() => { observers = null; }));
            });
        }
        return { subscribe, onNext, onComplete, onError };
    }
    Subject.create = create;
})(Subject || (Subject = {}));
//# sourceMappingURL=observable.js.map