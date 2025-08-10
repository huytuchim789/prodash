import isDate from './isDate';

describe('isDate', () => {
  it('should return true for Date objects', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date(0))).toBe(true);
    expect(isDate(new Date('2023-01-01'))).toBe(true);
    expect(isDate(new Date(2023, 0, 1))).toBe(true);
    expect(isDate(new Date(1704067200000))).toBe(true);
    expect(isDate(new Date('invalid'))).toBe(true); // Invalid date is still a Date object
    expect(isDate(new Date(NaN))).toBe(true); // Invalid date is still a Date object
  });

  it('should return false for non-Date values', () => {
    // Primitives
    expect(isDate(null)).toBe(false);
    expect(isDate(undefined)).toBe(false);
    expect(isDate(true)).toBe(false);
    expect(isDate(false)).toBe(false);
    expect(isDate(0)).toBe(false);
    expect(isDate(1)).toBe(false);
    expect(isDate(-1)).toBe(false);
    expect(isDate(0.5)).toBe(false);
    expect(isDate(NaN)).toBe(false);
    expect(isDate(Infinity)).toBe(false);
    expect(isDate(-Infinity)).toBe(false);
    expect(isDate('')).toBe(false);
    expect(isDate('hello')).toBe(false);
    expect(isDate('2023-01-01')).toBe(false);
    expect(isDate('1704067200000')).toBe(false);

    // Objects
    expect(isDate({})).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate(new RegExp(''))).toBe(false);
    expect(isDate(new Error())).toBe(false);
    expect(isDate(new Map())).toBe(false);
    expect(isDate(new Set())).toBe(false);
    expect(isDate(new Promise(() => {}))).toBe(false);

    // Functions
    expect(isDate(() => {})).toBe(false);
    expect(isDate(function () {})).toBe(false);
    expect(isDate(Array)).toBe(false);
    expect(isDate(Object)).toBe(false);
    expect(isDate(Date)).toBe(false);

    // Symbols and BigInts
    expect(isDate(Symbol())).toBe(false);
    expect(isDate(Symbol('symbol'))).toBe(false);
    expect(isDate(BigInt(0))).toBe(false);
    expect(isDate(BigInt(1))).toBe(false);
  });

  it('should handle special cases', () => {
    // Date-like objects that aren't Date objects
    const dateLike = {
      getTime: () => 1704067200000,
      getFullYear: () => 2023,
      getMonth: () => 0,
      getDate: () => 1,
      toString: () => '2023-01-01',
    };
    expect(isDate(dateLike)).toBe(false);

    // Objects with date properties
    const objWithDate = { date: new Date() };
    expect(isDate(objWithDate)).toBe(false);

    // Arrays with dates
    const arrWithDates = [new Date(), new Date(0)];
    expect(isDate(arrWithDates)).toBe(false);

    // Built-in objects
    expect(isDate(Math)).toBe(false);
    expect(isDate(JSON)).toBe(false);
    expect(isDate(console)).toBe(false);
    expect(isDate(global)).toBe(false);
    expect(isDate(globalThis)).toBe(false);
  });

  it('should handle edge cases', () => {
    // Date objects with custom properties
    const dateWithProps = new Date() as any;
    dateWithProps.customProp = 'value';
    expect(isDate(dateWithProps)).toBe(true);

    // Date objects with modified prototype
    const dateWithProto = new Date();
    Object.setPrototypeOf(dateWithProto, Object.prototype);
    expect(isDate(dateWithProto)).toBe(true);

    // Date objects with Symbol.toStringTag
    const dateWithTag = new Date() as any;
    dateWithTag[Symbol.toStringTag] = 'CustomDate';
    expect(isDate(dateWithTag)).toBe(false);

    // Very old dates
    const oldDate = new Date('1900-01-01');
    expect(isDate(oldDate)).toBe(true);

    // Very future dates
    const futureDate = new Date('2100-01-01');
    expect(isDate(futureDate)).toBe(true);

    // Date with specific time
    const specificTime = new Date(2023, 11, 25, 12, 30, 45, 123);
    expect(isDate(specificTime)).toBe(true);

    // Date from timestamp
    const timestampDate = new Date(1704067200000);
    expect(isDate(timestampDate)).toBe(true);
  });
});
