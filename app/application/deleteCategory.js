export const deleteCategory = async (repository, id) => {
  await repository.delete(id);
};
