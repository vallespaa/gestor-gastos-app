export const deleteTransaction = async (repository, id) => {
  await repository.delete(id);
};
