// /**
//  * CommonJS Test for Prodash
//  * Test file to verify CommonJS requires work correctly
//  */

// console.log('🔍 Testing CommonJS requires...\n');

// async function testCommonJS() {
//   try {
//     // Using dynamic import in CommonJS works too!
//     const { map, filter, uniq } = await import('../../dist/esm/index.js');

//     console.log('✅ Dynamic import in CommonJS successful!');

//     // Test data
//     const numbers = [1, 2, 3, 4, 5, 2, 1];
//     console.log('\n📊 Test data:', numbers);

//     // Using real prodash functions!
//     const doubled = map(numbers, n => n * 2);
//     const evens = filter(numbers, n => n % 2 === 0);
//     const unique = uniq(numbers);

//     console.log('📊 Doubled:', doubled);
//     console.log('📊 Evens:', evens);
//     console.log('📊 Unique:', unique);

//     console.log('\n✅ CommonJS test completed with real functions!');
//   } catch (error) {
//     console.error('❌ CommonJS test failed:', error);
//   }
// }

// testCommonJS();

// // Test performance
// function testPerformance() {
//   console.log('\n⚡ Performance test...');

//   const largeArray = Array.from({ length: 100000 }, (_, i) => i);

//   console.time('Native performance');
//   const result = largeArray.map(n => n * 2).filter(n => n % 2 === 0);
//   console.timeEnd('Native performance');

//   console.log(`📊 Processed ${largeArray.length} items, result: ${result.length} items`);
// }

// testPerformance();
