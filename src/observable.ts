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

  constructor(fn?: (notify: (notifier: INotifier<O>) => void) => void) {
    if(typeof fn == 'function') fn(this._notify);
    this._observers = Object.create(null);
  }

  observe = (observer: O): ISubscription => {
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

export default Observable;
