export interface Lens<A, B> {
    get(a: A): B;
    set(a: A, b: B): A;
}
export declare module Lens {
    function compose<A, B, C>(x: Lens<A, B>, y: Lens<B, C>): Lens<A, C>;
}
export default Lens;
