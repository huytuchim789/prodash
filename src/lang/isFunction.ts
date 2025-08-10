import { tagTester } from './_tagTester';
import isObject from './isObject';

export default function isFunction(value: unknown) {
  if (!isObject(value)) return false;

  return (
    tagTester('Function')(value) ||
    tagTester('AsyncFunction')(value) ||
    tagTester('GeneratorFunction')(value) ||
    tagTester('Proxy')(value) ||
    tagTester('AsyncGeneratorFunction')(value)
  );
}
