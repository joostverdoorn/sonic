interface IComposable<A,B> {
  (x: A) : B
};

export function compose<A,B,C>(f: IComposable<B,C>, g: IComposable<A,B>): IComposable<A,C> {
  return (x: A) => {
    return f(g(x));
  }
};

export default compose;
