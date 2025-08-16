import { tagTester } from './_tagTester';

export default function setEach<T>(
  value: Set<unknown>,
  callback: (val: T, index: number, value: Set<unknown>) => void,
  thisArg?: any
) {
  if (!tagTester('Function')(callback)) return value;

  let i = 0;
  for (const v of value) {
    callback.call(thisArg, v as T, i++, value);
  }

  return value;
}
