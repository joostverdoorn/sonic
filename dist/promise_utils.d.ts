export declare module PromiseUtils {
    function lazy<T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
}
export default PromiseUtils;
