import { cloneDeep } from './cloneDeep';

describe('cloneDeep', () => {
  it('should clone primitive values', () => {
    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep('hello')).toBe('hello');
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  it('should deep clone arrays', () => {
    const array = [1, [2, 3], { a: 4 }];
    const cloned = cloneDeep(array);
    
    expect(cloned).toEqual(array);
    expect(cloned).not.toBe(array);
    expect(cloned[1]).not.toBe(array[1]);
    expect(cloned[2]).not.toBe(array[2]);
  });

  it('should deep clone objects', () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: [3, 4]
      }
    };
    const cloned = cloneDeep(obj);
    
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
    expect(cloned.b.d).not.toBe(obj.b.d);
  });

  it('should clone Date objects', () => {
    const date = new Date('2021-01-01');
    const cloned = cloneDeep(date);
    
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
    expect(cloned.getTime()).toBe(date.getTime());
  });

  it('should clone RegExp objects', () => {
    const regex = /test/gi;
    const cloned = cloneDeep(regex);
    
    expect(cloned).toEqual(regex);
    expect(cloned).not.toBe(regex);
    expect(cloned.source).toBe(regex.source);
    expect(cloned.flags).toBe(regex.flags);
  });

  it('should handle circular references gracefully', () => {
    // Note: This basic implementation doesn't handle circular references
    // This test documents the current behavior
    const obj: any = { a: 1 };
    obj.self = obj;
    
    expect(() => cloneDeep(obj)).toThrow(); // Will cause stack overflow
  });
});