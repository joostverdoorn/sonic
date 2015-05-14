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
export declare class Subject<O> {
    private _observers;
    constructor();
    observe: (observer: O) => ISubscription;
    notify: (notifier: INotifier<O>) => void;
}
