// import _ from './underscore.js';
import baseIteratee from './_baseIteratee';

// The function we call internally to generate a callback. It invokes
// `_.iteratee` if overridden, otherwise `baseIteratee`.
export default function cb(value: any, context: any, argCount?: any) {
  //   if (_.iteratee !== iteratee) return _.iteratee(value, context);
  return baseIteratee(value, context, argCount);
}
