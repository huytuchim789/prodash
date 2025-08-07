export function isPlainObject() {
  const a = {};
  const b = Object.create(null);
  console.log(a, b);
}

export default isPlainObject;
