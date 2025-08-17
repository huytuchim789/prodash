import createAssigner from './_createAssigner';
import keys from './keys';

// Assigns a given object with all the own properties in the passed-in
// object(s).
// (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
export default createAssigner(keys);
