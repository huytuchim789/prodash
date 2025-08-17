import cb from '../lang/_cb';
import isArrayLike from '../lang/_isArrayLike';
import keys from '../lang/keys';

// Return the results of applying the iteratee to each element.
export function map(obj: any, iteratee: any, context?: any) {
  if (!isArrayLike(obj)) {
    throw new TypeError('Expected array or object');
  }
  if (iteratee == null) {
    throw new TypeError('Expected function');
  }
  iteratee = cb(iteratee, context);
  const _keys = !isArrayLike(obj) && keys(obj),
    length = (_keys || obj).length,
    results = Array(length);
  for (let index = 0; index < length; index++) {
    const currentKey = (_keys ? _keys[index] : index) as string | number;
    results[index] = iteratee(obj[currentKey], currentKey, obj);
  }
  return results;
}
export default map;
