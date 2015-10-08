export interface Lens<A,B> {
  get(a: A): B;
  set(a: A, b: B): A;
}

export module Lens {
  export function compose<A,B,C>(x: Lens<A,B>, y: Lens<B,C>): Lens<A,C> {
    return {
      get: (a:A) => y.get(x.get(a)),
      set: (a: A, c: C) => x.set(a, y.set(x.get(a), c))
    }
  }
}

export default Lens;
