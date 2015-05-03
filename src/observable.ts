import uniqueId from 'unique_id';

export interface IObserver<I> {
  (prev?: I, next?: I): void|boolean;
}

export interface IObservable<I,K> {
  onInvalidate(handler: IObserver<I>): K;
  removeHandler(handlerId: K): boolean;
}

export function isObservable(obj: Object): boolean {
  return false;
}

export default class Observable<I> implements IObservable<I,number> {

  private _handlers: Object;

  constructor() {
    this._handlers = Object.create(null);
  }

  onInvalidate(handler: IObserver<I>): number {
    var handlerId = uniqueId();
    this._handlers[handlerId] = handler;
    return handlerId;
  }

  removeHandler(handlerId): boolean {
    if(!this._handlers || !this._handlers[handlerId]) return false;
    delete this._handlers[handlerId];
    return true;
  }

  protected _invalidate(prev?: I, next?: I) {
    if(!this._handlers) return false;

    setTimeout(() => {
      for(var handlerId in this._handlers) {
        var handler = this._handlers[handlerId];

        if(handler(prev, next) === false) {
          delete this._handlers[handlerId];
        }
      }
    });
  }


}
