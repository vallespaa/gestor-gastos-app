export default class Transfer {
  constructor({ id, fromAccountId, toAccountId, amount, date, note }) {
    this.id = id;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.amount = amount;
    this.date = date;
    this.note = note || '';
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
      note: this.note
    };
  }
}
