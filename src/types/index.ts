/**
 * Core type definitions for prodash
 */

// Utility types
export type AnyFunction = (...args: any[]) => any;
export type Predicate<T> = (value: T, index: number, array: T[]) => boolean;
export type Iteratee<T, R> = (value: T, index: number, array: T[]) => R;
export type ObjectIteratee<T, R> = (value: T, key: string, object: Record<string, T>) => R;
export type PropertyPath = string | number | symbol | Array<string | number | symbol>;

// Collection types
export type Collection<T> = T[] | Record<PropertyKey, T>;
export type Dictionary<T> = Record<string, T>;
export type NumericDictionary<T> = Record<number, T>;

// Chain types
export interface ChainableArray<T> {
  value(): T[];
  map<R>(iteratee: Iteratee<T, R>): ChainableArray<R>;
  filter(predicate: Predicate<T>): ChainableArray<T>;
  take(n: number): ChainableArray<T>;
  drop(n: number): ChainableArray<T>;
  uniq(): ChainableArray<T>;
  compact(): ChainableArray<NonNullable<T>>;
  flatten(): ChainableArray<T extends readonly (infer U)[] ? U : T>;
  reverse(): ChainableArray<T>;
  sort(compareFn?: (a: T, b: T) => number): ChainableArray<T>;
}

export interface ChainableObject<T> {
  value(): T;
  pick<K extends keyof T>(keys: K[]): ChainableObject<Pick<T, K>>;
  omit<K extends keyof T>(keys: K[]): ChainableObject<Omit<T, K>>;
  mapValues<R>(
    iteratee: (value: T[keyof T], key: keyof T) => R
  ): ChainableObject<Record<keyof T, R>>;
}

// Debounce/Throttle options
export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

// Deep clone types
export type DeepCloneable =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | Array<DeepCloneable>
  | { [key: string]: DeepCloneable };
