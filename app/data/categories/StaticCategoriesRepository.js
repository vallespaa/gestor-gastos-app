import CategoryRepository from '../../domain/repositories/CategoryRepository';
import Category from '../../domain/entities/Category';
import { STATIC_CATEGORIES } from './StaticCategories';

export default class StaticCategoriesRepository extends CategoryRepository {
  constructor() {
    super();
    this.categories = STATIC_CATEGORIES.map(cat => Category.fromPlainObject(cat));
  }

  async getAll() {
    return this.categories.length ? this.categories : [];
  }
}
