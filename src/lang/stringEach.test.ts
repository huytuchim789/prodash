import stringEach from './stringEach';

describe('stringEach', () => {
  it('should iterate over string characters', () => {
    const string = 'hello';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['h', 'e', 'l', 'l', 'o']);
  });

  it('should pass correct parameters to callback', () => {
    const string = 'abc';
    const callback = jest.fn();

    stringEach(string, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith('a', 0, string);
    expect(callback).toHaveBeenCalledWith('b', 1, string);
    expect(callback).toHaveBeenCalledWith('c', 2, string);
  });

  it('should handle empty strings', () => {
    const string = '';
    const callback = jest.fn();

    const result = stringEach(string, callback);

    expect(callback).not.toHaveBeenCalled();
    expect(result).toBe(string);
  });

  it('should handle single character strings', () => {
    const string = 'x';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['x']);
  });

  it('should handle strings with spaces', () => {
    const string = 'hello world';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']);
  });

  it('should handle strings with special characters', () => {
    const string = 'hello\n\tworld!';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['h', 'e', 'l', 'l', 'o', '\n', '\t', 'w', 'o', 'r', 'l', 'd', '!']);
  });

  it('should handle unicode strings', () => {
    const string = '🎉🌟🚀';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['🎉', '🌟', '🚀']);
  });

  it('should handle mixed unicode and ascii', () => {
    const string = 'Hello🎉World🌟';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['H', 'e', 'l', 'l', 'o', '🎉', 'W', 'o', 'r', 'l', 'd', '🌟']);
  });

  it('should bind thisArg correctly', () => {
    const string = 'abc';
    const thisArg = { multiplier: 2 };
    const result: string[] = [];

    stringEach(
      string,
      function (this: any, char: string) {
        result.push(char.repeat(this.multiplier));
      },
      thisArg
    );

    expect(result).toEqual(['aa', 'bb', 'cc']);
  });

  it('should return the original string', () => {
    const string = 'hello';
    const callback = jest.fn();

    const result = stringEach(string, callback);

    expect(result).toBe(string);
    expect(result).toEqual('hello');
  });

  it('should handle early return from callback', () => {
    const string = 'hello';
    const result: string[] = [];

    stringEach(string, (char: string) => {
      if (char === 'l') return;
      result.push(char);
    });

    expect(result).toEqual(['h', 'e', 'o']);
  });

  it('should handle edge cases', () => {
    // String with only spaces
    const spacesOnly = '   ';
    const spacesResult: string[] = [];
    stringEach(spacesOnly, (char: string) => spacesResult.push(char));
    expect(spacesResult).toEqual([' ', ' ', ' ']);

    // String with only special characters
    const specialOnly = '\n\t\r';
    const specialResult: string[] = [];
    stringEach(specialOnly, (char: string) => specialResult.push(char));
    expect(specialResult).toEqual(['\n', '\t', '\r']);

    // String with numbers
    const numbers = '12345';
    const numbersResult: string[] = [];
    stringEach(numbers, (char: string) => numbersResult.push(char));
    expect(numbersResult).toEqual(['1', '2', '3', '4', '5']);

    // Very long string (performance test)
    const longString = 'a'.repeat(1000);
    let count = 0;
    stringEach(longString, () => count++);
    expect(count).toBe(1000);
  });

  it('should handle callback mutations', () => {
    const string = 'hello';
    const originalLength = string.length;

    stringEach(string, (_: string, index: number) => {
      if (index === 1) {
        // Note: Strings are immutable, so we can't actually mutate them
        // This test just verifies the iteration continues
      }
    });

    // String should remain unchanged
    expect(string.length).toBe(originalLength);
  });

  it('should handle non-function callbacks', () => {
    const string = 'hello';
    const nonFunction = 'not a function' as any;

    const result = stringEach(string, nonFunction);

    expect(result).toBe(string);
  });

  it('should handle strings with zero-width characters', () => {
    const string = 'a\u200Bb\u200Bc'; // Zero-width space between characters
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['a', '\u200B', 'b', '\u200B', 'c']);
  });

  it('should handle strings with combining characters', () => {
    const string = 'e\u0301'; // e + combining acute accent
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['e', '\u0301']);
  });

  it('should handle strings with surrogate pairs', () => {
    const string = '🌍'; // Earth globe emoji (surrogate pair)
    const result: string[] = [];

    stringEach(string, (char: string) => {
      result.push(char);
    });

    expect(result).toEqual(['🌍']);
  });
});
