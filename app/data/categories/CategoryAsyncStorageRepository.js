import CategoryRepository from '../../domain/repositories/CategoryRepository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Category from '../../domain/entities/Category';
import { DEFAULT_CATEGORIES } from './DefaultCategories';

const STORAGE_KEY = 'categories';

export default class CategoryAsyncStorageRepository extends CategoryRepository {
  async getAll() {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const defaultCategories = DEFAULT_CATEGORIES.map(cat => Category.fromPlainObject(cat));
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories.map(c => c.toPlainObject())));
      return defaultCategories;
    }

    const categories = JSON.parse(stored);
    return categories.map(cat => Category.fromPlainObject(cat));
  };

  async create(category) {
    const currentCategories = await this.getAll();
    const updatedCategories = [...currentCategories, category];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories.map(c => c.toPlainObject())));
  };

  async delete(id) {  
    const currentCategories = await this.getAll();
    const updatedCategories = currentCategories.filter(c => c.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories.map(c => c.toPlainObject())));
  };

  async update(updatedCategory) {
    const currentCategories = await this.getAll();
    const updatedCategories = currentCategories.map(c =>
      c.id === updatedCategory.id ? updatedCategory : c
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories.map(c => c.toPlainObject())));
  };
}
