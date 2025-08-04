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
import { map, filter, uniq, chunk, pick, omit, debounce, isEqual, cloneDeep } from 'prodash';

console.log('✅ Successfully imported prodash functions!');

// Demo data
const numbers = [1, 2, 3, 4, 5, 2, 1, 6];
const users = [
  { name: 'John', age: 30, active: true },
  { name: 'Jane', age: 25, active: false },
  { name: 'Bob', age: 35, active: true },
];

console.log('\n🧪 Testing Array Functions:');
console.log('Original numbers:', numbers);

// Using real prodash functions! 🎉
const doubled = map(numbers, n => n * 2);
console.log('Doubled:', doubled);

const evens = filter(numbers, n => n % 2 === 0);
console.log('Even numbers:', evens);

const unique = uniq(numbers);
console.log('Unique numbers:', unique);

const chunked = chunk(numbers, 3);
console.log('Chunked by 3:', chunked);

console.log('\n👥 Testing with Objects:');
console.log('Users:', users);

const names = map(users, user => user.name);
console.log('Names:', names);

const activeUsers = filter(users, user => user.active);
console.log('Active users:', activeUsers);

const pickedUser = pick(users[0]!, ['name', 'age']);
console.log('Picked user properties:', pickedUser);

const omittedUser = omit(users[0]!, ['active']);
console.log('Omitted user properties:', omittedUser);

console.log('\n⚡ Testing Function Utilities:');
const debouncedLog = debounce((msg: string) => console.log('Debounced:', msg), 100);
debouncedLog('Hello');
debouncedLog('World'); // Only this will execute after 100ms

console.log('\n🧪 Testing Deep Operations:');
const testObj = { a: { b: { c: 1 } }, d: [1, 2, { e: 3 }] };
const cloned = cloneDeep(testObj);
console.log('Original === Cloned:', testObj === cloned); // false
console.log('Deep equal:', isEqual(testObj, cloned)); // true

// Modify cloned to test deep equality
cloned.a.b.c = 999;
console.log('After modification - Deep equal:', isEqual(testObj, cloned)); // false

console.log('\n🔗 Chain API Demo:');
console.log('Chain API is currently disabled in this build.');

// Performance test
console.log('\n⚡ Performance Test:');
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.time('Prodash map performance');
const mapped = map(largeArray, n => n * 2);
console.timeEnd('Prodash map performance');

console.time('Prodash filter performance');
const filtered = filter(largeArray, n => n % 2 === 0);
console.timeEnd('Prodash filter performance');

console.time('Native map performance');
const nativeMapped = largeArray.map(n => n * 2);
console.timeEnd('Native map performance');

console.time('Native filter performance');
const nativeFiltered = largeArray.filter(n => n % 2 === 0);
console.timeEnd('Native filter performance');

console.log(`\nProcessed ${largeArray.length} items`);
console.log(`Prodash mapped to ${mapped.length} items`);
console.log(`Prodash filtered to ${filtered.length} items`);
console.log(`Native mapped to ${nativeMapped.length} items`);
console.log(`Native filtered to ${nativeFiltered.length} items`);

console.log('\n✨ Prodash playground working with real functions! 🎉');
console.log('🎯 All functions imported and working correctly');
console.log('📦 Tree-shaking friendly imports working');
console.log('⚡ Performance comparison completed');
