import {
  evaluateExpression,
  formatAmount,
  parseAmount,
} from '../shared/utils/calculator';

describe('evaluateExpression', () => {
  it('returns 0 for an empty expression', () => {
    expect(evaluateExpression('')).toBe(0);
  });

  it('parses a comma as the decimal separator', () => {
    expect(evaluateExpression('12,5')).toBe(12.5);
    expect(evaluateExpression(',5')).toBe(0.5);
    expect(evaluateExpression('3,')).toBe(3);
  });

  it('respects operator precedence', () => {
    expect(evaluateExpression('2+3*4')).toBe(14);
    expect(evaluateExpression('10-6/2')).toBe(7);
    expect(evaluateExpression('8/2*3')).toBe(12);
  });

  it('ignores trailing operators', () => {
    expect(evaluateExpression('12+')).toBe(12);
    expect(evaluateExpression('12,5*')).toBe(12.5);
  });

  it('allows negative results', () => {
    expect(evaluateExpression('5-10')).toBe(-5);
  });

  it('rounds the result to cents', () => {
    expect(evaluateExpression('0,1+0,2')).toBe(0.3);
    expect(evaluateExpression('1/3')).toBe(0.33);
    expect(evaluateExpression('2/3')).toBe(0.67);
  });

  it('returns null on division by zero', () => {
    expect(evaluateExpression('5/0')).toBeNull();
  });

  it('returns null for malformed input', () => {
    expect(evaluateExpression('1,2,3')).toBeNull();
    expect(evaluateExpression('+5')).toBeNull();
    expect(evaluateExpression('5++5')).toBeNull();
    expect(evaluateExpression('abc')).toBeNull();
  });
});

describe('formatAmount', () => {
  it('uses a comma for decimals and drops trailing zeros', () => {
    expect(formatAmount(0)).toBe('0');
    expect(formatAmount(12.5)).toBe('12,5');
    expect(formatAmount(0.33)).toBe('0,33');
    expect(formatAmount(-5)).toBe('-5');
  });

  it('groups thousands with dots', () => {
    expect(formatAmount(1234.5)).toBe('1.234,5');
    expect(formatAmount(1234567)).toBe('1.234.567');
    expect(formatAmount(-1234)).toBe('-1.234');
  });
});

describe('parseAmount', () => {
  it('accepts a comma or a dot as the decimal separator', () => {
    expect(parseAmount('12,5')).toBe(12.5);
    expect(parseAmount('12.5')).toBe(12.5);
    expect(parseAmount(' 7 ')).toBe(7);
  });

  it('rounds to cents', () => {
    expect(parseAmount('1,005')).toBe(1.01);
    expect(parseAmount('0,333')).toBe(0.33);
  });

  it('returns null for empty or malformed input', () => {
    expect(parseAmount('')).toBeNull();
    expect(parseAmount('abc')).toBeNull();
    expect(parseAmount('12abc')).toBeNull();
    expect(parseAmount('1,2,3')).toBeNull();
    expect(parseAmount('1.234,5')).toBeNull();
  });
});
