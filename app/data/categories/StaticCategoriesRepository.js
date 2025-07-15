import { CategoryRepository } from '../../domain/repositories/CategoryRepository.js';
import { Category } from '../../domain/entities/Category.js';
import { STATIC_CATEGORIES } from './staticCategories.js';

export class CategoryRepositoryImpl extends CategoryRepository {
  constructor() {
    super();
    this.categories = STATIC_CATEGORIES.map(cat => Category.fromPlainObject(cat));
  }

  async getAll() {
    return [...this.categories];
  }

  async getById(id) {
    return this.categories.find(cat => cat.id === id) || null;
  }

  async getByType(type) {
    return this.categories.filter(cat => cat.type === type);
  }
}
