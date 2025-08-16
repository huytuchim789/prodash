import isArray from './isArray';
import isMap from './isMap';
import isObject from './isObject';
import isSet from './isSet';
import isString from './isString';
import isWeakMap from './isWeakMap';

function getLength(value: unknown) {
  if (!value) return 0;

  if (isString(value) || isArray(value)) {
    return (value as string | any[]).length;
  }

  if (typeof value === 'object' && isObject(value)) {
    return Object.keys(value).length;
  }

  if (isMap(value) || isSet(value) || isWeakMap(value)) {
    return (value as Map<unknown, unknown> | Set<unknown>).size;
  }

  return 0;
}

export default getLength;
