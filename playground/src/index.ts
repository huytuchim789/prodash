/**
 * Prodash Playground - Testing Environment
 * 
 * This playground demonstrates how to use prodash in different scenarios:
 * - Individual imports (best for tree-shaking)
 * - Named imports  
 * - Chain API
 * - TypeScript integration
 */

console.log('🚀 Prodash Playground - Testing Environment\n');

// Test individual imports (best for tree-shaking)
console.log('📦 Testing individual imports...');
try {
  // Note: These imports will work after building prodash
  // import map from 'prodash/map';
  // import filter from 'prodash/filter';
  // import uniq from 'prodash/uniq';
  
  console.log('✅ Individual imports ready (build prodash first)');
} catch (error) {
  console.log('❌ Individual imports failed:', error);
}

// Test named imports
console.log('\n📦 Testing named imports...');
try {
  // import { map, filter, uniq, debounce, chain } from 'prodash';
  
  console.log('✅ Named imports ready (build prodash first)');
} catch (error) {
  console.log('❌ Named imports failed:', error);
}

// Mock functions for demonstration (replace with actual imports after build)
const mockMap = <T, R>(arr: T[], fn: (item: T) => R): R[] => arr.map(fn);
const mockFilter = <T>(arr: T[], fn: (item: T) => boolean): T[] => arr.filter(fn);
const mockUniq = <T>(arr: T[]): T[] => [...new Set(arr)];

// Demo data
const numbers = [1, 2, 3, 4, 5, 2, 1, 6];
const users = [
  { name: 'John', age: 30, active: true },
  { name: 'Jane', age: 25, active: false },
  { name: 'Bob', age: 35, active: true }
];

console.log('\n🧪 Testing Array Functions:');
console.log('Original numbers:', numbers);

const doubled = mockMap(numbers, n => n * 2);
console.log('Doubled:', doubled);

const evens = mockFilter(numbers, n => n % 2 === 0);
console.log('Even numbers:', evens);

const unique = mockUniq(numbers);
console.log('Unique numbers:', unique);

console.log('\n👥 Testing with Objects:');
console.log('Users:', users);

const names = mockMap(users, user => user.name);
console.log('Names:', names);

const activeUsers = mockFilter(users, user => user.active);
console.log('Active users:', activeUsers);

console.log('\n🔗 Chain API Demo:');
console.log('After building prodash, you can use:');
console.log(`
// import { chain } from 'prodash';
// 
// const result = chain([1, 2, 3, 4, 5, 2, 1])
//   .filter(n => n > 2)
//   .map(n => n * 2) 
//   .uniq()
//   .value();
// console.log('Chained result:', result);
`);

// Performance test
console.log('\n⚡ Performance Test:');
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

console.time('Mock map performance');
const mapped = mockMap(largeArray, n => n * 2);
console.timeEnd('Mock map performance');

console.time('Mock filter performance');
const filtered = mockFilter(largeArray, n => n % 2 === 0);
console.timeEnd('Mock filter performance');

console.log(`Processed ${largeArray.length} items`);
console.log(`Mapped to ${mapped.length} items`);
console.log(`Filtered to ${filtered.length} items`);

console.log('\n✨ Playground ready! Build prodash and uncomment the imports to test.');
console.log('Run: cd .. && npm run build && cd playground && npm run dev');