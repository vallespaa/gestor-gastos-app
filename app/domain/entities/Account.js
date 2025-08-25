export default class Account {
  constructor({ id, name }) {
    this.id = id;
    this.name = name;
  }

  static fromPlainObject(obj) {
    return new Account(obj);
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name
    };
  }
}
