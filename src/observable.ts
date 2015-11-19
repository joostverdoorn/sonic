import Key   from './key';
import AsyncIterator from './async_iterator';


export interface Disposable {
  dispose(): void;
}

export interface Observer<T> {
  onNext: (value: T) => void | Promise<void>
  onComplete?: () => void | Promise<void>
  onError?: (reason: any) => void | Promise<void>
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): Disposable;
}

export interface Subject<T> extends Observable<T>, Observer<T> {}

export module Disposable {
  export function create(disposer: () => void): Disposable {
    var done = false;

    return {
      dispose: () => {
        if (done) return;
        done = true;
        disposer();
      }
    }
  }
}

export module Observable {
  export function map<T, U>(observable: Observable<T>, mapFn: (value: T) => U | Promise<U>): Observable<U> {
    const subject = Subject.create();

    observable.subscribe({
      onNext: value => Promise.resolve(mapFn(value)).then(subject.onNext)
    });

    return { subscribe: subject.subscribe };
  }

  export function filter<T>(observable: Observable<T>, filterFn: (value: T) => boolean | Promise<boolean>): Observable<T>  {
    const subject = Subject.create();

    observable.subscribe({
      onNext: value => Promise.resolve(filterFn(value)).then(result => result ? subject.onNext(value) : undefined)
    });

    return { subscribe: subject.subscribe };
  }

  export function scan<T, U>(observable: Observable<T>, scanFn: (memo: U, value: T) => U | Promise<U>, memo: U): Observable<U> {
    const subject = Subject.create();

    observable.subscribe({
      onNext: value => Promise.resolve(scanFn(memo, value)).then(value => { memo = value; subject.onNext(value) })
    });

    return { subscribe: subject.subscribe };
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

    return {next}
  }
}

export module Subject {
  export function isSubject<T>(obj: any): obj is Subject<T> {
    return typeof obj["onNext"] === "function";
  }

  export function create<T>(): Subject<T> {
    const observers: {[key: string]: Observer<T>} = Object.create(null);
    var current = Promise.resolve();

    function subscribe(observer: Observer<T>): Disposable {
      var observerKey = Key.create();
      observers[observerKey] = observer;
      return Disposable.create(() => delete observers[observerKey]);
    }

    async function onNext(value: T): Promise<void> {
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onNext(value))).then(() => {}));
    }

    async function onComplete(): Promise<void> {
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onComplete ? observers[key].onComplete() : undefined)).then(() => {}));
    }

    async function onError(reason: any): Promise<void> {
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onError ? observers[key].onError(reason) : undefined)).then(() => {}));
    }



    return { subscribe, onNext, onComplete, onError };
  }
}
