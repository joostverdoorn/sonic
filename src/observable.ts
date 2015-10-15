import Key   from './key';

export interface Disposable {
  dispose(): void;
}

export interface Observer<T> {
  onNext: (value: T) => void | Promise<void>
  onComplete?: () => void | Promise<void>
  onError?: () => void | Promise<void>
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

  export function scan<T, U>(observable: Observable<T>, scanFn: (memo: U, value: T) => U, memo: U): Observable<U> {
    const subject = Subject.create();

    observable.subscribe({
      onNext: value => Promise.resolve(scanFn(memo, value)).then(value => { memo = value; subject.onNext(value) })
    });

    return { subscribe: subject.subscribe };
  }
}

export module Subject {
  export function create<T>(): Subject<T> {
    const observers: {[key: string]: Observer<T>} = Object.create(null);
    var current = Promise.resolve();

    function subscribe(observer: Observer<T>): Disposable {
      var observerKey = Key.create();
      observers[observerKey] = observer;
      return Disposable.create(() => delete observers[observerKey]);
    }

    function onNext(value: T): Promise<void> {
      return current = current.then(() => Promise.all(Object.keys(observers).map(key => observers[key].onNext(value))).then(() => {}));
    }

    return { subscribe, onNext };
  }
}
