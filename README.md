# 🚀 Prodash

A modern, tree-shakable JavaScript utility library with TypeScript support, inspired by Lodash but built for modern development.

[![npm version](https://badge.fury.io/js/prodash.svg)](https://badge.fury.io/js/prodash)
[![Build Status](https://github.com/yourusername/prodash/workflows/CI/badge.svg)](https://github.com/yourusername/prodash/actions)
[![Coverage Status](https://coveralls.io/repos/github/yourusername/prodash/badge.svg?branch=main)](https://coveralls.io/github/yourusername/prodash?branch=main)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/prodash)](https://bundlephobia.com/package/prodash)

## ✨ Features

- 🌳 **Tree-shakable**: Import only what you need
- 📦 **Zero dependencies**: Lightweight and fast  
- 🔒 **Type-safe**: Full TypeScript support with strict types
- 🔗 **Chainable**: Optional chain API for fluent programming
- 🚀 **Modern**: ES2018+ with native JavaScript optimizations
- 🧪 **Well-tested**: >90% test coverage
- 📚 **Well-documented**: Comprehensive docs with examples

## 📦 Installation

```bash
npm install prodash
# or
yarn add prodash
# or
pnpm add prodash
```

## 🚀 Quick Start

### Tree-shaking friendly imports (recommended)

```typescript
// Individual imports - best for tree-shaking
import map from 'prodash/map';
import filter from 'prodash/filter';

const numbers = [1, 2, 3, 4, 5];
const doubled = map(numbers, n => n * 2);
const evens = filter(doubled, n => n % 2 === 0);
console.log(evens); // [4, 8]
```

### Named imports

```typescript
// Named imports - good for tree-shaking
import { map, filter, debounce } from 'prodash';

const debouncedSearch = debounce(searchAPI, 300);
```

### Chain API

```typescript
// Fluent chain API
import { chain } from 'prodash';

const result = chain([1, 2, 3, 4, 5])
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .uniq()
  .value();

console.log(result); // [4, 8]
```

## 📖 API Reference

### Array Methods

| Function | Description | Example |
|----------|-------------|---------|
| `map` | Transform array elements | `map([1,2,3], x => x*2)` → `[2,4,6]` |
| `filter` | Filter array elements | `filter([1,2,3,4], x => x%2===0)` → `[2,4]` |
| `uniq` | Remove duplicates | `uniq([1,2,2,3])` → `[1,2,3]` |
| `chunk` | Split into chunks | `chunk([1,2,3,4], 2)` → `[[1,2],[3,4]]` |

### Object Methods

| Function | Description | Example |
|----------|-------------|---------|
| `pick` | Select properties | `pick({a:1,b:2,c:3}, ['a','c'])` → `{a:1,c:3}` |
| `omit` | Exclude properties | `omit({a:1,b:2,c:3}, ['b'])` → `{a:1,c:3}` |

### Function Utilities  

| Function | Description | Example |
|----------|-------------|---------|
| `debounce` | Delay function execution | `debounce(fn, 300)` |

### Language Utilities

| Function | Description | Example |
|----------|-------------|---------|
| `isEqual` | Deep equality check | `isEqual([1,2], [1,2])` → `true` |
| `cloneDeep` | Deep clone objects | `cloneDeep({a: {b: 1}})` |

## 🔗 Chain API

The chain API provides a fluent interface for composing operations:

```typescript
import { chain } from 'prodash';

// Array chaining
const result = chain([1, 2, 3, 4, 5, 2, 1])
  .filter(n => n > 1)       // [2, 3, 4, 5, 2]
  .map(n => n * 2)          // [4, 6, 8, 10, 4]  
  .uniq()                   // [4, 6, 8, 10]
  .take(3)                  // [4, 6, 8]
  .value();                 // Unwrap result

// Object chaining
const user = chain({ name: 'John', age: 30, email: 'john@example.com' })
  .pick(['name', 'email'])
  .value();
```

## 🌳 Tree-Shaking

Prodash is designed with tree-shaking in mind. Use individual imports for the best bundle size:

```typescript
// ✅ Good - Only imports the map function
import map from 'prodash/map';

// ❌ Avoid - Imports entire library  
import prodash from 'prodash';
const result = prodash.map(...);

// ✅ Also good - Named imports work well with modern bundlers
import { map, filter } from 'prodash';
```

## 🔧 TypeScript Support

Prodash is written in TypeScript with strict type checking:

```typescript
import { map, filter } from 'prodash';

// Full type inference
const numbers: number[] = [1, 2, 3];
const strings: string[] = map(numbers, n => n.toString()); // ✅ 
const invalid: number[] = map(numbers, n => n.toString()); // ❌ Type error
```

## 🚀 Performance

Prodash is optimized for modern JavaScript environments:

- Uses native `Set` for deduplication (faster than nested loops)
- Leverages modern JavaScript APIs when they outperform alternatives
- Benchmarked against Lodash - equal or better performance
- Minimal bundle size impact

## 🧪 Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build library
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## 📄 License

MIT © [Your Name](https://github.com/yourusername)

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on how to contribute to this project.

---

**Why Prodash?**

- 🎯 **Focused**: Essential utilities without bloat
- 🔬 **Modern**: Built for ES2018+ environments  
- 📦 **Efficient**: Tree-shakable with minimal bundle impact
- 🛡️ **Reliable**: Comprehensive tests and TypeScript safety
- 🔄 **Familiar**: Lodash-inspired API you already know