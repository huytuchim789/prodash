// An internal function for creating assigner functions.
export default function createAssigner(...args: any[]) {
  const keysFunc = args[0];
  const defaults = args[1];

  return function (obj: any) {
    const length = args.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;
    for (let index = 1; index < length; index++) {
      const source = args[index] as any;
      const keys = keysFunc(source);
      const l = keys.length;
      for (let i = 0; i < l; i++) {
        const key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
}
