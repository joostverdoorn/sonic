import Key   from './key';
import Patch from './patch';
import State from './state';

export interface Disposable {
  dispose(): void;
}

export function disposable(disposer: () => void): Disposable {
  var done = false;

  return {
    dispose: () => {
      if (done) return;
      done = true, disposer();
    }
  }
}

export interface Observer<T> {
  onNext(value: T): void | Promise<void>
  onComplete?(): void | Promise<void>
  onError?(): void | Promise<void>
}

export interface Observable<T> {
  subscribe(observer: Observer<T>): Disposable;
}

export class Subject<T> implements Observable<T>, Observer<T> {
  private _observers: {[key: number]: Observer<T>};
  private _count = 0;

  constructor() {
    this._observers = Object.create(null);
  }

  subscribe = (observer: Observer<T>): Disposable => {
    var observerKey = Key.create();
    this._observers[observerKey] = observer;
    return disposable(() => delete this._observers[observerKey]);
  }

  onNext = (value: T): Promise<void> => {
    return Promise.all(Object.keys(this._observers).map(key => this._observers[key].onNext(value))).then(() => {});
  }
}

export module Observable {
  export function map<T, U>(observable: Observable<T>, mapFn: (value: T) => U | Promise<U>): Observable<U> {
    const subject = new Subject;

    observable.subscribe({
      onNext: value => Promise.resolve(mapFn(value)).then(subject.onNext)
    })

    return { subscribe: subject.subscribe }
  }

  export function filter<T>(observable: Observable<T>, filterFn: (value: T) => boolean | Promise<boolean>): Observable<T>  {
    const subject = new Subject<T>();

    observable.subscribe({
      onNext: value => Promise.resolve(filterFn(value)).then(result => result ? subject.onNext(value) : undefined)
    });


    return { subscribe: subject.subscribe }
  }
}
