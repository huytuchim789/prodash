# Contributing to Prodash

Thank you for your interest in contributing to Prodash! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/prodash.git
   cd prodash
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Install Husky hooks:
   ```bash
   npm run prepare
   ```

## 🏗️ Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Add Your Function

1. Create your function file in the appropriate category:
   ```
   src/array/yourFunction.ts       # Array utilities
   src/object/yourFunction.ts      # Object utilities  
   src/function/yourFunction.ts    # Function utilities
   src/lang/yourFunction.ts        # Language utilities
   src/string/yourFunction.ts      # String utilities
   ```

2. Follow the function template:
   ```typescript
   /**
    * Brief description of what the function does.
    * 
    * @template T - Description of generic type
    * @param param1 - Description of parameter
    * @param param2 - Description of parameter
    * @returns Description of return value
    * 
    * @example
    * ```typescript
    * import { yourFunction } from 'prodash/yourFunction';
    * 
    * yourFunction([1, 2, 3], x => x * 2);
    * // => [2, 4, 6]
    * ```
    */
   export function yourFunction<T>(/* parameters */): ReturnType {
     // Input validation
     if (/* invalid input */) {
       throw new TypeError('Descriptive error message');
     }
     
     // Implementation
     return result;
   }
   
   export default yourFunction;
   ```

### 3. Write Tests

Create comprehensive test file `src/category/yourFunction.test.ts`:

```typescript
import { yourFunction } from './yourFunction';

describe('yourFunction', () => {
  it('should handle normal case', () => {
    const result = yourFunction([1, 2, 3], x => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it('should handle edge cases', () => {
    expect(yourFunction([], x => x)).toEqual([]);
  });

  it('should throw for invalid inputs', () => {
    expect(() => yourFunction(null as any, x => x)).toThrow(TypeError);
    expect(() => yourFunction([1, 2, 3], null as any)).toThrow(TypeError);
  });

  it('should not mutate input', () => {
    const original = [1, 2, 3];
    const copy = [...original];
    yourFunction(original, x => x * 2);
    expect(original).toEqual(copy);
  });
});
```

### 4. Update Exports

Add your function to `src/index.ts`:

```typescript
export { yourFunction, default as yourFunctionDefault } from './category/yourFunction';
```

### 5. Update Chain API (if applicable)

If your function works with arrays or objects, add it to the chain API in `src/chain/chain.ts`.

### 6. Run Tests and Linting

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code  
npm run format

# Build library
npm run build
```

## 📋 Code Standards

### Function Requirements

1. **Pure Functions**: No side effects, always return new values
2. **Input Validation**: Validate inputs and throw descriptive TypeErrors
3. **TypeScript**: Use strict typing, no `any` types
4. **Documentation**: Comprehensive JSDoc with examples
5. **Performance**: Prefer native JavaScript APIs when faster
6. **Edge Cases**: Handle null, undefined, empty arrays, etc.

### Testing Requirements

1. **Coverage**: Aim for >90% code coverage
2. **Edge Cases**: Test null, undefined, empty inputs, invalid types
3. **Immutability**: Verify original inputs are not mutated
4. **Error Cases**: Test that appropriate errors are thrown
5. **Performance**: Include performance-sensitive test cases

### Documentation Requirements

1. **JSDoc**: Include `@template`, `@param`, `@returns`, `@example`
2. **Examples**: Show practical usage with TypeScript
3. **Type Safety**: Demonstrate type inference and safety

## 🧪 Testing Guidelines

### Test Structure

Use the Arrange-Act-Assert pattern:

```typescript
describe('functionName', () => {
  it('should describe expected behavior', () => {
    // Arrange
    const input = [1, 2, 3];
    const expected = [2, 4, 6];
    
    // Act
    const result = functionName(input, x => x * 2);
    
    // Assert
    expect(result).toEqual(expected);
  });
});
```

### Required Test Cases

Every function should test:

- ✅ Normal/happy path cases
- ✅ Edge cases (empty arrays, null, undefined)
- ✅ Error cases (invalid inputs, wrong types)
- ✅ Immutability (original inputs unchanged)
- ✅ Type safety (if applicable)

## 🔄 Pull Request Process

1. **Ensure all tests pass**: `npm test`
2. **Ensure code is formatted**: `npm run format`
3. **Ensure no linting errors**: `npm run lint`
4. **Update documentation** if needed
5. **Write descriptive commit messages**
6. **Create pull request** with:
   - Clear title and description
   - Link to related issues
   - Screenshots/examples if relevant

### Commit Message Format

```
type(scope): description

feat(array): add chunk function
fix(debounce): fix memory leak in cleanup
docs(readme): update installation instructions
test(map): add edge case tests
```

Types: `feat`, `fix`, `docs`, `test`, `refactor`, `perf`, `chore`

## 📈 Performance Guidelines

- Benchmark new functions against Lodash equivalents
- Target performance: equal or 2x faster than Lodash
- Use native JavaScript APIs when they perform better
- Consider algorithmic complexity (prefer O(n) over O(n²))
- Monitor bundle size impact

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Environment** (Node.js version, browser, etc.)
6. **Code example** demonstrating the issue

## 💡 Feature Requests

For new features:

1. **Search existing issues** first
2. **Describe the use case** and motivation
3. **Provide examples** of the proposed API
4. **Consider alternatives** and explain why this approach is better

## 📞 Getting Help

- 💬 **Discussions**: Use GitHub Discussions for questions
- 🐛 **Issues**: Use GitHub Issues for bugs and feature requests
- 📧 **Email**: Reach out to maintainers directly for private matters

## 🙏 Recognition

Contributors will be:

- Added to the contributors list in README.md
- Mentioned in release notes for significant contributions
- Given credit in code comments for major features

Thank you for contributing to Prodash! 🎉