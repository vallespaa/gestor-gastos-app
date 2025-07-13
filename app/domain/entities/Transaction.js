export default class Transaction {
  constructor({ id, amount, type, category, date, note }) {
    this.id = id;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.date = date;
    this.note = note || '';
  }

  isIncome() {
    return this.type === 'INGRESOS';
  }

  isExpense() {
    return this.type === 'GASTOS';
  }

  isValid() {
    return (
      this.amount > 0 && ['INGRESOS', 'GASTOS'].includes(this.type) &&
      this.category && this.date
    );
  }
}