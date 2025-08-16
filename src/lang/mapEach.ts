import { tagTester } from './_tagTester';

export default function mapEach<T>(
  value: Map<unknown, unknown>,
  callback: (val: T, key: unknown, value: Map<unknown, unknown>) => void,
  thisArg?: any
) {
  if (value.size === 0) return value;

  if (!tagTester('Function')(callback)) return value;

  value.forEach((val, key, map) => {
    callback.call(thisArg, val as T, key, map);
  });

  return value;
}
