import baseIteratee from './_baseIteratee';

// External wrapper for our callback generator. Users may customize
// `_.iteratee` if they want additional predicate/iteratee shorthand styles.
// This abstraction hides the internal-only `argCount` argument.
export default function iteratee(value: any, context: any) {
  return baseIteratee(value, context, Infinity);
}
