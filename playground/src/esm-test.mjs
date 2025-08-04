// /**
//  * ESM Module Test for Prodash
//  * Test file to verify ESM imports work correctly
//  */

// console.log('🔍 Testing ESM imports...\n');

// try {
//   // Real ESM imports working!
//   const { map, filter, uniq } = await import('../../dist/esm/index.js');

//   console.log('✅ ESM imports successful!');

//   // Test the imported functions
//   const numbers = [1, 2, 3, 4, 5, 2, 1];
//   console.log('Original:', numbers);
//   console.log(
//     'Mapped:',
//     map(numbers, n => n * 2)
//   );
//   console.log(
//     'Filtered:',
//     filter(numbers, n => n % 2 === 0)
//   );
//   console.log('Unique:', uniq(numbers));

//   console.log('\n✅ ESM test completed successfully!');
// } catch (error) {
//   console.error('❌ ESM test failed:', error);
// }

// // Test async import
// async function testDynamicImport() {
//   try {
//     console.log('\n🔄 Testing dynamic import...');

//     // Dynamic import working!
//     const prodash = await import('../../dist/esm/index.js');
//     console.log('✅ Dynamic import successful:', Object.keys(prodash).slice(0, 5));
//   } catch (error) {
//     console.error('❌ Dynamic import failed:', error);
//   }
// }

// testDynamicImport();
