import type { DeepCloneable } from '../types/index.js';

/**
 * This method is like clone except that it recursively clones value.
 * Supports cloning arrays, objects, dates, regexes, and primitive values.
 *
 * @template T - The type of value to clone
 * @param value - The value to recursively clone
 * @returns A deep clone of the value
 *
 * @example
 * ```typescript
 * import { cloneDeep } from 'prodash/cloneDeep';
 *
 * const objects = [{ a: 1 }, { b: 2 }];
 * const deep = cloneDeep(objects);
 * console.log(deep[0] === objects[0]); // false
 * ```
 */
export function cloneDeep<T extends DeepCloneable>(value: T): T {
  // Handle null and undefined
  if (value === null || value === undefined) {
    return value;
  }

  // Handle primitive types
  if (typeof value !== 'object') {
    return value;
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // Handle RegExp
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags) as T;
  }

  // Handle Array
  if (Array.isArray(value)) {
    return value.map(item => cloneDeep(item)) as T;
  }

  // Handle Object
  const cloned = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      (cloned as any)[key] = cloneDeep((value as any)[key]);
    }
  }

  return cloned;
}

export default cloneDeep;
