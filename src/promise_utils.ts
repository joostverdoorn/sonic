// type Just<V> = [V];
// type Nothing<V> = Array<V> & { 0: void }
// type Maybe<V> = Just<V> | Nothing<V>;



export module PromiseUtils {
  export function lazy<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T> {
    var promise: Promise<any>;

    function then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => TResult | PromiseLike<TResult>): PromiseLike<TResult>;
    function then<TResult>(onfulfilled?: (value: T) => TResult | PromiseLike<TResult>, onrejected?: (reason: any) => void): PromiseLike<TResult> {
      if (promise) return promise.then(onfulfilled, onrejected);
      return (promise = new Promise(executor)).then(onfulfilled, onrejected);
    }

    return Promise.resolve({ then });
  }
}

export default PromiseUtils;
