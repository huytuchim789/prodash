/**
 * Prodash Playground - Testing Environment
 *
 * This playground demonstrates how to use prodash in different scenarios:
 * - Individual imports (best for tree-shaking)
 * - Named imports
 * - TypeScript integration
 * - Performance comparison with native JavaScript
 */

console.log('🚀 Prodash Playground - Testing Environment\n');

// Import prodash functions - now using the real library!
import { isPlainObject, isEqual } from 'prodash';

console.log(isPlainObject({}));
console.log(isEqual({ a: 1 }, { a: 1 }));
