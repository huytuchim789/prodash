/**
 * The opposite of pick; this method creates an object composed of the own
 * and inherited enumerable property paths of object that are not omitted.
 *
 * @template T - The type of the source object
 * @template K - The keys to omit
 * @param object - The source object
 * @param keys - The property names to omit
 * @returns A new object without the omitted properties
 *
 * @example
 * ```typescript
 * import { omit } from 'prodash/omit';
 *
 * const object = { a: 1, b: 2, c: 3 };
 * omit(object, ['a', 'c']);
 * // => { b: 2 }
 * ```
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[]
): Omit<T, K> {
  if (object == null) {
    throw new TypeError('Expected object as first argument');
  }

  if (!Array.isArray(keys)) {
    throw new TypeError('Expected array as second argument');
  }

  const keysSet = new Set(keys);
  const result = {} as Omit<T, K>;

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key) && !keysSet.has(key as unknown as K)) {
      (result as Record<string, unknown>)[key] = object[key];
    }
  }

  return result;
}

export default omit;
