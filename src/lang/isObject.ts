/**
 *
 * @description Check if value is non-primitive value ( Everything is not primitive so it is object 🐧)
 *
 * @param value <unknown>
 *
 * @returns <boolean>
 *
 * @author phamlam2k
 *
 */
export default function isObject(value: unknown): value is Record<string, unknown> {
  const type = typeof value;

  return type === 'function' || (type === 'object' && !!value);
}
