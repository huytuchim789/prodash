import deepGet from './_deepGet';

// Creates a function that, when passed an object, will traverse that object’s
// properties down the given `path`, specified as an array of keys or indices.
export default function property(path: any) {
  return function (obj: any) {
    return deepGet(obj, path);
  };
}
