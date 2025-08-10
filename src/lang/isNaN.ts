import { _isNaN } from './_setup';
import isNumber from './isNumber';

// _isNaN is convert to Number(obj) to check if obj is a object it will take .valueOf() method to check if it is a number
export default function isNaN(obj: any) {
  return isNumber(obj) && _isNaN(obj);
}
