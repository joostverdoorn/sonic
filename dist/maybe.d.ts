export declare type Maybe<V> = Maybe.Some<V> | Maybe.None;
export declare module Maybe {
    type None = {};
    type Some<V> = [V];
    const None: None;
    const Some: <V>(value: V) => [V];
    function isSome<V>(maybe: Maybe<V>): maybe is Some<V>;
    function isNone<V>(maybe: Maybe<V>): maybe is None;
    function get<V>(maybe: Maybe<V>): V;
    function bind<V, W>(maybe: Maybe<V>, binder: (value: V) => W): Maybe<W>;
}
export default Maybe;
