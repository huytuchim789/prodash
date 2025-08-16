import { tagTester } from './_tagTester';

export default function stringEach<T>(
  value: string,
  callback: (val: T, index: number, value: unknown) => void,
  thisArg?: any
) {
  if (!tagTester('Function')(callback)) return value;

  const chars = [...value];

  for (let i = 0; i < chars.length; i++) {
    if (chars[i]) {
      callback.call(thisArg, chars[i] as T, i, value);
    }
  }

  return value;
}
