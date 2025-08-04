/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 * 
 * @template T - The type of elements in the array
 * @param array - The array to process
 * @param size - The length of each chunk
 * @returns A new array of chunks
 * 
 * @example
 * ```typescript
 * import { chunk } from 'prodash/chunk';
 * 
 * chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 * 
 * chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 * ```
 */
export function chunk<T>(array: readonly T[], size: number = 1): T[][] {
  if (!Array.isArray(array)) {
    throw new TypeError('Expected array as first argument');
  }
  
  if (typeof size !== 'number' || size < 1 || !Number.isInteger(size)) {
    throw new TypeError('Expected positive integer as second argument');
  }

  if (array.length === 0) {
    return [];
  }

  const result: T[][] = [];
  let index = 0;
  
  while (index < array.length) {
    result.push(array.slice(index, index + size));
    index += size;
  }
  
  return result;
}

export default chunk;