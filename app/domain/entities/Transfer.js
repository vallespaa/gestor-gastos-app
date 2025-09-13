export default class Adjustment {
  constructor({ id, fromAccountId, toAccountId, amount, date, note }) {
    this.id = id;
    this.fromAccountId = fromAccountId;
    this.toAccountId = toAccountId;
    this.amount = amount;
    this.date = date;
    this.note = note || '';
  }

  static fromPlainObject(obj) {
    return new Adjustment(obj);
  }

  toPlainObject() {
    return {
      id: this.id,
      toAountId: this.fromAccountId,
      fromAccountId: this.toAccountId,
      amount: this.amount,
      date: this.date,
      note: this.note
    };
  }
}
