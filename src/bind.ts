export function bind<T>(fn: (...args: any[]) => T, context: any): (...args: any[]) => T {
  return (...args: any[]) => fn.apply(context, args);
}

export default bind;
