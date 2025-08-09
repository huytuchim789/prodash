import isObject from './isObject';

export function isElement(obj: unknown) {
  if (!isObject(obj)) {
    return false;
  }

  return obj.nodeType === 1;
}

export default isElement;
