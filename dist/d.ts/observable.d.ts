export interface ISubscription {
    unsubscribe(): void;
}
export interface IObservable<O> {
    observe(observer: O): ISubscription;
}
export interface INotifier<O> {
    (observable: O): void;
}
export declare class Observable<O> implements IObservable<O> {
    private _observers;
    constructor(fn?: (notify: (notifier: INotifier<O>) => void) => void);
    observe: (observer: O) => ISubscription;
    protected _notify(notifier: INotifier<O>): void;
}
export default Observable;
