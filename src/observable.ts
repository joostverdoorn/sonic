import Key from './key';
import Patch from './patch';

export interface Subscription {
  unsubscribe(): void;
}

export interface Observable<V> {
  observe(observer: Observer<V>): Subscription;
}

export interface Observer<V> {
  onInvalidate(patches: Patch<V>[]): Promise<void>;
}

export class Subject<V> {
  private _observers: {[key: number]: Observer<V>};

  constructor() {
    this._observers = Object.create(null);
  }

  observe = (observer: Observer<V>): Subscription => {
    var observerKey = Key.create();
    this._observers[observerKey] = observer;
    return {
      unsubscribe: () => { delete this._observers[observerKey]; }
    }
  }

  notify = (patches: Patch<V>[]): Promise<void> => {
    return Promise.all(Object.keys(this._observers).map( key => this._observers[key].onInvalidate(patches))).then(() => {});
    // for(var observerKey in this._observers) notifier(this._observers[observerKey]);
  }
}
