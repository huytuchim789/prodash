import isObject from './isObject';
import { nativeKeys, hasEnumBug } from './_setup';
import has from './_has';
import collectNonEnumProps from './_collectNonEnumProps';

// Retrieve the names of an object's own properties.
// Delegates to **ECMAScript 5**'s native `Object.keys`.
export default function keys(obj: object) {
  if (!isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  const keys = [];
  for (const key in obj) if (has(obj, key)) keys.push(key);
  // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
}
