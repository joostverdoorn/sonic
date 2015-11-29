import Key   from './key';
import AsyncIterator from './async_iterator';


export interface Disposable {
  dispose(): void;
}

export interface Observer<T> {
  onNext: (value: T) => void | Promise<void>
  onComplete?: (result?: any) => void | Promise<void>
  onError?: (reason?: any) => void | Promise<void>
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): Disposable;
}

export interface Subject<T> extends Observable<T>, Observer<T> {}

export module Disposable {
  export function create(disposer?: () => void): Disposable {
    var done = false;

    return {
      dispose: () => {
        if (done) return;
        done = true;
        if (disposer) disposer();
      }
    }
  }
}

export module Observable {
  export function create<T>(fn?: (subject: Subject<T>) => void) {
    var subject: Subject<T>;

    function subscribe(observer: Observer<T>): Disposable {
      if (!subject) {
        subject = Subject.create();
        if (fn) fn(subject);
      }

      return subject.subscribe(observer);
    }

    return { subscribe };
  }

  export function map<T, U>(observable: Observable<T>, mapFn: (value: T) => U | Promise<U>): Observable<U> {
    return create(subject => {
      observable.subscribe({
        onNext: value => Promise.resolve(mapFn(value)).then(subject.onNext)
      });
    });
  }

  export function filter<T>(observable: Observable<T>, filterFn: (value: T) => boolean | Promise<boolean>): Observable<T>  {
    return create(subject => {
      observable.subscribe({
        onNext: value => Promise.resolve(filterFn(value)).then(result => result ? subject.onNext(value) : undefined)
      });
    });
  }

  export function scan<T, U>(observable: Observable<T>, scanFn: (memo: U, value: T) => U | Promise<U>, memo: U): Observable<U> {
    return create(subject => {
      observable.subscribe({
        onNext: value => Promise.resolve(scanFn(memo, value)).then(value => { memo = value; return subject.onNext(value) })
      });
    });
  }

  export function forEach<T>(observable: Observable<T>, fn: (value: T) => void | Promise<void>): Disposable {
    return observable.subscribe({
      onNext: fn
    });
  }
  export function fromPromise<T>(promise: Promise<T>) {
    return create(subject => {
      promise.then(subject.onNext).then(subject.onComplete);
    });
  }

  export function toPromise<T>(observable: Observable<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      observable.subscribe({
        onNext: resolve,
        onComplete: resolve,
        onError: reject
      });
    });
  }

  export function fromIterator<T>(iterator: Iterator<T> | AsyncIterator<T>): Observable<T> {
    var subject = Subject.create<T>();

    AsyncIterator.forEach(iterator, subject.onNext);

    return {subscribe: subject.subscribe};
  }

  export function toIterator<T>(observable: Observable<T>): AsyncIterator<T> {
    type Deferred<U> = {
      resolve(value: U | PromiseLike<U>): void
      reject(reason: any): void
      promise: Promise<U>
    }

    function defer<U>(): Deferred<U> {
      var resolve: (value: U | PromiseLike<U>) => void,
          reject: (reason: any) => void,
          promise = new Promise<U>((res, rej) => {
            resolve = res;
            reject = rej;
          });

      return {resolve, reject, promise};
    }

    var values: T[] = [];
    var deferreds: Deferred<IteratorResult<T>>[] = [];
    var done = false;
    var errored = false;
    var error: any;

    observable.subscribe({
      onNext(value: T) {
        if (deferreds.length) deferreds.pop().resolve({done: false, value});
        else values.push(value);
      },

      onComplete() {
        if (deferreds.length) deferreds.pop().resolve({done: true});
        done = true;
      },

      onError(reason: any) {
        if (deferreds.length) deferreds.pop().reject(reason);
        errored = true
        error = reason;
      }
    });

    async function next(): Promise<IteratorResult<T>> {
      if (done && !values.length) return {done: true};
      if (errored && !values.length) throw error;
      if (values.length) return {done: false, value: values.shift() }

      var deferred = defer<IteratorResult<T>>();
      deferreds.push(deferred);
      return deferred.promise;
    }

    return AsyncIterator.create(next);
  }

}

export module Subject {
  export function isSubject<T>(obj: any): obj is Subject<T> {
    return typeof obj["onNext"] === "function";
  }

  export function create<T>(): Subject<T> {
    var observers: {[key: string]: Observer<T>} = Object.create(null),
        current = Promise.resolve(),
        completed = false,
        result: any,
        errored = false,
        error: any;

    function subscribe(observer: Observer<T>): Disposable {
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

    async function onNext(value: T): Promise<void> {
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onNext(value))).then(() => {}));
    }

    async function onComplete(res?: any): Promise<void> {
      completed = true;
      result = res;
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onComplete ? observers[key].onComplete(res) : undefined)).then(() => {observers = null;}));
    }

    async function onError(reason?: any): Promise<void> {
      errored = true;
      error = reason;
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onError ? observers[key].onError(reason) : undefined)).then(() => {observers = null;}));
    }

    return { subscribe, onNext, onComplete, onError };
  }
}
