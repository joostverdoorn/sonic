export interface Disposable {
    dispose(): void;
}
export interface Observer<T> {
    onNext: (value: T) => void | Promise<void>;
    onComplete?: () => void | Promise<void>;
    onError?: () => void | Promise<void>;
}
export interface Observable<T> {
    subscribe(observer: Observer<T>): Disposable;
}
export interface Subject<T> extends Observable<T>, Observer<T> {
}
export declare module Disposable {
    function create(disposer: () => void): Disposable;
}
export declare module Observable {
    function map<T, U>(observable: Observable<T>, mapFn: (value: T) => U | Promise<U>): Observable<U>;
    function filter<T>(observable: Observable<T>, filterFn: (value: T) => boolean | Promise<boolean>): Observable<T>;
    function scan<T, U>(observable: Observable<T>, scanFn: (memo: U, value: T) => U | Promise<U>, memo: U): Observable<U>;
}
export declare module Subject {
    function isSubject<T>(obj: any): obj is Subject<T>;
    function create<T>(): Subject<T>;
}
