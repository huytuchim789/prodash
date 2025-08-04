# 🎮 Prodash Playground

A testing environment for the prodash library. This playground allows you to test prodash as a consumer would use it.

## 🚀 Quick Start

1. **Build prodash first:**

   ```bash
   cd ..
   npm install
   npm run build
   cd playground
   ```

2. **Install playground dependencies:**

   ```bash
   npm install
   ```

3. **Run tests:**

   ```bash
   # TypeScript/Node.js test
   npm run dev

   # ESM test
   npm run test:esm

   # CommonJS test
   npm run test:cjs

   # Browser test
   npm run serve
   # Then open http://localhost:3000/src/browser-test.html
   ```

## 📁 Files

- **`src/index.ts`** - Main TypeScript playground with comprehensive tests
- **`src/esm-test.mjs`** - ESM module import testing
- **`src/cjs-test.cjs`** - CommonJS require testing
- **`src/browser-test.html`** - Browser environment testing

## 🧪 Test Scenarios

### Import Methods

- ✅ Individual imports (`import map from 'prodash/map'`)
- ✅ Named imports (`import { map, filter } from 'prodash'`)
- ✅ Dynamic imports (`await import('prodash')`)
- ✅ CommonJS requires (`require('prodash')`)
- ✅ UMD global (`window.prodash`)

### Functionality Tests

- ✅ Array functions (map, filter, uniq, chunk)
- ✅ Object functions (pick, omit)
- ✅ Function utilities (debounce)
- ✅ Language utilities (isEqual, cloneDeep)
- ✅ Chain API
- ✅ TypeScript integration
- ✅ Performance benchmarking

### Environment Tests

- ✅ Node.js environment
- ✅ Browser environment
- ✅ Different module systems
- ✅ Tree-shaking verification

## 🔧 Development

```bash
# Watch TypeScript compilation
npm run build:watch

# Run specific test
npm run test:node
npm run test:esm
npm run test:cjs
```

## 📦 After Building Prodash

Once you've built the main prodash library, you can uncomment the actual imports in the test files:

```typescript
// In src/index.ts
import { map, filter, uniq, debounce, chain } from 'prodash';

// Individual imports (best for tree-shaking)
import map from 'prodash/map';
import filter from 'prodash/filter';

// Chain API
import { chain } from 'prodash';
const result = chain([1, 2, 3, 4])
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .value();
```

## 🎯 What This Tests

1. **Package Resolution** - Verifies prodash can be imported correctly
2. **Tree-Shaking** - Tests individual function imports
3. **Type Safety** - Ensures TypeScript definitions work
4. **Performance** - Benchmarks against native implementations
5. **Browser Compatibility** - Tests UMD builds in browsers
6. **Module Systems** - Tests ESM, CJS, and UMD compatibility

This playground ensures prodash works correctly in real-world scenarios before publishing! 🚀
