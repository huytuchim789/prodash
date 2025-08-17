import keys from './keys';

export default function isMatch(obj: object | null | undefined, attrs: Record<any, any>) {
  const _keys = keys(attrs),
    length = _keys.length;

  if (!obj) return !length;

  const object = Object(obj);

  for (let i = 0; i < length; i++) {
    const key = _keys[i] as string;
    if (attrs[key] !== object[key] || !(key in object)) {
      return false;
    }
  }

  return true;
}
