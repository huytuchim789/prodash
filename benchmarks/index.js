const { performance } = require('perf_hooks');

// Import prodash functions (after building)
// const { map, filter } = require('../lib/index.js');

// Import lodash for comparison
// const _ = require('lodash');

/**
 * Simple benchmark runner
 */
function benchmark(name, fn, iterations = 100000) {
  console.log(`\n🏃 Running benchmark: ${name}`);
  
  // Warm up
  for (let i = 0; i < 1000; i++) {
    fn();
  }
  
  // Actual benchmark
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  
  const totalTime = end - start;
  const avgTime = totalTime / iterations;
  
  console.log(`📊 Total time: ${totalTime.toFixed(2)}ms`);
  console.log(`📈 Average time: ${avgTime.toFixed(6)}ms per operation`);
  console.log(`🔥 Operations per second: ${(1000 / avgTime).toFixed(0)}`);
  
  return { totalTime, avgTime };
}

/**
 * Compare two functions
 */
function compare(name1, fn1, name2, fn2, iterations = 100000) {
  console.log(`\n🔍 Comparing: ${name1} vs ${name2}`);
  
  const result1 = benchmark(name1, fn1, iterations);
  const result2 = benchmark(name2, fn2, iterations);
  
  const speedup = result2.avgTime / result1.avgTime;
  
  if (speedup > 1) {
    console.log(`🏆 ${name1} is ${speedup.toFixed(2)}x faster than ${name2}`);
  } else {
    console.log(`🏆 ${name2} is ${(1/speedup).toFixed(2)}x faster than ${name1}`);
  }
}

// Example benchmarks (uncomment after building the library)
/*
const testArray = Array.from({ length: 1000 }, (_, i) => i);

compare(
  'Prodash map',
  () => map(testArray, x => x * 2),
  'Lodash map', 
  () => _.map(testArray, x => x * 2),
  10000
);

compare(
  'Prodash filter',
  () => filter(testArray, x => x % 2 === 0),
  'Lodash filter',
  () => _.filter(testArray, x => x % 2 === 0), 
  10000
);

compare(
  'Native map',
  () => testArray.map(x => x * 2),
  'Prodash map',
  () => map(testArray, x => x * 2),
  10000
);
*/

console.log('📦 Prodash Benchmarks');
console.log('Build the library first with: npm run build');
console.log('Then uncomment the benchmark tests above and run: node benchmarks/index.js');

module.exports = { benchmark, compare };