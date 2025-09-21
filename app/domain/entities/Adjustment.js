export default class Adjustment {
  constructor({ id, accountId, amount, date }) {
    this.id = id;
    this.accountId = accountId;
    this.amount = amount;
    this.date = date;
  }

  static fromPlainObject(obj) {
    return new Adjustment(obj);
  }

  toPlainObject() {
    return {
      id: this.id,
      accountId: this.accountId,
      amount: this.amount,
      date: this.date,
    };
  }
}
