import extendOwn from './extendOwn';
import isMatch from './isMatch';

// Returns a predicate for checking whether an object has a given set of
// `key:value` pairs.
export default function matcher(attrs: Record<any, any>) {
  attrs = extendOwn(attrs);
  return function (obj: object | null | undefined) {
    return isMatch(obj, attrs);
  };
}
