import { toString } from './_setup';

export type TagTesterName =
  | 'Array'
  | 'String'
  | 'Number'
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
  | 'WeakSet';

export function tagTester(name: TagTesterName) {
  const tagName = `[object ${name}]`;

  return (value: unknown) => toString.call(value) === tagName;
}
