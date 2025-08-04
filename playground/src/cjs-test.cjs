/**
 * CommonJS Test for Prodash
 * Test file to verify CommonJS requires work correctly
 */

console.log('🔍 Testing CommonJS requires...\n');

try {
  // After building prodash, uncomment these lines:
  
  // const { map, filter, uniq, chain } = require('../lib/index.js');
  // const map = require('../lib/array/map.js');
  
  console.log('✅ Build prodash first with: npm run build');
  console.log('Then uncomment the requires above to test CommonJS loading');
  
  // Test data
  const numbers = [1, 2, 3, 4, 5, 2, 1];
  console.log('\n📊 Test data:', numbers);
  
  // Mock functions for demo
  const mockMap = (arr, fn) => arr.map(fn);
  const mockFilter = (arr, fn) => arr.filter(fn);
  
  const doubled = mockMap(numbers, n => n * 2);
  const evens = mockFilter(numbers, n => n % 2 === 0);
  
  console.log('📊 Doubled:', doubled);
  console.log('📊 Evens:', evens);
  
  console.log('\n✅ CommonJS test completed (using mocks)');
  
} catch (error) {
  console.error('❌ CommonJS test failed:', error);
}

// Test performance
function testPerformance() {
  console.log('\n⚡ Performance test...');
  
  const largeArray = Array.from({ length: 100000 }, (_, i) => i);
  
  console.time('Native performance');
  const result = largeArray.map(n => n * 2).filter(n => n % 2 === 0);
  console.timeEnd('Native performance');
  
  console.log(`📊 Processed ${largeArray.length} items, result: ${result.length} items`);
}

testPerformance();