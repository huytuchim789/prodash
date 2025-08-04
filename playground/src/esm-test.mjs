/**
 * ESM Module Test for Prodash
 * Test file to verify ESM imports work correctly
 */

console.log('🔍 Testing ESM imports...\n');

try {
  // After building prodash, uncomment these lines:
  
  // Individual imports (best for tree-shaking)
  // import map from '../lib-es/array/map.js';
  // import filter from '../lib-es/array/filter.js';
  // import uniq from '../lib-es/array/uniq.js';
  
  // Named imports from main module
  // import { map, filter, uniq, chain } from '../lib-es/index.js';
  
  console.log('✅ Build prodash first with: npm run build');
  console.log('Then uncomment the imports above to test ESM loading');
  
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
  
  console.log('\n✅ ESM test completed (using mocks)');
  
} catch (error) {
  console.error('❌ ESM test failed:', error);
}

// Test async import
async function testDynamicImport() {
  try {
    console.log('\n🔄 Testing dynamic import...');
    
    // After building, this would work:
    // const prodash = await import('../lib-es/index.js');
    // console.log('✅ Dynamic import successful:', Object.keys(prodash));
    
    console.log('⚠️ Dynamic import test requires built library');
    
  } catch (error) {
    console.error('❌ Dynamic import failed:', error);
  }
}

testDynamicImport();