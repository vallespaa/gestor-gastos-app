export const deleteAccount = async (repository, id) => {
  await repository.delete(id);
};
