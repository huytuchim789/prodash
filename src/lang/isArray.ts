import { nativeIsArray } from './_setup';
import { tagTester } from './_tagTester';

export default nativeIsArray || tagTester('Array');
