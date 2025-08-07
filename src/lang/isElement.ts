import isObject from './isObject';

export default function isElement(obj: unknown) {
  if (!isObject(obj)) {
    return false;
  }

  return obj.nodeType === 1;
}
