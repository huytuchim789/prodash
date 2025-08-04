/**
 * Creates a duplicate-free version of an array, using SameValueZero for equality comparisons,
 * in which only the first occurrence of each element is kept.
 * The order of result values is determined by the order they occur in the array.
 *
 * @template T - The type of elements in the array
 * @param array - The array to inspect
 * @returns A new duplicate free array
 *
 * @example
 * ```typescript
 * import { uniq } from 'prodash/uniq';
 *
 * uniq([2, 1, 2]);
 * // => [2, 1]
 *
 * uniq(['a', 'b', 'a', 'c']);
 * // => ['a', 'b', 'c']
 * ```
 */
export function uniq<T>(array: readonly T[]): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected array as first argument');
  }

  if (array.length === 0) {
    return [];
  }

  // Use Set for O(n) performance instead of nested loops
  const seen = new Set<T>();
  const result: T[] = [];

  for (const value of array) {
    if (!seen.has(value)) {
      seen.add(value);
      result.push(value);
    }
  }

  return result;
}

export default uniq;
