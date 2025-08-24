import Category from '../domain/entities/Category.js';

export const createCategory = async (repository, data) => {
  const category = Category.fromPlainObject(data);
  return await repository.create(category);
};
