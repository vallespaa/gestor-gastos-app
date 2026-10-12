export default class Transfer {
  constructor({ id, fromAccountId, toAccountId, amount, date, note }) {
    this.id = id;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.amount = amount;
    this.date = date;
    this.note = note || '';
  }

  isValid() {
    return (
      typeof this.amount === 'number' &&
      Number.isFinite(this.amount) &&
      this.amount > 0 &&
      this.fromAccountId &&
      this.toAccountId &&
      this.fromAccountId !== this.toAccountId &&
      this.date
    );
  }

  static fromPlainObject(obj) {
    return new Transfer(obj);
  }

  toPlainObject() {
    return {
      id: this.id,
      fromAccountId: this.fromAccountId,
      toAccountId: this.toAccountId,
      amount: this.amount,
      date: this.date,
      note: this.note,
    };
  }
}
