/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 * Supports arrays, objects, dates, regexes, and primitive values.
 *
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if the values are equivalent, false otherwise
 *
 * @example
 * ```typescript
 * import { isEqual } from 'prodash/isEqual';
 *
 * isEqual([1, 2, 3], [1, 2, 3]);
 * // => true
 *
 * isEqual({ a: 1 }, { a: 1 });
 * // => true
 *
 * isEqual(new Date('2021-01-01'), new Date('2021-01-01'));
 * // => true
 * ```
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // Same reference or primitive equality
  if (a === b) {
    return true;
  }

  // Handle NaN
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true;
  }

  // Handle null/undefined
  if (a == null || b == null) {
    return a === b;
  }

  const typeA = typeof a;
  const typeB = typeof b;

  // Different types
  if (typeA !== typeB) {
    return false;
  }

  // Primitive types (already checked === above)
  if (typeA !== 'object') {
    return false;
  }

  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle RegExp objects
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  // One is array, other is not
  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  // Handle Objects
  const keysA = Object.keys(a as Record<string, unknown>);
  const keysB = Object.keys(b as Record<string, unknown>);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    if (!isEqual((a as any)[key], (b as any)[key])) {
      return false;
    }
  }

  return true;
}

export default isEqual;
