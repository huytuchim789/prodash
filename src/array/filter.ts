import type { Predicate } from '../types';

/**
 * Iterates over elements of collection, returning an array of all elements predicate returns truthy for.
 * The predicate is invoked with three arguments: (value, index, array).
 * 
 * @template T - The type of elements in the array
 * @param array - The array to iterate over
 * @param predicate - The function invoked per iteration
 * @returns A new filtered array
 * 
 * @example
 * ```typescript
 * import { filter } from 'prodash/filter';
 * 
 * filter([1, 2, 3, 4], n => n % 2 === 0);
 * // => [2, 4]
 * 
 * filter([{ active: true }, { active: false }], user => user.active);
 * // => [{ active: true }]
 * ```
 */
export function filter<T>(array: readonly T[], predicate: Predicate<T>): T[] {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected array as first argument');
  }
  
  if (typeof predicate !== 'function') {
    throw new TypeError('Expected function as second argument');
  }

  const result: T[] = [];
  const length = array.length;
  
  for (let i = 0; i < length; i++) {
    const value = array[i]!;
    if (predicate(value, i, array as T[])) {
      result.push(value);
    }
  }
  
  return result;
}

export default filter;