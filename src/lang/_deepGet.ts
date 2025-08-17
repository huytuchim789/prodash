// Internal function to obtain a nested property in `obj` along `path`.
export default function deepGet(obj: any, path: any) {
  const length = path.length;
  for (let i = 0; i < length; i++) {
    if (obj == null) return void 0;
    obj = obj[path[i]];
  }
  return length ? obj : void 0;
}
