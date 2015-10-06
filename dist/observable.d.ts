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
export declare class Subject<V> {
    private _observers;
    constructor();
    observe: (observer: Observer<V>) => Subscription;
    notify: (patches: Patch<V>[]) => Promise<void>;
}
