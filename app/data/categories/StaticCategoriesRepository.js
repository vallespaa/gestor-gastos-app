import CategoryRepository from '../../domain/repositories/CategoryRepository';
import Category from '../../domain/entities/Category';
import { DEFAULT_CATEGORIES } from './DefaultCategories';

export default class StaticCategoriesRepository extends CategoryRepository {
  constructor() {
    super();
    this.categories = DEFAULT_CATEGORIES.map(cat => Category.fromPlainObject(cat));
  }

  async getAll() {
    return this.categories.length ? this.categories : [];
  }
}
