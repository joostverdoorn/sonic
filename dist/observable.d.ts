import Patch from './patch';
export interface Disposable {
    dispose(): void;
}
export declare function disposable(disposer: () => void): Disposable;
export interface Observer<V> {
    onInvalidate(patches: Patch<V>[]): Promise<void>;
}
export interface Observable<V> {
    observe(observer: Observer<V>): Disposable;
}
export declare class Subject<V> implements Observable<V>, Observer<V> {
    private _observers;
    constructor();
    observe(observer: Observer<V>): Disposable;
    onInvalidate(patches: Patch<V>[]): Promise<void>;
}
