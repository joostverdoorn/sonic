export function bind<T>(fn: (...args: any[]) => T, context: any): (...args: any[]) => T {
  return function(...args: any[]) { return fn.apply(context, args); }
}

export default bind;
