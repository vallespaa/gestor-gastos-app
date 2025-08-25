import Category from '../domain/entities/Category.js';

export const updateCategory = async (repository, data) => {
  const updatedCategory = Category.fromPlainObject(data);
  await repository.update(updatedCategory);
};
