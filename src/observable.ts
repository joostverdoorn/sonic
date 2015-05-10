import uniqueId from './unique_id';

export interface IObserver<I> {
  (prev?: I, next?: I): void;
}

export interface ISubscription {
  unsubscribe(): void;
}

export interface IObservable<I> {
  subscribe(observer: IObserver<I>): ISubscription;
}

export function isObservable(obj: Object): boolean {
  return false;
}

export class Observable<I> implements IObservable<I> {
  private _observers: Object;

  constructor() {
    this._observers = Object.create(null);
  }

  subscribe(observer) {
    var observerId = uniqueId();
    var observers = this._observers;
    observers[observerId] = observer;

    return {
      unsubscribe: function() { delete observers[observerId]; }
    };
  }

  protected _invalidate(prev?, next?) {
    for(var observerId in this._observers) { this._observers[observerId]; }
  }
}

export default Observable;
