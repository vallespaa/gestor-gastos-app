export default class Category {
  constructor({ id, name, type }) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  static fromPlainObject(obj) {
    return new Category(obj.id, obj.name, obj.type);
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type
    };
  }

  isIncomeCategory() {
    return this.type === 'INGRESOS';
  }

  isExpenseCategory() {
    return this.type === 'GASTOS';
  }
}
