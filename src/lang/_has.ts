import { hasOwnProperty } from './_setup';

export default function has(object: object, key: string) {
  return object != null && hasOwnProperty.call(object, key);
}
