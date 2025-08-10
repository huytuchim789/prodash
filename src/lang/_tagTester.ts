import { toString } from './_setup';

export type TagTesterName =
  | 'Array'
  | 'Object'
  | 'Function'
  | 'Date'
  | 'RegExp'
  | 'Error'
  | 'Symbol'
  | 'BigInt'
  | 'Map'
  | 'Set'
  | 'WeakMap'
  | 'WeakSet'
  | 'AsyncFunction'
  | 'GeneratorFunction'
  | 'AsyncGeneratorFunction'
  | 'Proxy';

export function tagTester(name: TagTesterName) {
  const tagName = `[object ${name}]`;

  return (value: unknown) => toString.call(value) === tagName;
}
