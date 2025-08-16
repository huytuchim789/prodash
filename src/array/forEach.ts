import arrayEach from '../lang/arrayEach';
import isArray from '../lang/isArray';
import isMap from '../lang/isMap';
import isSet from '../lang/isSet';
import isWeakMap from '../lang/isWeakMap';
import mapEach from '../lang/mapEach';
import objectEach from '../lang/objectEach';
import setEach from '../lang/setEach';
import isString from '../lang/isString';
import stringEach from '../lang/stringEach';
import { tagTester } from '../lang/_tagTester';

export default function forEach<T>(
  value: unknown,
  callback: (val: T, key: unknown, value: unknown) => void,
  thisArg?: any
) {
  if (isArray(value)) return arrayEach(value, callback, thisArg);

  if (typeof value === 'string' && isString(value)) return stringEach(value, callback, thisArg);

  if (tagTester('Object')(value)) return objectEach(value as object, callback, thisArg);

  if (isMap(value) || isWeakMap(value))
    return mapEach(value as Map<unknown, unknown>, callback, thisArg);

  if (isSet(value)) return setEach(value as Set<unknown>, callback, thisArg);

  return value;
}
