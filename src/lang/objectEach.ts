import { tagTester } from './_tagTester';

export default function objectEach<T>(
  value: object,
  callback: (val: T, key: string | number, value: unknown) => void,
  thisArg?: any
) {
  if (!tagTester('Function')(callback)) return value;

  const array = Object.keys(value);

  for (let i = 0; i < array.length; i++) {
    if (array[i] && value[array[i] as keyof typeof value]) {
      callback.call(
        thisArg,
        value[array[i] as keyof typeof value] as T,
        array[i] as string | number,
        value
      );
    }
  }

  return value;
}
