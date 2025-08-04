/**
 * Creates an object composed of the picked object properties.
 *
 * @template T - The type of the source object
 * @template K - The keys to pick
 * @param object - The source object
 * @param keys - The property names to pick
 * @returns A new object with only the picked properties
 *
 * @example
 * ```typescript
 * import { pick } from 'prodash/pick';
 *
 * const object = { a: 1, b: 2, c: 3 };
 * pick(object, ['a', 'c']);
 * // => { a: 1, c: 3 }
 * ```
 */
export function pick<T extends Record<string, unknown>, K extends keyof T>(
  object: T,
  keys: readonly K[]
): Pick<T, K> {
  if (object == null) {
    throw new TypeError('Expected object as first argument');
  }

  if (!Array.isArray(keys)) {
    throw new TypeError('Expected array as second argument');
  }

  const result = {} as Pick<T, K>;

  for (const key of keys) {
    if (key in object) {
      (result as any)[key] = object[key];
    }
  }

  return result;
}

export default pick;
