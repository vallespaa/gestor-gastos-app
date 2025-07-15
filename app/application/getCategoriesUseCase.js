export class GetCategoriesUseCase {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    return await this.categoryRepository.getAll();
  }

  async getByType(type) {
    if (type !== 'INGRESOS' && type !== 'GASTOS') {
      throw new Error('Tipo de categoría debe ser INGRESOS o GASTOS');
    }
    return await this.categoryRepository.getByType(type);
  }

  async getIncomeCategories() {
    return await this.categoryRepository.getByType('INGRESOS');
  }

  async getExpenseCategories() {
    return await this.categoryRepository.getByType('GASTOS');
  }

  async getById(id) {
    return await this.categoryRepository.getById(id);
  }
}
