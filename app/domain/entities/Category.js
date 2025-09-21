export default class Category {
  constructor({ id, name, color, icon, type }) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.icon = icon;
    this.type = type;
  }

  static fromPlainObject(obj) {
    return new Category(obj);
  }

  toPlainObject() {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      icon: this.icon,
      type: this.type,
    };
  }

  isIncomeCategory() {
    return this.type === 'INGRESOS';
  }

  isExpenseCategory() {
    return this.type === 'GASTOS';
  }
}
