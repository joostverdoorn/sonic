import Id from './id';

export interface ISubscription {
  unsubscribe(): void;
}

export interface INotifier<O> {
  (observable: O): void;
}

export interface IObservable<O> {
  observe(observer: O): ISubscription;
}

export interface ISubject<O> {
  observe(observer: O): ISubscription;
  notify(notifier: INotifier<O>): void;
}

export class Subject<O> {
  private _observers: {[key: number]: O};

  constructor() {
    this._observers = Object.create(null);
  }

  observe = (observer: O): ISubscription => {
    var observerId = Id.create();
    this._observers[observerId] = observer;
    return {
      unsubscribe: () => { delete this._observers[observerId]; }
    }
  }

  notify = (notifier: INotifier<O>) => {
    for(var observerId in this._observers) notifier(this._observers[observerId]);
  }
}
