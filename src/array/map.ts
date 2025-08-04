import type { Iteratee } from '../types';

/**
 * Creates an array of values by running each element in collection through iteratee.
 * The iteratee is invoked with three arguments: (value, index, array).
 * 
 * @template T - The type of elements in the input array
 * @template R - The type of elements in the output array
 * @param array - The array to iterate over
 * @param iteratee - The function invoked per iteration
 * @returns A new mapped array
 * 
 * @example
 * ```typescript
 * import { map } from 'prodash/map';
 * 
 * map([1, 2, 3], n => n * 2);
 * // => [2, 4, 6]
 * 
 * map([{ name: 'john' }, { name: 'jane' }], user => user.name);
 * // => ['john', 'jane']
 * ```
 */
export function map<T, R>(array: readonly T[], iteratee: Iteratee<T, R>): R[] {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected array as first argument');
  }
  
  if (typeof iteratee !== 'function') {
    throw new TypeError('Expected function as second argument');
  }

  const result: R[] = [];
  const length = array.length;
  
  for (let i = 0; i < length; i++) {
    result[i] = iteratee(array[i]!, i, array as T[]);
  }
  
  return result;
}

export default map;