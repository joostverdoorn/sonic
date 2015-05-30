export interface IComposable<A, B> {
    (x: A): B;
}
export declare function compose<A, B, C>(f: IComposable<B, C>, g: IComposable<A, B>): IComposable<A, C>;
export default compose;
