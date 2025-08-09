export function isPlainObject(obj: unknown) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  // Object.getPrototypeOf(obj) returns the prototype of the object
  // If the object is {}.prototype, the prototype will be Object.prototype
  // If the object is created by Object.create(null), the prototype will be null
  const proto = Object.getPrototypeOf(obj);
  return proto === Object.prototype || proto === null;
}

export default isPlainObject;
