/**
 * Internal utility to optimize callback binding for iteratees.
 *
 * @template F - Function type
 * @template C - Context type
 * @param func - The function to bind
 * @param context - The context to bind to
 * @param argCount - Number of arguments expected
 * @returns The optimized callback
 */
export default function optimizeCb<F extends (...args: any[]) => any, C>(
  func: F,
  context: C,
  argCount: number
): F {
  if (context === void 0) {
    return func;
  }

  switch (argCount == null ? 3 : argCount) {
    case 1:
      return ((value: unknown) => func.call(context, value)) as F;
    case 3:
      return ((value: unknown, index: unknown, collection: unknown) =>
        func.call(context, value, index, collection)) as F;
    case 4:
      return ((accumulator: unknown, value: unknown, index: unknown, collection: unknown) =>
        func.call(context, accumulator, value, index, collection)) as F;
    default:
      return ((...args: unknown[]) => func.apply(context, args)) as F;
  }
}
