import Transaction from '../app/domain/entities/Transaction';

const base = {
  id: '1',
  amount: 10,
  type: 'GASTOS',
  category: 'c1',
  account: 'a1',
  date: '2025-01-01',
};

describe('Transaction', () => {
  it('is valid with all required fields', () => {
    expect(new Transaction(base).isValid()).toBeTruthy();
  });

  it('is invalid with a non-positive amount', () => {
    expect(new Transaction({ ...base, amount: 0 }).isValid()).toBeFalsy();
  });

  it('is invalid with a string amount', () => {
    expect(new Transaction({ ...base, amount: '10' }).isValid()).toBeFalsy();
  });

  it('is invalid with a non-finite amount', () => {
    expect(new Transaction({ ...base, amount: NaN }).isValid()).toBeFalsy();
    expect(
      new Transaction({ ...base, amount: Infinity }).isValid(),
    ).toBeFalsy();
  });

  it('is invalid with an unknown type', () => {
    expect(new Transaction({ ...base, type: 'OTRO' }).isValid()).toBeFalsy();
  });

  it('distinguishes income from expense', () => {
    expect(new Transaction({ ...base, type: 'INGRESOS' }).isIncome()).toBe(
      true,
    );
    expect(new Transaction(base).isExpense()).toBe(true);
  });
});
