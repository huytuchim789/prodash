import type { ChainableArray, ChainableObject } from '../types';
import { map } from '../array/map';
import { filter } from '../array/filter';
import { uniq } from '../array/uniq';
import { pick } from '../object/pick';
import { omit } from '../object/omit';

class ArrayChain<T> implements ChainableArray<T> {
  constructor(private readonly data: T[]) {}

  value(): T[] {
    return this.data;
  }

  map<R>(iteratee: (value: T, index: number, array: T[]) => R): ChainableArray<R> {
    return new ArrayChain(map(this.data, iteratee));
  }

  filter(predicate: (value: T, index: number, array: T[]) => boolean): ChainableArray<T> {
    return new ArrayChain(filter(this.data, predicate));
  }

  take(n: number): ChainableArray<T> {
    return new ArrayChain(this.data.slice(0, Math.max(0, n)));
  }

  drop(n: number): ChainableArray<T> {
    return new ArrayChain(this.data.slice(Math.max(0, n)));
  }

  uniq(): ChainableArray<T> {
    return new ArrayChain(uniq(this.data));
  }

  compact(): ChainableArray<NonNullable<T>> {
    return new ArrayChain(
      this.data.filter((value): value is NonNullable<T> => 
        value != null && value !== false && value !== 0 && value !== ''
      )
    );
  }

  flatten(): ChainableArray<T extends readonly (infer U)[] ? U : T> {
    const result: any[] = [];
    for (const item of this.data) {
      if (Array.isArray(item)) {
        result.push(...item);
      } else {
        result.push(item);
      }
    }
    return new ArrayChain(result);
  }

  reverse(): ChainableArray<T> {
    return new ArrayChain([...this.data].reverse());
  }

  sort(compareFn?: (a: T, b: T) => number): ChainableArray<T> {
    return new ArrayChain([...this.data].sort(compareFn));
  }
}

class ObjectChain<T> implements ChainableObject<T> {
  constructor(private readonly data: T) {}

  value(): T {
    return this.data;
  }

  pick<K extends keyof T>(keys: K[]): ChainableObject<Pick<T, K>> {
    return new ObjectChain(pick(this.data as Record<string, unknown>, keys) as Pick<T, K>);
  }

  omit<K extends keyof T>(keys: K[]): ChainableObject<Omit<T, K>> {
    return new ObjectChain(omit(this.data as Record<string, unknown>, keys) as Omit<T, K>);
  }

  mapValues<R>(iteratee: (value: T[keyof T], key: keyof T) => R): ChainableObject<Record<keyof T, R>> {
    const result = {} as Record<keyof T, R>;
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        result[key] = iteratee(this.data[key], key);
      }
    }
    return new ObjectChain(result);
  }
}

/**
 * Creates a lodash wrapper instance that wraps value with explicit method chain sequences enabled.
 * 
 * @template T - The type of value to wrap
 * @param value - The value to wrap
 * @returns A wrapped value for chaining
 * 
 * @example
 * ```typescript
 * import { chain } from 'prodash/chain';
 * 
 * chain([1, 2, 3, 4])
 *   .filter(n => n % 2 === 0)
 *   .map(n => n * 2)
 *   .value();
 * // => [4, 8]
 * ```
 */
export function chain<T>(value: T[]): ChainableArray<T>;
export function chain<T extends Record<string, unknown>>(value: T): ChainableObject<T>;
export function chain<T>(value: T[] | Record<string, unknown>): ChainableArray<T> | ChainableObject<T> {
  if (Array.isArray(value)) {
    return new ArrayChain(value);
  }
  return new ObjectChain(value as Record<string, unknown>);
}

export default chain;