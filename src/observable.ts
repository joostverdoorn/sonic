import uniqueId from './unique_id';

export interface ISubscription {
  unsubscribe(): void;
}

export interface IObservable<O> {
  observe(observer: O): ISubscription;
}

export interface INotifier<O> {
  (observable: O): void;
}

export class Observable<O> implements IObservable<O> {
  private _observers: Object;

  constructor() {
    this._observers = Object.create(null);
  }

  observe(observer: O) {
    var observerId = uniqueId();
    var observers = this._observers;
    observers[observerId] = observer;

    return {
      unsubscribe: function() { delete observers[observerId]; }
    };
  }

  protected _notify(notifier: INotifier<O>) {
    for(var observerId in this._observers) notifier(this._observers[observerId]);
  }
}
