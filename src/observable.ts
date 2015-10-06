import Key   from './key';
import Patch from './patch';
import State from './state';

export interface Disposable {
  dispose(): void;
}

export function disposable(disposer: () => void): Disposable {
  return { dispose: disposer }
}

export interface Observer<V> {
  onInvalidate(patches: Patch<V>[]): Promise<void>;
}

export interface Observable<V> {
  observe(observer: Observer<V>): Disposable;
}

export class Subject<V> implements Observable<V>, Observer<V> {
  private _observers: {[key: number]: Observer<V>};

  constructor() {
    this._observers = Object.create(null);
  }

  observe(observer: Observer<V>): Disposable {
    var observerKey = Key.create();
    this._observers[observerKey] = observer;
    return disposable(() => delete this._observers[observerKey]);
  }

  onInvalidate(patches: Patch<V>[]): Promise<void> {
    return Promise.all(Object.keys(this._observers).map(key => this._observers[key].onInvalidate(patches))).then(() => {});
  }
}
