import Key from './key';

export interface ISubscription {
  unsubscribe(): void;
}

export interface INotifier<O> {
  (observable: O): Promise<void>;
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
    var observerKey = Key.create();
    this._observers[observerKey] = observer;
    return {
      unsubscribe: () => { delete this._observers[observerKey]; }
    }
  }

  notify = (notifier: INotifier<O>): Promise<void> => {
    return Promise.all(Object.keys(this._observers).map( key => notifier(this._observers[key]))).then(() => {});
    // for(var observerKey in this._observers) notifier(this._observers[observerKey]);
  }
}
