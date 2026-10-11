import { evaluateExpression } from '../shared/utils/calculator';

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
