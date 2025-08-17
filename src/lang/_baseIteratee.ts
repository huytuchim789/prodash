import identity from './identity';
import isFunction from './isFunction';
import isObject from './isObject';
import isArray from './isArray';
import matcher from './matcher';
import optimizeCb from './_optimizeCb';
import property from '../lang/property';

// An internal function to generate callbacks that can be applied to each
// element in a collection, returning the desired result — either `_.identity`,
// an arbitrary callback, a property matcher, or a property accessor.
export default function baseIteratee(value: any, context: any, argCount: any) {
  if (value == null) return identity;
  if (isFunction(value)) return optimizeCb(value, context, argCount);
  if (isObject(value) && !isArray(value)) return matcher(value);
  return property(value);
}
