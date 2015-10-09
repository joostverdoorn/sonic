export interface Disposable {
    dispose(): void;
}
export declare function disposable(disposer: () => void): Disposable;
export interface Observer<T> {
    onNext(value: T): void | Promise<void>;
    onComplete?(): void | Promise<void>;
    onError?(): void | Promise<void>;
}
export interface Observable<T> {
    subscribe(observer: Observer<T>): Disposable;
}
export declare class Subject<T> implements Observable<T>, Observer<T> {
    private _observers;
    private _count;
    constructor();
    subscribe: (observer: Observer<T>) => Disposable;
    onNext: (value: T) => Promise<void>;
}
export declare module Observable {
    function map<T, U>(observable: Observable<T>, mapFn: (value: T) => U | Promise<U>): Observable<U>;
    function filter<T>(observable: Observable<T>, filterFn: (value: T) => boolean | Promise<boolean>): Observable<T>;
    function scan<T, U>(observable: Observable<T>, scanFn: (memo: U, value: T) => U, memo: U): Observable<U>;
}
