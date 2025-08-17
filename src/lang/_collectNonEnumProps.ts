import { nonEnumerableProps, ObjProto } from './_setup';
import isFunction from './isFunction';
import has from './_has';

// Internal helper to create a simple lookup structure.
// `collectNonEnumProps` used to depend on `_.contains`, but this led to
// circular imports. `emulatedSet` is a one-off solution that only works for
// arrays of strings.
function emulatedSet(keys: string[]) {
  const hash: Record<string, boolean> = {};

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];
    if (key) hash[key] = true;
  }

  return {
    contains: (key: string): boolean => hash[key] === true,
    push: (key: string): number => {
      hash[key] = true;
      return keys.push(key);
    },
  };
}

// Internal helper. Checks `keys` for the presence of keys in IE < 9 that won't
// be iterated by `for key in ...` and thus missed. Extends `keys` in place if
// needed.
export default function collectNonEnumProps(obj: Record<string, unknown>, keys: string[]): void {
  const keySet = emulatedSet(keys);
  let nonEnumIdx = nonEnumerableProps.length;
  const constructor = obj.constructor;
  const proto = (isFunction(constructor) && constructor.prototype) || ObjProto;

  // Constructor is a special case.
  const prop = 'constructor';
  if (has(obj, prop) && !keySet.contains(prop)) {
    keySet.push(prop);
  }

  while (nonEnumIdx--) {
    const currentProp = nonEnumerableProps[nonEnumIdx];
    if (
      currentProp &&
      currentProp in obj &&
      obj[currentProp] !== proto[currentProp] &&
      !keySet.contains(currentProp)
    ) {
      keySet.push(currentProp);
    }
  }
}
