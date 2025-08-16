import { tagTester } from './_tagTester';
import getLength from './getLength';

export default function arrayEach<T>(
  value: T[],
  callback: (val: T, index: number, value: T[]) => void,
  thisArg?: any
) {
  if (!tagTester('Function')(callback)) return value;

  const length = getLength(value);

  for (let i = 0; i < length; i++) {
    if (i in value && value[i] !== void 0) {
      callback.call(thisArg, value[i] as T, i, value);
    }
  }

  return value;
}
