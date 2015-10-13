export type Maybe<V> = Maybe.Some<V> | Maybe.None;

export module Maybe {
  export type None = {};
  export type Some<V> = [V];

  export const None: None = [];
  export const Some = <V>(value: V): Some<V> => {
    return [value];
  }

  export function isSome<V>(maybe: Maybe<V>): maybe is Some<V> {
    return maybe && maybe instanceof Array && maybe.length === 1;
  }

  export function isNone<V>(maybe: Maybe<V>): maybe is None {
    return !isSome(maybe);
  }

  export function get<V>(maybe: Maybe<V>): V {
    if (isSome(maybe)) return maybe[0];
    throw new Error;
  }

  export function bind<V, W>(maybe: Maybe<V>, binder: (value: V) => W): Maybe<W> {
    if (isSome(maybe)) return Some(binder(get(maybe)));
    return None;
  }
}

var x: Maybe<number> = [];

Maybe.isNone(x) || x;

export default Maybe
